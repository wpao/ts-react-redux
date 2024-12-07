import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const params = useParams();

  // const [quantity, setQuantity] = useState<number>(0);
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    imageUrl: "",
  });

  const [productIsLoading, setProductIsLoading] = useState<boolean>(true);

  const fetchProduct = async () => {
    try {
      setProductIsLoading(true);
      const response = await axiosInstance.get(`/products/${params.productId}`);
      // console.log(response.data);

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setProductIsLoading(false);
    }
  };

  // fetch detailproduct
  useEffect(() => {
    fetchProduct();
  }, [params.productId]);

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
      <div className="grid grid-cols-2 gap-8">
        {productIsLoading ? (
          <Skeleton className="aspect-square w-full" />
        ) : (
          <img src={product.imageUrl} alt={product.name} className="w-full" />
        )}

        <div className="flex flex-col gap-1 justify-center">
          <h1 className="text-xl">{product.name}</h1>
          <h3 className="text-3xl font-bold">
            Rp {product.price.toLocaleString("id-ID")}
          </h3>

          <p className="text-sm text-muted-foreground mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim alias,
            labore ducimus illum natus quos!
          </p>

          <div className="flex items-center gap-3 mt-6">
            <Button
              // onClick={handleRemoveFromCart}
              // disabled={quantity == 0}
              variant="ghost"
              size="icon"
            >
              <IoIosRemove className="w-6 h-6" />
            </Button>

            <p className="text-lg font-bold">0</p>

            <Button
              // onClick={handleAddToCart}
              // disabled={quantity >= stock}
              variant="ghost"
              size="icon"
            >
              <IoIosAdd className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <Button className="w-full" size="lg">
              Add to cart
            </Button>
            <Button variant="ghost" size="icon">
              <IoHeartOutline className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
