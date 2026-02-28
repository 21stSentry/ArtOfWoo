import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.d3 {
  font-family: 'Rajdhani', sans-serif;
  background: #03040a;
  min-height: 100vh;
  color: #e0e8ff;
  overflow: hidden;
  position: relative;
}

.d3-scanlines {
  position: fixed;
  inset: 0;
  z-index: 20;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
}

.d3-grid {
  position: fixed;
  inset: 0;
  z-index: 1;
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: d3GridPan 20s linear infinite;
}

@keyframes d3GridPan {
  0% { background-position: 0 0; }
  100% { background-position: 60px 60px; }
}

.d3-glow-left {
  position: fixed;
  left: -200px;
  top: 20%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255,0,119,0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
  animation: d3GlowPulse 3s ease-in-out infinite;
}

.d3-glow-right {
  position: fixed;
  right: -200px;
  bottom: 20%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
  animation: d3GlowPulse 4s ease-in-out 1s infinite;
}

@keyframes d3GlowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.d3-wrap {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: clamp(2rem, 4vw, 4rem);
}

.d3-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.d3-logo {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #00d4ff;
  letter-spacing: 0.1em;
}

.d3-status {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: #ff0077;
  letter-spacing: 0.2em;
}

.d3-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff0077;
  animation: d3Blink 1.2s steps(1) infinite;
  box-shadow: 0 0 8px #ff0077;
}

@keyframes d3Blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.d3-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.d3-prefix {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  color: #00d4ff;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  opacity: 0;
  animation: d3FadeIn 0.5s ease 0.3s forwards;
}

.d3-headline {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: clamp(4rem, 12vw, 14rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
  position: relative;
  margin-bottom: 1rem;
}

.d3-headline-main {
  display: block;
  color: #e0e8ff;
  position: relative;
  opacity: 0;
  animation: d3SlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
}

.d3-headline-main::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 2px;
  color: #ff0077;
  clip-path: inset(40% 0 30% 0);
  animation: d3Glitch1 4s infinite 2s;
  opacity: 0.8;
}

.d3-headline-main::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: -2px;
  color: #00d4ff;
  clip-path: inset(60% 0 10% 0);
  animation: d3Glitch2 4s infinite 2.1s;
  opacity: 0.8;
}

@keyframes d3Glitch1 {
  0%, 90%, 100% { clip-path: inset(40% 0 30% 0); transform: translate(0); }
  91% { clip-path: inset(20% 0 50% 0); transform: translate(3px, -2px); }
  92% { clip-path: inset(70% 0 10% 0); transform: translate(-3px, 2px); }
  93% { clip-path: inset(10% 0 70% 0); transform: translate(2px, 1px); }
  94% { clip-path: inset(40% 0 30% 0); transform: translate(0); }
}

@keyframes d3Glitch2 {
  0%, 90%, 100% { clip-path: inset(60% 0 10% 0); transform: translate(0); }
  91% { clip-path: inset(30% 0 40% 0); transform: translate(-3px, 2px); }
  92% { clip-path: inset(5% 0 80% 0); transform: translate(3px, -2px); }
  93% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 1px); }
  94% { clip-path: inset(60% 0 10% 0); transform: translate(0); }
}

.d3-headline-accent {
  display: block;
  font-weight: 300;
  font-style: italic;
  color: #ff0077;
  text-shadow: 0 0 30px rgba(255,0,119,0.5), 0 0 60px rgba(255,0,119,0.2);
  opacity: 0;
  animation: d3SlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
}

@keyframes d3SlideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes d3FadeIn {
  to { opacity: 1; }
}

.d3-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  opacity: 0;
  animation: d3FadeIn 0.5s ease 1.1s forwards;
}

.d3-divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, #00d4ff, transparent);
}

.d3-divider-line.right {
  background: linear-gradient(to left, #ff0077, transparent);
}

.d3-divider-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  color: #334466;
}

.d3-grid-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1px;
  margin: 2rem 0;
  opacity: 0;
  animation: d3FadeIn 0.5s ease 1.2s forwards;
}

.d3-info-cell {
  border: 1px solid rgba(0,212,255,0.1);
  padding: 1.2rem;
  background: rgba(0,212,255,0.02);
  transition: all 0.3s;
  cursor: default;
}

.d3-info-cell:hover {
  background: rgba(0,212,255,0.05);
  border-color: rgba(0,212,255,0.3);
}

.d3-info-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.55rem;
  color: #00d4ff;
  letter-spacing: 0.3em;
  display: block;
  margin-bottom: 0.5rem;
}

