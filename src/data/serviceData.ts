export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceEntity {
  slug: string;
  category: 'cleanout' | 'storage' | 'doors' | 'conversions' | 'specialty';
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  description: string;
  detailHeading: string;
  detailContent: string;
  serviceType: string;
  features: ServiceFeature[];
  benefits: string[];
  faqs: ServiceFAQ[];
}

export const SERVICE_CATEGORIES = {
  cleanout: 'Cleanout & Clearing',
  storage: 'Storage & Organization',
  doors: 'Doors & Openers',
  conversions: 'Conversions',
  specialty: 'Specialty Services',
} as const;

export const services: ServiceEntity[] = [
  // ─── CLEANOUT & CLEARING ───────────────────────────────────────
  {
    slug: 'full-garage-cleanout',
    category: 'cleanout',
    title: 'Full Garage Cleanout in Austin & Jarrell, TX',
    metaTitle: 'Full Garage Cleanout Austin & Jarrell TX | Garage Recovery Solutions',
    metaDescription: 'Professional full garage cleanout in Austin & Jarrell, TX. Floor-to-ceiling clearing, eco-friendly sorting, donation routing & same-day hauling. Fixed pricing by garage size.',
    heroImage: '/clean-out-hero.png',
    serviceType: 'Full Garage Cleanout',
    description: 'Complete floor-to-ceiling garage clearing with eco-friendly sorting, donation coordination, recycling, and responsible disposal. We handle everything — you just point and we clear. Fixed pricing by garage size with no hidden fees.',
    detailHeading: 'How Our Full Garage Cleanout Works',
    detailContent: 'Our team arrives with a full-size trailer, sorting bins, and all necessary equipment. We systematically work through your garage section by section — separating recyclables, donating usable items to local Austin charities, securely shredding documents, and hauling away the rest. Most 2-car garages are completed in under 4 hours. You get a broom-swept, completely empty garage ready for its next chapter.',
    features: [
      { title: 'Fixed Pricing', description: 'Flat-rate pricing by garage size. No surprises, no hourly billing, no hidden fees. Know your cost before we start.' },
      { title: 'Eco-First Sorting', description: 'We separate recyclables, donate usable goods, and minimize landfill waste through our Zero-Landfill Initiative.' },
      { title: 'Same-Day Service', description: 'Most cleanouts are completed in a single visit. We arrive, clear, and leave you with a clean, empty garage.' },
      { title: 'Document Security', description: 'Sensitive documents found during the cleanout are cross-cut shredded on-site — no paperwork leaves your property unsecured.' },
    ],
    benefits: [
      'Complete floor-to-ceiling garage clearing in one visit',
      'Eco-friendly sorting: recycle, donate, responsibly dispose',
      'On-site document shredding included at no extra charge',
      'Broom-swept finish — your garage is move-in ready',
      'Transparent, fixed pricing with no surprises',
      'Fully insured team with professional equipment',
    ],
    faqs: [
      { question: 'How much does a full garage cleanout cost in Austin, TX?', answer: 'Our full garage cleanout pricing is fixed by garage size: $499 for a 1-car garage, $699 for a 2-car garage, and $899 for a 3-car garage. This includes all labor, sorting, hauling, and disposal. Specialty items like appliances or hazardous materials may incur a small surcharge.' },
      { question: 'How long does a full garage cleanout take?', answer: 'Most single-car garages take 2-3 hours, and 2-car garages take 3-5 hours. We complete the majority of cleanouts in a single visit so you can enjoy your cleared space the same day.' },
      { question: 'Do you donate items during a garage cleanout?', answer: 'Yes. Usable furniture, clothing, tools, and household items are sorted and donated to local Austin-area charities. We provide a donation receipt for your tax records upon request.' },
      { question: 'What happens to hazardous materials found in my garage?', answer: 'Paint, chemicals, batteries, and e-waste are separated and routed to certified disposal facilities. There is a standard industry surcharge for hazardous materials due to the specialized handling required.' },
      { question: 'Do I need to be home during the cleanout?', answer: 'We recommend being present for the initial walkthrough so you can flag any items to keep. After that, you are welcome to go about your day — our team handles everything.' },
    ],
  },
  {
    slug: 'hoarding-garage-cleanup',
    category: 'cleanout',
    title: 'Hoarding Garage Cleanup in Austin, TX',
    metaTitle: 'Hoarding Garage Cleanup Austin TX | Compassionate & Discreet | Garage Recovery Solutions',
    metaDescription: 'Compassionate hoarding garage cleanup in Austin, TX. Judgment-free, discreet clearing for severely cluttered garages. Professional sorting, sanitization & responsible disposal.',
    heroImage: '/clean-out-hero.png',
    serviceType: 'Hoarding Cleanup Service',
    description: 'Compassionate, judgment-free clearing of severely cluttered garages. We understand hoarding situations require sensitivity, patience, and discretion. Our team works methodically to restore safety and functionality to your garage space.',
    detailHeading: 'Our Compassionate Hoarding Cleanup Approach',
    detailContent: 'Hoarding situations are deeply personal, and we treat every project with complete respect and zero judgment. Our trained team works at a pace that is comfortable for you, sorting items into keep, donate, recycle, and dispose categories. We coordinate with professional organizers and mental health professionals if requested. Every item is handled with care, and your privacy is always protected.',
    features: [
      { title: 'Judgment-Free', description: 'Our crew is trained in compassionate service. No judgment, no commentary — just professional, respectful work.' },
      { title: 'Methodical Sorting', description: 'We work section by section, ensuring nothing important is accidentally discarded. You approve every decision.' },
      { title: 'Sanitization', description: 'Deep cleaning and sanitization of the cleared space, including pest-related debris, mold zones, and biological matter.' },
      { title: 'Complete Discretion', description: 'Unmarked vehicles available on request. We protect your privacy throughout the entire process.' },
    ],
    benefits: [
      'Compassionate, judgment-free service from trained professionals',
      'Collaborative sorting — you approve what stays and goes',
      'Deep sanitization and deodorizing after clearing',
      'Coordination with professional organizers if needed',
      'Discreet, unmarked vehicles available on request',
      'Donation and recycling routing to minimize waste',
    ],
    faqs: [
      { question: 'How do you handle a hoarding garage cleanup differently than a regular cleanout?', answer: 'Hoarding cleanups require additional time, sensitivity, and a collaborative sorting process. We work at the homeowner\'s pace, never rush decisions, and can coordinate with therapists or professional organizers. The goal is restoration, not just removal.' },
      { question: 'How much does hoarding garage cleanup cost in Austin?', answer: 'Hoarding cleanups are quoted individually because severity varies widely. Most projects range from $800 to $2,500 depending on volume, hazardous materials, and sanitization needs. We provide a free, private assessment before any work begins.' },
      { question: 'Will my neighbors know about the cleanup?', answer: 'Complete discretion is standard. We use unmarked vehicles when requested and schedule work during hours you choose. Your privacy is our priority.' },
      { question: 'Do you handle biohazard or pest damage in hoarding situations?', answer: 'Yes. Our team is equipped for rodent debris, mold remediation prep, and biological waste. We follow proper disposal protocols and can sanitize the space after clearing.' },
    ],
  },
  {
    slug: 'estate-garage-clearing',
    category: 'cleanout',
    title: 'Estate & Probate Garage Clearing in Austin, TX',
    metaTitle: 'Estate Garage Clearing Austin TX | Probate & Inherited Property | Garage Recovery Solutions',
    metaDescription: 'Estate and probate garage clearing in Austin, TX. Professional clearing of inherited property garages with careful sorting, donation coordination & responsible disposal.',
    heroImage: '/clean-out-hero.png',
    serviceType: 'Estate Cleanout Service',
    description: 'Professional clearing of inherited or estate property garages. We handle the overwhelming task of sorting through decades of accumulated belongings with care and efficiency, coordinating donations, identifying valuables, and responsibly disposing of the rest.',
    detailHeading: 'Estate Garage Clearing Done Right',
    detailContent: 'Losing a loved one is hard enough without the burden of clearing their belongings. Our estate clearing team methodically sorts through garage contents, identifying items of potential value for estate sale, carefully packaging family keepsakes, and routing donations to local charities with full receipt documentation for probate records. We work with executors, attorneys, and family members to ensure the process meets all legal requirements.',
    features: [
      { title: 'Valuables Identification', description: 'We flag items of potential resale or sentimental value before anything is removed. Antiques, tools, and collectibles are separated.' },
      { title: 'Probate Documentation', description: 'Detailed inventory and donation receipts provided for estate records and tax documentation.' },
      { title: 'Family Coordination', description: 'We work with multiple family members, executors, or attorneys to ensure everyone is aligned on the process.' },
      { title: 'Timeline Flexibility', description: 'Whether you need it done in 24 hours for a closing or over several weeks, we adapt to your schedule.' },
    ],
    benefits: [
      'Careful sorting to preserve valuables and family keepsakes',
      'Detailed inventory documentation for probate records',
      'Donation receipts for tax deduction purposes',
      'Coordination with estate sale companies if needed',
      'Flexible scheduling to meet closing deadlines',
      'Complete clearing — we leave the garage broom-swept and ready',
    ],
    faqs: [
      { question: 'How soon can you clear an estate garage in Austin?', answer: 'We offer priority scheduling for estate clearings with property sale deadlines. Most estate garages can be cleared within 1-3 business days of initial contact. Rush service is available for same-week closings.' },
      { question: 'Do you provide documentation for probate courts?', answer: 'Yes. We provide a detailed written inventory of items removed, photographs if requested, and itemized donation receipts that meet IRS and probate court documentation standards.' },
      { question: 'What if we find valuable items during the clearing?', answer: 'Our team is trained to flag antiques, collectibles, tools, and items of potential value. We set these aside for the family to review before any disposal. We can also recommend local estate sale companies for high-value items.' },
      { question: 'Can you work with our estate attorney or executor?', answer: 'Absolutely. We regularly coordinate with executors, probate attorneys, and real estate agents to ensure the clearing meets all deadlines and legal requirements.' },
    ],
  },

  // ─── STORAGE & ORGANIZATION ────────────────────────────────────
  {
    slug: 'custom-garage-shelving',
    category: 'storage',
    title: 'Custom Garage Shelving & Storage in Austin, TX',
    metaTitle: 'Custom Garage Shelving Austin TX | Professional Install | Garage Recovery Solutions',
    metaDescription: 'Custom garage shelving and storage systems in Austin, TX. Precision-measured, heavy-duty wall-mounted shelving designed and installed to maximize every inch of your garage.',
    heroImage: '/custom-shelving-hero.png',
    serviceType: 'Custom Garage Shelving Installation',
    description: 'Professionally designed and installed garage shelving systems built to fit your exact space. Heavy-duty wall-mounted shelving, cabinet systems, and modular storage solutions custom-measured for your garage dimensions.',
    detailHeading: 'Why Custom Shelving Transforms Your Garage',
    detailContent: 'Off-the-shelf shelving units waste space and sag under real loads. Our custom shelving systems are precision-measured to your garage\'s exact dimensions, wall-anchored with industrial hardware, and rated for serious weight — power tools, storage bins, automotive parts, and seasonal equipment. We design the layout with you, build it in our shop, and install it in a single visit.',
    features: [
      { title: 'Precision Measured', description: 'Every shelf system is custom-measured to fit your exact garage dimensions, maximizing every inch of available space.' },
      { title: 'Heavy-Duty Materials', description: 'Industrial-grade steel brackets and premium shelving rated for serious weight — tools, bins, and equipment.' },
      { title: 'Modular Design', description: 'Configurable layouts that adapt as your storage needs change. Add, remove, or rearrange sections anytime.' },
      { title: 'Professional Install', description: 'Wall-anchored and floor-secured installations that won\'t sag, shift, or collapse. Built to last decades.' },
    ],
    benefits: [
      'Free up floor space for vehicles and workstations',
      'Eliminate clutter with designated zones for every category',
      'Wall-mounted systems keep items off the ground',
      'Overhead ceiling racks for seasonal and bulk storage',
      'Custom workbench integration available',
      'Free consultation — we design it with you',
    ],
    faqs: [
      { question: 'How much does custom garage shelving cost in Austin?', answer: 'Custom garage shelving systems typically range from $500 to $2,500 depending on the size of your garage, materials chosen, and complexity of the design. We provide a free consultation and written quote before any work begins.' },
      { question: 'How long does custom shelving installation take?', answer: 'Most installations are completed in a single visit, typically 4-8 hours depending on the scope. We arrive with all materials pre-cut and ready to install.' },
      { question: 'Can you install shelving in an already-cluttered garage?', answer: 'Yes — we offer a cleanout + shelving combo package. We clear the space first, then design and install your custom storage system in the same week.' },
      { question: 'What weight can custom garage shelving hold?', answer: 'Our industrial-grade wall-mounted systems are rated for 200-500 lbs per shelf depending on the bracket type and wall construction. We use lag bolts into studs for maximum strength.' },
    ],
  },
  {
    slug: 'overhead-garage-storage',
    category: 'storage',
    title: 'Overhead Garage Storage Installation in Austin, TX',
    metaTitle: 'Overhead Garage Storage Austin TX | Ceiling Rack Install | Garage Recovery Solutions',
    metaDescription: 'Overhead garage storage installation in Austin, TX. Ceiling-mounted racks and platforms that reclaim floor space. Professional install, rated for 600+ lbs.',
    heroImage: '/custom-shelving-hero.png',
    serviceType: 'Overhead Garage Storage Installation',
    description: 'Ceiling-mounted storage racks and platforms that reclaim valuable floor space. Professional installation with heavy-duty hardware rated for 600+ lbs. Perfect for seasonal items, holiday decorations, luggage, and bulk storage.',
    detailHeading: 'Unlock Your Garage Ceiling',
    detailContent: 'Most garages have 3-5 feet of unused vertical space between the top of your car and the ceiling. Our overhead storage systems turn this dead zone into organized, accessible storage. We install ceiling-mounted platforms with adjustable height, ensuring your vehicles still fit comfortably while you gain hundreds of cubic feet of storage above.',
    features: [
      { title: 'Ceiling-Mounted Platforms', description: 'Heavy-duty steel platforms mounted directly to ceiling joists. Adjustable drop height from 24" to 45".' },
      { title: '600+ lb Capacity', description: 'Each 4\'x8\' platform supports up to 600 lbs of evenly distributed weight — bins, holiday decor, luggage, and more.' },
      { title: 'Adjustable Height', description: 'Racks can be raised or lowered to accommodate vehicles, ladders, and tall equipment stored underneath.' },
      { title: 'Joist-Secured', description: 'All hardware is lag-bolted into ceiling joists — not drywall. Engineered for safety with no risk of pull-out.' },
    ],
    benefits: [
      'Reclaim floor space without removing a single item from your garage',
      'Perfect for seasonal decorations, luggage, and bulk storage',
      'Vehicles still fit comfortably underneath',
      'Accessible via ladder — no climbing or acrobatics required',
      'Professional install in 2-4 hours',
      'Multiple platforms can be installed for full-ceiling coverage',
    ],
    faqs: [
      { question: 'How much weight can overhead garage storage hold?', answer: 'Our ceiling-mounted platforms are rated for 600 lbs per 4\'x8\' unit when properly installed into ceiling joists. We verify joist spacing and condition before every installation.' },
      { question: 'Will overhead storage work with my garage door opener?', answer: 'Yes. We carefully plan the platform placement to avoid interference with your garage door opener rail, safety sensors, and light fixtures. We work around existing equipment.' },
      { question: 'How much does overhead garage storage installation cost in Austin?', answer: 'A single 4\'x8\' overhead platform typically costs $350-$600 installed. Most homeowners install 2-3 platforms for full coverage, ranging from $700 to $1,800 total.' },
      { question: 'Can I install overhead storage in a garage with low ceilings?', answer: 'Overhead storage works best in garages with 9-foot or higher ceilings. For standard 8-foot ceilings, we can install shallow platforms (12-18" drop) for flat items like holiday decorations and luggage.' },
    ],
  },
  {
    slug: 'garage-bike-sports-storage',
    category: 'storage',
    title: 'Garage Bike & Sports Gear Storage in Austin, TX',
    metaTitle: 'Garage Bike & Sports Storage Austin TX | Wall-Mount Racks | Garage Recovery Solutions',
    metaDescription: 'Garage bike and sports gear storage solutions in Austin, TX. Wall-mount bike racks, ceiling hoists, and zone organization for equipment. Professional installation.',
    heroImage: '/custom-shelving-hero.png',
    serviceType: 'Garage Sports Equipment Storage',
    description: 'Wall-mount bike racks, ceiling hoists, ball cages, and zone-based organization systems for sports and outdoor equipment. Stop tripping over bikes and gear — get everything off the floor and organized.',
    detailHeading: 'Organized Gear, Accessible Anytime',
    detailContent: 'Austin\'s outdoor lifestyle means garages fill up fast with bikes, kayaks, golf clubs, camping gear, and sports equipment. Our storage solutions use vertical wall space and ceiling zones to get everything off the floor while keeping it accessible. Bike hooks with tire trays, ceiling-mounted kayak hoists, ball cages, and dedicated gear zones mean every piece of equipment has a home.',
    features: [
      { title: 'Wall-Mount Bike Racks', description: 'Vertical and horizontal bike hooks with tire trays that protect walls and floors. Holds road, mountain, and kids\' bikes.' },
      { title: 'Ceiling Hoists', description: 'Pulley-based ceiling hoists for kayaks, canoes, surfboards, and large seasonal items. Easy one-person operation.' },
      { title: 'Ball & Gear Cages', description: 'Wire-basket wall cages for basketballs, soccer balls, helmets, and loose sports accessories.' },
      { title: 'Zone Organization', description: 'Dedicated zones for each sport or activity — cycling, golf, camping, water sports — so everything has a home.' },
    ],
    benefits: [
      'Get bikes off the floor and out of the way',
      'Ceiling hoists for kayaks, paddleboards, and canoes',
      'Ball cages prevent loose gear from rolling around',
      'Dedicated activity zones for quick grab-and-go access',
      'Protects expensive equipment from damage and scratches',
      'Professional installation in 2-4 hours',
    ],
    faqs: [
      { question: 'What is the best way to store bikes in a garage?', answer: 'Wall-mounted vertical bike hooks are the most space-efficient option. They keep bikes off the floor, protect tires and frames, and work for road, mountain, and kids\' bikes. We install hooks with tire trays to prevent wall scuffs.' },
      { question: 'Can you install ceiling storage for kayaks in a garage?', answer: 'Yes. We install pulley-based ceiling hoists that let one person raise and lower a kayak, canoe, or paddleboard. The hoist mounts into ceiling joists and supports up to 125 lbs.' },
      { question: 'How much does garage sports storage installation cost?', answer: 'A basic bike rack setup (4 bikes) starts around $200-$400 installed. Full zone systems with bike racks, ceiling hoists, and gear cages typically range from $500-$1,500 depending on scope.' },
      { question: 'Do you install storage for golf bags and clubs?', answer: 'Yes. We install wall-mounted golf bag racks and club organizers that keep bags upright and accessible. Many homeowners combine this with a dedicated sports zone for all their equipment.' },
    ],
  },

  // ─── DOORS & OPENERS ──────────────────────────────────────────
  {
    slug: 'garage-door-repair',
    category: 'doors',
    title: 'Garage Door Repair & Maintenance in Austin, TX',
    metaTitle: 'Garage Door Repair Austin TX | Springs, Cables, Panels | Garage Recovery Solutions',
    metaDescription: 'Professional garage door repair in Austin & Jarrell, TX. Spring replacement, cable repair, panel replacement, track alignment & full maintenance. Same-week service.',
    heroImage: '/garage-door-repair-hero.png',
    serviceType: 'Garage Door Repair Service',
    description: 'From broken springs to bent tracks, we repair and replace all garage door components with quality parts and professional installation. Fast diagnosis, transparent quoting, and same-week scheduling for most repairs.',
    detailHeading: 'Expert Garage Door Repair You Can Trust',
    detailContent: 'A malfunctioning garage door is more than an inconvenience — it\'s a safety hazard. Our certified technicians diagnose the issue on-site, provide a transparent quote before any work begins, and complete most repairs in a single visit. We carry common parts like springs, cables, rollers, and hinges on our truck for immediate replacement.',
    features: [
      { title: 'Same-Week Service', description: 'Fast scheduling for most repairs. We show up on time, diagnose quickly, and fix it right the first time.' },
      { title: 'Quality Parts', description: 'Industry-rated springs, cables, and hardware — no cheap substitutes that fail in six months.' },
      { title: 'Full Diagnostics', description: 'Complete door system inspection including springs, cables, tracks, rollers, and safety sensors.' },
      { title: 'Transparent Pricing', description: 'You get a written quote before any work starts. No surprise charges, no hourly billing traps.' },
    ],
    benefits: [
      'Broken spring replacement (torsion & extension)',
      'Cable repair and re-spooling',
      'Panel replacement and realignment',
      'Track straightening and lubrication',
      'Roller and hinge replacement',
      'Weatherstripping and seal installation',
      'Safety sensor alignment and testing',
      'Full door replacement and new installation',
    ],
    faqs: [
      { question: 'How much does garage door repair cost in Austin, TX?', answer: 'Common repairs like roller replacement or track alignment typically run $150-$300. Spring replacement ranges from $200-$400 for a single spring or $300-$500 for a double-spring system. We provide an exact quote on-site before starting any work.' },
      { question: 'How do I know if my garage door spring is broken?', answer: 'Signs of a broken spring include: the door won\'t open, it opens only a few inches then stops, you hear a loud bang from the garage, or there is a visible gap in the torsion spring above the door. Never attempt to operate a door with a broken spring.' },
      { question: 'Can you repair a garage door the same day?', answer: 'We offer same-week scheduling, and many repairs are completed in a single visit lasting 1-2 hours. For emergency situations (door stuck open, security risk), we prioritize same-day or next-day service when possible.' },
      { question: 'Should I repair or replace my garage door?', answer: 'If repair costs exceed 50% of a new door\'s price, or if your door is 15+ years old with multiple failing components, replacement is usually the better investment. We\'ll give you an honest recommendation based on the door\'s condition.' },
    ],
  },
  {
    slug: 'garage-door-opener-installation',
    category: 'doors',
    title: 'Smart Garage Door Opener Installation in Austin, TX',
    metaTitle: 'Garage Door Opener Installation Austin TX | Smart & Wi-Fi | Garage Recovery Solutions',
    metaDescription: 'Smart garage door opener installation in Austin, TX. Chain drive, belt drive & wall-mount options. Wi-Fi connectivity, safety sensors & professional setup.',
    heroImage: '/auto-opener-hero.png',
    serviceType: 'Garage Door Opener Installation',
    description: 'Modern automatic garage door openers with smart connectivity, safety sensors, and whisper-quiet operation. We supply, install, and program your new opener — chain drive, belt drive, or wall-mount options available.',
    detailHeading: 'Upgrade to a Smart Garage Door Opener',
    detailContent: 'Today\'s garage door openers do more than just open and close — they connect to your phone, alert you when the door is left open, integrate with smart home systems, and feature battery backup for power outages. We help you choose the right type (chain, belt, or wall-mount), handle complete installation including wiring and safety sensor calibration, and program all remotes and smart features.',
    features: [
      { title: 'Smart Connectivity', description: 'Wi-Fi enabled openers let you monitor and control your garage door from anywhere via smartphone app.' },
      { title: 'Whisper-Quiet', description: 'Belt-drive and DC motor options run near-silently — ideal for attached garages with bedrooms above.' },
      { title: 'Enhanced Safety', description: 'Auto-reverse sensors, rolling security codes, and motion-activated LED lighting keep your family safe.' },
      { title: 'Battery Backup', description: 'Select models include battery backup so your garage door works even during Texas power outages.' },
    ],
    benefits: [
      'Professional removal of old opener (if applicable)',
      'New opener unit installation and wiring',
      'Safety sensor setup and calibration',
      'Remote controls and wall button programming',
      'Smart home / Wi-Fi integration setup',
      'Full safety test and walkthrough with homeowner',
      'Cleanup — we leave it cleaner than we found it',
    ],
    faqs: [
      { question: 'How much does a garage door opener installation cost in Austin?', answer: 'A new garage door opener installation typically costs $350-$700 depending on the opener type (chain drive is most affordable, belt drive is mid-range, wall-mount is premium). This includes the opener unit, installation, programming, and safety sensor setup.' },
      { question: 'What type of garage door opener is best?', answer: 'Belt-drive openers are the most popular choice for attached garages because they\'re whisper-quiet. Chain-drive openers are the most affordable and durable, ideal for detached garages. Wall-mount openers save ceiling space and offer the sleekest look.' },
      { question: 'Can you install a smart garage door opener?', answer: 'Yes. We install Wi-Fi enabled openers from leading brands that connect to your smartphone, integrate with Google Home, Amazon Alexa, and Apple HomeKit, and send alerts when the door is left open.' },
      { question: 'How long does garage door opener installation take?', answer: 'A standard installation takes 2-3 hours. If we\'re removing an old opener first, add about 30 minutes. We handle all wiring, mounting, sensor alignment, and programming in a single visit.' },
    ],
  },
  {
    slug: 'garage-spring-replacement',
    category: 'doors',
    title: 'Garage Door Spring Replacement in Austin, TX',
    metaTitle: 'Garage Door Spring Replacement Austin TX | Torsion & Extension | Garage Recovery Solutions',
    metaDescription: 'Garage door spring replacement in Austin & Jarrell, TX. Torsion and extension spring repair by certified technicians. Same-week service, quality parts, transparent pricing.',
    heroImage: '/garage-door-repair-hero.png',
    serviceType: 'Garage Door Spring Replacement',
    description: 'Certified torsion and extension spring replacement for residential garage doors. Broken springs are the #1 cause of garage door failure — and a serious safety hazard. Our technicians replace springs with high-cycle, industrial-rated parts and re-balance your entire door system.',
    detailHeading: 'Why Garage Door Springs Break — And What to Do',
    detailContent: 'Garage door springs are under immense tension and have a finite lifespan (typically 10,000-15,000 cycles). When a spring breaks, the door becomes extremely heavy and dangerous to operate manually. Never attempt to replace a garage door spring yourself — the stored energy can cause serious injury. Our certified technicians safely release tension, remove the failed spring, install a new high-cycle replacement, and re-balance the entire door system for smooth, safe operation.',
    features: [
      { title: 'Torsion Springs', description: 'Located above the door on a metal shaft. We replace single and double torsion spring systems with high-cycle rated springs.' },
      { title: 'Extension Springs', description: 'Located along the horizontal tracks. We replace worn extension springs and install safety cables to prevent whip-back.' },
      { title: 'High-Cycle Parts', description: 'Our replacement springs are rated for 25,000-50,000 cycles — 2-5x the lifespan of standard builder-grade springs.' },
      { title: 'Full Rebalance', description: 'After spring replacement, we rebalance the door, lubricate all moving parts, and test safety reverse mechanisms.' },
    ],
    benefits: [
      'Certified technicians — never DIY spring replacement',
      'High-cycle springs rated for 25,000-50,000 cycles',
      'Safety cables installed on all extension spring systems',
      'Full door rebalance and lubrication included',
      'Same-week scheduling, most jobs done in 1-2 hours',
      'Written warranty on parts and labor',
    ],
    faqs: [
      { question: 'How much does it cost to replace a garage door spring in Austin, TX?', answer: 'A single torsion spring replacement typically costs $200-$350 including parts and labor. Double torsion spring replacement (recommended — both springs should be replaced together) costs $300-$500. Extension spring replacement runs $150-$300 per spring.' },
      { question: 'How do I know if my garage door spring is broken?', answer: 'Common signs include: a loud bang from the garage (the spring snapping), the door won\'t open or only opens a few inches, visible gap or separation in the torsion spring coil above the door, or the door feels extremely heavy when lifted manually.' },
      { question: 'Can I replace a garage door spring myself?', answer: 'No — this is extremely dangerous. Garage door springs are under hundreds of pounds of tension. An improperly released or installed spring can cause severe injury or death. Always hire a certified technician for spring replacement.' },
      { question: 'Should I replace both garage door springs at the same time?', answer: 'Yes. If one spring has broken, the other spring is likely near the end of its lifespan too. Replacing both springs at once ensures balanced door operation and saves you from paying for a second service call in a few months.' },
    ],
  },

  // ─── CONVERSIONS ──────────────────────────────────────────────
  {
    slug: 'garage-floor-coating',
    category: 'specialty',
    title: 'Garage Floor Prep & Epoxy Coating in Austin, TX',
    metaTitle: 'Garage Floor Epoxy Coating Austin TX | Prep & Install | Garage Recovery Solutions',
    metaDescription: 'Garage floor prep and epoxy coating in Austin, TX. Surface grinding, crack repair, and professional-grade polyaspartic or epoxy floor systems. Transforms stained concrete.',
    heroImage: '/clean-out-hero.png',
    serviceType: 'Garage Floor Coating Service',
    description: 'Professional garage floor preparation and coating — from diamond grinding to crack repair to multi-layer epoxy or polyaspartic floor systems. Transforms stained, cracked concrete into a showroom-quality finish.',
    detailHeading: 'The Foundation of a Great Garage',
    detailContent: 'Your garage floor takes more abuse than any other surface in your home — oil stains, tire marks, hot tire pickup, road salt, and moisture. Our floor coating process starts with industrial diamond grinding to profile the concrete for maximum adhesion, followed by crack and divot repair, then a multi-layer coating system (epoxy or polyaspartic) with decorative flake broadcast and UV-stable clear coat. The result is a surface that resists chemicals, stains, abrasion, and looks incredible for years.',
    features: [
      { title: 'Diamond Grinding', description: 'Industrial surface preparation creates the ideal profile for coating adhesion. No shortcuts, no acid etching.' },
      { title: 'Crack Repair', description: 'All cracks, divots, and spalling are filled and leveled before coating application for a smooth, seamless finish.' },
      { title: 'Multi-Layer System', description: 'Base coat, decorative flake broadcast, and UV-stable clear topcoat for maximum durability and an upscale look.' },
      { title: 'Chemical Resistant', description: 'Resists oil, gasoline, brake fluid, road salt, and household chemicals. Wipes clean with a mop.' },
    ],
    benefits: [
      'Transforms stained, cracked concrete into a showroom finish',
      'Oil, chemical, and abrasion resistant surface',
      'Decorative flake options in dozens of color combinations',
      'UV-stable topcoat prevents yellowing and peeling',
      'Easier to clean than bare concrete — just mop and go',
      'Increases home value and curb appeal',
    ],
    faqs: [
      { question: 'How much does garage floor coating cost in Austin, TX?', answer: 'Professional garage floor coating ranges from $1,500-$3,500 for a standard 2-car garage depending on the coating system (epoxy vs. polyaspartic), condition of the existing concrete, and decorative options chosen. We provide an in-person estimate.' },
      { question: 'What is the difference between epoxy and polyaspartic garage floor coating?', answer: 'Epoxy is the most popular and affordable option with excellent durability. Polyaspartic coatings cure faster (often same-day return to use), are more UV-stable, and offer superior flexibility in temperature extremes — ideal for Texas heat.' },
      { question: 'How long does garage floor coating take?', answer: 'Epoxy systems typically require 2-3 days (1 day prep, 1 day coating, 1 day cure). Polyaspartic systems can often be completed and ready for foot traffic in 1 day, with full vehicle traffic in 24 hours.' },
      { question: 'Can you coat a garage floor with existing stains and cracks?', answer: 'Yes. Our prep process includes industrial diamond grinding that removes surface stains and oil contamination, plus crack and divot repair. Severe oil saturation may require additional treatment, which we assess during the estimate.' },
    ],
  },
  {
    slug: 'garage-man-cave-design',
    category: 'conversions',
    title: 'Garage Man Cave Design & Build in Austin, TX',
    metaTitle: 'Garage Man Cave Design Austin TX | Full Build-Out | Garage Recovery Solutions',
    metaDescription: 'Garage man cave design and build in Austin, TX. Full conversion with HVAC, flooring, entertainment systems & custom finishes. From cluttered garage to dream space.',
    heroImage: '/images/garage_corvette.png',
    serviceType: 'Garage Man Cave Conversion',
    description: 'Full garage-to-man-cave conversion — from initial cleanout and design to flooring, HVAC, electrical, and custom finishes. We transform cluttered garages into the ultimate entertainment, lounge, or hobby space.',
    detailHeading: 'Your Dream Space, Built by Experts',
    detailContent: 'A garage man cave is more than a TV and a couch — it\'s a dedicated space designed around your lifestyle. Whether you want a sports lounge with a theater setup, a whiskey bar with ambient lighting, a gaming den with surround sound, or a cigar lounge with proper ventilation, we handle the entire build from cleanout to final walkthrough. Our design process starts with understanding how you want to use the space, then we create a custom plan covering flooring, walls, HVAC, electrical, lighting, and furnishing layout.',
    features: [
      { title: 'Full Design Service', description: 'We design the layout around your vision — sports lounge, bar, gaming den, theater, or multi-use entertainment space.' },
      { title: 'Climate Control', description: 'Mini-split HVAC installation for year-round comfort. No more sweating in summer or freezing in winter.' },
      { title: 'Electrical & Lighting', description: 'Dedicated circuits for TVs, sound systems, gaming setups, and ambient lighting. Smart controls optional.' },
      { title: 'Premium Finishes', description: 'Epoxy or LVP flooring, wall paneling, insulation, soundproofing, and custom bar builds available.' },
    ],
    benefits: [
      'Complete cleanout-to-build service — we handle everything',
      'Custom design consultation included at no extra charge',
      'HVAC, electrical, and insulation for year-round comfort',
      'Premium flooring options (epoxy, LVP, rubber)',
      'Bar, theater, gaming, and lounge configurations',
      'Reversible designs that preserve garage resale flexibility',
    ],
    faqs: [
      { question: 'How much does it cost to turn a garage into a man cave in Austin, TX?', answer: 'A garage man cave conversion in Austin typically ranges from $3,000 for a basic setup (TV, seating, mini-fridge) to $15,000+ for a full custom build with HVAC, bar, epoxy flooring, and entertainment systems. We provide free consultations with an exact quote.' },
      { question: 'Do you need a permit to convert a garage into a man cave in Texas?', answer: 'Cosmetic changes (paint, flooring, furniture) typically don\'t require a permit. If you\'re adding electrical circuits, HVAC, plumbing, or changing the structure, a permit from the City of Austin or Williamson County may be required. We handle all permitting coordination.' },
      { question: 'Will converting my garage hurt my home\'s resale value?', answer: 'Not if done right. Our man cave designs are reversible — the space can be returned to standard garage function if needed. A well-designed, climate-controlled bonus room can actually increase home appeal.' },
      { question: 'How long does a garage man cave build take?', answer: 'A basic setup can be completed in 1-2 days. A full custom build with flooring, walls, HVAC, and electrical typically takes 1-3 weeks depending on scope. We provide a detailed timeline during your free consultation.' },
    ],
  },
  {
    slug: 'garage-home-gym-conversion',
    category: 'conversions',
    title: 'Garage Home Gym Conversion in Austin, TX',
    metaTitle: 'Garage Home Gym Conversion Austin TX | Flooring & Build-Out | Garage Recovery Solutions',
    metaDescription: 'Garage-to-home-gym conversion in Austin, TX. Rubber flooring, equipment layout, ventilation, mirrors & climate control. Professional build-out for your workout space.',
    heroImage: '/images/garage_gym.png',
    serviceType: 'Garage Home Gym Conversion',
    description: 'Transform your garage into a fully functional home gym. Rubber flooring, equipment layout planning, ventilation, mirrors, climate control, and storage for weights and accessories — all designed for safe, effective workouts.',
    detailHeading: 'Build Your Ultimate Home Gym',
    detailContent: 'Austin\'s fitness culture meets garage conversion expertise. We transform garages into workout spaces with proper rubber flooring rated for heavy drops, reinforced wall-mount racks for pull-up bars and suspension trainers, ventilation for Texas heat, and layout planning that maximizes your equipment footprint. Whether you\'re building a CrossFit box, a powerlifting platform, a yoga studio, or a general fitness space, we design and build it to perform.',
    features: [
      { title: 'Rubber Flooring', description: 'Commercial-grade rubber tiles or rolled flooring rated for heavy weights, cardio equipment, and high-impact drops.' },
      { title: 'Equipment Layout', description: 'Professional space planning to maximize equipment placement, traffic flow, and safety clearances.' },
      { title: 'Climate Control', description: 'Ventilation fans, mini-split AC, or evaporative coolers to keep your workout space comfortable year-round.' },
      { title: 'Wall Systems', description: 'Reinforced walls for pull-up bars, TRX anchors, wall-mounted mirrors, and pegboard storage for accessories.' },
    ],
    benefits: [
      'Commercial-grade rubber flooring that handles heavy drops',
      'Layout planning for squat racks, benches, and cardio machines',
      'Climate control for year-round training comfort',
      'Full-wall mirrors for form checking',
      'Accessory storage — dumbbells, bands, mats, and more',
      'Sound system and TV mounting available',
    ],
    faqs: [
      { question: 'How much does a garage gym conversion cost in Austin?', answer: 'A basic garage gym conversion (rubber flooring, mirrors, ventilation) typically costs $2,000-$5,000. A full build-out with climate control, reinforced walls, equipment storage, and premium flooring runs $5,000-$12,000 depending on scope.' },
      { question: 'What is the best flooring for a garage gym?', answer: 'Commercial-grade rubber tiles (3/4" thick) are the gold standard — they absorb impact from dropped weights, protect your concrete floor, reduce noise, and provide stable footing. We install interlocking rubber tile systems or rolled rubber depending on your preference.' },
      { question: 'Do I need ventilation for a garage gym in Austin?', answer: 'Absolutely. Texas summers make unventilated garages dangerous for workouts. At minimum, we recommend a high-volume wall fan. For year-round comfort, a mini-split HVAC system is the best investment.' },
      { question: 'Can you build a CrossFit-style gym in a garage?', answer: 'Yes. We install pull-up rigs, wall-ball targets, reinforced flooring for Olympic lifts, and rope climb anchors. We also ensure adequate ceiling height clearance and ventilation for high-intensity training.' },
    ],
  },
  {
    slug: 'garage-workshop-buildout',
    category: 'conversions',
    title: 'Garage Workshop Build-Out in Austin, TX',
    metaTitle: 'Garage Workshop Build-Out Austin TX | Workbench & Tool Storage | Garage Recovery Solutions',
    metaDescription: 'Garage workshop build-out in Austin, TX. Custom workbenches, tool walls, electrical circuits, dust collection & shop lighting. Built for woodworkers, mechanics & hobbyists.',
    heroImage: '/images/garage_motorcycle_workshop.png',
    serviceType: 'Garage Workshop Build-Out',
    description: 'Custom garage workshop build-out for woodworkers, mechanics, and hobbyists. Heavy-duty workbenches, pegboard and French cleat tool walls, dedicated electrical circuits, dust collection prep, and shop-grade lighting.',
    detailHeading: 'Built to Work, Designed to Inspire',
    detailContent: 'A great workshop starts with proper infrastructure. We build garages into functional shops with heavy-duty workbenches anchored to walls and floors, French cleat or pegboard tool walls sized to your collection, dedicated 20-amp circuits for power tools, LED shop lighting in the 5000K range for accurate color rendering, and dust collection ducting for table saws and planers. Whether you\'re a weekend woodworker or a serious mechanic, we build the shop around how you actually work.',
    features: [
      { title: 'Custom Workbenches', description: 'Heavy-duty workbenches with integrated vises, power strips, and built-in storage. Anchored for stability under heavy loads.' },
      { title: 'Tool Wall Systems', description: 'French cleat or pegboard systems for organized, accessible tool storage. Customized to your exact tool collection.' },
      { title: 'Dedicated Electrical', description: '20-amp dedicated circuits for table saws, air compressors, welders, and other high-draw power tools. GFCI protected.' },
      { title: 'Shop Lighting', description: '5000K LED shop lights for daylight-accurate illumination. Positioned to eliminate shadows at workbench height.' },
    ],
    benefits: [
      'Heavy-duty workbenches with integrated storage and power',
      'French cleat or pegboard tool walls — customized to your tools',
      'Dedicated 20-amp electrical circuits for power tools',
      'LED shop lighting at 5000K for accurate color and detail',
      'Dust collection ducting prep for table saws and planers',
      'Air compressor line routing available',
    ],
    faqs: [
      { question: 'How much does a garage workshop build-out cost in Austin?', answer: 'A basic workshop setup (workbench, tool wall, shop lights) runs $1,500-$3,500. A full build-out with dedicated electrical, dust collection ducting, and premium workbenches costs $4,000-$10,000 depending on scope and materials.' },
      { question: 'Do I need a dedicated circuit for my table saw?', answer: 'Yes. Most table saws draw 12-15 amps and should be on their own dedicated 20-amp circuit. Sharing a circuit with other tools risks tripping breakers mid-cut. We install dedicated circuits with GFCI protection for safety.' },
      { question: 'What is the best workbench height for a garage workshop?', answer: 'Standard workbench height is 34-36 inches, but the ideal height depends on your own height and work type. For detailed work (electronics, model building), slightly higher is better. For heavy work (planing, assembly), lower is more ergonomic. We customize to your preference.' },
      { question: 'Can you install dust collection in a garage workshop?', answer: 'We install ducting and blast gates for dust collection systems. We route 4" ductwork from your dust collector to table saws, planers, jointers, and routers. The dust collector unit itself is typically purchased separately.' },
    ],
  },

  // ─── SPECIALTY ─────────────────────────────────────────────────
  {
    slug: 'garage-document-shredding',
    category: 'specialty',
    title: 'Secure Garage Document Shredding in Austin, TX',
    metaTitle: 'Garage Document Shredding Austin TX | On-Site Secure Destruction | Garage Recovery Solutions',
    metaDescription: 'Secure garage document shredding in Austin, TX. On-site cross-cut destruction of sensitive papers, tax records & financial documents. Certificate of destruction available.',
    heroImage: '/cross-shredder.png',
    serviceType: 'Secure Document Shredding',
    description: 'On-site and scheduled secure document destruction for homeowners clearing garages full of old tax records, financial statements, medical files, and sensitive personal documents. Cross-cut shredding with certificate of destruction available.',
    detailHeading: 'Your Privacy, Professionally Protected',
    detailContent: 'Years of accumulated paperwork — tax returns, bank statements, medical records, old business files — pile up in garage boxes and filing cabinets. Simply throwing these in the trash puts you at risk for identity theft. Our secure shredding service processes documents on-site using industrial cross-cut shredders. All shredded material is transported to a certified recycling facility. We provide a signed certificate of destruction for your records.',
    features: [
      { title: 'On-Site Shredding', description: 'Industrial cross-cut shredding performed at your property. Documents never leave your sight unsecured.' },
      { title: 'Complete Destruction', description: 'Cross-cut shredding produces confetti-sized particles that cannot be reconstructed. Exceeds NIST security standards.' },
      { title: 'Certificate Provided', description: 'Signed certificate of destruction provided for your records, meeting IRS and compliance documentation requirements.' },
      { title: 'Eco-Friendly Recycling', description: 'All shredded material is transported to a certified paper recycling facility. Zero landfill waste.' },
    ],
    benefits: [
      'On-site destruction — documents never leave your property unsecured',
      'Cross-cut shredding exceeds security standards',
      'Certificate of destruction for tax and compliance records',
      'All shredded material recycled — zero landfill',
      'Perfect companion to garage cleanout service',
      'Handles boxes, filing cabinets, and bulk paper volumes',
    ],
    faqs: [
      { question: 'How much does garage document shredding cost in Austin?', answer: 'Document shredding is included at no extra charge with any garage cleanout service. Standalone shredding service starts at $75 for up to 3 banker\'s boxes, with additional boxes at $15-$25 each depending on volume.' },
      { question: 'How long should I keep tax records before shredding?', answer: 'The IRS recommends keeping tax records for 3-7 years depending on the type. After that period, secure shredding is the safest way to dispose of them. We can help you determine what\'s safe to shred during the service.' },
      { question: 'Is on-site shredding more secure than drop-off services?', answer: 'Yes. With on-site shredding, your documents are destroyed at your property and you can watch the entire process. Drop-off services transport your intact documents to a facility, introducing chain-of-custody risks.' },
      { question: 'Do you shred hard drives and electronic media?', answer: 'We focus on paper document shredding. For hard drives, USB drives, and electronic media, we can coordinate with a certified e-waste destruction partner and include it as part of a full garage cleanout.' },
    ],
  },
  {
    slug: 'pre-sale-garage-staging',
    category: 'specialty',
    title: 'Pre-Sale Garage Staging & Decluttering in Austin, TX',
    metaTitle: 'Pre-Sale Garage Staging Austin TX | Real Estate Prep | Garage Recovery Solutions',
    metaDescription: 'Pre-sale garage staging and decluttering in Austin, TX. Professional clearing, cleaning & staging to maximize your home listing photos and buyer appeal.',
    heroImage: '/images/garage_professional.png',
    serviceType: 'Pre-Sale Garage Staging',
    description: 'Professional garage clearing, cleaning, and staging for homeowners preparing to sell. A clean, organized garage dramatically improves listing photos, buyer first impressions, and perceived home value. We work with your realtor\'s timeline.',
    detailHeading: 'First Impressions Start in the Garage',
    detailContent: 'In Austin\'s competitive real estate market, every detail matters. Buyers open the garage door and make snap judgments about the entire home. A cluttered, stained garage signals deferred maintenance. A clean, organized garage signals pride of ownership. Our pre-sale staging service clears clutter, deep-cleans the floor, adds minimal staging elements, and coordinates with your real estate agent for listing photo timing. The ROI on a staged garage is typically 3-5x the cost of the service.',
    features: [
      { title: 'Full Clearing', description: 'Remove all personal items, boxes, and clutter. Coordinate off-site storage or donation for items the homeowner wants to keep.' },
      { title: 'Deep Clean', description: 'Pressure-wash floor, clean walls and shelving, remove cobwebs and dust. Eliminate stains and odors.' },
      { title: 'Minimal Staging', description: 'Clean shelving, organized storage bins, and strategic placement to show the space\'s potential and storage capacity.' },
      { title: 'Photo-Ready', description: 'Coordinated timing with your real estate agent to ensure the garage is move-in-ready for listing photography.' },
    ],
    benefits: [
      'Dramatically improve listing photos and buyer appeal',
      'Show buyers the garage\'s full size and potential',
      'Coordinate with your realtor\'s photography schedule',
      'Donation and storage routing for personal items',
      'ROI of 3-5x the service cost on average',
      'Same-week turnaround to meet listing deadlines',
    ],
    faqs: [
      { question: 'How much does pre-sale garage staging cost in Austin?', answer: 'Pre-sale garage staging typically costs $400-$900 depending on the volume of items to remove and the level of deep-cleaning required. This often pays for itself many times over through faster sales and stronger offers.' },
      { question: 'How quickly can you stage a garage before listing?', answer: 'Most pre-sale staging projects can be completed within 2-3 business days of initial contact. Rush service is available for same-week listings. We coordinate directly with your real estate agent.' },
      { question: 'Does a staged garage really help sell a home?', answer: 'Yes. According to the National Association of Realtors, 81% of buyers say a clean, organized garage positively influences their offer. In Austin\'s competitive market, a staged garage helps homes sell faster and for closer to asking price.' },
      { question: 'What happens to my stuff during staging?', answer: 'Items you want to keep are packed and moved to a storage unit, your new home, or a family member\'s property. Items you want to donate are sorted and routed to local charities. Everything else is responsibly disposed of or recycled.' },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceEntity | undefined {
  return services.find(s => s.slug === slug);
}

export function getServicesByCategory(category: ServiceEntity['category']): ServiceEntity[] {
  return services.filter(s => s.category === category);
}
