import { useEffect, useState } from "react";
import "./App.css";
import type { TrendingGifs } from "./apis/types/trending-gifts";
import { getTrendingGifs, searchGifs } from "./apis/giphy-api";
import GifCard from "./components/gif-card";
import GifPagination from "./components/pagination";
import { ClipLoader } from "react-spinners";
import SearchGifForm from "./components/search-form";

const PER_PAGE = 28;

function App() {
  const [gifs, setGifs] = useState<TrendingGifs>({
    data: []
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function trendingGifsApiCall(): Promise<void> {
      setLoading(true);
      try {
        const response: TrendingGifs =
          search === ""
            ? await getTrendingGifs(PER_PAGE, (page - 1) * PER_PAGE)
            : await searchGifs(search, PER_PAGE, (page - 1) * PER_PAGE);

        if (!response.data || !response.pagination) {
          throw new Error("No GIFS found");
        }

        setTotalPages(Math.ceil(response.pagination.total_count / PER_PAGE));
        setGifs(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    trendingGifsApiCall();
  }, [page, search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(input);
  };

  return (
    <div className="app">
      <h1>Top Trending GIFS</h1>

      <ClipLoader color="#646cff" loading={loading} size={48} />

      {!loading && !gifs.data && <p>No GIFS found</p>}

      {!loading && gifs.data && (
        <>
          <SearchGifForm
            handleSubmit={handleSearchSubmit}
            input={input}
            onChangeInput={setInput}
            placeholder="Search GIFs..."
            buttonText="Search"
          />
          <GifPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />

          <div className="gif-grid">
            {gifs.data.map((gif) => (
              <GifCard
                key={gif.id}
                title={gif.title}
                url={gif.url}
                alt_text={gif.alt_text}
              />
            ))}
          </div>
          <GifPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}

export default App;
