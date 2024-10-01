import { blogPosts } from "@/lib/data/farm";
import { Button } from "./ui/button";

const FarmUpdates = () => (
  <ul className="space-y-4">
    {blogPosts.map((post) => (
      <li key={post.id} className="border-b pb-4 last:border-b-0">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="mb-2 text-sm text-gray-600">{post.date}</p>
        <p>{post.excerpt}</p>
        <Button variant="link" className="h-auto p-0">
          Read more
        </Button>
      </li>
    ))}
  </ul>
);
export default FarmUpdates;
