export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// PUBLIC_INTERFACE
export async function fetchNotes(): Promise<Note[]> {
  /** Fetch all notes from the backend API */
  const res = await fetch("/api/notes", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchNote(id: string): Promise<Note> {
  /** Fetch a single note by ID from the backend API */
  const res = await fetch(`/api/notes/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
}

// PUBLIC_INTERFACE
export async function createNote(payload: Omit<Note, "id" | "created_at" | "updated_at">): Promise<Note> {
  /** Create a new note in the backend */
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

// PUBLIC_INTERFACE
export async function updateNote(id: string, payload: Partial<Note>): Promise<Note> {
  /** Update an existing note */
  const res = await fetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<void> {
  /** Delete a note by ID */
  const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
}
