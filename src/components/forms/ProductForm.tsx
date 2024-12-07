import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const ProductForm = (props: ProductFormProps) => {
  const {
    cardTitle,
    onSubmit,
    defaultName,
    defaultPrice,
    defaultStock,
    defaultImageUrl,
  } = props;
  //
  const form = useForm({
    defaultValues: {
      name: defaultName || "",
      price: defaultPrice || 0,
      stock: defaultStock || 0,
      imageUrl: defaultImageUrl || "",
    },
    resolver: zodResolver(productFormSchema),
  });

  //
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">{cardTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Product Name must be between 3 and 80 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* name */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Price" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* name */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Stock" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* name */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product imageUrl</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Product imageUrl" />
                  </FormControl>
                  <FormDescription>
                    Product use a valid image url
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

//============
const productFormSchema = z.object({
  name: z
    .string()
    .min(3, "Your product name is under 3 characters")
    .max(80, "Your product name is over 80 characters"),
  price: z.coerce.number().min(10000, "Price cannot be under Rp 10.000"),
  stock: z.coerce.number().min(1, "Stock cannot be under 1"),
  imageUrl: z.string().url("Invalid image url"),
});

//----------------
type ProductFormProps = {
  cardTitle: string;
  defaultName?: string;
  defaultPrice?: number;
  defaultStock?: number;
  defaultImageUrl?: string;
  onSubmit: (productData: {
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
  }) => void;
};
