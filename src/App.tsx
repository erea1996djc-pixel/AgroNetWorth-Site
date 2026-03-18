import { useState, useEffect, useRef, useLayoutEffect, createContext, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, MapPin, Droplets, Sun, Route, ChevronRight, 
  Phone, Mail, Building2, Globe, Leaf, Search,
  TrendingUp, CheckCircle, ChevronLeft, Wheat
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Language Context
interface LangContextType {
  lang: 'en' | 'es';
  setLang: (lang: 'en' | 'es') => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

const translations = {
  en: {
    // Navigation
    'nav.properties': 'Properties',
    'nav.agrology': 'Agrology',
    'nav.process': 'Process',
    'nav.contact': 'Contact',
    'nav.listings': 'View Listings',
    
    // Hero
    'hero.tagline': 'Venezuelan Agricultural Investments',
    'hero.title': 'Farm opportunities, mapped with science.',
    'hero.subtitle': 'We match investors with verified Venezuelan agricultural land—backed by comprehensive soil reports, climate data, and infrastructure analysis.',
    'hero.cta': 'Explore Farms',
    'hero.featured': 'Featured Opportunity',
    'hero.viewDetails': 'View details',
    
    // Stats
    'stats.acres': 'Hectares Listed',
    'stats.soil': 'Soil Samples',
    'stats.volume': 'Transaction Volume',
    'stats.tagline': 'Verified data. Transparent terms. Local expertise.',
    
    // About
    'about.title': 'About AgroNetWorth',
    'about.subtitle': 'We combine real estate expertise with agronomic data—so you don\'t invest blindly.',
    'about.team': 'Meet the team',
    
    // Agrology
    'agro.soil.title': 'Soil Quality',
    'agro.soil.desc': 'Texture, organic matter, drainage, and fertility mapped by zone.',
    'agro.climate.title': 'Climate Profile',
    'agro.climate.desc': 'Rainfall, frost risk, growing degree days, and microclimates.',
    'agro.water.title': 'Water & Irrigation',
    'agro.water.desc': 'Rights, source reliability, infrastructure, and seasonal availability.',
    
    // Infrastructure
    'infra.title': 'Access & Infrastructure',
    'infra.subtitle': 'We verify roads, power, internet, and proximity to markets so you can invest with confidence.',
    'infra.road': 'Road classification & all-weather access',
    'infra.power': 'Grid power & backup options',
    'infra.internet': 'Fiber / satellite connectivity',
    'infra.markets': 'Distance to processors & ports',
    'infra.cta': 'See how we evaluate land',
    
    // Process
    'process.title': 'Our Process',
    'process.step1': 'Define goals',
    'process.step2': 'Review verified reports',
    'process.step3': 'Visit with our agronomist',
    'process.step4': 'Close with clarity',
    'process.cta': 'Book a consultation',
    
    // Scale
    'scale.counties': 'States Covered',
    'scale.partners': 'Agronomic Partners',
    'scale.closing': 'Weeks Avg Closing',
    'scale.tagline': 'From first inquiry to keys—clear steps, real data.',
    
    // Services
    'serv.road.title': 'Road Access',
    'serv.road.desc': 'Paved, gravel, and easement status—documented.',
    'serv.energy.title': 'Energy & Utilities',
    'serv.energy.desc': 'Power capacity, transformer locations, and backup feasibility.',
    'serv.connect.title': 'Connectivity',
    'serv.connect.desc': 'Fiber routes, fixed wireless, and satellite coverage mapped.',
    
    // Contact
    'contact.title': 'Ready to evaluate your next farm?',
    'contact.subtitle': 'Tell us what you\'re looking for. We\'ll send a shortlist with verified agrology reports.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.office': 'Office',
    'contact.name': 'Name',
    'contact.budget': 'Budget Range',
    'contact.message': 'Message',
    'contact.placeholder.name': 'Your name',
    'contact.placeholder.email': 'your@email.com',
    'contact.placeholder.phone': '+1 (555) 000-0000',
    'contact.placeholder.message': 'Tell us about your ideal property...',
    'contact.cta': 'Request a consultation',
    'contact.budget.options': 'Select budget range,$500K - $1M,$1M - $3M,$3M - $5M,$5M+',
    
    // Footer
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.accessibility': 'Accessibility',
    'footer.rights': 'All rights reserved.',
    
    // Listings Page
    'listings.title': 'Verified Farm Listings',
    'listings.subtitle': 'Each property includes comprehensive agrological analysis and quality rating.',
    'listings.search': 'Search farms...',
    'listings.filter.all': 'All Types',
    'listings.filter.crops': 'Crops',
    'listings.filter.livestock': 'Livestock',
    'listings.filter.mixed': 'Mixed Use',
    'listings.hectares': 'hectares',
    'listings.location': 'Location',
    'listings.quality': 'Agro Quality',
    'listings.viewDetails': 'View Details',
    'listings.back': 'Back to Home',
    
    // Farm Details
    'farm.soil': 'Soil Analysis',
    'farm.climate': 'Climate Data',
    'farm.water': 'Water Rights',
    'farm.access': 'Road Access',
    'farm.infrastructure': 'Infrastructure',
    'farm.inquire': 'Inquire About This Farm',
  },
  es: {
    // Navigation
    'nav.properties': 'Propiedades',
    'nav.agrology': 'Agrología',
    'nav.process': 'Proceso',
    'nav.contact': 'Contacto',
    'nav.listings': 'Ver Propiedades',
    
    // Hero
    'hero.tagline': 'Inversiones Agrícolas Venezolanas',
    'hero.title': 'Oportunidades agrícolas, mapeadas con ciencia.',
    'hero.subtitle': 'Conectamos inversionistas con tierras agrícolas venezolanas verificadas—respaldadas por informes de suelo, datos climáticos y análisis de infraestructura.',
    'hero.cta': 'Explorar Fincas',
    'hero.featured': 'Oportunidad Destacada',
    'hero.viewDetails': 'Ver detalles',
    
    // Stats
    'stats.acres': 'Hectáreas Listadas',
    'stats.soil': 'Muestras de Suelo',
    'stats.volume': 'Volumen de Transacciones',
    'stats.tagline': 'Datos verificados. Términos transparentes. Experiencia local.',
    
    // About
    'about.title': 'Sobre AgroNetWorth',
    'about.subtitle': 'Combinamos experiencia inmobiliaria con datos agronómicos—para que no invierta a ciegas.',
    'about.team': 'Conozca el equipo',
    
    // Agrology
    'agro.soil.title': 'Calidad del Suelo',
    'agro.soil.desc': 'Textura, materia orgánica, drenaje y fertilidad mapeados por zona.',
    'agro.climate.title': 'Perfil Climático',
    'agro.climate.desc': 'Precipitación, riesgo de heladas, días de crecimiento y microclimas.',
    'agro.water.title': 'Agua y Riego',
    'agro.water.desc': 'Derechos, confiabilidad de fuentes, infraestructura y disponibilidad estacional.',
    
    // Infrastructure
    'infra.title': 'Acceso e Infraestructura',
    'infra.subtitle': 'Verificamos carreteras, energía, internet y proximidad a mercados para que invierta con confianza.',
    'infra.road': 'Clasificación vial y acceso todo tiempo',
    'infra.power': 'Energía de red y opciones de respaldo',
    'infra.internet': 'Conectividad fibra / satélite',
    'infra.markets': 'Distancia a procesadores y puertos',
    'infra.cta': 'Vea cómo evaluamos la tierra',
    
    // Process
    'process.title': 'Nuestro Proceso',
    'process.step1': 'Definir objetivos',
    'process.step2': 'Revisar informes verificados',
    'process.step3': 'Visitar con nuestro agrónomo',
    'process.step4': 'Cerrar con claridad',
    'process.cta': 'Reserve una consulta',
    
    // Scale
    'scale.counties': 'Estados Cubiertos',
    'scale.partners': 'Socios Agronómicos',
    'scale.closing': 'Semanas Promedio',
    'scale.tagline': 'Desde la primera consulta hasta las llaves—pasos claros, datos reales.',
    
    // Services
    'serv.road.title': 'Acceso Vial',
    'serv.road.desc': 'Pavimentado, ripio y estado de servidumbres—documentado.',
    'serv.energy.title': 'Energía y Servicios',
    'serv.energy.desc': 'Capacidad eléctrica, ubicación de transformadores y respaldo.',
    'serv.connect.title': 'Conectividad',
    'serv.connect.desc': 'Rutas de fibra, inalámbrico fijo y cobertura satelital mapeada.',
    
    // Contact
    'contact.title': '¿Listo para evaluar su próxima finca?',
    'contact.subtitle': 'Cuéntenos qué busca. Le enviaremos una lista con informes agrológicos verificados.',
    'contact.email': 'Correo',
    'contact.phone': 'Teléfono',
    'contact.office': 'Oficina',
    'contact.name': 'Nombre',
    'contact.budget': 'Rango de Presupuesto',
    'contact.message': 'Mensaje',
    'contact.placeholder.name': 'Su nombre',
    'contact.placeholder.email': 'su@correo.com',
    'contact.placeholder.phone': '+58 (000) 000-0000',
    'contact.placeholder.message': 'Cuéntenos sobre su propiedad ideal...',
    'contact.cta': 'Solicitar consulta',
    'contact.budget.options': 'Seleccione rango,$500K - $1M,$1M - $3M,$3M - $5M,$5M+',
    
    // Footer
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.accessibility': 'Accesibilidad',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Listings Page
    'listings.title': 'Propiedades Verificadas',
    'listings.subtitle': 'Cada propiedad incluye análisis agrológico completo y calificación de calidad.',
    'listings.search': 'Buscar fincas...',
    'listings.filter.all': 'Todos',
    'listings.filter.crops': 'Cultivos',
    'listings.filter.livestock': 'Ganado',
    'listings.filter.mixed': 'Mixto',
    'listings.hectares': 'hectáreas',
    'listings.location': 'Ubicación',
    'listings.quality': 'Calidad Agro',
    'listings.viewDetails': 'Ver Detalles',
    'listings.back': 'Volver al Inicio',
    
    // Farm Details
    'farm.soil': 'Análisis de Suelo',
    'farm.climate': 'Datos Climáticos',
    'farm.water': 'Derechos de Agua',
    'farm.access': 'Acceso Vial',
    'farm.infrastructure': 'Infraestructura',
    'farm.inquire': 'Consultar Sobre Esta Finca',
  }
};

// Language Provider
function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  
  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations.en] || key;
  };
  
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

