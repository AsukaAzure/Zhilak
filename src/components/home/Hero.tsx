import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 md:w-80 h-48 md:h-80 bg-primary/3 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 luxury-container text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Subheading */}
          <p className="luxury-subheading animate-fade-up text-xs md:text-sm" style={{ animationDelay: '0.1s' }}>
            Premium Collection
          </p>

          {/* Main Heading */}
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-foreground">The Art of</span>
            <br />
            <span className="gold-gradient-text">Luxury</span>
          </h1>

          {/* Description */}
          <p
            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up px-4"
            style={{ animationDelay: '0.3s' }}
          >
            Discover our curated collection of exceptional products, each crafted with the finest materials from around the world.
          </p>

          {/* Divider */}
          <div
            className="luxury-divider animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          />

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-up px-4"
            style={{ animationDelay: '0.5s' }}
          >
            <Button
              asChild
              variant="luxury"
              size="luxuryLg"
              className="group w-full sm:w-auto"
            >
              <Link to="/category/perfumes">
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="luxuryOutline"
              size="luxuryLg"
              className="w-full sm:w-auto"
            >
              <Link to="/about">
                Our Story
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
