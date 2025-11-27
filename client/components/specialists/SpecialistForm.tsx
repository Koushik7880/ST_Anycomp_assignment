// client/components/specialists/SpecialistForm.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Specialist } from "@/types/specialists";
import { api } from "@/lib/api";

type Mode = "create" | "edit";

interface Props {
  mode: Mode;
  initialData?: Specialist;
}

interface ImageSlot {
  file: File | null;
  previewUrl: string | null; // can be local object URL or server URL
}

const PLATFORM_FEE_PERCENT = 0.1; // 10%

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ?? "";

export default function SpecialistForm({ mode, initialData }: Props) {
  const router = useRouter();

  // ---------- Form state ----------
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  // these two are custom – using `as any` so TS doesn’t complain if your type
  // hasn’t been updated yet
  const [additionalOfferings, setAdditionalOfferings] = useState<string>(
    (initialData as any)?.additional_offerings ?? ""
  );
  const [companySecretary, setCompanySecretary] = useState<string>(
    (initialData as any)?.company_secretary ?? ""
  );

  const [durationDays, setDurationDays] = useState<string>(
    initialData?.duration_days?.toString() ?? ""
  );
  const [basePrice, setBasePrice] = useState<string>(
    initialData?.base_price?.toString() ?? ""
  );
  const [isDraft, setIsDraft] = useState<boolean>(
    initialData?.is_draft ?? true
  );

  const [images, setImages] = useState<ImageSlot[]>([
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------- Derived values ----------
  const numericBasePrice = Number(basePrice) || 0;
  const platformFee = useMemo(
    () => Math.round(numericBasePrice * PLATFORM_FEE_PERCENT),
    [numericBasePrice]
  );
  const finalPrice = numericBasePrice + platformFee;

  // ---------- Slug auto-generation ----------
  useEffect(() => {
    if (mode === "create") {
      const slugBase = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(slugBase);
    }
  }, [title, mode]);

  // ---------- Hydrate fields when editing ----------
  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title);
    setSlug(initialData.slug);
    setDescription(initialData.description);
    setDurationDays(initialData.duration_days.toString());
    setBasePrice(initialData.base_price.toString());
    setIsDraft(initialData.is_draft);
    setAdditionalOfferings((initialData as any)?.additional_offerings ?? "");
    setCompanySecretary((initialData as any)?.company_secretary ?? "");
  }, [initialData]);

  // ---------- Load media in EDIT mode ----------
  useEffect(() => {
    const fetchMedia = async () => {
      if (mode !== "edit" || !initialData?.id) return;

      try {
        const res = await api.get(`/specialists/${initialData.id}/media`);
        const items =
          (res.data?.data as {
            file_name: string;
            display_order: number;
          }[]) ?? [];

        const next: ImageSlot[] = [
          { file: null, previewUrl: null },
          { file: null, previewUrl: null },
          { file: null, previewUrl: null },
        ];

        items.forEach((m) => {
          const idx = (m.display_order ?? 1) - 1;
          if (idx >= 0 && idx < next.length && m.file_name) {
            next[idx] = {
              file: null,
              previewUrl: `${API_BASE}/uploads/${m.file_name}`,
            };
          }
        });

        setImages(next);
      } catch (err) {
        console.error("Failed to load media:", err);
      }
    };

    fetchMedia();
  }, [mode, initialData?.id]);

  // ---------- Image handlers ----------
  const handleImageChange = (index: number, file: File | null) => {
    setImages((prev) =>
      prev.map((slot, i) =>
        i === index
          ? {
              file,
              previewUrl: file ? URL.createObjectURL(file) : slot.previewUrl, // keep existing preview if user clears file
            }
          : slot
      )
    );
  };

  // ---------- Submit ----------
  const handleSubmit = async (publish: boolean) => {
    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        title,
        slug,
        description,
        base_price: numericBasePrice,
        platform_fee: platformFee,
        final_price: finalPrice,
        duration_days: Number(durationDays) || 0,
        is_draft: !publish,
        additional_offerings: additionalOfferings,
        company_secretary: companySecretary,
      };

      let specialistId = initialData?.id;

      if (mode === "create") {
        const res = await api.post("/specialists", payload);
        specialistId = res.data.data.id as string;
      } else if (mode === "edit" && specialistId) {
        await api.put(`/specialists/${specialistId}`, payload);
      }

      // Upload images AFTER we have a specialist id
      if (specialistId) {
        const filesToUpload = images
          .map((slot, index) => ({
            file: slot.file,
            displayOrder: index + 1,
          }))
          .filter(
            (x) => x.file
          ) as { file: File; displayOrder: number }[];

        if (filesToUpload.length > 0) {
          const formData = new FormData();
          filesToUpload.forEach(({ file, displayOrder }) => {
            formData.append("files", file);
            formData.append("display_orders", String(displayOrder));
          });

          try {
            await api.post(`/specialists/${specialistId}/media`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          } catch (err: any) {
            if (err?.response?.status === 404) {
              console.warn(
                "Media upload endpoint not found (404). Specialist saved, but images were NOT uploaded."
              );
            } else {
              throw err;
            }
          }
        }
      }

      router.push("/specialists");
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ??
          "Failed to save specialist. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Layout ----------
  return (
    <Box className="w-full">
      {/* Header */}
      <Box className="mb-6">
        <Typography
          variant="h5"
          className="!font-semibold !text-[#222222] mb-1"
        >
          {mode === "create" ? "Create Specialist" : "Edit Specialist"}
        </Typography>
        <Typography variant="body2" className="!text-sm !text-gray-500">
          Set up a new service to offer to your clients &amp; companies.
        </Typography>
      </Box>

      {error && (
        <Box className="mb-4 text-sm text-red-600 border border-red-200 rounded-md px-3 py-2 bg-red-50">
          {error}
        </Box>
      )}

      {/* Main grid: left content + right fee card */}
      <Box className="grid gap-8 grid-cols-[minmax(0,3fr)_minmax(280px,320px)] items-start">
        {/* LEFT column */}
        <Box>
          {/* Title input */}
          <Box className="mb-4 max-w-xl">
            <Typography className="!text-sm !font-semibold !mb-1">
              Title
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your service title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>

          {/* Big heading above images */}
          <Typography
            variant="h6"
            className="!text-base !font-semibold !mb-3"
          >
            {title || "Register a new company | Private Limited - Sdn Bhd"}
          </Typography>

          {/* Image grid */}
          <Box className="grid grid-cols-[2fr_1.2fr] gap-4 mb-8">
            <ImageUploadTile
              label="Upload an image for your service listing (PNG, JPG up to 4MB)"
              slot={images[0]}
              onChange={(file) => handleImageChange(0, file)}
              tall
            />

            <Box className="flex flex-col gap-4">
              <ImageUploadTile
                label="Upload image (2nd) (PNG, JPG up to 4MB)"
                slot={images[1]}
                onChange={(file) => handleImageChange(1, file)}
              />
              <ImageUploadTile
                label="Upload image (3rd) (PNG, JPG up to 4MB)"
                slot={images[2]}
                onChange={(file) => handleImageChange(2, file)}
              />
            </Box>
          </Box>

          {/* Description / Additional offerings / Company secretary */}
          <Box className="space-y-4">
            <div>
              <Typography className="!text-sm !font-semibold !mb-1">
                Description
              </Typography>
              <Typography className="!text-xs !text-gray-500 mb-1">
                Describe your service here
              </Typography>
              <TextField
                multiline
                minRows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Typography className="!text-sm !font-semibold !mb-1">
                Additional Offerings
              </Typography>
              <Typography className="!text-xs !text-gray-500 mb-1">
                Enhance your service by adding additional offerings
              </Typography>
              <TextField
                multiline
                minRows={3}
                fullWidth
                value={additionalOfferings}
                onChange={(e) => setAdditionalOfferings(e.target.value)}
              />
            </div>

            <div>
              <Typography className="!text-sm !font-semibold !mb-1">
                Company Secretary
              </Typography>
              <Typography className="!text-xs !text-gray-500 mb-1">
                This section can display information about the professional or
                company providing the service. For this assignment, it&apos;s a
                static placeholder to match the Figma layout.
              </Typography>
              <TextField
                multiline
                minRows={3}
                fullWidth
                value={companySecretary}
                onChange={(e) => setCompanySecretary(e.target.value)}
              />
            </div>
          </Box>
        </Box>

        {/* RIGHT: Professional Fee card */}
        <Card
          elevation={1}
          className="w-full self-start border border-gray-100"
        >
          <CardContent>
            <Typography className="!text-sm !font-semibold !mb-1">
              Professional Fee
            </Typography>
            <Typography className="!text-xs !text-gray-500 !mb-4">
              Set a rate for your service
            </Typography>

            <Typography className="!text-3xl !font-semibold !mb-4">
              RM {finalPrice.toFixed(2)}
            </Typography>

            <Box className="space-y-2 mb-4">
              <TextField
                label="Estimated Completion Time (Days)"
                fullWidth
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
              />
              <TextField
                label="Base Price (RM)"
                fullWidth
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />
            </Box>

            <Box className="border-t border-gray-200 pt-3 text-sm space-y-1">
              <Box className="flex justify-between">
                <span>Base price</span>
                <span>RM {numericBasePrice.toFixed(2)}</span>
              </Box>
              <Box className="flex justify-between">
                <span>Service processing fee (platform)</span>
                <span>RM {platformFee.toFixed(2)}</span>
              </Box>
              <Box className="flex justify-between font-semibold">
                <span>Total</span>
                <span>RM {finalPrice.toFixed(2)}</span>
              </Box>
            </Box>

            <Box className="mt-4 flex flex-col gap-2">
              <Button
                variant="outlined"
                fullWidth
                disabled={submitting}
                onClick={() => {
                  setIsDraft(true);
                  handleSubmit(false);
                }}
              >
                Save Draft
              </Button>
              <Button
                variant="contained"
                fullWidth
                disabled={submitting}
                onClick={() => {
                  setIsDraft(false);
                  handleSubmit(true);
                }}
              >
                Save &amp; Publish
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

// ---------- Image tile helper ----------
interface ImageUploadTileProps {
  label: string;
  slot: ImageSlot;
  onChange: (file: File | null) => void;
  tall?: boolean;
}

function ImageUploadTile({
  label,
  slot,
  onChange,
  tall,
}: ImageUploadTileProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  return (
    <Box
      className={`border border-dashed border-gray-300 rounded-sm flex flex-col items-center justify-center text-center px-4 ${
        tall ? "h-64" : "h-28"
      }`}
    >
      {slot.previewUrl ? (
        <img
          src={slot.previewUrl}
          alt="Preview"
          className="w-full h-full object-cover rounded-sm"
        />
      ) : (
        <>
          <Typography className="!text-xs !text-gray-500 mb-2">
            {label}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            component="label"
            className="!text-xs"
          >
            Upload image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleInputChange}
            />
          </Button>
        </>
      )}
    </Box>
  );
}
