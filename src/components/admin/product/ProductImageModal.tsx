"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  photos: string[];
}

export default function ProductImageModal({ open, onClose, photos }: ImageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Photo Preview</DialogTitle>
        </DialogHeader>

        <div className="relative w-full">
          <Carousel className="w-full px-8">
            <CarouselContent>
              {photos.map((photo, idx) => (
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
                          className="object-cover rounded h-60"
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

            {/* Carousel Navigation */}
            {photos.length > 1 && (
              <>
                <CarouselPrevious className="ml-10" />
                <CarouselNext className="mr-10" />
              </>
            )}
          </Carousel>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
