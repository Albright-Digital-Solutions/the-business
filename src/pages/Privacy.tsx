import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="py-24 relative min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          className="bg-black border border-white/10 p-10 sm:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900"></div>

          <div className="flex items-center gap-6 mb-12">
            <div className="bg-red-600/10 border border-red-600/20 p-4">
              <Shield className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Your Privacy Matters</h1>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl font-medium text-white leading-relaxed mb-12 border-l-4 border-red-600 pl-8 py-4 bg-white/5">
              We do not sell, rent, or share your information with any third parties for marketing purposes. Your contact information is used solely for the scheduling and communication regarding your requested Garage Recovery Solutions service.
            </p>

            <h2 className="text-2xl font-black text-white mt-12 mb-6 uppercase tracking-tight">Information Collection</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              We collect information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, or when you contact us. The personal information that we collect depends on the context of your interactions with us and the services, the choices you make, and the products and features you use.
            </p>

            <h2 className="text-2xl font-black text-white mt-12 mb-6 uppercase tracking-tight">Use of Your Information</h2>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul className="list-none pl-0 text-zinc-400 mb-10 space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-4 font-bold">›</span>
                <span>To facilitate the scheduling of your Garage Recovery service.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-4 font-bold">›</span>
                <span>To communicate with you regarding your appointment, quote, or service details.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-4 font-bold">›</span>
                <span>To respond to your inquiries and offer support.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-black text-white mt-12 mb-6 uppercase tracking-tight">Document Security During Service</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              As part of our Garage Recovery process, we adhere to a strict Document Shredding Protocol. Any sensitive physical documents, financial records, or personal paperwork encountered during the sorting process are immediately shredded onsite and processed for recycling. We guarantee the destruction of sensitive physical information found during our service.
            </p>

            <h2 className="text-2xl font-black text-white mt-12 mb-6 uppercase tracking-tight">Data Retention</h2>
            <p className="text-zinc-400 mb-12 leading-relaxed">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
            </p>

            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-sm font-bold text-zinc-600 uppercase tracking-widest">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
