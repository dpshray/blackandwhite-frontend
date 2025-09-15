"use client";

import { useState } from "react";
import Image from "next/image";
import ProductImageModal from "./ProductImageModal";

export interface PhotoCellProps {
  photos: string[];
}

export default function PhotoCell({ photos }: PhotoCellProps) {
  const [open, setOpen] = useState(false);

  if (!photos || photos.length === 0) {
    return (
      <div className="h-10 w-10 flex items-center justify-center bg-gray-200 text-xs text-gray-500 rounded">
        No Image
      </div>
    );
  }

  const firstPhoto = photos[0];

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative cursor-pointer w-full aspect-[4/5]"
      >
        <Image
          width={100}
          height={100}
          src={firstPhoto}
          alt="Photo Preview"
          className="object-cover rounded"
        />
        {photos.length > 1 && (
          <div className="absolute -bottom-1 -right-1 text-[10px] bg-black text-white px-1 py-0.5 rounded">
            +{photos.length - 1}
          </div>
        )}
      </div>

      <ProductImageModal open={open} onClose={() => setOpen(false)} photos={photos} />
    </>
  );
}
