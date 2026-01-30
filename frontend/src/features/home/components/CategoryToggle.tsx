import { Button } from '@/components';
import { Route } from '@/routes/_protected/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
  category: z.string().min(1, 'Category is too short!'),
});

const CategoryToggle: React.FC = () => {
  const categories = ['Headphones', 'Headsets'];
  type CategorySchema = z.infer<typeof schema>;

  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();

  const { handleSubmit, setValue } = useForm<CategorySchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: searchParams.category || categories[0],
    },
  });

  const handleCategoryClick = (category: string) => {
    setValue('category', category);
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: CategorySchema) => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        category: data.category || undefined,
      }),
      replace: true,
    });
  };

  return (
    <div className="flex gap-1 pb-6 pr-6  mx-auto">
      {categories.map((category) => (
        <Button
          text={category}
          key={category}
          onClick={() => handleCategoryClick(category)}
          styles={`
            px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 w-fit
            ${
              searchParams.category === category ||
              (!searchParams.category && category === categories[0])
                ? 'bg-[#0ACF83] text-white shadow-md shadow-green-200'
                : 'bg-transparent text-gray-400 hover:text-gray-600'
            }
          `}
        />
      ))}
    </div>
  );
};

export default CategoryToggle;
