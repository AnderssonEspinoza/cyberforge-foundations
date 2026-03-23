const Parser = require("rss-parser");
const fs = require("fs");
const path = require("path");

const parser = new Parser({
  customFields: {
    item: ["description", "pubDate", "isoDate", "category"],
  },
});

const FEEDS = [
  { url: "https://feeds.feedburner.com/HackRead", source: "HackRead", lang: "en" },
  { url: "https://www.incibe.es/rss.xml", source: "INCIBE", lang: "es" },
  { url: "https://feeds.feedburner.com/TheHackersNews", source: "The Hacker News", lang: "en" },
  { url: "https://cvefeed.io/rssfeed/latest.xml", source: "CVE Feed", lang: "en" },
  { url: "https://unaaldia.hispasec.com/feed", source: "Una al Dia", lang: "es" },
];

function classifyNews(text = "") {
  const value = text.toLowerCase();
  if (value.includes("ransomware") || value.includes("lockbit") || value.includes("encrypt")) return "Ransomware";
  if (value.includes("cve-") || value.includes("zero-day") || value.includes("vulnerability") || value.includes("flaw")) return "Vulnerabilidad";
  if (value.includes("phishing") || value.includes("credential") || value.includes("breach") || value.includes("leak")) return "Brechas";
  if (value.includes("apt") || value.includes("lazarus") || value.includes("state-sponsored")) return "APT";
  if (value.includes("cloud") || value.includes("aws") || value.includes("azure")) return "Cloud";
  return "General";
}

function normalizeDate(item) {
  const raw = item.isoDate || item.pubDate;
  const parsed = raw ? new Date(raw) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

async function fetchFeed(feed) {
  const parsed = await parser.parseURL(feed.url);
  return parsed.items.slice(0, 12).map((item) => ({
    id: Buffer.from(item.link || item.title || `${feed.source}-${Math.random()}`).toString("base64").slice(0, 18),
    title: item.title || "Noticia sin titulo",
    link: item.link || feed.url,
    source: feed.source,
    lang: feed.lang,
    date: normalizeDate(item),
    description: (item.contentSnippet || item.description || "Sin descripcion disponible.").replace(/\s+/g, " ").trim(),
    category: classifyNews(`${item.title || ""} ${item.contentSnippet || ""}`),
  }));
}

async function main() {
  console.log("Extrayendo noticias reales de ciberseguridad...");
  const collected = [];

  for (const feed of FEEDS) {
    try {
      console.log(`[+] ${feed.source}`);
      const items = await fetchFeed(feed);
      collected.push(...items);
    } catch (error) {
      console.error(`[-] ${feed.source}: ${error.message}`);
    }
  }

  const deduped = Array.from(
    new Map(collected.map((item) => [item.link, item])).values()
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const outputPath = path.join(__dirname, "noticias.json");
  fs.writeFileSync(outputPath, JSON.stringify(deduped, null, 2), "utf8");
  console.log(`[OK] ${deduped.length} noticias guardadas en ${outputPath}`);
}

main();
