import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const signToken = (payload: {accountId: number}, expiresIn = "1h") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
