import { useState } from "react";
import { useForm } from "react-hook-form";

export interface Movie {
  comingSoon: boolean;
  cover: string;
  id: string;
  name: string;
}

export interface Auditorium {
  id: string;
  name: string;
  seats: number;
  schedules: Array<string>;
}

interface Props {
  bookerId: string | undefined;
}

export const useMovie = ({ bookerId }: Props) => {
  const [auditoriums, setAuditoriums] = useState<any>([]);
  const [auditorium, setAuditorium] = useState<Auditorium | null>(null);
  const [schedule, setSchedule] = useState<string | null>(null);
  const [satsFilled, setSeatsFilled] = useState<Set<number>>(new Set());
  const [seats, setSeats] = useState<Set<number>>(new Set());
  const [seatsSelected, setSeatsSelected] = useState<Set<number>>(new Set());

  const { control, handleSubmit, getValues, watch, setValue } = useForm({
    defaultValues: {
      auditoriumId: "",
      schedule: "",
      bookerId,
    },
  });

  const generateSeatList = (seats: number, setSeats: any) => {
    const seatsNumbers: Array<number> = [];
    for (let index = 1; index <= seats; index++) {
      seatsNumbers.push(index);
    }
    setSeats(() => {
      return new Set(seatsNumbers);
    });
  };

  return {
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
    getValues,
    watch,
    setValue,
  };
};
