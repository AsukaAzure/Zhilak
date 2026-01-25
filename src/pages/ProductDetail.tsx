import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useDbProduct, useRelatedProducts } from '@/hooks/useDbProducts';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import DbProductCard from '@/components/products/DbProductCard';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useDbProduct(productId || '');
  const { data: relatedProducts = [] } = useRelatedProducts(productId || '', product?.category_id || null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return (
      <Layout>
        <div className="luxury-container py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="space-y-8">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-12 w-2/3" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="luxury-container py-32 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Button asChild variant="luxuryOutline" className="mt-8">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: product.image_url || '/placeholder.svg',
      category: product.category?.slug || 'uncategorized',
      inStock: product.in_stock,
      size: product.size || undefined,
      notes: product.fragrance_notes 
        ? [...(product.fragrance_notes.top || []), ...(product.fragrance_notes.middle || []), ...(product.fragrance_notes.base || [])].join(' | ')
        : undefined,
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handlePurchaseNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNotes = () => {
    if (!product.fragrance_notes) return null;
    const { top, middle, base } = product.fragrance_notes;
    const parts = [];
    if (top?.length) parts.push(`Top: ${top.join(', ')}`);
    if (middle?.length) parts.push(`Heart: ${middle.join(', ')}`);
    if (base?.length) parts.push(`Base: ${base.join(', ')}`);
    return parts.join(' • ');
  };

  return (
    <Layout>
      {/* Back Button */}
      <div className="luxury-container pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      {/* Product Section */}
      <section className="py-12 lg:py-20">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-secondary overflow-hidden">
                <img
                  src={product.image_url || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gallery thumbnails */}
              {product.gallery_urls && product.gallery_urls.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.gallery_urls.slice(0, 4).map((url, index) => (
                    <div key={index} className="aspect-square bg-secondary overflow-hidden">
                      <img
                        src={url}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              <div className="sticky top-28 space-y-8">
                {/* Category */}
                {product.category && (
                  <Link 
                    to={`/category/${product.category.slug}`}
                    className="luxury-subheading hover:text-primary transition-colors"
                  >
                    {product.category.name}
                  </Link>
                )}

                {/* Name & Price */}
                <div className="space-y-4">
                  <h1 className="font-serif text-4xl md:text-5xl text-foreground">
                    {product.name}
                  </h1>
                  <p className="text-3xl text-primary">{formatPrice(product.price)}</p>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                  {product.in_stock ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm text-muted-foreground">In Stock</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                      <span className="text-sm text-muted-foreground">Out of Stock</span>
                    </>
                  )}
                </div>

                <div className="luxury-divider !mx-0 !w-full" />

                {/* Description */}
                <div className="space-y-4">
                  {product.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  {/* Fragrance Notes */}
                  {formatNotes() && (
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-[0.15em] text-primary">
                        Fragrance Notes
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {formatNotes()}
                      </p>
                    </div>
                  )}

                  {/* Size */}
                  {product.size && (
                    <p className="text-sm text-muted-foreground">
                      Size: <span className="text-foreground">{product.size}</span>
                    </p>
                  )}
                </div>

                <div className="luxury-divider !mx-0 !w-full" />

                {/* Quantity & Actions */}
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-foreground min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="luxuryOutline"
                      size="luxuryLg"
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={!product.in_stock || added}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </Button>
                    <Button
                      variant="luxury"
                      size="luxuryLg"
                      className="flex-1"
                      onClick={handlePurchaseNow}
                      disabled={!product.in_stock}
                    >
                      Purchase Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 border-t border-border/50">
          <div className="luxury-container">
            <div className="text-center mb-12">
              <p className="luxury-subheading mb-4">You May Also Like</p>
              <h2 className="font-serif text-3xl text-foreground">
                Related <span className="gold-gradient-text">Products</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, index) => (
                <DbProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
