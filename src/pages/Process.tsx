import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Recycle, Trash2, FileText, ArrowRight, Lock } from 'lucide-react';

export default function Process() {
  const workflowSteps = [
    {
      icon: <Recycle className="h-10 w-10 text-red-500" />,
      title: "01. Sort",
      description: "Items in good condition are carefully separated for donation to local charities or resale, maximizing their lifecycle.",
      action: "Donation/Resale"
    },
    {
      icon: <Trash2 className="h-10 w-10 text-red-500" />,
      title: "02. Separate",
      description: "Materials like metals, electronics, plastics, and cardboard are segregated and routed to specialized recycling facilities.",
      action: "Recycling"
    },
    {
      icon: <FileText className="h-10 w-10 text-red-500" />,
      title: "03. Shred",
      description: "Any personal documents, financial records, or sensitive paperwork found are immediately processed through our secure shredding protocol.",
      action: "Document Destruction"
    },
    {
      icon: <ArrowRight className="h-10 w-10 text-red-500" />,
      title: "04. Last Resort",
      description: "Only items that cannot be recovered, reused, or recycled are responsibly transported to local landfill facilities.",
      action: "Landfill"
    }
  ];

  return (
    <div className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-red-600"></span>
            <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Methodology</span>
            <span className="h-px w-8 bg-red-600"></span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 uppercase leading-[1.1]">
            Security & Space,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Recovered Effortlessly.</span>
          </h1>
          <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto">
            We provide a professional organizer garage experience. Our process is designed to be seamless, secure, and environmentally responsible.
          </p>
        </motion.div>

        {/* Security Protocol */}
        <motion.div 
          className="bg-black border border-red-900/50 relative overflow-hidden mb-32 group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated red glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-red-600/5 blur-[120px] pointer-events-none group-hover:bg-red-600/10 transition-colors duration-700"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            <div className="p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-950/30 border border-red-900/50 text-red-500 text-xs font-black uppercase tracking-widest mb-8 w-fit">
                <Lock className="w-4 h-4" />
                Document Destruction
              </div>
              <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">The Shredding Protocol</h2>
              <p className="text-2xl font-bold text-red-500 mb-8">Your Security is Our Priority.</p>
              <p className="text-zinc-400 leading-relaxed mb-10 text-lg">
                During the processing and sorting of materials, any and all documents encountered are immediately shredded onsite and processed for recycling. We ensure sensitive information is destroyed before it ever leaves your property.
              </p>
              <ul className="space-y-5 text-zinc-300 font-medium">
                {[
                  "On-site document identification",
                  "Immediate secure shredding",
                  "100% recycling of shredded materials"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="p-1.5 bg-red-600/20 rounded-sm">
                      <Shield className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 lg:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply z-10"></div>
              <img 
                src="https://picsum.photos/seed/security-shred-dark/800/800?grayscale" 
                alt="Secure Document Shredding" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transform group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black via-black/50 to-transparent z-20"></div>
            </div>
          </div>
        </motion.div>

        {/* Environmental Commitment */}
        <div className="mb-32">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">The Environmental Commitment</h2>
            <p className="text-xl text-zinc-400 font-medium max-w-3xl mx-auto">
              Our Zero-Landfill Initiative means we work hard to ensure your unwanted items find a second life or are processed responsibly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0"></div>
            
            {workflowSteps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative z-10 bg-zinc-900/80 backdrop-blur-sm p-8 border border-white/10 hover:border-red-500/50 transition-colors group"
              >
                <div className="bg-black w-20 h-20 flex items-center justify-center mb-8 border border-white/5 group-hover:border-red-500/30 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{step.title}</h3>
                <p className="text-zinc-400 font-medium mb-8 h-24">{step.description}</p>
                <div className="inline-block px-4 py-2 bg-white/5 text-red-500 text-xs font-black uppercase tracking-widest border border-white/5">
                  {step.action}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking & Convenience */}
        <motion.div 
          className="bg-red-600 p-12 lg:p-20 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Texture overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">Booking & Convenience</h2>
            <p className="text-xl text-white/90 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
              Simple logistics. Easy access. Minimal disruption. We respect your time and property, providing a concierge-level service from start to finish.
            </p>
            <Link
              to="/contact"
              className="inline-flex justify-center items-center px-10 py-5 text-sm font-black uppercase tracking-widest text-red-600 bg-white hover:bg-zinc-100 transition-colors duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Schedule Your Recovery
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
