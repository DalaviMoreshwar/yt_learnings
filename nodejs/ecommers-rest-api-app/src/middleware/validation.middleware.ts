import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import z, { ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      req.cleanBody = _.pick(req.body, Object.keys(schema.shape));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = JSON.parse(error.message);

        const message = errors.map((er: any) => ({
          message: `${er.path[0]}:  ${er.message}`,
        }));

        res.status(400).json({ error: "Invalid Data", details: message });
      } else {
        res.status(500).json({ error: "Internal Sever Error" });
      }
    }
  };
}
