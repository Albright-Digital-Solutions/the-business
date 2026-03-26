import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, ChevronDown, HelpCircle } from 'lucide-react';
import { getServiceBySlug, type ServiceEntity, type ServiceFAQ } from '../data/serviceData';

// ── Schema Generators ────────────────────────────────────────────

function generateLocalBusinessSchema(service: ServiceEntity) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Garage Recovery Solutions',
    description: `Professional ${service.serviceType} in Austin and Jarrell, Texas. ${service.description}`,
    url: 'https://www.garagerecoverysolutions.com',
    telephone: '+1-512-814-8825',
    email: 'garagerecoverysolutions@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jarrell',
      addressRegion: 'TX',
      postalCode: '76537',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.7282,
      longitude: -97.6064,
    },
    areaServed: [
      { '@type': 'City', name: 'Austin', sameAs: 'https://en.wikipedia.org/wiki/Austin,_Texas' },
      { '@type': 'City', name: 'Jarrell', sameAs: 'https://en.wikipedia.org/wiki/Jarrell,_Texas' },
      { '@type': 'City', name: 'Georgetown' },
      { '@type': 'City', name: 'Round Rock' },
      { '@type': 'City', name: 'Cedar Park' },
      { '@type': 'City', name: 'Pflugerville' },
    ],
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Garage Recovery Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.serviceType,
            serviceType: service.serviceType,
            description: service.description,
            url: `https://www.garagerecoverysolutions.com/services/${service.slug}`,
            provider: {
              '@type': 'LocalBusiness',
              name: 'Garage Recovery Solutions',
            },
            areaServed: {
              '@type': 'Place',
              name: 'Austin-Jarrell Metro Area, TX',
            },
          },
        },
      ],
    },
  };
}

function generateFAQSchema(faqs: ServiceFAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ── FAQ Accordion Item ───────────────────────────────────────────

function FAQItem({ faq, index }: { faq: ServiceFAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border border-white/10 hover:border-red-500/30 transition-colors"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between p-6 text-left group"
      >
        <span className="text-white font-bold text-lg pr-4 group-hover:text-red-400 transition-colors">{faq.question}</span>
        <ChevronDown
          className={`h-5 w-5 text-zinc-500 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-[15px] border-t border-white/5 pt-4">
          {faq.answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Service Page Component ──────────────────────────────────

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  // Inject meta tags and schema
  useEffect(() => {
    if (!service) return;

    // Page title
    document.title = service.metaTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', service.metaDescription);

    // JSON-LD: LocalBusiness + Service
    const ldBusinessScript = document.createElement('script');
    ldBusinessScript.type = 'application/ld+json';
    ldBusinessScript.id = 'ld-localbusiness';
    ldBusinessScript.textContent = JSON.stringify(generateLocalBusinessSchema(service));
    document.head.appendChild(ldBusinessScript);

    // JSON-LD: FAQPage
    const ldFaqScript = document.createElement('script');
    ldFaqScript.type = 'application/ld+json';
    ldFaqScript.id = 'ld-faqpage';
    ldFaqScript.textContent = JSON.stringify(generateFAQSchema(service.faqs));
    document.head.appendChild(ldFaqScript);

    return () => {
      // Cleanup schema scripts on unmount
      document.getElementById('ld-localbusiness')?.remove();
      document.getElementById('ld-faqpage')?.remove();
    };
  }, [service]);

  if (!service) {
    return <Navigate to="/pricing" replace />;
  }

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
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase leading-[1.1]">
            {service.title}
          </h1>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            {service.description}
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
              src={service.heroImage}
              alt={service.title}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {service.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-zinc-900/60 backdrop-blur-md border border-white/10 p-10 hover:border-red-500/30 transition-colors group"
            >
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-red-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Detail Section + Benefits */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-red-600"></span>
              <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Details</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-8 uppercase">
              {service.detailHeading}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {service.detailContent}
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 p-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">What You Get</h3>
            <ul className="space-y-5">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start">
                  <Check className="h-5 w-5 text-red-500 shrink-0 mr-4 mt-0.5" />
                  <span className="text-zinc-300 font-medium text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* FAQ Section */}
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
              <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">FAQ</span>
              <span className="h-px w-8 bg-red-600"></span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase flex items-center justify-center gap-4">
              <HelpCircle className="h-8 w-8 text-red-500" />
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {service.faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
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
          <h2 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">Ready to Get Started?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Contact us for a free consultation and transparent quote. We serve Austin, Jarrell, Georgetown, Round Rock, Cedar Park, and the surrounding area.
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
