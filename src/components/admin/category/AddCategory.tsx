'use client'

import TextInput from "@/components/fields/TextInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCategories } from "@/hooks/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { MdCategory } from "react-icons/md";

const categorySchema = z.object({
  title: z.string().min(1, "Category name is required"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function AddCategory() {
    const { addCategory } = useCategories();
    const [open, setOpen] = useState(false);

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

    const onSubmit = async (data: CategoryFormData) => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        await addCategory.mutateAsync(formData);
        setOpen(false);
        reset()
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Add Category
                </Button>
        </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-6xl w-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <MdCategory className="h-6 w-6 text-yellow-500" />
                        Add New Category
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
                            {isSubmitting ? "Submitting..." : "Add Category"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )

}