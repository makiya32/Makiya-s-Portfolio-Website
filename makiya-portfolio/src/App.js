import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const SKILLS = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Java', 'HTML/CSS'] },
  { category: 'Frameworks', items: ['React', 'Next.js', 'Flutter', 'Node.js'] },
  { category: 'Tools', items: ['Firebase', 'Supabase', 'Airtable', 'Figma', 'Git', 'Clerk'] },
  { category: 'Environments', items: ['VS Code', 'Xcode', 'GitHub Copilot', 'Cursor', 'macOS'] },
];

const EXPERIENCE = [
  {
    role: 'Software Engineering Intern',
    org: 'Uptown & Boogie / Healthy Project',
    period: 'Jun 2025 – Aug 2025',
    location: 'New York, NY',
    bullets: [
      'Led development of the Vendor Dashboard as a full-stack developer using Figma designs, React, TypeScript, and Airtable — enabling smooth onboarding for 30+ vendors.',
      "Integrated secure user authentication via Clerk's REST API and Next.js server-side helpers, protecting dashboards from unauthorized access.",
      "Designed a vendor database in Airtable and connected it to the website's backend using Airtable API calls.",
    ],
  },
  {
    role: 'Undergraduate Teaching Assistant',
    org: 'CUNY Hunter College — CS Dept.',
    period: 'Sep 2024 – Present',
    location: 'New York, NY',
    bullets: [
      'Led weekly lab sessions for 200+ students in Intro to Computer Science, reinforcing key concepts in Python and C++.',
      'Developed supplementary materials including coding examples and practice problems.',
      'Provided one-on-one tutoring, offering personalized mentorship to support individual student growth.',
    ],
  },
  {
    role: 'Lead Hackathon Organizer',
    org: 'HunterHacks',
    period: 'May 2025, April 2026',
    location: 'New York, NY',
    bullets: [
      'Led sponsorship outreach securing $8,000 in corporate and internal funding to cover event costs.',
      'Co-led end-to-end organization of two collegiate hackathons, scaling to 130 participants.',
      'Directed a team of 18 volunteers, coordinating logistics, scheduling, and day-of operations.',
    ],
  },
  {
    role: 'Vice-President',
    org: 'Women in Computer Science Club @ Hunter',
    period: 'Jan 2025 – Present',
    location: 'New York, NY',
    bullets: [
      'Advocate for diversity in tech, ensuring workshop topics and mentorship opportunities support underrepresented groups.',
      'Coordinate with guest speakers and industry professionals to organize hands-on learning sessions and networking events.',
    ],
  },
];

const PROJECTS = [
  {
    name: 'FlockSync',
    tagline: 'Resident communication platform',
    description:
      'A centralized app for building residents and management to share announcements, submit maintenance requests, and communicate in real time. Designed to improve transparency and responsiveness between tenants and property teams.',
    role: 'Full-Stack Developer — designed the app and built the forum/community feature.',
    tech: ['Flutter', 'Firebase', 'Supabase', 'Node.js'],
    live: 'https://dataagent47.github.io/Flocksync/',
    github: 'https://github.com/makiya32',
    type: 'Capstone Project',
  },
  {
    name: 'Green Café',
    tagline: "Café website",
    description:
      "A clean, inviting website for a café, built solo from the ground up. Focused on warm aesthetics, smooth navigation, and a welcoming user experience that reflects the café's identity.",
    role: "Front-End Developer — sole developer, designed and built the full site.",
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://cafe-website-one-omega.vercel.app',
    github: 'https://github.com/makiya32',
    type: 'Personal Project',
  },
  {
    name: 'UCM',
    tagline: 'Utility Construction Management company website',
    description:
      'A professional website for Utility Construction Management, a small drilling and utility construction business. Built to showcase services, establish credibility, and give potential clients a clear way to get in touch.',
    role: 'Front-End Developer — sole developer, designed and built the full site for the client.',
    tech: ['React', 'JavaScript', 'Bluehost'],
    live: 'https://ucmrl.com/',
    github: 'https://github.com/makiya32',
    type: 'Client Project',
  },
];

