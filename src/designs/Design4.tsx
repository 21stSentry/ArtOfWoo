import { Link } from 'react-router-dom'

const css = `
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.d4 {
  font-family: 'Newsreader', serif;
  background: #f7f3eb;
  min-height: 100vh;
  color: #1a1714;
  position: relative;
}

.d4-paper-texture {
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  pointer-events: none;
}

.d4-wrap {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 4rem);
}

.d4-masthead {
  text-align: center;
  padding: 2.5rem 0 0;
  border-bottom: 3px double #1a1714;
  margin-bottom: 0;
}

.d4-overline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Newsreader', serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7a6a50;
  margin-bottom: 1rem;
  font-style: italic;
}

.d4-publication {
  font-family: 'IM Fell English', serif;
  font-size: clamp(3rem, 9vw, 7.5rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: #1a1714;
  display: block;
  margin-bottom: 0.3rem;
  animation: d4FadeIn 1s ease 0.2s both;
}

.d4-publication em {
  font-style: italic;
  color: #b5451b;
}

.d4-tagline-banner {
  font-family: 'IM Fell English', serif;
  font-size: 0.75rem;
  font-style: italic;
  letter-spacing: 0.1em;
  color: #7a6a50;
  display: block;
  margin-bottom: 1.5rem;
  animation: d4FadeIn 0.8s ease 0.4s both;
}

.d4-date-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: #9a8a72;
  padding: 0.5rem 0;
  border-top: 1px solid #1a1714;
  border-bottom: 1px solid #1a1714;
  margin-bottom: 0;
  text-transform: uppercase;
}

.d4-main-grid {
  display: grid;
  grid-template-columns: 1fr 2px 2fr 2px 1fr;
  gap: 0;
  padding: 2rem 0;
  min-height: 60vh;
  animation: d4FadeIn 0.8s ease 0.5s both;
}

.d4-col-divider {
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    #1a1714 0px,
    #1a1714 4px,
    transparent 4px,
    transparent 8px
  );
  margin: 0 1.5rem;
}

.d4-col {
  padding: 0 0.5rem;
}

.d4-section-head {
  font-family: 'Newsreader', serif;
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #b5451b;
  display: block;
  border-bottom: 1px solid #b5451b;
  padding-bottom: 0.4rem;
  margin-bottom: 1rem;
}

.d4-col-headline {
  font-family: 'IM Fell English', serif;
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  line-height: 1.1;
  color: #1a1714;
  margin-bottom: 1rem;
}

.d4-col-headline em { font-style: italic; color: #b5451b; }

.d4-dropcap-para {
  font-size: 0.92rem;
  line-height: 1.75;
  color: #3a3228;
  font-weight: 300;
  margin-bottom: 1rem;
}

.d4-dropcap-para::first-letter {
  font-family: 'IM Fell English', serif;
  float: left;
  font-size: 4em;
  line-height: 0.75;
  padding-right: 0.1em;
  padding-top: 0.1em;
  color: #b5451b;
}

.d4-para {
  font-size: 0.85rem;
  line-height: 1.75;
  color: #3a3228;
  font-weight: 300;
  margin-bottom: 1rem;
}

.d4-pull-quote {
  border-left: 3px solid #b5451b;
  padding: 0.8rem 0 0.8rem 1rem;
  margin: 1.5rem 0;
}

.d4-pull-quote-text {
  font-family: 'IM Fell English', serif;
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #1a1714;
}

.d4-pull-quote-attr {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #9a8a72;
  display: block;
  margin-top: 0.5rem;
}

.d4-center-headline {
  font-family: 'IM Fell English', serif;
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 1;
  text-align: center;
  border-bottom: 1px solid #1a1714;
  border-top: 1px solid #1a1714;
  padding: 1.5rem 0;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.d4-center-headline em { font-style: italic; color: #b5451b; }

.d4-byline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7a6a50;
  margin-bottom: 1.5rem;
}

.d4-byline::before,
.d4-byline::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #c8b89a;
}

.d4-cta {
  display: block;
  text-align: center;
  font-family: 'IM Fell English', serif;
  font-style: italic;
  font-size: 0.9rem;
  color: #b5451b;
  text-decoration: none;
  border: 1px solid #b5451b;
  padding: 0.8rem 2rem;
  margin: 1rem auto;
  width: fit-content;
  transition: all 0.3s ease;
}

.d4-cta:hover {
  background: #b5451b;
  color: #f7f3eb;
}

.d4-sidebar-head {
  font-family: 'IM Fell English', serif;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #1a1714;
}

.d4-sidebar-item {
  display: flex;
  gap: 0.8rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid #d4c9b5;
  cursor: default;
}

.d4-sidebar-num {
  font-family: 'IM Fell English', serif;
  font-size: 1.5rem;
  color: #d4c9b5;
  line-height: 1;
  flex-shrink: 0;
}

.d4-sidebar-text {
  font-size: 0.8rem;
  line-height: 1.5;
  color: #5a4a38;
  font-style: italic;
}

.d4-bottom-bar {
  border-top: 3px double #1a1714;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #9a8a72;
}

.d4-nav {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0;
  z-index: 200;
  border: 1px solid #c8b89a;
  background: #f7f3eb;
}

.d4-nav a {
  font-family: 'Newsreader', serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: #9a8a72;
  text-decoration: none;
  padding: 0.4rem 0.9rem;
  border-right: 1px solid #c8b89a;
  transition: all 0.2s;
  font-style: italic;
}

.d4-nav a:last-child { border-right: none; }
.d4-nav a:hover { background: #ede8df; color: #1a1714; }
.d4-nav a.active { background: #1a1714; color: #f7f3eb; }

@keyframes d4FadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`

