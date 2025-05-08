import React from "react";

interface GifCardProps {
  title: string;
  url: string;
  alt_text?: string;
}

const GifCard: React.FC<GifCardProps> = ({ title, url, alt_text }) => {
  return (
    <div className="gif-card">
      <img srcSet={url} alt={alt_text || title} loading="lazy" />
      <p className="gif-title">{title}</p>
    </div>
  );
};

export default GifCard;