// Corn Cob Rating Component
function CornRating({ rating, size = 20 }: { rating: number; size?: number }) {
  return (
    <div className="corn-rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <Wheat 
          key={i} 
          size={size} 
          className={i <= rating ? 'corn-icon' : 'corn-icon empty'}
          fill={i <= rating ? '#E5A823' : 'none'}
        />
      ))}
    </div>
  );
}

// Sample Farm Data
const sampleFarms = [
  {
    id: 1,
    name: 'Finca El Dorado',
    type: 'crops',
    hectares: 450,
    location: 'Barinas, Los Llanos',
    price: '$2,850,000',
    image: '/farm-coffee.jpg',
    rating: 5,
    description: 'Premium coffee plantation with established Arabica trees, optimal altitude, and direct export capabilities.',
    soil: 'Volcanic, pH 6.2, High organic matter',
    climate: '18-24°C, 1,800mm annual rainfall',
    water: '3 natural springs, irrigation rights',
    access: 'Paved road 2km, all-weather access',
    infrastructure: 'Processing facility, drying patios, worker housing'
  },
  {
    id: 2,
    name: 'Hacienda San Miguel',
    type: 'livestock',
    hectares: 1200,
    location: 'Guárico, Los Llanos',
    price: '$4,200,000',
    image: '/venezuela-ranch.jpg',
    rating: 4,
    description: 'Established cattle ranch with Brahman herd, rotational grazing system, and modern facilities.',
    soil: 'Alluvial, well-drained pastures',
    climate: '26-32°C, 1,400mm annual rainfall',
    water: '2 deep wells, 5 natural ponds',
    access: 'Gravel road, 15km to highway',
    infrastructure: 'Barns, corrals, veterinary station, staff quarters'
  },
  {
    id: 3,
    name: 'Finca Las Palmas',
    type: 'crops',
    hectares: 280,
    location: 'Aragua, Central Region',
    price: '$1,650,000',
    image: '/farm-avocado.jpg',
    rating: 5,
    description: 'High-yield Hass avocado orchard with drip irrigation and export-grade certification.',
    soil: 'Loamy, pH 6.5, excellent drainage',
    climate: '20-28°C, 1,200mm annual rainfall',
    water: 'Drip irrigation, 2 reservoirs',
    access: 'Paved access, 8km to processing plant',
    infrastructure: 'Packing house, cold storage, fertigation system'
  },
  {
    id: 4,
    name: 'Hacienda La Esperanza',
    type: 'mixed',
    hectares: 850,
    location: 'Portuguesa, Central-West',
    price: '$3,100,000',
    image: '/venezuela-corn.jpg',
    rating: 4,
    description: 'Diversified farm with corn, soybeans, and cattle. Excellent soil quality and mechanized operations.',
    soil: 'Fertile clay-loam, pH 6.8',
    climate: '24-30°C, 1,600mm annual rainfall',
    water: 'River frontage, pump irrigation',
    access: 'Paved highway frontage',
    infrastructure: 'Grain silos, machinery shed, housing'
  },
  {
    id: 5,
    name: 'Finca Cacao Real',
    type: 'crops',
    hectares: 180,
    location: 'Miranda, Coastal Range',
    price: '$980,000',
    image: '/venezuela-cocoa.jpg',
    rating: 5,
    description: 'Fine flavor cacao plantation with Criollo and Trinitario varieties. Organic certified.',
    soil: 'Rich volcanic, high organic content',
    climate: '22-28°C, 2,000mm annual rainfall',
    water: 'Natural springs, gravity irrigation',
    access: 'Improved gravel road',
    infrastructure: 'Fermentation boxes, drying facility'
  },
  {
    id: 6,
    name: 'Hacienda Los Andes',
    type: 'livestock',
    hectares: 650,
    location: 'Mérida, Andes',
    price: '$2,400,000',
    image: '/farm-dairy.jpg',
    rating: 4,
    description: 'Dairy operation with Brown Swiss herd, milking parlor, and cheese production facility.',
    soil: 'Mountain pastures, excellent quality',
    climate: '15-22°C, 1,100mm annual rainfall',
    water: 'Mountain streams, 3 reservoirs',
    access: 'Paved road, 5km to city',
    infrastructure: 'Milking parlor, cheese factory, cold chain'
  },
  {
    id: 7,
    name: 'Finca Piña Dorada',
    type: 'crops',
    hectares: 320,
    location: 'Zulia, Northwest',
    price: '$1,280,000',
    image: '/farm-pineapple.jpg',
    rating: 3,
    description: 'High-density pineapple plantation with MD-2 variety. Strong export market connections.',
    soil: 'Sandy-loam, well-drained',
    climate: '27-34°C, 800mm annual rainfall',
    water: 'Drip irrigation, groundwater rights',
    access: 'Highway frontage, port 45km',
    infrastructure: 'Packing facility, cooling units'
  },
  {
    id: 8,
    name: 'Hacienda Banamera',
    type: 'crops',
    hectares: 520,
    location: 'Trujillo, Andes Foothills',
    price: '$2,750,000',
    image: '/farm-banana.jpg',
    rating: 5,
    description: 'Export-grade banana plantation with Cavendish variety. Integrated pest management.',
    soil: 'Alluvial, high fertility',
    climate: '24-30°C, 1,500mm annual rainfall',
    water: 'River irrigation, reservoirs',
    access: 'Paved road to port (60km)',
    infrastructure: 'Dehanding station, washing, packing'
  },
  {
    id: 9,
    name: 'Finca Arrozal',
    type: 'crops',
    hectares: 750,
    location: 'Apure, Los Llanos',
    price: '$1,890,000',
    image: '/farm-rice.jpg',
    rating: 4,
    description: 'Irrigated rice farm with modern paddy system. High yields, established markets.',
    soil: 'Clay, excellent water retention',
    climate: '26-33°C, 1,300mm annual rainfall',
    water: 'Canal irrigation, pumping station',
    access: 'All-weather road, grain elevator 20km',
    infrastructure: 'Drying facility, storage silos'
  }
];

