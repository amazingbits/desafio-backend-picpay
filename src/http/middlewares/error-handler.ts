import { Request, Response, NextFunction } from "express";
import { BaseError } from "../../services/errors/base-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      console.log(
        JSON.stringify(
          {
            code: statusCode,
            errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    }

    return res.status(statusCode).json({ errors });
  }

  console.error(JSON.stringify(err, null, 2));
  return res.status(500).json({
    message: "something went wrong",
    errors: [{ message: err.message }],
  });
};
