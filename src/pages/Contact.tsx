import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Upload, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-red-600"></span>
            <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Booking</span>
            <span className="h-px w-8 bg-red-600"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">Schedule Recovery</h1>
          <p className="text-xl text-zinc-400 font-medium">
            Ready to reclaim your space? Provide your details below to schedule your Garage Recovery Solutions service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Calendar Placeholder */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 p-10 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-600/10 border border-red-600/20">
                  <Calendar className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Select Date & Time</h2>
              </div>
              
              <div className="flex-grow flex items-center justify-center border-2 border-dashed border-white/10 bg-black/50 p-10 text-center hover:border-red-500/30 transition-colors">
                <div>
                  <Calendar className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
                  <p className="text-zinc-400 font-bold uppercase tracking-widest">[Calendar Plugin Placeholder]</p>
                  <p className="text-sm text-zinc-600 mt-3 font-medium">Integration for scheduling API goes here.</p>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/10">
                <h3 className="font-bold text-white mb-3 uppercase tracking-wider text-sm">Service Agreement</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  By scheduling, you agree to our standard service terms. Payment is collected upon completion of the recovery process.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-black border border-white/10 p-10 relative overflow-hidden shadow-2xl">
              {/* Subtle red glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[80px] pointer-events-none"></div>

              <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">Request a Quote / Information</h2>
              
              {isSubmitted ? (
                <motion.div 
                  className="py-16 flex flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 bg-red-600/10 border border-red-600/20 flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Request Received</h3>
                  <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
                    Thank you for contacting Garage Recovery Solutions. Our concierge team will review your details and contact you shortly to confirm your service.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-10 text-red-500 hover:text-red-400 font-bold uppercase tracking-widest text-sm transition-colors"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-zinc-700"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-zinc-700"
                        placeholder="512-814-8825"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-zinc-700"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Address / Zip Code</label>
                      <input
                        type="text"
                        id="zip"
                        required
                        className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-zinc-700"
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Garage Size</label>
                    <select
                      id="size"
                      required
                      defaultValue=""
                      className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all appearance-none"
                    >
                      <option value="" disabled className="text-zinc-500">Select a size...</option>
                      <option value="1-car" className="bg-zinc-900">1-car Garage</option>
                      <option value="2-car" className="bg-zinc-900">2-car Garage</option>
                      <option value="3-car" className="bg-zinc-900">3-car Garage</option>
                      <option value="other" className="bg-zinc-900">Other / Custom Space</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Photos of Space (Optional)</label>
                    <p className="text-sm text-zinc-500 mb-4">Please upload photos of your garage/items for a more accurate assessment.</p>
                    <div className="mt-1 flex justify-center px-6 pt-8 pb-10 border-2 border-white/10 border-dashed bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-red-500/30 transition-colors cursor-pointer group">
                      <div className="space-y-2 text-center">
                        <Upload className="mx-auto h-10 w-10 text-zinc-600 group-hover:text-red-500 transition-colors mb-4" />
                        <div className="flex text-sm text-zinc-400 justify-center">
                          <label htmlFor="file-upload" className="relative cursor-pointer font-bold text-white hover:text-red-500 focus-within:outline-none uppercase tracking-wider">
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                          </label>
                          <p className="pl-2">or drag and drop</p>
                        </div>
                        <p className="text-xs text-zinc-600 uppercase tracking-widest mt-2">PNG, JPG, HEIC up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center px-8 py-5 text-sm font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transform hover:-translate-y-1"
                    >
                      Submit Request
                      <Send className="ml-3 h-5 w-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
