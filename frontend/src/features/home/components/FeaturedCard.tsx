interface FeaturedCardProps {
  image: string;
  title: string;
}

export default function FeaturedCard({ image, title }: FeaturedCardProps) {
  return (
    <div className="relative flex-1 rounded-3xl overflow-hidden cursor-pointer group min-h-0">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      <div className="relative z-10 h-full flex items-center justify-center p-6">
        <h3 className="font-bold text-2xl text-white text-center italic">
          {title}
        </h3>
      </div>
    </div>
  );
}
