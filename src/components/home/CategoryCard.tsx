import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  index: number;
}

const CategoryCard = ({ id, name, description, image, index }: CategoryCardProps) => {
  return (
    <Link
      to={`/category/${id}`}
      className="group relative flex-1 overflow-hidden rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hover:flex-[2.5]"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover lg:grayscale lg:transition-all lg:duration-1000 lg:group-hover:grayscale-0 lg:group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/40 lg:bg-background/50 lg:group-hover:bg-transparent transition-colors duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 lg:opacity-80 lg:group-hover:opacity-60 transition-opacity duration-700" />
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col items-start gap-2 md:gap-4">
        <div className="overflow-hidden">
          <h3 className="font-serif text-2xl md:text-4xl text-foreground translate-y-0 lg:translate-y-20 lg:group-hover:translate-y-0 transition-transform duration-700 ease-out">
            {name}
          </h3>
        </div>

        <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 delay-100 max-w-xs">
          <p className="text-xs md:text-base text-muted-foreground/90 font-light leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
            {description}
          </p>
          <div className="flex items-center gap-2 text-primary font-serif">
            <span className="text-xs md:text-sm uppercase tracking-widest">Explore</span>
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>
      </div>

      {/* Number Indicator */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 text-xl md:text-2xl font-serif text-white/10 lg:group-hover:text-primary/20 transition-colors duration-700">
        {String(index + 1).padStart(2, '0')}
      </div>
    </Link>
  );
};

export default CategoryCard;
