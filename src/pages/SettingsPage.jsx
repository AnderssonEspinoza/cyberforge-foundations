import { Card } from "../components/ui";
import { useAppStore } from "../services/useAppStore";

export default function SettingsPage() {
  const { state, toggleFocusMode } = useAppStore();

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
        <div className="flex flex-col gap-3">
          <button onClick={exportData} className="w-full py-3 rounded-xl border border-term-mut/30">Exportar progreso</button>
          <label className="w-full py-3 rounded-xl border border-term-mut/30 text-center cursor-pointer">
            Importar progreso
            <input type="file" accept=".json" className="hidden" onChange={importData} />
          </label>
          <button onClick={() => { localStorage.removeItem("zeroday_learner_v1"); window.location.reload(); }} className="w-full py-3 rounded-xl border border-red-500/40 text-red-400">
            Borrar progreso local
          </button>
        </div>
      </Card>
    </div>
  );
}