export default function Design4() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="d4">
        <div className="d4-paper-texture" />
        <div className="d4-wrap">
          <header className="d4-masthead">
            <div className="d4-overline">
              <span>Vol. I, No. 1</span>
              <span>The Journal of Human Connection</span>
              <span>February 2026</span>
            </div>
            <span className="d4-publication">The Art of <em>Woo</em></span>
            <span className="d4-tagline-banner">
              "For those who believe connection is a craft worth perfecting"
            </span>
            <div className="d4-date-bar">
              <span>Est. MMXXIV</span>
              <span>artofwoo.org</span>
              <span>Free of Charge</span>
            </div>
          </header>

          <div className="d4-main-grid">
            <div className="d4-col">
              <span className="d4-section-head">On Attraction</span>
              <h2 className="d4-col-headline">The Lost Science of <em>Genuine Allure</em></h2>
              <p className="d4-dropcap-para">
                There exists, beneath the noise of modern courtship, a quieter intelligence — one that has always known how to move a room, hold a gaze, and make someone feel, in the marrow of their bones, that they have finally been seen.
              </p>
              <p className="d4-para">
                It is not manipulation. It is not performance. It is the ancient craft of being fully, gloriously present — and learning to transmit that presence with precision and grace.
              </p>
              <div className="d4-pull-quote">
                <span className="d4-pull-quote-text">"To woo is to say: I see you, and I am worth being seen."</span>
                <span className="d4-pull-quote-attr">— The Art of Woo, Vol. I</span>
              </div>
            </div>

            <div className="d4-col-divider" />

            <div className="d4-col">
              <div className="d4-center-headline">Become<br/><em>Magnetic.</em></div>
              <div className="d4-byline">artofwoo.org · est. mmxxiv</div>
              <p className="d4-para">
                The Art of Woo is a school for the romantically courageous. We teach the timeless disciplines of charm, presence, and the kind of wit that lingers long after the conversation ends.
              </p>
              <p className="d4-para">
                Through careful study of the masters — the letter-writers, the duelists of dialogue, the architects of unforgettable evenings — we distill their wisdom into lessons for the modern practitioner.
              </p>
              <a href="#" className="d4-cta">Begin Your Education</a>
            </div>

            <div className="d4-col-divider" />

            <div className="d4-col">
              <span className="d4-section-head">Curriculum</span>
              <h3 className="d4-sidebar-head">The Four Pillars</h3>
              {[
                { n: 'I', text: 'Presence — The art of being fully in the room, in the moment, in the eyes of another.' },
                { n: 'II', text: 'Wit — The playful precision of language that opens doors and quickens pulses.' },
                { n: 'III', text: 'Confidence — Not bravado, but the quiet certainty of a person who knows their worth.' },
                { n: 'IV', text: 'Mystery — The deliberate art of leaving something to be discovered.' },
              ].map(item => (
                <div key={item.n} className="d4-sidebar-item">
                  <span className="d4-sidebar-num">{item.n}</span>
                  <span className="d4-sidebar-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="d4-bottom-bar">
            <span>The Art of Woo · artofwoo.org</span>
            <span>All Rights Reserved · MMXXVI</span>
          </div>
        </div>

        <nav className="d4-nav">
          {[1,2,3,4,5].map(n => (
            <Link key={n} to={`/${n}`} className={n === 4 ? 'active' : ''}>0{n}</Link>
          ))}
        </nav>
      </div>
    </>
  )
}
