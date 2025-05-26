import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovie } from "../services/movies";

export function useMovie({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);

  const getMovie = useCallback(async ({ search }) => {
      if (search === previusSearch.current) return;

      try {
        setLoading(true);
        setError(null);
        previusSearch.current = search;
        const newMovies = await searchMovie({ search });
        setMovies(newMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, getMovie, loading, error };
}
