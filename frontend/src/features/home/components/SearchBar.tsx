import { TextInput } from '@/components';
import { Route } from '@/routes/_protected/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
  search: z.string().min(1, 'Search is too short!'),
});

interface IProps {
  layout: 'mobile' | 'desktop';
}

export default function SearchBar({ layout }: IProps) {
  const isMobile = layout == 'mobile';
  const navigate = useNavigate({ from: Route.fullPath });

  const searchParams = Route.useSearch();

  type SearchSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      search: searchParams.search || '',
    },
  });

  const onSubmit = (data: SearchSchema) => {
    navigate({
      to: isMobile ? '.' : '.',
      search: (prev) => ({
        ...prev,
        search: data.search || undefined,
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
        styles="w-full border-1 border-gray-300 rounded-lg mt-3 p-3"
      />
    </form>
  );
}
