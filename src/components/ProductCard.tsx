import { useState } from "react";
import { Button } from "./ui/button";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

type typeProductCard = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
};

export const ProductCard = (props: typeProductCard) => {
  // distructure props
  const { name, price, imageUrl, stock, id } = props;

  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    if (stock > 0 && quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
        <Link
          to={`/products/${id}`}
          className="aspect-square w-full overflow-hidden"
        >
          <img className="w-full" src={imageUrl} alt="product" />
        </Link>

        <Link to={`/products/${id}`}>
          <p className="text-sm">{name}</p>
          <p className="text-xl font-semibold">
            Rp {price.toLocaleString("id-ID")}
          </p>
          <p className="text-muted-foreground text-sm">In stock: {stock}</p>
        </Link>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Button
              onClick={handleRemoveFromCart}
              disabled={quantity == 0}
              variant="ghost"
              size="icon"
            >
              <IoIosRemove />
            </Button>
            <p className="text-lg font-bold">{quantity}</p>
            <Button
              onClick={handleAddToCart}
              disabled={quantity >= stock}
              variant="ghost"
              size="icon"
            >
              <IoIosAdd />
            </Button>
          </div>

          <Button disabled={!stock || quantity === 0} className="w-full">
            {stock ? "Add to cart" : "Out of stock"}
          </Button>
        </div>
      </div>
    </>
  );
};
