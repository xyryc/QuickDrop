import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  // Current date & year
  const today = new Date();
  const year = today.getFullYear();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  

  // LinkedIn click handler with router navigation (next navigation style)
  const handleSakibClick = (e: React.MouseEvent) => {
    e.preventDefault();
   window.open("https://www.linkedin.com/in/engrsakib/", "_blank"); 
  };

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto py-12 md:py-16 px-4">
        {/* Newsletter Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Stay Updated with Our News
          </h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Subscribe to our newsletter and never miss an update on our services and special offers.
          </p>
          <form className="w-full max-w-sm flex gap-2">
            <Input type="email" placeholder="john@example.com" className="flex-1" />
            <Button className="shrink-0" type="submit">Subscribe</Button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-muted pt-8">
          {/* Logo and Socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="text-primary hover:text-primary/90 mb-4">
              {/* Example SVG logo */}
              <svg height="36" width="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#F97316" />
                <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18px" fontWeight="bold" dy=".3em">P</text>
              </svg>
            </Link>
            <p className="text-muted-foreground mb-4">
              Your trusted partner for all your parcel delivery needs.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Github" className="text-muted-foreground hover:text-primary transition-colors">
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Service Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">Parcel Booking</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Real-time Tracking</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Secure Delivery</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/terms-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/frequently-asked-questions" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
              {/* <li><Link to="#" className="hover:text-primary transition-colors">Live Chat</Link></li> */}
            </ul>
          </div>
        </div>

        {/* Copyright & Author */}
        <div className="mt-8 pt-4 border-t border-muted text-center text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
          <p>
            © {year} Your Company. All rights reserved. | {formattedDate}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Design &amp; Development by</span>
            <button
              className="font-semibold text-orange-600 hover:text-orange-800 transition-colors underline underline-offset-2"
              onClick={handleSakibClick}
              title="Md. Nazmus Sakib - LinkedIn"
            >
              Md. Nazmus Sakib
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;