"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Palette, Package, Settings, Plus, ImageIcon, X, Pencil } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { normalizeFiles } from "@/lib/normalizeFiles";
import TextInput from "@/components/fields/TextInput";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/types/productTypes";
import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MAX_PRODUCT_SIZE = 1 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

// Variant Schema
const variantSchema = z.object({
  size: z.string().min(1),
  color: z.string().min(1),
  price: z.string().min(1),
  discount_price: z.string().nullable().optional(),
  stock: z.string().min(0),
  images: z
    .any()
    .refine((files) => normalizeFiles(files).every((f) => f instanceof Blob), "All files must be images")
    .refine((files) => normalizeFiles(files).every((f) => f.size <= MAX_PRODUCT_SIZE), `Image must be less than ${MAX_PRODUCT_SIZE / (1024 * 1024)}MB`)
    .refine((files) => normalizeFiles(files).every((f) => ALLOWED_IMAGE_TYPES.includes(f.type)), "Only jpg/png/webp")
});

// Product Schema
const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  discount_price: z.string().nullable().optional(),
  pattern: z.string().min(1),
  fabric: z.string().min(1),
  material: z.string().min(1),
  images: z.any(),
  categories: z.array(z.number()).min(1),
  variants: z.array(variantSchema).min(1),
});

type ProductFormData = z.infer<typeof productSchema>;

const ImagePreview = ({
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

interface UpdateProductDialogProps {
  product: Product; 
}

export default function UpdateProduct({ product }: UpdateProductDialogProps) {
  const [open, setOpen] = useState(false);
  const { updateProduct } = useProducts();
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
      name: product.title || "",
      description: product.description || "",
      price: String(product.price || ""),
      discount_price: product.discount_price != null ? String(product.discount_price) : null,
      pattern: product.pattern || "",
      fabric: product.fabric || "",
      material: product.material || "",
      images: [],
      categories: product.categories?.map((c: any) => c.categories_id) || [],
      variants: product.variants?.map((v: any) => ({
        size: v.size,
        color: v.color,
        price: String(v.price),
        discount_price: v.discount_price != null ? String(v.discount_price) : null,
        stock: String(v.stock),
        images: [],
      })) || [],
    },
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
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

  useEffect(() => {
    reset({
      name: product.title || "",
      description: product.description || "",
      price: String(product.price || ""),
      discount_price: product.discount_price != null ? String(product.discount_price) : null,
      pattern: product.pattern || "",
      fabric: product.fabric || "",
      material: product.material || "",
      images: [],
      categories: product.categories?.map((c: any) => c.categories_id) || [],
      variants: product.variants?.map((v: any) => ({
        size: v.size,
        color: v.color,
        price: String(v.price),
        discount_price: v.discount_price !=  null ? String(v.discount_price) : null,
        stock: String(v.stock),
        images: [],
      })) || [],
    });
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("discount_price", data.discount_price ?? "");
      formData.append("pattern", data.pattern);
      formData.append("fabric", data.fabric);
      formData.append("material", data.material);

      data.categories.forEach((id) => formData.append("categories[]", id.toString()));

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => formData.append("images[]", file as Blob));
      }

      data.variants.forEach((variant, index) => {
        formData.append(`variant[${index}][size]`, variant.size);
        formData.append(`variant[${index}][color]`, variant.color);
        formData.append(`variant[${index}][price]`, variant.price);
        formData.append(`variant[${index}][discount_price]`, variant.discount_price ?? "");
        formData.append(`variant[${index}][stock]`, variant.stock);
        if (variant.images && variant.images.length > 0) {
          Array.from(variant.images).forEach((file) => formData.append(`variant[${index}][images][]`, file as Blob));
        }
      });

      await updateProduct.mutateAsync({ id: product.id, payload: formData });
      setOpen(false);
    } catch (err) {
      console.error("Failed to update product",err);
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
          <p>Edit Product</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-6xl w-full md:min-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-yellow-500" />
            Update Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" /> Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Product Name" name="name" register={register} error={errors.name} />
              <TextInput
                label="Price"
                name="price"
                register={register}
                // registerOptions={{ valueAsNumber: true }}
                error={errors.price}
              />
              <TextInput
                label="Discount Price"
                name="discount_price"
                register={register}
                // registerOptions={{ valueAsNumber: true }}
                error={errors.discount_price}
              />
              <TextInput label="Pattern" name="pattern" register={register} error={errors.pattern} />
              <TextInput label="Fabric" name="fabric" register={register} error={errors.fabric} />
              <TextInput label="Material" name="material" register={register} error={errors.material} />

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
                <Package className="h-5 w-5 text-purple-500" /> Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TextInput label="Description" name="description" register={register} error={errors.description} type="textArea" />
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-purple-500" /> Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input type="file" multiple accept="image/*" onChange={handleProductImageChange} />
              {errors.images?.message && <p className="text-red-500 text-sm mt-1">{String(errors.images.message)}</p>}
              <ImagePreview files={productImages} onRemove={removeProductImage} />

            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-500" /> Product Variants
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendVariant({ size: "", color: "", price: "", discount_price: null, stock: "", images: [] })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Variant
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {variantFields.map((field, index) => (
                <div key={field.id} className="rounded-lg border p-4 relative space-y-4 mb-6">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-8 right-2 text-red-500 hover:text-red-600"
                    onClick={() => removeVariant(index)}
                  >
                    <X />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput label="Size" name={`variants.${index}.size`} register={register} error={errors.variants?.[index]?.size} />
                    
                    <div>
                      <Label htmlFor={`variant-color-${index}`}>Color</Label>
                      <Controller
                        name={`variants.${index}.color`}
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger id={`variant-color-${index}`} className="w-full mt-2">
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="white">White</SelectItem>
                              <SelectItem value="black">Black</SelectItem>
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
                      register={register}
                      // registerOptions={{ valueAsNumber: true }}
                      error={errors.variants?.[index]?.price}
                    />
                    <TextInput
                      label="Discount Price"
                      name={`variants.${index}.discount_price`}
                      register={register}
                      // registerOptions={{ valueAsNumber: true }}                     
                      error={errors.variants?.[index]?.discount_price}
                    />
                    <TextInput
                      label="Stock"
                      name={`variants.${index}.stock`}
                      register={register}
                      // registerOptions={{ valueAsNumber: true }}
                      error={errors.variants?.[index]?.stock}
                    />
                  </div>
                  <div>
                    <Label>Variant Images</Label>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleVariantImageChange(index, e)}
                      className="mt-2"
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

          <Separator />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
