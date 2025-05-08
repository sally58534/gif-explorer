import request from "supertest";
import app from "../../index";

describe("End-to-End API Tests", () => {
  it("should handle trending flow end-to-end", async () => {
    const res = await request(app).get("/api/giphy/popular?limit=3&offset=0");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.length).toBe(3);
    expect(res.body.pagination.total_count).toBeGreaterThan(0);
  });

  it("should handle search flow end-to-end", async () => {
    const res = await request(app).get(
      "/api/giphy/search?q=dog&limit=3&offset=0"
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.length).toBe(3);
    expect(res.body.pagination.total_count).toBeGreaterThan(0);
  });

  it("should return 404 on invalid route", async () => {
    const res = await request(app).get("/api/unknown");
    expect(res.status).toBe(404);
  });
});
