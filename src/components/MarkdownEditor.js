import { useEffect } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Toolbar from "./Toolbar";
import useNotes from "../hooks/useNotes";
import CreateNoteButton from "./CreateNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
import { getCurrentISOTime } from "../utils/dateUtils";

const generateNoteId = () => Date.now();

const MarkdownEditor = () => {
  const { activeNote, updateNote, createNote, deleteNote, selectNote, notes } =
    useNotes();

  const handleSave = () => {
    const note = createNote({
      id: generateNoteId(),
      title: "",
      content: editor.getHTML(),
      createdAt: getCurrentISOTime(),
      updatedAt: getCurrentISOTime(),
    });

    selectNote(note);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: activeNote ? activeNote.content : "",
    onUpdate: ({ editor }) => {
      const rawText = editor.getText();

      if (activeNote) {
        updateNote({
          ...activeNote,
          title: rawText.length > 20 ? rawText.substring(0, 20) + "…" : rawText,
          content: editor.getHTML(),
        });
      } else {
        handleSave();
      }
    },
  });

  useEffect(() => {
    editor.commands.focus();
    if (!activeNote) return;
    editor.commands.setContent(activeNote.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNote]);

  const handleCreateNewNote = () => {
    const note = createNote({
      id: generateNoteId(),
      title: "",
      content: "",
      createdAt: getCurrentISOTime(),
      updatedAt: getCurrentISOTime(),
    });

    selectNote(note);
    editor.commands.focus();
  };

  const handleDelete = () => {
    deleteNote(activeNote.id);
    editor.commands.setContent("");
  };

  return (
    <div className="flex flex-col w-full relative">
      <Toolbar editor={editor} />

      <EditorContent
        className="w-full p-4 text-gray-900 caret-yellow-400 selection:bg-yellow-300 selection:text-yellow-900 flex-grow overflow-y-auto"
        editor={editor}
      />
      <div className="p-4 flex flex-row items-center justify-between">
        {activeNote && (
          <div className="text-slate-400 text-sm">
            {format(new Date(activeNote.updatedAt), "d. MMMM yyyy 'um' HH:mm", {
              locale: de,
            })}
          </div>
        )}
        <div className="flex flex-row gap-x-4">
          {activeNote && (
            <DeleteNoteButton title={"Löschen"} onClick={handleDelete} />
          )}
          {notes.length > 0 && (
            <CreateNoteButton
              title={"Notiz erstellen"}
              onClick={handleCreateNewNote}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;