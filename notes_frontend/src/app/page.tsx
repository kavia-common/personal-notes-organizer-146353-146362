"use client";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NoteList from "../components/NoteList";
import NoteView from "../components/NoteView";
import NoteEditor from "../components/NoteEditor";
import * as notesApi from "../utils/notesApi";

type NotesPageMode = "list" | "view" | "edit" | "new";

export default function Home() {
  const [notes, setNotes] = useState<notesApi.Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<notesApi.Note | null>(null);
  const [mode, setMode] = useState<NotesPageMode>("list"); // could be "view", "edit", or "new"
  const [error, setError] = useState<string | null>(null);

  // Load notes from API
  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const notes = await notesApi.fetchNotes();
      setNotes(notes);
    } catch (err) {
      const error =
        err && typeof err === "object" && "message" in err ? (err as { message: string }).message : "Failed to fetch notes";
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // On mount, load notes
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Listen for query string changes (for selecting a note)
  useEffect(() => {
    function getNoteIdFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get("note");
    }
    function handlePopState() {
      const noteId = getNoteIdFromUrl();
      setSelectedId(noteId);
      setMode(noteId ? "view" : "list");
    }
    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Fetch selected note details when needed
  useEffect(() => {
    async function loadNoteDetail() {
      if (selectedId) {
        setLoading(true);
        setError(null);
        try {
          const note = await notesApi.fetchNote(selectedId);
          setSelectedNote(note);
        } catch (err) {
          const error =
            err && typeof err === "object" && "message" in err
              ? (err as { message: string }).message
              : "Failed to fetch note";
          setError(error);
          setSelectedNote(null);
        } finally {
          setLoading(false);
        }
      } else {
        setSelectedNote(null);
      }
    }
    loadNoteDetail();
  }, [selectedId]);

  function handleNewNote() {
    setSelectedId(null);
    setMode("new");
    setSelectedNote(null);
    window.history.pushState(null, "", "/new");
  }

  function handleEditNote() {
    setMode("edit");
  }

  function handleCancelEdit() {
    if (selectedNote) {
      setMode("view");
    } else {
      setMode("list");
      window.history.pushState(null, "", "/");
    }
  }

  async function handleSave(noteData: { title: string; content: string }) {
    setLoading(true);
    setError(null);
    try {
      if (mode === "new") {
        const newNote = await notesApi.createNote(noteData);
        setNotes((n) => [newNote, ...n]);
        setSelectedId(newNote.id);
        setSelectedNote(newNote);
        setMode("view");
        window.history.pushState(null, "", "/?note=" + encodeURIComponent(newNote.id));
      } else if (mode === "edit" && selectedNote) {
        const updated = await notesApi.updateNote(selectedNote.id, noteData);
        setNotes((n) => n.map((note) => (note.id === updated.id ? updated : note)));
        setSelectedNote(updated);
        setMode("view");
      }
    } catch (err) {
      const error =
        err && typeof err === "object" && "message" in err ? (err as { message: string }).message : "Failed to save note";
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteNote() {
    if (!selectedNote) return;
    setLoading(true);
    setError(null);
    try {
      await notesApi.deleteNote(selectedNote.id);
      setNotes((n) => n.filter((note) => note.id !== selectedNote.id));
      setSelectedId(null);
      setSelectedNote(null);
      setMode("list");
      window.history.pushState(null, "", "/");
    } catch (err) {
      const error =
        err && typeof err === "object" && "message" in err
          ? (err as { message: string }).message
          : "Failed to delete note";
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // Render sidebar, note list, and detail/editor view
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header />
      <div className="flex flex-1 max-h-[calc(100vh-3.5rem)] overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 h-full min-h-0 max-h-full">
          <section className="w-[280px] max-w-xs min-w-[180px] hidden sm:block border-r border-secondary/10 p-0">
            <NoteList notes={notes} selectedId={selectedId || undefined} />
            <button
              className="mt-4 px-4 py-2 rounded w-full bg-accent text-foreground font-semibold hover:bg-accent/80 focus:ring-2 focus:ring-primary transition"
              onClick={handleNewNote}
            >
              + New Note
            </button>
          </section>
          <section className="flex flex-col flex-1 h-full p-6 overflow-y-auto items-start">
            {error && (
              <div className="mb-4 text-red-500 bg-red-50 border border-red-300 px-4 py-2 rounded text-sm w-full">
                {error}
              </div>
            )}
            {mode === "new" && (
              <NoteEditor
                onSubmit={handleSave}
                onCancel={handleCancelEdit}
                loading={loading}
              />
            )}
            {mode === "edit" && selectedNote && (
              <NoteEditor
                note={selectedNote}
                onSubmit={handleSave}
                onCancel={handleCancelEdit}
                onDelete={handleDeleteNote}
                loading={loading}
              />
            )}
            {mode === "view" && selectedNote && (
              <div className="w-full">
                <NoteView note={selectedNote} />
                <div className="mt-4">
                  <button
                    onClick={handleEditNote}
                    className="px-4 py-2 rounded bg-accent text-background font-semibold hover:bg-accent/70"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
            {mode === "list" && (
              <div className="w-full">
                <h2 className="text-2xl text-primary font-semibold mb-4">Your Notes</h2>
                <NoteList notes={notes} selectedId={selectedId || undefined} />
                <button
                  className="mt-4 px-4 py-2 rounded bg-accent text-foreground font-semibold hover:bg-accent/80 focus:ring-2 focus:ring-primary transition"
                  onClick={handleNewNote}
                >
                  + New Note
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
