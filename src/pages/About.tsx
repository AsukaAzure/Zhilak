import { useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { MapPin, Phone, Mail, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import heroImg from '@/assets/hero.jpg';
import collectionImg from '@/assets/collection.png';
import presenceImg from '@/assets/presence.png';
import connectImg from '@/assets/connect.png';

const ScribbleUnderline = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 20" className={cn("absolute pointer-events-none text-primary", className)} fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5,15 Q50,5 100,10 T195,15" />
  </svg>
);

const sections = [
  {
    id: 1,
    title: "Origins",
    subtitle: "The Beginning",
    color: "#1a1a1a",
    content: (
      <>
        <p className="mb-6">
          Founded by a visionary individual during his BCA degree, <span className="text-foreground font-medium">Zhilak</span> was born from a simple yet profound idea: to create unique, high-quality fragrances that connect people.
        </p>
        <p className="hidden sm:block">
          It started with a single step—our first 10ml unisex perfume. What began as an experiment quickly captured hearts, gaining popularity for its exceptional scent profile and meticulous attention to detail.
        </p>
        <p className="block sm:hidden">It began with a 10ml unisex perfume—simple, thoughtful, and loved from the start.</p>
      </>
    ),
    image: heroImg
  },
  {
    id: 2,
    title: "Collection",
    subtitle: "Curated Scents",
    color: "#121212",
    content: (
      <>
        <p className="mb-6">
          Our collection creates a narrative. From unisex fragrances crafted to evoke deep emotions to our crowd-favorite <span className="text-primary italic">CR7</span> blend.
        </p>
        <p className="mb-8">
          Known for its bold, long-lasting aroma, our range is designed so that everyone finds a piece of themselves in our scents.
        </p>
        <div className="hidden md:grid grid-cols-2 gap-4">
          <div className="p-4 border border-white/10 rounded-sm">
            <h4 className="font-serif text-xl mb-1 text-primary">Unisex</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Universal Appeal</p>
          </div>
          <div className="p-4 border border-white/10 rounded-sm">
            <h4 className="font-serif text-xl mb-1 text-primary">Lasting</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">All Day Wear</p>
          </div>
        </div>
      </>
    ),
    image: collectionImg
  },
  {
    id: 3,
    title: "Presence",
    subtitle: "Growing Roots",
    color: "#0a0a0a",
    content: (
      <>
        <p className="mb-8">
          We are committed to spreading the art of perfumery. Our footprint is expanding across the region, bringing our signature scents closer to you.
        </p>
        <div className="sm:flex sm:flex-wrap gap-x-6 grid grid-cols-2  sm:gap-y-3 text-lg font-serif text-muted-foreground/60 leading-relaxed uppercase tracking-widest">
          {['Udupi', 'Karkala', 'Sringeri', 'Koppa', 'Moodbidri', 'Shimoga', 'Mangalore'].map((loc) => (
            <span key={loc} className="hover:text-primary transition-colors cursor-default">
              {loc}
            </span>
          ))}
        </div>
      </>
    ),
    image: presenceImg
  },
  {
    id: 4,
    title: "Connect",
    subtitle: "Visit Us",
    color: "#000000",
    content: (
      <div className="space-y-8">
        <p>
          Explore Zhilak. Experience the difference. Find your signature scent with us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm tracking-widest uppercase">
          <div>
            <h4 className="text-primary mb-2 flex items-center gap-2"><MapPin size={14} /> Location</h4>
            <p className="text-muted-foreground">Karkala, Udupi, Karnataka, India</p>
          </div>
          <div>
            <h4 className="text-primary mb-2 flex items-center gap-2"><Mail size={14} /> Contact</h4>
            <p className="text-muted-foreground lowercase">zhilakofficial@gmail.com</p>
          </div>
        </div>
        <a href="https://api.whatsapp.com/send?phone=919141162630" className="group flex items-center gap-4 text-2xl font-serif hover:text-primary transition-colors pt-4">
          Get in Touch <MoveRight className="group-hover:translate-x-4 transition-transform duration-500" />
        </a>
      </div>
    ),
    image: connectImg
  }
];


interface CardProps {
  i: number;
  item: typeof sections[0];
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

const Card = ({ i, item, progress, range, targetScale }: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          backgroundColor: item.color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`
        }}
        className="flex flex-col relative -top-[25%] h-[500px] w-[90vw] md:w-[1000px] rounded-3xl p-10 md:p-16 border border-white/10 shadow-2xl origin-top"
      >
        <div className="flex flex-col md:flex-row h-full gap-12">
          <div className="w-full md:w-3/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-primary" />
                <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium">{item.subtitle}</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-none">{item.title}</h2>
              <div className="text-muted-foreground font-light leading-relaxed text-lg">
                {item.content}
              </div>
            </div>
            <div className="text-9xl font-serif font-black text-white/5 absolute -right-4 -bottom-12 select-none pointer-events-none">
              {String(i + 1).padStart(2, '0')}
            </div>
          </div>

          <div className="w-full md:w-2/5 relative h-64 md:h-auto rounded-2xl overflow-hidden bg-white/5">
            <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent p-8 flex items-center justify-center">
                  <div className="w-full h-full border border-white/10 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const About = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <Layout>
      <div className="bg-background min-h-screen">

        <section className="h-[80vh] flex items-center justify-center relative overflow-hidden sticky top-0 z-0">
          <div className="luxury-container text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary uppercase tracking-[0.4em] text-sm mb-6"
            >
              The Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-6xl md:text-8xl lg:text-9xl mb-4"
            >
              We Are <br />
              <span className="relative inline-block text-primary italic">
                Zhilak
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <ScribbleUnderline className="w-full h-full -bottom-2 md:-bottom-4 opacity-80" />
                </motion.div>
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed"
            >
              "Charm in every fragrance."
            </motion.p>
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        </section>

        <div ref={container} className="relative z-10 bg-background pb-[20vh]">
          {sections.map((item, i) => {
            const targetScale = 1 - ((sections.length - i) * 0.05);
            return (
              <Card
                key={i}
                i={i}
                item={item}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default About;
