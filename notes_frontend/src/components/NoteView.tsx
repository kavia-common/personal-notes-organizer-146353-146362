import React from "react";
import { Note } from "../utils/notesApi";

// PUBLIC_INTERFACE
type Props = { note: Note };

const NoteView: React.FC<Props> = ({ note }) => (
  <article className="p-4 w-full max-w-2xl">
    <h2 className="text-xl font-semibold mb-2 text-primary">
      {note.title || <span className="italic text-secondary">Untitled</span>}
    </h2>
    <div className="prose prose-neutral text-foreground whitespace-pre-line">
      {note.content}
    </div>
    <p className="mt-6 text-xs text-secondary">
      Last updated: {new Date(note.updated_at).toLocaleString()}
    </p>
  </article>
);

export default NoteView;
