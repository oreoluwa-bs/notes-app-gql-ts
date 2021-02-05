/* eslint-disable @typescript-eslint/no-unused-vars */
import Note from "@root/db/models/note";
import { isAuth } from "@root/helpers/authHelpers";

// Get All Notes
export const notes = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { filter = {}, sort, limit } = args;
  if (filter?.id) {
    filter._id = filter?.id;
    delete filter["id"];
  }

  const notes = await Note.find(filter).sort(sort).limit(limit);

  return notes;
};

// Get Note
export const note = async (parent: any, args: any, context: any, info: any) => {
  const { filter = {} } = args;
  if (filter?.id) {
    filter._id = filter?.id;
    delete filter["id"];
  }

  const note = await Note.findOne(filter);

  return note;
};

// Get My Notes
export const getMyNotes = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { filter = {}, sort, limit } = args;
  if (filter?.id) {
    filter._id = filter?.id;
    delete filter["id"];
  }

  const notePayload = isAuth(context);
  const { userId } = notePayload as any;

  const notes = await Note.find({ author: userId }).sort(sort).limit(limit);

  return notes;
};
