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
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="space-y-3">
          <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className="mt-6 flex items-center text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <span className="text-sm uppercase tracking-[0.15em]">Explore</span>
          <ArrowUpRight className="w-4 h-4 ml-2" />
        </div>
      </div>
      
      {/* Border accent */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
    </Link>
  );
};

export default CategoryCard;