// Main App
function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'listings'>('home');
  
  return (
    <LangProvider>
      <div className="grain-overlay">
        {currentPage === 'home' ? (
          <HomePage onViewListings={() => setCurrentPage('listings')} />
        ) : (
          <ListingsPage onBack={() => setCurrentPage('home')} />
        )}
      </div>
    </LangProvider>
  );
}

// Home Page Component
function HomePage({ onViewListings }: { onViewListings: () => void }) {
  const { lang, setLang, t } = useContext(LangContext);
  const mainRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 100) {
          navRef.current.classList.add('nav-pill', 'mx-4', 'mt-4');
          navRef.current.classList.remove('bg-transparent');
        } else {
          navRef.current.classList.remove('nav-pill', 'mx-4', 'mt-4');
          navRef.current.classList.add('bg-transparent');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      setTimeout(() => {
        const pinned = ScrollTrigger.getAll()
          .filter(st => st.vars.pin)
          .sort((a, b) => a.start - b.start);
        
        const maxScroll = ScrollTrigger.maxScroll(window);
        if (!maxScroll || pinned.length === 0) return;

        const pinnedRanges = pinned.map(st => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
              if (!inPinned) return value;
              
              const target = pinnedRanges.reduce((closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0);
              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: "power2.out"
          }
        });
      }, 100);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="page-transition">
      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="AgroNetWorth" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-heading font-bold text-lg text-[#F5F0E6]">AgroNetWorth</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#properties" className="text-sm text-[#F5F0E6]/80 hover:text-[#F5F0E6] transition-colors">{t('nav.properties')}</a>
            <a href="#agrology" className="text-sm text-[#F5F0E6]/80 hover:text-[#F5F0E6] transition-colors">{t('nav.agrology')}</a>
            <a href="#process" className="text-sm text-[#F5F0E6]/80 hover:text-[#F5F0E6] transition-colors">{t('nav.process')}</a>
            <a href="#contact" className="text-sm text-[#F5F0E6]/80 hover:text-[#F5F0E6] transition-colors">{t('nav.contact')}</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onViewListings}
              className="hidden sm:flex btn-primary text-sm items-center gap-2"
            >
              {t('nav.listings')} <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="lang-toggle"
            >
              <Globe size={14} className="text-[#7CB342]" />
              <span className={lang === 'en' ? 'active' : ''}>EN</span>
              <span className="text-[#F5F0E6]/40">|</span>
              <span className={lang === 'es' ? 'active' : ''}>ES</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection t={t} onViewListings={onViewListings} />
      
      {/* Stats Section */}
      <StatsSection t={t} />
      
      {/* About Section */}
      <AboutSection t={t} />
      
      {/* Agrology Section */}
      <AgrologySection t={t} />
      
      {/* Infrastructure Section */}
      <InfrastructureSection t={t} />
      
      {/* Process Section */}
      <ProcessSection t={t} />
      
      {/* Scale Section */}
      <ScaleSection t={t} />
      
      {/* Services Section */}
      <ServicesSection t={t} />
      
      {/* Contact Section */}
      <ContactSection t={t} onViewListings={onViewListings} />
    </div>
  );
}

