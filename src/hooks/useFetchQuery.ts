"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/utils/httpClient";

export function useFetchQuery<T>(
  key: string | any[],
  url: string,
  options: object = {}
) {
  return useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const response = await httpClient.get<T>(url);
      return response;
    },
    ...options,
  });
}
