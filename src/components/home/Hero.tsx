import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-20">
      <div className="luxury-container">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 backdrop-blur-sm min-h-[75vh] md:min-h-[85vh] flex items-center justify-center">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 py-12 md:px-12">
            <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 md:space-y-6"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="w-10 h-px bg-primary/40" />
                  <span className="luxury-subheading">Est. 2025</span>
                  <span className="w-10 h-px bg-primary/40" />
                </div>

                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-tight">
                  <span className="text-foreground/90">Curating</span>
                  <br />
                  <span className="gold-gradient-text italic">Essence</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground/80 max-w-xl mx-auto font-light leading-relaxed">
                  Discover a sanctuary of scent where tradition meets contemporary luxury.
                  Each bottle tells a story of identity and memory.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-5"
              >
                <Button
                  asChild
                  variant="luxury"
                  size="luxuryLg"
                  className="group min-w-[200px]"
                >
                  <a href="#collections">
                    View Collections
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="luxuryOutline"
                  size="luxuryLg"
                  className="min-w-[200px] border-primary/20 hover:border-primary/40"
                >
                  <Link to="/about">
                    About Zhilak
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
