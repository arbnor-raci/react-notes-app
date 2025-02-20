import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";

const useNotes = () => {
  return useContext(NotesContext);
};

export default useNotes;
