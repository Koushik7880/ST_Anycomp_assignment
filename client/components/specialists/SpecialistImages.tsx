// client/components/specialists/SpecialistImages.tsx
"use client";

import { useRef, ChangeEvent } from "react";
import { Box } from "@mui/material";

type Props = {
  images: (File | null)[];
  onChange: (files: (File | null)[]) => void;
};

const labels = [
  "Upload image (PNG, JPG up to 4MB)",
  "Upload image (2nd) (PNG, JPG up to 4MB)",
  "Upload image (3rd) (PNG, JPG up to 4MB)",
];

export default function SpecialistImages({ images, onChange }: Props) {
  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const handleSelect =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      const next = [...images];
      next[index] = file;
      onChange(next);
    };

  const handleClick = (index: number) => {
    inputRefs[index].current?.click();
  };

  const renderBox = (index: number, extraClasses = "") => {
    const file = images[index];
    const preview = file ? URL.createObjectURL(file) : null;

    return (
      <Box
        key={index}
        onClick={() => handleClick(index)}
        className={
          "border border-dashed border-gray-300 rounded-sm bg-[#FAFAFA] flex items-center justify-center cursor-pointer text-xs text-gray-500 text-center px-2 " +
          extraClasses
        }
      >
        <input
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          ref={inputRefs[index]}
          onChange={handleSelect(index)}
        />
        {preview ? (
          <img
            src={preview}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover rounded-sm"
          />
        ) : (
          <span>{labels[index]}</span>
        )}
      </Box>
    );
  };

  return (
    <Box className="flex flex-col gap-4">
      {/* 3 image slots: big left, two stacked on right */}
      <Box className="grid grid-cols-[2fr_1fr] gap-3 max-w-3xl">
        {renderBox(0, "h-56")} {/* main image */}

        <Box className="flex flex-col gap-3">
          {renderBox(1, "h-26")}
          {renderBox(2, "h-26")}
        </Box>
      </Box>
    </Box>
  );
}
