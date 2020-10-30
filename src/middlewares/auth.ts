import { Response, Request, NextFunction } from "express";
import { decodeJWT } from "../utils/decodeJWT";

export const auth = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.x_jwt;
  if (!token) {
    req.user = undefined;
    res.json({
      isAuth: false,
      error: true,
    });
  }
  if (token) {
    const user = await decodeJWT(token);
    if (user) {
      req.user = user;
      next();
    } else {
      req.user = undefined;
      res.json({
        isAuth: false,
        error: true,
      });
    }
  }
};
