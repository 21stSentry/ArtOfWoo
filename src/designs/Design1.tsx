import { Link } from 'react-router-dom'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.d1 {
  font-family: 'Source Serif 4', serif;
  background: #080808;
  min-height: 100vh;
  color: #f0ebe0;
  overflow-x: hidden;
  position: relative;
}

.d1-grain {
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.04;
  animation: d1Grain 0.5s steps(2) infinite;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
}

@keyframes d1Grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2%, -3%); }
  20% { transform: translate(3%, 1%); }
  30% { transform: translate(-1%, 4%); }
  40% { transform: translate(4%, -2%); }
  50% { transform: translate(-3%, 3%); }
  60% { transform: translate(2%, -4%); }
  70% { transform: translate(-4%, 1%); }
  80% { transform: translate(1%, 3%); }
  90% { transform: translate(3%, -1%); }
}

.d1-wrap {
  position: relative;
  z-index: 2;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 5rem);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.d1-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid #1e1e1e;
  margin-bottom: 3rem;
}

.d1-label {
  font-family: 'Source Serif 4', serif;
  font-size: 0.65rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #c41e3a;
  font-weight: 400;
}

.d1-url {
  font-family: 'Source Serif 4', serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: #3a3a3a;
  font-style: italic;
}

.d1-headline {
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: clamp(5.5rem, 15vw, 18rem);
  line-height: 0.88;
  letter-spacing: -0.02em;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.d1-headline-line {
  display: block;
  overflow: hidden;
}

.d1-headline-inner {
  display: block;
  transform: translateY(110%);
  animation: d1Reveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.d1-headline-inner.l1 { animation-delay: 0.15s; }
.d1-headline-inner.l2 { animation-delay: 0.3s; }
.d1-headline-inner.l3 { animation-delay: 0.45s; color: #c41e3a; font-style: italic; }

@keyframes d1Reveal {
  to { transform: translateY(0); }
}

.d1-rule {
  width: 100%;
  height: 1px;
  background: #1e1e1e;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
}

.d1-rule::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  background: #c41e3a;
  animation: d1RuleGrow 1.5s ease 0.6s forwards;
  transform: scaleX(0);
  transform-origin: left;
}

@keyframes d1RuleGrow {
  to { transform: scaleX(1); }
}

.d1-footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: end;
  padding-top: 2rem;
  border-top: 1px solid #1e1e1e;
  opacity: 0;
  animation: d1FadeUp 0.8s ease 1.1s forwards;
}

@keyframes d1FadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.d1-tagline {
  font-family: 'Source Serif 4', serif;
  font-weight: 300;
  font-style: italic;
  font-size: clamp(0.9rem, 1.8vw, 1.3rem);
  line-height: 1.5;
  color: #6a6055;
  max-width: 340px;
}

.d1-cta {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Playfair Display', serif;
  font-size: 0.7rem;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: #f0ebe0;
  text-decoration: none;
  border: 1px solid #c41e3a;
  padding: 1.1rem 2.5rem;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
}

.d1-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #c41e3a;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.d1-cta:hover::before { transform: translateX(0); }
.d1-cta span { position: relative; z-index: 1; }

.d1-details {
  text-align: right;
}

.d1-detail-item {
  font-family: 'Source Serif 4', serif;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #2e2e2e;
  display: block;
  margin-bottom: 0.3rem;
}

.d1-detail-item.highlight { color: #c41e3a; }

.d1-ticker {
  border-top: 1px solid #1a1a1a;
  border-bottom: 1px solid #1a1a1a;
  overflow: hidden;
  padding: 0.6rem 0;
  margin-top: 3rem;
  position: relative;
  z-index: 2;
}

.d1-ticker-inner {
  display: flex;
  gap: 4rem;
  animation: d1Ticker 25s linear infinite;
  white-space: nowrap;
}

@keyframes d1Ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.d1-ticker-item {
  font-family: 'Playfair Display', serif;
  font-size: 0.6rem;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: #1e1e1e;
  font-style: italic;
}

.d1-ticker-dot {
  color: #c41e3a;
  font-style: normal;
  margin: 0 0.5rem;
}

.d1-nav {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 200;
}

.d1-nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-family: 'Source Serif 4', serif;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: #333;
  text-decoration: none;
  border: 1px solid #1e1e1e;
  background: #080808;
  transition: all 0.2s;
}

.d1-nav a:hover { color: #c41e3a; border-color: #c41e3a; }
.d1-nav a.active { color: #c41e3a; border-color: #c41e3a; background: rgba(196,30,58,0.1); }

.d1-vertical-text {
  position: fixed;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: center;
  font-family: 'Source Serif 4', serif;
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #2a2a2a;
  z-index: 2;
  white-space: nowrap;
}
`

export default function Design1() {
  const tickerItems = ['Art of Woo', 'The Discipline of Desire', 'Genuine Human Connection', 'Charisma · Confidence · Chemistry']

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="d1">
        <div className="d1-grain" />
        <span className="d1-vertical-text">The Art of Woo — MMXXIV</span>

        <div className="d1-wrap">
          <div className="d1-topbar">
            <div className="d1-label">Volume I &nbsp;·&nbsp; The Discipline of Desire</div>
            <div className="d1-url">artofwoo.org</div>
          </div>

          <div className="d1-headline">
            <span className="d1-headline-line"><span className="d1-headline-inner l1">THE</span></span>
            <span className="d1-headline-line"><span className="d1-headline-inner l2">ART</span></span>
            <span className="d1-headline-line"><span className="d1-headline-inner l3">OF WOO.</span></span>
          </div>

          <div className="d1-rule" />

          <div className="d1-footer">
            <div className="d1-tagline">
              The lost art of genuine human connection — relearned, practiced, mastered.
            </div>
            <a href="#" className="d1-cta">
              <span>Begin</span>
            </a>
            <div className="d1-details">
              <span className="d1-detail-item">Charisma</span>
              <span className="d1-detail-item">Connection</span>
              <span className="d1-detail-item">Confidence</span>
              <span className="d1-detail-item highlight">Chemistry</span>
            </div>
          </div>
        </div>

        <div className="d1-ticker">
          <div className="d1-ticker-inner">
            {[...Array(4)].map((_, i) =>
              tickerItems.map((item, j) => (
                <span key={`${i}-${j}`} className="d1-ticker-item">
                  {item}<span className="d1-ticker-dot">◆</span>
                </span>
              ))
            )}
          </div>
        </div>

        <nav className="d1-nav">
          {[1,2,3,4,5].map(n => (
            <Link key={n} to={`/${n}`} className={n === 1 ? 'active' : ''}>0{n}</Link>
          ))}
        </nav>
      </div>
    </>
  )
}
