import { useEffect, useState } from "react";
import { fetchNews } from "../services/newsService";
import { useAppStore } from "../services/useAppStore";
import { Card } from "./ui";

export default function NewsPanel({ compact = false }) {
  const { state, toggleNewsRead } = useAppStore();
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  const categories = ["Todas", ...Array.from(new Set(news.map((item) => item.category).filter(Boolean)))];
  const filtered = news.filter((item) => filter === "Todas" || item.category === filter).slice(0, compact ? 5 : 15);
  const latest = news[0]?.date ? new Date(news[0].date).toLocaleString("es-PE") : "sin fecha";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-term-prim">Intel Feed</h2>
          <p className="text-sm text-term-mut mt-2">Ultima actualizacion detectada: {latest}. Usa estas noticias para complementar fundamentos, no para sustituirlos.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`px-3 py-1.5 rounded-full text-xs border whitespace-nowrap ${filter === item ? "border-term-acc text-term-acc bg-term-acc/10" : "border-term-mut/30 text-term-mut"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map((item) => {
          const read = state.readNews.includes(item.id);
          return (
            <Card key={item.id} className={`bg-black/40 ${read ? "opacity-70" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs text-term-mut mb-2">
                    <span className="px-2 py-1 rounded-full border border-term-mut/30">{item.category}</span>
                    <span>{item.source}</span>
                    <span>{new Date(item.date).toLocaleDateString("es-PE")}</span>
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-term-acc">{item.title}</a>
                </div>
                <button onClick={() => toggleNewsRead(item.id)} className={`text-xs px-3 py-2 rounded-xl border ${read ? "border-term-prim/40 text-term-prim" : "border-term-mut/30 text-term-mut"}`}>{read ? "Leida" : "Marcar"}</button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
