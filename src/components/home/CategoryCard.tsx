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
      className="group relative aspect-[3/4] overflow-hidden luxury-card animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      {/* Image */}
      <div className="absolute inset-0 bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:opacity-80 group-hover:scale-105"
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
        <div className="space-y-1 md:space-y-2">
          <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className="mt-3 md:mt-4 flex items-center text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <span className="text-xs uppercase tracking-[0.15em]">Explore</span>
          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 ml-1.5" />
        </div>
      </div>
      
      {/* Border accent */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
    </Link>
  );
};

export default CategoryCard;
