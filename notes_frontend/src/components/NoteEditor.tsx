"use client";
import React, { useState } from "react";
import { Note } from "../utils/notesApi";

type NoteEditorProps = {
  note?: Note;
  loading?: boolean;
  onSubmit: (payload: { title: string; content: string }) => Promise<void>;
  onDelete?: () => Promise<void>;
  onCancel?: () => void;
};

// PUBLIC_INTERFACE
const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  loading,
  onSubmit,
  onDelete,
  onCancel,
}) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({ title, content });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!onDelete) return;
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-4 w-full h-full">
      <input
        type="text"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="text-lg px-2 py-2 border-b border-secondary/20 focus:outline-none focus:border-accent bg-transparent"
        required
        autoFocus
      />
      <textarea
        name="content"
        rows={12}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your note here..."
        className="flex-grow px-2 py-2 border border-secondary/20 rounded focus:outline-none focus:border-accent bg-transparent resize-none"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving || loading}
          className="px-6 py-2 rounded bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-accent transition"
        >
          {note ? "Save" : "Create"}
        </button>
        {note && onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-400"
          >
            Delete
          </button>
        )}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="ml-auto px-4 py-2 rounded border border-secondary text-secondary hover:bg-secondary/10"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteEditor;
