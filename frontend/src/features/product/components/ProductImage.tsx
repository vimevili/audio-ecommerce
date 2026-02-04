interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="relative aspect-square max-w-120 mx-auto overflow-hidden rounded-2xl bg-neutral-100  lg:rounded-3xl">
      <img
        src={src}
        alt={alt}
        className="size-full object-cover object-center"
        loading="eager"
      />
    </div>
  );
}