.d3-info-value {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #e0e8ff;
  letter-spacing: 0.05em;
}

.d3-tagline {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 300;
  color: #4a5580;
  max-width: 500px;
  line-height: 1.5;
  opacity: 0;
  animation: d3FadeIn 0.5s ease 1s forwards;
  margin-bottom: 2rem;
}

.d3-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: d3FadeIn 0.5s ease 1.4s forwards;
}

.d3-btn-primary {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: #03040a;
  background: #00d4ff;
  padding: 0.9rem 2.5rem;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}

.d3-btn-primary:hover {
  background: #ff0077;
  color: #fff;
  box-shadow: 0 0 30px rgba(255,0,119,0.4);
}

.d3-btn-secondary {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: #ff0077;
  text-decoration: none;
  border: 1px solid rgba(255,0,119,0.3);
  padding: 0.9rem 2rem;
  transition: all 0.3s;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}

.d3-btn-secondary:hover {
  background: rgba(255,0,119,0.1);
  border-color: #ff0077;
  box-shadow: 0 0 20px rgba(255,0,119,0.2);
}

.d3-footer-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0,212,255,0.1);
}

.d3-footer-stat {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.55rem;
  color: #223;
  letter-spacing: 0.2em;
}

.d3-footer-stat strong {
  color: #334466;
}

.d3-nav {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 4px;
  z-index: 200;
}

.d3-nav a {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: #223;
  text-decoration: none;
  border: 1px solid #112;
  padding: 0.4rem 0.6rem;
  background: #03040a;
  transition: all 0.2s;
  letter-spacing: 0.1em;
}

.d3-nav a:hover { color: #00d4ff; border-color: rgba(0,212,255,0.5); }
.d3-nav a.active { color: #ff0077; border-color: rgba(255,0,119,0.5); background: rgba(255,0,119,0.05); }

.d3-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: #00d4ff;
  margin-left: 4px;
  vertical-align: middle;
  animation: d3Blink 1s steps(1) infinite;
  box-shadow: 0 0 8px #00d4ff;
}
`

const infoItems = [
  { label: 'PROTOCOL', value: 'ATTRACTION.V2' },
  { label: 'STATUS', value: 'ACTIVE' },
  { label: 'SIGNAL', value: 'MAXIMUM' },
  { label: 'UPTIME', value: '99.97%' },
]

export default function Design3() {
  const [typed, setTyped] = useState('')
  const fullText = 'INITIALIZING CONNECTION PROTOCOL...'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="d3">
        <div className="d3-scanlines" />
        <div className="d3-grid" />
        <div className="d3-glow-left" />
        <div className="d3-glow-right" />

        <div className="d3-wrap">
          <div className="d3-header">
            <div className="d3-logo">ART_OF_WOO://</div>
            <div className="d3-status">
              <div className="d3-status-dot" />
              LIVE
            </div>
          </div>

          <div className="d3-main">
            <div className="d3-prefix">
              $ {typed}<span className="d3-cursor" />
            </div>

            <div className="d3-headline">
              <span className="d3-headline-main" data-text="ART OF">ART OF</span>
              <span className="d3-headline-accent">WOO</span>
            </div>

            <p className="d3-tagline">
              Hack the ancient code of human desire. Decode the signals. Transmit at full power.
            </p>

            <div className="d3-divider">
              <div className="d3-divider-line" />
              <span className="d3-divider-text">SYS.ATTRACTION.CORE</span>
              <div className="d3-divider-line right" />
            </div>

            <div className="d3-grid-info">
              {infoItems.map(item => (
                <div key={item.label} className="d3-info-cell">
                  <span className="d3-info-label">{item.label}</span>
                  <span className="d3-info-value">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="d3-actions">
              <a href="#" className="d3-btn-primary">JACK_IN.EXE</a>
              <a href="#" className="d3-btn-secondary">VIEW_DOCS.LOG</a>
            </div>
          </div>

          <div className="d3-footer-bar">
            <span className="d3-footer-stat"><strong>NODE</strong> artofwoo.org</span>
            <span className="d3-footer-stat"><strong>VER</strong> 2.0.4</span>
            <span className="d3-footer-stat"><strong>ENV</strong> PRODUCTION</span>
            <span className="d3-footer-stat"><strong>LAT</strong> 2ms</span>
          </div>
        </div>

        <nav className="d3-nav">
          {[1,2,3,4,5].map(n => (
            <Link key={n} to={`/${n}`} className={n === 3 ? 'active' : ''}>0{n}</Link>
          ))}
        </nav>
      </div>
    </>
  )
}
