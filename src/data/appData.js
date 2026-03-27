import { MODULES } from "./modules";

export { LESSON_STATES, GLOSSARY, LEVELS, STUDY_GUIDE, ROLE_TRACKS } from "./coreData";
export { MODULES } from "./modules";

export const LESSON_INDEX = MODULES.flatMap((module) =>
  module.lessons.map((lessonItem) => ({
    ...lessonItem,
    moduleId: module.id,
    moduleTitle: module.title,
    stage: module.stage,
  }))
);
