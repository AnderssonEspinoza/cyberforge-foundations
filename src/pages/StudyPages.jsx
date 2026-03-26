import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LESSON_INDEX, MODULES } from "../data/appData";
import { useAppStore } from "../services/useAppStore";
import { Badge, Card, StatusPill } from "../components/ui";
import NewsPanel from "../components/NewsPanel";

export function ModuleDetailPage() {
  const { moduleId } = useParams();
  const module = MODULES.find((item) => item.id === moduleId);
  if (!module) return <div>Modulo no encontrado.</div>;
  return (
    <div className="space-y-5 pb-24">
      <div><Badge>{module.title}</Badge><h2 className="text-2xl font-bold text-term-prim mt-2">Vista completa del modulo</h2><p className="text-sm text-term-mut mt-2">{module.desc}</p></div>
      <Card>
        <h3 className="font-bold text-term-acc">Lecciones</h3>
        <div className="mt-4 grid gap-3">{module.lessons.map((lesson) => <Link key={lesson.id} to={`/lesson/${module.id}/${lesson.id}`} className="p-4 rounded-xl border border-term-mut/30 hover:border-term-acc"><div className="font-bold">{lesson.title}</div><div className="text-sm text-term-mut mt-2">{lesson.summary}</div></Link>)}</div>
      </Card>
    </div>
  );
}

export function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const { state, markLessonCompleted, setLessonState, saveLessonNote } = useAppStore();
  const navigate = useNavigate();
  const module = MODULES.find((item) => item.id === moduleId);
  const lesson = module?.lessons.find((item) => item.id === lessonId);
  const note = state.lessonNotes[lessonId] || "";
  useEffect(() => window.scrollTo(0, 0), [lessonId]);
  if (!module || !lesson) return <div className="text-red-400">Leccion no encontrada.</div>;
  const words = lesson.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(4, Math.ceil(words / 180));
  const currentState = state.lessonStates[lessonId];
  const completed = state.completedLessons.includes(lessonId);
  return (
    <div className="space-y-6 pb-24">
      <button onClick={() => navigate(-1)} className="text-sm text-term-mut hover:text-white">Volver</button>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge>{module.title}</Badge>
          <h1 className="text-3xl font-bold mt-2">{lesson.title}</h1>
          <p className="text-sm text-term-mut mt-2">{lesson.summary}</p>
          <div className="text-xs text-term-mut mt-3">Lectura estimada: {minutes} min. Palabras aprox.: {words}.</div>
        </div>
        <StatusPill status={currentState} />
      </div>
      <Card className="prose-custom bg-black/55"><div dangerouslySetInnerHTML={{ __html: lesson.content }} /></Card>
      <Card>
        <h2 className="font-bold text-term-acc">Seguimiento de comprension</h2>
        <div className="grid md:grid-cols-4 gap-3 mt-4">{["confundido", "repasar", "entendido", "dominado"].map((status) => <button key={status} onClick={() => setLessonState(lessonId, status)} className={`py-3 rounded-xl border ${currentState === status ? "border-term-acc text-term-acc bg-term-acc/10" : "border-term-mut/30 text-term-text"}`}>{status}</button>)}</div>
        <button onClick={() => markLessonCompleted(lessonId)} className={`w-full mt-4 py-4 rounded-2xl font-bold ${completed ? "border border-term-prim text-term-prim" : "bg-term-prim text-black"}`}>{completed ? "Leccion completada" : "Marcar como completada"}</button>
      </Card>
      <Card>
        <h2 className="font-bold text-term-acc">Mini laboratorio guiado</h2>
        <p className="text-sm text-term-text mt-3 font-bold">{lesson.lab.title}</p>
        <div className="mt-3 space-y-2">{lesson.lab.steps.map((step) => <p key={step} className="text-sm text-term-text">- {step}</p>)}</div>
        <div className="mt-5"><h3 className="font-bold text-term-acc text-sm">Preguntas para consolidar</h3><div className="mt-3 space-y-2">{lesson.lab.questions.map((question) => <p key={question} className="text-sm text-term-text">- {question}</p>)}</div></div>
        <textarea value={note} onChange={(e) => saveLessonNote(lessonId, e.target.value)} placeholder="Escribe aqui lo que entendiste, dudas o hallazgos del mini lab..." className="w-full mt-5 min-h-[140px] bg-black border border-term-mut/30 rounded-2xl px-4 py-3 outline-none focus:border-term-acc"></textarea>
      </Card>
      <Card>
        <h2 className="font-bold text-term-acc">Fuentes y recursos</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div><div className="font-bold text-sm">Fuente oficial</div><div className="mt-3 space-y-2">{lesson.sources.official.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="block text-sm text-term-text hover:text-term-acc">{item.title}</a>)}</div></div>
          <div><div className="font-bold text-sm">Recurso practico</div><div className="mt-3 space-y-2">{lesson.sources.practical.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="block text-sm text-term-text hover:text-term-acc">{item.title}</a>)}</div></div>
          <div><div className="font-bold text-sm">Lectura opcional</div><div className="mt-3 space-y-2">{lesson.sources.optional.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="block text-sm text-term-text hover:text-term-acc">{item.title}</a>)}</div></div>
        </div>
      </Card>
      <Card><h2 className="font-bold text-term-acc">Errores comunes</h2><div className="mt-4 space-y-2">{lesson.mistakes.map((mistake) => <p key={mistake} className="text-sm text-term-text">- {mistake}</p>)}</div></Card>
    </div>
  );
}

