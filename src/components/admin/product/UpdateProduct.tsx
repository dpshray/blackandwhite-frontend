"use client";

import { useState, useEffect, useRef } from "react";
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
import TextInput from "@/components/fields/TextInput";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/types/productTypes";
import { useCategories } from "@/hooks/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePreview } from "../ImagePreview";
import { SIZE_OPTIONS } from "./AddProduct";
import SelectInputField from "@/components/fields/SelectInput";
import ActionModal from "@/components/modal/ConfirmModal";

// Variant Schema
const variantSchema = z.object({
  variant_id: z.number().optional(),
  size: z.string().min(1),
  color: z.string().min(1),
  stock: z.string().min(0),
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
  categories: z.number().min(1, "Category is required"),
  size_detail: z.any(),
  main_image:z.any(),
  variants: z.array(variantSchema).min(1),
});

type ProductFormData = z.infer<typeof productSchema>;

interface UpdateProductDialogProps {
  product: Product; 
}

export default function UpdateProduct({ product }: UpdateProductDialogProps) {
  const [open, setOpen] = useState(false);
  const { updateProduct, deleteVariant } = useProducts();
  const { getCategories } = useCategories();
  const categoriesData = getCategories.data?.data?.data || [];
  const [productImages, setProductImages] = useState<FileList | null>(null)
  const [sizeDetailsImage, setSizeDetailsImage] = useState<File | null>(null)
  const productInputRefs = useRef<HTMLInputElement | null>(null)
  const sizeDetailInputRefs = useRef<HTMLInputElement | null>(null)
  const [mainImage, setMainImage] = useState<File | null>(null);
  const mainImageInputRef = useRef<HTMLInputElement | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);

  const categoryOptions = categoriesData.map((category) => ({
    value: category.id,
    label: category.title,
  }));


  const handleConfirmDelete = () => {
    if (selectedVariantIndex === null) return;

    if (!selectedVariantId) {
      removeVariant(selectedVariantIndex);
      setDeleteModalOpen(false);
      return;
    }

    deleteVariant.mutate(selectedVariantId, {
      onSuccess: () => {
        removeVariant(selectedVariantIndex); 
        setDeleteModalOpen(false);
      },
    });
  };

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
      categories: product.categories?.[0]?.categories_id || undefined,
      size_detail: null,
      main_image: null,
      variants: product.variants?.map((v: any) => ({
        variant_id: v.id,
        size: v.size,
        color: v.color,
        stock: String(v.stock),
      })) || [],
    },
  });

  // console.log("ppp", product)

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: "variants",
  });

  // console.log("vvv", variantFields)

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setMainImage(file);
  };

  const removeMainImage = () => {
    setMainImage(null);
    if (mainImageInputRef.current) mainImageInputRef.current.value = "";
  };

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

  const handleSizeDetailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setSizeDetailsImage(file);
    setValue("size_detail", file); 
  };


  const removeSizeDetailImage = () => {
    setSizeDetailsImage(null);
    setValue("size_detail", null);

    if (sizeDetailInputRefs.current) sizeDetailInputRefs.current.value = ""
  };

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
      categories: product.categories?.[0]?.categories_id || undefined,
      size_detail: null,
      variants: product.variants?.map((v: any) => ({
        variant_id: v.id,
        size: v.size,
        color: v.color,
        stock: String(v.stock),
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
      formData.append("categories", data.categories.toString());

      if (mainImage) {
        formData.append("main_image", mainImage);
      }

      if (data.size_detail) {
        formData.append("size_detail", data.size_detail);
      }

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => formData.append("images[]", file as Blob));
      }

      data.variants.forEach((variant, index) => {
        if (variant.variant_id) formData.append(`variants[${index}][id]`, String(variant.variant_id));
        formData.append(`variant[${index}][size]`, variant.size);
        formData.append(`variant[${index}][color]`, variant.color);
        formData.append(`variant[${index}][stock]`, variant.stock);
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
      <DialogContent className="max-h-[90vh] overflow-y-auto custom-scrollbar max-w-6xl w-full md:min-w-[800px]">
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
                error={errors.price}
              />
              <TextInput
                label="Discount Price"
                name="discount_price"
                register={register}
                error={errors.discount_price}
              />
              <TextInput label="Pattern" name="pattern" register={register} error={errors.pattern} />
              <TextInput label="Fabric" name="fabric" register={register} error={errors.fabric} />
              <TextInput label="Material" name="material" register={register} error={errors.material} />

              {/* Category Selection Field */}
              <div className="md:col-span-2">
                <Controller
                  name="categories"
                  control={control}
                  render={({ field }) => (
                    <SelectInputField
                      label="Category"
                      placeholder="Select a category"
                      name={field.name}
                      options={categoryOptions}
                      value={field.value}               
                      onChangeAction={(value) => field.onChange(Number(value))}
                      error={errors.categories?.message}
                      required
                    />
                  )}
                />
              </div>

              <div>
                <Label htmlFor="size_detail" className="pb-2">Size Details Images</Label>
                <Input type="file" accept="image/*" onChange={handleSizeDetailImageChange} ref={sizeDetailInputRefs}
                  className="h-10 file:mr-4 file:mt-0.5 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:hover:bg-black/80 file:cursor-pointer"
                />
                {errors.size_detail?.message && <p className="text-red-500 text-sm mt-1">{String(errors.size_detail.message)}</p>}
                <ImagePreview files={sizeDetailsImage} onRemove={removeSizeDetailImage}/>
              </div>

              <div>
                <Label htmlFor="main_image" className="pb-2">Main Image</Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  ref={mainImageInputRef}
                  className="h-10 file:mr-4 file:mt-0.5 file:px-4 file:rounded-none 
                            file:border-0 file:text-sm file:font-medium 
                            file:bg-black file:text-white file:hover:bg-black/80 
                            file:cursor-pointer"
                />

                {/* Preview */}
                <ImagePreview files={mainImage} onRemove={removeMainImage} />
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
                <ImageIcon className="h-5 w-5 text-purple-500" /> Product Gallery Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input type="file" multiple accept="image/*" onChange={handleProductImageChange} ref={productInputRefs}
                className="h-10 file:mr-4 file:mt-0.5 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:hover:bg-black/80 file:cursor-pointer"
              />
              {errors.images?.message && <p className="text-red-500 text-sm mt-1">{String(errors.images.message)}</p>}
              <ImagePreview files={productImages} onRemove={removeProductImage}/>

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
                  onClick={() => appendVariant({ variant_id: 0, size: "", color: "", stock: "" })}
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
                    onClick={() => {
                      setSelectedVariantIndex(index);
                      setSelectedVariantId(field.variant_id || 0);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <X />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Controller
                          name={`variants.${index}.size`}
                          control={control}
                          render={({ field }) => (
                            <SelectInputField
                              label="Size"
                              placeholder="Select size"
                              name={field.name}
                              options={SIZE_OPTIONS}
                              value={field.value}              
                              onChangeAction={field.onChange}  
                              error={errors.variants?.[index]?.size?.message as string}
                              required
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
                      label="Stock"
                      name={`variants.${index}.stock`}
                      register={register}
                      error={errors.variants?.[index]?.stock}
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

      <ActionModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Variant?"
        description="Are you sure you want to delete this variant? This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="destructive"
        loading={deleteVariant.isPending}
        onConfirm={handleConfirmDelete}
      />
    </Dialog>
  );
}
