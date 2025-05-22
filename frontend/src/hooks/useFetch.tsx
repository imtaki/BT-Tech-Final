import { useEffect } from "react";
import api from "../utils/axios";
import {AxiosError} from "axios";

export const useFetch = <T,>(url: string, setter: (data: T) => void) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(url);
        setter(res.data);
      } catch (e) {
        if (e instanceof AxiosError) console.error(e?.response?.statusText);
      }
    };
    fetchData();
  }, [url]);
};
