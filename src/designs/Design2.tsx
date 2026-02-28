import { useState, useEffect, useCallback } from 'react'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cormorant+SC:wght@300;400;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

.d2 {
  font-family: 'Cormorant Garamond', serif;
  background: #080510;
  color: #e8d5b0;
  overflow-x: hidden;
  position: relative;
}

/* ─── GLOBAL BG ─── */
.d2-bg-fixed {
  position: fixed;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 0%, #1a0d2e 0%, transparent 70%),
    radial-gradient(ellipse 40% 50% at 10% 80%, #200a14 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 90% 40%, #0a1020 0%, transparent 60%),
    #080510;
  pointer-events: none;
}

.d2-glow-orb {
  position: fixed;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(201,168,76,0.035) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  animation: d2GlowPulse 5s ease-in-out infinite;
}

@keyframes d2GlowPulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
}

.d2-pillars {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.d2-pillar-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.06) 30%, rgba(201,168,76,0.06) 70%, transparent 100%);
}

/* ─── PARTICLES ─── */
.d2-particles {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.d2-particle {
  position: absolute;
  border-radius: 50%;
  background: #c9a84c;
  animation: d2Float linear infinite;
  opacity: 0;
}

@keyframes d2Float {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  10%  { opacity: var(--peak-opacity, 0.5); }
  90%  { opacity: var(--trail-opacity, 0.15); }
  100% { transform: translateY(-90vh) translateX(var(--dx, 20px)); opacity: 0; }
}

/* ─── NAV ─── */
.d2-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem clamp(2rem, 5vw, 5rem);
  background: linear-gradient(to bottom, rgba(8,5,16,0.9), transparent);
  backdrop-filter: blur(2px);
}

.d2-nav-logo {
  font-family: 'Cormorant SC', serif;
  font-size: 1rem;
  letter-spacing: 0.3em;
  color: #c9a84c;
  text-decoration: none;
}

.d2-nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.d2-nav-link {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-style: italic;
  letter-spacing: 0.1em;
  color: rgba(232,213,176,0.75);
  text-decoration: none;
  transition: color 0.3s ease;
}

.d2-nav-link:hover { color: #c9a84c; }

.d2-nav-cta {
  font-family: 'Cormorant SC', serif;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #080510;
  background: linear-gradient(135deg, #c9a84c, #e8c96c);
  padding: 0.6rem 1.5rem;
  text-decoration: none;
  transition: opacity 0.2s;
}

.d2-nav-cta:hover { opacity: 0.85; }

/* ─── DESIGN SWITCHER ─── */
.d2-switcher {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1px;
  z-index: 200;
  background: rgba(8,5,16,0.8);
  border: 1px solid rgba(201,168,76,0.15);
  backdrop-filter: blur(20px);
  padding: 0.5rem 0.7rem;
}

.d2-switcher a {
  font-family: 'Cormorant SC', serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: rgba(201,168,76,0.3);
  text-decoration: none;
  padding: 0.3rem 0.7rem;
  transition: color 0.2s;
}

.d2-switcher a:hover, .d2-switcher a.active { color: #c9a84c; }

/* ─── SHARED SECTION STYLES ─── */
.d2-section {
  position: relative;
  z-index: 10;
}

.d2-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 clamp(2rem, 5vw, 5rem);
}

.d2-ornament-divider {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
  padding: 0.5rem 0;
}

.d2-divider-line {
  height: 1px;
  flex: 1;
  background: linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent);
}

.d2-divider-glyph {
  color: #c9a84c;
  font-size: 0.7rem;
  letter-spacing: 0.5em;
  opacity: 0.6;
}

.d2-eyebrow {
  font-family: 'Cormorant SC', serif;
  font-size: 0.85rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #e0c078;
  display: block;
  margin-bottom: 1.2rem;
}

/* ─── HERO ─── */
.d2-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem clamp(2rem, 5vw, 5rem) 6rem;
}

.d2-hero-ornament-top {
  margin-bottom: 2.5rem;
  animation: d2FadeIn 1s ease 0.2s both;
}

.d2-hero-eyebrow {
  font-family: 'Cormorant SC', serif;
  font-size: 1.05rem;
  letter-spacing: 0.5em;
  color: #e0c078;
  display: block;
  margin-bottom: 2rem;
  animation: d2FadeIn 1s ease 0.4s both;
}

.d2-hero-title-art {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3.5rem, 10vw, 9rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.01em;
  background: linear-gradient(135deg, #e8d5b0 0%, #c9a84c 40%, #e8d5b0 60%, #c9a84c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: d2FadeIn 1.2s ease 0.5s both;
  display: block;
}

.d2-hero-title-of {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 2.5vw, 2rem);
  font-weight: 300;
  font-style: italic;
  color: #c8a870;
  display: block;
  letter-spacing: 0.35em;
  margin: 0.2rem 0;
  animation: d2FadeIn 1.2s ease 0.55s both;
}

.d2-hero-title-woo {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(4rem, 12vw, 11rem);
  font-weight: 600;
  font-style: italic;
  line-height: 0.9;
  background: linear-gradient(135deg, #c9a84c 0%, #f0d78c 30%, #c9a84c 60%, #9a7830 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
  animation: d2FadeIn 1.2s ease 0.6s both;
}

.d2-hero-sub {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.2rem, 2.2vw, 1.6rem);
  font-weight: 400;
  font-style: italic;
  color: #e2d0a8;
  max-width: 480px;
  line-height: 1.7;
  margin: 2.5rem auto;
  animation: d2FadeIn 1s ease 1s both;
}

.d2-hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  animation: d2FadeIn 1s ease 1.2s both;
}

