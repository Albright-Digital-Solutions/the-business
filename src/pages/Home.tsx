import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Recycle, ShieldCheck, Clock, ChevronRight } from 'lucide-react';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    '/images/garage_corvette.png',
    '/images/garage_gym.png',
    '/images/garage_bikes_climbing.png',
    '/images/garage_motorcycle_workshop.png',
    '/images/garage_music_studio.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              alt="Garage man cave designs"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.1] text-white uppercase mt-12">
              Reclaim Your Garage.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                Maximize Your Space.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-white mb-10 max-w-2xl leading-relaxed font-medium bg-black/60 backdrop-blur-md p-5 rounded-lg border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              Your Garage is more than a storage shed. Let us help you unlock its potential.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="group relative inline-flex justify-center items-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-red-600 overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 w-full h-full bg-red-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center">
                  Schedule Your Recovery
                  <ArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/services"
                className="group inline-flex justify-center items-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/20 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 rounded-sm"
              >
                View Standard Pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase">Painless Reclamation</h2>
            <p className="text-lg text-zinc-400 font-medium">
              Your garage is valuable real estate. Our Garage Recovery process is designed to give you your space back efficiently, securely, and transparently.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: <CheckCircle2 className="h-8 w-8 text-red-500" />,
                title: "Fixed, Transparent Pricing",
                desc: "Standard Pricing by Garage Size. No onsite estimates needed, no hidden fees, and no haggling. You know exactly what to expect."
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-red-500" />,
                title: "Document Security",
                desc: "Your security is paramount. Any sensitive documents encountered during sorting are immediately shredded onsite and processed for recycling."
              },
              {
                icon: <Clock className="h-8 w-8 text-red-500" />,
                title: "Service Concierge",
                desc: "A professional, efficient team in clean branded clothing. We handle all the heavy lifting, sorting, and logistics with zero disruption."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="group bg-zinc-900/40 backdrop-blur-sm p-10 border border-white/5 hover:border-red-500/50 transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="bg-black/50 w-16 h-16 rounded-none flex items-center justify-center border border-white/10 mb-8 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Garage Recovery Difference */}
      <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
        {/* Decorative background lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600 to-transparent"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-red-600 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-red-600"></span>
                <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Our Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase">The Recovery Difference</h2>
              <div className="space-y-6">
                <p className="font-bold text-white text-xl leading-relaxed border-l-4 border-red-600 pl-6 py-2 bg-gradient-to-r from-red-600/10 to-transparent">
                  We are not like any other "Junk" removal company. We focus on Recycle, Recovery, and Reuse.
                </p>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Our Zero-Landfill Initiative drives everything we do. Unlike standard junk removal services that simply haul everything to the nearest dump, we prioritize keeping items out of landfills.
                </p>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Any items that can be recovered, reused, donated, or sold will be processed responsibly. We carefully sort materials for specialized recycling, actively reducing environmental impact while clearing your valuable property square footage.
                </p>
              </div>
              
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-4">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-black flex items-center justify-center shadow-lg z-30"><Recycle className="w-6 h-6 text-red-600"/></div>
                  <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center shadow-lg z-20"><Recycle className="w-6 h-6 text-red-500"/></div>
                  <div className="w-14 h-14 rounded-full bg-zinc-700 border-2 border-black flex items-center justify-center shadow-lg z-10"><Recycle className="w-6 h-6 text-red-400"/></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white uppercase tracking-widest">Eco-friendly</span>
                  <span className="text-xs font-medium text-red-500 uppercase tracking-widest">Decluttering</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/5] md:aspect-square rounded-none overflow-hidden border border-white/10 relative group">
                <div className="absolute inset-0 bg-red-600/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src="https://picsum.photos/seed/professional-team-dark/800/1000?grayscale" 
                  alt="Professional Garage Recovery Team" 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                  <div className="flex items-center gap-4 mb-2">
                    <ShieldCheck className="w-8 h-8 text-red-500" />
                    <span className="font-black text-2xl text-white uppercase tracking-tight">Trusted Pros</span>
                  </div>
                  <p className="text-zinc-300 font-medium">Clean, uniformed teams operating modern, pristine equipment.</p>
                </div>
              </div>
              
              {/* Decorative accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-red-600"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-red-600"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
