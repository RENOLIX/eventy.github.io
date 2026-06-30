import {
  BadgeCheck,
  Briefcase,
  Cake,
  CalendarCheck,
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
  MessageCircle,
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
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

const DISPLAY_PHONE = "0551114603";
const WHATSAPP_NUMBER = "213551114603";

type NavPage = "home" | "services" | "providers" | "destinations" | "about" | "devis";
type Route =
  | { name: NavPage }
  | { name: "service"; slug: string }
  | { name: "provider"; slug: string };

type Service = {
  slug: string;
  title: string;
  short: string;
  detail: string;
  image: string;
  icon: LucideIcon;
  includes: string[];
};

type Provider = {
  slug: string;
  title: string;
  serviceSlug: string;
  type: string;
  rating: string;
  image: string;
  description: string;
  highlights: string[];
};

const navItems: { label: string; page: NavPage }[] = [
  { label: "Accueil", page: "home" },
  { label: "Services", page: "services" },
  { label: "Prestataires", page: "providers" },
  { label: "Destinations", page: "destinations" },
  { label: "A propos", page: "about" },
  { label: "Devis", page: "devis" },
];

const services: Service[] = [
  {
    slug: "mariages",
    title: "Mariages",
    short: "Ceremonies, receptions and premium planning.",
    detail:
      "Organisation complete de mariages elegants: ceremonie, reception, decoration, photos, musique, traiteur et coordination du jour J.",
    image: "images/hero-wedding.jpg",
    icon: Heart,
    includes: ["Coordination du jour J", "Decoration premium", "Traiteur et salle", "Photo et video"],
  },
  {
    slug: "anniversaires",
    title: "Anniversaires",
    short: "Elegant parties for kids, families and adults.",
    detail:
      "Des anniversaires soignes pour enfants, familles et adultes avec ambiance, gateau, decor, animations et souvenirs.",
    image: "images/royal-catering.jpg",
    icon: Cake,
    includes: ["Theme personnalise", "Buffet et gateau", "Animation", "Photographie"],
  },
  {
    slug: "evenements-entreprise",
    title: "Evenements entreprise",
    short: "Launches, seminars, galas and team nights.",
    detail:
      "Lancements, seminaires, galas et soirees d'equipe organises avec une presentation professionnelle et fluide.",
    image: "images/grand-hall.jpg",
    icon: Briefcase,
    includes: ["Salles equipees", "Accueil invites", "Sonorisation", "Catering corporate"],
  },
  {
    slug: "graduations",
    title: "Graduations",
    short: "Memorable celebrations with decor and catering.",
    detail:
      "Celebrations de fin d'etudes avec decoration, scene photo, catering et ambiance festive pour marquer le moment.",
    image: "images/luxury-decor.jpg",
    icon: GraduationCap,
    includes: ["Scene photo", "Decoration", "DJ", "Buffet"],
  },
  {
    slug: "voyages",
    title: "Voyages",
    short: "Curated trips, hotels and group experiences.",
    detail:
      "Experiences de voyage, hotels, sorties de groupe et sejours organises pour couples, familles et equipes.",
    image: "images/premium-cars.jpg",
    icon: Plane,
    includes: ["Transport", "Hotel", "Activites", "Accompagnement"],
  },
  {
    slug: "traiteur",
    title: "Traiteur",
    short: "Menus, buffets, service teams and desserts.",
    detail:
      "Menus, buffets, desserts et equipes de service pour une reception propre, genereuse et bien presentee.",
    image: "images/royal-catering.jpg",
    icon: ChefHat,
    includes: ["Menus sur mesure", "Service en salle", "Desserts", "Buffets premium"],
  },
  {
    slug: "photographie",
    title: "Photographie",
    short: "Photo, video, albums and event coverage.",
    detail:
      "Couverture photo et video complete avec montage, albums et souvenirs prets a partager apres l'evenement.",
    image: "images/moments-studio.jpg",
    icon: Camera,
    includes: ["Photo HD", "Video", "Album", "Montage reels"],
  },
  {
    slug: "decoration",
    title: "Decoration",
    short: "Florals, stages, lighting and table styling.",
    detail:
      "Fleurs, arches, tables, lumiere, scene et ambiance visuelle pour donner une identite forte a votre evenement.",
    image: "images/luxury-decor.jpg",
    icon: Paintbrush,
    includes: ["Fleurs", "Scene", "Tables", "Lumiere"],
  },
  {
    slug: "dj-musique",
    title: "DJ & Musique",
    short: "DJs, live music and full sound systems.",
    detail:
      "DJs, playlists, musique live, eclairage et sonorisation pour creer le rythme parfait toute la soiree.",
    image: "images/dj-beats.jpg",
    icon: Music2,
    includes: ["DJ", "Sonorisation", "Eclairage", "Playlist personnalisee"],
  },
  {
    slug: "salles",
    title: "Salles",
    short: "Halls, rooftops, gardens and private spaces.",
    detail:
      "Salles, jardins, rooftops et espaces prives selectionnes selon la capacite, le style et le budget.",
    image: "images/grand-hall.jpg",
    icon: BadgeCheck,
    includes: ["Salles de fete", "Jardins", "Rooftops", "Espaces VIP"],
  },
  {
    slug: "location-voiture",
    title: "Location voiture",
    short: "Luxury cars, arrivals and guest transport.",
    detail:
      "Voitures de luxe, arrivee des maries, navettes invites et transport prive pour une experience sans stress.",
    image: "images/premium-cars.jpg",
    icon: Car,
    includes: ["Voiture de luxe", "Chauffeur", "Navettes", "Arrivee ceremonie"],
  },
];

const providers: Provider[] = [
  {
    slug: "royal-catering",
    title: "Royal Catering",
    serviceSlug: "traiteur",
    type: "Traiteur",
    rating: "4.8 (120)",
    image: "images/royal-catering.jpg",
    description: "Une equipe traiteur raffinee pour mariages, diners et receptions privees.",
    highlights: ["Buffets premium", "Menus personnalises", "Equipe de service", "Desserts elegants"],
  },
  {
    slug: "moments-studio",
    title: "Moments Studio",
    serviceSlug: "photographie",
    type: "Photographie",
    rating: "4.9 (96)",
    image: "images/moments-studio.jpg",
    description: "Photo et video cinematographiques pour conserver chaque instant important.",
    highlights: ["Photo HD", "Video evenement", "Albums", "Montage social media"],
  },
  {
    slug: "luxury-decor",
    title: "Luxury Decor",
    serviceSlug: "decoration",
    type: "Decoration",
    rating: "4.7 (74)",
    image: "images/luxury-decor.jpg",
    description: "Arches florales, tables, scene, lumiere et design complet de votre evenement.",
    highlights: ["Fleurs", "Tables", "Scene", "Ambiance lumineuse"],
  },
  {
    slug: "dj-beats",
    title: "DJ Beats",
    serviceSlug: "dj-musique",
    type: "DJ & Musique",
    rating: "4.9 (133)",
    image: "images/dj-beats.jpg",
    description: "Sonorisation premium, eclairage et playlists pour une soiree pleine d'energie.",
    highlights: ["DJ", "Son premium", "Eclairage", "Animation piste"],
  },
  {
    slug: "grand-hall",
    title: "Grand Hall",
    serviceSlug: "salles",
    type: "Salle",
    rating: "4.8 (89)",
    image: "images/grand-hall.jpg",
    description: "Une salle elegante pour mariages, galas, diners et evenements professionnels.",
    highlights: ["Grande capacite", "Tables incluses", "Parking", "Espace VIP"],
  },
  {
    slug: "premium-cars",
    title: "Premium Cars",
    serviceSlug: "location-voiture",
    type: "Location voiture",
    rating: "4.7 (63)",
    image: "images/premium-cars.jpg",
    description: "Voitures de luxe, chauffeurs et transport invite pour une arrivee impeccable.",
    highlights: ["Chauffeur", "Voitures luxe", "Navettes", "Arrivee maries"],
  },
];

const citySuggestions = ["Alger", "Oran", "Constantine", "Tlemcen", "Annaba", "Tipaza", "Bejaia", "Setif"];
const eventSuggestions = services.map((service) => service.title);

const testimonials = [
  {
    name: "Sara & Karim",
    event: "Mariage",
    quote:
      "Eventy a rendu notre mariage beaucoup plus simple a organiser. Les prestataires etaient serieux et le resultat etait magnifique.",
    avatar: "images/avatar-sara.jpg",
  },
  {
    name: "Amine B.",
    event: "Evenement entreprise",
    quote:
      "La salle, le traiteur et la logistique etaient bien coordonnes. On a gagne enormement de temps.",
    avatar: "images/avatar-amine.jpg",
  },
  {
    name: "Lina M.",
    event: "Voyage",
    quote:
      "Nous avons reserve une experience organisee avec transport et hotel. Tout etait clair et bien suivi.",
    avatar: "images/avatar-lina.jpg",
  },
];

function parseRoute(): Route {
  const hash = window.location.hash || "#/home";
  const cleanHash = hash.replace(/^#\/?/, "");
  const [path] = cleanHash.split("?");
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "service" && parts[1]) return { name: "service", slug: parts[1] };
  if (parts[0] === "prestataire" && parts[1]) return { name: "provider", slug: parts[1] };
  const page = (parts[0] || "home") as NavPage;
  return navItems.some((item) => item.page === page) ? { name: page } : { name: "home" };
}

function routePath(route: Route) {
  if (route.name === "service") return `service/${route.slug}`;
  if (route.name === "provider") return `prestataire/${route.slug}`;
  return route.name;
}

function getQuoteParams() {
  const query = (window.location.hash.split("?")[1] || "").trim();
  return new URLSearchParams(query);
}

function Logo({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <button className="brand-logo" onClick={() => onNavigate({ name: "home" })} aria-label="Accueil Eventy">
      Eventy<span>*</span>
    </button>
  );
}

function Header({ route, onNavigate }: { route: Route; onNavigate: (nextRoute: Route) => void }) {
  const [open, setOpen] = useState(false);
  const activePage = route.name;

  const goTo = (nextRoute: Route) => {
    onNavigate(nextRoute);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Logo onNavigate={goTo} />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={activePage === item.page ? "active" : ""}
              onClick={() => goTo({ name: item.page })}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="signup-btn" onClick={() => goTo({ name: "devis" })}>
            Devis
          </button>
          <button className="menu-btn" onClick={() => setOpen((value) => !value)} aria-label="Ouvrir le menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="mobile-nav" aria-label="Navigation mobile">
          {navItems.map((item) => (
            <button key={item.page} className={activePage === item.page ? "active" : ""} onClick={() => goTo({ name: item.page })}>
              {item.label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function Hero({ onNavigate }: { onNavigate: (route: Route, params?: URLSearchParams) => void }) {
  return (
    <section className="hero-section">
      <img className="hero-image" src="images/hero-wedding.jpg" alt="Mariage elegant organise par Eventy" />
      <div className="hero-overlay" />
      <div className="site-shell hero-content">
        <div className="hero-copy">
          <h1>
            Organisez
            <span>Chaque Moment</span>
          </h1>
          <p className="hero-text">
            Trouvez les meilleurs prestataires, comparez les services et demandez un devis gratuit pour votre evenement.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => onNavigate({ name: "devis" })}>
              Demander un devis
            </button>
            <button className="secondary-btn" onClick={() => onNavigate({ name: "providers" })}>
              Voir les prestataires
            </button>
          </div>
        </div>
        <EventSearch onNavigate={onNavigate} />
      </div>
    </section>
  );
}

function EventSearch({ onNavigate }: { onNavigate: (route: Route, params?: URLSearchParams) => void }) {
  const [eventName, setEventName] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("120");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams({
      evenement: eventName,
      ville: city,
      date,
      invites: guests,
    });
    onNavigate({ name: "devis" }, params);
  };

  return (
    <form className="search-card" onSubmit={submit}>
      <label className="search-field search-wide">
        <span>Evenement</span>
        <input
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
          placeholder="Que voulez-vous organiser ?"
          list="event-suggestions"
          autoComplete="off"
        />
        <Search size={18} />
      </label>
      <label className="search-field">
        <span>Ville</span>
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Ville"
          list="city-suggestions"
          autoComplete="off"
        />
        <MapPin size={18} />
      </label>
      <label className="search-field date-field">
        <span>Date</span>
        <input value={date} onChange={(event) => setDate(event.target.value)} type="date" />
      </label>
      <label className="search-field">
        <span>Invites</span>
        <input value={guests} onChange={(event) => setGuests(event.target.value)} type="number" min="1" step="1" />
        <UserRound size={18} />
      </label>
      <button className="hero-search-btn" type="submit">
        Devis
      </button>
      <datalist id="event-suggestions">
        {eventSuggestions.map((suggestion) => (
          <option value={suggestion} key={suggestion} />
        ))}
      </datalist>
      <datalist id="city-suggestions">
        {citySuggestions.map((suggestion) => (
          <option value={suggestion} key={suggestion} />
        ))}
      </datalist>
    </form>
  );
}

function ServiceRail({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <section className="service-rail-section">
      <div className="site-shell service-rail" aria-label="Services Eventy">
        {services.map(({ slug, title, short, icon: Icon }) => (
          <button key={slug} onClick={() => onNavigate({ name: "service", slug })}>
            <Icon size={23} strokeWidth={1.55} />
            <strong>{title}</strong>
            <span>{short}</span>
          </button>
        ))}
      </div>
    </section>
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

function NeumorphicButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button className="btn-creuse" onClick={onClick}>
      {children}
    </button>
  );
}

function ServiceGrid({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <div className="service-grid">
      {services.map(({ slug, title, short, icon: Icon }) => (
        <button key={slug} className="service-card" onClick={() => onNavigate({ name: "service", slug })}>
          <Icon size={28} strokeWidth={1.55} />
          <strong>{title}</strong>
          <span>{short}</span>
        </button>
      ))}
    </div>
  );
}

function ProviderGrid({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <div className="provider-grid">
      {providers.map((provider) => (
        <article key={provider.slug} className="provider-card">
          <button className="provider-image-btn" onClick={() => onNavigate({ name: "provider", slug: provider.slug })}>
            <img src={provider.image} alt={provider.title} />
          </button>
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
            <button className="text-btn mini" onClick={() => onNavigate({ name: "provider", slug: provider.slug })}>
              Voir la page
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (route: Route, params?: URLSearchParams) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <ServiceRail onNavigate={onNavigate} />
      <section className="page-section promise-section">
        <div className="site-shell">
          <SectionTitle
            eyebrow="Experience Eventy"
            title="Un devis clair, des prestataires serieux, une organisation plus simple"
            text="Eventy rassemble les bonnes informations au bon endroit: votre type d'evenement, la ville, la date, les invites et les prestataires souhaites."
          />
          <div className="promise-grid">
            <article>
              <Sparkles size={28} />
              <h3>Brief organise</h3>
              <p>La recherche remplit automatiquement le devis pour eviter de tout ressaisir.</p>
            </article>
            <article>
              <BadgeCheck size={28} />
              <h3>Pages detaillees</h3>
              <p>Chaque service et chaque prestataire possede sa page avec image, infos et reservation.</p>
            </article>
            <article>
              <MessageCircle size={28} />
              <h3>Contact WhatsApp</h3>
              <p>Le formulaire genere un message clair et pret a envoyer a Eventy.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="page-section providers-preview">
        <div className="site-shell">
          <div className="split-heading">
            <SectionTitle eyebrow="Prestataires" title="Une marketplace de professionnels de l'evenement" />
            <button className="text-btn" onClick={() => onNavigate({ name: "providers" })}>
              Voir tous les prestataires
            </button>
          </div>
          <ProviderGrid onNavigate={onNavigate} />
        </div>
      </section>
      <HowItWorks />
      <Testimonials />
    </>
  );
}

function ServicesPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <PageFrame
      eyebrow="Services"
      title="Choisissez le service qui correspond a votre evenement"
      text="Mariage, traiteur, photo, musique, salle ou transport: chaque service peut etre reserve via un devis gratuit."
    >
      <ServiceGrid onNavigate={onNavigate} />
    </PageFrame>
  );
}

function ServiceDetailPage({
  service,
  onNavigate,
}: {
  service: Service;
  onNavigate: (route: Route, params?: URLSearchParams) => void;
}) {
  const relatedProviders = providers.filter((provider) => provider.serviceSlug === service.slug);

  const reserve = () => {
    onNavigate(
      { name: "devis" },
      new URLSearchParams({
        evenement: service.title,
      }),
    );
  };

  return (
    <DetailFrame eyebrow="Service" title={service.title} image={service.image}>
      <p>{service.detail}</p>
      <div className="detail-list">
        {service.includes.map((item) => (
          <span key={item}>
            <BadgeCheck size={16} /> {item}
          </span>
        ))}
      </div>
      <NeumorphicButton onClick={reserve}>Reserver ce service</NeumorphicButton>
      {relatedProviders.length ? (
        <div className="related-block">
          <h3>Prestataires recommandes</h3>
          <ProviderGrid onNavigate={onNavigate} />
        </div>
      ) : null}
    </DetailFrame>
  );
}

function ProvidersPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <PageFrame
      eyebrow="Prestataires"
      title="Une marketplace de professionnels de l'evenement"
      text="Traiteurs, salles, photographes, DJs, decorateurs et transport de luxe dans un repertoire premium."
    >
      <ProviderGrid onNavigate={onNavigate} />
    </PageFrame>
  );
}

function ProviderDetailPage({
  provider,
  onNavigate,
}: {
  provider: Provider;
  onNavigate: (route: Route, params?: URLSearchParams) => void;
}) {
  const reserve = () => {
    onNavigate(
      { name: "devis" },
      new URLSearchParams({
        evenement: provider.type,
        prestataire: provider.title,
      }),
    );
  };

  return (
    <DetailFrame eyebrow="Prestataire" title={provider.title} image={provider.image}>
      <div className="provider-detail-meta">
        <span>{provider.type}</span>
        <span className="rating">
          <Star size={16} fill="currentColor" />
          {provider.rating}
        </span>
      </div>
      <p>{provider.description}</p>
      <div className="detail-list">
        {provider.highlights.map((item) => (
          <span key={item}>
            <BadgeCheck size={16} /> {item}
          </span>
        ))}
      </div>
      <NeumorphicButton onClick={reserve}>Reserver ce prestataire</NeumorphicButton>
    </DetailFrame>
  );
}

function DestinationsPage() {
  const destinations = ["Alger", "Oran", "Constantine", "Tlemcen", "Annaba", "Tipaza"];
  return (
    <PageFrame
      eyebrow="Destinations"
      title="Organisez autour des plus belles villes"
      text="Eventy accompagne les mariages, sorties, galas, voyages et experiences privees dans plusieurs destinations."
    >
      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <article key={destination} className="destination-card">
            <span>0{index + 1}</span>
            <h3>{destination}</h3>
            <p>Salles, prestataires et experiences invites prepares pour un evenement premium.</p>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}

function AboutPage() {
  return (
    <PageFrame
      eyebrow="A propos"
      title="Une facon elegante d'organiser sans stress"
      text="Eventy relie les clients aux prestataires evenementiels avec une experience claire, premium et rapide."
    >
      <div className="about-layout">
        <div className="about-copy">
          <h3>Notre promesse</h3>
          <p>
            Garder l'esprit luxe de la reference visuelle, mais avec un vrai site fonctionnel: services, prestataires,
            devis pre-rempli et contact WhatsApp.
          </p>
          <div className="stats-row">
            <strong>120+<span>prestataires</span></strong>
            <strong>35+<span>villes</span></strong>
            <strong>4.8<span>note moyenne</span></strong>
          </div>
        </div>
        <img src="images/grand-hall.jpg" alt="Salle evenementielle elegante" />
      </div>
    </PageFrame>
  );
}

function DevisPage() {
  const params = getQuoteParams();
  const [form, setForm] = useState({
    nom: params.get("nom") || "",
    telephone: params.get("telephone") || "",
    email: params.get("email") || "",
    evenement: params.get("evenement") || "",
    prestataire: params.get("prestataire") || "",
    ville: params.get("ville") || "",
    date: params.get("date") || "",
    invites: params.get("invites") || "120",
    message: params.get("message") || "",
  });

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const sendWhatsApp = (event: FormEvent) => {
    event.preventDefault();
    const message = [
      "Bonjour Eventy, je souhaite un devis gratuit.",
      "",
      `Nom: ${form.nom || "Non precise"}`,
      `Telephone: ${form.telephone || "Non precise"}`,
      `Email: ${form.email || "Non precise"}`,
      `Evenement: ${form.evenement || "Non precise"}`,
      `Prestataire souhaite: ${form.prestataire || "Non precise"}`,
      `Ville: ${form.ville || "Non precise"}`,
      `Date: ${form.date || "Non precise"}`,
      `Nombre d'invites: ${form.invites || "Non precise"}`,
      "",
      `Message: ${form.message || "Aucun message supplementaire"}`,
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <PageFrame
      eyebrow="Devis gratuit"
      title="Recevez une proposition organisee sur WhatsApp"
      text="Les informations saisies dans la recherche sont automatiquement reprises ici. Completez le reste puis envoyez la demande."
    >
      <div className="contact-layout">
        <form className="contact-form" onSubmit={sendWhatsApp}>
          <div className="form-grid">
            <label>
              Nom complet
              <input value={form.nom} onChange={(event) => update("nom", event.target.value)} placeholder="Votre nom" />
            </label>
            <label>
              Telephone
              <input value={form.telephone} onChange={(event) => update("telephone", event.target.value)} placeholder="+213..." />
            </label>
          </div>
          <label>
            Email
            <input value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="vous@email.com" />
          </label>
          <div className="form-grid">
            <label>
              Evenement
              <input value={form.evenement} onChange={(event) => update("evenement", event.target.value)} list="event-suggestions" placeholder="Mariage, traiteur..." />
            </label>
            <label>
              Prestataire
              <input value={form.prestataire} onChange={(event) => update("prestataire", event.target.value)} list="provider-suggestions" placeholder="Optionnel" />
            </label>
          </div>
          <div className="form-grid">
            <label>
              Ville
              <input value={form.ville} onChange={(event) => update("ville", event.target.value)} list="city-suggestions" placeholder="Alger" />
            </label>
            <label>
              Date
              <input value={form.date} onChange={(event) => update("date", event.target.value)} type="date" />
            </label>
          </div>
          <label>
            Nombre d'invites
            <input value={form.invites} onChange={(event) => update("invites", event.target.value)} type="number" min="1" />
          </label>
          <label>
            Details
            <textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Budget, style, horaires, besoins particuliers..." />
          </label>
          <button className="whatsapp-btn" type="submit">
            <MessageCircle size={18} /> Envoyer sur WhatsApp
          </button>
          <datalist id="provider-suggestions">
            {providers.map((provider) => (
              <option value={provider.title} key={provider.slug} />
            ))}
          </datalist>
        </form>
        <div className="contact-card">
          <Sparkles size={28} />
          <h3>Devis gratuit</h3>
          <p>
            Votre demande sera envoyee avec toutes les informations: evenement, ville, date, invites, prestataire et
            message. Vous pourrez modifier le texte dans WhatsApp avant l'envoi.
          </p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
            <Phone size={16} /> WhatsApp Eventy: {DISPLAY_PHONE}
          </a>
          <a href="mailto:contact@eventy.com">
            <Mail size={16} /> contact@eventy.com
          </a>
        </div>
      </div>
      <datalist id="event-suggestions">
        {eventSuggestions.map((suggestion) => (
          <option value={suggestion} key={suggestion} />
        ))}
      </datalist>
      <datalist id="city-suggestions">
        {citySuggestions.map((suggestion) => (
          <option value={suggestion} key={suggestion} />
        ))}
      </datalist>
    </PageFrame>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Cherchez",
      description: "Entrez votre evenement, la ville, la date et le nombre d'invites.",
      icon: Search,
    },
    {
      title: "Demandez un devis",
      description: "Le formulaire se remplit automatiquement avec vos informations.",
      icon: CalendarCheck,
    },
    {
      title: "Reservez",
      description: "Envoyez la demande sur WhatsApp et confirmez les details avec Eventy.",
      icon: PartyPopper,
    },
  ];

  return (
    <section className="cream-section">
      <div className="site-shell">
        <SectionTitle eyebrow="Fonctionnement" title="Comment Eventy fonctionne" />
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
        <SectionTitle eyebrow="Clients" title="Ce que disent nos clients" />
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

function DetailFrame({
  eyebrow,
  title,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  image: string;
  children: ReactNode;
}) {
  return (
    <section className="detail-page">
      <div className="site-shell detail-layout">
        <img className="detail-image" src={image} alt={title} />
        <div className="detail-content">
          <SectionTitle eyebrow={eyebrow} title={title} />
          {children}
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const [email, setEmail] = useState("");

  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div className="footer-brand">
          <Logo onNavigate={onNavigate} />
          <p>Votre plateforme pour organiser evenements, services, prestataires et experiences memorables.</p>
          <a className="footer-phone" href={`tel:${DISPLAY_PHONE}`}>
            <Phone size={15} /> {DISPLAY_PHONE}
          </a>
          <div className="social-row">
            {[Facebook, Instagram, Music2, Youtube].map((Icon, itemIndex) => (
              <button key={itemIndex} aria-label="Lien reseau social">
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>
        <div className="footer-column">
          <h2>Navigation</h2>
          {navItems.map((item) => (
            <button key={item.page} onClick={() => onNavigate({ name: item.page })}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="footer-column">
          <h2>Services</h2>
          {services.slice(0, 5).map((service) => (
            <button key={service.slug} onClick={() => onNavigate({ name: "service", slug: service.slug })}>
              {service.title}
            </button>
          ))}
        </div>
        <div className="footer-column">
          <h2>Prestataires</h2>
          {providers.slice(0, 4).map((provider) => (
            <button key={provider.slug} onClick={() => onNavigate({ name: "provider", slug: provider.slug })}>
              {provider.title}
            </button>
          ))}
        </div>
        <div className="newsletter">
          <h2>Restez informe</h2>
          <p>Recevez les nouveautes Eventy.</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Votre email"
              type="email"
            />
            <button aria-label="S'inscrire">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
      <p className="copyright">© 2024 Eventy. Tous droits reserves.</p>
    </footer>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseRoute);

  const navigate = (nextRoute: Route, params?: URLSearchParams) => {
    setRoute(nextRoute);
    const query = params?.toString();
    window.history.pushState(null, "", `#/${routePath(nextRoute)}${query ? `?${query}` : ""}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const content = useMemo(() => {
    if (route.name === "service") {
      const service = services.find((item) => item.slug === route.slug) || services[0];
      return <ServiceDetailPage service={service} onNavigate={navigate} />;
    }
    if (route.name === "provider") {
      const provider = providers.find((item) => item.slug === route.slug) || providers[0];
      return <ProviderDetailPage provider={provider} onNavigate={navigate} />;
    }
    switch (route.name) {
      case "services":
        return <ServicesPage onNavigate={navigate} />;
      case "providers":
        return <ProvidersPage onNavigate={navigate} />;
      case "destinations":
        return <DestinationsPage />;
      case "about":
        return <AboutPage />;
      case "devis":
        return <DevisPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  }, [route]);

  return (
    <div className="app-shell">
      <Header route={route} onNavigate={navigate} />
      <main>{content}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
