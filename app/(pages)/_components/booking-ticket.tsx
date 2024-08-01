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
      <div
        className="
        relative
        flex
        flex-col
        h-full
        transform
        border-2
        border-black
        bg-white
        -translate-x-2
        -translate-y-2 rounded-md"
      >
        <div className="px-5 py-3 mb-2 flex flex-col gap-1">
          <h3 className="text-xl font-medium sm:text-2xl">{movie.name}</h3>
          <p className="text-sm sm:text-base">🤓 {bookerEmail}</p>
          <p className="text-sm sm:text-base">🏟 {auditorium.name}</p>
          <p className="text-sm sm:text-base">🧭{schedule}</p>
          <p className="text-sm sm:text-base">🎟️{seat.seatNumber}</p>
        </div>
        <div className="flex p-2 w-full gap-2 justify-end">
          <button className="inline-block rounded border border-stone-900	px-5 py-1 text-sm font-medium text-stone-900	hover:bg-stone-900	hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
            Cancel
          </button>
          <button className="inline-block rounded border border-stone-900	px-5 py-1 text-sm font-medium text-stone-900	hover:bg-stone-900	hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingTicket;
