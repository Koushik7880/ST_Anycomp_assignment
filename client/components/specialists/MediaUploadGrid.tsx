// client/components/specialists/MediaUploadGrid.tsx
"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

type MediaSlot = {
  id: number;
  label: string;
};

const MEDIA_SLOTS: MediaSlot[] = [
  {
    id: 0,
    label: "Upload an image file for your service listing (PNG, JPG or JPEG).",
  }, // big left
  { id: 1, label: "Service Image (2nd)" }, // top-right
  { id: 2, label: "Service Image (3rd)" }, // bottom-right
];

export interface MediaUploadGridProps {
  onFilesChange?: (files: (File | null)[]) => void;
}

export default function MediaUploadGrid({
  onFilesChange,
}: MediaUploadGridProps) {
  const [files, setFiles] = React.useState<(File | null)[]>([
    null,
    null,
    null,
  ]);

  const handleFileChange = (slotIndex: number, fileList: FileList | null) => {
    const file = fileList?.[0] ?? null;
    const next = [...files];
    next[slotIndex] = file;
    setFiles(next);
    onFilesChange?.(next);
  };

  const renderSlot = (
    slot: MediaSlot,
    index: number,
    extraClasses = ""
  ) => (
    <label
      key={slot.id}
      className={`border border-dashed border-gray-300 rounded-sm flex flex-col items-center justify-center text-[11px] text-gray-500 cursor-pointer hover:bg-gray-50 transition ${extraClasses}`}
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={(e) => handleFileChange(index, e.target.files)}
      />
      <span className="mb-1 text-xs font-medium text-[#222222]">
        {files[index]?.name ?? "Upload image"}
      </span>
      <Typography
        variant="caption"
        className="text-[10px] text-gray-500 text-center px-4"
      >
        {slot.label}
      </Typography>
    </label>
  );

  return (
    <Box className="w-full">
      <Box className="grid grid-cols-3 gap-4">
        {/* Big left image (2 columns wide, full height) */}
        <Box className="col-span-2 h-64">
          {renderSlot(MEDIA_SLOTS[0], 0, "w-full h-full")}
        </Box>

        {/* Right column: two stacked smaller images */}
        <Box className="col-span-1 flex flex-col gap-4 h-64">
          <Box className="flex-1">
            {renderSlot(MEDIA_SLOTS[1], 1, "w-full h-full")}
          </Box>
          <Box className="flex-1">
            {renderSlot(MEDIA_SLOTS[2], 2, "w-full h-full")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
