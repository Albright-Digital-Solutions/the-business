import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Recycle, MapPin, Phone, Mail, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services & Pricing', path: '/services' },
    { name: 'The Process & Security', path: '/process' },
    { name: 'Schedule Recovery', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col relative selection:bg-red-600 selection:text-white">
      {/* Global Textures */}
      <div className="fixed inset-0 bg-noise z-0"></div>
      <div className="fixed inset-0 bg-grid-pattern z-0"></div>

      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="bg-red-600 text-white p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                  <Recycle className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl leading-tight tracking-tighter text-white uppercase">Garage Recovery</span>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase">Solutions</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-zinc-400 hover:text-white focus:outline-none p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            >
              <div className="pt-2 pb-6 space-y-1 px-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-bold uppercase tracking-wider ${
                        isActive
                          ? 'bg-red-600/10 text-red-500 border border-red-600/20'
                          : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t border-white/10 pt-16 pb-8 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-red-600/10 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12 lg:items-center">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600 text-white p-1.5 rounded-md shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                  <Recycle className="h-5 w-5" />
                </div>
                <span className="font-black text-xl text-white tracking-tighter uppercase">Garage Recovery</span>
              </div>
              <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                Premium garage cleanout and specialized item recovery services. We pull no stops in reclaiming your space.
              </p>
            </div>
            
            <div className="lg:col-span-3">
              <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-red-600"></span> Contact
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3 group">
                  <div className="p-2 bg-white/5 rounded-md group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                    <Phone className="h-4 w-4 text-zinc-400 group-hover:text-red-500" />
                  </div>
                  <span className="text-zinc-300 font-medium">512-814-8825</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="p-2 bg-white/5 rounded-md group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                    <Mail className="h-4 w-4 text-zinc-400 group-hover:text-red-500" />
                  </div>
                  <span className="text-zinc-300 font-medium">garagerecoverysolutions@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 group items-start">
                  <div className="p-2 bg-white/5 rounded-md group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors mt-1">
                    <MapPin className="h-4 w-4 text-zinc-400 group-hover:text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-300 font-medium">Service Area:</span>
                    <span className="text-zinc-500 text-xs mt-1">50-Mile Radius from Jarrell, TX</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Coverage Map */}
            <div className="lg:col-span-6 h-full min-h-[300px] flex flex-col items-center lg:items-end">
              <div className="w-full max-w-2xl h-full flex flex-col">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-red-600"></span> Coverage Area
                </h3>
                <div className="relative flex-grow rounded-lg overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] group h-[250px]">
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 transition-colors z-30 pointer-events-none rounded-lg"></div>
                  
                  {/* Transparent Red Service Radius Overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-48 h-48 md:w-56 md:h-56 bg-red-600/30 rounded-full border border-red-500/50 z-20 pointer-events-none flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
                  </div>

                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d350000.00!2d-97.5855!3d30.8282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus&style=feature:all|element:labels.text.fill|color:0x8ec3b9&style=feature:all|element:labels.text.stroke|color:0x1a3646&style=feature:landscape|element:geometry|color:0x09090b&style=feature:poi|element:geometry|color:0x1c1c1c&style=feature:road|element:geometry|color:0x2c2c2c&style=feature:transit|element:geometry|color:0x2c2c2c&style=feature:water|element:geometry|color:0x0f0f0f"
                    className="absolute inset-0 w-full h-full filter grayscale-[50%] contrast-125 z-10 hover:grayscale-[20%] transition-all duration-500"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Service Area: 50-Mile Radius from Jarrell, TX"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-xs font-medium text-zinc-500 flex flex-col md:flex-row justify-between items-center uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} Garage Recovery Solutions. All rights reserved.</p>
            <p className="mt-4 md:mt-0 text-red-600/80">Eco-friendly decluttering & Document Destruction</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
