import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { AppStoreProvider, useAppStore } from "./services/useAppStore";
import { MODULES } from "./data/appData";
import DashboardPage from "./pages/DashboardPage";
import { GlossaryPage, GuidePage, ModulesPage, RoadmapPage, TracksPage } from "./pages/ReferencePages";
import { FlashcardsPage, LessonPage, ModuleDetailPage, NewsPage, QuizPage } from "./pages/StudyPages";
import SettingsPage from "./pages/SettingsPage";

function AppRoutes() {
  const { state } = useAppStore();

  useEffect(() => {
    document.body.style.background = state.focusMode ? "#040404" : "";
    return () => {
      document.body.style.background = "";
    };
  }, [state.focusMode]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/tracks" element={<TracksPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/module/:moduleId" element={<ModuleDetailPage />} />
        <Route path="/lesson/:moduleId/:lessonId" element={<LessonPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/quiz/:moduleId" element={<QuizPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </MainLayout>
  );
}

export default function App() {
  return (
    <AppStoreProvider modules={MODULES}>
      <AppRoutes />
    </AppStoreProvider>
  );
}
