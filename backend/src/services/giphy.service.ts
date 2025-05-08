import apiClient from "../utils/axios.instance";
import { TrendingGifsRequestDto } from "../dto/trending-request.dto";
import { TrendingGifsResponseDto } from "../dto/trending-response.dto";
import { cache, mapGiphyResponse } from "../utils/utils";
import { SearchGifsRequestDto } from "../dto/search-request.dto";

export const getTrendingGifsService = async ({
  limit,
  offset
}: TrendingGifsRequestDto): Promise<TrendingGifsResponseDto> => {
  const cacheKey = `trending:${limit}:${offset}`;

  const cached = cache.get<TrendingGifsResponseDto>(cacheKey);
  if (cached) {
    console.log(`[CACHE HIT] ${cacheKey}`);
    return cached;
  }

  const response = await apiClient.get("/trending", {
    params: {
      limit,
      offset
    }
  });

  if (response.status !== 200) {
    const error: any = new Error(
      `Failed with status: ${response.status} - ${response.statusText}`
    );
    error.status = response.status;
    throw error;
  }
  const rawData = response.data;

  const data: TrendingGifsResponseDto = mapGiphyResponse(rawData);

  const success = cache.set(cacheKey, data);
  if (success) {
    console.log(`[CACHE SET] ${cacheKey}`);
  } else {
    console.warn(`[CACHE SET FAILED] ${cacheKey}`);
  }

  console.log("cache miss");
  return data;
};

export const searchGifsService = async ({
  q,
  limit,
  offset
}: SearchGifsRequestDto): Promise<TrendingGifsResponseDto> => {
  const cacheKey = `search:${q}:${limit}:${offset}`;

  const cached = cache.get<TrendingGifsResponseDto>(cacheKey);

  if (cached) {
    console.log(`[CACHE HIT] ${cacheKey}`);
    return cached;
  }

  const response = await apiClient.get("/search", {
    params: {
      q,
      limit,
      offset
    }
  });
  if (response.status !== 200) {
    throw new Error(
      `Failed with status: ${response.status} - ${response.statusText}`
    );
  }
  const rawData = response.data;

  const data: TrendingGifsResponseDto = mapGiphyResponse(rawData);
  const success = cache.set(cacheKey, data);
  if (success) {
    console.log(`[CACHE SET] ${cacheKey}`);
  } else {
    console.warn(`[CACHE SET FAILED] ${cacheKey}`);
  }
  return data;
};
