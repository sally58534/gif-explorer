import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (typeof err === "object" && err !== null) {
    const errorObj = err as Record<string, any>;

    // Ensure status is a valid HTTP status code (1xx–5xx)
    if (
      typeof errorObj.status === "number" &&
      errorObj.status >= 100 &&
      errorObj.status <= 599
    ) {
      statusCode = errorObj.status;
    }

    if (errorObj.message) {
      try {
        // If message was passed as JSON string, safely parse
        const parsed = JSON.parse(errorObj.message);
        message = parsed.message || errorObj.message;
      } catch {
        message = errorObj.message;
      }
    }
  } else if (typeof err === "string") {
    message = err;
  }

  console.error(`[ERROR] ${req.method} ${req.originalUrl} →`, err);

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode
    }
  });
};
