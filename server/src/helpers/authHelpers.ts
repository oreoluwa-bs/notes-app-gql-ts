import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { parse } from "cookie";
import accessEnv from "./accessEnv";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
};

export const getToken = (authHeader: string | undefined) => {
  if (!authHeader) return null;

  let token;
  if (authHeader?.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  return token;
};

export const createAccessToken = (data: { [key: string]: any }): string => {
  const accessToken = sign({ ...data }, accessEnv("JWT_ACCESS_TOKEN_SECRET"), {
    expiresIn: "5s",
  });

  return accessToken;
};

export const createRefreshToken = (data: { [key: string]: any }): string => {
  const refreshToken = sign(
    { ...data },
    accessEnv("JWT_REFRESH_TOKEN_SECRET"),
    { expiresIn: "7d" }
  );

  return refreshToken;
};

export const sendRefreshToken = (context: any, data: any): void => {
  const { res } = context;

  res.cookie("jid", createRefreshToken(data), {
    httpOnly: true,
    path:'/refresh_token'
  });
};

export const isAuth = (context: any) => {
  const token = getToken(context.req.headers["authorization"]);

  if (!token) throw new Error("User not Authenticated");

  let payload = null;
  try {
    payload = verify(token, accessEnv("JWT_ACCESS_TOKEN_SECRET"));
    context.payload = payload;
  } catch (error) {
    throw new Error("User not Authenticated -p");
  }

  return payload;
};

export const verifyRefreshToken = async (token: string) => {
  return verify(token, accessEnv("JWT_REFRESH_TOKEN_SECRET"));
};

export const parseCookies = (context: any) => {
  const cookies = context.req.headers.cookie;
  if (!cookies) return { jid: null };
  return parse(cookies);
};

export const isAuthorized = ({
  context,
  authorized,
}: {
  context: any;
  authorized: string;
}) => {
  const payload: any = isAuth(context);

  if (payload.userId !== authorized)
    throw new Error("User not authorized to perform action");

  return true;
};
