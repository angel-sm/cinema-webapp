/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { EmptySeatIcon } from "@/app/_assets/icons/empty-seat.icon";
import { SelectedSeatIcon } from "@/app/_assets/icons/selected-seat.icon";
import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";
import SelectInput from "@/app/_components/select-input";
import { useAppSelector } from "@/app/_lib/redux/hooks";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FilledSeatIcon } from "@/app/_assets/icons/filled-seat.icon";
import useFetch from "@/app/_hooks/useRequest";
import { Auditorium, Movie, useMovie } from "./useMovie";
import { bookingService } from "@/app/_services/bookingService";
import { toast } from "sonner";

interface Booker {
  email: string;
}

interface Seat {
  seatNumber: number;
}

interface Basic {
  name: string;
}

interface Reservation {
  id: string;
  auditoriumId: string;
  schedule: string;
  seatId: string;
  bookerId: string;
  auditorium: Basic;
  booker: Booker;
  seat: Seat;
  movie: Basic;
}

function MovieReservation() {
  const { isAuthenticated, bookerId } = useAppSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    bookerId: state.auth.user?.id,
  }));
  const router = useRouter();
  const params = useParams();

  if (!isAuthenticated) {
    router.push("/login");
  }

  const {
    generateSeatList,
    auditoriums,
    setAuditoriums,
    auditorium,
    setAuditorium,
    seats,
    setSeats,
    schedule,
    setSchedule,
    satsFilled,
    setSeatsFilled,
    seatsSelected,
    setSeatsSelected,
    control,
    handleSubmit,
    watch,
    setValue,
  } = useMovie({
    bookerId,
  });

  const movieId = params?.id as string;

  const { data: movie } = useFetch<Movie>(
    `http://localhost:3001/v1/movies/${params?.id}`
  );

  const { data: auditoriumsResponse } = useFetch<Array<Auditorium>>(
    `http://localhost:3001/v1/auditoriums`
  );

  const { data: bookings } = useFetch<Array<Reservation>>(
    `http://localhost:3001/v1/bookings?schedule=${schedule}&auditorium=${auditorium?.id}`,
    [schedule, auditorium]
  );

  watch();

  useEffect(() => {
    if (auditoriumsResponse?.length) {
      setAuditoriums(auditoriumsResponse);

      const auditoriumATotalSeats = auditoriumsResponse[0].seats;

      setValue("auditoriumId", auditoriumsResponse[0].id);
      setValue("schedule", auditoriumsResponse[0].schedules[0]);

      setAuditorium(() => auditoriumsResponse[0]);
      setSchedule(() => auditoriumsResponse[0].schedules[0]);
      setSeatsFilled(
        () => new Set(bookings?.map((booking) => booking.seat.seatNumber))
      );
      generateSeatList(auditoriumATotalSeats, setSeats);
    }
  }, [auditoriumsResponse, bookings]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "auditoriumId") {
        if (value.auditoriumId) {
          const current = value.auditoriumId as string;

          const auditoriumSelecte = auditoriums?.find(
            (auditorium: Auditorium) => auditorium.id === current
          );

          if (auditoriumSelecte) {
            setAuditorium(auditoriumSelecte);
            generateSeatList(auditoriumSelecte.seats, setSeats);
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, auditoriums]);

  const handleSeatSelected = (seat: number) => {
    if (seatsSelected.has(seat)) {
      seatsSelected.delete(seat);

      setSeatsSelected((set) => {
        return new Set([...Array.from(set)]);
      });
      return;
    }

    setSeatsSelected((set) => {
      return new Set([...Array.from(set), seat]);
    });
  };

  const handleBooking = async (data: any) => {
    toast.promise(
      bookingService({
        auditoriumId: data?.auditoriumId,
        bookerId: data?.bookerId,
        schedule: data?.schedule,
        seatNumber: 5,
        seatId: "",
        movieId,
      }),
      {
        loading: "Loading...",
        success: "Booking has been reserved",
        error: "Error",
      }
    );
  };

  const SeatContainer = (
    <div className="flex flex-col	items-center w-full md:min-w-2/3 lg:w-2/3 gap-y-10">
      <h1 className="text-3xl font-bold">{movie?.name}</h1>
      <div className="flex gap-x-10 bg-stone-200 p-2 px-4 rounded-md">
        <div className="flex items-center  gap-x-3">
          <EmptySeatIcon />
          Empty seat
        </div>
        <div className="flex items-center  gap-x-3">
          <FilledSeatIcon />
          Reserved seat
        </div>
        <div className="flex items-center  gap-x-3">
          <SelectedSeatIcon />
          Selected seat
        </div>
      </div>
      <div className="flex flex-wrap items-center w-1/2 justify-center gap-2.5 m-auto">
        {Array.from(seats).map((seat, idx) => (
          <>
            {satsFilled.has(seat) ? (
              <div className="flex flex-col items-center">
                <FilledSeatIcon />
                {seat}
              </div>
            ) : (
              <button key={idx} onClick={() => handleSeatSelected(seat)}>
                {seatsSelected.has(seat) ? (
                  <SelectedSeatIcon />
                ) : (
                  <EmptySeatIcon />
                )}
                {seat}
              </button>
            )}
          </>
        ))}
      </div>
      <div className="w-9/12">
        <div className="w-full bg-slate-950	h-7 flex rounded-lg">
          <span className="text-white	w-full m-auto text-center">Screen</span>
        </div>
      </div>
    </div>
  );

  const ReservationFormContainer = (
    <div className="flex flex-col	items-center min-w-1/3 lg:w-1/3 gap-4">
      <div className="group relative block bg-black rounded-lg h-80 shadow-2xl">
        <img
          alt=""
          src={movie?.cover}
          className="rounded-lg inset-0 h-full w-full"
        />
      </div>
      <form onSubmit={handleSubmit(handleBooking)} className="w-full">
        <div className="flex flex-col items-center w-full gap-y-4">
          <SelectInput
            inputLabel="Auditory"
            name="auditoriumId"
            control={control}
            options={auditoriums?.map((auditorium: Auditorium) => ({
              label: auditorium.name,
              value: auditorium.id,
            }))}
          />
          <SelectInput
            control={control}
            name="schedule"
            inputLabel="Schedule"
            options={auditorium?.schedules.map((schedule) => ({
              label: schedule,
              value: schedule,
            }))}
          />
          <PrimaryButton title="Get tickets" type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div
      className="
      flex 
      flex-col
      md:flex-col
      lg:flex-row
      items-center
      md:items-center
      justify-between
      gap-10
      lg:p-10
      md:p-10
      m-auto
      rounded-md
      shadow-l
      w-4/5"
    >
      {SeatContainer}
      {ReservationFormContainer}
    </div>
  );
}

export default MovieReservation;
