import { useAuth } from '@/hooks';
import type IProduct from '@/interfaces/IProduct';
import {
  Carousel,
  CategoryToggle,
  Navbar,
  NoResults,
  ProductBanner,
  SearchBar,
} from '../components';

interface MobileLayoutProps {
  products: IProduct[] | undefined;
  hasNoResults: boolean;
  isSearching: boolean;
  searchTerm?: string;
}

const CarouselSpacer = () => (
  <div className="flex-[0_0_6px] min-w-1.5 h-full" aria-hidden="true" />
);

export default function MobileLayout({
  products,
  hasNoResults,
  isSearching,
  searchTerm,
}: MobileLayoutProps) {
  const { user } = useAuth();
  const userFirstName = user?.name.split(' ')[0];

  return (
    <main className="min-h-screen w-full flex flex-col gap-6">
      <Navbar layout="mobile" />

      <header className="flex flex-col px-6 sm:px-12">
        <h1 className="text-start">Hi, {userFirstName}</h1>
        <h2 className="audio-title text-black! text-2xl! text-start">
          What are you looking for today?
        </h2>
        <SearchBar />
      </header>

      <section className="rounded-t-3xl bg-[#F6F6F6] flex flex-col flex-1 p-6 pr-0 sm:px-12 sm:py-6">
        <CategoryToggle />

        {hasNoResults ? (
          <div className="flex-1 pr-6">
            <NoResults isSearching={isSearching} searchTerm={searchTerm} />
          </div>
        ) : (
          <>
            <section className="flex-1 min-h-0">
              <Carousel
                options={{
                  align: 'start',
                  dragFree: true,
                  containScroll: 'trimSnaps',
                }}
              >
                {products?.slice(0, 5).map((banner) => (
                  <div
                    key={banner.id}
                    className="flex-[0_0_65%] min-w-0 sm:flex-[0_0_50%]"
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
                <CarouselSpacer />
              </Carousel>
            </section>

            <div className="flex justify-between items-center p-6 pl-0">
              <h3 className="text-lg font-medium text-gray-900">
                Featured Products
              </h3>
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
                {products?.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex-[0_0_30%] min-w-0 sm:flex-[0_0_25%]"
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
                <CarouselSpacer />
              </Carousel>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
