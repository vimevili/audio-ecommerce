import { LoadingOverlay } from '@/components';
import { useGetProducts } from '@/hooks/queries';
import { Route } from '@/routes/index';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

export default function HomePage() {
  const searchParams = Route.useSearch();

  const { data: products, isFetching } = useGetProducts({
    category: searchParams.category ?? 'HEADPHONES',
    search: searchParams.search,
    sortBy: searchParams.sortBy,
    sortDir: searchParams.sortDir,
  });

  const hasNoResults = !isFetching && products?.length === 0;
  const isSearching = !!searchParams.search;

  const sharedProps = {
    products,
    hasNoResults,
    isSearching,
    searchTerm: searchParams.search,
  };

  return (
    <>
      {isFetching && <LoadingOverlay />}
      <div className="md:hidden">
        <MobileLayout {...sharedProps} />
      </div>
      <div className="hidden md:block">
        <DesktopLayout {...sharedProps} />
      </div>
    </>
  );
}
