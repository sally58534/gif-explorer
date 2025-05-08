import {
  getTrendingGifsService,
  searchGifsService
} from "../../../src/services/giphy.service";
import * as utils from "../../../src/utils/utils";
import apiClient from "../../../src/utils/axios.instance";

jest.mock("../../../src/utils/axios.instance");

describe("getTrendingGifsService", () => {
  const mockResponse = {
    data: { data: [], pagination: {}, meta: {} },
    status: 200
  };

  afterEach(() => {
    jest.clearAllMocks();
    utils.cache.flushAll();
  });

  it("should return cached result if available", async () => {
    const cacheKey = "trending:10:0";
    utils.cache.set(cacheKey, mockResponse.data);

    const result = await getTrendingGifsService({ limit: 10, offset: 0 });
    expect(apiClient.get).not.toHaveBeenCalled();
    expect(result).toEqual(mockResponse.data);
  });

  it("should fetch from API and set cache if no cached result", async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getTrendingGifsService({ limit: 10, offset: 0 });
    expect(apiClient.get).toHaveBeenCalled();
    expect(utils.cache.get("trending:10:0")).toEqual(result);
  });

  it("should throw error on API failure", async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({
      status: 400,
      statusText: "Bad Request"
    });
    await expect(
      getTrendingGifsService({ limit: 10, offset: 0 })
    ).rejects.toThrow("Failed with status: 400 - Bad Request");
  });
});

describe("searchGifsService", () => {
  const mockResponse = {
    data: { data: [], pagination: {}, meta: {} },
    status: 200
  };

  afterEach(() => {
    jest.clearAllMocks();
    utils.cache.flushAll();
  });

  it("should return cached result if available", async () => {
    const cacheKey = "search:cat:10:0";
    utils.cache.set(cacheKey, mockResponse.data);

    const result = await searchGifsService({ q: "cat", limit: 10, offset: 0 });
    expect(apiClient.get).not.toHaveBeenCalled();
    expect(result).toEqual(mockResponse.data);
  });

  it("should fetch from API and set cache if no cached result", async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await searchGifsService({ q: "cat", limit: 10, offset: 0 });
    expect(apiClient.get).toHaveBeenCalled();
    expect(utils.cache.get("search:cat:10:0")).toEqual(result);
  });

  it("should throw error on API failure", async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({
      status: 400,
      statusText: "Bad Request"
    });

    await expect(
      searchGifsService({ q: "cat", limit: 10, offset: 0 })
    ).rejects.toThrow("Failed with status: 400 - Bad Request");
  });
});
