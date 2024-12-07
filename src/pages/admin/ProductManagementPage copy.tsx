import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";

type typeProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const ProductManagementPage = () => {
  // search params
  const [searchParams, setSearchParams] = useSearchParams();

  // pagination
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  // hadle angka page yang di tulis langsung di URL jika tidak ada
  const [jumlahPage, setJumlahPage] = useState(1);

  // mencari product berdasarkan name
  const [productName, setProductName] = useState<string>("");

  // button pagination
  const handleNextPage = () => {
    searchParams.set("page", String(Number(searchParams.get("page")) + 1));

    setSearchParams(searchParams);
  };

  const handlePreviousPage = () => {
    searchParams.set("page", String(Number(searchParams.get("page")) - 1));

    setSearchParams(searchParams);
  };

  // fetch products
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get("page")),
          name: searchParams.get("search"),
        },
      });
      // console.log(response.data);

      setJumlahPage(response.data.page);
      setHasNextPage(Boolean(response.data.next));
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ketika tombol search di tekan
  const searchProduct = () => {
    if (productName) {
      searchParams.set("search", productName);

      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");

      setSearchParams(searchParams);
    }
  };

  // ketika search params berubah
  useEffect(() => {
    // hadle angka page yang di tulis langsung di URL jika tidak ada
    if (
      Number(searchParams.get("page")) < 1 ||
      Number(searchParams.get("page")) > jumlahPage /* total halaman */
    ) {
      searchParams.set("page", "1");

      setSearchParams(searchParams);
    } else if (searchParams.get("page")) {
      fetchProducts();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);

  // ketika halaman pertama kali dibuka
  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");

      setSearchParams(searchParams);
    }
  }, []);

  return (
    <AdminLayout
      title="Product Management"
      description="Managing our products"
      rightSection={
        <Link to="/admin/products/create">
          <Button>
            <IoAdd className="w-6 h-6" /> Add Product
          </Button>
        </Link>
      }
    >
      <div className="mb-8">
        <Label>Search Product</Label>
        <div className="flex space-x-2">
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-1/3"
            placeholder="Search..."
          />
          <Button onClick={searchProduct}>Search</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: typeProduct) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price.toLocaleString("id-ID")}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Link to={`/admin/products/edit/${product.id}`}>
                  <Button variant="ghost" size={"icon"}>
                    <Edit className="w-6 h-6" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={Number(searchParams.get("page")) == 1}
              onClick={handlePreviousPage}
              variant={"ghost"}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
          </PaginationItem>

          <PaginationItem className="mx-8 font-semibold">
            Page {searchParams.get("page")}
          </PaginationItem>

          <PaginationItem>
            <Button
              disabled={!hasNextPage}
              onClick={handleNextPage}
              variant={"ghost"}
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </AdminLayout>
  );
};

export default ProductManagementPage;
