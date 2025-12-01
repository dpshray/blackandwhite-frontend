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
import { useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { ImagePreview } from "../ImagePreview";
import SelectInputField from "@/components/fields/SelectInput";

export const MAX_PRODUCT_SIZE = 1 * 1024 * 1024; // 1MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const SIZE_OPTIONS = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "2XL", label: "2XL" },
  { value: "3XL", label: "3XL" },
  { value: "4XL", label: "4XL" },
];


const variantSchema = z.object({
  size: z.string().min(1, "Product size is required"),
  color: z.string().min(1, "Product color is required"),
  stock: z.string().min(1, "Product stock is required"),
  // images: z.any()
  //   .refine((files) => normalizeFiles(files).length >= 1,"At least one image is required")
  //   .refine((files) => normalizeFiles(files).every((file) => file instanceof Blob),"All files must be valid images")
  //   .refine((files) => normalizeFiles(files).every((f) => f.size <= MAX_PRODUCT_SIZE),`Image must be less than ${MAX_PRODUCT_SIZE / (1024 * 1024)}MB`)
  //   .refine((files) =>normalizeFiles(files).every((f) =>ALLOWED_IMAGE_TYPES.includes(f.type)),
  //     "Only jpg, jpeg, png, or webp files are allowed"
  //   ),
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
  sizeDetail: z.any()
    .refine((files) => normalizeFiles(files).length >= 1,"At least one image is required")
    .refine((files) => normalizeFiles(files).every((file) => file instanceof Blob),"All files must be valid images")
    .refine((files) => normalizeFiles(files).every((f) => f.size <= MAX_PRODUCT_SIZE),`Image must be less than ${MAX_PRODUCT_SIZE / (1024 * 1024)}MB`)
    .refine((files) =>normalizeFiles(files).every((f) =>ALLOWED_IMAGE_TYPES.includes(f.type)),
      "Only jpg, jpeg, png, or webp files are allowed"
    ),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProduct() {
  const { addProduct } = useProducts();
  const [open, setOpen] = useState(false);
  const { getCategories } = useCategories();
  const categoriesData = getCategories.data?.data?.data || [];
  const [productImages, setProductImages] = useState<FileList | null>(null)
  const [sizeDetailImage, setSizeDetailImage] = useState<FileList | null>(null);
  const productInputRefs = useRef<HTMLInputElement | null>(null)
  const sizeDetailInputRefs = useRef<HTMLInputElement | null>(null)

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
      sizeDetail: null,
      variants: [
        {
          size: "",
          color: "",
          stock: "",
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

    if (productInputRefs.current) productInputRefs.current.value = ""

  }

  const handleThumbnailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setSizeDetailImage(files)
    setValue("sizeDetail", files)
  }


  const removeThumbnailImage = (index: number) => {
    if (!sizeDetailImage) return

    const dt = new DataTransfer()
    const files = Array.from(sizeDetailImage)

    files.forEach((file, i) => {
      if (i !== index) dt.items.add(file)
    })

    const newFiles = dt.files
    setSizeDetailImage(newFiles)
    setValue("sizeDetail", newFiles)

    if (sizeDetailInputRefs.current) sizeDetailInputRefs.current.value = ""
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

      if (data.sizeDetail && data.sizeDetail.length > 0) {
        formData.append("size_detail", data.sizeDetail[0]);
      }

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append(`images[]`, file as Blob);
        });
      }
      data.variants.forEach((variant, index) => {
        formData.append(`variant[${index}][size]`, variant.size);
        formData.append(`variant[${index}][color]`, variant.color);
       
        formData.append(
          `variant[${index}][stock]`,
          variant.stock?.toString() ?? ""
        );
      });

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
      <DialogContent className="max-h-[90vh] overflow-y-auto custom-scrollbar max-w-6xl w-full md:min-w-[800px]">
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
                  error={errors.price}
                />
              </div>
              <div>
                <TextInput
                  label="Discount Price"
                  name="discount_price"
                  placeholder="Enter Discount Price"
                  register={register}
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

              <div>
                <Label className="pb-2">Size Details Image</Label>
                <Input type="file" accept="image/*" onChange={handleThumbnailImageChange} ref={sizeDetailInputRefs}
                  className="h-10 file:mr-4 file:mt-0.5 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:hover:bg-black/80 file:cursor-pointer"
                />
                {errors.sizeDetail?.message && <p className="text-red-500 text-sm mt-1">{String(errors.sizeDetail?.message)}</p>}
                <ImagePreview files={sizeDetailImage} onRemove={removeThumbnailImage} single/>
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
              <Input type="file" multiple accept="image/*" onChange={handleProductImageChange}  ref={productInputRefs}
                className="h-10 file:mr-4 file:mt-0.5 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:hover:bg-black/80 file:cursor-pointer"
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
                      stock: "",
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
                    <div>
                      <Controller
                        control={control}
                        name={`variants.${index}.size`}
                        render={({ field }) => (
                          <SelectInputField
                            label="Size"
                            placeholder="Select Size"
                            name={field.name}
                            value={field.value}
                            options={SIZE_OPTIONS}
                            error={errors.variants?.[index]?.size?.message}
                            onChangeAction={field.onChange}
                          />
                        )}
                      />
                    </div>



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
                      label="Stock"
                      name={`variants.${index}.stock`}
                      placeholder="Enter Stock"
                      register={register}
                      error={errors.variants?.[index]?.stock}
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
