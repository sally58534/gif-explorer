import type { Gif } from "./gif-response.dto";

export interface TrendingGifs {
  data: Gif[];
  pagination?: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta?: {
    status: number;
    msg: string;
    response_id: string;
  };
}
