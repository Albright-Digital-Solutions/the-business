import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [reservationDetails, setReservationDetails] = useState<any>(null);

  useEffect(() => {
    // In a real app, Stripe would send a session_id back in the URL
    // We would fetch the session details from our backend here.
    // For this MVP, we pass the reservation details via React Router state
    // when redirecting back, or we just show a generic success message.
    
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    // Simulate backend verification
    const verifyPayment = async () => {
      try {
        // If we had a real backend verification endpoint:
        // const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        // const data = await res.json();
        
        // Mock verification
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // We retrieve the pending reservation details from local storage for this demo
        const pendingResStr = localStorage.getItem('pendingReservation');
        if (pendingResStr) {
           setReservationDetails(JSON.parse(pendingResStr));
           // Clear it out
           localStorage.removeItem('pendingReservation');
        }

        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };

    if (sessionId) {
        verifyPayment();
    } else {
        // Just show success if no session ID (e.g., straight navigation)
        setStatus('success');
    }
  }, [location]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-white uppercase tracking-wider">Verifying Payment...</h2>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Payment Verification Failed</h2>
        <p className="text-zinc-400 mb-8 max-w-md text-center">There was an issue verifying your deposit. Please contact support.</p>
        <Link to="/contact" className="px-6 py-3 bg-red-600 text-white font-bold uppercase text-sm hover:bg-red-700 transition-colors">
          Return to Booking
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative selection:bg-red-600 selection:text-white">
      {/* Background Textures */}
      <div className="fixed inset-0 bg-noise opacity-50 z-0 pointer-events-none"></div>
      <div className="fixed inset-0 bg-grid-pattern opacity-30 z-0 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          className="bg-black border border-white/10 p-10 mt-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle green glow for success */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[80px] pointer-events-none"></div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Booking Confirmed
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Your $100 reservation deposit was successful. Your pick-up time is locked in!
            </p>
          </div>

          {reservationDetails && (
            <div className="border border-white/5 bg-zinc-900/30 p-6 mb-8 mt-8">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Reservation Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase">{reservationDetails.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase">{reservationDetails.slot}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase">{reservationDetails.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-10">
            <Link 
              to="/"
              className="px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