.d2-btn-gold {
  font-family: 'Cormorant SC', serif;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #080510;
  background: linear-gradient(135deg, #c9a84c, #e8c96c, #c9a84c);
  background-size: 200%;
  padding: 1rem 3rem;
  text-decoration: none;
  display: inline-block;
  transition: background-position 0.4s ease, box-shadow 0.3s ease;
}

.d2-btn-gold:hover {
  background-position: right;
  box-shadow: 0 0 40px rgba(201,168,76,0.3);
}

.d2-btn-ghost {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-style: italic;
  letter-spacing: 0.1em;
  color: rgba(201,168,76,0.7);
  text-decoration: none;
  border-bottom: 1px solid rgba(201,168,76,0.2);
  padding-bottom: 0.2rem;
  transition: all 0.3s ease;
}

.d2-btn-ghost:hover { color: #c9a84c; border-color: #c9a84c; }

.d2-hero-scroll {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: d2FadeIn 1s ease 1.5s both;
}

.d2-scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, rgba(201,168,76,0.5), transparent);
  animation: d2ScrollLine 2s ease-in-out infinite;
}

@keyframes d2ScrollLine {
  0%, 100% { transform: scaleY(1); opacity: 0.5; }
  50% { transform: scaleY(0.5); opacity: 1; }
}

.d2-scroll-label {
  font-family: 'Cormorant SC', serif;
  font-size: 0.5rem;
  letter-spacing: 0.4em;
  color: rgba(201,168,76,0.3);
}

/* ─── ABOUT ─── */
.d2-about {
  padding: 8rem 0;
}

.d2-about-inner {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 0;
  align-items: start;
}

.d2-about-col-divider {
  background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent);
  margin: 0 4rem;
  align-self: stretch;
}

.d2-about-col {
  padding: 0 1rem;
}

.d2-section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  line-height: 1.1;
  color: #f5eedc;
  margin-bottom: 2rem;
}

.d2-section-title em {
  font-style: italic;
  background: linear-gradient(135deg, #c9a84c, #f0d78c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.d2-body-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 400;
  font-style: italic;
  line-height: 1.8;
  color: #e2d0a8;
  margin-bottom: 1.5rem;
}

.d2-body-text-plain {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.85;
  color: #d4c090;
  margin-bottom: 1rem;
}

.d2-stat-row {
  display: flex;
  gap: 2.5rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(201,168,76,0.1);
}

.d2-stat {
  text-align: center;
}

.d2-stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: #c9a84c;
  display: block;
  line-height: 1;
}

.d2-stat-label {
  font-family: 'Cormorant SC', serif;
  font-size: 0.65rem;
  letter-spacing: 0.35em;
  color: #b89a68;
  display: block;
  margin-top: 0.4rem;
}

/* ─── FEATURE EXPERIENCE ─── */
.d2-experience {
  padding: 6rem 0 8rem;
  text-align: center;
}

.d2-experience-inner {
  position: relative;
}

.d2-exp-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 600;
  font-style: italic;
  line-height: 1;
  color: #e8d5b0;
  margin-bottom: 0.5rem;
}

.d2-exp-subtitle {
  font-family: 'Cormorant SC', serif;
  font-size: 0.85rem;
  letter-spacing: 0.4em;
  color: #e0c078;
  display: block;
  margin-bottom: 3rem;
}

.d2-exp-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  margin-top: 4rem;
  background: rgba(201,168,76,0.1);
}

.d2-exp-card {
  background: #080510;
  padding: 3rem 2.5rem;
  text-align: left;
  transition: background 0.4s ease;
  position: relative;
  overflow: hidden;
}

.d2-exp-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(201,168,76,0.04), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.d2-exp-card:hover::before { opacity: 1; }

.d2-exp-card-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.5rem;
  font-weight: 300;
  color: rgba(201,168,76,0.12);
  line-height: 1;
  display: block;
  margin-bottom: 1rem;
}

.d2-exp-card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 300;
  color: #e8d5b0;
  margin-bottom: 0.8rem;
  font-style: italic;
}

.d2-exp-card-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.8;
  color: #d4c090;
}

/* ─── ARTISTS ─── */
.d2-artists {
  padding: 8rem 0;
}

.d2-artists-header {
  text-align: center;
  margin-bottom: 5rem;
}

.d2-artist-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(201,168,76,0.08);
}

.d2-artist-card {
  background: #080510;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;
  transition: background 0.4s;
}

.d2-artist-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, transparent, #c9a84c, transparent);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.d2-artist-card:hover::after { transform: scaleX(1); }

.d2-artist-sigil {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  color: rgba(201,168,76,0.2);
  display: block;
  margin-bottom: 1.5rem;
}

.d2-artist-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.7rem;
  font-weight: 600;
  color: #f5eedc;
  margin-bottom: 0.2rem;
}

.d2-artist-sub {
  font-family: 'Cormorant SC', serif;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  color: #e0c078;
  display: block;
  margin-bottom: 1.2rem;
}

.d2-artist-bio {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 400;
  font-style: italic;
  line-height: 1.75;
  color: #d4c090;
}

.d2-artist-link {
  display: inline-block;
  margin-top: 1.2rem;
  font-family: 'Cormorant SC', serif;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #e0c078;
  text-decoration: none;
  border-bottom: 1px solid rgba(201,168,76,0.3);
  padding-bottom: 0.15rem;
  transition: color 0.2s, border-color 0.2s;
}

.d2-artist-link:hover {
  color: #f0d898;
  border-color: #c9a84c;
}

/* ─── TESTIMONIALS ─── */
.d2-testimonials {
  padding: 8rem 0;
}

.d2-testimonial-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(201,168,76,0.08);
  margin-top: 4rem;
}

.d2-testimonial-card {
  background: #080510;
  padding: 3rem 2.5rem;
  position: relative;
}

