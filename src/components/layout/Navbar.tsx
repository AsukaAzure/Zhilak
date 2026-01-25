import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut, Package, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const categories = [
  { name: 'Luxury Perfumes', path: '/category/luxury-perfumes', description: 'Exclusive high-end fragrances' },
  { name: 'Perfumes', path: '/category/perfumes', description: 'Classic signature scents' },
  { name: 'Clothing', path: '/category/clothing', description: 'Premium apparel collection' },
  { name: 'Accessories', path: '/category/accessories', description: 'Luxury finishing touches' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const isActiveCategory = categories.some(cat => location.pathname === cat.path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="luxury-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-serif text-2xl tracking-wider gold-gradient-text">
              MAISON NOIR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-sm uppercase tracking-[0.15em] transition-colors duration-300",
                location.pathname === '/'
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      "text-sm uppercase tracking-[0.15em] transition-colors duration-300 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                      isActiveCategory
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-4 bg-card border-border">
                      {categories.map((category) => (
                        <li key={category.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={category.path}
                              className={cn(
                                "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                location.pathname === category.path && "bg-accent/50"
                              )}
                            >
                              <div className="text-sm font-medium leading-none mb-1">{category.name}</div>
                              <p className="text-xs leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/about"
              className={cn(
                "text-sm uppercase tracking-[0.15em] transition-colors duration-300",
                location.pathname === '/about'
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              About Us
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/my-orders" className="flex items-center gap-2 cursor-pointer">
                        <Package className="w-4 h-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                          <User className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2 cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to="/auth" className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link
              to="/checkout"
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col py-6 px-6 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-sm uppercase tracking-[0.15em] py-3 transition-colors",
                  location.pathname === '/'
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Home
              </Link>
              
              {/* Mobile Categories Accordion */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className={cn(
                    "w-full flex items-center justify-between text-sm uppercase tracking-[0.15em] py-3 transition-colors",
                    isActiveCategory ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  Categories
                  <ChevronDown className={cn("w-4 h-4 transition-transform", isCategoriesOpen && "rotate-180")} />
                </button>
                {isCategoriesOpen && (
                  <div className="pl-4 space-y-1 border-l border-border/50 ml-2">
                    {categories.map((category) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "block text-sm py-2 transition-colors",
                          location.pathname === category.path
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-sm uppercase tracking-[0.15em] py-3 transition-colors",
                  location.pathname === '/about'
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                About Us
              </Link>
              
              {user && (
                <Link
                  to="/my-orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.15em] py-3 text-muted-foreground"
                >
                  My Orders
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
