import { describe, it, expect, vi, afterEach } from "vitest";
import apiClient from "../../src/utils/apiClient";
import { getTrendingGifs, searchGifs } from "../../src/apis/giphy-api";

vi.mock("../../src/utils/apiClient", () => ({
  default: {
    get: vi.fn()
  }
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("giphy-api service", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches trending gifs", async () => {
    mockedApiClient.get.mockResolvedValue({
      status: 200,
      data: { data: ["gif1"], pagination: { total_count: 1 } }
    });

    const result = await getTrendingGifs(25, 0);

    expect(mockedApiClient.get).toHaveBeenCalled();
    expect(result.data).toEqual(["gif1"]);
  });

  it("throws on failed trending gifs fetch", async () => {
    mockedApiClient.get.mockResolvedValue({ status: 500 });

    await expect(getTrendingGifs(25, 0)).rejects.toThrow(
      "Cannot get trending gifs"
    );
  });

  it("fetches search gifs", async () => {
    mockedApiClient.get.mockResolvedValue({
      status: 200,
      data: { data: ["gif2"], pagination: { total_count: 1 } }
    });

    const result = await searchGifs("cat", 25, 0);

    expect(mockedApiClient.get).toHaveBeenCalled();
    expect(result.data).toEqual(["gif2"]);
  });
});