.d2-testimonial-card::before {
  content: '\\201C';
  font-family: 'Cormorant Garamond', serif;
  font-size: 6rem;
  line-height: 1;
  color: rgba(201,168,76,0.08);
  position: absolute;
  top: 1rem;
  left: 2rem;
}

.d2-testimonial-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 400;
  font-style: italic;
  line-height: 1.8;
  color: #e2d0a8;
  margin-bottom: 1.5rem;
  position: relative;
}

.d2-testimonial-author {
  font-family: 'Cormorant SC', serif;
  font-size: 0.7rem;
  letter-spacing: 0.35em;
  color: #c9a84c;
  display: block;
}

.d2-testimonial-role {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  font-style: italic;
  color: rgba(201,168,76,0.45);
  display: block;
  margin-top: 0.2rem;
}

/* ─── CONTACT ─── */
.d2-contact-section {
  padding: 8rem 0;
}

.d2-contact-inner {
  max-width: 680px;
  margin: 0 auto;
}

.d2-contact-form {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(201,168,76,0.08);
  margin-top: 3rem;
}

.d2-contact-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(201,168,76,0.08);
}

.d2-contact-field {
  display: flex;
  flex-direction: column;
  background: #080510;
}

.d2-contact-label {
  font-family: 'Cormorant SC', serif;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: #e0c078;
  padding: 1rem 1.5rem 0;
}

.d2-contact-input {
  background: transparent;
  border: none;
  outline: none;
  padding: 0.5rem 1.5rem 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem;
  font-style: italic;
  color: #e8d5b0;
  width: 100%;
}

.d2-contact-input::placeholder { color: rgba(201,168,76,0.2); }

.d2-contact-textarea {
  background: #080510;
  border: none;
  outline: none;
  padding: 1rem 1.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem;
  font-style: italic;
  color: #e8d5b0;
  resize: vertical;
  min-height: 160px;
  width: 100%;
}

.d2-contact-textarea::placeholder { color: rgba(201,168,76,0.2); }

.d2-contact-submit {
  font-family: 'Cormorant SC', serif;
  font-size: 0.85rem;
  letter-spacing: 0.35em;
  color: #080510;
  background: linear-gradient(135deg, #c9a84c, #e8c96c);
  border: none;
  padding: 1.2rem 3rem;
  cursor: pointer;
  transition: opacity 0.2s;
  align-self: flex-start;
  margin-top: 1px;
  font-weight: 600;
}

.d2-contact-submit:hover { opacity: 0.85; }
.d2-contact-submit:disabled { opacity: 0.5; cursor: default; }

/* ─── CTA / MAILING LIST ─── */
.d2-cta-section {
  padding: 8rem 0 6rem;
  text-align: center;
}

.d2-cta-inner {
  max-width: 600px;
  margin: 0 auto;
}

.d2-cta-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  line-height: 1.1;
  color: #e8d5b0;
  margin-bottom: 1.5rem;
}

.d2-cta-title em {
  font-style: italic;
  background: linear-gradient(135deg, #c9a84c, #f0d78c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.d2-cta-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 400;
  font-style: italic;
  color: #e2d0a8;
  line-height: 1.7;
  margin-bottom: 3rem;
}

.d2-form {
  display: flex;
  gap: 0;
  max-width: 460px;
  margin: 0 auto 1.5rem;
  border: 1px solid rgba(201,168,76,0.25);
}

.d2-form-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 1rem 1.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  font-style: italic;
  color: #e8d5b0;
}

.d2-form-input::placeholder {
  color: rgba(201,168,76,0.25);
}

.d2-form-btn {
  font-family: 'Cormorant SC', serif;
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: #080510;
  background: linear-gradient(135deg, #c9a84c, #e8c96c);
  border: none;
  padding: 1rem 1.8rem;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
  font-weight: 600;
}

.d2-form-btn:hover { opacity: 0.85; }

.d2-form-privacy {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-weight: 400;
  font-style: italic;
  color: #c8b070;
}

/* ─── FOOTER ─── */
.d2-footer {
  padding: 3rem 0;
  border-top: 1px solid rgba(201,168,76,0.08);
}

.d2-footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.d2-footer-logo {
  font-family: 'Cormorant SC', serif;
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: rgba(201,168,76,0.65);
}

.d2-footer-links {
  display: flex;
  gap: 2rem;
}

.d2-footer-link {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.8rem;
  font-style: italic;
  color: rgba(201,168,76,0.5);
  text-decoration: none;
  transition: color 0.2s;
}

.d2-footer-link:hover { color: rgba(201,168,76,0.6); }

.d2-footer-copy {
  font-family: 'Cormorant SC', serif;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  color: rgba(201,168,76,0.4);
}

/* ─── ANIMATIONS ─── */
@keyframes d2FadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ─── HERO IMAGE ─── */
.d2-hero-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 20%;
  opacity: 0.2;
  z-index: 0;
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%);
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%);
  filter: saturate(0.25) brightness(0.8);
}

/* ─── GALLERY ─── */
.d2-gallery {
  position: relative;
  z-index: 10;
}

.d2-gallery-strip {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1px;
  background: rgba(201,168,76,0.06);
}

.d2-gallery-item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
  cursor: pointer;
}

.d2-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.25) brightness(0.55);
  transition: filter 0.8s ease, transform 0.8s ease;
  display: block;
}

.d2-gallery-item:hover img {
  filter: saturate(0.5) brightness(0.7);
  transform: scale(1.04);
}

.d2-gallery-item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(8,5,16,0.7) 0%, transparent 50%);
  pointer-events: none;
}

.d2-gallery-item-label {
  position: absolute;
  bottom: 1.5rem;
  left: 2rem;
  font-family: 'Cormorant SC', serif;
  font-size: 0.7rem;
  letter-spacing: 0.35em;
  color: rgba(201,168,76,0.8);
}

