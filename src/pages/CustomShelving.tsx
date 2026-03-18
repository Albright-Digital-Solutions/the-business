import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Layers, Ruler, Wrench, Box } from 'lucide-react';

export default function CustomShelving() {
  const features = [
    {
      icon: Ruler,
      title: 'Precision Measured',
      description: 'Every shelf system is custom-measured to fit your exact garage dimensions, maximizing every inch of available space.',
    },
    {
      icon: Layers,
      title: 'Heavy-Duty Materials',
      description: 'Industrial-grade steel brackets and premium wood or metal shelving rated for serious weight — tools, bins, and equipment.',
    },
    {
      icon: Box,
      title: 'Modular Design',
      description: 'Configurable layouts that adapt as your storage needs change. Add, remove, or rearrange sections anytime.',
    },
    {
      icon: Wrench,
      title: 'Professional Install',
      description: 'Wall-anchored and floor-secured installations that won\'t sag, shift, or collapse. Built to last decades.',
    },
  ];

  const benefits = [
    'Free up floor space for vehicles and workstations',
    'Eliminate clutter with designated zones for every category',
    'Wall-mounted systems keep items off the ground',
    'Overhead ceiling racks for seasonal and bulk storage',
    'Custom workbench integration available',
    'Consultation included — we design it with you',
  ];

  return (
    <div className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Hero */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-red-600"></span>
            <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Service</span>
            <span className="h-px w-8 bg-red-600"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
            Custom Shelving<br /><span className="text-red-500">&amp; Storage</span>
          </h1>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            Transform your garage from chaotic catch-all into an organized, functional space. We design, build, and install custom storage solutions tailored to the way you actually use your garage.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative mb-24 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(220,38,38,0.2)]">
            <img
              src="/custom-shelving-hero.png"
              alt="Custom shelving and storage system installed in a residential garage"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          </div>
        </motion.div>


        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-zinc-900/60 backdrop-blur-md border border-white/10 p-10 hover:border-red-500/30 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 group-hover:bg-red-600/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-zinc-400 group-hover:text-red-500 transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{feature.title}</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-red-600"></span>
              <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Why Custom</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-8 uppercase">
              Engineered for Your Garage
            </h2>
            <ul className="space-y-5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start">
                  <Check className="h-5 w-5 text-red-500 shrink-0 mr-4 mt-0.5" />
                  <span className="text-zinc-300 font-medium text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 p-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-6">How It Works</h3>
            <div className="space-y-8">
              {['Consultation & Measurement', 'Custom Design & Quote', 'Build & Install'].map((step, i) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600 flex items-center justify-center text-white font-black text-lg shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-tight">{step}</h4>
                    <p className="text-zinc-400 mt-1">
                      {i === 0 && 'We visit your garage, take precise measurements, and discuss your storage needs and goals.'}
                      {i === 1 && 'You receive a detailed design with material options and transparent, flat-rate pricing.'}
                      {i === 2 && 'Our crew installs everything in a single visit — clean, fast, and built to last.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center bg-black border border-red-900/30 p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">Ready to Reclaim Your Garage?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Get a free consultation and custom quote. We'll design a storage system that fits your space, your stuff, and your budget.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-red-600 text-white py-4 px-10 font-bold uppercase tracking-widest hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
          >
            Get a Free Quote <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
