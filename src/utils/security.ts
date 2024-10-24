import bcrypt from "bcrypt";
import jwt, { verify } from "jsonwebtoken";

const JWT_KEY = process.env.JWT_SECRET_KEY;

export async function genToken(payload: { uid: string }) {
  const token = await jwt.sign(payload, JWT_KEY as string, {
    expiresIn: "30m",
  });
  return token;
}
export async function genRefToken(payload: { uid: string }) {
  const token = await jwt.sign(payload, JWT_KEY as string, { expiresIn: "7d" });
  return token;
}

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function comparePassword(plain: string, hash: string) {
  return await bcrypt.compare(plain, hash);
}

export async function regToken(refToken: string) {
  const decoded: any = await jwt.verify(refToken, JWT_KEY as string);
  const accessToken = genToken({ uid: decoded.uid });
  return accessToken;
}
