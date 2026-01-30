import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import type { ReactNode } from 'react';

type PropType = {
  options?: EmblaOptionsType;
  children: ReactNode;
};

export const Carousel = (props: PropType) => {
  const { options, children } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="overflow-hidden w-full h-full" ref={emblaRef}>
      <div className="flex gap-4 touch-pan-y h-full">{children}</div>
    </div>
  );
};

export default Carousel;
