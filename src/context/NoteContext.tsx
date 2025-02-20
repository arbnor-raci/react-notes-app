import React, { createContext, useState, useEffect, FC } from "react";
import { loadNotes } from "../utils";

export const NotesContext = createContext<{
  notes: Note[];
  activeNote: Note | null;
  createNote: (note: Note) => Note;
  deleteNote: (noteId: number) => void;
  updateNote: (updatedNote: Note) => void;
  selectNote: (note: Note) => void;
}>({
  notes: [],
  activeNote: null,
  createNote: () => ({
    id: 0,
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  }),
  deleteNote: () => {},
  updateNote: () => {},
  selectNote: () => {},
});

export interface Note {
  id: number;
  title: string;
  content: string | undefined;
  createdAt: string;
  updatedAt: string;
}

const savedNotes: Note[] = loadNotes();

interface NotesProviderProps {
  children: React.ReactNode;
}

export const NotesProvider: FC<NotesProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState(savedNotes);
  const [activeNote, setActiveNote] = useState(
    savedNotes.length > 0 ? savedNotes[0] : null
  );

  console.log({ notes, activeNote });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = (note: Note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
    return note;
  };

  const deleteNote = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    // Setze die aktive Notiz zurück, falls sie gelöscht wurde

    if (activeNote && activeNote.id === noteId) {
      setActiveNote(null);
    }
  };

  const updateNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const selectNote = (note: Note) => {
    setActiveNote(note);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        activeNote,
        createNote,
        deleteNote,
        updateNote,
        selectNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
