import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DbProductCard from '@/components/products/DbProductCard';
import EmptyCategory from '@/components/products/EmptyCategory';
import { useDbProductsByCategory } from '@/hooks/useDbProducts';
import { Skeleton } from '@/components/ui/skeleton';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data, isLoading } = useDbProductsByCategory(categoryId || '');

  const products = data?.products || [];
  const category = data?.category;

  return (
    <Layout>
      {/* Header */}
      <section className="pt-12 pb-8 lg:pt-20 lg:pb-12">
        <div className="luxury-container">
          <div className="text-center max-w-2xl mx-auto">
            <p className="luxury-subheading mb-3">Collection</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              <span className="gold-gradient-text">
                {category?.name || categoryId?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Products'}
              </span>
            </h1>
            {category && category.description && (
              <p className="text-muted-foreground text-sm md:text-base">
                {category.description}
              </p>
            )}
            <div className="luxury-divider mt-6" />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="luxury-container">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, index) => (
                <DbProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <EmptyCategory categoryName={category?.name || 'This category'} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Category;
