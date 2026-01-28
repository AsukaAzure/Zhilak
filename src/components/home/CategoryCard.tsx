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
      className="group relative flex-1 overflow-hidden rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:flex-[2.5]"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start gap-4">
        <div className="overflow-hidden">
          <h3 className="font-serif text-3xl md:text-4xl text-foreground translate-y-20 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            {name}
          </h3>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 max-w-xs">
          <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex items-center gap-2 text-primary font-serif">
            <span className="text-sm uppercase tracking-widest">Explore</span>
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Number Indicator */}
      <div className="absolute top-8 right-8 text-2xl font-serif text-white/10 group-hover:text-primary/20 transition-colors duration-700">
        {String(index + 1).padStart(2, '0')}
      </div>
    </Link>
  );
};

export default CategoryCard;
