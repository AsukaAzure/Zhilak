import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { getProductsByCategory, categories } from '@/data/products';

const categoryTitles: Record<string, string> = {
  'luxury-perfumes': 'Luxury Perfumes',
  'perfumes': 'Perfumes',
  'clothing': 'Clothing',
  'accessories': 'Accessories',
};

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const products = getProductsByCategory(categoryId || '');
  const category = categories.find(c => c.id === categoryId);

  return (
    <Layout>
      {/* Header */}
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="luxury-container">
          <div className="text-center max-w-2xl mx-auto">
            <p className="luxury-subheading mb-4">Collection</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              <span className="gold-gradient-text">{categoryTitles[categoryId || ''] || 'Products'}</span>
            </h1>
            {category && (
              <p className="text-muted-foreground text-lg">
                {category.description}
              </p>
            )}
            <div className="luxury-divider mt-8" />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="luxury-container">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Category;
