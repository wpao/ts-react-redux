import { ProductForm } from "@/components/forms/ProductForm";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const EditProductPage = () => {
  //
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    imageUrl: "",
  });

  //
  const params = useParams();

  const navigate = useNavigate();

  //
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.patch(
        `/products/${params.productId}`
      );
      // console.log(response.data);

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //
  const handleEditProduct = async (values: typeHandleEditProduct) => {
    try {
      await axiosInstance.put(`/products/${params.productId}`, {
        name: values.name,
        price: values.price,
        stock: values.stock,
        imageUrl: values.imageUrl,
      });
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  //
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <AdminLayout title="Edit Product" description="Edit Product">
      {product.id ? (
        <ProductForm
          cardTitle="Edit Product"
          defaultName={product.name}
          defaultPrice={product.price}
          defaultStock={product.stock}
          defaultImageUrl={product.imageUrl}
          onSubmit={handleEditProduct}
        />
      ) : (
        "Loading..."
      )}
    </AdminLayout>
  );
};

export default EditProductPage;

//
// -----
type typeHandleEditProduct = z.infer<typeof editProductFormSchema>;

const editProductFormSchema = z.object({
  name: z
    .string()
    .min(3, "Your product name is under 3 characters")
    .max(80, "Your product name is over 80 characters"),
  price: z.coerce.number().min(10000, "Price cannot be under Rp 10.000"),
  stock: z.coerce.number().min(1, "Stock cannot be under 1"),
  imageUrl: z.string().url("Invalid image url"),
});
