/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface Props {
  comingSoon?: boolean;
  cover?: string;
  name?: string;
  id?: string;
}

function MovieCard({ comingSoon, cover, id, name }: Props) {
  return (
    <div className="group relative block bg-black rounded-lg h-96 shadow-2xl">
      <img
        alt=""
        src={cover}
        className="absolute rounded-lg inset-0 h-full w-full object-cover opacity-100 transition-opacity group-hover:opacity-75"
      />
      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="mt-32 sm:mt-48 lg:mt-64">
          {comingSoon ? (
            <div className="w-full rounded-lg h-96 bg-black flex items-center absolute top-0 left-0 right-0 opacity-75 z-10">
              <p className="text-md font-medium uppercase tracking-widest w-full text-center text-white z-40">
                Coming soon
              </p>
            </div>
          ) : (
            <div className="translate-y-8  bottom-0 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <div className="w-full flex justify-center items-center">
                <Link
                  className="group relative inline-block focus:outline-none focus:ring "
                  href={`/movie/${id}`}
                >
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                  <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                    Tickets
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
