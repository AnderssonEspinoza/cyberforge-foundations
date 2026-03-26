import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "cyberforge_foundations_v4";
const AppStoreContext = createContext(null);

function getInitialState(modules) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (error) {}
  return {
    completedLessons: [],
    lessonStates: {},
    lessonNotes: {},
    streak: 0,
    lastActiveDate: null,
    xp: 0,
    readNews: [],
    focusMode: false,
    flashcardQueue: modules.flatMap((module) => module.flashcards).map((card) => ({ ...card, dueAt: Date.now() })),
  };
}

function touchDay(prev) {
  const today = new Date().toISOString().slice(0, 10);
  let streak = prev.streak;
  if (prev.lastActiveDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().slice(0, 10);
    streak = prev.lastActiveDate === yesterdayKey ? prev.streak + 1 : 1;
  }
  return { streak, today };
}

export function AppStoreProvider({ modules, children }) {
  const [state, setState] = useState(() => getInitialState(modules));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const markLessonCompleted = (lessonId) => {
    setState((prev) => {
      const { streak, today } = touchDay(prev);
      return {
        ...prev,
        completedLessons: prev.completedLessons.includes(lessonId) ? prev.completedLessons : [...prev.completedLessons, lessonId],
        streak,
        lastActiveDate: today,
        xp: prev.completedLessons.includes(lessonId) ? prev.xp : prev.xp + 60,
      };
    });
  };

  const setLessonState = (lessonId, status) => {
    setState((prev) => {
      const { streak, today } = touchDay(prev);
      return {
        ...prev,
        lessonStates: { ...prev.lessonStates, [lessonId]: status },
        streak,
        lastActiveDate: today,
        xp: prev.xp + 5,
      };
    });
  };

  const saveLessonNote = (lessonId, value) => {
    setState((prev) => ({ ...prev, lessonNotes: { ...prev.lessonNotes, [lessonId]: value } }));
  };

  const reviewFlashcard = (question, rating) => {
    setState((prev) => ({
      ...prev,
      flashcardQueue: prev.flashcardQueue.map((card) =>
        card.q !== question ? card : { ...card, dueAt: Date.now() + (rating === "again" ? 0 : rating === "hard" ? 3 : 10) * 86400000 }
      ),
      xp: prev.xp + 5,
    }));
  };

  const toggleNewsRead = (id) => {
    setState((prev) => ({
      ...prev,
      readNews: prev.readNews.includes(id) ? prev.readNews.filter((item) => item !== id) : [...prev.readNews, id],
    }));
  };

  const toggleFocusMode = () => setState((prev) => ({ ...prev, focusMode: !prev.focusMode }));

  return (
    <AppStoreContext.Provider value={{ state, markLessonCompleted, setLessonState, saveLessonNote, reviewFlashcard, toggleNewsRead, toggleFocusMode }}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  return useContext(AppStoreContext);
}
