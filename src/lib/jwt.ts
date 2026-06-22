import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';

export const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: '15m', // 15 minutes
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d', // 7 days
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as { id: string; role: string };
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { id: string };
  } catch {
    return null;
  }
};
