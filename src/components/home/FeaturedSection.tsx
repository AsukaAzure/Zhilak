import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const FeaturedSection = () => {
  const featuredProducts = products.filter(p => p.category === 'luxury-perfumes').slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-card/50">
      <div className="luxury-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="luxury-subheading mb-4">Featured</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Signature <span className="gold-gradient-text">Creations</span>
          </h2>
          <div className="luxury-divider" />
        </div>

        {/* Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">{product.notes?.split('|')[0]}</p>
                <p className="text-lg text-primary font-medium">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button asChild variant="luxuryOutline" size="luxuryLg">
            <Link to="/category/luxury-perfumes">View All Luxury Perfumes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
