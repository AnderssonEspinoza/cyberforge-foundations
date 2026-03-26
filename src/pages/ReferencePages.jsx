import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GLOSSARY, LEVELS, ROLE_TRACKS, STUDY_GUIDE, MODULES } from "../data/appData";
import { Badge, Card, StatusPill } from "../components/ui";
import { useAppStore } from "../services/useAppStore";

export function RoadmapPage() {
  return (
    <div className="space-y-5 pb-24">
      <div><h2 className="text-2xl font-bold text-term-prim">Ruta por niveles</h2><p className="text-sm text-term-mut mt-2">Esta ruta te dice que estudiar primero y que dejar para despues.</p></div>
      {LEVELS.map((level, idx) => <Card key={level.id}><Badge>Etapa {idx + 1}</Badge><h3 className="text-xl font-bold mt-2">{level.title}</h3><p className="text-term-text mt-3">{level.focus}</p></Card>)}
    </div>
  );
}

export function GuidePage() {
  return (
    <div className="space-y-5 pb-24">
      <div><h2 className="text-2xl font-bold text-term-prim">Como estudiar ciberseguridad</h2><p className="text-sm text-term-mut mt-2">Metodo antes que ansiedad.</p></div>
      {STUDY_GUIDE.map((block) => <Card key={block.title}><h3 className="text-lg font-bold">{block.title}</h3><div className="mt-4 space-y-3">{block.points.map((point) => <p key={point} className="text-sm text-term-text">- {point}</p>)}</div></Card>)}
    </div>
  );
}

export function TracksPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-5 pb-24">
      <div><h2 className="text-2xl font-bold text-term-prim">Trayectorias por rol</h2><p className="text-sm text-term-mut mt-2">No necesitas estudiar todo con el mismo peso.</p></div>
      {ROLE_TRACKS.map((track) => (
        <Card key={track.id}>
          <h3 className="text-xl font-bold">{track.title}</h3>
          <p className="text-sm text-term-text mt-3">{track.focus}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {track.recommended.map((moduleId) => {
              const module = MODULES.find((item) => item.id === moduleId);
              return <button key={moduleId} onClick={() => navigate(`/module/${moduleId}`)} className="px-3 py-2 rounded-xl border border-term-mut/30 hover:border-term-acc text-sm">{module.title}</button>;
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}

export function GlossaryPage() {
  const [query, setQuery] = useState("");
  const filtered = GLOSSARY.filter((item) => (`${item.term} ${item.def}`).toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-5 pb-24">
      <div><h2 className="text-2xl font-bold text-term-prim">Glosario vivo</h2><p className="text-sm text-term-mut mt-2">Cuando un termino te frene, vuelves aqui.</p></div>
      <Card><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar termino..." className="w-full bg-black border border-term-mut/30 rounded-xl px-4 py-3 outline-none focus:border-term-acc" /></Card>
      <div className="grid md:grid-cols-2 gap-4">{filtered.map((item) => <Card key={item.term}><div className="font-bold text-term-prim">{item.term}</div><p className="text-sm text-term-text mt-3">{item.def}</p></Card>)}</div>
    </div>
  );
}

export function ModulesPage() {
  const { state } = useAppStore();
  return (
    <div className="space-y-5 pb-24">
      <div><h2 className="text-2xl font-bold text-term-prim">Modulos y lecciones</h2><p className="text-sm text-term-mut mt-2">Cada modulo trae varias lecciones, mini labs, errores comunes y referencias verificables.</p></div>
      {MODULES.map((module) => (
        <Card key={module.id}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <Badge>{LEVELS.find((level) => level.id === module.stage)?.title || module.stage}</Badge>
              <h3 className="text-xl font-bold mt-2">{module.title}</h3>
              <p className="text-sm text-term-mut mt-2">{module.desc}</p>
              <div className="mt-4 grid gap-2">
                    {module.lessons.map((lesson, idx) => (
                      <Link key={lesson.id} to={`/lesson/${module.id}/${lesson.id}`} className="p-3 rounded-xl border border-term-mut/30 hover:border-term-acc">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-sm">{idx + 1}. {lesson.title}</div>
                            <div className="text-xs text-term-mut mt-1">{lesson.summary}</div>
                          </div>
                          <StatusPill status={state.lessonStates[lesson.id]} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 min-w-[200px]">
                  <Link to={`/module/${module.id}`} className="px-4 py-3 rounded-xl border border-term-mut/30 text-center hover:border-term-acc">Ver modulo</Link>
                  <Link to={`/quiz/${module.id}`} className="px-4 py-3 rounded-xl bg-term-prim text-black font-bold text-center">Evaluarme</Link>
                </div>
              </div>
            </Card>
      ))}
    </div>
  );
}
