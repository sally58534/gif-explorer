import { render, screen } from "@testing-library/react";
import GifCard from "../../src/components/gif-card";
import React from "react";

describe("GiftCard component", () => {
  it("renders the image and title", () => {
    render(<GifCard title="Funny Cat" url="cat.gif" alt_text="A cat" />);
    
    expect(screen.getByAltText("A cat")).toBeInTheDocument();
    expect(screen.getByText("Funny Cat")).toBeInTheDocument();
  });

  it("falls back to title if alt_text is missing", () => {
    render(<GifCard title="Dancing Dog" url="dog.gif" />);

    expect(screen.getByAltText("Dancing Dog")).toBeInTheDocument();
  });
});
