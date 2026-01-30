import { SplashScreen } from '@/components';
import { useAuth } from '@/hooks';
import { useGetProductsByCategory } from '@/hooks/queries';
import { Route } from '@/routes/_protected/index';
import { Carousel, CategoryToggle, Navbar, SearchBar } from '../components';
import ProductBanner from '../components/ProductBanner';

const EmptyElement = () => (
  <div
    className="flex-[0_0_6px] min-w-1.5 h-full invisible"
    aria-hidden="true"
  />
);

function MobileLayout() {
  const { category } = Route.useSearch();

  const { data: productsByCategory, isFetching } = useGetProductsByCategory(
    (category as 'HEADPHONES' | 'HEADSETS') ?? 'HEADPHONES',
  );

  if (isFetching) return <SplashScreen />;

  return (
    <main className="rounded-t-3xl bg-[#F6F6F6] flex flex-col flex-1 p-6 pr-0">
      <CategoryToggle />
      <section className="flex-1 min-h-0">
        <Carousel
          options={{
            align: 'start',
            dragFree: true,
            containScroll: 'trimSnaps',
          }}
        >
          {productsByCategory?.slice(0, 5).map((banner) => (
            <div
              key={banner.id}
              className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_40%]"
            >
              <div className="h-full max-h-60 min-h-40">
                <ProductBanner
                  direction="horizontal"
                  id={banner.id}
                  name={banner.name}
                  picture={banner.picture}
                />
              </div>
            </div>
          ))}

          {/* Empty div for padding left at the end of carousel */}
          <EmptyElement />
        </Carousel>
      </section>

      <div className="flex justify-between items-center p-6 pl-0">
        <h3 className="text-lg font-medium text-gray-900">Featured Products</h3>
        <button className="text-sm text-gray-400">See All</button>
      </div>

      <section className="flex-1 min-h-0">
        <Carousel
          options={{
            align: 'start',
            dragFree: true,
            containScroll: 'trimSnaps',
          }}
        >
          {productsByCategory?.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_40%] min-w-0 sm:flex-[0_0_30%] md:flex-[0_0_30%]"
            >
              <div className="h-full max-h-60 min-h-40">
                <ProductBanner
                  direction="vertical"
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  picture={product.picture}
                />
              </div>
            </div>
          ))}
          {/* Empty div for padding left at the end of carousel */}
          <EmptyElement />
        </Carousel>
      </section>
    </main>
  );
}

function DesktopLayout() {
  return (
    <main className="min-h-screen bg-[#F6F6F6] pb-12 w-full max-w-7xl mx-auto md:my-8 md:rounded-[30px] shadow-xl overflow-hidden"></main>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  const userFistName = user?.name.split(' ')[0];

  return (
    <main className="min-h-screen w-full flex flex-col gap-6 ">
      <Navbar />
      <header className="flex flex-col px-6">
        <h1 className="text-start">Hi, {userFistName}</h1>
        <h2 className="audio-title text-black! text-2xl! text-start">
          What are you looking for today?
        </h2>
        <SearchBar layout="mobile" />
      </header>
      <div className="flex flex-col flex-1 md:hidden">
        <MobileLayout />
      </div>
      <div className="hidden md:block">
        <DesktopLayout />
      </div>
    </main>
  );
}
