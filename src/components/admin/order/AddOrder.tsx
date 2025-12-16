import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import SelectInputField from "@/components/fields/SelectInput";
import SearchSelect from "@/components/fields/SearchSelect";
import { useProducts } from "@/hooks/useProducts";
import { useAddAdminOrder } from "@/hooks/useOrder";
import TextInput from "@/components/fields/TextInput";

// Size options
const SIZE_OPTIONS = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "2XL", label: "2XL" },
    { value: "3XL", label: "3XL" },
    { value: "4XL", label: "4XL" },
];

// Color options
const COLOR_OPTIONS = [
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
];

const orderSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    phone: z.string().min(1, "Phone is required").regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
    address: z.string().min(1, "Address is required").min(5, "Address must be at least 5 characters"),
    product_id: z.union([z.string(), z.number()]).refine((val) => val !== "" && val !== null, {
        message: "Product is required",
    }),
    size: z.string().min(1, "Size is required"),
    color: z.string().min(1, "Color is required"),
    quantity: z.number()
        .int("Quantity must be a whole number")
        .positive("Quantity must be greater than 0")
        .min(1, "Quantity must be at least 1"),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function OrderCreationDialog() {
    const [open, setOpen] = useState(false);
    const [productSearch, setProductSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 10;

    const { getProducts } = useProducts(page, perPage, productSearch);
    const { mutateAsync: addOrder, isPending: isSubmitting } = useAddAdminOrder();

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<OrderFormData>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            product_id: "",
            size: "",
            color: "",
            quantity: 1,
        },
    });

    const productOptions =
        getProducts.data?.data?.data?.map((product) => ({
            value: product.id,
            label: `${product.product_code} - ${product.title}`,
        })) || [];

    const onSubmit = async (data: OrderFormData) => {
        try {
            await addOrder(data);
            reset();
            setOpen(false);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const handleDialogChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            reset();
            setProductSearch("");
            setPage(1);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Order
                </Button>
            </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto custom-scrollbar">
            <DialogHeader>
                <DialogTitle className="text-2xl">Create New Order</DialogTitle>
                <DialogDescription>
                    Fill in the customer and product details to create a new order.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                {/* Customer Information */}
                <div className="space-y-4 border-b pb-4">
                    <h3 className="font-semibold text-lg text-muted-foreground">Customer Information</h3>
                    
                    {/* Name */}
                    <div className="space-y-2">
                        <TextInput 
                            label="Name"
                            name="name"
                            placeholder="Enter customer name"
                            register={register}
                            error={errors.name}
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <TextInput 
                            label="Phone"
                            name="phone"
                            placeholder="Enter phone number"
                            register={register}
                            error={errors.phone}
                        />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <TextInput 
                            label="address"
                            name="address"
                            placeholder="Enter delivery address"
                            register={register}
                            error={errors.address}
                        />
                    </div>
                </div>

                {/* Product Information */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-xl text-muted-foreground">Product Details</h3>

                    {/* Product Selection with Search */}
                    <Controller
                        name="product_id"
                        control={control}
                        render={({ field }) => (
                            <SearchSelect
                            label="Product"
                            required
                            placeholder="Select a product"
                            options={productOptions}
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                            }}
                            onSearchChange={(searchValue) => {
                                setProductSearch(searchValue);
                            }}
                            error={errors.product_id?.message}
                            searchPlaceholder="Search by product code or name..."
                            emptyMessage="No products found"
                            helperText="Search by product code or name"
                            isLoading={getProducts.isLoading}
                            />
                        )}
                    />

                    {/* Size and Color Row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Size */}
                        <Controller
                            name="size"
                            control={control}
                            render={({ field }) => (
                            <SelectInputField
                                label="Size"
                                required
                                placeholder="Select size"
                                options={SIZE_OPTIONS}
                                value={field.value}
                                onChangeAction={field.onChange}
                                error={errors.size?.message}
                            />
                            )}
                        />

                        {/* Color */}
                        <Controller
                            name="color"
                            control={control}
                            render={({ field }) => (
                            <SelectInputField
                                label="Color"
                                required
                                placeholder="Select color"
                                options={COLOR_OPTIONS}
                                value={field.value}
                                onChangeAction={field.onChange}
                                error={errors.color?.message}
                            />
                            )}
                        />
                    </div>

                    {/* Quantity */}
                    <div className="space-y-2">
                        <TextInput 
                            label="quantity"
                            name="quantity"
                            placeholder="Enter quantity"
                            register={register}
                            error={errors.quantity}
                        />
                    </div>
                </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDialogChange(false)}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                    {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                    </>
                    ) : (
                    "Create Order"
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}