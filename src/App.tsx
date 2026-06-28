import {
  BadgeCheck,
  Briefcase,
  Cake,
  CalendarCheck,
  CalendarDays,
  Camera,
  Car,
  ChefHat,
  Facebook,
  GraduationCap,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Music2,
  Paintbrush,
  PartyPopper,
  Phone,
  Plane,
  Search,
  Send,
  Sparkles,
  Star,
  UserRound,
  X,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

type Page = "home" | "services" | "providers" | "destinations" | "about" | "contact";

type Category = {
  label: string;
  detail: string;
  icon: LucideIcon;
};

type Provider = {
  title: string;
  type: string;
  rating: string;
  image: string;
  description: string;
};

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "Providers", page: "providers" },
  { label: "Destinations", page: "destinations" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

const categories: Category[] = [
  { label: "Weddings", detail: "Ceremonies, receptions and premium planning.", icon: Heart },
  { label: "Birthdays", detail: "Elegant parties for kids, families and adults.", icon: Cake },
  { label: "Corporate Events", detail: "Launches, seminars, galas and team nights.", icon: Briefcase },
  { label: "Graduation", detail: "Memorable celebrations with decor and catering.", icon: GraduationCap },
  { label: "Holidays", detail: "Curated trips, hotels and group experiences.", icon: Plane },
  { label: "Catering", detail: "Menus, buffets, service teams and desserts.", icon: ChefHat },
  { label: "Photography", detail: "Photo, video, albums and event coverage.", icon: Camera },
  { label: "Decoration", detail: "Florals, stages, lighting and table styling.", icon: Paintbrush },
  { label: "DJ & Music", detail: "DJs, live music and full sound systems.", icon: Music2 },
  { label: "Venues", detail: "Halls, rooftops, gardens and private spaces.", icon: BadgeCheck },
  { label: "Car Rental", detail: "Luxury cars, arrivals and guest transport.", icon: Car },
];

const providers: Provider[] = [
  {
    title: "Royal Catering",
    type: "Catering",
    rating: "4.8 (120)",
    image: "images/royal-catering.jpg",
    description: "A refined catering team for weddings, dinners and private receptions.",
  },
  {
    title: "Moments Studio",
    type: "Photography",
    rating: "4.9 (96)",
    image: "images/moments-studio.jpg",
    description: "Cinematic photo and video coverage for once-in-a-lifetime moments.",
  },
  {
    title: "Luxury Decor",
    type: "Decoration",
    rating: "4.7 (74)",
    image: "images/luxury-decor.jpg",
    description: "Floral arches, table styling, lighting and complete event design.",
  },
  {
    title: "DJ Beats",
    type: "DJ & Music",
    rating: "4.9 (133)",
    image: "images/dj-beats.jpg",
    description: "Premium sound, lighting and playlists for high-energy celebrations.",
  },
  {
    title: "Grand Hall",
    type: "Venues",
    rating: "4.8 (89)",
    image: "images/grand-hall.jpg",
    description: "A warm, elegant venue for weddings, galas and corporate dinners.",
  },
  {
    title: "Premium Cars",
    type: "Car Rental",
    rating: "4.7 (63)",
    image: "images/premium-cars.jpg",
    description: "Luxury arrivals, guest transfers and private event transport.",
  },
];

const destinations = [
  "Algiers",
  "Oran",
  "Constantine",
  "Tlemcen",
  "Annaba",
  "Tipaza",
];

const testimonials = [
  {
    name: "Sara & Karim",
    event: "Wedding",
    quote:
      "Eventy made our wedding day absolutely perfect. Everything was elegant, organized and exactly as we imagined.",
    avatar: "images/avatar-sara.jpg",
  },
  {
    name: "Amine B.",
    event: "Corporate Event",
    quote:
      "From the venue to the catering, everything was seamless. It saved us weeks of back and forth.",
    avatar: "images/avatar-amine.jpg",
  },
  {
    name: "Lina M.",
    event: "Holiday",
    quote:
      "We booked a beautiful holiday experience through Eventy and every detail was handled for us.",
    avatar: "images/avatar-lina.jpg",
  },
];

function getInitialPage(): Page {
  const fromHash = window.location.hash.replace("#/", "") as Page;
  return navItems.some((item) => item.page === fromHash) ? fromHash : "home";
}

function Logo({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <button className="brand-logo" onClick={() => onNavigate("home")} aria-label="Eventy home">
      Eventy<span>*</span>
    </button>
  );
}

function Header({ page, onNavigate }: { page: Page; onNavigate: (nextPage: Page) => void }) {
  const [open, setOpen] = useState(false);

  const goTo = (nextPage: Page) => {
    onNavigate(nextPage);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Logo onNavigate={goTo} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={page === item.page ? "active" : ""}
              onClick={() => goTo(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="signup-btn" onClick={() => goTo("contact")}>
            Sign Up
          </button>
          <button className="menu-btn" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button key={item.page} className={page === item.page ? "active" : ""} onClick={() => goTo(item.page)}>
              {item.label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function Hero({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="hero-section">
      <img className="hero-image" src="images/hero-wedding.jpg" alt="Elegant wedding celebration" />
      <div className="hero-overlay" />
      <div className="site-shell hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Premium event platform</p>
          <h1>
            Organize
            <span>Every Moment</span>
          </h1>
          <p className="hero-text">
            Everything you need to plan unforgettable events, compare trusted providers and create dream experiences.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => onNavigate("services")}>
              Explore Services
            </button>
            <button className="secondary-btn" onClick={() => onNavigate("providers")}>
              View Providers
            </button>
          </div>
        </div>
        <EventSearch />
      </div>
    </section>
  );
}

function EventSearch() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <form className="search-card" onSubmit={(event) => event.preventDefault()}>
      <label className="search-field search-wide">
        <span>Event</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What are you planning?" />
        <Search size={18} />
      </label>
      <label className="search-field">
        <span>Location</span>
        <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City" />
        <MapPin size={18} />
      </label>
      <button className="search-field" type="button">
        <span>Date</span>
        <strong>Pick a date</strong>
        <CalendarDays size={18} />
      </button>
      <button className="search-field" type="button">
        <span>Guests</span>
        <strong>120</strong>
        <UserRound size={18} />
      </button>
      <button className="hero-search-btn" type="submit">
        Search
      </button>
    </form>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="section-title">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <span>{text}</span> : null}
    </div>
  );
}

function ServiceGrid({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("Weddings");

  return (
    <div className={`service-grid ${compact ? "compact" : ""}`}>
      {categories.map(({ label, detail, icon: Icon }) => (
        <button
          key={label}
          className={`service-card ${active === label ? "active" : ""}`}
          onClick={() => setActive(label)}
        >
          <Icon size={28} strokeWidth={1.55} />
          <strong>{label}</strong>
          <span>{detail}</span>
        </button>
      ))}
    </div>
  );
}

function ProviderGrid() {
  return (
    <div className="provider-grid">
      {providers.map((provider) => (
        <article key={provider.title} className="provider-card">
          <img src={provider.image} alt={provider.title} />
          <div className="provider-body">
            <div className="provider-meta">
              <span>{provider.type}</span>
              <span className="rating">
                <Star size={14} fill="currentColor" />
                {provider.rating}
              </span>
            </div>
            <h3>{provider.title}</h3>
            <p>{provider.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Search",
      description: "Tell Eventy what you are planning and compare services by style, rating and availability.",
      icon: Search,
    },
    {
      title: "Book",
      description: "Select the right provider, confirm your date and keep every important detail in one place.",
      icon: CalendarCheck,
    },
    {
      title: "Celebrate",
      description: "Enjoy the moment while the experience feels organized, polished and effortless.",
      icon: PartyPopper,
    },
  ];

  return (
    <section className="cream-section">
      <div className="site-shell">
        <SectionTitle eyebrow="Simple process" title="How Eventy Works" />
        <div className="steps-row">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <article key={title} className="step-item">
              <span className="step-number">0{index + 1}</span>
              <span className="step-icon">
                <Icon size={30} strokeWidth={1.45} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="page-section">
      <div className="site-shell">
        <SectionTitle eyebrow="Clients" title="What Our Clients Say" />
        <div className="testimonial-row">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <img src={item.avatar} alt={item.name} />
              <p>{item.quote}</p>
              <h3>{item.name}</h3>
              <span>{item.event}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <section className="page-section">
        <div className="site-shell">
          <SectionTitle
            eyebrow="Services"
            title="Plan every detail with one premium platform"
            text="Inspired by the reference design: warm gold accents, elegant typography and clean white cards."
          />
          <ServiceGrid compact />
        </div>
      </section>
      <section className="page-section providers-preview">
        <div className="site-shell">
          <div className="split-heading">
            <SectionTitle eyebrow="Featured Providers" title="Trusted teams for unforgettable events" />
            <button className="text-btn" onClick={() => onNavigate("providers")}>
              View all providers
            </button>
          </div>
          <ProviderGrid />
        </div>
      </section>
      <HowItWorks />
      <Testimonials />
    </>
  );
}

function ServicesPage() {
  return (
    <PageFrame
      eyebrow="Services"
      title="Every event service, organized beautifully"
      text="Choose what you need, then compare providers who match the tone, budget and scale of your event."
    >
      <ServiceGrid />
    </PageFrame>
  );
}

function ProvidersPage() {
  return (
    <PageFrame
      eyebrow="Providers"
      title="A curated marketplace of event professionals"
      text="Catering, venues, photographers, DJs, decorators and luxury transport in one premium directory."
    >
      <ProviderGrid />
    </PageFrame>
  );
}

function DestinationsPage() {
  return (
    <PageFrame
      eyebrow="Destinations"
      title="Build events around beautiful places"
      text="Eventy can support city events, destination weddings, holiday experiences and private celebrations."
    >
      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <article key={destination} className="destination-card">
            <span>0{index + 1}</span>
            <h3>{destination}</h3>
            <p>Venues, planning partners and guest experiences prepared for premium events.</p>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}

function AboutPage() {
  return (
    <PageFrame
      eyebrow="About Eventy"
      title="A refined way to plan events without chaos"
      text="Eventy is designed as an elegant bridge between clients and trusted event providers."
    >
      <div className="about-layout">
        <div className="about-copy">
          <h3>Our promise</h3>
          <p>
            We bring the visual mood of luxury wedding planning into a practical booking experience. The goal is simple:
            make every celebration easier to organize and more beautiful to remember.
          </p>
          <div className="stats-row">
            <strong>120+<span>providers</span></strong>
            <strong>35+<span>cities</span></strong>
            <strong>4.8<span>avg rating</span></strong>
          </div>
        </div>
        <img src="images/grand-hall.jpg" alt="Event venue" />
      </div>
    </PageFrame>
  );
}

function ContactPage() {
  const [email, setEmail] = useState("");

  return (
    <PageFrame
      eyebrow="Contact"
      title="Tell Eventy what you want to organize"
      text="Send your request and the Eventy team can help structure the right package."
    >
      <div className="contact-layout">
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Full name
            <input placeholder="Your name" />
          </label>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            Event details
            <textarea placeholder="Wedding, birthday, corporate event..." />
          </label>
          <button className="primary-btn">Send request</button>
        </form>
        <div className="contact-card">
          <Sparkles size={28} />
          <h3>Eventy support</h3>
          <p>Our planning desk can help with venues, services, availability and custom packages.</p>
          <a href="tel:+213000000000">
            <Phone size={16} /> +213 000 000 000
          </a>
          <a href="mailto:contact@eventy.com">
            <Mail size={16} /> contact@eventy.com
          </a>
        </div>
      </div>
    </PageFrame>
  );
}

function PageFrame({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <section className="inner-hero">
      <div className="site-shell">
        <SectionTitle eyebrow={eyebrow} title={title} text={text} />
        {children}
      </div>
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [email, setEmail] = useState("");

  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div className="footer-brand">
          <Logo onNavigate={onNavigate} />
          <p>Your all-in-one platform for events, services and unforgettable experiences.</p>
          <div className="social-row">
            {[Facebook, Instagram, Music2, Youtube].map((Icon, itemIndex) => (
              <button key={itemIndex} aria-label="Social link">
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>
        <div className="footer-column">
          <h2>Navigation</h2>
          {navItems.map((item) => (
            <button key={item.page} onClick={() => onNavigate(item.page)}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="footer-column">
          <h2>Support</h2>
          {["Help Center", "Terms & Conditions", "Privacy Policy", "Refund Policy"].map((link) => (
            <button key={link}>{link}</button>
          ))}
        </div>
        <div className="footer-column">
          <h2>For Providers</h2>
          {["List Your Business", "Provider Login", "Resources", "Partnership"].map((link) => (
            <button key={link}>{link}</button>
          ))}
        </div>
        <div className="newsletter">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              type="email"
            />
            <button aria-label="Subscribe">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
      <p className="copyright">© 2024 Eventy. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(getInitialPage);

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    window.history.pushState(null, "", `#/${nextPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onHashChange = () => setPage(getInitialPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const content = useMemo(() => {
    switch (page) {
      case "services":
        return <ServicesPage />;
      case "providers":
        return <ProvidersPage />;
      case "destinations":
        return <DestinationsPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  }, [page]);

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} />
      <main>{content}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
