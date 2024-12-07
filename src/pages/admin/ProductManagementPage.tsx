import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";

// search berdasarkan nama
import { useForm } from "react-hook-form";
import { Form, FormItem, FormControl, FormField } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const ProductManagementPage = () => {
  // search params
  const [searchParams, setSearchParams] = useSearchParams();

  // pagination
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  // handle delete products
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  // -----
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleSearch = (values: SearchValues) => {
    // console.log(values);
    // alert(`Username: ${values.search}`);
    searchParams.set("search", values.search);

    setSearchParams(searchParams);
  };

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

      setHasNextPage(Boolean(response.data.next));
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // // delete 1 product
  // const handleDeleteProduct = async (productId: number) => {
  //   const shouldDelete = confirm("Are you sure you want to delete this?");

  //   if (!shouldDelete) return; /* jika tombol cancel ditekan */

  //   try {
  //     await axiosInstance.delete(`/products/${productId}`);
  //     alert("Product deleted successfully");
  //     fetchProducts(); /* jika terjadi perubahan pada db.json */
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // delete products
  const handleDeleteProduct = async () => {
    const shouldDelete = confirm(
      `Are you sure you want to delete ${selectedProductIds.length} product?`
    );

    if (!shouldDelete) return; /* jika tombol cancel ditekan */

    const deletePromises = selectedProductIds.map((productId) =>
      axiosInstance.delete(`/products/${productId}`)
    );

    try {
      await Promise.all(deletePromises);
      alert(`Product deleted ${selectedProductIds.length} successfully`);

      // fetchProducts(); /* jika terjadi perubahan pada db.json */

      // setelah menghapus product, refresh ke page awal/1
      searchParams.set("page", String(1));
      setSearchParams(searchParams);

      // reset angka pada tombol delete
      setSelectedProductIds([]);
    } catch (error) {
      console.log(error);
    }
  };

  // check will deletes
  const handleOnCheckedProduct = (
    productId: number,
    checked: boolean | string
  ) => {
    if (checked) {
      setSelectedProductIds([
        ...selectedProductIds,
        productId,
      ]); /* duplikat, masukkan, timpa */
    } else {
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    }
  };

  // ketika search params berubah
  useEffect(() => {
    if (searchParams.get("page")) {
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
        <div className="flex gap-2">
          {selectedProductIds.length ? (
            <Button variant="destructive" onClick={handleDeleteProduct}>
              <Trash className="w-6 h-6" />
              Delete {selectedProductIds.length} Product
            </Button>
          ) : null}

          <Link to="/admin/products/create">
            <Button>
              <IoAdd className="w-6 h-6" /> Add Product
            </Button>
          </Link>
        </div>
      }
    >
      <div className="mb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            className="max-w-md w-full flex gap-3"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
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
              <TableCell>
                <Checkbox
                  onCheckedChange={(checked) => {
                    handleOnCheckedProduct(product.id, checked);
                  }}
                  checked={selectedProductIds.includes(product.id)}
                />
              </TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price.toLocaleString("id-ID")}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {/* <div className="flex gap-4"> */}
                <Link to={`/admin/products/edit/${product.id}`}>
                  <Button variant="ghost" size={"icon"}>
                    <Edit className="w-6 h-6" />
                  </Button>
                </Link>

                {/* <Button
                    onClick={() => handleDeleteProduct(product.id)}
                    variant="destructive"
                    size={"icon"}
                  >
                    <Trash className="w-6 h-6"></Trash>
                  </Button> */}
                {/* </div> */}
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

// -------
type SearchValues = {
  search: string;
};

type typeProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
};
