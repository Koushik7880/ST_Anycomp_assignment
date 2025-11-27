// src/components/specialists/SpecialistsFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSpecialistsStore } from "@/store/specialistsStore";
import { SpecialistsStatusFilter } from "@/lib/specialists";

const tabs: { label: string; value: SpecialistsStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Drafts", value: "draft" },
  { label: "Published", value: "published" },
];

export default function SpecialistsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status, setStatus, search, setSearch } = useSpecialistsStore();
  const [searchInput, setSearchInput] = useState(search);

  // optional: keep URL in sync
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    if (search) params.set("search", search);
    else params.delete("search");

    router.replace(`/specialists?${params.toString()}`);
  }, [status, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (_: any, value: SpecialistsStatusFilter) => {
    setStatus(value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
      <div>
        <Tabs
          value={status}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </div>
      <div className="flex gap-3">
        <TextField
          size="small"
          placeholder="Search services"
          value={searchInput}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
        />
        <Button variant="contained" onClick={handleSearchSubmit}>
          Search
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/specialists/create")}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
