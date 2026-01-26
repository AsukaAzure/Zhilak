import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import CategoriesSection from '@/components/home/CategoriesSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CategoriesSection />
      
      {/* Brand Promise Section */}
      <section className="py-16 lg:py-24">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="luxury-subheading">Our Promise</p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed">
              "Each product is a journey—a carefully composed experience of the world's finest craftsmanship, 
              <span className="gold-gradient-text"> crafted for those who demand excellence</span>."
            </h2>
            <div className="luxury-divider" />
            <p className="text-muted-foreground italic">— The House of Zhilak</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
