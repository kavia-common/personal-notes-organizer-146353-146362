import React from "react";
import Link from "next/link";
import { Note } from "../utils/notesApi";

type NoteListProps = {
  notes: Note[];
  selectedId?: string;
};

// PUBLIC_INTERFACE
const NoteList: React.FC<NoteListProps> = ({ notes, selectedId }) => (
  <ul className="divide-y divide-secondary/10 bg-background rounded shadow">
    {notes.length === 0 && (
      <li className="py-4 text-secondary text-center text-sm">No notes yet.</li>
    )}
    {notes.map((note) => (
      <li key={note.id}>
        <Link
          href={`/?note=${encodeURIComponent(note.id)}`}
          scroll={false}
          className={`block px-5 py-4 truncate ${
            note.id === selectedId
              ? "bg-accent/10 text-primary font-medium"
              : "hover:bg-secondary/10"
          }`}
        >
          {note.title || <span className="italic text-secondary">Untitled</span>}
        </Link>
      </li>
    ))}
  </ul>
);

export default NoteList;
