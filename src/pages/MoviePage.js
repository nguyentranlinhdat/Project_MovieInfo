import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "config/config";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";
import useDebounce from "hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
import Button from "components/button/Button";
// https://api.themoviedb.org/3/search/movie
const itemsPerPage = 20;
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 500);
  const [url, setUrl] = useState(
    // `https://api.themoviedb.org/3/movie/popular?api_key=264c42b03a6e5828ec0927eabda482ad&page=${nextPage}`
    tmdbAPI.getMovieList("popular", nextPage)
  );
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      console.log(filterDebounce);
      // setUrl(
      //   `https://api.themoviedb.org/3/search/movie?api_key=264c42b03a6e5828ec0927eabda482ad&query=${filterDebounce}&page=${nextPage}`
      // );
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
      // setUrl(
      //   `https://api.themoviedb.org/3/movie/popular?api_key=264c42b03a6e5828ec0927eabda482ad&page=${nextPage}`
      // );
    }
  }, [filterDebounce, nextPage]);
  const movies = data?.results || [];
  // console.log("total_pages", total_pages);
  // console.log("page", page);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.total_pages;
    setItemOffset(newOffset);
    setNextPage(e.selected + 1);
  };
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Type here to search ..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 text-white bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full select-none border-primary border-t-transparent animate-spin"></div>
      )} */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      {/* <div className="mt-10 text-center">
        <Button>Load more</Button>
      </div> */}
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;
