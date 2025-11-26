"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  photos: string[] | string;
  title?: string;
}

export default function ProductImageModal({ open, onClose, photos, title = "Photo Preview" }: ImageDialogProps) {
  const photoArray = Array.isArray(photos) ? photos : [photos];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {photoArray.length > 1 ? (
          <div className="relative w-full">
            <Carousel className="w-full px-8">
              <CarouselContent>
                {photoArray.map((photo, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="p-0">
                      <CardContent className="flex items-center justify-center p-2">
                        <Link
                          href={photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full aspect-[4/5] relative"
                        >
                          <Image
                            src={photo}
                            alt={`Photo ${idx + 1}`}
                            fill
                            className="object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/images/placeholder.png";
                            }}
                          />
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="ml-8" />
              <CarouselNext className="mr-8" />
            </Carousel>
          </div>
        ) : (
          // If single image → show one large centered image
          <div className="w-full flex justify-center">
            <div className="relative w-[280px] md:w-[400px] lg:w-[450px] aspect-[4/5]">
              <Image
                src={photoArray[0]}
                alt="Preview"
                fill
                className="object-cover rounded"
              />
            </div>
          </div>
        )}

        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
