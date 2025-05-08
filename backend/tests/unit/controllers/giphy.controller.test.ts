import {
  getTrendingGifs,
  searchGifs
} from "../../../src/controllers/giphy.controller";
import * as service from "../../../src/services/giphy.service";
import { Request, Response, NextFunction } from "express";

jest.mock("../../../src/services/giphy.service");

describe("getTrendingGifs Controller", () => {
  const mockReq = { query: { limit: "10", offset: "0" } } as unknown as Request;
  const mockRes = { send: jest.fn() } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  afterEach(() => jest.clearAllMocks());

  it("should call service and return response", async () => {
    const mockData = { data: [], pagination: {}, meta: {} };
    (service.getTrendingGifsService as jest.Mock).mockResolvedValue(mockData);

    await getTrendingGifs(mockReq, mockRes, mockNext);

    expect(service.getTrendingGifsService).toHaveBeenCalledWith({
      limit: 10,
      offset: 0
    });
    expect(mockRes.send).toHaveBeenCalledWith(mockData);
  });

  it("should call next on error", async () => {
    const error = new Error("Service failure");
    (service.getTrendingGifsService as jest.Mock).mockRejectedValue(error);

    await getTrendingGifs(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("searchGifs Controller", () => {
  const mockReq = {
    query: { q: "cat", limit: "10", offset: "0" }
  } as unknown as Request;

  const mockRes = { send: jest.fn() } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  afterEach(() => jest.clearAllMocks());

  it("should call service and return response", async () => {
    const mockData = { data: [], pagination: {}, meta: {} };
    (service.searchGifsService as jest.Mock).mockResolvedValue(mockData);

    await searchGifs(mockReq, mockRes, mockNext);

    expect(service.searchGifsService).toHaveBeenCalledWith({
      q: "cat",
      limit: 10,
      offset: 0
    });
    expect(mockRes.send).toHaveBeenCalledWith(mockData);
  });

  it("should call next on error", async () => {
    const error = new Error("Service failure");
    (service.searchGifsService as jest.Mock).mockRejectedValue(error);

    await searchGifs(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
