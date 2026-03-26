import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CreditCard, Calendar as CalendarIcon, Clock, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateServiceArea } from '../utils/geocoding';

export default function ReserveConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { date: string; slot: string } | null;

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    garageSize: '2-car'
  });

  if (!state) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-black text-white mb-4 uppercase">No Reservation Found</h2>
        <p className="text-zinc-400 mb-8">Please select a time slot on the booking page.</p>
        <Link to="/contact" className="text-red-500 font-bold uppercase tracking-widest hover:text-red-400 transition-colors">
          Return to Booking
        </Link>
      </div>
    );
  }

  const { date, slot } = state;
  const slotLabel = slot === 'morning' ? '8:00 AM - 12:00 PM' : '1:00 PM - 5:00 PM';
  const displayDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // 1. Client-Side Geocoding Validation
      const validation = await validateServiceArea(formData.address);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Simulate minor loading state for validation
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          garage_size: formData.garageSize,
          date,
          slot
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize secure checkout.');
      }

      // Save reservation params locally for the success page to pick up after returning
      localStorage.setItem('pendingReservation', JSON.stringify({
          ...formData,
          date,
          slot: slotLabel
      }));

      // Redirect immediately to Stripe Hosted Checkout
      if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
      } else {
          throw new Error('No checkout URL received from server.');
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred initializing checkout.');
      setIsProcessing(false); // Only stop loading if we errored, otherwise let it spin while redirecting
    }
  };



  return (
    <div className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <button onClick={() => navigate('/contact')} className="flex items-center text-zinc-500 hover:text-white uppercase tracking-widest text-xs font-bold mb-10 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Calendar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Reservation Summary */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 p-10 relative overflow-hidden sticky top-32">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Service Summary</h2>
              
              <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/5"><CalendarIcon className="w-5 h-5 text-red-500" /></div>
                      <div>
                          <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-1">Date</p>
                          <p className="text-white font-bold">{displayDate}</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/5"><Clock className="w-5 h-5 text-red-500" /></div>
                      <div>
                          <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-1">Time Window</p>
                          <p className="text-white font-bold">{slotLabel}</p>
                      </div>
                  </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400 font-medium">Deposit Required</span>
                    <span className="text-white font-bold text-xl">$100.00</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mt-4">
                  This non-refundable deposit holds your scheduled time block and will be applied toward the total cost of your service upon completion.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form & Payment */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-black border border-white/10 p-10 relative shadow-2xl">
              <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">Complete Reservation</h2>
              
              {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}
              
              <form onSubmit={handlePaymentSubmit} className="space-y-8 relative z-10">
                  
                  {/* Step 1: Contact Details */}
                  <div>
                      <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm flex items-center">
                          <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-xs mr-3">1</span>
                          Contact Details
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                        <label htmlFor="name" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Name</label>
                        <input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-zinc-700" placeholder="Jane Doe" />
                        </div>
                        <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Phone</label>
                        <input type="tel" id="phone" required value={formData.phone} onChange={handleChange} className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-zinc-700" placeholder="512-555-0199" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                        <label htmlFor="email" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input type="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-zinc-700" placeholder="jane@example.com" />
                        </div>
                        <div>
                        <label htmlFor="address" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Address</label>
                        <input type="text" id="address" required value={formData.address} onChange={handleChange} className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-zinc-700" placeholder="123 Main St, Austin, TX 78701" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="garageSize" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Garage Size</label>
                        <select id="garageSize" required value={formData.garageSize} onChange={handleChange} className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all appearance-none">
                            <option value="1-car" className="bg-zinc-900">1-car Garage</option>
                            <option value="2-car" className="bg-zinc-900">2-car Garage</option>
                            <option value="3-car" className="bg-zinc-900">3-car Garage</option>
                            <option value="other" className="bg-zinc-900">Other / Custom Space</option>
                        </select>
                      </div>
                  </div>

                  {/* Step 2: Secure Payment */}
                  <div className="pt-6 border-t border-white/10">
                      <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm flex items-center">
                          <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-xs mr-3">2</span>
                          Secure Payment
                      </h3>

                      <div className="bg-zinc-900/40 border border-white/10 p-6 flex flex-col items-center justify-center">
                           <CreditCard className="w-10 h-10 text-emerald-500 mb-4" />
                           <p className="text-white font-bold uppercase tracking-widest text-sm text-center mb-2">Powered by Stripe</p>
                           <p className="text-xs text-zinc-400 text-center">You'll be redirected to Stripe's secure checkout to complete your $100 deposit. No card information is stored on our servers.</p>
                      </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full flex justify-center items-center px-8 py-5 text-sm font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                    >
                      {isProcessing ? 'Connecting to Secure Checkout...' : 'Proceed to Secure Checkout'}
                    </button>
                    <p className="text-center text-xs text-zinc-600 mt-4 flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-3 h-3" /> Secure SSL Encrypted Checkout
                    </p>
                  </div>
                </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
