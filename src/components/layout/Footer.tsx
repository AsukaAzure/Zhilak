import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="luxury-container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-3">
              <span className="font-serif text-xl tracking-wider gold-gradient-text">
                ZHILAK
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Crafting exceptional fragrances and luxury products. Each creation is a testament to our unwavering commitment to excellence.
            </p>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 md:justify-end">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>12 Rue de la Paix, 75002 Paris</span>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:contact@zhilak.com" className="hover:text-foreground transition-colors">
                  contact@zhilak.com
                </a>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+33142601234" className="hover:text-foreground transition-colors">
                  +33 1 42 60 12 34
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © 2024 Zhilak. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
