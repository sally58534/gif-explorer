import apiClient from "../utils/apiClient";
import { ENDPOINTS } from "../utils/endpoints";
import type { TrendingGifs } from "./types/trending-gifts";

export const getTrendingGifs = async (
  limit: number,
  offset: number
): Promise<TrendingGifs> => {
  const response = await apiClient.get(
    `${ENDPOINTS.POPULAR}?limit=${limit}&offset=${offset}`
  );
  if (response.status !== 200) {
    throw new Error(`Cannot get trending gifs`);
  }
  return response.data;
};

export const searchGifs = async (
  q: string,
  limit: number,
  offset: number
): Promise<TrendingGifs> => {
  const response = await apiClient.get(
    `${ENDPOINTS.SEARCH}?q=${q}&limit=${limit}&offset=${offset}`
  );
  if (response.status !== 200) {
    throw new Error(`Cannot get search gifs`);
  }
  return response.data;
};
