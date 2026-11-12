import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const secret = "KyaHaalH@in";

export interface UserPayload {
  _id: string | Types.ObjectId;
  email: string;
  profileImageUrl: string;
  role: string;
}

interface TokenUser {
  _id: Types.ObjectId | string;
  email: string;
  profileImageUrl: string;
  role: string;
}

export function createTokenForUser(user: TokenUser): string {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

export function validateToken(token: string): UserPayload {
  const payload = jwt.verify(token, secret) as UserPayload;
  return payload;
}
