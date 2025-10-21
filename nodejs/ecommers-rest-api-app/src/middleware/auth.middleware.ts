import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "Access denied!" });
    return;
  }

  try {
    //   decode jwt token data
    const decodedJWT = jwt.verify(token, process.env.SECRET!);

    if (typeof decodedJWT !== "object" || !decodedJWT?.userId) {
      res.status(401).json({ message: "Access denied!!" });
      return;
    }

    req.userId = decodedJWT.userId;
    req.role = decodedJWT.role;

    next();
  } catch (error) {
    res.status(401).json({ message: "Access denied!!", details: error });
  }
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const role = req.role;

  try {
    if (role !== "admin") {
      res.status(401).json({ message: "Access denied!!>>" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Access denied!!", details: error });
  }
}
