import { Model } from "mongoose";

export const updateOne = async (
  Model: Model<any>,
  { docId, docData }: { docId: string; docData: any }
) => {
  try {
    const doc = await Model.findByIdAndUpdate(docId, docData, {
      runValidators: true,
      new: true,
    });
    if (!doc) throw new Error("No document found with that ID");

    // doc?.update(, );
    // console.log(doc);
    return {
      status: "success",
      message: "Document updated",
      doc,
    };
  } catch (error) {
    // return {
    //   status: "error",
    //   message: "Document could not be updated ",
    // };
    throw new Error("Document could not be updated " + error);
  }
};