function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const ids = ['about', 'experience', 'projects', 'contact'];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);
  return active;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav__inner">
        <a href="#hero" className="nav__logo" aria-label="Back to top">
          ML<span className="nav__logo-dot">.</span>
        </a>
        <ul className="nav__links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav__link${active === href.slice(1) ? ' nav__link--active' : ''}`}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://wispy-brook-471.linkyhost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav__resume-btn"
              aria-label="Open resume"
            >
              Resume
            </a>
          </li>
        </ul>
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
      {menuOpen && (
        <div className="nav__mobile" role="dialog" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="nav__mobile-link" onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href="https://wispy-brook-471.linkyhost.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav__mobile-link nav__mobile-resume"
            onClick={() => setMenuOpen(false)}
          >
            Resume ↗
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__greeting">Hi, I'm</p>
          <h1 className="hero__name">Makiya<br />Laurenza</h1>
          <p className="hero__title">Recent Computer Science Graduate</p>
          <p className="hero__sub">
            Building thoughtful digital experiences at the intersection of design and engineering. Based in New York, NY.
          </p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">View My Work</a>
            <a href="#contact" className="btn btn--outline">Get In Touch</a>
          </div>
        </div>
        <div className="hero__decoration" aria-hidden="true">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
          <img
            src="/brand-photo.png"
            alt=""
            className="hero__brand-photo"
          />
        </div>
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-heading">
      <div className="section__inner">
        <div className="section__label" aria-hidden="true">01</div>
        <h2 id="about-heading" className="section__title">About Me</h2>
        <div className="about__grid">
          <div className="about__text">
            <p>
            I'm a recent Computer Science graduate from Hunter College looking to grow into a career I love. I'm currently drawn toward technical product design and product management roles.
            </p>
            <p>
            During my time as an undergrad, I made the most of every opportunity in front of me. I became a Teaching Assistant in my sophomore year, joined clubs and rose to Vice President of the Women in Computer Science Club, and helped lead the first-ever hackathon at my school. That experience taught me how to negotiate sponsorships, market an event, communicate across teams, and make fast decisions under pressure. 
            </p>
            <p>
            Outside of tech, I'm always down for a pickleball match, a long walk around the city, or anything that happens to be green.
            </p>
            <div className="about__highlights">
              <div className="about__highlight">
                <span className="about__highlight-num">130+</span>
                <span className="about__highlight-label">Hackathon participants led</span>
              </div>
              <div className="about__highlight">
                <span className="about__highlight-num">200+</span>
                <span className="about__highlight-label">Students taught as TA</span>
              </div>
              <div className="about__highlight">
                <span className="about__highlight-num">30+</span>
                <span className="about__highlight-label">Vendors onboarded</span>
              </div>
            </div>
          </div>
          <div className="about__skills">
            {SKILLS.map(({ category, items }) => (
              <div key={category} className="about__skill-group">
                <h3 className="about__skill-cat">{category}</h3>
                <div className="about__skill-list">
                  {items.map((s) => (
                    <span key={s} className="about__skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
            <div className="about__edu">
              <div className="about__edu-icon" aria-hidden="true">🎓</div>
              <div>
                <p className="about__edu-school">Hunter College, CUNY</p>
                <p className="about__edu-degree">B.A. Computer Science · June 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" className="section experience" aria-labelledby="exp-heading">
      <div className="section__inner">
        <div className="section__label" aria-hidden="true">02</div>
        <h2 id="exp-heading" className="section__title">Experience</h2>
        <div className="exp__list">
          {EXPERIENCE.map((item, i) => (
            <div key={i} className={`exp__item${open === i ? ' exp__item--open' : ''}`}>
              <button
                className="exp__header"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <div className="exp__header-left">
                  <span className="exp__role">{item.role}</span>
                  <span className="exp__org">{item.org}</span>
                </div>
                <div className="exp__header-right">
                  <span className="exp__period">{item.period}</span>
                  <span className="exp__chevron" aria-hidden="true">{open === i ? '−' : '+'}</span>
                </div>
              </button>
              {open === i && (
                <ul className="exp__bullets">
                  {item.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="exp__extras">
          <h3 className="exp__extras-title">Other Achievements</h3>
          <div className="exp__extras-grid">
            {[
              { label: 'Basta × Google SWE Prep', sub: '10-week Google Engineer mentorship' },
              { label: 'CodePath — Technical Interview Prep 101 & 102', sub: 'Fall 2024, Summer 2025' },
              { label: 'AWS Jam', sub: 'East Preliminary Jam — Team Winners' },
            ].map((e) => (
              <div key={e.label} className="exp__extra-card">
                <p className="exp__extra-label">{e.label}</p>
                <p className="exp__extra-sub">{e.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="proj-heading">
      <div className="section__inner">
        <div className="section__label" aria-hidden="true">03</div>
        <h2 id="proj-heading" className="section__title">Projects</h2>
        <div className="proj__grid">
          {PROJECTS.map((p) => (
            <article key={p.name} className="proj__card" aria-label={p.name}>
              <div className="proj__card-header">
                <span className="proj__type">{p.type}</span>
                <div className="proj__links">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo for ${p.name}`}
                    className="proj__link"
                  >
                    ↗ Live
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub for ${p.name}`}
                    className="proj__link"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <h3 className="proj__name">{p.name}</h3>
              <p className="proj__tagline">{p.tagline}</p>
              <p className="proj__desc">{p.description}</p>
              <p className="proj__role"><strong>Role:</strong> {p.role}</p>
              <div className="proj__tech">
                {p.tech.map((t) => (
                  <span key={t} className="proj__tech-tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const email = 'makiyalaurenza1@gmail.com';
  const [emailCopied, setEmailCopied] = useState(false);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setEmailCopied(true);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setEmailCopied(false), 1600);
    } catch {
      // If clipboard is blocked, silently do nothing.
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="section__inner contact__inner">
        <div className="section__label" aria-hidden="true">04</div>
        <h2 id="contact-heading" className="section__title">Get In Touch</h2>
        <p className="contact__intro">
          Whether you have a project in mind, a role to fill, or just want to connect — my inbox is open.
        </p>
        <a
          href="mailto:makiyalaurenza1@gmail.com"
          className="contact__email-btn"
          aria-label="Send email to Makiya"
        >
          Say Hello ↗
        </a>
        <div className="contact__links">
          <a
            href="https://www.linkedin.com/in/makiya-laurenza/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social"
            aria-label="LinkedIn profile"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.4v1.56h.05c.47-.9 1.62-1.86 3.33-1.86 3.56 0 4.22 2.35 4.22 5.41v6.34ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.78 24h20.44C23.2 24 24 23.22 24 22.26V1.74C24 .78 23.2 0 22.22 0Z"
              />
            </svg>
          </a>
          <span className="contact__divider" aria-hidden="true">·</span>
          <a
            href="https://github.com/makiya32"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social"
            aria-label="GitHub profile"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"
              />
            </svg>
          </a>
          <span className="contact__divider" aria-hidden="true">·</span>
          <button
            type="button"
            className="contact__social contact__social-btn"
            aria-label="Copy email to clipboard"
            title="Copy email"
            onClick={copyEmail}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
              />
            </svg>
          </button>
        </div>
        <p
          className={`contact__copied${emailCopied ? ' contact__copied--show' : ''}`}
          role="status"
          aria-live="polite"
        >
          email copied to clipboard
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <p>Designed & built by Makiya Laurenza · {new Date().getFullYear()}</p>
    </footer>
  );
}

export default function App() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let raf = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const update = () => {
      raf = 0;
      el.style.setProperty('--glow-x', `${lastX}px`);
      el.style.setProperty('--glow-y', `${lastY}px`);
    };

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    update();

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
