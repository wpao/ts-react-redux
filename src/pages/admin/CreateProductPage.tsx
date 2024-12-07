import { AdminLayout } from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/components/forms/ProductForm";

const createProductFormSchema = z.object({
  name: z
    .string()
    .min(3, "Your product name is under 3 characters")
    .max(80, "Your product name is over 80 characters"),
  price: z.coerce.number().min(10000, "Price cannot be under Rp 10.000"),
  stock: z.coerce.number().min(1, "Stock cannot be under 1"),
  imageUrl: z.string().url("Invalid image url"),
});

const CreateProductPage = () => {
  const navigate = useNavigate(); /* untuk ganti halaman / seperti link */

  type typeHandleCreateProduct = z.infer<typeof createProductFormSchema>;

  const handleCreateProduct = async (value: typeHandleCreateProduct) => {
    try {
      // await axiosInstance.post("/products", value);
      await axiosInstance.post("/products", {
        name: value.name,
        price: value.price,
        stock: value.stock,
        imageUrl: value.imageUrl,
      });

      // console.log(value);
      alert("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title="Create Product" description="Create a New Product">
      <ProductForm
        cardTitle="Add a New Product"
        onSubmit={handleCreateProduct}
      />
    </AdminLayout>
  );
};

export default CreateProductPage;
