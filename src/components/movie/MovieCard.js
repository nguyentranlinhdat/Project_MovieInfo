import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "config/config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
const MovieCard = ({ item }) => {
  const { title, release_date, vote_average, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movies-card bg-slate-800">
      <img
        // src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        src={tmdbAPI.imageOriginal(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">{title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
        {/* <button
          onClick={() => navigate(`/movie/${id}`)}
          className="w-full px-6 py-3 mt-auto capitalize rounded-lg bg-primary"
        >
          Watch here
        </button> */}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-400">
      Somthing went wrong with this components
    </p>
  );
}
export default withErrorBoundary(MovieCard, {
  FallbackComponent: FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movies-card bg-slate-800">
      <LoadingSkeleton className="w-full h-[250px] rounded-lg mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">
          <LoadingSkeleton className="w-full h-[20px] "></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>
            <LoadingSkeleton className="w-[50px] h-[10px] "></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton className="w-[30px] h-[10px] "></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton className="w-full h-[45px] rounded-md"></LoadingSkeleton>
      </div>
    </div>
  );
};
