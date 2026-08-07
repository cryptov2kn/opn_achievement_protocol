"use client";

import { useState } from "react";

import { useSearch } from "@/providers/SearchProvider";

export function useEventFilters() {
  const { search, setSearch } = useSearch();

  const [view, setViewState] = useState("newest");
  const [page, setPageState] = useState(1);

  const resetPage = () => setPageState(1);

  const setView = (value: string) => {
    setViewState(value);
    resetPage();
  };

  const setPage = (value: number) => {
    setPageState(value);
  };

  return {
    search,
    setSearch,

    view,
    setView,

    page,
    setPage,
  };
}
