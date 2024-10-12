import { useProducts } from "@/hooks/query/useProducts";
import { categories } from "@/lib/data/farm";
import { generateUrl } from "@/lib/helper/generate-url";
import Link from "next/link";

type ListProductsProps = {
  url: string;
};
const ListProducts = ({ url }: ListProductsProps) => {
  const category = categories.find((cat) => cat.url === url);
  const { data, isLoading, error } = useProducts({
    categoryUrl: category?.url,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="mx-auto mt-6 max-w-md rounded-sm bg-gray-100 p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        {category?.name} Products
      </h2>
      <ul className="space-y-2">
        {data?.products?.map((product, index) => (
          <li
            key={index}
            className="cursor-pointer rounded-md bg-green-200 p-2 shadow transition duration-200 ease-in-out hover:bg-green-500 hover:text-white dark:bg-gray-700 dark:hover:bg-slate-400 dark:hover:text-white"
          >
            <Link href={`/product/${generateUrl(product.url)}/`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListProducts;
