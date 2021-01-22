import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
};

export const getToken = async (authHeader: string | undefined) => {
  if (!authHeader) return null;

  let token;
  if (authHeader?.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  return token;
};