export function FlashcardsPage() {
  const { state, reviewFlashcard } = useAppStore();
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const due = useMemo(() => state.flashcardQueue.filter((card) => card.dueAt <= Date.now()), [state.flashcardQueue]);
  if (!due.length) return <div className="pb-24"><Card className="max-w-2xl mx-auto text-center"><h2 className="text-2xl font-bold text-term-prim">Repaso al dia</h2><p className="text-sm text-term-mut mt-3">Las tarjetas dificiles vuelven en 3 dias y las faciles en 10 dias.</p></Card></div>;
  const card = due[index % due.length];
  const submit = (rating) => { reviewFlashcard(card.q, rating); setFlip(false); setIndex((prev) => prev + 1); };
  return (
    <div className="flex flex-col items-center pt-8 pb-24">
      <div className="text-xs uppercase tracking-[.22em] text-term-mut mb-4">Flashcards pendientes {Math.min(index + 1, due.length)}/{due.length}</div>
      <div className="w-full max-w-xl h-80 perspective-1000 cursor-pointer" onClick={() => setFlip(!flip)}>
        <div className={`w-full h-full relative transition-transform duration-500 transform-style-3d ${flip ? "rotate-y-180" : ""}`}>
          <div className="absolute inset-0 backface-hidden glass-panel rounded-3xl flex items-center justify-center p-8 text-center border border-term-acc/30"><div><div className="text-sm text-term-acc mb-4">Pregunta</div><div className="text-2xl font-bold">{card.q}</div></div></div>
          <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel rounded-3xl flex items-center justify-center p-8 text-center border border-term-prim/40 bg-term-prim/5"><div><div className="text-sm text-term-prim mb-4">Respuesta</div><div className="text-xl font-bold">{card.a}</div></div></div>
        </div>
      </div>
      {flip && <div className="w-full max-w-xl grid md:grid-cols-3 gap-3 mt-6"><button onClick={() => submit("again")} className="py-3 rounded-xl border border-red-500/40 text-red-400">No lo se</button><button onClick={() => submit("hard")} className="py-3 rounded-xl border border-yellow-500/40 text-yellow-300">Dificil 3 dias</button><button onClick={() => submit("easy")} className="py-3 rounded-xl border border-term-prim/40 text-term-prim">Facil 10 dias</button></div>}
    </div>
  );
}

