/* eslint-disable @typescript-eslint/no-unused-vars */
import User from "@root/db/models/user";

// Get All Users
export const users = async (
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

  const users = await User.find(filter).sort(sort).limit(limit);

  // return {
  //   status: "success",
  //   doc: users,
  // };
  return users;
};

// Get User
export const user = async (parent: any, args: any, context: any, info: any) => {
  const { filter = {} } = args;
  if (filter?.id) {
    filter._id = filter?.id;
    delete filter["id"];
  }

  const user = await User.findOne(filter);

  return {
    status: "success",
    doc: user,
  };
  // return user;
};

// Get My Account
export const getMyAccount = async (
  parent: any,
  arg: any,
  context: any,
  info: any
) => {
  const user = await User.findById("id");

  return user;
};
