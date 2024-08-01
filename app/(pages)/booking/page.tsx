"use client";
import React from "react";
import BookingTicket from "../_components/booking-ticket";
import useFetch from "@/app/_hooks/useRequest";
import { useAppSelector } from "@/app/_lib/redux/hooks";

interface Auditorium {
  name: string;
}

interface Movie {
  name: string;
}

interface Booker {
  email: string;
}

interface Seat {
  seatNumber: number;
}

interface Reservation {
  id: string;
  auditoriumId: string;
  schedule: string;
  seatId: string;
  bookerId: string;
  auditorium: Auditorium;
  booker: Booker;
  seat: Seat;
  movie: Movie;
}

function Booking() {
  const { bookerEmail, bookerId } = useAppSelector((state) => ({
    bookerId: state.auth.user?.id,
    bookerEmail: state.auth.user?.email as string,
  }));

  const {
    data: bookings,
    error,
    loading,
  } = useFetch<Array<Reservation>>(
    `http://localhost:3001/v1/bookings/${bookerId}`
  );

  return (
    <div className="w-1/3	m-auto">
      <div className="py-4 mb-4">
        <h1 className="text-2xl font-medium">My reservations resume</h1>
      </div>
      <div className="flex flex-col gap-5">
        {bookings?.map((booking) => (
          <BookingTicket
            key={booking.id}
            {...booking}
            bookerEmail={bookerEmail}
          />
        ))}
      </div>
    </div>
  );
}

export default Booking;
