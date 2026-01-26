import Layout from '@/components/layout/Layout';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="luxury-subheading mb-4 animate-fade-up">Our Story</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              A Legacy of <span className="gold-gradient-text">Excellence</span>
            </h1>
            <div className="luxury-divider animate-fade-up" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="pb-16 lg:pb-24">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                  The House of <span className="gold-gradient-text">Zhilak</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Zhilak was born from a singular vision: to create products that transcend time. 
                  Our founders believed that a truly exceptional product should tell a story—one 
                  that unfolds with each detail, evoking memories and emotions that linger.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  We have remained steadfast in our commitment to excellence. Every item in our 
                  collection is crafted using the finest materials sourced from around the world—
                  from precious ingredients to exquisite fabrics and rare accessories.
                </p>
              </div>
              <div className="luxury-divider !mx-0" />
              <blockquote className="font-serif text-lg md:text-xl italic text-foreground/80">
                "Excellence is not a destination, but a journey we take with every creation."
                <span className="block text-sm text-muted-foreground mt-2 not-italic">
                  — Zhilak Founding Team
                </span>
              </blockquote>
            </div>
            <div className="aspect-[4/5] bg-secondary overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Zhilak Atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <p className="luxury-subheading mb-3">Our Philosophy</p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              Craftsmanship & <span className="gold-gradient-text">Quality</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Finest Materials',
                description: 'We source only the rarest and most precious raw materials, ensuring each product meets our exacting standards.',
              },
              {
                title: 'Master Artisans',
                description: 'Our creations are composed by world-renowned artisans who bring decades of expertise to every piece.',
              },
              {
                title: 'Timeless Elegance',
                description: 'We believe in creating products that transcend trends—pieces that become a signature, a legacy.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center space-y-3 p-6 animate-fade-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto border border-primary/30 flex items-center justify-center">
                  <span className="font-serif text-xl md:text-2xl text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif text-lg md:text-xl text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="luxury-subheading mb-3">Get in Touch</p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                Visit <span className="gold-gradient-text">Zhilak</span>
              </h2>
              <div className="luxury-divider" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-base md:text-lg text-foreground mb-1">Address</h4>
                    <p className="text-muted-foreground text-sm">
                      12 Rue de la Paix<br />
                      75002 Paris, France
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-base md:text-lg text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground text-sm">
                      +33 1 42 60 12 34
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-base md:text-lg text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">
                      contact@zhilak.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif text-base md:text-lg text-foreground mb-1">Hours</h4>
                    <p className="text-muted-foreground text-sm">
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
                  alt="Zhilak Boutique"
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
