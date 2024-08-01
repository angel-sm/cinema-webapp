import React from "react";

function CardSkeletonLoader() {
  return (
    <div className="relative block bg-gray-200 rounded-lg h-96 shadow-lg animate-pulse">
      <div className="absolute inset-0 h-full w-full bg-gray-300 rounded-lg"></div>
      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="w-full rounded-lg h-96 bg-gray-300 flex items-center justify-center absolute top-0 left-0 right-0 opacity-75 z-10">
            <p className="text-md font-medium uppercase tracking-widest w-full text-center text-gray-500">
              Loading...
            </p>
          </div>
          <div className="translate-y-8 bottom-0 transform opacity-0 transition-all">
            <div className="w-full flex justify-center items-center">
              <a className="relative inline-block">
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-gray-400 rounded-lg"></div>
                <div className="relative inline-block border-2 border-gray-300 px-8 py-3 text-sm font-bold uppercase tracking-widest text-gray-600">
                  <span className="w-24 h-6 bg-gray-400 rounded"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeletonLoader;
