/* eslint-disable @typescript-eslint/no-unused-vars */
import User from "@root/db/models/user";
import { compare } from "bcrypt";

// signInUser
export const signInUser = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { credentials } = args;

  const user = await User.findOne({ email: credentials.email }).select(
    "+password"
  );

  if (!user) throw new Error("User not found");

  const isAuthenticated = await compare(credentials.password, user.password);

  if (!isAuthenticated) throw new Error("Username or Password does not match");

  // Create JWT token
  const token = "";

  return {
    status: "success",
    token,
    doc: user,
  };
};

// Signup user
export const signUpUser = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { credentials } = args;
  const user = await User.create(credentials);

  if (!user) throw new Error("User not created");

  // Create JWT token
  const token = "";

  return {
    status: "success",
    token,
    doc: user,
  };
};

// Update User
export const updateUser = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { credentials } = args;

  const user = await User.findByIdAndDelete({ id: credentials.email });

  return {
    status: "success",
    message: "Account updated",
  };
};

// Delete User
export const deleteUser = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { credentials } = args;

  await User.findByIdAndDelete({ id: credentials.email });

  return {
    status: "success",
    message: "Account deleted",
  };
};

// Update My Account
export const updateMyAccount = async (
  parent: any,
  arg: any,
  context: any,
  info: any
) => {
  await User.findByIdAndUpdate("id", { active: false });

  return {
    status: "success",
    message: "Account updated",
  };
};

// Delete My Account
export const deleteMyAccount = async (
  parent: any,
  arg: any,
  context: any,
  info: any
) => {
  await User.findByIdAndUpdate("id", { active: false });

  return {
    status: "success",
    message: "Account deleted",
  };
};
