import Image from "next/image"
import { Button } from "../ui/button"
import { X } from "lucide-react"

export const ImagePreview = ({
  files,
  onRemove,
}: {
  files: FileList | File[] | null
  onRemove: (index: number) => void
}) => {
  if (!files || files.length === 0) return null

  const fileArray = Array.from(files)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {fileArray.map((file, index) => (
        <div key={index} className="relative group">
          <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
            <Image
              src={URL.createObjectURL(file) || "/placeholder.png"}
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