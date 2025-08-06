import { NextRequest, NextResponse } from "next/server";

/**
 * API route: GET, POST /api/notes
 */

async function listNotes() {
  // TODO: Connect to notes_database API
  // Placeholder for local demo; replace with real logic
  return [];
}
async function createNote(data: { title: string; content: string }) {
  // TODO: Connect to notes_database API
  // Placeholder; must return note with id, created_at, updated_at
  void data; // avoid unused variable lint error
  return null;
}

// Get all notes
export async function GET() {
  // PUBLIC_INTERFACE
  /**
   * Get a list of all notes.
   * @returns {Note[]}
   */
  const notes = await listNotes();
  return NextResponse.json(notes);
}

// Create a new note
export async function POST(request: NextRequest) {
  // PUBLIC_INTERFACE
  /**
   * Create a new note.
   * @body {title, content}
   * @returns {Note}
   */
  const data = await request.json();
  const newNote = await createNote(data || {});
  if (!newNote) return NextResponse.json({ error: "Failed to create" }, { status: 400 });
  return NextResponse.json(newNote, { status: 201 });
}
