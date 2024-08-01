import axios from "axios";

interface SignInResponse {
  id: string;
  email: string;
  token: string;
}

interface BookingRequest {
  auditoriumId: string;
  schedule: string;
  seatNumber?: number;
  seatId: string;
  bookerId: string;
  movieId: string;
}

export const bookingService = async ({
  auditoriumId,
  bookerId,
  schedule,
  seatId,
  seatNumber,
  movieId,
}: BookingRequest): Promise<SignInResponse> => {
  const { data } = await axios.post(
    "http://localhost:3001/v1/bookings",
    {
      auditoriumId,
      bookerId,
      schedule,
      seatId,
      seatNumber,
      movieId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data as SignInResponse;
};
