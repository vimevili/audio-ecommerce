import { TextInput } from '@/components';
import { Route } from '@/routes/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
  search: z.string(),
});

export default function SearchBar() {
  const navigate = useNavigate({ from: Route.fullPath });

  const searchParams = Route.useSearch();

  type SearchSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      search: searchParams.search || '',
    },
  });

  const searchValue = watch('search');

  const onSubmit = (data: SearchSchema) => {
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        search: data.search || undefined,
      }),
      replace: true,
    });
  };

  const handleClear = () => {
    setValue('search', '');
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        search: undefined,
      }),
      replace: true,
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="search"
        error={errors.search}
        placeholder="Search a product"
        register={register}
        Icon={Search}
        onIconClick={handleSubmit(onSubmit)}
        rightElement={
          searchValue ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X size={18} className="text-gray-400 hover:text-gray-600" />
            </button>
          ) : null
        }
        styles="w-full border-1 border-gray-300 rounded-lg mt-3 md:mt-0 p-3 md:p-1.5"
      />
    </form>
  );
}
