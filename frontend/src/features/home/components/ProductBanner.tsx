import { ArrowRight } from 'lucide-react';
import type IProduct from '@/interfaces/IProduct';
import { Link } from '@tanstack/react-router';

interface IProps extends Partial<IProduct> {
  direction: string;
}

const ProductBanner: React.FC<IProps> = ({
  direction,
  name,
  picture,
  price,
}) => {
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer w-full h-full flex overflow-hidden p-4 ${
        isHorizontal ? 'flex-row items-center gap-1' : 'flex-col group gap-4'
      }`}
    >
      <div
        className={`flex flex-col justify-between h-full ${
          isHorizontal ? 'flex-[0_0_55%] items-start' : 'order-2 flex-1'
        }`}
      >
        <div className="flex flex-col gap-2">
          <h2
            className={`text-gray-900 font-bold leading-tight text-start ${
              isHorizontal
                ? 'text-lg md:text-xl'
                : 'text-sm font-normal line-clamp-2'
            }`}
          >
            {name}
          </h2>

          {!isHorizontal && (
            <span className="text-gray-900 text-sm font-bold text-start">
              USD {price}
            </span>
          )}
        </div>

        {isHorizontal && (
          <Link
            to={'/'}
            className="flex items-center text-[#0ACF83] text-sm font-bold gap-2 mt-auto"
          >
            Shop now
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div
        className={`relative overflow-hidden rounded-xl bg-gray-50 ${
          isHorizontal
            ? 'flex-1 h-full min-h-30'
            : 'w-full flex-1 min-h-35 order-1'
        }`}
      >
        <img
          src={picture}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default ProductBanner;
