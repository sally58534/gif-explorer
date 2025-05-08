import request from "supertest";
import app from "../../../index";
import * as service from "../../../src/services/giphy.service";

jest.mock("../../../src/services/giphy.service");

describe("Giphy Routes Integration", () => {
  afterEach(() => jest.clearAllMocks());

  describe("GET /api/giphy/popular", () => {
    it("should return 200 with trending data", async () => {
      const mockData = { data: ["mock-trending"], pagination: {}, meta: {} };
      (service.getTrendingGifsService as jest.Mock).mockResolvedValue(mockData);

      const res = await request(app).get(
        "/api/giphy/popular?limit=10&offset=0"
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(service.getTrendingGifsService).toHaveBeenCalledWith({
        limit: 10,
        offset: 0
      });
    });

    it("should handle service error", async () => {
      (service.getTrendingGifsService as jest.Mock).mockRejectedValue(
        new Error("Service Error")
      );
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const res = await request(app).get(
        "/api/giphy/popular?limit=10&offset=0"
      );

      expect(res.status).toBe(500);
      expect(res.body.error).toHaveProperty("message");
    });
  });

  describe("GET /api/giphy/search", () => {
    it("should return 200 with search data", async () => {
      const mockData = { data: ["mock-search"], pagination: {}, meta: {} };
      (service.searchGifsService as jest.Mock).mockResolvedValue(mockData);

      const res = await request(app).get(
        "/api/giphy/search?q=cat&limit=10&offset=1"
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(service.searchGifsService).toHaveBeenCalledWith({
        q: "cat",
        limit: 10,
        offset: 1
      });
    });

    it("should handle service error", async () => {
      (service.searchGifsService as jest.Mock).mockRejectedValue(
        new Error("Service Error")
      );
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const res = await request(app).get(
        "/api/giphy/search?q=cat&limit=10&offset=0"
      );

      expect(res.status).toBe(500);
      expect(res.body.error).toHaveProperty("message");
    });
  });
});
