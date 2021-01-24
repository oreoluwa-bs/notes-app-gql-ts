import { Document, Model, model, Schema } from "mongoose";
import slugify from "slugify";

interface INote extends Document {
  title: string;
  content: string;
  slug: string;
  author: string;
  createdAt: Date;
  deletedAt: Date;
}

const noteSchema: Schema<INote> = new Schema(
  {
    title: {
      type: String,
      default: "Untitled Note",
      required: [true, "A note must have a title"],
    },
    content: {
      type: String,
    },
    slug: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    deletedAt: {
      type: Date,
      select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

noteSchema.pre("save", function (next) {
  const noteId: string = this.id;
  this.slug = slugify(`${this.title} ${noteId.slice(noteId.length - 3)}`, {
    lower: true,
  });

  next();
});

const Note: Model<INote> = model("Note", noteSchema);

export default Note;
