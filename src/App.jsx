import { useEffect, useState, useRef } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const navItems = [
  ['Work', '#portfolio'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Process', '#process'],
  ['Contact', '#contact'],
];

const portfolioItems = [
  {
    id: 'pencil-portrait',
    category: 'Pencil Sketching',
    title: 'Portrait Study – Traditional Attire',
    description:
      'Fine-line pencil portrait exploring form, texture, and cultural identity through detailed crosshatching and tonal gradation.',
    medium: 'Pencil on cartridge paper',
    year: '2024',
    image: '/images/sketch_portrait_1.jpg',
    tags: ['Portraiture', 'Pencil', 'Crosshatching'],
    featured: true,
  },
  {
    id: 'cartoon-sheet',
    category: 'Character Design',
    title: 'Character Design Sheet – Kofi & Friends',
    description:
      `Full character bible for an African children\u2019s comic \u2014 hero, mentor and sidekick explored through multiple poses, emotions, and relationships.`,
    medium: 'Digital + Ink',
    year: '2024',
    image: '/images/cartoon_characters.jpg',
    tags: ['Character Design', 'Comics', "Children\u2019s Book"],
    featured: true,
  },
  {
    id: 'comic-origin',
    category: 'Comics & Inking',
    title: 'Origin Story – Nairobi Knight',
    description:
      'A six-panel ink comic sequence set in downtown Nairobi: dynamic action compositions, speed lines, bold crosshatch shadows, and amber colour accents.',
    medium: 'Ink on Bristol board, digital colour',
    year: '2025',
    image: '/images/ink_comic_panel.jpg',
    tags: ['Comic Art', 'Inking', 'Sequential Art'],
    featured: false,
  },
  {
    id: 'watercolor-savanna',
    category: 'Watercolour Illustration',
    title: 'Golden Hour – Maasai Mara',
    description:
      'Loose, expressive watercolour landscape capturing the fleeting light of the East African savanna — wet-on-wet sky, layered silhouettes, and reflective water.',
    medium: 'Watercolour on cold-press paper',
    year: '2024',
    image: '/images/watercolor_landscape.jpg',
    tags: ['Watercolour', 'Landscape', 'Environment Art'],
    featured: false,
  },
  {
    id: 'editorial-tech',
    category: 'Editorial Illustration',
    title: 'Africa Rising – Tech & Tradition',
    description:
      'Bold editorial piece for a digital magazine feature: flat-design illustration merging Maasai beadwork motifs with circuit-board patterns under a baobab.',
    medium: 'Digital illustration',
    year: '2025',
    image: '/images/editorial_illustration.jpg',
    tags: ['Editorial', 'Digital', 'Flat Design'],
    featured: false,
  },
];

const skills = [
  {
    icon: '✏️',
    title: 'Pencil & Graphite Sketching',
    text: 'Precise control of value, line weight, and texture through HB–6B graphite. Portraiture, figure drawing, gesture studies, and observational sketching.',
    color: 'skill-sketch',
  },
  {
    icon: '🖊️',
    title: 'Ink & Comic Art',
    text: 'Dynamic sequential panel composition, bold inking with microns and brush pens, speed lines, sound effects lettering, and panel-to-panel storytelling flow.',
    color: 'skill-ink',
  },
  {
    icon: '🎨',
    title: 'Watercolour & Mixed Media',
    text: 'Wet-on-wet landscape painting, expressive loose portraiture, transparent glazing, and mixed-media combinations with ink and coloured pencil.',
    color: 'skill-water',
  },
  {
    icon: '🦸',
    title: 'Character Design & Cartoons',
    text: "Building original character bibles \u2014 silhouettes, proportion studies, expression sheets, turnarounds, and cultural costume research for children\u2019s comics and animation.",
    color: 'skill-char',
  },
  {
    icon: '🖥️',
    title: 'Digital Illustration',
    text: 'Clean vector artwork, editorial flat-design, digital inking over pencil roughs, and textured digital painting for print and web.',
    color: 'skill-digital',
  },
  {
    icon: '📖',
    title: 'Storyboarding & Visual Narrative',
    text: 'Panel layouts, visual pacing, camera angle choices, shot transitions, and mood-board development for animated shorts and graphic novels.',
    color: 'skill-story',
  },
];

const processSteps = [
  { num: '01', title: 'Concept & Research', desc: 'Gathering references, exploring cultural context, and sketching rough thumbnail ideas before committing to a direction.' },
  { num: '02', title: 'Rough Sketches', desc: 'Loose gesture drawings and compositional roughs to lock in the pose, layout, and storytelling moment.' },
  { num: '03', title: 'Refined Line Art', desc: 'Tightening the drawing with clean pencil or ink linework, establishing hierarchy and detail levels.' },
  { num: '04', title: 'Value & Colour', desc: 'Blocking in tones, then adding colour in watercolour washes or digitally, always reading well in greyscale first.' },
  { num: '05', title: 'Final Finish', desc: 'Texture, edge quality adjustments, any lettering, and final scan or export for print or digital delivery.' },
];

const stats = [
  { value: '3+', label: 'Years drawing' },
  { value: '50+', label: 'Portfolio pieces' },
  { value: '5', label: 'Art disciplines' },
  { value: '∞', label: 'Sketchbooks filled' },
];

// ─── TYPED TEXT HOOK ─────────────────────────────────────────────────────────

function useTypedText(phrases) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    let speed = deleting ? 45 : 85;

    if (!deleting && charIndex === phrase.length) {
      const id = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(id);
    }
    if (deleting && charIndex === 0) {
      const id = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((c) => (c + 1) % phrases.length);
      }, 400);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setCharIndex((c) => c + (deleting ? -1 : 1)), speed);
    return () => clearTimeout(id);
  }, [charIndex, deleting, phraseIndex, phrases]);

  return phrases[phraseIndex].slice(0, charIndex);
}

