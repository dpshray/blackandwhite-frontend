"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

export const ImagePreview = ({
  files,
  onRemove,
  single = false,
  banner = false,
}: {
  files: FileList | File[] | null
  onRemove: (index: number) => void
  single?: boolean
  banner?: boolean
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviewUrls([])
      return
    }

    const fileArray = Array.from(files)
    const urls = fileArray.map((file) =>
      file instanceof File ? URL.createObjectURL(file) : (file as string)
    )
    setPreviewUrls(urls)

    // cleanup blob URLs
    return () => {
      urls.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url)
      })
    }
  }, [files])

  if (!files || files.length === 0) return null

  return (
    <div
      className={
        single
          ? "flex justify-center mt-4"
          : "grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
      }
    >
      {previewUrls.map((url, index) => (
        <div key={index} className="relative group">
          <div className={`rounded-lg overflow-hidden border border-gray-200 ${
            banner ? "aspect-[2.4/1]" : "aspect-square"
          }`}>
            <Image
              src={url || "/placeholder.png"}
              alt={`Preview ${index + 1}`}
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onRemove(index)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  )
}
