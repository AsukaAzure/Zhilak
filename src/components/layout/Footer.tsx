import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="luxury-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-xl tracking-wider gold-gradient-text">
                MAISON NOIR
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crafting exceptional fragrances since 1924. Each creation is a testament to our unwavering commitment to excellence.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/category/luxury-perfumes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Luxury Perfumes
                </Link>
              </li>
              <li>
                <Link to="/category/perfumes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Perfumes
                </Link>
              </li>
              <li>
                <Link to="/category/clothing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>12 Rue de la Paix</li>
              <li>75002 Paris, France</li>
              <li className="pt-2">
                <a href="mailto:contact@maisonnoir.com" className="hover:text-foreground transition-colors">
                  contact@maisonnoir.com
                </a>
              </li>
              <li>
                <a href="tel:+33142601234" className="hover:text-foreground transition-colors">
                  +33 1 42 60 12 34
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2024 Maison Noir. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/" className="hover:text-foreground transition-colors">Shipping</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
