/* eslint-disable @typescript-eslint/no-unused-vars */
import User from "@root/db/models/user";
import { compare } from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  isAuth,
  parseCookies,
  sendRefreshToken,
  verifyRefreshToken,
} from "@root/helpers/authHelpers";

// signInUser
export const signInUser = async (parent: any, args: any, context: any) => {
  const { credentials } = args;

  const user = await User.findOne({ email: credentials.email }).select(
    "+password +tokenVersion"
  );

  if (!user) throw new Error("User not found");

  const isAuthenticated = await compare(credentials.password, user.password);

  if (!isAuthenticated) throw new Error("Username or Password does not match");

  // Create JWT Access token
  const accessToken = createAccessToken({ userId: user.id });

  sendRefreshToken(context, { userId: user.id, _v: user.tokenVersion });

  return {
    status: "success",
    accessToken,
    doc: user,
  };
};

// Signup user
export const signUpUser = async (parent: any, args: any, context: any) => {
  const { credentials } = args;

  const user = await User.create(credentials);

  if (!user) throw new Error("User not created");

  // Create JWT Access token
  const accessToken = createAccessToken({ userId: user.id });

  sendRefreshToken(context, { userId: user.id, _v: user.tokenVersion });

  return {
    status: "success",
    accessToken,
    doc: user,
  };
};

// Update User
export const updateUser = async (parent: any, args: any, context: any) => {
  const { credentials } = args;

  const user = await User.findByIdAndDelete({ id: credentials.email });

  return {
    status: "success",
    message: "Account updated",
  };
};

// Delete User
export const deleteUser = async (parent: any, args: any, context: any) => {
  const { credentials } = args;

  await User.findByIdAndDelete({ id: credentials.email });

  return {
    status: "success",
    message: "Account deleted",
  };
};

// Update My Account
export const updateMyAccount = async (parent: any, arg: any, context: any) => {
  await User.findByIdAndUpdate("id", { active: false });

  return {
    status: "success",
    message: "Account updated",
  };
};

// Delete My Account
export const deleteMyAccount = async (parent: any, arg: any, context: any) => {
  await User.findByIdAndUpdate("id", { active: false });

  return {
    status: "success",
    message: "Account deleted",
  };
};

// Refresh Token
export const refreshMyToken = async (parent: any, arg: any, context: any) => {
  const unsuccessResponse = { status: false, accessToken: "" };

  const token = parseCookies(context).jid;

  if (!token) return unsuccessResponse;

  let payload: any = null;
  try {
    payload = await verifyRefreshToken(token);
  } catch (error) {
    return unsuccessResponse;
  }

  // Token is valid and
  // we send back an access token
  const user = await User.findOne({ _id: payload.userId }).select(
    "+tokenVersion"
  );

  if (!user) return unsuccessResponse;

  if (user.tokenVersion !== payload._v) return unsuccessResponse;

  const response = {
    status: true,
    accessToken: createAccessToken({ userId: user.id }),
  };

  sendRefreshToken(context, { userId: user.id, _v: user.tokenVersion });

  return response;
};

// Revoke Refresh Token
export const revokeRefreshTokensForUser = async (
  parent: any,
  arg: any,
  context: any
) => {
  isAuth(context);
  const { userId } = arg;

  const user = await User.findById(userId).select("tokenVersion");
  if (!user) throw new Error("User not found");

  await User.findByIdAndUpdate(user._id, {
    tokenVersion: user.tokenVersion + 1,
  });
  return true;
};