/* ─── EXPERIENCE CARD IMAGE ─── */
.d2-exp-card-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  transition: opacity 0.5s ease;
  filter: saturate(0.2);
  z-index: 0;
}

.d2-exp-card:hover .d2-exp-card-img { opacity: 0.18; }
.d2-exp-card > *:not(.d2-exp-card-img) { position: relative; z-index: 1; }

/* ─── ARTIST PORTRAIT ─── */
.d2-artist-portrait {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(201,168,76,0.35);
  box-shadow: 0 0 0 5px rgba(8,5,16,1), 0 0 0 6px rgba(201,168,76,0.15), 0 0 30px rgba(201,168,76,0.1);
  flex-shrink: 0;
}

.d2-artist-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: saturate(0.3) brightness(0.85);
  transition: filter 0.5s ease;
}

.d2-artist-card:hover .d2-artist-portrait img {
  filter: saturate(0.55) brightness(0.95);
}

/* ─── VIDEO ─── */
.d2-video-section {
  padding: 1px 0 0;
  background: rgba(201,168,76,0.06);
}

.d2-video-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem clamp(2rem, 5vw, 5rem);
}

.d2-video-eyebrow {
  font-family: 'Cormorant SC', serif;
  font-size: 0.7rem;
  letter-spacing: 0.5em;
  color: #e0c078;
  display: block;
  text-align: center;
  margin-bottom: 1.5rem;
}

.d2-video-frame {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #04020a;
  border: 1px solid rgba(201,168,76,0.2);
  box-shadow: 0 0 0 6px rgba(8,5,16,1), 0 0 0 7px rgba(201,168,76,0.1), 0 40px 80px rgba(0,0,0,0.6);
  overflow: hidden;
}

.d2-video-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(201,168,76,0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.d2-video-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  filter: brightness(0.92);
}

.d2-video-caption {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  font-style: italic;
  color: rgba(201,168,76,0.5);
  text-align: center;
  display: block;
  margin-top: 1.2rem;
  letter-spacing: 0.05em;
}

/* ─── LIGHTBOX ─── */
.d2-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: zoom-out;
  animation: d2LightboxIn 0.3s ease both;
}

.d2-lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(4, 2, 10, 0.95);
  backdrop-filter: blur(12px);
}

.d2-lightbox-img {
  position: relative;
  z-index: 1;
  max-width: min(90vw, 1000px);
  max-height: 85vh;
  object-fit: contain;
  filter: saturate(0.5) brightness(0.9);
  box-shadow: 0 0 0 1px rgba(201,168,76,0.2), 0 40px 120px rgba(0,0,0,0.8);
  animation: d2LightboxImgIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.d2-lightbox-caption {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  font-family: 'Cormorant SC', serif;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: rgba(201,168,76,0.6);
  white-space: nowrap;
  animation: d2FadeIn 0.4s ease 0.2s both;
}

.d2-lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  z-index: 2;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  color: rgba(201,168,76,0.5);
  cursor: pointer;
  background: none;
  border: none;
  line-height: 1;
  transition: color 0.2s;
  animation: d2FadeIn 0.3s ease both;
}

