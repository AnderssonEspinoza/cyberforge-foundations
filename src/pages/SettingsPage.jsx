import { Link } from "react-router-dom";
import { LESSON_INDEX } from "../data/appData";
import { Card } from "../components/ui";
import { useAppStore } from "../services/useAppStore";

export default function SettingsPage() {
  const { state, toggleFocusMode } = useAppStore();
  const savedNotes = Object.entries(state.lessonNotes || {})
    .map(([lessonId, note]) => {
      const lesson = LESSON_INDEX.find((item) => item.id === lessonId);
      const normalized = typeof note === "string"
        ? { understood: note, confused: "", nextStep: "" }
        : { understood: note?.understood || "", confused: note?.confused || "", nextStep: note?.nextStep || "" };
      return lesson ? { lesson, note: normalized } : null;
    })
    .filter(Boolean)
    .filter(({ note }) => note.understood.trim() || note.confused.trim() || note.nextStep.trim());

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `zeroday-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        localStorage.setItem("zeroday_learner_v1", e.target.result);
        window.location.reload();
      } catch (error) {
        alert("Backup invalido.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-5 pb-24">
      <div>
        <h2 className="text-2xl font-bold text-term-prim">Configuracion</h2>
        <p className="text-sm text-term-mut mt-2">Todo tu progreso se guarda localmente en este navegador.</p>
      </div>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-bold">Modo enfoque</div>
            <div className="text-sm text-term-mut mt-2">Reduce distracciones visuales durante lecturas largas.</div>
          </div>
          <button onClick={toggleFocusMode} className={`px-4 py-2 rounded-xl border ${state.focusMode ? "border-term-prim text-term-prim" : "border-term-mut/30 text-term-mut"}`}>
            {state.focusMode ? "Activo" : "Inactivo"}
          </button>
        </div>
      </Card>

      <Card>
        <div className="mb-4">
          <h3 className="font-bold text-term-acc">Respaldo de progreso</h3>
          <p className="text-sm text-term-mut mt-2">Descarga un archivo .json con tu avance para restaurarlo luego en este u otro dispositivo.</p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={exportData} className="w-full py-3 rounded-xl border border-term-mut/30">Exportar progreso</button>
          <label className="w-full py-3 rounded-xl border border-term-mut/30 text-center cursor-pointer">
            Importar progreso
            <input type="file" accept=".json" className="hidden" onChange={importData} />
          </label>
          <p className="text-xs text-term-mut px-1">Importar reemplaza el progreso guardado actualmente en este navegador.</p>
          <button onClick={() => { localStorage.removeItem("zeroday_learner_v1"); window.location.reload(); }} className="w-full py-3 rounded-xl border border-red-500/40 text-red-400">
            Borrar progreso local
          </button>
        </div>
      </Card>

      <Card>
        <div id="notes" className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-term-acc">Mis notas de estudio</h3>
            <p className="text-sm text-term-mut mt-2">Aqui vuelves a tus dudas, resúmenes y siguientes pasos guardados desde las lecciones.</p>
          </div>
          <div className="text-xs text-term-mut whitespace-nowrap">{savedNotes.length} notas</div>
        </div>
        {!savedNotes.length ? (
          <p className="text-sm text-term-mut mt-4">Aun no has guardado notas. Cuando escribas en una leccion, apareceran aqui automaticamente.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {savedNotes.map(({ lesson, note }) => (
              <Link key={lesson.id} to={`/lesson/${lesson.moduleId}/${lesson.id}`} className="block rounded-2xl border border-term-mut/30 p-4 hover:border-term-acc">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold">{lesson.title}</div>
                    <div className="text-xs text-term-mut mt-1">{lesson.moduleTitle}</div>
                  </div>
                  <div className="text-xs text-term-acc">Abrir</div>
                </div>
                {note.understood && <p className="text-sm text-term-text mt-3"><span className="text-term-prim">Entendi:</span> {note.understood}</p>}
                {note.confused && <p className="text-sm text-term-text mt-2"><span className="text-yellow-300">Duda:</span> {note.confused}</p>}
                {note.nextStep && <p className="text-sm text-term-text mt-2"><span className="text-term-acc">Siguiente paso:</span> {note.nextStep}</p>}
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
