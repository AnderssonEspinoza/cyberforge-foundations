import { useNavigate } from "react-router-dom";
import { LESSON_INDEX, LESSON_STATES, LEVELS } from "../data/appData";
import { useAppStore } from "../services/useAppStore";
import { Badge, Card, StatusPill } from "../components/ui";
import NewsPanel from "../components/NewsPanel";

export default function DashboardPage() {
  const { state } = useAppStore();
  const navigate = useNavigate();
  const done = state.completedLessons.length;
  const total = LESSON_INDEX.length;
  const progress = Math.round((done / total) * 100);
  const lessonOfDay = LESSON_INDEX[(new Date().getDate() - 1) % LESSON_INDEX.length];
  const statusCounts = LESSON_STATES.map((status) => ({ status, count: Object.values(state.lessonStates).filter((value) => value === status).length }));

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge>ZeroDay</Badge>
          <h1 className="text-3xl font-bold text-term-prim mt-2">Aprende ciberseguridad todos los dias</h1>
          <p className="text-sm text-term-mut mt-2 max-w-3xl">Fundamentos, mini labs, glosario, quizzes por dificultad, tracks por rol y noticias reales en una base open source mantenible.</p>
        </div>
        <Card className="text-center min-w-[140px]">
          <div className="text-2xl font-black text-orange-400">{state.streak}</div>
          <div className="text-xs text-term-mut mt-1">dias seguidos</div>
          <div className="text-xs text-term-acc mt-2">XP {state.xp}</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <Badge color="text-term-acc">Leccion del dia</Badge>
          <h2 className="text-xl font-bold mt-2">{lessonOfDay.moduleTitle}</h2>
          <p className="text-term-text mt-2">{lessonOfDay.title}</p>
          <p className="text-sm text-term-mut mt-2">{lessonOfDay.summary}</p>
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-term-mut">Progreso total</span>
              <span className="text-term-prim font-bold">{progress}%</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-black border border-term-mut/30 overflow-hidden">
              <div className="h-full bg-term-prim shadow-glow" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            <button onClick={() => navigate(`/lesson/${lessonOfDay.moduleId}/${lessonOfDay.id}`)} className="px-4 py-2 rounded-xl bg-term-prim text-black font-bold">Abrir leccion</button>
            <button onClick={() => navigate("/roadmap")} className="px-4 py-2 rounded-xl border border-term-mut/30">Ver ruta</button>
            <button onClick={() => navigate("/tracks")} className="px-4 py-2 rounded-xl border border-term-mut/30">Explorar tracks</button>
          </div>
        </Card>

        <Card>
          <Badge color="text-term-warn">Seguimiento real</Badge>
          <div className="space-y-3 mt-4">
            {statusCounts.map((item) => <div key={item.status} className="flex items-center justify-between"><StatusPill status={item.status} /><span className="text-sm">{item.count}</span></div>)}
          </div>
          <div className="mt-5 text-xs text-term-mut">Completadas: {done} de {total} lecciones.</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {LEVELS.map((level) => <Card key={level.id}><Badge>{level.title}</Badge><p className="text-sm mt-3 text-term-text">{level.focus}</p></Card>)}
      </div>

      <NewsPanel compact />
    </div>
  );
}
