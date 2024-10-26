import React, { createContext, useState, useEffect } from "react";

export const NotesContext = createContext();

const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(savedNotes);
  const [activeNote, setActiveNote] = useState(
    savedNotes.length > 0 ? savedNotes[0] : null
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
    return note;
  };

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    // Setze die aktive Notiz zurück, falls sie gelöscht wurde
    if (activeNote && activeNote.id === noteId) {
      setActiveNote(null);
    }
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const selectNote = (note) => {
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
