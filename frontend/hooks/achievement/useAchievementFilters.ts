"use client";

import { useSearch } from "@/providers/SearchProvider";
import { useState } from "react";

export function useAchievementFilters() {
  const { search, setSearch } = useSearch();

  const [category, setCategoryState] = useState("all");
  const [view, setViewState] = useState("newest");
  const [page, setPageState] = useState(1);

  const resetPage = () => setPageState(1);

  const setCategory = (value: string) => {
    setCategoryState(value);
    resetPage();
  };

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

    category,
    setCategory,

    view,
    setView,

    page,
    setPage,
  };
}
