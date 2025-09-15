'use client'

import TextInput from "@/components/fields/TextInput";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { normalizeFiles } from "@/lib/normalizeFiles";
import { Banner } from "@/types/bannerTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiFlagBanner } from "react-icons/pi";
import z from "zod";
import { ImagePreview } from "../ImagePreview";
import { useUpdateBanner } from "@/hooks/useBanners";


export const MAX_BANNER_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const bannerSchema = z.object({
  title: z.string().min(1, "Banner title is required"),
  subtitle: z.string().min(1, "Banner subtitle is required"),
  url: z
    .string()
    .min(1, "URL is required")
    .regex(/^\/[A-Za-z0-9-_\/]*$/, "Invalid URL, should start with '/'"),
  image: z.any()
    .refine((files) => normalizeFiles(files).every((file) => file instanceof Blob),"All files must be valid images")
    .refine((files) => normalizeFiles(files).every((f) => f.size <= MAX_BANNER_SIZE),`Image must be less than ${MAX_BANNER_SIZE / (1024 * 1024)}MB`)
    .refine((files) =>normalizeFiles(files).every((f) =>ALLOWED_IMAGE_TYPES.includes(f.type)),
      "Only jpg, jpeg, png, or webp files are allowed"
    ),
});

type BannerFormData = z.infer<typeof bannerSchema>;

interface UpdateBannerDialogProps {
  banner: Banner; 
}

export default function UpdateBanner({ banner }: UpdateBannerDialogProps) {
    const [open, setOpen] = useState(false);
    const [bannerImage, setBannerImage] = useState<File[] | null>(null)
    const updateBanner = useUpdateBanner();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<BannerFormData>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            url: "",
        },
    });

    useEffect(() => {
        reset({
            title: banner.title,
            subtitle: banner.subtitle,
            url: banner.url,
        });
    }, [banner, reset])

    const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setBannerImage(files);
            setValue("image", e.target.files); // RHF expects FileList
        }
    }

    const removeBannerImage = () => {
        setBannerImage(null);
        setValue("image", null);
    };

    const onSubmit = async (data: BannerFormData) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("subtitle", data.subtitle);
            formData.append("url", data.url);
            
            if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }
            await updateBanner.mutateAsync({ id: banner.id, payload: formData });
            setOpen(false);
            reset()
        } catch (error) {
            console.error("Failed to update banner:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4 text-blue-600" />
                            </Button>
                        </DialogTrigger>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit Banner</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-6xl w-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <PiFlagBanner className="h-6 w-6 text-yellow-500" />
                        Update Banner
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <TextInput
                        label="Title"
                        name="title"
                        placeholder="Enter banner title"
                        register={register}
                        error={errors.title}
                    />
                    <TextInput
                        label="Subtitle"
                        name="subtitle"
                        placeholder="Enter banner subtitle"
                        register={register}
                        error={errors.subtitle}
                    />
                    <TextInput
                        label="Url"
                        name="url"
                        placeholder="eg: /hoodies"
                        register={register}
                        error={errors.url}
                    />

                    <div>
                        <Label className="pb-2">Banner Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerImageChange}
                            className="h-10 file:mr-4 file:mt-0.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:hover:bg-black/80 file:cursor-pointer"
                        />
                        {errors.image?.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {String(errors.image?.message)}
                            </p>
                        )}

                        {bannerImage && (
                            <ImagePreview files={bannerImage} onRemove={removeBannerImage} single banner/>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end mt-4">
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Submitting..." : "Update Banner"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}