import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { searchMastersByNames } from "../services/search";

export const useFindMasterByName = (query: string, limit?: number) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return useQuery({
    queryKey: ["search-masters", debouncedQuery, limit],
    queryFn: () => searchMastersByNames(debouncedQuery, limit),
    enabled: debouncedQuery.length >= 2, // Only search if query is at least 2 characters
  });
};
