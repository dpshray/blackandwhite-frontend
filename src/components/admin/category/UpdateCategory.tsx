'use client'

import TextInput from "@/components/fields/TextInput";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/categoryTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCategory } from "react-icons/md";
import z from "zod";


const categorySchema = z.object({
  title: z.string().min(1, "Category name is required"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface UpdateCategoryDialogProps {
  category: Category; 
}

export default function UpdateCategory({ category }: UpdateCategoryDialogProps) {
    const [open, setOpen] = useState(false);
    const { updateCategory } = useCategories();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: "",
        },
    });

    useEffect(() => {
        reset({
            title: category.title,
        });
    }, [category, reset])

    const onSubmit = async (data: CategoryFormData) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            await updateCategory.mutateAsync({ id: category.id, payload: formData });
            setOpen(false);
            reset()
        } catch (error) {
            console.error("Failed to update category:", error);
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
                    <p>Edit Category</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-6xl w-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <MdCategory className="h-6 w-6 text-yellow-500" />
                        Update Category
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        label="Category Name"
                        name="title"
                        placeholder="Enter category name"
                        register={register}
                        error={errors.title}
                    />

                    {/* Submit */}
                    <div className="flex justify-end mt-4">
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Submitting..." : "Update Category"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}