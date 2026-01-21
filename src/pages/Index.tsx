import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedSection from '@/components/home/FeaturedSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CategoriesSection />
      <FeaturedSection />
      
      {/* Brand Promise Section */}
      <section className="py-24 lg:py-32">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <p className="luxury-subheading">Our Promise</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-relaxed">
              "Each fragrance is a journey—a carefully composed symphony of the world's finest ingredients, 
              <span className="gold-gradient-text"> crafted for those who demand excellence</span>."
            </h2>
            <div className="luxury-divider" />
            <p className="text-muted-foreground italic">— The House of Maison Noir</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