// Hero Section
function HeroSection({ t, onViewListings }: { t: (key: string) => string; onViewListings: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline();
      loadTl.fromTo(headlineRef.current, 
        { x: '-8vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
      loadTl.fromTo(cardRef.current,
        { x: '10vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.5'
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(cardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      <div className="absolute inset-0">
        <img 
          src="/venezuela-hero.jpg" 
          alt="Venezuelan farmland" 
          className="w-full h-full object-cover img-earth-grade"
        />
        <div className="bg-overlay" />
      </div>

      <div ref={headlineRef} className="absolute left-[6vw] top-[18vh] w-[40vw] max-w-xl">
        <div className="micro-text text-[#E5A823] mb-4">{t('hero.tagline')}</div>
        <h1 className="heading-1 text-[#F5F0E6] mb-6">{t('hero.title')}</h1>
        <p className="body-text text-[#F5F0E6]/80 max-w-md mb-8">{t('hero.subtitle')}</p>
        <button onClick={onViewListings} className="btn-primary flex items-center gap-2">
          {t('hero.cta')} <ArrowRight size={18} />
        </button>
      </div>

      <div ref={cardRef} className="absolute right-[6vw] top-[16vh] w-[34vw] max-w-md h-[62vh] card-dark overflow-hidden">
        <div className="micro-text text-[#E5A823] p-6 pb-0">{t('hero.featured')}</div>
        <div className="h-[45%] mt-4 mx-4 rounded-xl overflow-hidden">
          <img src="/venezuela-cocoa.jpg" alt="Cocoa farm" className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h3 className="heading-3 text-[#F5F0E6] mb-2">Finca Cacao Real</h3>
          <p className="text-sm text-[#F5F0E6]/70 mb-4">180 {t('listings.hectares')} • Miranda • Organic Certified</p>
          <button onClick={onViewListings} className="link-accent">{t('hero.viewDetails')} <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection({ t }: { t: (key: string) => string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(statsRef.current,
        { y: '35vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(statsRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-20">
      <div className="absolute inset-0">
        <img src="/venezuela-andes.jpg" alt="Venezuelan Andes" className="w-full h-full object-cover img-earth-grade" />
        <div className="bg-overlay-dark" />
      </div>

      <div ref={statsRef} className="absolute left-[6vw] bottom-[10vh] w-[56vw] max-w-3xl card-dark p-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="stat-number">8,500+</div>
            <div className="stat-label">{t('stats.acres')}</div>
          </div>
          <div>
            <div className="stat-number">650+</div>
            <div className="stat-label">{t('stats.soil')}</div>
          </div>
          <div>
            <div className="stat-number">$95M</div>
            <div className="stat-label">{t('stats.volume')}</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[#7CB342]/25">
          <p className="text-sm text-[#F5F0E6]/70">{t('stats.tagline')}</p>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection({ t }: { t: (key: string) => string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const centerTileRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(leftCardRef.current,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(centerTileRef.current,
        { y: '40vh', opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(centerTileRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="properties" className="section-pinned z-30">
      <div className="absolute inset-0">
        <img src="/venezuela-ranch.jpg" alt="Venezuelan ranch" className="w-full h-full object-cover img-earth-grade" />
        <div className="bg-overlay-dark" />
      </div>

      <div ref={leftCardRef} className="absolute left-[6vw] top-[16vh] w-[26vw] max-w-sm h-[62vh] card-dark overflow-hidden">
        <div className="h-[50%] overflow-hidden">
          <img src="/farm-coffee.jpg" alt="Coffee farm" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <h3 className="heading-3 text-[#F5F0E6] mb-2">Finca El Dorado</h3>
          <p className="text-sm text-[#F5F0E6]/70">450 {t('listings.hectares')} • Café • Andes</p>
        </div>
      </div>

      <div ref={rightCardRef} className="absolute right-[6vw] top-[16vh] w-[26vw] max-w-sm h-[62vh] card-dark overflow-hidden">
        <div className="h-[50%] overflow-hidden">
          <img src="/farm-avocado.jpg" alt="Avocado farm" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <h3 className="heading-3 text-[#F5F0E6] mb-2">Finca Las Palmas</h3>
          <p className="text-sm text-[#F5F0E6]/70">280 {t('listings.hectares')} • Aguacate • Aragua</p>
        </div>
      </div>

      <div ref={centerTileRef} className="absolute left-1/2 top-[52vh] -translate-x-1/2 -translate-y-1/2 w-[26vw] max-w-sm h-auto card-dark p-6">
        <h3 className="heading-3 text-[#F5F0E6] mb-3">{t('about.title')}</h3>
        <p className="body-text text-[#F5F0E6]/80 mb-4 text-sm">{t('about.subtitle')}</p>
        <a href="#" className="link-accent">{t('about.team')} <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

// Agrology Section
function AgrologySection({ t }: { t: (key: string) => string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const cardCRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(cardARef.current, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(cardBRef.current, { y: '45vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(cardCRef.current, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);

      scrollTl.fromTo(cardARef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cardBRef.current, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cardCRef.current, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="agrology" className="section-pinned z-40">
      <div className="absolute inset-0">
        <img src="/venezuela-corn.jpg" alt="Corn fields" className="w-full h-full object-cover img-earth-grade" />
        <div className="bg-overlay-dark" />
      </div>

      <div ref={cardARef} className="absolute left-[6vw] top-[18vh] w-[26vw] max-w-sm h-[58vh] card-dark overflow-hidden">
        <div className="h-[40%] overflow-hidden">
          <img src="/soil-analysis.jpg" alt="Soil analysis" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-[#E5A823]" />
            <h3 className="heading-3 text-[#F5F0E6]">{t('agro.soil.title')}</h3>
          </div>
          <p className="body-text text-[#F5F0E6]/80 text-sm">{t('agro.soil.desc')}</p>
        </div>
      </div>

      <div ref={cardBRef} className="absolute left-1/2 -translate-x-1/2 top-[18vh] w-[26vw] max-w-sm h-[58vh] card-dark overflow-hidden">
        <div className="h-[40%] overflow-hidden">
          <img src="/climate-sky.jpg" alt="Climate" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sun size={18} className="text-[#E5A823]" />
            <h3 className="heading-3 text-[#F5F0E6]">{t('agro.climate.title')}</h3>
          </div>
          <p className="body-text text-[#F5F0E6]/80 text-sm">{t('agro.climate.desc')}</p>
        </div>
      </div>

      <div ref={cardCRef} className="absolute right-[6vw] top-[18vh] w-[26vw] max-w-sm h-[58vh] card-dark overflow-hidden">
        <div className="h-[40%] overflow-hidden">
          <img src="/irrigation-pond.jpg" alt="Irrigation" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Droplets size={18} className="text-[#E5A823]" />
            <h3 className="heading-3 text-[#F5F0E6]">{t('agro.water.title')}</h3>
          </div>
          <p className="body-text text-[#F5F0E6]/80 text-sm">{t('agro.water.desc')}</p>
        </div>
      </div>
    </section>
  );
}

// Infrastructure Section
function InfrastructureSection({ t }: { t: (key: string) => string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(cardRef.current, { x: '55vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      scrollTl.fromTo(cardRef.current, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-50">
      <div className="absolute inset-0">
        <img src="/farm-tech.jpg" alt="Farm technology" className="w-full h-full object-cover img-earth-grade" />
        <div className="bg-overlay-dark" />
      </div>

      <div ref={cardRef} className="absolute right-[6vw] top-[18vh] w-[34vw] max-w-lg h-auto card-dark p-8">
        <h2 className="heading-2 text-[#F5F0E6] mb-4">{t('infra.title')}</h2>
        <p className="body-text text-[#F5F0E6]/80 mb-6 text-sm">{t('infra.subtitle')}</p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3 text-sm text-[#F5F0E6]/80">
            <Route size={18} className="text-[#E5A823] mt-0.5 shrink-0" />
            {t('infra.road')}
          </li>
          <li className="flex items-start gap-3 text-sm text-[#F5F0E6]/80">
            <TrendingUp size={18} className="text-[#E5A823] mt-0.5 shrink-0" />
            {t('infra.power')}
          </li>
          <li className="flex items-start gap-3 text-sm text-[#F5F0E6]/80">
            <Leaf size={18} className="text-[#E5A823] mt-0.5 shrink-0" />
            {t('infra.internet')}
          </li>
          <li className="flex items-start gap-3 text-sm text-[#F5F0E6]/80">
            <Building2 size={18} className="text-[#E5A823] mt-0.5 shrink-0" />
            {t('infra.markets')}
          </li>
        </ul>
        <a href="#" className="link-accent">{t('infra.cta')} <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection({ t }: { t: (key: string) => string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const centerTileRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(leftCardRef.current, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(rightCardRef.current, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(centerTileRef.current, { y: '40vh', opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, ease: 'none' }, 0.05);

      scrollTl.fromTo(leftCardRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(rightCardRef.current, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(centerTileRef.current, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="section-pinned z-[60]">
      <div className="absolute inset-0">
        <img src="/venezuela-sugarcane.jpg" alt="Sugarcane" className="w-full h-full object-cover img-earth-grade" />
        <div className="bg-overlay-dark" />
      </div>

      <div ref={leftCardRef} className="absolute left-[6vw] top-[14vh] w-[28vw] max-w-sm h-[70vh] card-dark overflow-hidden">
        <div className="h-[55%] overflow-hidden">
          <img src="/farm-dairy.jpg" alt="Dairy farm" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <h3 className="heading-3 text-[#F5F0E6] mb-2">Hacienda Los Andes</h3>
          <p className="text-sm text-[#F5F0E6]/70">650 {t('listings.hectares')} • Dairy • Mérida</p>
        </div>
      </div>

      <div ref={rightCardRef} className="absolute right-[6vw] top-[14vh] w-[28vw] max-w-sm h-[70vh] card-dark overflow-hidden">
        <div className="h-[55%] overflow-hidden">
          <img src="/farm-banana.jpg" alt="Banana farm" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <h3 className="heading-3 text-[#F5F0E6] mb-2">Hacienda Banamera</h3>
          <p className="text-sm text-[#F5F0E6]/70">520 {t('listings.hectares')} • Bananas • Trujillo</p>
        </div>
      </div>

      <div ref={centerTileRef} className="absolute left-1/2 top-[52vh] -translate-x-1/2 -translate-y-1/2 w-[26vw] max-w-sm h-auto card-dark p-6">
        <h3 className="heading-3 text-[#F5F0E6] mb-3">{t('process.title')}</h3>
        <div className="space-y-2 mb-4">
          {['step1', 'step2', 'step3', 'step4'].map((step, i) => (
            <div key={step} className="flex items-center gap-3 text-sm text-[#F5F0E6]/80">
              <span className="w-5 h-5 rounded-full bg-[#E5A823]/20 text-[#E5A823] flex items-center justify-center text-xs font-semibold">{i + 1}</span>
              {t(`process.${step}`)}
            </div>
          ))}
        </div>
        <a href="#contact" className="link-accent">{t('process.cta')} <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

// Scale Section
function ScaleSection({ t }: { t: (key: string) => string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(statsRef.current, { y: '35vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(statsRef.current, { y: 0, opacity: 1 }, { y: '18vh', opacity: 0, ease: 'power2.in' }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[70]">
      <div className="absolute inset-0">
        <img src="/venezuela-ranch.jpg" alt="Cattle ranch" className="w-full h-full object-cover img-earth-grade" />
        <div className="bg-overlay-dark" />
      </div>

      <div ref={statsRef} className="absolute left-[6vw] bottom-[10vh] w-[56vw] max-w-3xl card-dark p-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="stat-number">12</div>
            <div className="stat-label">{t('scale.counties')}</div>
          </div>
          <div>
            <div className="stat-number">14</div>
            <div className="stat-label">{t('scale.partners')}</div>
          </div>
          <div>
            <div className="stat-number">8</div>
            <div className="stat-label">{t('scale.closing')}</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[#7CB342]/25">
          <p className="text-sm text-[#F5F0E6]/70">{t('scale.tagline')}</p>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection({ t }: { t: (key: string) => string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const cardCRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(cardARef.current, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(cardBRef.current, { y: '45vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(cardCRef.current, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);

      scrollTl.fromTo(cardARef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cardBRef.current, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(cardCRef.current, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[80]">
      <div className="absolute inset-0">
        <img src="/farm-pineapple.jpg" alt="Pineapple farm" className="w-full h-full object-cover img-earth-grade" />
        <div className="bg-overlay-dark" />
      </div>

      <div ref={cardARef} className="absolute left-[6vw] top-[18vh] w-[26vw] max-w-sm h-[58vh] card-dark overflow-hidden">
        <div className="h-[40%] overflow-hidden">
          <img src="/road-access.jpg" alt="Road access" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Route size={18} className="text-[#E5A823]" />
            <h3 className="heading-3 text-[#F5F0E6]">{t('serv.road.title')}</h3>
          </div>
          <p className="body-text text-[#F5F0E6]/80 text-sm">{t('serv.road.desc')}</p>
        </div>
      </div>

      <div ref={cardBRef} className="absolute left-1/2 -translate-x-1/2 top-[18vh] w-[26vw] max-w-sm h-[58vh] card-dark overflow-hidden">
        <div className="h-[40%] overflow-hidden">
          <img src="/power-transformer.jpg" alt="Power" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-[#E5A823]" />
            <h3 className="heading-3 text-[#F5F0E6]">{t('serv.energy.title')}</h3>
          </div>
          <p className="body-text text-[#F5F0E6]/80 text-sm">{t('serv.energy.desc')}</p>
        </div>
      </div>

      <div ref={cardCRef} className="absolute right-[6vw] top-[18vh] w-[26vw] max-w-sm h-[58vh] card-dark overflow-hidden">
        <div className="h-[40%] overflow-hidden">
          <img src="/internet-antenna.jpg" alt="Connectivity" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Leaf size={18} className="text-[#E5A823]" />
            <h3 className="heading-3 text-[#F5F0E6]">{t('serv.connect.title')}</h3>
          </div>
          <p className="body-text text-[#F5F0E6]/80 text-sm">{t('serv.connect.desc')}</p>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection({ t, onViewListings }: { t: (key: string) => string; onViewListings: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const budgetOptions = t('contact.budget.options').split(',');

  return (
    <section ref={sectionRef} id="contact" className="relative z-[90] bg-[#F5F0E6] min-h-screen">
      <div ref={contentRef} className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="heading-2 text-dark mb-4">{t('contact.title')}</h2>
            <p className="body-text text-dark-secondary mb-8 max-w-md">{t('contact.subtitle')}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#2D5A27]/10 flex items-center justify-center">
                  <Mail size={18} className="text-[#2D5A27]" />
                </div>
                <div>
                  <div className="text-xs text-dark-secondary uppercase tracking-wide">{t('contact.email')}</div>
                  <div className="text-dark font-medium">hello@agronetworth.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#2D5A27]/10 flex items-center justify-center">
                  <Phone size={18} className="text-[#2D5A27]" />
                </div>
                <div>
                  <div className="text-xs text-dark-secondary uppercase tracking-wide">{t('contact.phone')}</div>
                  <div className="text-dark font-medium">+58 (212) 555-8900</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#2D5A27]/10 flex items-center justify-center">
                  <Building2 size={18} className="text-[#2D5A27]" />
                </div>
                <div>
                  <div className="text-xs text-dark-secondary uppercase tracking-wide">{t('contact.office')}</div>
                  <div className="text-dark font-medium">Av. Francisco de Miranda, Caracas</div>
                </div>
              </div>
            </div>

            <button onClick={onViewListings} className="btn-secondary flex items-center gap-2">
              {t('nav.listings')} <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">{t('contact.name')}</label>
                  <input type="text" placeholder={t('contact.placeholder.name')} className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">{t('contact.email')}</label>
                  <input type="email" placeholder={t('contact.placeholder.email')} className="form-input" />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">{t('contact.phone')}</label>
                  <input type="tel" placeholder={t('contact.placeholder.phone')} className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">{t('contact.budget')}</label>
                  <select className="form-input">
                    {budgetOptions.map((opt, i) => <option key={i}>{opt}</option>)}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark mb-1">{t('contact.message')}</label>
                <textarea placeholder={t('contact.placeholder.message')} rows={4} className="form-input resize-none" />
              </div>
              
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                {t('contact.cta')} <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-[#2D5A27] py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="AgroNetWorth" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-heading font-bold text-lg text-[#F5F0E6]">AgroNetWorth</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#F5F0E6]/70">
              <a href="#" className="hover:text-[#F5F0E6] transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-[#F5F0E6] transition-colors">{t('footer.terms')}</a>
              <a href="#" className="hover:text-[#F5F0E6] transition-colors">{t('footer.accessibility')}</a>
            </div>
            <div className="text-sm text-[#F5F0E6]/50">
              © 2026 AgroNetWorth. {t('footer.rights')}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

// Listings Page Component
function ListingsPage({ onBack }: { onBack: () => void }) {
  const { lang, setLang, t } = useContext(LangContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'crops' | 'livestock' | 'mixed'>('all');
  const [selectedFarm, setSelectedFarm] = useState<typeof sampleFarms[0] | null>(null);

  const filteredFarms = sampleFarms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || farm.type === filter;
    return matchesSearch && matchesFilter;
  });

  if (selectedFarm) {
    return (
      <div className="page-transition min-h-screen bg-[#F5F0E6]">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-[#2D5A27]/95 backdrop-blur-md border-b border-[#7CB342]/20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSelectedFarm(null)} className="flex items-center gap-2 text-[#F5F0E6] hover:text-[#E5A823] transition-colors">
                <ChevronLeft size={20} /> {t('listings.back')}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="AgroNetWorth" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-heading font-bold text-[#F5F0E6]">AgroNetWorth</span>
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="lang-toggle"
            >
              <Globe size={14} className="text-[#7CB342]" />
              <span className={lang === 'en' ? 'active' : ''}>EN</span>
              <span className="text-[#F5F0E6]/40">|</span>
              <span className={lang === 'es' ? 'active' : ''}>ES</span>
            </button>
          </div>
        </nav>

        {/* Farm Detail */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <button onClick={() => setSelectedFarm(null)} className="flex items-center gap-2 text-[#2D5A27] hover:text-[#E5A823] transition-colors mb-6">
            <ChevronLeft size={20} /> {t('listings.back')}
          </button>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="rounded-2xl overflow-hidden mb-4">
                <img src={selectedFarm.image} alt={selectedFarm.name} className="w-full h-80 object-cover" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="badge badge-green capitalize">{selectedFarm.type}</span>
                <div className="flex items-center gap-2">
                  <CornRating rating={selectedFarm.rating} />
                  <span className="text-sm text-[#2D5A27]/70">({selectedFarm.rating}/5)</span>
                </div>
              </div>
            </div>

            <div>
              <h1 className="heading-1 text-[#2D5A27] mb-2">{selectedFarm.name}</h1>
              <p className="text-lg text-[#2D5A27]/70 mb-4">{selectedFarm.location}</p>
              <p className="text-3xl font-bold text-[#E5A823] mb-6">{selectedFarm.price}</p>
              
              <p className="body-text text-[#2D5A27]/80 mb-6">{selectedFarm.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-[#2D5A27]/60 mb-1">{t('listings.hectares')}</div>
                  <div className="text-xl font-bold text-[#2D5A27]">{selectedFarm.hectares}</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-[#2D5A27]/60 mb-1">{t('listings.quality')}</div>
                  <div className="flex items-center gap-2">
                    <CornRating rating={selectedFarm.rating} size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#7CB342] mt-0.5" />
                  <div>
                    <div className="font-medium text-[#2D5A27]">{t('farm.soil')}</div>
                    <div className="text-sm text-[#2D5A27]/70">{selectedFarm.soil}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#7CB342] mt-0.5" />
                  <div>
                    <div className="font-medium text-[#2D5A27]">{t('farm.climate')}</div>
                    <div className="text-sm text-[#2D5A27]/70">{selectedFarm.climate}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#7CB342] mt-0.5" />
                  <div>
                    <div className="font-medium text-[#2D5A27]">{t('farm.water')}</div>
                    <div className="text-sm text-[#2D5A27]/70">{selectedFarm.water}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#7CB342] mt-0.5" />
                  <div>
                    <div className="font-medium text-[#2D5A27]">{t('farm.access')}</div>
                    <div className="text-sm text-[#2D5A27]/70">{selectedFarm.access}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#7CB342] mt-0.5" />
                  <div>
                    <div className="font-medium text-[#2D5A27]">{t('farm.infrastructure')}</div>
                    <div className="text-sm text-[#2D5A27]/70">{selectedFarm.infrastructure}</div>
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full flex items-center justify-center gap-2">
                {t('farm.inquire')} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#2D5A27] py-8 mt-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="AgroNetWorth" className="w-8 h-8 rounded-full object-cover" />
                <span className="font-heading font-bold text-lg text-[#F5F0E6]">AgroNetWorth</span>
              </div>
              <div className="text-sm text-[#F5F0E6]/50">
                © 2026 AgroNetWorth. {t('footer.rights')}
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen bg-[#F5F0E6]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#2D5A27]/95 backdrop-blur-md border-b border-[#7CB342]/20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-[#F5F0E6] hover:text-[#E5A823] transition-colors">
              <ChevronLeft size={20} /> {t('listings.back')}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="AgroNetWorth" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-heading font-bold text-[#F5F0E6]">AgroNetWorth</span>
          </div>
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="lang-toggle"
          >
            <Globe size={14} className="text-[#7CB342]" />
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
            <span className="text-[#F5F0E6]/40">|</span>
            <span className={lang === 'es' ? 'active' : ''}>ES</span>
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-[#2D5A27] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="heading-1 text-[#F5F0E6] mb-2">{t('listings.title')}</h1>
          <p className="body-text text-[#F5F0E6]/80 max-w-xl">{t('listings.subtitle')}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D5A27]/50" size={20} />
            <input
              type="text"
              placeholder={t('listings.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#2D5A27]/20 bg-white focus:outline-none focus:border-[#7CB342]"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'crops', 'livestock', 'mixed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  filter === f 
                    ? 'bg-[#2D5A27] text-white' 
                    : 'bg-white text-[#2D5A27] border border-[#2D5A27]/20 hover:bg-[#2D5A27]/5'
                }`}
              >
                {t(`listings.filter.${f}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarms.map((farm) => (
            <div key={farm.id} className="farm-card cursor-pointer" onClick={() => setSelectedFarm(farm)}>
              <div className="h-48 overflow-hidden">
                <img src={farm.image} alt={farm.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="badge badge-green capitalize text-xs">{farm.type}</span>
                  <CornRating rating={farm.rating} size={16} />
                </div>
                <h3 className="heading-3 text-[#2D5A27] mb-1">{farm.name}</h3>
                <p className="text-sm text-[#2D5A27]/60 mb-3">{farm.location}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#2D5A27]/70">{farm.hectares} {t('listings.hectares')}</div>
                  <div className="font-bold text-[#E5A823]">{farm.price}</div>
                </div>
                <button className="w-full mt-4 btn-secondary text-sm py-2">
                  {t('listings.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFarms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#2D5A27]/60">No farms found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#2D5A27] py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="AgroNetWorth" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-heading font-bold text-lg text-[#F5F0E6]">AgroNetWorth</span>
            </div>
            <div className="text-sm text-[#F5F0E6]/50">
              © 2026 AgroNetWorth. {t('footer.rights')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
