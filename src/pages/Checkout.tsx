import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Check, Tag, X, Ticket } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useCreateOrder } from '@/hooks/useOrders';
import { useValidateCoupon, useRecordCouponUsage, useCoupons } from '@/hooks/useCoupons';
import { toast } from 'sonner';

interface AppliedCoupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const createOrder = useCreateOrder();
  const validateCoupon = useValidateCoupon();
  const recordCouponUsage = useRecordCouponUsage();
  const { data: availableCoupons } = useCoupons();

  const [step, setStep] = useState<'cart' | 'details' | 'confirmation'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApplyCoupon = async (code?: string) => {
    const couponToApply = code || couponCode.trim();
    if (!couponToApply) {
      toast.error('Please enter a coupon code');
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const coupon = await validateCoupon.mutateAsync(couponToApply.toUpperCase());
      setAppliedCoupon({
        id: coupon.id,
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
      });
      setCouponCode('');
      toast.success(`Coupon "${coupon.code}" applied!`);
    } catch (error: unknown) {
      let message = 'Invalid coupon code';
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed');
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discount_type === 'percentage') {
      return Math.round((total * appliedCoupon.discount_value) / 100 * 100) / 100;
    }
    return Math.min(appliedCoupon.discount_value, total);
  };

  const discount = calculateDiscount();
  const finalTotal = Math.max(0, total - discount);

  const handleProceed = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setStep('details');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!user) {
      toast.error('Please sign in to place an order');
      navigate('/auth');
      return;
    }

    try {
      const orderPayload = {
        order: {
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          shipping_address: formData.address,
          subtotal: total,
          discount: discount,
          total: finalTotal,
          coupon_id: appliedCoupon?.id || null,
          status: 'pending' as const,
        },
        items: items.map(item => {
          // Handle composite IDs for clothing items (e.g. "uuid-Size")
          // We need to send the original UUID to the database
          let productId = item.product.id;
          let productName = item.product.name;

          if (item.product.size) {
            // Append size to name for the order record since order_items doesn't have a size column
            productName = `${item.product.name} (${item.product.size})`;

            // If the ID ends with the size suffix (added in ProductDetail.tsx), strip it to get real UUID
            if (productId.endsWith(`-${item.product.size}`)) {
              productId = productId.slice(0, -(item.product.size.length + 1));
            }
          }

          return {
            product_id: productId,
            product_name: productName,
            product_price: item.product.price,
            quantity: item.quantity,
          };
        }),
      };

      const order = await createOrder.mutateAsync(orderPayload);
      setOrderId(order.id);

      // Record coupon usage if a coupon was applied
      if (appliedCoupon) {
        await recordCouponUsage.mutateAsync({
          couponId: appliedCoupon.id,
          orderId: order.id,
        });
      }

      setStep('confirmation');
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error: unknown) {
      let message = 'Failed to place order';
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (step === 'confirmation') {
    return (
      <Layout>
        <div className="luxury-container py-32">
          <div className="max-w-lg mx-auto text-center space-y-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="font-serif text-4xl text-foreground">
                Order <span className="gold-gradient-text">Confirmed</span>
              </h1>
              <p className="text-muted-foreground">
                Thank you for your order, {formData.fullName}. We've sent a confirmation email to {formData.email}.
              </p>
              {orderId && (
                <p className="text-sm text-muted-foreground">
                  Order ID: <span className="text-foreground font-mono">{orderId.slice(0, 8).toUpperCase()}</span>
                </p>
              )}
            </div>
            <div className="luxury-divider" />
            <p className="text-sm text-muted-foreground">
              Our team will process your order shortly. You will receive updates via email and phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="luxuryOutline" size="luxuryLg">
                <Link to="/my-orders">View My Orders</Link>
              </Button>
              <Button asChild variant="luxury" size="luxuryLg">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="luxury-container pt-8">
        <button
          onClick={() => step === 'details' ? setStep('cart') : navigate(-1)}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {step === 'details' ? 'Back to Cart' : 'Back'}
        </button>
      </div>

      <section className="py-12 lg:py-20">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              {step === 'cart' ? 'Your Cart' : 'Checkout'}
            </h1>
            <div className="luxury-divider" />
          </div>

          {step === 'cart' ? (
            <>
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-6">
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button asChild variant="luxuryOutline" size="luxuryLg">
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Cart Items */}
                  <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    {items.map(item => (
                      <div
                        key={item.product.id}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-card border border-border/50"
                      >
                        <div className="w-full sm:w-24 h-40 sm:h-32 bg-secondary shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-serif text-lg text-foreground">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.product.description}
                          </p>
                          <p className="text-primary">{formatPrice(item.product.price)}</p>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-3 py-1 text-muted-foreground hover:text-foreground"
                            >
                              -
                            </button>
                            <span className="px-3 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-3 py-1 text-muted-foreground hover:text-foreground"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-card border border-border/50 p-6 md:p-8 space-y-6">
                      <h3 className="font-serif text-xl text-foreground">
                        Order Summary
                      </h3>
                      <div className="space-y-4">
                        {items.map(item => (
                          <div key={item.product.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.product.name} × {item.quantity}
                            </span>
                            <span className="text-foreground">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Coupon Section */}
                      <div className="luxury-divider !mx-0 !w-full" />
                      <div className="space-y-3">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Coupon Code
                        </label>
                        {appliedCoupon ? (
                          <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded">
                            <div className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium text-primary">
                                {appliedCoupon.code}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ({appliedCoupon.discount_type === 'percentage'
                                  ? `${appliedCoupon.discount_value}% off`
                                  : `${formatPrice(appliedCoupon.discount_value)} off`})
                              </span>
                            </div>
                            <button
                              onClick={handleRemoveCoupon}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                              placeholder="Enter code"
                              className="luxury-input flex-1"
                            />
                            <Button
                              variant="luxuryOutline"
                              onClick={() => handleApplyCoupon()}
                              disabled={isApplyingCoupon}
                            >
                              {isApplyingCoupon ? '...' : 'Apply'}
                            </Button>
                          </div>
                        )}

                        {/* Available Coupons */}
                        {!appliedCoupon && availableCoupons && availableCoupons.length > 0 && (
                          <div className="space-y-2 pt-2">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Ticket className="w-3 h-3" />
                              Available Coupons
                            </p>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {availableCoupons.filter(c => c.is_active).map((coupon) => (
                                <button
                                  key={coupon.id}
                                  onClick={() => handleApplyCoupon(coupon.code)}
                                  disabled={isApplyingCoupon}
                                  className="w-full flex items-center justify-between p-2 text-left text-sm border border-dashed border-primary/30 rounded hover:bg-primary/5 transition-colors"
                                >
                                  <span className="font-medium text-primary">{coupon.code}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {coupon.discount_type === 'percentage'
                                      ? `${coupon.discount_value}% off`
                                      : `${formatPrice(coupon.discount_value)} off`}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="luxury-divider !mx-0 !w-full" />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">{formatPrice(total)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-primary">
                          <span>Discount</span>
                          <span>-{formatPrice(discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-foreground">Complimentary</span>
                      </div>
                      <div className="luxury-divider !mx-0 !w-full" />
                      <div className="flex justify-between text-lg">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary font-medium">{formatPrice(finalTotal)}</span>
                      </div>
                      <Button
                        variant="luxury"
                        size="luxuryLg"
                        className="w-full"
                        onClick={handleProceed}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmitOrder} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="font-serif text-xl text-foreground">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-muted-foreground">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="luxury-input"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-muted-foreground">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="luxury-input"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="luxury-input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-6">
                  <h3 className="font-serif text-xl text-foreground">
                    Shipping Address
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-muted-foreground">
                      Full Address
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="luxury-input min-h-[100px]"
                      placeholder="House/Flat No., Street, City, State, PIN Code"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6 p-6 bg-card border border-border/50">
                  <h3 className="font-serif text-xl text-foreground">
                    Order Summary
                  </h3>
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="luxury-divider !mx-0 !w-full" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(total)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Complimentary</span>
                  </div>
                  <div className="luxury-divider !mx-0 !w-full" />
                  <div className="flex justify-between text-lg">
                    <span className="text-foreground font-medium">Total</span>
                    <span className="text-primary font-medium">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="luxury"
                  size="luxuryLg"
                  className="w-full"
                  disabled={createOrder.isPending}
                >
                  {createOrder.isPending ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
