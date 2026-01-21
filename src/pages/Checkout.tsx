import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'details' | 'confirmation'>('cart');
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

  const handleProceed = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setStep('details');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    // Here you would normally submit to backend
    setStep('confirmation');
    clearCart();
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
            </div>
            <div className="luxury-divider" />
            <p className="text-sm text-muted-foreground">
              Our team will process your order shortly. You will receive updates via email and phone.
            </p>
            <Button asChild variant="luxury" size="luxuryLg">
              <Link to="/">Continue Shopping</Link>
            </Button>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Cart Items */}
                  <div className="lg:col-span-2 space-y-6">
                    {items.map(item => (
                      <div
                        key={item.product.id}
                        className="flex gap-6 p-6 bg-card border border-border/50"
                      >
                        <div className="w-24 h-32 bg-secondary shrink-0">
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
                          <p className="text-sm text-muted-foreground">
                            {item.product.description}
                          </p>
                          <p className="text-primary">${item.product.price}</p>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-card border border-border/50 p-8 space-y-6">
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
                              ${item.product.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="luxury-divider !mx-0 !w-full" />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">${total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-foreground">Complimentary</span>
                      </div>
                      <div className="luxury-divider !mx-0 !w-full" />
                      <div className="flex justify-between text-lg">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary font-medium">${total}</span>
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
                        placeholder="+1 234 567 8900"
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
                      className="luxury-input min-h-[120px]"
                      placeholder="Street address, city, state, postal code, country"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-card border border-border/50 p-6 space-y-4">
                  <h3 className="font-serif text-lg text-foreground">
                    Order Summary
                  </h3>
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-foreground">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                  <div className="luxury-divider !mx-0 !w-full" />
                  <div className="flex justify-between text-lg">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary font-medium">${total}</span>
                  </div>
                </div>

                <Button type="submit" variant="luxury" size="luxuryLg" className="w-full">
                  Place Order
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
