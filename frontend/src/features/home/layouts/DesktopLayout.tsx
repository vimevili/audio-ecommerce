import { useAuth } from '@/hooks';
import type IProduct from '@/interfaces/IProduct';
import { Route } from '@/routes/index';
import {
  CategoryToggle,
  FeaturedCard,
  Navbar,
  NoResults,
  ProductCard,
  SortByChips,
} from '../components';

interface DesktopLayoutProps {
  products: IProduct[] | undefined;
  hasNoResults: boolean;
  isSearching: boolean;
  searchTerm?: string;
}

const cardsInfo = [
  {
    title: 'All our products',
    image:
      'https://dhmkgmydsowxreowtfmu.supabase.co/storage/v1/object/sign/assets/card-1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWZmYzgyMy04NDUwLTQxZDQtOWYzMC1lY2EzMTNkOGZlZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvY2FyZC0xLnBuZyIsImlhdCI6MTc3MDAzNzUwOCwiZXhwIjoyMDg1Mzk3NTA4fQ.8mg8oiPU919HyyWx7z2m_9rwbOCrQf1UqNl3G5daF8I',
  },
  {
    title: 'To all people',
    image:
      'https://dhmkgmydsowxreowtfmu.supabase.co/storage/v1/object/sign/assets/card-2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWZmYzgyMy04NDUwLTQxZDQtOWYzMC1lY2EzMTNkOGZlZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvY2FyZC0yLnBuZyIsImlhdCI6MTc3MDAzNzUyMiwiZXhwIjoyMDg1Mzk3NTIyfQ.x_QaFa5-hzWs7GT5vpgXu4mq_uIgScrY8_U5jZo5DRs',
  },
  {
    title: 'In all sizes',
    image:
      'https://dhmkgmydsowxreowtfmu.supabase.co/storage/v1/object/sign/assets/card-3.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWZmYzgyMy04NDUwLTQxZDQtOWYzMC1lY2EzMTNkOGZlZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvY2FyZC0zLnBuZyIsImlhdCI6MTc3MDAzNzUzMiwiZXhwIjoyMDg1Mzk3NTMyfQ.YqLzRl30KAHeuna_Gmr77NvoRhu_ZzxIe9CN6f-hqrM',
  },
];

export default function DesktopLayout({
  products,
  hasNoResults,
  isSearching,
  searchTerm,
}: DesktopLayoutProps) {
  const { user } = useAuth();
  const userFirstName = user?.name.split(' ')[0];
  const searchParams = Route.useSearch();
  const currentCategory = searchParams.category ?? 'HEADPHONES';

  return (
    <main className="h-screen w-full bg-[#F6F6F6] flex flex-col overflow-hidden">
      <Navbar layout="desktop" />

      <div className="flex-1 max-w-375 items-start w-full mx-auto px-6 py-8 flex flex-col overflow-hidden">
        <header className="shrink-0 mb-6">
          <p className="text-gray-500 text-start text-lg!">
            Hi, {userFirstName ?? 'Guest'}
          </p>
          <h1 className="audio-title text-black! text-3xl!">
            What are you looking for today?
          </h1>
        </header>

        <div className="flex-1 grid grid-cols-3 gap-8 min-h-0">
          <section className="col-span-2 flex flex-col min-h-0">
            <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm overflow-hidden">
              <div className="shrink-0 flex items-center justify-between px-6 pt-6 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {currentCategory.toLowerCase()}
                </h2>
                <CategoryToggle />
              </div>

              <div className="shrink-0 px-6 pb-4">
                <SortByChips />
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-6">
                {hasNoResults ? (
                  <div className="h-full flex items-center justify-center">
                    <NoResults
                      isSearching={isSearching}
                      searchTerm={searchTerm}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {products?.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="flex flex-col gap-4 min-h-0">
            {cardsInfo.map((card, index) => (
              <FeaturedCard key={index} image={card.image} title={card.title} />
            ))}
          </aside>
        </div>
      </div>
    </main>
  );
}
