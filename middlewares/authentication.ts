import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../services/authenticationService';
import User, { IUserDocument } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}

export function checkForAuthenticationCookie(cookieName: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      res.locals.user = null;
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);

      const user = await User.findById(userPayload._id);

      if (!user) {
        res.locals.user = null;
        return next();
      }

      req.user = user;
      res.locals.user = user;
    } catch (error) {
      res.locals.user = null;
    }

    return next();
  };
}
