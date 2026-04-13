import Parser from "rss-parser";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser({
  customFields: {
    item: ["description", "pubDate", "isoDate", "category"],
  },
});

const FEEDS = [
  { url: "https://feeds.feedburner.com/HackRead", source: "HackRead", lang: "en", limit: 8 },
  { url: "https://www.incibe.es/rss.xml", source: "INCIBE", lang: "es", limit: 4 },
  { url: "https://feeds.feedburner.com/TheHackersNews", source: "The Hacker News", lang: "en", limit: 8 },
  { url: "https://cvefeed.io/rssfeed/latest.xml", source: "CVE Feed", lang: "en", limit: 6 },
  { url: "https://unaaldia.hispasec.com/feed", source: "Una al Dia", lang: "es", limit: 8 },
  { url: "https://github.blog/security/feed/", source: "GitHub Security Blog", lang: "en", limit: 6 },
];

const EXCLUDED_EVENT_PATTERNS = [
  /\baceleraci[oó]n\b/i,
  /\bideaci[oó]n\b/i,
  /\bcaptaci[oó]n\b/i,
  /\bcharla\b/i,
  /\btaller\b/i,
  /\bbootcamp\b/i,
  /\bwebinar\b/i,
  /\bprogramado\b/i,
  /\bentidad colaboradora\b/i,
  /\bfecha inicio\b/i,
  /\bfecha fin\b/i,
  /\bpresencial\b/i,
];

const INCIBE_SECURITY_PATTERNS = [
  /\baviso(s)?\b/i,
  /\bbolet[ií]n\b/i,
  /\bvulnerabilidad(es)?\b/i,
  /\bciberincidente(s)?\b/i,
  /\bincidente(s)?\b/i,
  /\bmalware\b/i,
  /\bransomware\b/i,
  /\bphishing\b/i,
  /\bbrecha(s)?\b/i,
  /\bamenaza(s)?\b/i,
  /\balerta(s)?\b/i,
  /\bcve-\d{4}-\d+/i,
  /\bzero[ -]?day\b/i,
  /\bbotnet\b/i,
  /\btroyano\b/i,
  /\bspyware\b/i,
  /\brootkit\b/i,
  /\bexplotaci[oó]n\b/i,
];

const CATEGORY_RULES = [
  { category: "Ransomware", patterns: [/\bransomware\b/i, /\blockbit\b/i, /\bcl0p\b/i, /\binterlock\b/i, /\bwannacry\b/i] },
  { category: "Vulnerabilidad", patterns: [/\bcve-\d{4}-\d+/i, /\bzero[ -]?day\b/i, /\bvulnerab/i, /\bflaw\b/i, /\brce\b/i, /\bdeserialization\b/i, /\boverflow\b/i] },
  { category: "Phishing", patterns: [/\bphishing\b/i, /\bvishing\b/i, /\bsmishing\b/i, /\bcredential\b/i, /\bmfa fatigue\b/i] },
  { category: "Malware", patterns: [/\bmalware\b/i, /\bstealer\b/i, /\bloader\b/i, /\brat\b/i, /\btrojan\b/i, /\bbackdoor\b/i] },
  { category: "APT", patterns: [/\bapt\d*\b/i, /\blazarus\b/i, /\bapt28\b/i, /\bstate-sponsored\b/i, /\bnation-state\b/i] },
  { category: "Cloud", patterns: [/\bcloud\b/i, /\baws\b/i, /\bazure\b/i, /\bgcp\b/i, /\biam\b/i, /\bkubernetes\b/i, /\bcontainer\b/i] },
  { category: "Open Source", patterns: [/\bopen source\b/i, /\bgithub\b/i, /\bmaintainer\b/i, /\brepository\b/i, /\bsecurity blog\b/i] },
  { category: "Tooling", patterns: [/\btool\b/i, /\btoolkit\b/i, /\bframework\b/i, /\brelease\b/i, /\bscanner\b/i, /\bplatform\b/i, /\bproject\b/i] },
  { category: "Brecha", patterns: [/\bbreach\b/i, /\bleak\b/i, /\bdata exposure\b/i, /\bdata leak\b/i, /\bcompromise\b/i] },
];

function matchesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function classifyNews(text = "") {
  for (const rule of CATEGORY_RULES) {
    if (matchesAny(text, rule.patterns)) return rule.category;
  }
  return "General";
}

function isRelevantNews(feed, title = "", description = "") {
  const text = `${title} ${description}`.replace(/\s+/g, " ").trim();

  if (feed.source === "INCIBE") {
    return matchesAny(text, INCIBE_SECURITY_PATTERNS) && !matchesAny(text, EXCLUDED_EVENT_PATTERNS);
  }

  if (feed.source === "GitHub Security Blog") {
    return true;
  }

  return true;
}

function normalizeDate(item) {
  const raw = item.isoDate || item.pubDate;
  const parsed = raw ? new Date(raw) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

async function fetchFeed(feed) {
  const parsed = await parser.parseURL(feed.url);
  return parsed.items
    .map((item) => {
      const title = item.title || "Noticia sin titulo";
      const description = (item.contentSnippet || item.description || "Sin descripcion disponible.").replace(/\s+/g, " ").trim();
      return {
        id: Buffer.from(item.link || title || `${feed.source}-${Math.random()}`).toString("base64").slice(0, 18),
        title,
        link: item.link || feed.url,
        source: feed.source,
        lang: feed.lang,
        date: normalizeDate(item),
        description,
        category: classifyNews(`${title} ${description}`),
      };
    })
    .filter((item) => isRelevantNews(feed, item.title, item.description))
    .slice(0, feed.limit || 12);
}

function balanceFeed(items) {
  const pool = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
  const result = [];

  while (pool.length) {
    const recentSources = result.slice(-2).map((item) => item.source);
    const nextIndex = pool.findIndex((item) => !recentSources.includes(item.source));
    const index = nextIndex === -1 ? 0 : nextIndex;
    result.push(pool.splice(index, 1)[0]);
  }

  return result;
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

  const balanced = balanceFeed(deduped);

  const publicOutputPath = path.join(__dirname, "..", "public", "noticias.json");
  const rootOutputPath = path.join(__dirname, "..", "noticias.json");
  fs.writeFileSync(publicOutputPath, JSON.stringify(balanced, null, 2), "utf8");
  fs.writeFileSync(rootOutputPath, JSON.stringify(balanced, null, 2), "utf8");
  console.log(`[OK] ${balanced.length} noticias guardadas en ${publicOutputPath}`);
}

main();
