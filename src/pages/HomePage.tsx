import { axiosInstance } from "@/lib/axios";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// memberi type
import { RootState } from "../store/store";

const HomePage = () => {
  const [productss, setProducts] = useState([]);
  const [productIsLoading, setProductIsLoading] = useState(false);

  // RootState adalah tipe global untuk state Redux
  const userSelector = useSelector(
    (state: RootState) => state.user
  ); /* mengambil satu slice yaitu user */
  const counterSelector = useSelector((state: RootState) => state.counter);

  const products = productss.map((person: typePerson) => (
    <ProductCard
      key={person.id}
      id={person.id}
      name={person.name}
      price={person.price}
      stock={person.stock}
      imageUrl={person.imageUrl}
    />
  ));

  // fetch data products from api json-server -p 2000 db.json
  const fetchProducts = async () => {
    setProductIsLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      // console.log(response.data)
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setProductIsLoading(false);
    }
  };

  // fetch products data once, when home page is first mounted
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Become a trend-setter with us {userSelector.email}
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            FastCampuCommerce provedes you with the finest clothings and ensures
            your confidence throughout your days. {counterSelector.count}
          </p>
        </div>

        {productIsLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">{products}</div>
        )}
      </main>
    </>
  );
};

export default HomePage;

// type ===========
type typePerson = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
};
