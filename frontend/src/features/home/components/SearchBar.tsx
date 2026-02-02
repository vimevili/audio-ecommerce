import { TextInput } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
  search: z.string(),
});

export default function SearchBar() {
  const navigate = useNavigate();
  const routerState = useRouterState();

  // Get current search params if we're on the home page
  const currentSearch =
    routerState.location.pathname === '/'
      ? (routerState.location.search as { search?: string })?.search
      : undefined;

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
      search: currentSearch || '',
    },
  });

  const searchValue = watch('search');

  const onSubmit = (data: SearchSchema) => {
    navigate({
      to: '/',
      search: {
        search: data.search || undefined,
      },
    });
  };

  const handleClear = () => {
    setValue('search', '');
    navigate({
      to: '/',
      search: {
        search: undefined,
      },
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
