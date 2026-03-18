import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Zap, Wifi, ShieldCheck, Volume2 } from 'lucide-react';

export default function AutoOpenerInstall() {
  const openerTypes = [
    {
      name: 'Chain Drive',
      best: 'Best for detached garages',
      description: 'Reliable and budget-friendly. Uses a metal chain to pull the door. Slightly louder, ideal when noise isn\'t a concern.',
      features: ['Most affordable option', 'Extremely durable', 'Handles heavy doors'],
    },
    {
      name: 'Belt Drive',
      best: 'Best for attached garages',
      description: 'Whisper-quiet operation using a reinforced rubber belt. Perfect when bedrooms or living spaces are above or next to the garage.',
      features: ['Ultra-quiet operation', 'Smooth performance', 'Low maintenance'],
    },
    {
      name: 'Wall Mount',
      best: 'Best for high ceilings',
      description: 'Mounts on the wall beside the door, freeing up ceiling space. Modern, clean look with powerful performance.',
      features: ['Saves ceiling space', 'Sleek, modern install', 'Powerful motor'],
    },
  ];

  const included = [
    'Professional removal of old opener (if applicable)',
    'New opener unit installation and wiring',
    'Safety sensor setup and calibration',
    'Remote controls and wall button programming',
    'Smart home / Wi-Fi integration (if supported)',
    'Full safety test and walkthrough with homeowner',
    'Cleanup — we leave it cleaner than we found it',
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
            Automatic Opener<br /><span className="text-red-500">Installation</span>
          </h1>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            Upgrade to a modern automatic garage door opener. We supply, install, and program your new opener — complete with safety sensors, remotes, and optional smart-home connectivity.
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
              src="/auto-opener-hero.png"
              alt="Modern automatic garage door opener with smartphone app control"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          </div>
        </motion.div>

        {/* Why Upgrade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {[
            { icon: Zap, title: 'One-Touch Access', desc: 'Open and close your garage with a single button press from your car, wall panel, or phone.' },
            { icon: Wifi, title: 'Smart Connectivity', desc: 'Wi-Fi enabled openers let you monitor and control your garage door from anywhere.' },
            { icon: ShieldCheck, title: 'Enhanced Safety', desc: 'Auto-reverse sensors, rolling security codes, and motion-activated lighting keep your family safe.' },
            { icon: Volume2, title: 'Quiet Operation', desc: 'Belt-drive and DC motor openers run whisper-quiet — no more rattling chains at 6 AM.' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-zinc-900/60 backdrop-blur-md border border-white/10 p-8 hover:border-red-500/30 transition-colors group text-center"
            >
              <div className="inline-flex p-3 bg-white/5 group-hover:bg-red-600/20 transition-colors mb-5">
                <item.icon className="h-7 w-7 text-zinc-400 group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Opener Types */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-red-600"></span>
              <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Options</span>
              <span className="h-px w-8 bg-red-600"></span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Choose Your Opener Type</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {openerTypes.map((opener, index) => (
              <motion.div
                key={opener.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`bg-zinc-900/60 backdrop-blur-md p-10 flex flex-col ${
                  index === 1
                    ? 'border-2 border-red-600 shadow-[0_0_40px_-10px_rgba(220,38,38,0.3)] transform md:-translate-y-4'
                    : 'border border-white/10 hover:border-white/30 transition-colors'
                }`}
              >
                {index === 1 && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-red-600 text-white text-xs font-black uppercase tracking-[0.2em] py-2 px-4 shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{opener.name}</h3>
                  <p className="text-red-500 text-sm font-bold uppercase tracking-wider">{opener.best}</p>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">{opener.description}</p>
                <ul className="space-y-3">
                  {opener.features.map((f) => (
                    <li key={f} className="flex items-center">
                      <Check className="h-4 w-4 text-red-500 shrink-0 mr-3" />
                      <span className="text-zinc-300 font-medium text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-zinc-900/40 border border-white/10 p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-red-600"></span>
              <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Full Service</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter mb-8 uppercase">What's Included</h2>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="h-5 w-5 text-red-500 shrink-0 mr-4 mt-0.5" />
                  <span className="text-zinc-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-6">The Process</h3>
            <div className="space-y-8">
              {['Assessment & Selection', 'Scheduling & Prep', 'Installation & Testing'].map((step, i) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600 flex items-center justify-center text-white font-black text-lg shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-tight">{step}</h4>
                    <p className="text-zinc-400 mt-1">
                      {i === 0 && 'We evaluate your current setup, discuss your needs, and recommend the right opener type and features.'}
                      {i === 1 && 'We schedule a convenient install window and arrive with all hardware and tools — nothing you need to buy.'}
                      {i === 2 && 'Full installation, wiring, programming, safety testing, and a walkthrough so you know exactly how it works.'}
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
          <h2 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">Ready to Go Automatic?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Contact us for a consultation and quote. We'll match you with the right opener and handle every step of the install.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-red-600 text-white py-4 px-10 font-bold uppercase tracking-widest hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
          >
            Get Started <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
