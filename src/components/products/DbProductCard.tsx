import { Link } from 'react-router-dom';
import { DbProduct } from '@/hooks/useDbProducts';

interface DbProductCardProps {
  product: DbProduct;
  index?: number;
}

const DbProductCard = ({ product, index = 0 }: DbProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNotes = () => {
    if (!product.fragrance_notes) return null;
    const notes = product.fragrance_notes;
    const allNotes = [
      ...(notes.top || []),
      ...(notes.middle || []),
      ...(notes.base || []),
    ].slice(0, 3);
    return allNotes.join(', ');
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group animate-fade-up"
      style={{ animationDelay: `${0.05 + index * 0.05}s` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-3 luxury-card">
        <img
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Out of stock overlay */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Featured badge */}
        {product.featured && product.in_stock && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-primary px-2 py-0.5 md:px-3 md:py-1">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-primary-foreground">
              Featured
            </span>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
          <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-primary">
            View Details
          </span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-serif text-sm md:text-base lg:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        {formatNotes() && (
          <p className="text-[10px] md:text-xs text-muted-foreground italic line-clamp-1">
            {formatNotes()}
          </p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-sm md:text-base lg:text-lg text-primary font-medium">{formatPrice(product.price)}</p>
          {product.size && (
            <span className="text-[10px] md:text-xs text-muted-foreground">{product.size}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DbProductCard;
