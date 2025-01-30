import { SignedInPage } from "@/components/guard/SignedInPage";

const CartPage = () => {
  return (
    <SignedInPage>
      <div className="flex h-full justify-center items-center text-5xl font-bold">
        <h1>Cart Page</h1>
      </div>
    </SignedInPage>
  );
};

export default CartPage;
