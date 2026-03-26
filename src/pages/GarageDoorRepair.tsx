import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Clock, Wrench, AlertTriangle, Check } from 'lucide-react';

export default function GarageDoorRepair() {
  const repairServices = [
    'Broken spring replacement (torsion & extension)',
    'Cable repair and replacement',
    'Panel replacement and realignment',
    'Track straightening and lubrication',
    'Roller and hinge replacement',
    'Weatherstripping and seal install',
    'Safety sensor alignment and testing',
    'Full door replacement and new installation',
  ];

  const urgencySigns = [
    { sign: 'Door won\'t open or close completely', level: 'High' },
    { sign: 'Loud grinding, popping, or scraping noises', level: 'Medium' },
    { sign: 'Door moves unevenly or looks crooked', level: 'High' },
    { sign: 'Springs appear stretched or broken', level: 'Critical' },
    { sign: 'Cables are frayed or hanging loose', level: 'Critical' },
    { sign: 'Door reverses before hitting the floor', level: 'Medium' },
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
            Garage Door<br /><span className="text-red-500">Repair &amp; Install</span>
          </h1>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            From a broken spring to a full door replacement, we handle every aspect of garage door service. Fast diagnosis, quality parts, and installs built to withstand years of daily use.
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
              src="/garage-door-repair-hero.png"
              alt="Professional technician repairing a residential garage door"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          </div>
        </motion.div>

        {/* Key Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Clock, title: 'Fast Response', desc: 'Same-week scheduling for most repairs. We show up on time, diagnose fast, and get it fixed right.' },
            { icon: Shield, title: 'Quality Parts', desc: 'We use industry-rated springs, cables, and hardware — no cheap substitutes that fail in six months.' },
            { icon: Wrench, title: 'Full-Service', desc: 'Repairs, replacements, and brand-new installations. One team handles it all, start to finish.' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-zinc-900/60 backdrop-blur-md border border-white/10 p-10 hover:border-red-500/30 transition-colors group text-center"
            >
              <div className="inline-flex p-4 bg-white/5 group-hover:bg-red-600/20 transition-colors mb-6">
                <item.icon className="h-8 w-8 text-zinc-400 group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Services List + Warning Signs */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* What We Fix */}
          <div className="bg-zinc-900/40 border border-white/10 p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-red-600"></span>
              <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">What We Do</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter mb-8 uppercase">Repair &amp; Installation Services</h2>
            <ul className="space-y-4">
              {repairServices.map((service) => (
                <li key={service} className="flex items-start">
                  <Check className="h-5 w-5 text-red-500 shrink-0 mr-4 mt-0.5" />
                  <span className="text-zinc-300 font-medium">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warning Signs */}
          <div className="bg-black border border-red-900/30 p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#dc2626_10px,#dc2626_20px)] opacity-50"></div>
            <div className="flex items-center gap-4 mb-8 mt-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Warning Signs</h2>
            </div>
            <p className="text-zinc-400 mb-8 font-medium">
              If you notice any of these symptoms, don't wait — a failing garage door is a safety hazard.
            </p>
            <ul className="space-y-4">
              {urgencySigns.map((item) => (
                <li key={item.sign} className="flex items-center justify-between bg-white/5 p-4 border border-white/5">
                  <span className="text-zinc-300 font-medium">{item.sign}</span>
                  <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 ${
                    item.level === 'Critical' ? 'bg-red-600/20 text-red-500 border border-red-600/30' :
                    item.level === 'High' ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30' :
                    'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                  }`}>
                    {item.level}
                  </span>
                </li>
              ))}
            </ul>
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
          <h2 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">Garage Door Giving You Trouble?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Contact us for a fast diagnosis and transparent quote. We'll get your door working right — or install a brand-new one.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-red-600 text-white py-4 px-10 font-bold uppercase tracking-widest hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
          >
            Schedule a Repair <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
