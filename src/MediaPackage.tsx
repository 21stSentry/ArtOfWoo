import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentSeo } from './seo'

const centerArtwork = new URL('../images/Sonic-Bloom-gold.jpg', import.meta.url).href
const MEDIA_PACKAGE_TITLE = 'Sonic Bloom Media Package | Immersive Music and Art Experience'
const MEDIA_PACKAGE_DESCRIPTION = 'Sonic Bloom is an immersive music and art experience for Bay Area venues, festivals, galleries, and private events, combining spatial sound, tactile bass, ceremony, and live performance.'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --black: #000000;
  --deep: #000000;
  --gold: #D4A843;
  --gold2: #E8C87A;
  --coral: #C8614A;
  --teal: #3ABFB0;
  --off-white: #F2EDE4;
  --muted: #7A7060;
  --serif: 'Crimson Pro', Georgia, serif;
  --display: 'Cinzel', serif;
  --sans: 'Josefin Sans', sans-serif;
}

html { scroll-behavior: smooth; }
body { background: var(--black); }

.mp {
  min-height: 100vh;
  background: var(--black);
  color: var(--off-white);
  font-family: var(--serif);
}

.mp a { color: inherit; }

.mp-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(180deg, rgba(5, 5, 10, 0.94), rgba(5, 5, 10, 0.72));
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(212, 168, 67, 0.1);
}

