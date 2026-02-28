import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.d5 {
  font-family: 'Lora', serif;
  background: #fdf8f0;
  min-height: 100vh;
  color: #2a1a0a;
  overflow: hidden;
  position: relative;
}

.d5-bg-blobs {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.d5-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
}

.d5-blob-1 {
  width: 700px;
  height: 700px;
  background: #e8602a;
  top: -200px;
  right: -200px;
  animation: d5BlobFloat 10s ease-in-out infinite;
}

.d5-blob-2 {
  width: 500px;
  height: 500px;
  background: #e8a020;
  bottom: -100px;
  left: -100px;
  animation: d5BlobFloat 13s ease-in-out 2s infinite reverse;
}

.d5-blob-3 {
  width: 400px;
  height: 400px;
  background: #8aad6a;
  top: 40%;
  left: 30%;
  animation: d5BlobFloat 8s ease-in-out 1s infinite;
  opacity: 0.15;
}

@keyframes d5BlobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -30px) scale(1.03); }
  66% { transform: translate(-15px, 20px) scale(0.97); }
}

.d5-wrap {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.d5-header {
  padding: clamp(2rem, 4vw, 4rem) clamp(2rem, 5vw, 6rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.d5-logo-mark {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2a1a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.d5-logo-mark svg { width: 20px; height: 20px; }

.d5-logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.d5-logo-text {
  font-family: 'Abril Fatface', serif;
  font-size: 1.1rem;
  color: #2a1a0a;
  letter-spacing: 0.02em;
}

.d5-nav-links {
  display: flex;
  gap: 2rem;
}

.d5-nav-link {
  font-family: 'Lora', serif;
  font-size: 0.8rem;
  font-style: italic;
  color: #8a6a4a;
  text-decoration: none;
  transition: color 0.2s;
}

.d5-nav-link:hover { color: #2a1a0a; }

.d5-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 clamp(2rem, 5vw, 6rem) 2rem;
  position: relative;
}

.d5-circle-deco {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(42,26,10,0.08);
  pointer-events: none;
}

.d5-circle-1 {
  width: 600px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: d5CircleRotate 30s linear infinite;
}

.d5-circle-2 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-style: dashed;
  animation: d5CircleRotate 20s linear infinite reverse;
}

@keyframes d5CircleRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.d5-overline {
  font-family: 'Lora', serif;
  font-size: 0.7rem;
  font-style: italic;
  letter-spacing: 0.2em;
  color: #c46030;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  animation: d5Rise 0.8s ease 0.3s both;
}

.d5-overline::before {
  content: '';
  width: 40px;
  height: 1px;
  background: #c46030;
}

.d5-big-text {
  margin-bottom: 3rem;
  opacity: 0;
  animation: d5Rise 1s ease 0.5s both;
}

.d5-big-title {
  font-family: 'Abril Fatface', serif;
  font-size: clamp(5rem, 14vw, 16rem);
  line-height: 0.85;
  color: #2a1a0a;
  display: block;
  position: relative;
}

.d5-big-title-woo {
  font-family: 'Abril Fatface', serif;
  font-size: clamp(5rem, 14vw, 16rem);
  line-height: 0.85;
  display: block;
  position: relative;
  -webkit-text-stroke: 2px #e8602a;
  color: transparent;
  margin-top: -0.1em;
  transform: translateX(clamp(3rem, 8vw, 10rem));
}

@keyframes d5Rise {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.d5-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 3rem;
  opacity: 0;
  animation: d5Rise 0.8s ease 0.9s both;
}

.d5-tagline {
  font-family: 'Lora', serif;
  font-size: clamp(1rem, 1.8vw, 1.4rem);
  font-style: italic;
  line-height: 1.6;
  color: #6a4a2a;
  max-width: 380px;
}

.d5-tagline strong {
  font-style: normal;
  color: #2a1a0a;
}

.d5-cta-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  flex-shrink: 0;
}

.d5-btn {
  font-family: 'Abril Fatface', serif;
  font-size: 1rem;
  letter-spacing: 0.02em;
  color: #fdf8f0;
  background: #2a1a0a;
  padding: 1rem 3rem;
  text-decoration: none;
  border-radius: 100px;
  display: inline-block;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.d5-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #e8602a;
  border-radius: inherit;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.d5-btn:hover::before { transform: scaleX(1); transform-origin: left; }
.d5-btn span { position: relative; z-index: 1; }
.d5-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(232,96,42,0.3); }

.d5-btn-ghost {
  font-family: 'Lora', serif;
  font-size: 0.8rem;
  font-style: italic;
  color: #8a6a4a;
  text-decoration: none;
  border-bottom: 1px solid rgba(138,106,74,0.3);
  padding-bottom: 2px;
  transition: all 0.2s;
}

.d5-btn-ghost:hover { color: #2a1a0a; border-color: #2a1a0a; }

.d5-footer {
  padding: clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 5vw, 6rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(42,26,10,0.1);
}

.d5-footer-items {
  display: flex;
  gap: 2rem;
}

.d5-footer-item {
  text-align: center;
}

.d5-footer-num {
  font-family: 'Abril Fatface', serif;
  font-size: 1.5rem;
  color: #e8602a;
  display: block;
  line-height: 1;
}

.d5-footer-label {
  font-family: 'Lora', serif;
  font-size: 0.65rem;
  font-style: italic;
  color: #8a6a4a;
  display: block;
  margin-top: 0.2rem;
}

.d5-footer-copy {
  font-family: 'Lora', serif;
  font-size: 0.65rem;
  font-style: italic;
  color: #c4a884;
}

.d5-seeds {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

.d5-seed {
  position: absolute;
  width: 4px;
  height: 20px;
  border-radius: 2px;
  background: rgba(232,96,42,0.15);
  transform-origin: center bottom;
  animation: d5SeedFall linear infinite;
}

@keyframes d5SeedFall {
  0% { transform: translateY(-50px) rotate(var(--r, 15deg)); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.5; }
  100% { transform: translateY(110vh) rotate(calc(var(--r, 15deg) + 180deg)); opacity: 0; }
}

.d5-design-nav {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 200;
}

.d5-design-nav a {
  font-family: 'Abril Fatface', serif;
  font-size: 0.65rem;
  color: rgba(42,26,10,0.25);
  text-decoration: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(42,26,10,0.1);
  transition: all 0.2s;
  background: #fdf8f0;
}

.d5-design-nav a:hover { color: #e8602a; border-color: #e8602a; }
.d5-design-nav a.active { background: #2a1a0a; color: #fdf8f0; border-color: #2a1a0a; }
`

const seeds = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 15,
  duration: 10 + Math.random() * 15,
  rotation: (Math.random() - 0.5) * 60,
  height: 12 + Math.random() * 20,
}))

export default function Design5() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="d5">
        <div className="d5-bg-blobs">
          <div className="d5-blob d5-blob-1" />
          <div className="d5-blob d5-blob-2" />
          <div className="d5-blob d5-blob-3" />
        </div>

        <div className="d5-seeds">
          {seeds.map(s => (
            <div
              key={s.id}
              className="d5-seed"
              style={{
                left: `${s.left}%`,
                height: `${s.height}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
                '--r': `${s.rotation}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="d5-wrap">
          <header className="d5-header">
            <div className="d5-logo">
              <div className="d5-logo-mark">
                <svg viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="#fdf8f0" strokeWidth="1.5"/>
                  <path d="M10 4 Q14 7 10 10 Q6 13 10 16" stroke="#fdf8f0" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <span className="d5-logo-text">Art of Woo</span>
            </div>
            <nav className="d5-nav-links">
              <a href="#" className="d5-nav-link">About</a>
              <a href="#" className="d5-nav-link">Method</a>
              <a href="#" className="d5-nav-link">Begin</a>
            </nav>
          </header>

          <main className="d5-main">
            <div className="d5-circle-deco d5-circle-1" />
            <div className="d5-circle-deco d5-circle-2" />

            <span className="d5-overline">The school of human connection</span>

            <div className="d5-big-text">
              <span className="d5-big-title">Art of</span>
              <span className="d5-big-title-woo">Woo.</span>
            </div>

            <div className="d5-bottom-row">
              <p className="d5-tagline">
                Connection is a <strong>craft.</strong><br />
                Charm is a <strong>discipline.</strong><br />
                Attraction is an <strong>art form.</strong><br />
                You just need to learn it.
              </p>
              <div className="d5-cta-group">
                <a href="#" className="d5-btn"><span>Start Learning</span></a>
                <a href="#" className="d5-btn-ghost">What is the Art of Woo?</a>
              </div>
            </div>
          </main>

          <footer className="d5-footer">
            <div className="d5-footer-items">
              {[
                { num: '12', label: 'lessons' },
                { num: '4', label: 'pillars' },
                { num: '∞', label: 'connections' },
              ].map(item => (
                <div key={item.label} className="d5-footer-item">
                  <span className="d5-footer-num">{item.num}</span>
                  <span className="d5-footer-label">{item.label}</span>
                </div>
              ))}
            </div>
            <span className="d5-footer-copy">artofwoo.org · est. mmxxiv</span>
          </footer>
        </div>

        <nav className="d5-design-nav">
          {[1,2,3,4,5].map(n => (
            <Link key={n} to={`/${n}`} className={n === 5 ? 'active' : ''}>{n}</Link>
          ))}
        </nav>
      </div>
    </>
  )
}
