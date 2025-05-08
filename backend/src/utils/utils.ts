import NodeCache from "node-cache";
import { GifResponseDto } from "../dto/gif-response.dto";
import { TrendingGifsResponseDto } from "../dto/trending-response.dto";

export function mapGiphyResponse(rawData: any): TrendingGifsResponseDto {
  const mappedData: GifResponseDto[] = rawData.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    url: item.images?.downsized?.url,
    alt_text: item?.alt_text
  }));

  return {
    data: mappedData,
    pagination: rawData.pagination,
    meta: rawData.meta
  };
}

export const cache = new NodeCache({ stdTTL: 300 });
