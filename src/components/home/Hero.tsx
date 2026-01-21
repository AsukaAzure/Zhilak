import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 luxury-container text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Subheading */}
          <p className="luxury-subheading animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Established 1924 • Paris
          </p>
          
          {/* Main Heading */}
          <h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-foreground">The Art of</span>
            <br />
            <span className="gold-gradient-text">Perfumery</span>
          </h1>
          
          {/* Description */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            Discover our curated collection of exceptional fragrances, each crafted with the finest ingredients from around the world.
          </p>
          
          {/* Divider */}
          <div 
            className="luxury-divider animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          />
          
          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            <Button
              asChild
              variant="luxury"
              size="luxuryLg"
              className="group"
            >
              <Link to="/category/luxury-perfumes">
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="luxuryOutline"
              size="luxuryLg"
            >
              <Link to="/about">
                Our Story
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
