import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Send, CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import Calendar from '../components/Calendar';
import { validateServiceArea } from '../utils/geocoding';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const navigate = useNavigate();

  const isCustomSpace = selectedSize === 'other';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Grab the address field
    const form = e.target as HTMLFormElement;
    const addressInput = form.elements.namedItem('address') as HTMLInputElement | null;
    
    if (addressInput) {
        const validation = await validateServiceArea(addressInput.value);
        if (!validation.isValid) {
            setErrorMessage(validation.error || "Invalid service area.");
            setIsSubmitting(false);
            return;
        }
    }

    // Simulate API call for the estimate flow
    setTimeout(() => {
      setIsSubmitting(false);
      if (isCustomSpace) {
        setShowCustomPopup(true);
      } else {
        setIsSubmitted(true);
      }
    }, 1500);
  };

  const handleSlotSelection = (date: string, slot: string) => {
    navigate('/reserve-confirmation', { state: { date, slot } });
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
            <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Booking & Estimates</span>
            <span className="h-px w-8 bg-red-600"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">Get Started</h1>
          <p className="text-xl text-zinc-400 font-medium">
            Schedule a guaranteed pick-up time with a deposit, or request a free estimate below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Calendar Section */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 p-10 h-full flex flex-col relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${isCustomSpace ? 'bg-zinc-600' : 'bg-red-600'} transition-colors duration-300`}></div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Schedule Pick-Up</h2>
                <p className="text-sm text-zinc-400">Guaranteed service slot. Requires a $100 non-refundable deposit.</p>
              </div>
              
              <div className="flex-grow flex flex-col items-center border-2 border-white/5 bg-black/50 p-6 text-center shadow-inner relative">
                <Calendar onSelectSlot={handleSlotSelection} />
                
                {/* Disabled overlay when "Other / Custom Space" is selected */}
                <AnimatePresence>
                  {isCustomSpace && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8"
                    >
                      <div className="p-4 bg-zinc-800/80 border border-white/10 rounded-lg max-w-sm text-center">
                        <Info className="h-10 w-10 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">Calendar Unavailable</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          Custom spaces require a personalized assessment. Please submit the estimate form and a recovery expert will contact you to schedule.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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

              <div className="mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Request Free Estimate</h2>
                <p className="text-sm text-zinc-400">15 min or less over the phone. Same day pick-up not guaranteed.</p>
              </div>
              
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
                    onClick={() => {
                        setIsSubmitted(false);
                        setErrorMessage(null);
                        setSelectedSize('');
                    }}
                    className="mt-10 text-red-500 hover:text-red-400 font-bold uppercase tracking-widest text-sm transition-colors"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  {errorMessage && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}
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
                      <label htmlFor="address" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Address</label>
                      <input
                        type="text"
                        id="address"
                        required
                        className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-zinc-700"
                        placeholder="123 Main St, Austin, TX 78701"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Garage Size</label>
                    <select
                      id="size"
                      required
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
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
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center px-8 py-5 text-sm font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transform hover:-translate-y-1"
                    >
                      {isSubmitting ? 'Validating Area...' : 'Submit Request'}
                      <Send className="ml-3 h-5 w-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Custom Space Popup Modal */}
      <AnimatePresence>
        {showCustomPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
              onClick={() => setShowCustomPopup(false)}
            ></div>
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-zinc-900 border border-white/10 p-10 max-w-lg w-full text-center shadow-2xl shadow-black/50"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
              
              <button
                onClick={() => setShowCustomPopup(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="w-20 h-20 bg-red-600/10 border border-red-600/20 flex items-center justify-center mb-8 mx-auto">
                <CheckCircle2 className="w-10 h-10 text-red-500" />
              </div>
              
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Request Received</h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                We need more information before we are able to schedule a pickup. A <span className="text-red-500 font-bold">recovery expert</span> will be contacting you soon.
              </p>
              
              <button
                onClick={() => {
                  setShowCustomPopup(false);
                  setSelectedSize('');
                  setIsSubmitted(false);
                }}
                className="inline-flex items-center bg-red-600 text-white py-3 px-8 font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
