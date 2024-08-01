"use client";
import { useAppSelector } from "../../_lib/redux/hooks";
import { useRouter } from "next/navigation";
import useFetch from "@/app/_hooks/useRequest";
import CardSkeletonLoader from "../_components/movie-card-skeleton";
import MovieCard from "../_components/movie-card";

type Movie = {
  cover: string;
  name: string;
  id: string;
  comingSoon: boolean;
};

const Home = () => {
  const { data, error, loading } = useFetch<Array<Movie>>(
    "http://localhost:3001/v1/movies"
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center mb-4"></div>
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">
            {"Something went wrong. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8 w-100">
        {[1, 2, 3, 4, 5].map((i) => (
          <CardSkeletonLoader key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8 w-100">
      {data?.map((movie) => (
        <MovieCard
          key={movie.id}
          cover={movie.cover}
          comingSoon={movie.comingSoon}
          name={movie.name}
          id={movie.id}
        />
      ))}
    </div>
  );
};

export default Home;
