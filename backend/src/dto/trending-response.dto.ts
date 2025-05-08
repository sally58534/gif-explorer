import { GifResponseDto } from "./gif-response.dto";

export interface TrendingGifsResponseDto {
  data: GifResponseDto[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}