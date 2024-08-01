import React from "react";

interface Booking {
  auditorium: {
    name: string;
  };
  schedule: string;
  seat: {
    seatNumber: number;
  };
  movie: {
    name: string;
  };
  bookerEmail: string;
}

function BookingTicket({
  movie,
  auditorium,
  schedule,
  seat,
  bookerEmail,
}: Booking) {
  return (
    <div className=" relative block ">
      <span className="absolute inset-0 border-2 border-dashed border-black rounded-md" />
      <div className="relative flex h-full transform items-end border-2 border-black bg-white -translate-x-2 -translate-y-2 rounded-md">
        <div className="p-4 sm:p-6 lg:p-8">
          <h3 className="mt-4 text-xl font-medium sm:text-2xl">{movie.name}</h3>
          <p className="mt-4 text-sm sm:text-base">🤓 {bookerEmail}</p>
          <p className="mt-4 text-sm sm:text-base">🏟 {auditorium.name}</p>
          <p className="mt-4 text-sm sm:text-base">🧭{schedule}</p>
          <p className="mt-4 text-sm sm:text-base">🎟️{seat.seatNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default BookingTicket;
