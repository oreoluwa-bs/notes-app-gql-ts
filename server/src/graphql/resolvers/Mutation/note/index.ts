/* eslint-disable @typescript-eslint/no-unused-vars */
import Note from "@root/db/models/note";
import { isAuth, isAuthorized } from "@root/helpers/authHelpers";
import { updateOne } from "@root/helpers/handlerFactory";

// Create a new note
export const createNote = async (parent: any, args: any, context: any) => {
  const payload: any = isAuth(context);
  const { noteData } = args;

  noteData["author"] = payload.userId;

  const newNote = await Note.create(noteData);

  return {
    status: "success",
    message: "Note created",
    doc: newNote,
  };
};

// Update an existing note
export const updateNote = async (parent: any, args: any, context: any) => {
  const { id, noteData } = args;

  const note = await Note.findById(id);
  const noteAuthor: string = note?.author.toString() as string;

  isAuthorized({ context, authorized: noteAuthor });
  return updateOne(Note, { docId: id, docData: noteData });
  // return {
  //   status: "success",
  //   message: "Note updated",
  //   doc: note,
  // };
};

// Delete an existing note
export const deleteNote = async (parent: any, args: any, context: any) => {
  const { id } = args;
  const note = await Note.findById(id);

  if (!note)
    return {
      status: "success",
      message: "Note does not exist",
    };

  isAuthorized({ context, authorized: note?.author.toString() });
  note?.delete();
  // await Note.deleteOne({ id });

  return {
    status: "success",
    message: "Note deleted",
    doc: note,
  };
};

// Update
// isAuthorized({ context, authorized: note?.author as string });
// note?.update(noteData, { runValidators: true, new: true });
// // const updatedNote = await Note.updateOne({ id }, noteData);
