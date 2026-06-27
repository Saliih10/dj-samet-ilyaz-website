import {
  ArrowRight,
  Baby,
  BriefcaseBusiness,
  Gem,
  HandHeart,
  HeartHandshake,
  Images,
  Instagram,
  Languages,
  Music2,
  Play,
  Sparkles,
  Volume2,
} from "lucide-react";
import { copy, paths, whatsapp, whatsappPhone } from "./content.js";

const logoImage = "/assets/dj-samet-logo.png";
const heroImage = "/assets/hero-wedding-dj.png";
const eventBandImage = "/assets/event-dancefloor-band.png";
const aboutImage = "/assets/samet-about-crop.jpg";
const originalImage = "/assets/samet-original.jpg";
const galleryWeddingImage = "/assets/gallery-wedding.png";
const galleryEngagementImage = "/assets/gallery-engagement.png";
const galleryKinaImage = "/assets/gallery-kina.png";
const gallerySunnetImage = "/assets/gallery-sunnet.png";
const galleryCorporateImage = "/assets/gallery-corporate.png";
const instagramUrl = "https://www.instagram.com/djsametilyaz/";

const serviceIcons = [HeartHandshake, Gem, HandHeart, Baby, BriefcaseBusiness];
const proofIcons = [UsersIcon, Volume2, Music2, Sparkles];

const pageMap = {
  de: { "/": "home", "/galerie": "gallery", "/referenzen": "references", "/impressum": "imprint", "/datenschutz": "privacy" },
  tr: { "/tr": "home", "/tr/galeri": "gallery", "/tr/referanslar": "references", "/tr/impressum": "imprint", "/tr/gizlilik": "privacy" },
};

function getRoute() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const lang = pathname === "/tr" || pathname.startsWith("/tr/") ? "tr" : "de";
  const page = pageMap[lang][pathname] || "home";
  return { lang, page };
}

