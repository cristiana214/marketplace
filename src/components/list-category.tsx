import { categories } from "@/lib/data/farm";
import { generateUrl } from "@/lib/helper/generate-url";
import Link from "next/link";

const ListCategory = () => (
  <div className="mx-auto mt-6 max-w-md rounded-sm bg-gray-100 p-6 shadow-md dark:bg-gray-800">
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
      Farm Categories
    </h2>
    <ul className="space-y-2">
      {categories.map((category, index) => (
        <li
          key={index}
          className="cursor-pointer rounded-md bg-white p-2 shadow transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white dark:bg-gray-700 dark:hover:bg-slate-400 dark:hover:text-white"
        >
          <Link href={`/category/${generateUrl(category.url)}`}>
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default ListCategory;
