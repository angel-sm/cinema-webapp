import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import axiosInstance from "../_lib/axios/axiosInstance";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

const useFetch = <T>(url: string, dependency: any[] = []): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T> = await axiosInstance.get(url);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
};

export default useFetch;
