import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GifPagination from "../../src/components/pagination";
import { vi } from "vitest";

describe("GifPagination component", () => {
  it("renders correct number of pages and calls setPage on click on page number", () => {
    const setPageMock = vi.fn();

    render(<GifPagination page={1} setPage={setPageMock} totalPages={5} />);
    screen.debug();
    const pageButton = screen.getByLabelText("Go to page 2");
    fireEvent.click(pageButton);

    expect(setPageMock).toHaveBeenCalledWith(2);
  });
  it("renders correct number of pages and calls setPage on click next arrow", () => {
    const setPageMock = vi.fn();

    render(<GifPagination page={1} setPage={setPageMock} totalPages={5} />);

    const pageButton = screen.getByLabelText("Go to next page");
    fireEvent.click(pageButton);

    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  it("renders correct number of pages and calls setPage on click prev arrow", () => {
    const setPageMock = vi.fn();

    render(<GifPagination page={2} setPage={setPageMock} totalPages={5} />);

    const pageButton = screen.getByLabelText("Go to previous page");
    fireEvent.click(pageButton);

    expect(setPageMock).toHaveBeenCalledWith(1);
  });
});
