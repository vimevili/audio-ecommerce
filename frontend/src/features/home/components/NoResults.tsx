interface NoResultsProps {
  isSearching: boolean;
  searchTerm?: string;
}

export default function NoResults({ isSearching, searchTerm }: NoResultsProps) {
  return (
    <div className="h-full w-screen flex flex-col items-center justify-center text-center gap-4">
      <div className="text-6xl">🔍</div>
      <h3 className="text-lg font-medium text-gray-900">
        {isSearching ? 'No results found' : 'No products available'}
      </h3>
      <p className="text-sm text-gray-500">
        {isSearching
          ? `We couldn't find any products matching "${searchTerm}"`
          : 'There are no products in this category yet'}
      </p>
    </div>
  );
}
