import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";

export const tokenVerifyer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-acess-token"];

  Jwt.verify(token as string, "senha_segura", (error) => {
    if (error) {
      console.log(error);
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Não autorizado!" });
    }

    return next();
  });
};
