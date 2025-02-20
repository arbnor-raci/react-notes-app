import { Note } from "../context/NoteContext";

export const generateNoteId = () => Date.now();

export const loadNotes = (): Note[] => {
  const notesJSON = localStorage.getItem("notes");

  if (notesJSON === null) return [];
  return JSON.parse(notesJSON);
};

export const isUndefinedOrNull = <T>(
  value: T | undefined | null
): value is undefined | null => value === undefined || value === null;