// ─── INTERSECTION OBSERVER HOOK ───────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="header-inner">
        <a className="logo" href="#home" onClick={close}>
          Brian<span>Mwololo</span>
          <em>Illustrator</em>
        </a>
        <button
          className={`menu-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          type="button"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
        <nav id="nav-menu" className={open ? 'active' : ''}>
          {navItems.map(([label, href]) => (
            <a href={href} onClick={close} key={href}>{label}</a>
          ))}
          <a href="#contact" className="nav-cta" onClick={close}>Commission</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const typed = useTypedText([
    'Illustrations',
    'Pencil Sketches',
    'Comic Art',
    'Character Designs',
    'Watercolour Scenes',
  ]);

  return (
    <section className="hero" id="home">
      <div className="hero-bg-art">
        <img src="/images/hero_art_workspace.jpg" alt="Artist workspace" />
        <div className="hero-overlay" />
      </div>
      <div className="hero-content">
        <p className="hero-kicker">✦ Illustration · Sketching · Cartooning · Kenya</p>
        <h1>
          Brian Mwololo creates{' '}
          <span className="typed-text">{typed}</span>
          <span className="cursor-blink">|</span>
        </h1>
        <p className="hero-sub">
          A Kenyan illustrator and cartoonist passionate about storytelling through pencil, ink,
          watercolour, and character design — rooted in African visual culture.
        </p>
        <div className="hero-stats">
          {stats.map(({ value, label }) => (
            <div className="stat-item" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <a href="#portfolio" className="btn">View Portfolio</a>
          <a href="#contact" className="btn btn-ghost">Commission Work</a>
        </div>
      </div>
    </section>
  );
}

function RevealWrapper({ children, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'revealed' : ''} ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="section-header">
      {label && <span className="section-label">{label}</span>}
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="underline-brush" />
    </div>
  );
}

function PortfolioCard({ item }) {
  const [ref, visible] = useReveal();
  return (
    <article
      ref={ref}
      className={`portfolio-card ${item.featured ? 'featured' : ''} ${visible ? 'revealed' : ''}`}
      id={item.id}
    >
      <div className="portfolio-img-wrap">
        <img src={item.image} alt={item.title} loading="lazy" />
        <div className="portfolio-overlay">
          <span className="overlay-category">{item.category}</span>
          <span className="overlay-medium">{item.medium}</span>
        </div>
        {item.featured && <span className="featured-badge">✦ Featured</span>}
      </div>
      <div className="portfolio-info">
        <div className="portfolio-meta">
          <span className="portfolio-category">{item.category}</span>
          <span className="portfolio-year">{item.year}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="portfolio-tags">
          {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(portfolioItems.map((i) => i.category))];
  const filtered = filter === 'All' ? portfolioItems : portfolioItems.filter((i) => i.category === filter);

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <RevealWrapper>
          <SectionHeader
            label="Selected Work"
            title="Portfolio"
            subtitle="A curated selection of illustration, sketching, and cartooning work spanning multiple disciplines."
          />
        </RevealWrapper>
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={`portfolio-grid ${filtered.length === 1 ? 'single' : ''}`}>
          {filtered.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section section-dark">
      <div className="container about-layout">
        <RevealWrapper className="about-image-col">
          <div className="about-img-frame">
            <img src="/images/20240124_170513.jpg" alt="Brian Mwololo" />
            <div className="about-img-deco" />
          </div>
        </RevealWrapper>
        <RevealWrapper className="about-text-col">
          <SectionHeader label="About Me" title="The Artist Behind the Lines" />
          <p>
            I'm <strong>Brian Mwololo</strong>, a Kenyan illustrator and cartoonist with a passion for
            storytelling through drawing. My work spans pencil portraiture, ink comics, watercolour
            scenes, and character design for children's books and graphic novels.
          </p>
          <p>
            Trained in Applied Computing and self-taught in fine arts, I bring both technical precision
            and creative instinct to every piece. I'm particularly drawn to African visual narratives —
            using illustration to celebrate Kenyan culture, tell human stories, and create characters
            that look like the people I grew up around.
          </p>
          <p>
            I'm available for editorial commissions, character design projects, children's book
            illustration, comic inking, and poster art — remotely worldwide or on-site in East Africa.
          </p>
          <div className="about-highlights">
            <div>
              <strong>🖊️ Primary Media</strong>
              <span>Pencil, Ink, Watercolour, Digital</span>
            </div>
            <div>
              <strong>📍 Based in</strong>
              <span>Nairobi, Kenya</span>
            </div>
            <div>
              <strong>🌍 Available for</strong>
              <span>Remote &amp; Local Commissions</span>
            </div>
          </div>
          <div className="about-actions">
            <a href="#contact" className="btn">Work With Me</a>
            <a href="/files/Brian_Mwololo_CV.pdf" className="btn btn-outline" download>Download CV</a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <RevealWrapper>
          <SectionHeader
            label="Disciplines"
            title="What I Do"
            subtitle="A multi-discipline illustrator comfortable across traditional and digital media."
          />
        </RevealWrapper>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <RevealWrapper key={skill.title}>
              <article className={`skill-card ${skill.color}`} style={{ '--delay': `${i * 0.08}s` }}>
                <span className="skill-icon">{skill.icon}</span>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section section-dark">
      <div className="container">
        <RevealWrapper>
          <SectionHeader
            label="How I Work"
            title="My Creative Process"
            subtitle="From rough concept to finished artwork — a structured approach that keeps the creative energy alive."
          />
        </RevealWrapper>
        <div className="process-steps">
          {processSteps.map((step, i) => (
            <RevealWrapper key={step.num}>
              <div className="process-step" style={{ '--delay': `${i * 0.1}s` }}>
                <span className="step-num">{step.num}</span>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <RevealWrapper>
          <SectionHeader
            label="Get In Touch"
            title="Commission a Piece"
            subtitle="Available for editorial illustration, character design, comic inking, children's book art, and poster commissions."
          />
        </RevealWrapper>
        <div className="contact-layout">
          <RevealWrapper className="contact-info">
            <div className="contact-card">
              <h3>What I take on</h3>
              <ul>
                <li>✦ Children's book illustration</li>
                <li>✦ Editorial &amp; magazine illustration</li>
                <li>✦ Comic book / graphic novel inking</li>
                <li>✦ Character design &amp; character bibles</li>
                <li>✦ Portrait commissions (pencil / digital)</li>
                <li>✦ Poster &amp; cover art</li>
                <li>✦ Storyboard &amp; visual narrative</li>
              </ul>
              <div className="contact-links">
                <a href="https://github.com/BrianMwololo" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/brian-mwololo-08a956387/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://wa.me/254790723820?text=Hi%20Brian,%20I%20saw%20your%20illustration%20portfolio%20and%20would%20like%20to%20commission%20some%20work!" target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
          </RevealWrapper>
          <RevealWrapper className="contact-form-wrap">
            <form action="https://formspree.io/f/xlgwazlw" method="POST" className="contact-form">
              <input type="hidden" name="_next" value="https://portfolio-ecru-theta-47.vercel.app/success.html" />
              <div className="form-row">
                <input type="text" name="name" placeholder="Your Name" required id="contact-name" />
                <input type="email" name="email" placeholder="Your Email" required id="contact-email" />
              </div>
              <input type="text" name="organization" placeholder="Organization / Publication (optional)" id="contact-org" />
              <select name="commission_type" required defaultValue="" id="contact-type">
                <option value="" disabled>Type of Commission</option>
                <option value="Children's Book Illustration">Children's Book Illustration</option>
                <option value="Editorial Illustration">Editorial Illustration</option>
                <option value="Character Design">Character Design</option>
                <option value="Comic / Graphic Novel Inking">Comic / Graphic Novel Inking</option>
                <option value="Portrait Commission">Portrait Commission</option>
                <option value="Poster / Cover Art">Poster / Cover Art</option>
                <option value="Storyboard">Storyboard</option>
                <option value="Other">Other</option>
              </select>
              <textarea name="message" rows="5" placeholder="Tell me about your project — theme, style, deadline, and budget" required id="contact-message" />
              <button type="submit" className="btn" id="contact-submit">Send Commission Brief</button>
            </form>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/254790723820?text=Hi%20Brian,%20I%20saw%20your%20illustration%20portfolio%20and%20would%20like%20to%20commission%20some%20work!"
      className="whatsapp-float"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      id="whatsapp-float"
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      <span>Commission Me</span>
    </a>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="logo" href="#home">Brian<span>Mwololo</span></a>
          <p>Kenyan Illustrator · Sketching · Cartooning · Comics</p>
        </div>
        <nav className="footer-nav">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
        <div className="footer-social">
          <a href="https://github.com/BrianMwololo" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/brian-mwololo-08a956387/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://wa.me/254790723820" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <p className="footer-copy">© 2026 Brian Mwololo — Illustrator, Nairobi Kenya</p>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Skills />
        <Process />
        <Contact />
      </main>
      <WhatsAppFloat />
      <Footer />
    </>
  );
}
