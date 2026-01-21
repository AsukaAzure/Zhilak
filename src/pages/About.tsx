import Layout from '@/components/layout/Layout';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="luxury-subheading mb-4 animate-fade-up">Our Story</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              A Century of <span className="gold-gradient-text">Excellence</span>
            </h1>
            <div className="luxury-divider animate-fade-up" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="pb-24 lg:pb-32">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                  The House of <span className="gold-gradient-text">Maison Noir</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 1924 in the heart of Paris, Maison Noir was born from a singular vision: 
                  to create fragrances that transcend time. Our founder, Henri Dubois, believed that 
                  a truly exceptional perfume should tell a story—one that unfolds with each note, 
                  evoking memories and emotions that linger long after the scent has faded.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For a century, we have remained steadfast in our commitment to excellence. Every 
                  fragrance in our collection is crafted using the finest ingredients sourced from 
                  around the world—from the delicate jasmine fields of Grasse to the precious oud 
                  forests of Southeast Asia.
                </p>
              </div>
              <div className="luxury-divider !mx-0" />
              <blockquote className="font-serif text-xl italic text-foreground/80">
                "Perfume is the art that makes memory speak."
                <span className="block text-sm text-muted-foreground mt-2 not-italic">
                  — Henri Dubois, Founder
                </span>
              </blockquote>
            </div>
            <div className="aspect-[4/5] bg-secondary overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Maison Noir Atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-card/50">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <p className="luxury-subheading mb-4">Our Philosophy</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Craftsmanship & <span className="gold-gradient-text">Quality</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Finest Ingredients',
                description: 'We source only the rarest and most precious raw materials, ensuring each fragrance meets our exacting standards.',
              },
              {
                title: 'Master Perfumers',
                description: 'Our creations are composed by world-renowned perfumers who bring decades of expertise to every blend.',
              },
              {
                title: 'Timeless Elegance',
                description: 'We believe in creating fragrances that transcend trends—scents that become a signature, a legacy.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-8 animate-fade-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto border border-primary/30 flex items-center justify-center">
                  <span className="font-serif text-2xl text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="luxury-subheading mb-4">Get in Touch</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Visit Our <span className="gold-gradient-text">Maison</span>
              </h2>
              <div className="luxury-divider" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-2">Address</h4>
                    <p className="text-muted-foreground">
                      12 Rue de la Paix<br />
                      75002 Paris, France
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-2">Phone</h4>
                    <p className="text-muted-foreground">
                      +33 1 42 60 12 34
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-2">Email</h4>
                    <p className="text-muted-foreground">
                      contact@maisonnoir.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-2">Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Saturday: 10:00 - 19:00<br />
                      Sunday: 12:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Image/Map Placeholder */}
              <div className="aspect-square bg-secondary overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Maison Noir Boutique"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
