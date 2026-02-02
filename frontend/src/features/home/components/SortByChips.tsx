import { Route } from '@/routes/index';
import { ArrowUp, ArrowDown } from 'lucide-react';

const sortOptions = [
  { label: 'Popularity', value: 'RATING' },
  { label: 'Name', value: 'NAME' },
  { label: 'Price', value: 'PRICE' },
  { label: 'Reviews', value: 'REVIEWS' },
] as const;

export default function SortByChips() {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();

  const handleSort = (sortBy: 'NAME' | 'PRICE' | 'RATING' | 'REVIEWS') => {
    const isCurrentlySelected = searchParams.sortBy === sortBy;
    const newDir = isCurrentlySelected
      ? searchParams.sortDir === 'asc'
        ? 'desc'
        : 'asc'
      : 'desc';

    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        sortBy,
        sortDir: newDir,
      }),
      replace: true,
    });
  };

  const isSelected = (value: string) => searchParams.sortBy === value;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-gray-500">Sort By</span>
      {sortOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleSort(opt.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
            isSelected(opt.value)
              ? 'bg-audio-green text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {opt.label}
          {isSelected(opt.value) &&
            (searchParams.sortDir === 'asc' ? (
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={2.5} />
            ) : (
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={2.5} />
            ))}
        </button>
      ))}
    </div>
  );
}