function whatsappUrl(lang) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsapp[lang])}`;
}

function languageHref(lang, page) {
  const nextLang = lang === "de" ? "tr" : "de";
  return paths[nextLang][page] || paths[nextLang].home;
}

function scrollToCurrentHash() {
  if (!window.location.hash) return;

  const target = document.getElementById(window.location.hash.slice(1));
  if (!target) return;

  const top = Math.max(target.offsetTop - 110, 0);
  window.scrollTo(0, top);
  document.documentElement.scrollTop = top;
  document.body.scrollTop = top;
}

if (!window.__djSametHashScroll) {
  window.__djSametHashScroll = true;
  window.addEventListener("load", scrollToCurrentHash);
  window.addEventListener("hashchange", () => {
    window.setTimeout(scrollToCurrentHash, 0);
  });
  window.setTimeout(scrollToCurrentHash, 0);
  window.setTimeout(scrollToCurrentHash, 250);
  window.setTimeout(scrollToCurrentHash, 900);
}

function App() {
  const { lang, page } = getRoute();
  const t = copy[lang];

  return (
    <div className="site-shell">
      <Header t={t} lang={lang} page={page} />
      {page === "gallery" && <GalleryPage t={t} lang={lang} />}
      {page === "references" && <ReferencesPage t={t} lang={lang} />}
      {page === "imprint" && <LegalPage t={t} lang={lang} type="imprint" />}
      {page === "privacy" && <LegalPage t={t} lang={lang} type="privacy" />}
      {page === "home" && <HomePage t={t} lang={lang} />}
      <Footer t={t} lang={lang} />
    </div>
  );
}

function Header({ t, lang, page }) {
  const nav = paths[lang];

  return (
    <header className="header">
      <a className="brand logo-brand" href={nav.home} aria-label="DJ Samet ILYAZ">
        <img className="brand-logo" src={logoImage} alt="DJ Samet ILYAZ" />
      </a>

      <nav className="nav" aria-label="Hauptnavigation">
        <a href={nav.home}>{t.nav.home}</a>
        <a href={nav.gallery}>{t.nav.gallery}</a>
        <a href={nav.references}>{t.nav.references}</a>
      </nav>

      <div className="header-actions">
        <a className="lang-switch" href={languageHref(lang, page)} aria-label="Sprache wechseln">
          <Languages size={16} />
          {t.langLabel}
        </a>
        <a className="icon-action" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram size={17} />
        </a>
        <a className="whatsapp-mini" href={whatsappUrl(lang)} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={17} />
          {t.nav.whatsApp}
        </a>
      </div>
    </header>
  );
}

function HomePage({ t, lang }) {
  return (
    <main>
      <Hero t={t} lang={lang} />
      <IntroServices t={t} />
      <MediaBand t={t} lang={lang} />
      <About t={t} />
      <GalleryPreview t={t} lang={lang} />
      <Proof t={t} lang={lang} />
      <FinalCta t={t} lang={lang} />
    </main>
  );
}

function Hero({ t, lang }) {
  return (
    <section className="hero section-with-pattern">
      <div className="hero-bg" aria-hidden="true">
        <img src={heroImage} alt="" />
      </div>
      <div className="hero-content">
        <h1>{t.hero.title}</h1>
        <p>{t.hero.body}</p>
        <div className="hero-actions">
          <a className="button primary" href={whatsappUrl(lang)} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={21} />
            {t.hero.cta}
          </a>
          <a className="button ghost" href={paths[lang].gallery}>
            {t.hero.secondary}
            <ArrowRight size={19} />
          </a>
        </div>
      </div>
      <MegaName />
    </section>
  );
}

function MegaName() {
  return (
    <div className="mega-name" data-text="DJ SAMET ILYAZ" aria-hidden="true">
      <span className="mega-readable">DJ SAMET ILYAZ</span>
      <span className="mega-split-line" />
      <span className="mega-mobile-lines">
        <span className="mega-mobile-line" data-text="DJ SAMET" />
        <span className="mega-mobile-line" data-text="ILYAZ" />
      </span>
    </div>
  );
}

function IntroServices({ t }) {
  return (
    <section className="intro-section section-with-pattern">
      <div className="container intro-grid">
        <div className="section-copy">
          <p className="section-kicker">{t.intro.kicker}</p>
          <h2>{t.intro.title}</h2>
          <p>{t.intro.body}</p>
          <div className="intro-trust">
            {t.intro.points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
        <div className="service-row">
          {t.services.map((service, index) => {
            const Icon = serviceIcons[index] || Sparkles;
            return (
              <article className={`service-item ${index < 2 ? "service-item-featured" : ""}`} key={service.title}>
                <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-icon">
                  <Icon size={28} />
                </span>
                <div className="service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MediaBand({ t, lang }) {
  return (
    <section className="media-band">
      <img src={eventBandImage} alt="" />
      <div className="play-button" aria-hidden="true">
        <Play size={32} fill="currentColor" />
      </div>
      <div className="media-band-copy">
        <h2>{t.media.title}</h2>
        <a href={paths[lang].gallery}>
          {t.media.cta}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <section className="about-section section-with-pattern">
      <div className="container about-grid">
        <figure className="about-photo">
          <img src={aboutImage} alt="DJ Samet ILYAZ am DJ-Controller" />
        </figure>
        <div className="section-copy about-copy">
          <p className="section-kicker">{t.about.kicker}</p>
          <h2>{t.about.title}</h2>
          <p>{t.about.body}</p>
          <ul className="pill-list">
            {t.about.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function GalleryPreview({ t, lang }) {
  const items = [
    { image: galleryWeddingImage, title: t.services[0].title, className: "tile-wedding" },
    { image: galleryEngagementImage, title: t.services[1].title, className: "tile-engagement" },
    { image: galleryKinaImage, title: t.services[2].title, className: "tile-kina" },
    { image: gallerySunnetImage, title: t.services[3].title, className: "tile-sunnet" },
    { image: galleryCorporateImage, title: t.services[4].title, className: "tile-corporate" },
  ];

  return (
    <section id="gallery" className="gallery-preview">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="section-kicker">{t.gallery.kicker}</p>
            <h2>{t.gallery.title}</h2>
            <p>{t.gallery.body}</p>
          </div>
          <a className="button outline" href={paths[lang].gallery}>
            {t.gallery.cta}
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="gallery-grid">
          {items.map((item) => (
            <a className={`gallery-card ${item.className}`} href={paths[lang].gallery} key={item.title}>
              <img src={item.image} alt="" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof({ t, lang }) {
  return (
    <section className="proof-section section-with-pattern">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="section-kicker">{t.proof.kicker}</p>
            <h2>{t.proof.title}</h2>
          </div>
          <a className="button outline" href={paths[lang].references}>
            {t.proof.cta}
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="proof-grid">
          {t.proof.items.map(([title, text], index) => {
            const Icon = proofIcons[index] || Sparkles;
            return (
              <article className="proof-item" key={title}>
                <span className="proof-icon">
                  <Icon size={31} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ t, lang }) {
  return (
    <section className="final-cta">
      <div className="container">
        <p className="section-kicker">{t.final.kicker}</p>
        <h2>{t.final.title}</h2>
        <p>{t.final.body}</p>
        <a className="button primary large" href={whatsappUrl(lang)} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={24} />
          {t.final.cta}
        </a>
        <div className="cta-notes">
          {t.final.notes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPage({ t, lang }) {
  const galleryTiles = [
    { image: eventBandImage, title: t.galleryPage.filters[0], size: "tile-large" },
    { image: heroImage, title: t.galleryPage.filters[1], size: "" },
    { image: aboutImage, title: t.galleryPage.filters[2], size: "" },
    { image: eventBandImage, title: t.galleryPage.filters[3], size: "tile-wide" },
    { image: originalImage, title: "DJ Samet ILYAZ", size: "" },
  ];

  return (
    <main className="subpage">
      <PageHero title={t.galleryPage.title} body={t.galleryPage.body} />
      <section className="subpage-section">
        <div className="container">
          <div className="filter-row">
            {t.galleryPage.filters.map((filter) => (
              <span key={filter}>{filter}</span>
            ))}
          </div>
          <div className="gallery-masonry">
            {galleryTiles.map((tile) => (
              <article className={`masonry-tile ${tile.size}`} key={`${tile.title}-${tile.size}`}>
                <img src={tile.image} alt="" />
                <div>
                  <Images size={18} />
                  <span>{tile.title}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCta
        t={{
          ...t,
          final: { ...t.final, title: t.galleryPage.ctaTitle },
        }}
        lang={lang}
      />
    </main>
  );
}

function ReferencesPage({ t, lang }) {
  return (
    <main className="subpage">
      <PageHero title={t.referencesPage.title} body={t.referencesPage.body} />
      <section className="subpage-section">
        <div className="container references-layout">
          <div className="reference-visual">
            <img src={eventBandImage} alt="" />
          </div>
          <div className="reference-cards">
            {t.referencesPage.cards.map(([title, text]) => (
              <article className="reference-card" key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Proof t={t} lang={lang} />
      <FinalCta t={t} lang={lang} />
    </main>
  );
}

function PageHero({ title, body }) {
  return (
    <section className="page-hero section-with-pattern">
      <div className="page-hero-bg" aria-hidden="true">
        <img src={heroImage} alt="" />
      </div>
      <div className="container">
        <p className="section-kicker">DJ Samet ILYAZ</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
      <MegaName />
    </section>
  );
}

function LegalPage({ t, lang, type }) {
  const page = t.legal[type];

  return (
    <main className="legal-page">
      <section className="legal-hero section-with-pattern">
        <div className="container">
          <p className="section-kicker">DJ Samet ILYAZ</p>
          <h1>{page.title}</h1>
          {page.body && <p>{page.body}</p>}
        </div>
      </section>
      <section className="legal-content">
        <div className="container legal-layout">
          <article className="legal-block">
            <div className="legal-sections">
              {page.sections.map(([title, text]) => (
                <section className="legal-section" key={title}>
                  <h2>{title}</h2>
                  {text.split("\n").map((line) => (
                    <p key={line}>{renderLegalLine(line, lang)}</p>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function renderLegalLine(line, lang) {
  if (line.startsWith("Telefon:")) {
    return (
      <>
        Telefon:{" "}
        <a href={whatsappUrl(lang)} target="_blank" rel="noreferrer">
          {line.replace("Telefon:", "").trim()}
        </a>
      </>
    );
  }

  return line;
}

function Footer({ t, lang }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a className="brand logo-brand footer-brand" href={paths[lang].home} aria-label="DJ Samet ILYAZ">
          <img className="brand-logo" src={logoImage} alt="DJ Samet ILYAZ" />
        </a>
        <div className="footer-links">
          <a className="footer-social" href={instagramUrl} target="_blank" rel="noreferrer">
            <Instagram size={17} />
            Instagram
          </a>
          <a href={paths[lang].gallery}>{t.nav.gallery}</a>
          <a href={paths[lang].references}>{t.nav.references}</a>
          <a href={paths[lang].imprint}>{t.footer.imprint}</a>
          <a href={paths[lang].privacy}>{t.footer.privacy}</a>
          <a href={whatsappUrl(lang)} target="_blank" rel="noreferrer">
            {t.nav.whatsApp}
          </a>
        </div>
      </div>
    </footer>
  );
}

function UsersIcon({ size = 24, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path
        d="M8.6 11.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.8-.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4ZM3.6 19.2c.5-3.5 2.3-5.4 5-5.4s4.4 1.9 5 5.4M13.2 14.2c.6-.3 1.3-.4 2.1-.4 2.4 0 4.1 1.7 4.7 5.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ size = 24, ...props }) {
  return (
    <svg
      className="whatsapp-icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.04 2a9.94 9.94 0 0 0-8.56 15.01L2 22l5.12-1.34A9.93 9.93 0 1 0 12.04 2Zm0 18.18a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.04.8.81-2.96-.2-.3a8.22 8.22 0 1 1 6.93 3.79Z"
      />
    </svg>
  );
}

export default App;
