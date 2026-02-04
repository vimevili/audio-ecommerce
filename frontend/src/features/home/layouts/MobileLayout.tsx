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

      <header className="flex flex-col responsive-padding-x">
        <h1 className="text-start">Hi, {userFirstName}</h1>
        <h2 className="audio-title text-black! text-2xl! text-start">
          What are you looking for today?
        </h2>
        <SearchBar />
      </header>

      <section className="rounded-t-3xl bg-[#F6F6F6] flex flex-col flex-1 p-6 pr-0 sm:p-12 sm:pr-0">
        <CategoryToggle />

        {hasNoResults ? (
          <div className="flex-1 pr-6">
            <NoResults isSearching={isSearching} searchTerm={searchTerm} />
          </div>
        ) : (
          <>
            <section className="h-44 sm:h-52">
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
                    className="flex-[0_0_65%] min-w-0 h-full sm:flex-[0_0_50%]"
                  >
                    <ProductBanner
                      direction="horizontal"
                      id={banner.id}
                      name={banner.name}
                      picture={banner.picture}
                    />
                  </div>
                ))}
                <CarouselSpacer />
              </Carousel>
            </section>

            <h3 className="text-start text-lg font-bold text-gray-900 p-6 pl-0">
              Featured Products
            </h3>

            <section className="h-64 sm:h-80">
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
                    className="flex-[0_0_40%] min-w-0 h-full sm:flex-[0_0_30%]"
                  >
                    <ProductBanner
                      direction="vertical"
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      picture={product.picture}
                    />
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
