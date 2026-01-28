import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import CategoriesSection from '@/components/home/CategoriesSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CategoriesSection />

      {/* Brand Promise Section */}
      <section className="py-16 lg:py-24 ">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="luxury-subheading">Our Promise</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground/90">
              <span className="italic text-6xl md:text-7xl pr-3 font-medium gold-gradient-text">Zhilak</span>
              <span className="font-light text-2xl md:text-3xl align-middle">more than a </span>
              <span className="italic font-medium pl-2 gold-gradient-text">scent.</span>
              <span className="block mt-4 md:mt-6">
                A signature of <span className="italic font-light text-2xl md:text-3xl px-1 font-serif gold-gradient-text">your</span> identity — a <span className="italic gold-gradient-text">gateway</span> to
                <br className="hidden md:block" />
                your finest <span className="italic text-4xl md:text-5xl gold-gradient-text">memories.</span>
              </span>
            </h2>
            <div className="luxury-divider opacity-50" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
