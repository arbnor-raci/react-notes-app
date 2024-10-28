import { formatRelative } from "date-fns";
import { de } from "date-fns/locale";

import useNotes from "../hooks/useNotes";
import NoteListItem from "./NoteListItem";
import ListEmptyComponent from "./ListEmptyComponent";

const renderEmptyState = () => (
  <ListEmptyComponent
    title={"Keine Notizen"}
    description={"Beginne mit der Erstellung einer neuen Notiz."}
  />
);

const NoteList = () => {
  const { activeNote, notes, selectNote } = useNotes();

  if (notes.length === 0) {
    return renderEmptyState();
  }

  const renderNotes = () => {
    return notes.map((note) => {
      const relativeOrDay = formatRelative(
        new Date(note.createdAt),
        new Date(),
        { locale: de }
      );
      return (
        <NoteListItem
          key={note.id}
          note={note}
          onClick={() => selectNote(note)}
          active={activeNote?.id === note.id}
          relativeDate={relativeOrDay}
        />
      );
    });
  };

  return (
    <div className="w-full overflow-y-scroll p-3" style={{ height: 650 }}>
      {renderNotes()}
    </div>
  );
};

export default NoteList;
