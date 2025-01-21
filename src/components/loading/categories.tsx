const CategoriesSkeleton = () => (
  <div className="mb-8">
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-10 w-24 animate-pulse rounded bg-gray-300"
        />
      ))}
    </div>
  </div>
);
export default CategoriesSkeleton;
