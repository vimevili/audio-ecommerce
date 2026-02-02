import { Route } from '@/routes/index';
import { useNavigate } from '@tanstack/react-router';

type Category = 'HEADPHONES' | 'HEADSETS';

const categories: { label: string; value: Category }[] = [
  { label: 'Headphones', value: 'HEADPHONES' },
  { label: 'Headsets', value: 'HEADSETS' },
];

const CategoryToggle: React.FC = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();

  const handleCategoryClick = (category: Category) => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        category,
      }),
      replace: true,
    });
  };

  const isActive = (value: Category) =>
    searchParams.category === value ||
    (!searchParams.category && value === categories[0].value);

  return (
    <div className="flex gap-8 pb-6 pr-6">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => handleCategoryClick(category.value)}
          className={`
            relative text-base font-medium transition-all duration-300 pb-2
            ${
              isActive(category.value)
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }
          `}
        >
          {category.label}
          {isActive(category.value) && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-audio-green rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryToggle;
