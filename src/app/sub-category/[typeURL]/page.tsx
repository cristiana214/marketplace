// import { products } from "@/lib/data/farm";
import CartTotal from "@/components/cart-total";
import ListProducts from "@/components/list-products";
import ListCategories from "@/components/list-categories";
import DropdownCategory from "@/components/dropdown-category";
import ListCategoryTypes from "@/components/list-category-types";

export default function SubCategory({
  params,
}: {
  params: { typeURL: string };
}) {
  console.log(params.typeURL);
  // const filteredProducts = data?.products;
  // set products when component mounts
  // useEffect(() => {
  //   if (data?.products) setProducts(data?.products);
  // }, [data?.products, setProducts]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold" />
        <div className="flex items-center space-x-4">
          <DropdownCategory />
        </div>
      </div>
      <ListCategoryTypes url={params.typeURL} />
      {/* <ListCategories /> */}
      {/* todo pass type url */}
      <ListProducts type="categoryTypeUrl" url={params.typeURL} />
    </div>
  );
}