.d2-lightbox-close:hover { color: #c9a84c; }

@keyframes d2LightboxIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes d2LightboxImgIn {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

.d2-clickable {
  cursor: zoom-in;
}

/* ─── SVG ORNAMENT ─── */
.d2-ornament-svg {
  display: block;
  width: 240px;
  margin: 0 auto;
  opacity: 0.35;
}

.d2-ornament-svg-sm {
  display: block;
  width: 160px;
  margin: 0 auto;
  opacity: 0.3;
}
`

const IMG = {
  stainedGlass: '/images/church-of-woo-stained-glass.jpg',
  eventNotel:   '/images/church-of-woo-notel-event.jpg',
  bassFloor:    '/images/crescendo-bass-floor-tiles.jpg',
  mrTea:        '/images/mr-tea-michael-devin.jpg',
  dalyte:       '/images/dalyte-kodzis-singer-performer.jpg',
  ambscience:   '/images/ambscience-paul-de-konkoly-thege.jpg',
}

const particles = Array.from({ length: 30 }, (_, i) => {
  const size = 1 + Math.random() * 7          // 1–8px: wide range for visible parallax
  const t = (size - 1) / 7                    // 0=smallest, 1=largest
  const duration = 18 - t * 13               // small=18s (slow), large=5s (fast)
  const peakOpacity = 0.2 + t * 0.6          // small=0.2 (dim), large=0.8 (bright)
  const trailOpacity = peakOpacity * 0.35    // fade toward end
  return {
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration,
    size,
    dx: (Math.random() - 0.5) * (40 + t * 60), // larger particles drift more too
    peakOpacity,
    trailOpacity,
  }
})

function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function OrnamentTop({ width = 240, opacity = 0.35 }: { width?: number; opacity?: number }) {
  return (
    <svg style={{ display: 'block', width, margin: '0 auto', opacity }} viewBox="0 0 240 50" fill="none">
      <line x1="0" y1="25" x2="90" y2="25" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="90" y1="25" x2="105" y2="10" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="105" y1="10" x2="120" y2="25" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="120" y1="25" x2="135" y2="40" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="135" y1="40" x2="150" y2="25" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="150" y1="25" x2="240" y2="25" stroke="#c9a84c" strokeWidth="0.5"/>
      <circle cx="120" cy="25" r="4" stroke="#c9a84c" strokeWidth="0.5" fill="none"/>
      <circle cx="120" cy="25" r="1.5" fill="#c9a84c" fillOpacity="0.6"/>
      <line x1="50" y1="20" x2="50" y2="30" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="190" y1="20" x2="190" y2="30" stroke="#c9a84c" strokeWidth="0.5"/>
    </svg>
  )
}

function Lightbox({ src, caption, onClose }: { src: string; caption: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="d2-lightbox" onClick={onClose}>
      <div className="d2-lightbox-backdrop" />
      <button className="d2-lightbox-close" onClick={onClose}>✕</button>
      <img
        className="d2-lightbox-img"
        src={src}
        alt={caption}
        onClick={e => e.stopPropagation()}
      />
      {caption && <span className="d2-lightbox-caption">{caption}</span>}
    </div>
  )
}

export default function Design2() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactError, setContactError] = useState('')
  const [contactLoading, setContactLoading] = useState(false)

  async function handleContact(e: React.FormEvent) {
    e.preventDefault()
    setContactLoading(true)
    setContactError('')
    try {
      const res = await fetch('https://formspree.io/f/mbdabpdo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null)
  const openLightbox = useCallback((src: string, caption: string) => setLightbox({ src, caption }), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://buttondown.com/api/emails/embed-subscribe/michaeldevin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data?.email?.[0] ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {lightbox && <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={closeLightbox} />}
      <div className="d2">
        {/* Fixed background layers */}
        <div className="d2-bg-fixed" />
        <div className="d2-glow-orb" />
        <div className="d2-pillars">
          {[12, 25, 50, 75, 88].map(pos => (
            <div key={pos} className="d2-pillar-line" style={{ left: `${pos}%` }} />
          ))}
        </div>
        <div className="d2-particles">
          {particles.map(p => (
            <div key={p.id} className="d2-particle" style={{
              left: `${p.left}%`, bottom: 0,
              width: `${p.size}px`, height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--dx': `${p.dx}px`,
              '--peak-opacity': p.peakOpacity,
              '--trail-opacity': p.trailOpacity,
            } as React.CSSProperties} />
          ))}
        </div>

        {/* Navigation */}
        <nav className="d2-nav">
          <a href="#hero" className="d2-nav-logo">Woo Art Collective</a>
          <div className="d2-nav-links">
            <a href="#experience" className="d2-nav-link" onClick={scrollTo('experience')}>The Experience</a>
            <a href="#artists" className="d2-nav-link" onClick={scrollTo('artists')}>Artists</a>
            <a href="#contact" className="d2-nav-link" onClick={scrollTo('contact')}>Contact</a>
            <a href="#join" className="d2-nav-cta" onClick={scrollTo('join')}>Join Mailing List</a>
          </div>
        </nav>

        {/* ─── HERO ─── */}
        <section id="hero" className="d2-section d2-hero">
          <div className="d2-hero-img" style={{ backgroundImage: `url(${IMG.stainedGlass})` }} />
          <div style={{ animation: 'd2FadeIn 1s ease 0.2s both', position: 'relative', zIndex: 1 }}>
            <OrnamentTop width={240} opacity={0.35} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="d2-hero-eyebrow">Bay Area Immersive Sound Experiences</span>

            <span className="d2-hero-title-art">Church</span>
            <span className="d2-hero-title-of">— of —</span>
            <span className="d2-hero-title-woo">Woo</span>

            <p className="d2-hero-sub">
              Ceremony. Surround sound. Vibration.
              An immersive music experience unlike anything you've encountered.
            </p>

            <div className="d2-hero-actions">
              <a href="#join" className="d2-btn-gold" onClick={scrollTo('join')}>Join the Mailing List</a>
              <a href="#experience" className="d2-btn-ghost" onClick={scrollTo('experience')}>Discover the Experience</a>
            </div>

            <div className="d2-hero-scroll">
              <div className="d2-scroll-line" />
              <span className="d2-scroll-label">Descend</span>
            </div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="d2-section d2-about">
          <div className="d2-container">
            <div className="d2-ornament-divider" style={{ marginBottom: '5rem' }}>
              <div className="d2-divider-line" />
              <span className="d2-divider-glyph">✦ ✦ ✦</span>
              <div className="d2-divider-line" />
            </div>

            <div className="d2-about-inner">
              <div className="d2-about-col">
                <span className="d2-eyebrow">What is Woo Art Collective</span>
                <h2 className="d2-section-title">The Art of <em>Sound</em> & Ceremony</h2>
                <p className="d2-body-text" style={{ fontStyle: 'normal' }}>
                  We create immersive music listening experiences that dissolve the barrier between performer and audience, between sound and body.
                </p>
                <p className="d2-body-text-plain">
                  Each event is a journey: beginning with ceremony and unfolding into fully immersive sound, delivered through 11 speakers and a bass floor that you feel as much as hear.
                </p>
                <div className="d2-stat-row">
                  <div className="d2-stat">
                    <span className="d2-stat-num">7.1.4</span>
                    <span className="d2-stat-label">Sound System</span>
                  </div>
                  <div className="d2-stat">
                    <span className="d2-stat-num">360°</span>
                    <span className="d2-stat-label">Surround Sound</span>
                  </div>
                  <div className="d2-stat">
                    <span className="d2-stat-num">∞</span>
                    <span className="d2-stat-label">Bass Floor</span>
                  </div>
                </div>
              </div>

              <div className="d2-about-col-divider" />

              <div className="d2-about-col">
                <span className="d2-eyebrow">The Experience</span>
                <h2 className="d2-section-title">Performance<br/><em>Beyond the Stage</em></h2>
                <p className="d2-body-text-plain">
                  Our Church events are not concerts - they are rituals of listening. Designed to move you and help dissolve the chaos of life... our aim is give you an unique experience that only music can reach.
                </p>
                <p className="d2-body-text-plain">
                  With bass floor integration that transmits vibration directly through your body, and artists spanning electronic, operatic, ambient, and experimental genres, each event is singular and unrepeatable.
                </p>
                <p className="d2-body-text">
                  Join our mailing list to receive updates on future events across the Bay Area and beyond.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PHOTO GALLERY ─── */}
        <section className="d2-gallery">
          <div className="d2-gallery-strip">
            <div className="d2-gallery-item d2-clickable" onClick={() => openLightbox(IMG.eventNotel, 'Church of Woo · Notel')}>
              <img src={IMG.eventNotel} alt="Church of Woo at Notel" title="Church of Woo — immersive sound event at Notel, San Francisco" loading="lazy" />
              <div className="d2-gallery-item-overlay" />
              <span className="d2-gallery-item-label">Church of Woo · Notel</span>
            </div>
            <div className="d2-gallery-item d2-clickable" onClick={() => openLightbox(IMG.bassFloor, 'Crescendo Bass Floor')}>
              <img src={IMG.bassFloor} alt="Crescendo Research bass floor" title="Crescendo Bass Floor tiles — tactile audio vibration system used at Church of Woo" loading="lazy" />
              <div className="d2-gallery-item-overlay" />
              <span className="d2-gallery-item-label">Crescendo Bass Floor</span>
            </div>
          </div>
        </section>

        {/* ─── VIDEO ─── */}
        <section className="d2-section d2-video-section">
          <div className="d2-video-inner">
            <span className="d2-video-eyebrow">Live Recording</span>
            <div className="d2-video-frame">
              <iframe
                src="https://www.youtube.com/embed/1t7PijAeAjU?feature=oembed"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title="Church of Woo with Dalyte - Room Service 2023-11-12"
              />
            </div>
            <span className="d2-video-caption">Church of Woo with Dalyte — Room Service, November 2023</span>
          </div>
        </section>

        {/* ─── FEATURED EXPERIENCE ─── */}
        <section id="experience" className="d2-section d2-experience">
          <div className="d2-container">
            <div className="d2-ornament-divider" style={{ marginBottom: '3rem' }}>
              <div className="d2-divider-line" />
              <span className="d2-divider-glyph">✦</span>
              <div className="d2-divider-line" />
            </div>

            <span className="d2-eyebrow" style={{ textAlign: 'center', display: 'block' }}>Upcoming Events</span>
            <h2 className="d2-exp-title" style={{ display: 'none' }}>The Gut Grotto</h2>
            <span className="d2-exp-subtitle" style={{ display: 'none' }}>A journey in two chambers</span>

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400, fontStyle: 'italic', color: '#e2d0a8', maxWidth: '520px', margin: '0 auto 1rem', lineHeight: 1.7 }}>
              We will be hosting events around California and beyond this year.<br/>Contact us for Private events
            </p>

            <OrnamentTop width={180} opacity={0.2} />

            <div className="d2-exp-cards" style={{ marginTop: '3rem', display: 'none' }}>
              <div className="d2-exp-card">
                <span className="d2-exp-card-num">I</span>
                <h3 className="d2-exp-card-title">Neurobiotic Senseways</h3>
                <span style={{ fontFamily: "'Cormorant SC', serif", fontSize: '0.8rem', letterSpacing: '0.3em', color: '#e0c078', display: 'block', marginBottom: '1rem' }}>
                  Bowrain Betscher
                </span>
                <p className="d2-exp-card-text">
                  A flavor and texture lounge that primes the body and sharpens the senses before the sonic journey begins. Taste, touch, and smell as preparation for deep listening.
                </p>
              </div>
              <div className="d2-exp-card">
                <div className="d2-exp-card-img" style={{ backgroundImage: `url(${IMG.bassFloor})` }} />
                <span className="d2-exp-card-num">II</span>
                <h3 className="d2-exp-card-title">The Gut Grotto</h3>
                <span style={{ fontFamily: "'Cormorant SC', serif", fontSize: '0.8rem', letterSpacing: '0.3em', color: '#e0c078', display: 'block', marginBottom: '1rem' }}>
                  Immersive Music & Vibration
                </span>
                <p className="d2-exp-card-text">
                  The main chamber. 360° Dolby surround sound, bass floor integration that conducts vibration through the body, and music that exists nowhere else in the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="d2-section d2-testimonials">
          <div className="d2-container">
            <div className="d2-ornament-divider" style={{ marginBottom: '3rem' }}>
              <div className="d2-divider-line" />
              <span className="d2-divider-glyph">✦ ✦ ✦</span>
              <div className="d2-divider-line" />
            </div>
            <span className="d2-eyebrow" style={{ textAlign: 'center', display: 'block' }}>Testimonials</span>
            <h2 className="d2-section-title" style={{ textAlign: 'center' }}>Voices of the <em>Experience</em></h2>

            <div className="d2-testimonial-grid">
              <div className="d2-testimonial-card">
                <p className="d2-testimonial-quote">
                  I've been to concerts, festivals, galleries and nothing has come close to this! The sound didn't just surround me, it moved through me. I left feeling genuinely altered, in the best way!
                </p>
                <span className="d2-testimonial-author">— Jon</span>
                <span className="d2-testimonial-role">San Francisco, CA</span>
              </div>
              <div className="d2-testimonial-card">
                <p className="d2-testimonial-quote">
                  Wow! That bass floor changed everything. It's one thing to hear music and another to feel it vibrating through the floor, up through your body. Church of Woo is unlike anything I've experienced, when is the next event?!?
                </p>
                <span className="d2-testimonial-author">— Ruby</span>
                <span className="d2-testimonial-role">Oakland, CA</span>
              </div>
              <div className="d2-testimonial-card">
                <p className="d2-testimonial-quote">
                  An intimate ceremony at the beginning set an intention and by the end I felt like I'd been on a journey of mind, body, and spirit.
                </p>
                <span className="d2-testimonial-author">— Serena</span>
                <span className="d2-testimonial-role">Berkeley, CA</span>
              </div>
              <div className="d2-testimonial-card">
                <p className="d2-testimonial-quote">
                  Dalyte's voice in that space was transcendent and I got my own personal performance from her, incredible!
                </p>
                <span className="d2-testimonial-author">— Ganesh</span>
                <span className="d2-testimonial-role">Rockridge, CA</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ARTISTS ─── */}
        <section id="artists" className="d2-section d2-artists">
          <div className="d2-container">
            <div className="d2-artists-header">
              <div className="d2-ornament-divider" style={{ marginBottom: '2.5rem' }}>
                <div className="d2-divider-line" />
                <span className="d2-divider-glyph">✦ ✦ ✦</span>
                <div className="d2-divider-line" />
              </div>
              <span className="d2-eyebrow">The Artists</span>
              <h2 className="d2-section-title" style={{ textAlign: 'center' }}>Creators of the <em>Collective</em></h2>
            </div>

            <div className="d2-artist-grid">
              <div className="d2-artist-card">
                <div className="d2-artist-portrait d2-clickable" onClick={() => openLightbox(IMG.mrTea, 'Mr. Tea · Michael Devin')}>
                  <img src={IMG.mrTea} alt="Mr. Tea" title="Mr. Tea (Michael Devin) — musician and event producer, Church of Woo" loading="lazy" />
                </div>
                <h3 className="d2-artist-name">Mr. Tea</h3>
                <span className="d2-artist-sub">Michael Devin · Musician & Event Producer</span>
                <p className="d2-artist-bio">
                  Michael Devin (Mr. Tea) was drawn to the electronic music invasion of the British music scene in the late '80s, influenced by artists such as S'Express, Adamski, N-Joi, and Future Sound of London. In the '90s, he released music on various labels, including Leftfield's Hard Hands and Concrete, collaborating with Andrew Weatherall and Jagz Cooner of Sabres of Paradise. His work received heavy airplay from notable DJs like Annie Nightingale, Justin Robertson, and John Peel. After a break and a move to San Francisco, Mr. Tea is back, biscuit in one hand and drum machine in the other.
                </p>
                <a href="https://linktr.ee/mrtea_sf" target="_blank" rel="noopener noreferrer" className="d2-artist-link">linktr.ee/mrtea_sf</a>
              </div>

              <div className="d2-artist-card">
                <div className="d2-artist-portrait d2-clickable" onClick={() => openLightbox(IMG.dalyte, 'Dalyte Kodzis · Singer & Performer')}>
                  <img src={IMG.dalyte} alt="Dalyte Kodzis" title="Dalyte Kodzis · Singer &amp; Performer, Woo Art Collective" loading="lazy" />
                </div>
                <h3 className="d2-artist-name">Dalyte Kodzis</h3>
                <span className="d2-artist-sub">Dalyte Kodzis · Singer & Performer</span>
                <p className="d2-artist-bio">
                  Dalyte Kodzis, soprano, has sung throughout the Bay Area with numerous operatic companies, including Festival Opera, Pocket Opera, Opera on Tap, Trinity Opera, and Martinez Opera. Her artistic mission is to make classical vocal music more accessible to a larger demographic of people, and as such, she especially enjoys creating inventive performances in unconventional venues for opera. Trained as a dancer and stilt walker as well, she often employs her other talents to create unforgettable performances fused with her operatic vocals.
                </p>
                <a href="https://dalyte.com/" target="_blank" rel="noopener noreferrer" className="d2-artist-link" style={{ display: 'none' }}>dalyte.com</a>
              </div>

              <div className="d2-artist-card">
                <div className="d2-artist-portrait d2-clickable" onClick={() => openLightbox(IMG.ambscience, 'Ambscience · Paul de Konkoly Thege')}>
                  <img src={IMG.ambscience} alt="Ambiensce" title="Ambiensce (Paul de Konkoly Thege) — experimental ambient musician, Woo Art Collective" loading="lazy" />
                </div>
                <h3 className="d2-artist-name">Ambscience</h3>
                <span className="d2-artist-sub">Paul de Konkoly Thege · Musician & Performer</span>
                <p className="d2-artist-bio">
                  Ambiensce is the moniker under which Paul de Konkoly Thege aka DJ Godiva makes experimental ambient & post-rock music. He has been working in this format since 2018 and released his first album <em>schliessongs</em> on Underthink Records in 2021. <em>schliessongs</em> was composed in quarantine in 2020 in Brooklyn and throughout the US during the height of the COVID-19 pandemic. His second album <em>transiensce</em> is currently in work and set for release in 2025.
                </p>
                <a href="https://soundcloud.com/Ambiensce" target="_blank" rel="noopener noreferrer" className="d2-artist-link">soundcloud.com/Ambiensce</a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CRESCENDO SUB FLOOR ─── */}
        <section className="d2-section d2-about" style={{ paddingTop: '2rem' }}>
          <div className="d2-container">
            <div className="d2-ornament-divider" style={{ marginBottom: '4rem' }}>
              <div className="d2-divider-line" />
              <span className="d2-divider-glyph">✦ ✦ ✦</span>
              <div className="d2-divider-line" />
            </div>
            <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <span className="d2-eyebrow">Technology</span>
              <h2 className="d2-section-title" style={{ textAlign: 'center' }}>The Crescendo <em>Sub Floor</em></h2>
              <p className="d2-body-text-plain" style={{ textAlign: 'center' }}>
                The Crescendo Bass Tiles are a modular, scalable tactile-audio system that transmits deep vibrations through the floor rather than the air. Each tile is powered by a 300-watt transducer — not a speaker, but a vibration engine — allowing the entire room to become an instrument you feel as much as hear. At Church of Woo, the bass floor transforms passive listening into a full-body experience, dissolving the boundary between sound and sensation.
              </p>
              <a
                href="https://www.crescendoresearch.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '1.5rem',
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '1.4rem',
                  letterSpacing: '0.35em',
                  color: '#e0c078',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(201,168,76,0.3)',
                  paddingBottom: '0.2rem',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#f0d898'; (e.target as HTMLElement).style.borderColor = '#c9a84c' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = '#e0c078'; (e.target as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)' }}
              >
                crescendoresearch.com
              </a>
            </div>
          </div>
        </section>

        {/* ─── MAILING LIST CTA ─── */}
        <section id="join" className="d2-section d2-cta-section">
          <div className="d2-container">
            <div className="d2-cta-inner">
              <div className="d2-ornament-divider" style={{ marginBottom: '3rem' }}>
                <div className="d2-divider-line" />
                <span className="d2-divider-glyph">✦</span>
                <div className="d2-divider-line" />
              </div>

              <span className="d2-eyebrow">Stay Connected</span>
              <h2 className="d2-cta-title">Enter the<br/><em>Church of Woo</em></h2>
              <p className="d2-cta-text">
                Join our mailing list for future event updates. Each gathering is unique — announced to those who are listening.
              </p>

              {!submitted ? (
                <>
                  <form className="d2-form" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      className="d2-form-input"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <button type="submit" className="d2-form-btn" disabled={loading}>
                      {loading ? '...' : 'Join'}
                    </button>
                  </form>
                  {error && (
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: 'rgba(220,100,100,0.8)', marginTop: '0.75rem' }}>
                      {error}
                    </p>
                  )}
                  <p className="d2-form-privacy">We respect your privacy. Unsubscribe at any time.</p>
                </>
              ) : (
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(201,168,76,0.6)', marginTop: '1rem' }}>
                  ✦ &nbsp; Thank you, welcome to the Woo! &nbsp; ✦
                </div>
              )}

              <div style={{ marginTop: '3rem' }}>
                <OrnamentTop width={180} opacity={0.2} />
              </div>

              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, fontStyle: 'italic', color: '#d4bc80', marginTop: '2rem' }}>
                Questions? <a href="#contact" onClick={scrollTo('contact')} style={{ color: '#e8c96c', textDecoration: 'none', borderBottom: '1px solid #c9a84c' }}>Contact Us</a>
              </p>
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="d2-section d2-contact-section">
          <div className="d2-container">
            <div className="d2-contact-inner">
              <div className="d2-ornament-divider" style={{ marginBottom: '3rem' }}>
                <div className="d2-divider-line" />
                <span className="d2-divider-glyph">✦</span>
                <div className="d2-divider-line" />
              </div>
              <span className="d2-eyebrow" style={{ textAlign: 'center', display: 'block' }}>Get in Touch</span>
              <h2 className="d2-section-title" style={{ textAlign: 'center' }}>Connect <em>with Us</em></h2>
              <p className="d2-body-text" style={{ textAlign: 'center', fontStyle: 'normal' }}>
                Interested in attending, hosting, or collaborating with us?
              </p>

              {!contactSubmitted ? (
                <>
                  <form className="d2-contact-form" onSubmit={handleContact}>
                    <div className="d2-contact-row">
                      <div className="d2-contact-field">
                        <label className="d2-contact-label">Name</label>
                        <input className="d2-contact-input" type="text" placeholder="Your name" required
                          value={contact.name} onChange={e => setContact(c => ({ ...c, name: e.target.value }))} />
                      </div>
                      <div className="d2-contact-field">
                        <label className="d2-contact-label">Email</label>
                        <input className="d2-contact-input" type="email" placeholder="your@email.com" required
                          value={contact.email} onChange={e => setContact(c => ({ ...c, email: e.target.value }))} />
                      </div>
                    </div>
                    <div className="d2-contact-field">
                      <label className="d2-contact-label">Phone <span style={{ opacity: 0.4 }}>— optional</span></label>
                      <input className="d2-contact-input" type="tel" placeholder="+1 (000) 000-0000"
                        value={contact.phone} onChange={e => setContact(c => ({ ...c, phone: e.target.value }))} />
                    </div>
                    <div className="d2-contact-field">
                      <label className="d2-contact-label">Message</label>
                      <textarea className="d2-contact-textarea" placeholder="Tell us about your interest…" required
                        value={contact.message} onChange={e => setContact(c => ({ ...c, message: e.target.value }))} />
                    </div>
                    <button className="d2-contact-submit" type="submit" disabled={contactLoading}>
                      {contactLoading ? '...' : 'Send Message'}
                    </button>
                  </form>
                  {contactError && (
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: 'rgba(220,100,100,0.8)', marginTop: '1rem' }}>
                      {contactError}
                    </p>
                  )}
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: '#c8b070', marginTop: '1.5rem', textAlign: 'center' }}>
                    If you don't hear back within 48 hours, please check your spam folder.
                  </p>
                </>
              ) : (
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, fontStyle: 'italic', color: 'rgba(201,168,76,0.75)', marginTop: '3rem', textAlign: 'center', lineHeight: 1.8 }}>
                  ✦ &nbsp; Thank you!<br/>If you requested information and do not hear back within 48 hours, please check your email spam folder. &nbsp; ✦
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="d2-section d2-footer">
          <div className="d2-container">
            <div className="d2-footer-inner">
              <span className="d2-footer-logo">Woo Art Collective</span>
              <div className="d2-footer-links">
                <a href="#experience" className="d2-footer-link" onClick={scrollTo('experience')}>Experience</a>
                <a href="#artists" className="d2-footer-link" onClick={scrollTo('artists')}>Artists</a>
                <a href="#contact" className="d2-footer-link" onClick={scrollTo('contact')}>Contact</a>
              </div>
              <span className="d2-footer-copy">Bay Area & Beyond · artofwoo.org</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
