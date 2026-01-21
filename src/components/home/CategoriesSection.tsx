import { categories } from '@/data/products';
import CategoryCard from './CategoryCard';

const CategoriesSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="luxury-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="luxury-subheading mb-4">Our Collections</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Curated for the <span className="gold-gradient-text">Connoisseur</span>
          </h2>
          <div className="luxury-divider" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              image={category.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