export function QuizPage() {
  const { moduleId } = useParams();
  const { markLessonCompleted } = useAppStore();
  const navigate = useNavigate();
  const module = MODULES.find((item) => item.id === moduleId);
  const [difficulty, setDifficulty] = useState("basico");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  useEffect(() => { setCurrent(0); setScore(0); setSelected(null); setAnswered(false); setFinished(false); }, [difficulty, moduleId]);
  if (!module) return <div>Modulo no encontrado.</div>;
  const questions = module.quizzes[difficulty];
  const question = questions[current];
  const choose = (idx) => { if (answered) return; setSelected(idx); setAnswered(true); if (idx === question.correct) setScore((prev) => prev + 1); };
  const next = () => {
    if (current === questions.length - 1) {
      setFinished(true);
      if (score / questions.length >= 0.6) markLessonCompleted(module.lessons[0].id);
      return;
    }
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setAnswered(false);
  };
  if (finished) {
    const passed = score / questions.length >= 0.6;
    return <div className="pb-24"><Card className="max-w-xl mx-auto text-center"><h2 className={`text-3xl font-bold ${passed ? "text-term-prim" : "text-red-400"}`}>{passed ? "Evaluacion superada" : "Necesitas reforzar conceptos"}</h2><p className="text-term-mut mt-3">Resultado {score}/{questions.length} en dificultad {difficulty}.</p><div className="flex gap-3 justify-center mt-6"><button onClick={() => navigate(`/module/${module.id}`)} className="px-5 py-3 rounded-xl border border-term-mut/30">Volver al modulo</button><button onClick={() => navigate(`/lesson/${module.id}/${module.lessons[0].id}`)} className="px-5 py-3 rounded-xl bg-term-prim text-black font-bold">Repasar</button></div></Card></div>;
  }
  return (
    <div className="max-w-3xl mx-auto pb-24">
      <div className="flex flex-wrap gap-2 mb-6">{["basico", "aplicado", "escenario"].map((item) => <button key={item} onClick={() => setDifficulty(item)} className={`px-4 py-2 rounded-full border text-sm ${difficulty === item ? "border-term-acc text-term-acc bg-term-acc/10" : "border-term-mut/30 text-term-mut"}`}>{item}</button>)}</div>
      <div className="flex justify-between text-xs text-term-mut mb-3"><span>{module.title}</span><span>{difficulty} {current + 1}/{questions.length}</span></div>
      <div className="h-2 bg-black rounded-full border border-term-mut/30 overflow-hidden mb-8"><div className="h-full bg-term-acc" style={{ width: `${(current / questions.length) * 100}%` }}></div></div>
      <h2 className="text-2xl font-bold mb-8">{question.q}</h2>
      <div className="space-y-3">{question.options.map((option, idx) => { const ok = answered && idx === question.correct; const bad = answered && idx === selected && idx !== question.correct; return <button key={option} onClick={() => choose(idx)} disabled={answered} className={`w-full text-left p-4 rounded-2xl border ${ok ? "border-term-prim text-term-prim bg-term-prim/10" : bad ? "border-red-500 text-red-400 bg-red-500/10" : "border-term-mut/30 hover:border-term-acc"}`}><span className="opacity-60 mr-3">[{["A","B","C","D"][idx]}]</span>{option}</button>; })}</div>
      {answered && <Card className="mt-6"><div className="font-bold text-term-acc">Explicacion</div><p className="text-sm text-term-text mt-3">{question.explanation}</p></Card>}
      {answered && <button onClick={next} className="w-full mt-6 py-4 rounded-2xl bg-term-prim text-black font-bold">{current === questions.length - 1 ? "Finalizar" : "Siguiente"}</button>}
    </div>
  );
}

export function NewsPage() {
  return <div className="pb-24"><NewsPanel /></div>;
}
