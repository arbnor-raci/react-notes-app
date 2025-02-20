import React, { FC } from "react";
import { Note } from "../context/NoteContext";

interface NoteListItemProps {
  note: Note;
  onClick: () => void;
  active: boolean;
  relativeDate: string;
}

const NoteListItem: FC<NoteListItemProps> = ({
  note,
  onClick,
  active,
  relativeDate,
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer rounded-md ${
        active && "bg-yellow-300"
      }`}
    >
      <h3 className="text-sm font-bold">{note.title}</h3>
      <p className="text-xs font-medium">{relativeDate}</p>
    </div>
  );
};

export default NoteListItem;