.mp-nav-center {
  font-family: var(--display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  background: linear-gradient(to right, var(--gold), var(--gold2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mp-nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  position: absolute;
  right: 1.5rem;
}

.mp-nav-link {
  font-family: var(--sans);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-decoration: none;
  color: var(--muted);
  transition: color 0.2s ease;
}

.mp-nav-link:hover { color: var(--gold); }

.mp-intro { display: none; }

.mp-overline {
  font-family: var(--sans);
  font-size: 10px;
  letter-spacing: 0.35em;
  color: var(--teal);
  margin-bottom: 1.2rem;
}

.mp-title {
  font-family: var(--display);
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: 0.06em;
  background: linear-gradient(135deg, var(--gold2), var(--gold) 50%, var(--coral));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.6rem;
}

.mp-sub {
  font-family: var(--display);
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  letter-spacing: 0.3em;
  color: rgba(242, 237, 228, 0.4);
  margin-bottom: 1.8rem;
}

.mp-tagline {
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  font-style: italic;
  font-weight: 300;
  color: rgba(242, 237, 228, 0.65);
  max-width: 560px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
}

.mp-stat-row {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.mp-stat-pill { text-align: center; }

.mp-stat-val {
  font-family: var(--display);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--gold);
  display: block;
}

.mp-stat-lbl {
  font-family: var(--sans);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--muted);
}

.mp-scaffold {
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(384px, 552px) minmax(320px, 1fr);
  gap: 2rem;
  align-items: start;
  max-width: 1560px;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
  position: relative;
}

.mp-col-left,
.mp-col-right {
  min-width: 0;
  width: 100%;
}

.mp-col-left { padding-right: 1rem; }
.mp-col-right { padding-left: 1rem; }

.mp-col-center {
  position: sticky;
  top: 5rem;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: start;
  z-index: 10;
}

.mp-center-stack {
  width: 100%;
  max-width: 552px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.mp-center-wrap {
  width: 100%;
  max-width: 504px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mp-center-img {
  width: 100%;
  height: auto;
  display: block;
  filter: saturate(1.04) brightness(0.98);
}

.mp-center-info {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
}

.mp-center-info .mp-tagline {
  margin-bottom: 1rem;
  font-size: clamp(0.92rem, 1.3vw, 1.08rem);
  line-height: 1.6;
}

.mp-center-info .mp-stat-row {
  order: -1;
  gap: 0.9rem 1.2rem;
  margin-bottom: 1rem;
}

.mp-center-info .mp-stat-val {
  font-size: 1.3rem;
}

.mp-center-info .mp-sub {
  display: none;
  margin-bottom: 1rem;
}

.mp-center-info .mp-stat-pill:last-child {
  display: none;
}

.mp-block {
  min-height: 78vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 0;
  border-bottom: 1px solid rgba(242, 237, 228, 0.05);
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.mp-block.visible {
  opacity: 1;
  transform: translateY(0);
}

.mp-col-right .mp-block {
  transition-delay: 0.15s;
}

.mp-blockTop {
  justify-content: flex-start;
}

.mp-tag {
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.22em;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mp-tag::before {
  content: '';
  display: block;
  width: 18px;
  height: 1px;
}

.mp-tag.gold { color: var(--gold); }
.mp-tag.gold::before { background: var(--gold); }
.mp-tag.teal { color: var(--teal); }
.mp-tag.teal::before { background: var(--teal); }
.mp-tag.coral { color: var(--coral); }
.mp-tag.coral::before { background: var(--coral); }

.mp h2 {
  font-family: var(--display);
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--off-white);
}

.mp .g { color: var(--gold2); }
.mp .t { color: var(--teal); }
.mp .c { color: var(--coral); }

.mp-body {
  font-size: 1.08rem;
  font-weight: 300;
  color: rgba(242, 237, 228, 0.68);
  line-height: 1.8;
  margin-bottom: 0.9rem;
}

.mp-body strong { color: var(--gold2); font-weight: 400; }
.mp-body em { color: var(--off-white); }

.mp-pull-quote {
  border-left: 3px solid var(--coral);
  padding-left: 1.2rem;
  margin: 1.2rem 0;
}

.mp-pull-quote p {
  font-size: 1rem;
  font-style: italic;
  font-weight: 300;
  color: rgba(242, 237, 228, 0.82);
  line-height: 1.7;
  margin-bottom: 0.4rem;
}

.mp-pull-quote cite {
  font-family: var(--sans);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--muted);
  font-style: normal;
}

.mp-tech-list { margin-top: 0.8rem; }

.mp-tech-row {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(242, 237, 228, 0.05);
}

.mp-tech-row:last-child { border-bottom: none; }

.mp-tech-icon {
  font-family: var(--display);
  font-size: 1.4rem;
  color: var(--teal);
  opacity: 0.5;
  min-width: 1.8rem;
  line-height: 1;
  margin-top: 2px;
}

.mp-tech-row h4,
.mp-logi-label,
.mp-model-tag,
.mp-artist-role,
.mp-footer-sub,
.mp-footer-links a,
.mp-btn {
  font-family: var(--sans);
}

.mp-tech-row h4 {
  font-size: 1.05rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: var(--teal);
  margin-bottom: 3px;
}

.mp-tech-row p,
.mp-artist-bio,
.mp-model p,
.mp-logi-val {
  font-size: 1.02rem;
  font-weight: 300;
  color: rgba(242, 237, 228, 0.55);
  line-height: 1.6;
}

.mp-artist,
.mp-model {
  margin-bottom: 1.4rem;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid rgba(242, 237, 228, 0.05);
}

.mp-artist:last-child,
.mp-model:last-child { border-bottom: none; }

.mp-artist-name {
  font-family: var(--display);
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.mp-artist-role,
.mp-model-tag,
.mp-logi-label,
.mp-footer-sub,
.mp-footer-links a,
.mp-btn {
  font-size: 0.95rem;
  letter-spacing: 0.05em;
}

.mp-artist-role {
  color: var(--muted);
  margin-bottom: 0.5rem;
}

.mp-artist-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.85rem;
}

.mp-artist-link {
  font-family: var(--sans);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--gold2);
  border: 1px solid rgba(212, 168, 67, 0.28);
  padding: 0.42rem 0.6rem;
}

.mp-logi-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.55rem 0;
  border-bottom: 1px solid rgba(242, 237, 228, 0.05);
  gap: 0.5rem;
}

.mp-logi-label {
  color: var(--teal);
  flex-shrink: 0;
  font-size: 0.88rem;
  letter-spacing: 0;
}

.mp-logi-val { text-align: right; }

.mp-model h4 {
  font-family: var(--display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--off-white);
  margin-bottom: 0.4rem;
}

.mp-outro {
  display: none;
  text-align: center;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(212, 168, 67, 0.12);
}

.mp-outro::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(58, 191, 176, 0.06) 0%, transparent 65%);
  pointer-events: none;
}

.mp-outro h2 {
  font-size: clamp(1.8rem, 4vw, 3rem);
  max-width: 560px;
  margin: 0.8rem auto 1.5rem;
}

.mp-outro p {
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 300;
  color: rgba(242, 237, 228, 0.55);
  max-width: 480px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
}

.mp-btn-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.mp-btn {
  font-weight: 300;
  padding: 13px 30px;
  text-decoration: none;
  transition: all 0.3s;
  display: inline-block;
}

