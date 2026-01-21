import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { getProductById, getProductsByCategory } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import ProductCard from '@/components/products/ProductCard';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = getProductById(productId || '');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handlePurchaseNow = () => {
    handleAddToCart();
    navigate('/checkout');
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              <div className="sticky top-28 space-y-8">
                {/* Category */}
                <p className="luxury-subheading">
                  {product.category.replace('-', ' ')}
                </p>

                {/* Name & Price */}
                <div className="space-y-4">
                  <h1 className="font-serif text-4xl md:text-5xl text-foreground">
                    {product.name}
                  </h1>
                  <p className="text-3xl text-primary">${product.price}</p>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                {product.inStock ? (
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
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>

                  {/* Notes (for perfumes) */}
                  {product.notes && (
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-[0.15em] text-primary">
                        Fragrance Notes
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {product.notes}
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

                {/* Details */}
                {product.details && (
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.15em] text-primary">
                      Details
                    </p>
                    <ul className="space-y-2">
                      {product.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                      disabled={!product.inStock || added}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </Button>
                    <Button
                      variant="luxury"
                      size="luxuryLg"
                      className="flex-1"
                      onClick={handlePurchaseNow}
                      disabled={!product.inStock}
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
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
