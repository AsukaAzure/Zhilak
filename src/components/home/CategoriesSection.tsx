import { useDbCategories } from '@/hooks/useDbProducts';
import CategoryCard from './CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';

// Import category images
import perfumesImg from '@/assets/category-perfumes.jpg';
import luxuryPerfumesImg from '@/assets/category-luxury-perfumes.jpg';
import clothingImg from '@/assets/category-clothing.jpg';
import accessoriesImg from '@/assets/category-accessories.jpg';

// Define the desired order for categories
const CATEGORY_ORDER = ['perfumes', 'luxury-perfumes', 'clothing', 'accessories'];

const CATEGORY_IMAGES = {
  'perfumes': perfumesImg,
  'luxury-perfumes': luxuryPerfumesImg,
  'clothing': clothingImg,
  'accessories': accessoriesImg,
};

const CategoriesSection = () => {
  const { data: categories = [], isLoading } = useDbCategories();

  // Sort categories based on predefined order
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a.slug);
      const indexB = CATEGORY_ORDER.indexOf(b.slug);
      // If not found in order, put at the end
      const orderA = indexA === -1 ? 999 : indexA;
      const orderB = indexB === -1 ? 999 : indexB;
      return orderA - orderB;
    });
  }, [categories]);

  return (
    <section id="collections" className="py-16 lg:py-24">
      <div className="luxury-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="luxury-subheading mb-3">Our Collections</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Curated for the <span className="gold-gradient-text">Connoisseur</span>
          </h2>
          <div className="luxury-divider" />
        </div>

        {/* Categories Flex Container */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 h-[800px] lg:h-[600px] w-full">
            {sortedCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                id={category.slug}
                name={category.name}
                description={category.description || ''}
                image={CATEGORY_IMAGES[category.slug as keyof typeof CATEGORY_IMAGES] || category.image_url || '/placeholder.svg'}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
