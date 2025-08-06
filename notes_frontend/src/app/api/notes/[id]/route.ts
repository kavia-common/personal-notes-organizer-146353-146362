import { NextRequest, NextResponse } from "next/server";

/**
 * Helper: Replace with actual DB/API logic. Parameters are intentionally unused.
 */
async function getNoteById(_id: string) {
  // TODO: Connect to notes_database API
  // Placeholder for local demo; replace with real logic
  void _id;
  return null;
}
async function updateNote(_id: string, _data: { title?: string; content?: string }) {
  // TODO: Connect to notes_database API
  void _id; void _data;
  return null;
}
async function deleteNote(_id: string) {
  // TODO: Connect to notes_database API
  void _id;
  return false;
}

// PUBLIC_INTERFACE
/**
 * Get a note by its ID.
 * @param request - the incoming Next.js request
 * @returns {Note | 404}
 */
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const {
    params: { id },
  } = context;
  const note = await getNoteById(id);
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(note);
}

// PUBLIC_INTERFACE
/**
 * Update a note by its ID.
 * @param request - the incoming Next.js request
 * @returns {Note | 404}
 */
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const {
    params: { id },
  } = context;
  const data = await request.json();
  const note = await updateNote(id, data || {});
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(note);
}

// PUBLIC_INTERFACE
/**
 * Delete a note by its ID.
 * @param request - the incoming Next.js request
 * @returns {204 | 404}
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  const {
    params: { id },
  } = context;
  const ok = await deleteNote(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new Response(null, { status: 204 });
}
