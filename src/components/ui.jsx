export function Card({ className = "", children }) {
  return <div className={`glass-panel rounded-2xl p-5 shadow-[0_0_30px_rgba(0,0,0,.28)] ${className}`}>{children}</div>;
}

export function Badge({ children, color = "text-term-acc" }) {
  return <span className={`text-xs uppercase tracking-[.22em] ${color}`}>{children}</span>;
}

export function StatusPill({ status }) {
  const map = {
    confundido: "border-red-500/40 text-red-400",
    repasar: "border-yellow-500/40 text-yellow-300",
    entendido: "border-sky-400/40 text-sky-300",
    dominado: "border-term-prim/40 text-term-prim",
  };
  return <span className={`px-2 py-1 text-[10px] rounded-full border ${map[status] || "border-term-mut/30 text-term-mut"}`}>{status || "sin estado"}</span>;
}
