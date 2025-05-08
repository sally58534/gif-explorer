import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import * as api from "../../src/apis/giphy-api";
import { vi } from "vitest";
import App from "../../src/App";

vi.mock("../../src/apis/giphy-api");

describe("App integration", () => {
  const mockTrending = {
    data: [{ id: "1", title: "Funny", url: "funny.gif" }],
    pagination: { total_count: 1 }
  };

  beforeEach(() => {
    (api.getTrendingGifs as jest.Mock).mockResolvedValue(mockTrending);
  });

  afterEach(() => vi.resetAllMocks());

  it("displays trending gifs", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Funny")).toBeInTheDocument();
    });
  });

  it("searches and updates gifs", async () => {
    (api.searchGifs as jest.Mock).mockResolvedValue(mockTrending);

    render(<App />);

    const input = await screen.findByPlaceholderText("Search GIFs...");
    fireEvent.change(input, { target: { value: "cat" } });

    const button = await screen.findByRole("button", { name: "Search" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.searchGifs).toHaveBeenCalledWith("cat", 28, 0);
    });
  });
});