.mp-btn-gold {
  background: var(--gold);
  color: var(--black);
  border: 1px solid var(--gold);
}

.mp-btn-gold:hover {
  background: var(--gold2);
  border-color: var(--gold2);
}

.mp-btn-outline {
  background: transparent;
  color: var(--off-white);
  border: 1px solid rgba(242, 237, 228, 0.25);
}

.mp-btn-outline:hover {
  border-color: var(--teal);
  color: var(--teal);
}

.mp-outro-meta {
  font-family: var(--sans);
  font-size: 9px;
  letter-spacing: 0.25em;
  color: var(--muted);
  margin-top: 3rem;
}

.mp-footer {
  background: var(--deep);
  border-top: 1px solid rgba(212, 168, 67, 0.1);
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.mp-footer-brand {
  font-family: var(--display);
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(to right, var(--gold), var(--gold2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mp-footer-sub {
  color: var(--muted);
  margin-top: 3px;
}

.mp-footer-links a {
  color: var(--muted);
  text-decoration: none;
  margin-left: 1.5rem;
  transition: color 0.2s;
}

.mp-footer-links a:hover { color: var(--gold); }

.mp-footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mp-social-link {
  width: 2.35rem;
  height: 2.35rem;
  margin-left: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(242, 237, 228, 0.16);
  border-radius: 999px;
  color: rgba(242, 237, 228, 0.7);
}

.mp-social-link svg {
  width: 1.05rem;
  height: 1.05rem;
  fill: currentColor;
}

.d2-contact-section {
  padding: 3rem 1.5rem 5rem;
}

.d2-contact-inner {
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 2rem;
  border: 1px solid rgba(212, 168, 67, 0.12);
  background: linear-gradient(180deg, rgba(10, 10, 16, 0.76), rgba(0, 0, 0, 0.96));
}

.d2-contact-form {
  margin-top: 2rem;
}

.d2-contact-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.d2-contact-field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.d2-contact-label {
  font-family: var(--sans);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: rgba(242, 237, 228, 0.72);
  text-transform: uppercase;
}

.d2-contact-input,
.d2-contact-textarea {
  width: 100%;
  background: rgba(242, 237, 228, 0.03);
  border: 1px solid rgba(212, 168, 67, 0.18);
  color: var(--off-white);
  padding: 0.95rem 1rem;
  font-family: var(--serif);
  font-size: 1rem;
}

.d2-contact-textarea {
  min-height: 9rem;
  resize: vertical;
}

.d2-contact-input::placeholder,
.d2-contact-textarea::placeholder {
  color: rgba(242, 237, 228, 0.28);
}

.d2-contact-submit {
  margin-top: 0.5rem;
  background: var(--gold);
  color: var(--black);
  border: 1px solid var(--gold);
  padding: 0.95rem 1.4rem;
  font-family: var(--sans);
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
}

.d2-contact-submit:hover {
  background: var(--gold2);
  border-color: var(--gold2);
}

.d2-contact-submit:disabled {
  opacity: 0.6;
  cursor: default;
}

@media (max-width: 980px) {
  .mp-scaffold {
    max-width: 600px;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding: 0 0 4rem;
  }

  .mp-col-center {
    position: relative;
    top: auto;
    width: 100%;
    height: auto;
    order: -1;
    padding: 0 1.5rem 1.5rem;
  }

  .mp-center-stack {
    max-width: 100%;
  }

  .d2-contact-row {
    grid-template-columns: minmax(0, 1fr);
  }

  .mp-col-left,
  .mp-col-right {
    width: 100%;
    padding: 0 1.5rem;
  }

  .mp-block {
    min-height: auto;
    padding: 2.75rem 0;
  }
}

@media (max-width: 720px) {
  .mp-nav {
    padding: 0.9rem 1rem;
  }

  .mp-nav {
    justify-content: flex-start;
    padding-top: 2.9rem;
  }

  .mp-nav-center {
    width: 100%;
    text-align: center;
    font-size: 0.62rem;
    letter-spacing: 0.18em;
  }

  .mp-nav-links {
    position: absolute;
    top: 0.7rem;
    right: 1rem;
    gap: 0.75rem;
  }

  .mp-intro {
    padding: 4.5rem 1.2rem 4rem;
  }

  .mp-title {
    font-size: clamp(3rem, 20vw, 5rem);
  }

  .mp-footer {
    padding: 1.5rem 1rem;
  }

  .mp-footer-links a {
    margin-left: 0;
    margin-right: 1rem;
  }
}
`

const leftBlocks = [
  {
    tag: 'The Experience',
    tagClass: 'gold',
    title: <>Not a concert.<br /><span className="g">A ritual of listening.</span></>,
    body: [
      <>Guests step inside our beautifully designed structure, with artist-designed interior panels, warm mood lighting, and intentional atmosphere. An array of speakers envelop the room, in three-dimensional sound, accompanied with the Crescendo bass-floor.</>,
      <>When the music begins, the implicit instruction is simple: <strong>take a seat and close your eyes</strong> for the duration of the music. What follows is ~10-15 minutes of total sound and sensory immersion. Optional live performances and longer sessions are available.</>,
    ],
  },
  {
    tag: 'The Technology',
    tagClass: 'teal',
    title: <>Sound you <span className="t">feel</span></>,
    tech: [
      {
        icon: '□',
        heading: '7.1.4 Speaker Array - 11 Speakers',
        text: 'Dolby Atmos-style spatial configuration. True 360° sound - above, below, all around.',
      },
      {
        icon: '◎',
        heading: 'Crescendo Bass Floor',
        text: '300-watt transducers built into modular floor tiles. Deep vibration transmitted directly through your body. The room becomes an instrument.',
      },
      {
        icon: '◈',
        heading: 'Handcrafted Structure',
        text: '14×14 ft portable sanctuary. Hand-made interior panels. Expandable by venue. Fully self-contained - we bring everything.',
      },
    ],
  },
  {
    tag: 'Voices of the Experience',
    tagClass: 'coral',
    title: <>They leave <span className="c">altered.</span></>,
    quotes: [
      {
        text: "The sound didn't just surround me, it moved through me. I left feeling genuinely altered, in the best way.",
        cite: 'JON · SAN FRANCISCO',
      },
      {
        text: "That bass floor changed everything. It's one thing to hear music and another to feel it vibrating through your body.",
        cite: 'RUBY · OAKLAND',
      },
      {
        text: "An intimate ceremony set an intention and by the end I felt like I'd been on a journey of mind, body, and spirit.",
        cite: 'SERENA · BERKELEY',
      },
      {
        text: "Dalyte's voice in that space was transcendent. I got my own personal performance from her. Incredible.",
        cite: 'GANESH · ROCKRIDGE',
      },
    ],
  },
  {
    tag: 'The Session',
    tagClass: 'gold',
    title: <>Every gathering is <span className="g">singular.</span></>,
    body: [
      <>Each event opens with a brief ceremony, a frame that sets intention before the music begins. Guests arrive as strangers to the space and leave having been somewhere together.</>,
      <>Some of what they hear was played by <strong>live musicians</strong>, woven into the recording. The distance between performer and listener collapses inside the structure.</>,
      <>We can accommodate up to 16 people per session, and singular pieces of music are 15 minute sessions. For session logistics, the venue can facilitate time slots signups online, or in person, or simply allow first-come, first-served session seating.</>,
    ],
  },
]

const rightBlocks = [
  {
    tag: 'For Venue Managers',
    tagClass: 'teal',
    title: <>We handle <span className="t">everything.</span></>,
    body: [
      <>You provide the space and the audience. We bring the structure, the sound system, the crew, the experience. Your guests encounter something they have never seen before and they will talk about it.</>,
      <>Sonic Bloom is a <strong>fully turnkey embedded event.</strong> No venue staff required. No technical knowledge needed. We load in, build, operate, and strike on our timeline.</>,
    ],
  },
  {
    tag: 'Logistics at a Glance',
    tagClass: 'gold',
    title: <>Space <span className="g">Requirements</span></>,
    logistics: [
      ['Structure', '14×14 ft · expandable'],
      ['Ceiling Height', '10 ft preferred · 8 ft min'],
      ['Load-In', '5-6 hours before event'],
      ['Strike', '4-6 hours post-event'],
      ['Crew', '2-3 personnel · provided'],
      ['Capacity', '10-25 guests per session'],
    ],
  },
  {
    tag: 'Partnership Models',
    tagClass: 'coral',
    title: <>Choose your <span className="c">model</span></>,
    models: [
      {
        tag: 'MODEL 1',
        color: 'var(--gold)',
        title: 'Embedded Event',
        text: 'You have the audience. We bring the experience. Plug us into your existing festival, opening, or party. Revenue share or flat fee.',
      },
      {
        tag: 'MODEL 2',
        color: 'var(--coral)',
        title: 'Residency',
        text: 'Multi-day installation at your venue. Ideal for galleries, clubs, cultural spaces, and branded activations. Builds a destination.',
      },
      {
        tag: 'MODEL 3',
        color: 'var(--teal)',
        title: 'Private Experience',
        text: 'Exclusive sessions for private parties, corporate activations, or VIP events. Full content customization available.',
      },
    ],
  },
  {
    tag: 'The Collective',
    tagClass: 'teal',
    title: <>The <span className="t">music makers</span></>,
    artists: [
      {
        name: 'Mr. Tea',
        color: 'var(--gold2)',
        role: 'MICHAEL DEVIN · MUSICIAN & PRODUCER',
        bio: 'Michael Devin has been writing and recording music since the early 90’s, with releases on various labels. He has written the music specifically for these immersive music experiences for the last 5 years, crafted to take advantage of the depth the space provides.',
        links: [
          { label: 'Bandcamp', href: 'https://mrtea.bandcamp.com' },
          { label: 'SoundCloud', href: 'https://soundcloud.com/21stsentry' },
          { label: 'Beatport', href: 'https://www.beatport.com/artist/mr-tea/139148' },
        ],
      },
      {
        name: 'Dalyte',
        color: 'var(--coral)',
        role: 'DALYTE KODZIS · SOPRANO & PERFORMER',
        bio: 'Bay Area soprano performing with Festival Opera, Pocket Opera, Opera on Tap. Classical voice made visceral and alive in unconventional spaces.',
      },
      {
        name: 'Jessica Zed',
        color: 'var(--gold2)',
        role: 'MUSICIAN & SINGER',
        bio: 'Jessica is a professional singer-songwriter and has been performing since childhood.',
      },
      {
        name: 'Ambscience',
        color: 'var(--teal)',
        role: 'PAUL DE KONKOLY THEGE · MUSICIAN',
        bio: 'Experimental ambient & post-rock. Debut album schliessongs on Underthink Records (2021). Second album transiensce in progress.',
      },
    ],
  },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.65 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 6.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Zm0 1.8A3.7 3.7 0 1 0 15.7 12 3.7 3.7 0 0 0 12 8.3Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.4 22v-8.2h2.8l.42-3.2H13.4V8.55c0-.93.27-1.56 1.6-1.56h1.7V4.13A22.4 22.4 0 0 0 14.23 4c-2.46 0-4.15 1.5-4.15 4.28v2.38H7.3v3.2h2.78V22h3.32Z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.6 7.2a2.98 2.98 0 0 0-2.1-2.1C17.63 4.6 12 4.6 12 4.6s-5.63 0-7.5.5A2.98 2.98 0 0 0 2.4 7.2 31.3 31.3 0 0 0 1.9 12a31.3 31.3 0 0 0 .5 4.8 2.98 2.98 0 0 0 2.1 2.1c1.87.5 7.5.5 7.5.5s5.63 0 7.5-.5a2.98 2.98 0 0 0 2.1-2.1 31.3 31.3 0 0 0 .5-4.8 31.3 31.3 0 0 0-.5-4.8ZM10.2 15.1V8.9l5.35 3.1-5.35 3.1Z" />
    </svg>
  )
}

export default function MediaPackage() {
  useDocumentSeo({
    title: MEDIA_PACKAGE_TITLE,
    description: MEDIA_PACKAGE_DESCRIPTION,
    canonicalPath: '/media-package',
  })

  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactError, setContactError] = useState('')
  const [contactLoading, setContactLoading] = useState(false)
  const orderedLeftBlocks = [leftBlocks[0], leftBlocks[3], leftBlocks[1], leftBlocks[2]]

  async function handleContact(e: React.FormEvent) {
    e.preventDefault()
    setContactLoading(true)
    setContactError('')
    try {
      const res = await fetch('https://formspree.io/f/mbdabpdo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(contact),
      })
      if (res.ok) {
        setContactSubmitted(true)
      } else {
        setContactError('Something went wrong. Please try again.')
      }
    } catch {
      setContactError('Unable to connect. Please try again.')
    } finally {
      setContactLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    const blocks = Array.from(document.querySelectorAll('.mp-block'))
    blocks.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <main className="mp">
        <nav className="mp-nav" aria-label="Media package navigation">
          <div className="mp-nav-center">Bay Area Immersive Music and Art Experience</div>
          <div className="mp-nav-links">
            <Link to="/" className="mp-nav-link">Home</Link>
            <a href="#contact" className="mp-nav-link">Get in Touch</a>
          </div>
        </nav>

        <header className="mp-intro">
          <div className="mp-overline">Woo Art Collective · Bay Area, CA</div>
          <h1 className="mp-title">SONIC<br />BLOOM</h1>
          <div className="mp-sub">Immersive Sound Experience</div>
          <p className="mp-tagline">
            Ceremony. 360° surround sound. Bass you feel through the floor.
            <br />
            A handcrafted sanctuary that moves you somewhere music rarely reaches.
          </p>

          <div className="mp-stat-row">
            <div className="mp-stat-pill"><span className="mp-stat-val">7.1.4</span><span className="mp-stat-lbl">Sound System</span></div>
            <div className="mp-stat-pill"><span className="mp-stat-val">360°</span><span className="mp-stat-lbl">Surround</span></div>
            <div className="mp-stat-pill"><span className="mp-stat-val">14×14</span><span className="mp-stat-lbl">ft Structure</span></div>
            <div className="mp-stat-pill"><span className="mp-stat-val">11</span><span className="mp-stat-lbl">Speakers</span></div>
            <div className="mp-stat-pill"><span className="mp-stat-val">∞</span><span className="mp-stat-lbl">Bass Floor</span></div>
          </div>
        </header>

        <section className="mp-scaffold" aria-label="Sonic Bloom media package">
          <div className="mp-col-left">
            {orderedLeftBlocks.map((block, index) => (
              <section className={`mp-block ${index === 0 ? 'mp-blockTop' : ''}`} key={block.tag}>
                <div className={`mp-tag ${block.tagClass}`}>{block.tag}</div>
                <h2>{block.title}</h2>

                {block.body?.map((paragraph, index) => (
                  <p className="mp-body" key={index}>{paragraph}</p>
                ))}

                {block.tech ? (
                  <div className="mp-tech-list">
                    {block.tech.map((row) => (
                      <div className="mp-tech-row" key={row.heading}>
                        <div className="mp-tech-icon">{row.icon}</div>
                        <div>
                          <h4>{row.heading}</h4>
                          <p>{row.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {block.quotes?.map((quote) => (
                  <blockquote className="mp-pull-quote" key={quote.cite}>
                    <p>"{quote.text}"</p>
                    <cite>— {quote.cite}</cite>
                  </blockquote>
                ))}
              </section>
            ))}
          </div>

          <div className="mp-col-center">
            <div className="mp-center-stack">
              <div className="mp-center-wrap">
                <img src={centerArtwork} alt="Sonic Bloom" className="mp-center-img" />
              </div>
              <div className="mp-center-info">
                <div className="mp-sub">An immersive music experience unlike anything you've encountered.</div>
                <p className="mp-tagline">
                  Ceremony. 360° surround sound. Bass you feel through the floor.
                  <br />
                  A handcrafted sanctuary that moves you somewhere music rarely reaches.
                </p>
                <div className="mp-stat-row">
                  <div className="mp-stat-pill"><span className="mp-stat-val">7.1.4</span><span className="mp-stat-lbl">Sound System</span></div>
                  <div className="mp-stat-pill"><span className="mp-stat-val">360°</span><span className="mp-stat-lbl">Surround</span></div>
                  <div className="mp-stat-pill"><span className="mp-stat-val">14×14</span><span className="mp-stat-lbl">ft Structure</span></div>
                  <div className="mp-stat-pill"><span className="mp-stat-val">11</span><span className="mp-stat-lbl">Speakers</span></div>
                  <div className="mp-stat-pill"><span className="mp-stat-val">∞</span><span className="mp-stat-lbl">Bass Floor</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mp-col-right">
            {rightBlocks.map((block, index) => (
              <section className={`mp-block ${index === 0 ? 'mp-blockTop' : ''}`} key={block.tag}>
                <div className={`mp-tag ${block.tagClass}`}>{block.tag}</div>
                <h2>{block.title}</h2>

                {block.body?.map((paragraph, index) => (
                  <p className="mp-body" key={index}>{paragraph}</p>
                ))}

                {block.logistics?.map(([label, value]) => (
                  <div className="mp-logi-row" key={label}>
                    <span className="mp-logi-label">{label}</span>
                    <span className="mp-logi-val">{value}</span>
                  </div>
                ))}

                {block.models?.map((model) => (
                  <div className="mp-model" key={model.title}>
                    <div className="mp-model-tag" style={{ color: model.color }}>{model.tag}</div>
                    <h4>{model.title}</h4>
                    <p>{model.text}</p>
                  </div>
                ))}

                {block.artists?.map((artist) => (
                  <div className="mp-artist" key={artist.name}>
                    <div className="mp-artist-name" style={{ color: artist.color }}>{artist.name}</div>
                    <div className="mp-artist-role">{artist.role}</div>
                    <p className="mp-artist-bio">{artist.bio}</p>
                    {'links' in artist && Array.isArray(artist.links) ? (
                      <div className="mp-artist-links">
                        {artist.links.map((link) => (
                          <a key={link.href} className="mp-artist-link" href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </section>

        <section className="mp-outro">
          <div className="mp-tag teal" style={{ justifyContent: 'center' }}>Get In Touch</div>
          <h2>Let's talk about <span className="g">your event</span></h2>
          <p>We'd love to hear about your venue, your audience, and what you're building. No commitment, just a conversation.</p>

          <div className="mp-btn-row">
            <a href="mailto:hello@artofwoo.org" className="mp-btn mp-btn-gold">Start a Conversation</a>
            <a href="https://www.artofwoo.org" target="_blank" rel="noreferrer" className="mp-btn mp-btn-outline">Visit artofwoo.org</a>
          </div>

          <p className="mp-outro-meta">SONIC BLOOM · WOO ART COLLECTIVE · BAY AREA, CA</p>
        </section>

        <section id="contact" className="d2-contact-section">
          <div className="d2-contact-inner">
            <div className="mp-tag teal" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Get in Touch</div>
            <h2 style={{ textAlign: 'center' }}>Connect <span className="g">with Us</span></h2>
            <p className="mp-body" style={{ textAlign: 'center', fontStyle: 'normal', maxWidth: '40rem', margin: '0 auto' }}>
              Interested in attending, hosting, or collaborating with us?
            </p>
            {!contactSubmitted ? (
              <>
                <form className="d2-contact-form" onSubmit={handleContact}>
                  <div className="d2-contact-row">
                    <div className="d2-contact-field">
                      <label className="d2-contact-label">Name</label>
                      <input className="d2-contact-input" type="text" placeholder="Your name" required value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} />
                    </div>
                    <div className="d2-contact-field">
                      <label className="d2-contact-label">Email</label>
                      <input className="d2-contact-input" type="email" placeholder="your@email.com" required value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="d2-contact-field">
                    <label className="d2-contact-label">Phone <span style={{ opacity: 0.4 }}>- optional</span></label>
                    <input className="d2-contact-input" type="tel" placeholder="+1 (000) 000-0000" value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} />
                  </div>
                  <div className="d2-contact-field">
                    <label className="d2-contact-label">Message</label>
                    <textarea className="d2-contact-textarea" placeholder="Tell us about your interest..." required value={contact.message} onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))} />
                  </div>
                  <button className="d2-contact-submit" type="submit" disabled={contactLoading}>
                    {contactLoading ? '...' : <strong>Send Message</strong>}
                  </button>
                </form>
                {contactError ? (
                  <p className="mp-body" style={{ textAlign: 'center', color: 'rgba(220,100,100,0.8)', marginTop: '1rem' }}>
                    {contactError}
                  </p>
                ) : null}
                <p className="mp-body" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                  If you don't hear back within 48 hours, please check your spam folder.
                </p>
              </>
            ) : (
              <p className="mp-body" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.1rem' }}>
                Thank you. If you requested information and do not hear back within 48 hours, please check your email spam folder.
              </p>
            )}
          </div>
        </section>

        <footer className="mp-footer">
          <div>
            <div className="mp-footer-brand">Sonic Bloom</div>
            <div className="mp-footer-sub">Woo Art Collective · Bay Area & Beyond</div>
          </div>
          <div className="mp-footer-links">
            <a href="#" className="mp-social-link" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" className="mp-social-link" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#" className="mp-social-link" aria-label="YouTube">
              <YouTubeIcon />
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}
