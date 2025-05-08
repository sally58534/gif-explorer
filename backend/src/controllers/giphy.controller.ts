import { NextFunction, Request, Response } from "express";
import {
  getTrendingGifsService,
  searchGifsService
} from "../services/giphy.service";

export const getTrendingGifs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { limit, offset } = req.query;

    const response = await getTrendingGifsService({
      limit: Number(limit),
      offset: Number(offset)
    });

    res.send(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const searchGifs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { q, limit, offset } = req.query;

    const response = await searchGifsService({
      q: String(q),
      limit: Number(limit),
      offset: Number(offset)
    });

    res.send(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
