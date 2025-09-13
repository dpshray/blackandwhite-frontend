"use client";

import TextInput from "@/components/fields/TextInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { normalizeFiles } from "@/lib/normalizeFiles";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Package, Palette, Plus, Settings, X } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { ImagePreview } from "../ImagePreview";

export const MAX_PRODUCT_SIZE = 1 * 1024 * 1024; // 1MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const variantSchema = z.object({
  size: z.string().min(1, "Product size is required"),
  color: z.string().min(1, "Product color is required"),
  price: z.string().min(1, "Product price is required"),
  discount_price: z.string().nullable().optional(),
  stock: z.string().min(1, "Product stock is required"),
  images: z.any()
    .refine((files) => normalizeFiles(files).length >= 1,"At least one image is required")
    .refine((files) => normalizeFiles(files).every((file) => file instanceof Blob),"All files must be valid images")
    .refine((files) => normalizeFiles(files).every((f) => f.size <= MAX_PRODUCT_SIZE),`Image must be less than ${MAX_PRODUCT_SIZE / (1024 * 1024)}MB`)
    .refine((files) =>normalizeFiles(files).every((f) =>ALLOWED_IMAGE_TYPES.includes(f.type)),
      "Only jpg, jpeg, png, or webp files are allowed"
    ),
});

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.string().min(1, "Product price is required"),
  discount_price: z.string().nullable().optional(),
  pattern: z.string().min(1, "Product pattern is required"),
  fabric: z.string().min(1, "Product fabric is required"),
  material: z.string().min(1, "Product material is required"),
  images: z.any()
    .refine((files) => normalizeFiles(files).length >= 1,"At least one image is required")
    .refine((files) => normalizeFiles(files).every((file) => file instanceof Blob),"All files must be valid images")
    .refine((files) => normalizeFiles(files).every((f) => f.size <= MAX_PRODUCT_SIZE),`Image must be less than ${MAX_PRODUCT_SIZE / (1024 * 1024)}MB`)
    .refine((files) =>normalizeFiles(files).every((f) =>ALLOWED_IMAGE_TYPES.includes(f.type)),
      "Only jpg, jpeg, png, or webp files are allowed"
    ),
  categories: z.number().min(1, "At least one category is required"),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProduct() {
  const { addProduct } = useProducts();
  const [open, setOpen] = useState(false);
  const { getCategories } = useCategories();
  const categoriesData = getCategories.data?.data?.data || [];
  const [productImages, setProductImages] = useState<FileList | null>(null)
  const [variantImages, setVariantImages] = useState<{ [key: number]: FileList | null }>({})


  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      discount_price: "",
      pattern: "",
      fabric: "",
      material: "",
      images: [],
      categories: undefined,
      variants: [
        {
          size: "",
          color: "",
          price: "",
          discount_price: "",
          stock: "",
          images: [],
        },
      ],
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setProductImages(files)
    setValue("images", files)
  }

  const removeProductImage = (index: number) => {
    if (!productImages) return

    const dt = new DataTransfer()
    const files = Array.from(productImages)

    files.forEach((file, i) => {
      if (i !== index) dt.items.add(file)
    })

    const newFiles = dt.files
    setProductImages(newFiles)
    setValue("images", newFiles)
  }

  const handleVariantImageChange = (variantIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setVariantImages((prev) => ({ ...prev, [variantIndex]: files }))
    setValue(`variants.${variantIndex}.images`, files)
  }

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const currentFiles = variantImages[variantIndex]
    if (!currentFiles) return

    const dt = new DataTransfer()
    const files = Array.from(currentFiles)

    files.forEach((file, i) => {
      if (i !== imageIndex) dt.items.add(file)
    })

    const newFiles = dt.files
    setVariantImages((prev) => ({ ...prev, [variantIndex]: newFiles }))
    setValue(`variants.${variantIndex}.images`, newFiles)
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("discount_price", data.discount_price?.toString() ?? "");
      formData.append("pattern", data.pattern);
      formData.append("fabric", data.fabric);
      formData.append("material", data.material);

      formData.append("categories", data.categories.toString());

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append(`images[]`, file as Blob);
        });
      }
      data.variants.forEach((variant, index) => {
        formData.append(`variant[${index}][size]`, variant.size);
        formData.append(`variant[${index}][color]`, variant.color);
        formData.append(`variant[${index}][price]`, variant.price.toString());
        formData.append(
          `variant[${index}][discount_price]`,
          variant.discount_price?.toString() ?? ""
        );
        formData.append(
          `variant[${index}][stock]`,
          variant.stock?.toString() ?? ""
        );

        if (variant.images && variant.images.length > 0) {
          Array.from(variant.images).forEach((file) => {
            formData.append(`variant[${index}][images][]`, file as Blob);
          });
        }
      });

      //   for (const [key, value] of formData.entries()) {
      //     if (value instanceof File) {
      //       console.log(`${key}: File -> name=${value.name}, size=${value.size}, type=${value.type}`)
      //     } else {
      //       console.log(`${key}: ${typeof value} -> ${value}`)
      //     }
      //   }

      await addProduct.mutateAsync(formData);
      setOpen(false);
      reset();
    } catch {
      // toast.error("Failed to add product:");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-6xl w-full md:min-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-yellow-500" />
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <TextInput
                  label="Product Name"
                  name="name"
                  placeholder="Enter product name"
                  register={register}
                  error={errors.name}
                />
              </div>
              <div>
                <TextInput
                  label="Price"
                  name="price"
                  placeholder="Enter price"
                  register={register}
                  // registerOptions={{ valueAsNumber: true }}
                  error={errors.price}
                />
              </div>
              <div>
                <TextInput
                  label="Discount Price"
                  name="discount_price"
                  placeholder="Enter Discount Price"
                  register={register}
                  // registerOptions={{ valueAsNumber: true }}
                  error={errors.discount_price}
                />
              </div>
              <div>
                <TextInput
                  label="Pattern"
                  name="pattern"
                  placeholder="Enter Pattern"
                  register={register}
                  error={errors.pattern}
                />
              </div>
              <div>
                <TextInput
                  label="Fabric"
                  name="fabric"
                  placeholder="Enter Fabric"
                  register={register}
                  error={errors.fabric}
                />
              </div>
              <div>
                <TextInput
                  label="Material"
                  name="material"
                  placeholder="Enter material"
                  register={register}
                  error={errors.material}
                />
              </div>

              {/* Category Selection Field */}
              <div className="md:col-span-2">
                <Label htmlFor="categories">Category</Label>
                <Controller
                  name="categories"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ""}
                    >
                      <SelectTrigger id="category" className="w-full mt-2">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categories && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(errors.categories.message)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-500" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <TextInput
                  type="textArea"
                  label="Description"
                  name="description"
                  placeholder="Enter description"
                  register={register}
                  error={errors.description}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-purple-500" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input type="file" multiple accept="image/*" onChange={handleProductImageChange} 
                className="h-10 file:mr-4 file:mt-0.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:hover:bg-black/80 file:cursor-pointer"
              />
              {errors.images?.message && <p className="text-red-500 text-sm mt-1">{String(errors.images.message)}</p>}
              <ImagePreview files={productImages} onRemove={removeProductImage} />

            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-500" />
                  Product Variants
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendVariant({
                      size: "",
                      color: "",
                      price: "",
                      discount_price: "",
                      stock: "",
                      images: [],
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Variant
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {variantFields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-lg border p-4 relative space-y-4 mb-6"
                >
                  {/* Delete Button */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-2 text-red-500 hover:text-red-600 "
                      onClick={() => removeVariant(index)}
                    >
                      <X />
                    </Button>
                    <TextInput
                      label="Size"
                      name={`variants.${index}.size`}
                      placeholder="M, L, XL"
                      register={register}
                      error={errors.variants?.[index]?.size}
                    />

                    <div>
                      <Label htmlFor={`variant-color-${index}`}>Color</Label>
                      <Controller
                        name={`variants.${index}.color`}
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id={`variant-color-${index}`} className="w-full mt-2">
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="White">White</SelectItem>
                              <SelectItem value="Black">Black</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.variants?.[index]?.color && (
                        <p className="text-red-500 text-sm mt-1">{String(errors.variants?.[index]?.color?.message)}</p>
                      )}
                    </div>
                      

                    <TextInput
                      label="Price"
                      name={`variants.${index}.price`}
                      placeholder="Enter Variant Price"
                      register={register}
                      // registerOptions={{ valueAsNumber: true }}
                      error={errors.variants?.[index]?.price}
                    />

                    <TextInput
                      label="Discount Price"
                      name={`variants.${index}.discount_price`}
                      placeholder="Enter Variant Discount Price"
                      register={register}
                      // registerOptions={{ valueAsNumber: true }}
                      error={errors.variants?.[index]?.discount_price}
                    />

                    <TextInput
                      label="Stock"
                      name={`variants.${index}.stock`}
                      placeholder="Enter Stock"
                      register={register}
                      // registerOptions={{ valueAsNumber: true }}
                      error={errors.variants?.[index]?.stock}
                    />
                  </div>

                  {/* Variant Images */}
                  <div>
                    <Label className="pb-2">Variant Images</Label>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleVariantImageChange(index, e)}
                      className="h-10 file:mr-4 file:mt-0.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:hover:bg-black/80 file:cursor-pointer"
                    />
                    {errors.variants?.[index]?.images?.message && (
                      <p className="text-red-500 text-sm mt-1">{String(errors.variants?.[index]?.images?.message)}</p>
                    )}
                    <ImagePreview
                      files={variantImages[index]}
                      onRemove={(imageIndex) => removeVariantImage(index, imageIndex)}
                    />

                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit */}
          <Separator />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
