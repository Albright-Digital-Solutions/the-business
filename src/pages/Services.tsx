import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Info, ArrowRight, AlertTriangle } from 'lucide-react';

export default function Services() {
  const pricingTiers = [
    {
      name: '1-Car Recovery',
      price: '$499',
      description: 'Perfect for standard single-bay garages or partial cleanouts of larger spaces.',
      features: [
        'Complete sorting and removal',
        'Document shredding protocol',
        'Donation & recycling routing',
        'Broom-swept finish',
      ],
    },
    {
      name: '2-Car Recovery',
      price: '$699',
      description: 'Our most popular solution for standard suburban two-car garages.',
      features: [
        'Complete sorting and removal',
        'Document shredding protocol',
        'Donation & recycling routing',
        'Broom-swept finish',
        'Priority scheduling',
      ],
      popular: true,
    },
    {
      name: '3-Car Recovery',
      price: '$899',
      description: 'Comprehensive clearance for large garages and extensive storage spaces.',
      features: [
        'Complete sorting and removal',
        'Document shredding protocol',
        'Donation & recycling routing',
        'Broom-swept finish',
        'Priority scheduling',
        'Dedicated project manager',
      ],
    },
  ];

  const surcharges = [
    'Tires (per tire)',
    'Large Appliances (Refrigerators, Freezers)',
    'Hazardous Materials (Paint, Chemicals, Oils)',
    'Mattresses & Box Springs',
    'CRT Televisions & Monitors',
    'Heavy Construction Debris (Concrete, Dirt)',
  ];

  return (
    <div className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-red-600"></span>
            <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Pricing</span>
            <span className="h-px w-8 bg-red-600"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">Structured Solutions</h1>
          <p className="text-xl text-zinc-400 font-medium">
            Transparent, fixed pricing based on volume. No onsite estimates needed. We provide premium junk removal and efficient space solutions.
          </p>
        </motion.div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {pricingTiers.map((tier, index) => (
            <motion.div 
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-zinc-900/60 backdrop-blur-md p-10 flex flex-col ${
                tier.popular 
                  ? 'border-2 border-red-600 shadow-[0_0_40px_-10px_rgba(220,38,38,0.3)] transform md:-translate-y-4' 
                  : 'border border-white/10 hover:border-white/30 transition-colors'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-red-600 text-white text-xs font-black uppercase tracking-[0.2em] py-2 px-4 shadow-lg">
                    Most Requested
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{tier.name}</h3>
                <p className="text-zinc-400 text-sm h-12 leading-relaxed">{tier.description}</p>
              </div>
              
              <div className="mb-8 pb-8 border-b border-white/10">
                <span className="text-5xl font-black text-white">{tier.price}</span>
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-sm ml-2">/ flat rate</span>
              </div>
              
              <ul className="space-y-5 mb-10 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className={`h-5 w-5 shrink-0 mr-4 ${tier.popular ? 'text-red-500' : 'text-zinc-500'}`} />
                    <span className="text-zinc-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/contact"
                className={`w-full py-4 px-6 font-bold text-center uppercase tracking-widest transition-all duration-300 ${
                  tier.popular 
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]' 
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                Select Solution
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-zinc-900/40 border border-white/10 p-10 hover:border-red-500/30 transition-colors group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 group-hover:bg-red-600/20 transition-colors">
                <Info className="h-6 w-6 text-zinc-400 group-hover:text-red-500" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Beyond the Garage</h3>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8 text-lg">
              While garage cleanouts are our specialty, we also offer cleanout services for other areas of your home or property (basements, sheds, attics, etc.), and single-item pickups at a discounted rate. Pricing varies by volume.
            </p>
            <Link to="/contact" className="inline-flex items-center text-red-500 font-bold uppercase tracking-widest hover:text-red-400 transition-colors">
              Request a custom quote <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>

          <div className="bg-black border border-red-900/30 p-10 relative overflow-hidden">
            {/* Warning stripes background */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#dc2626_10px,#dc2626_20px)] opacity-50"></div>
            
            <div className="flex items-center gap-4 mb-6 mt-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Additional Surcharges</h3>
            </div>
            <p className="text-zinc-400 mb-8 font-medium">
              Due to specialized disposal and recycling requirements, the following items incur a standard industry surcharge:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {surcharges.map((item) => (
                <li key={item} className="flex items-center text-zinc-300 font-medium bg-white/5 p-3 border border-white/5">
                  <div className="w-1.5 h-1.5 bg-red-600 mr-3 shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
