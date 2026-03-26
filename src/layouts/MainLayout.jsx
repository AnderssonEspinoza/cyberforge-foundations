import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { House, Milestone, BookOpen, Library, BookA, Compass, Layers, Newspaper, Settings } from "lucide-react";

const navItems = [
  { path: "/", label: "Inicio", icon: House },
  { path: "/roadmap", label: "Ruta", icon: Milestone },
  { path: "/guide", label: "Guia", icon: BookOpen },
  { path: "/modules", label: "Modulos", icon: Library },
  { path: "/glossary", label: "Glosario", icon: BookA },
  { path: "/tracks", label: "Tracks", icon: Compass },
  { path: "/flashcards", label: "Flash", icon: Layers },
  { path: "/news", label: "Noticias", icon: Newspaper },
  { path: "/settings", label: "Config", icon: Settings },
];

export default function MainLayout({ children }) {
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-28 relative z-10">
      {children}
      <nav className="fixed bottom-0 left-0 right-0 glass-panel border-t border-term-mut/20 rounded-t-3xl px-2 py-3 z-50">
        <div className="max-w-6xl mx-auto flex gap-1 overflow-x-auto hide-scrollbar">
          {navItems.map((item) => {
            const active = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className={`min-w-[80px] flex flex-col items-center gap-1 px-3 py-2 rounded-xl ${active ? "text-term-prim" : "text-term-mut"}`}>
                <Icon className="w-5 h-5" />
                <span className="text-[10px] uppercase">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
