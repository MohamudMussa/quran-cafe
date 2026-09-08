import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// ─── Scroll-reveal hook (framer-motion v4 compatible) ─────────────────────────
function useScrollReveal(threshold = 0.12) {
  const controls = useAnimation();
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) controls.start('visible'); },
      { threshold }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [controls, threshold]);
  return { ref, controls };
}

// ─── Counter animation hook ───────────────────────────────────────────────────
function useCounter(end, duration = 2200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.floor(eased * end));
      if (frame >= totalFrames) { setCount(end); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [active, end, duration]);
  return count;
}

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const slideRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  forest:     '#081A09',
  forestMid:  '#0D2B10',
  forestLight:'#163D1B',
  gold:       '#C8A84B',
  goldLight:  '#E2C97E',
  cream:      '#F5EFE0',
  creamDark:  '#EDE5CE',
  charcoal:   '#101010',
  text:       '#E6DEC8',
  muted:      '#7A9A7E',
  border:     'rgba(200,168,75,0.18)',
};

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ scrolled }) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 48px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(8,26,9,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
        transition: 'background 0.4s, border-color 0.4s',
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: C.gold,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5L10 6H14.5L11 9L12.5 14L8 11L3.5 14L5 9L1.5 6H6L8 1.5Z" fill={C.forest} />
          </svg>
        </div>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.02em',
        }}>Abu Ecom</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {['Services', 'Results', 'Process'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{
            color: C.text, fontSize: 14, fontWeight: 500, textDecoration: 'none',
            letterSpacing: '0.02em', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = C.gold}
            onMouseLeave={e => e.target.style.color = C.text}
          >{link}</a>
        ))}
        <a href="#apply" style={{
          background: C.gold, color: C.forest, padding: '9px 22px', borderRadius: 6,
          fontSize: 14, fontWeight: 700, textDecoration: 'none',
          transition: 'background 0.2s, transform 0.15s',
        }}
          onMouseEnter={e => { e.target.style.background = C.goldLight; e.target.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.target.style.background = C.gold; e.target.style.transform = 'translateY(0)'; }}
        >Apply Now →</a>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef(null);
  const rev1 = useCounter(340, 2000, statsActive);
  const rev2 = useCounter(68, 1800, statsActive);
  const rev3 = useCounter(12, 1600, statsActive);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{
      minHeight: '100vh', background: C.forest,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      {/* Background geometry */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', right: -160, top: -160, width: 700, height: 700,
          borderRadius: '50%', border: `1px solid rgba(200,168,75,0.06)`,
        }} />
        <div style={{
          position: 'absolute', right: -80, top: -80, width: 500, height: 500,
          borderRadius: '50%', border: `1px solid rgba(200,168,75,0.04)`,
        }} />
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0L0 0 0 60" fill="none" stroke={C.gold} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
          background: `linear-gradient(to top, ${C.forest}, transparent)`,
        }} />
      </div>

      {/* Main grid */}
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1fr 420px',
        gap: 60, alignItems: 'center',
        maxWidth: 1200, margin: '0 auto',
        padding: '140px 48px 80px',
        position: 'relative', zIndex: 1,
        width: '100%', boxSizing: 'border-box',
      }}>
        {/* Left column */}
        <motion.div initial="hidden" animate="visible" variants={stagger}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <motion.div variants={fadeIn} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(200,168,75,0.09)', border: `1px solid ${C.border}`,
            borderRadius: 100, padding: '6px 16px', marginBottom: 32, width: 'fit-content',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold }} />
            <span style={{ color: C.gold, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>
              EMAIL RETENTION FOR MUSLIM BRANDS
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(44px, 5.5vw, 76px)', fontWeight: 800,
            lineHeight: 1.05, color: '#fff', margin: 0, letterSpacing: '-0.03em',
          }}>
            Turn one-time<br />
            <span style={{ color: C.gold }}>buyers</span> into<br />
            loyal customers.
          </motion.h1>

          <motion.p variants={fadeIn} style={{
            color: C.muted, fontSize: 18, lineHeight: 1.75,
            marginTop: 28, maxWidth: 480, fontWeight: 400,
          }}>
            Abu Ecom builds email retention systems exclusively for Muslim-owned
            Shopify brands — recovering lost revenue, increasing lifetime value,
            and building the loyalty your business deserves.
          </motion.p>

          <motion.div variants={fadeIn} style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}>
            <a href="#apply" style={{
              background: C.gold, color: C.forest, padding: '14px 32px',
              borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}>Apply to Work Together →</a>
            <a href="#services" style={{
              border: `1px solid rgba(200,168,75,0.3)`, color: C.text,
              padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500,
              textDecoration: 'none',
            }}>See the System</a>
          </motion.div>

          {/* Stats */}
          <motion.div ref={statsRef} variants={stagger} style={{
            display: 'flex', gap: 48, marginTop: 64, paddingTop: 40,
            borderTop: `1px solid ${C.border}`,
          }}>
            {[
              { val: `$${rev1}K+`, label: 'avg. revenue recovered' },
              { val: `${rev2}%`, label: 'avg. open rate' },
              { val: `${rev3}x`, label: 'avg. email ROI' },
            ].map(({ val, label }) => (
              <motion.div key={label} variants={fadeIn}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 42, fontWeight: 800, color: C.gold, lineHeight: 1,
                }}>{val}</div>
                <div style={{ color: C.muted, fontSize: 13, marginTop: 6, fontWeight: 500 }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column: dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative' }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(255,255,255,0.09)`,
            borderRadius: 16, padding: 28,
            backdropFilter: 'blur(12px)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span style={{ color: C.text, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>
                EMAIL REVENUE DASHBOARD
              </span>
              <div style={{
                background: 'rgba(200,168,75,0.12)', border: `1px solid ${C.border}`,
                borderRadius: 100, padding: '4px 10px',
                color: C.gold, fontSize: 11, fontWeight: 600,
              }}>● LIVE</div>
            </div>

            {/* Bar chart */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: C.muted, fontSize: 11, marginBottom: 12, letterSpacing: '0.06em' }}>
                MONTHLY EMAIL REVENUE
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
                {[35, 52, 44, 68, 58, 76, 88, 72, 95].map((h, i) => (
                  <motion.div key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      flex: 1, borderRadius: '3px 3px 0 0',
                      background: i === 8
                        ? `linear-gradient(to top, ${C.gold}, ${C.goldLight})`
                        : `rgba(200,168,75,${0.12 + i * 0.025})`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Flow performance */}
            {[
              { label: 'Welcome Series', pct: 88, rev: '+$4,200' },
              { label: 'Winback Campaign', pct: 72, rev: '+$2,800' },
              { label: 'VIP Loyalty Flow', pct: 94, rev: '+$6,100' },
            ].map(({ label, pct, rev }) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{label}</span>
                  <span style={{ color: C.gold, fontSize: 13, fontWeight: 700 }}>{rev}</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: '100%', background: C.gold, borderRadius: 2 }}
                  />
                </div>
              </div>
            ))}

            <div style={{
              marginTop: 24, paddingTop: 20, borderTop: `1px solid rgba(255,255,255,0.06)`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ color: C.muted, fontSize: 12, fontWeight: 500 }}>Total Email Revenue</span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                color: C.gold, fontSize: 22, fontWeight: 800,
              }}>$13,100 / mo</span>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: -20, right: -20,
              background: C.forestMid, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: '12px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ color: C.gold, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 2 }}>
              AUTOMATED
            </div>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Runs 24/7</div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{ textAlign: 'center', paddingBottom: 36, position: 'relative', zIndex: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ color: C.muted, fontSize: 20 }}
        >↓</motion.div>
      </motion.div>
    </section>
  );
}

// ─── Problem ──────────────────────────────────────────────────────────────────
function Problem() {
  const { ref, controls } = useScrollReveal();
  return (
    <section id="problem" style={{
      background: C.cream, padding: '120px 48px',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div ref={ref} initial="hidden" animate={controls} variants={stagger}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <motion.div variants={slideLeft}>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(96px, 14vw, 160px)',
                fontWeight: 900, lineHeight: 0.9,
                color: C.forestMid, letterSpacing: '-0.05em', marginBottom: 12,
              }}>68%</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: C.forestLight, marginBottom: 20,
              }}>of your customers never come back.</div>
              <div style={{
                height: 3, width: 60,
                background: `linear-gradient(to right, ${C.gold}, transparent)`,
                borderRadius: 2,
              }} />
            </motion.div>

            <motion.div variants={slideRight} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <p style={{ fontSize: 20, lineHeight: 1.7, color: C.forestMid, margin: 0 }}>
                Not because they didn't love your product. Not because your brand failed them.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: '#3D4A3E', margin: 0 }}>
                Because <strong>no system was in place to bring them back.</strong> No follow-up.
                No flow. No relationship — just a transaction they forgot.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: '#3D4A3E', margin: 0 }}>
                For every 100 customers you win, 68 silently walk away. That's acquisition spend
                already paid, trust already earned — walking out the door permanently.
              </p>

              {/* Loss visual */}
              <div style={{
                background: '#fff', borderRadius: 12, padding: 24,
                border: `1px solid ${C.creamDark}`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                marginTop: 8,
              }}>
                <div style={{ color: '#5A6B5C', fontSize: 12, marginBottom: 14, fontWeight: 600, letterSpacing: '0.05em' }}>
                  WITHOUT EMAIL RETENTION
                </div>
                <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} style={{
                      flex: 1, height: 28, borderRadius: 4,
                      background: i < 3
                        ? `linear-gradient(135deg, ${C.forestMid}, ${C.forestLight})`
                        : '#EDE5CE',
                    }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8A9A8C' }}>
                  <span style={{ color: C.forestMid, fontWeight: 600 }}>↑ 32% return</span>
                  <span>68% lost forever →</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── System / Services ────────────────────────────────────────────────────────
function FlowCard({ flow, featured = false }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? 'rgba(200,168,75,0.07)'
          : featured
            ? `linear-gradient(135deg, ${C.forestMid} 0%, rgba(20,50,25,0.8) 100%)`
            : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? 'rgba(200,168,75,0.28)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 12, padding: featured ? '28px 32px' : '26px',
        transition: 'all 0.3s ease', height: '100%', boxSizing: 'border-box',
        display: featured ? 'flex' : 'block',
        alignItems: featured ? 'center' : undefined,
        justifyContent: featured ? 'space-between' : undefined,
        gap: featured ? 40 : undefined,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8, flexShrink: 0,
          background: hov ? 'rgba(200,168,75,0.2)' : 'rgba(200,168,75,0.09)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: C.gold, fontSize: 17, transition: 'background 0.3s',
        }}>{flow.icon}</div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{flow.name}</div>
          <div style={{ color: '#5A6B5C', fontSize: 14, lineHeight: 1.65, maxWidth: featured ? 460 : undefined }}>
            {flow.desc}
          </div>
        </div>
      </div>
      <div style={{
        marginTop: featured ? 0 : 18, marginLeft: featured ? 0 : 54, flexShrink: 0,
      }}>
        <div style={{
          background: 'rgba(200,168,75,0.09)', border: `1px solid ${C.border}`,
          borderRadius: 100, padding: '5px 14px',
          color: C.gold, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap',
          display: 'inline-block',
        }}>↑ {flow.metric}</div>
      </div>
    </div>
  );
}

function System() {
  const { ref, controls } = useScrollReveal();
  const flows = [
    { icon: '✦', name: 'Welcome Series', desc: 'Make a powerful first impression. Convert new subscribers into first-time buyers with a strategic 5-email welcome sequence built around your brand story.', metric: '42% conversion lift', wide: true },
    { icon: '◈', name: 'Post-Purchase Flow', desc: 'Transform every transaction into a relationship. Reinforce buyer confidence, reduce refunds, and prime customers for their second purchase.', metric: '3x repeat purchase rate' },
    { icon: '◉', name: 'Browse Abandonment', desc: 'Recapture high-intent visitors who left before buying. Precision-timed sequences that bring warm traffic back to convert.', metric: '28% recovery rate' },
    { icon: '◆', name: 'Winback Campaign', desc: 'Your dormant list is a goldmine. Re-engage customers who went quiet with a proven 3-step winback sequence that reactivates loyalty.', metric: '+$2,400 avg/month', wide: true },
    { icon: '★', name: 'VIP Loyalty System', desc: 'Identify and reward your highest-value customers. Build a tier that drives premium purchases, word-of-mouth referrals, and lifetime loyalty.', metric: '6x LTV increase', featured: true },
  ];

  return (
    <section id="services" style={{
      background: C.charcoal, padding: '120px 48px',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div ref={ref} initial="hidden" animate={controls} variants={stagger}>
          <motion.div variants={fadeUp} style={{ maxWidth: 600, marginBottom: 72 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(200,168,75,0.07)', border: `1px solid ${C.border}`,
              borderRadius: 100, padding: '6px 16px', marginBottom: 24,
            }}>
              <span style={{ color: C.gold, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>THE RETENTION SYSTEM</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, color: '#fff',
              margin: 0, lineHeight: 1.1, letterSpacing: '-0.03em',
            }}>
              Five flows.<br />One complete<br />
              <span style={{ color: C.gold }}>revenue engine.</span>
            </h2>
            <p style={{ color: '#6B7B6C', fontSize: 17, lineHeight: 1.7, marginTop: 20 }}>
              Each system works independently. Together, they form an automated
              retention engine that generates revenue around the clock.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <motion.div variants={fadeIn} style={{ gridColumn: 'span 2' }}>
              <FlowCard flow={flows[0]} />
            </motion.div>
            <motion.div variants={fadeIn}>
              <FlowCard flow={flows[1]} />
            </motion.div>
            <motion.div variants={fadeIn}>
              <FlowCard flow={flows[2]} />
            </motion.div>
            <motion.div variants={fadeIn} style={{ gridColumn: 'span 2' }}>
              <FlowCard flow={flows[3]} />
            </motion.div>
            <motion.div variants={fadeIn} style={{ gridColumn: 'span 3' }}>
              <FlowCard flow={flows[4]} featured />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Muslim Brands ────────────────────────────────────────────────────────
function WhyMuslim() {
  const { ref, controls } = useScrollReveal();
  const reasons = [
    { title: 'We understand your buyer', body: "Muslim consumers make purchasing decisions through trust, values, and community. Generic email marketing misses this entirely. We speak your customers' language — not just culturally, but spiritually." },
    { title: 'Ramadan & Eid are your Super Bowl', body: "The Muslim calendar creates the highest-revenue windows of the year. We build seasonal flows that prepare your list months in advance so you capitalize on every peak — not scramble for it." },
    { title: 'Halal business values, always', body: "No misleading copy. No psychological dark patterns. No manipulation. Just honest, value-driven email systems that serve your customers the way Islamic commerce principles demand." },
    { title: 'Community-driven retention', body: "Muslim buyers are fiercely loyal to brands that reflect their identity. We help you build that identity in the inbox — turning customers into advocates who bring their community with them." },
  ];

  return (
    <section id="why" style={{
      background: C.forestMid, padding: '120px 48px', position: 'relative', overflow: 'hidden',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      {/* Islamic geometric bg */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hex" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,4 76,22 76,58 40,76 4,58 4,22"
                fill="none" stroke={C.gold} strokeWidth="0.8" />
              <line x1="40" y1="4" x2="40" y2="76" stroke={C.gold} strokeWidth="0.35" />
              <line x1="4" y1="22" x2="76" y2="58" stroke={C.gold} strokeWidth="0.35" />
              <line x1="76" y1="22" x2="4" y2="58" stroke={C.gold} strokeWidth="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div ref={ref} initial="hidden" animate={controls} variants={stagger}>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 80 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(200,168,75,0.08)', border: `1px solid ${C.border}`,
              borderRadius: 100, padding: '6px 16px', marginBottom: 24,
            }}>
              <span style={{ color: C.gold, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>
                WHY MUSLIM BRANDS CHOOSE US
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, color: '#fff',
              margin: '0 auto', lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: 580,
            }}>
              We don't just do email.<br />
              <span style={{ color: C.gold }}>We understand your people.</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {reasons.map((r, i) => (
              <motion.div key={i} variants={fadeIn}>
                <ReasonCard {...r} index={i} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ReasonCard({ title, body, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(200,168,75,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? 'rgba(200,168,75,0.22)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 12, padding: 32, transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 12, color: C.gold, fontWeight: 700,
        letterSpacing: '0.1em', marginBottom: 14,
      }}>0{index + 1}</div>
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 14px', letterSpacing: '-0.01em',
      }}>{title}</h3>
      <p style={{ color: '#5A6B5C', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{body}</p>
    </div>
  );
}

// ─── Results ──────────────────────────────────────────────────────────────────
function Results() {
  const { ref, controls } = useScrollReveal();
  const stats = [
    { number: '$340K+', label: 'Revenue generated for clients', sub: 'across all email flows combined' },
    { number: '68%',    label: 'Average email open rate', sub: 'vs. 21% industry average' },
    { number: '12x',    label: 'Average ROI on email investment', sub: 'every dollar spent returns twelve' },
  ];
  const testimonials = [
    { quote: "Before Abu Ecom, we had 3,000 subscribers collecting dust. Within 90 days our email flows were generating $8,400/month on autopilot.", name: "Founder, Muslim Skincare Brand", flag: "🇬🇧" },
    { quote: "Ramadan last year was our biggest month ever — and 40% of that revenue came directly from the email campaigns Abu Ecom built for us.", name: "CEO, Modest Fashion Label", flag: "🇺🇸" },
  ];

  return (
    <section id="results" style={{
      background: C.forest, padding: '120px 48px',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 800, height: 400, pointerEvents: 'none',
        background: `radial-gradient(ellipse, rgba(200,168,75,0.05) 0%, transparent 70%)`,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div ref={ref} initial="hidden" animate={controls} variants={stagger}>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(200,168,75,0.08)', border: `1px solid ${C.border}`,
              borderRadius: 100, padding: '6px 16px', marginBottom: 24,
            }}>
              <span style={{ color: C.gold, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>RESULTS</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, color: '#fff',
              margin: 0, lineHeight: 1.1, letterSpacing: '-0.03em',
            }}>
              Numbers that speak<br />
              <span style={{ color: C.gold }}>for themselves.</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 56 }}>
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeIn}>
                <div style={{
                  border: `1px solid ${C.border}`, borderRadius: 12, padding: '36px 28px',
                  textAlign: 'center', background: 'rgba(200,168,75,0.03)',
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 52, fontWeight: 900, color: C.gold,
                    letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 12,
                  }}>{s.number}</div>
                  <div style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ color: C.muted, fontSize: 13 }}>{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeIn}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: 12, padding: 32,
                }}>
                  <div style={{ color: C.gold, fontSize: 36, lineHeight: 1, marginBottom: 14 }}>"</div>
                  <p style={{ color: C.text, fontSize: 16, lineHeight: 1.75, margin: '0 0 24px', fontStyle: 'italic' }}>{t.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{t.flag}</span>
                    <span style={{ color: C.muted, fontSize: 13, fontWeight: 600 }}>{t.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function Process() {
  const { ref, controls } = useScrollReveal();
  const steps = [
    { num: '01', title: 'The Audit', time: 'Week 1', desc: 'We start with a full review of your Shopify store, existing email setup, and customer data. We identify the exact revenue gaps and map your fastest wins.' },
    { num: '02', title: 'The Build', time: 'Weeks 2–3', desc: 'We write, design, and deploy your complete email retention system — every flow, every sequence, every automation. You approve, we handle everything.' },
    { num: '03', title: 'The Growth', time: 'Ongoing', desc: "Your flows go live. Revenue begins. We monitor performance, A/B test subject lines, optimize timing, and scale what's working. Monthly reports keep you informed." },
  ];

  return (
    <section id="process" style={{
      background: C.creamDark, padding: '120px 48px',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div ref={ref} initial="hidden" animate={controls} variants={stagger}>
          <motion.div variants={fadeUp} style={{ maxWidth: 520, marginBottom: 80 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(13,43,16,0.07)', border: `1px solid rgba(13,43,16,0.14)`,
              borderRadius: 100, padding: '6px 16px', marginBottom: 24,
            }}>
              <span style={{ color: C.forestMid, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>HOW IT WORKS</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, color: C.forestMid,
              margin: 0, lineHeight: 1.1, letterSpacing: '-0.03em',
            }}>
              Simple process.<br />
              <span style={{ color: C.gold }}>Serious results.</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 31, left: '16%', right: '16%', height: 1,
              background: `linear-gradient(to right, ${C.gold}, rgba(200,168,75,0.15))`,
            }} />
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeUp} style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: i === 0 ? C.gold : C.cream,
                  border: `2px solid ${i === 0 ? C.gold : C.creamDark}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 15, fontWeight: 800,
                    color: i === 0 ? C.forest : C.forestMid,
                  }}>{s.num}</span>
                </div>
                <div style={{
                  display: 'inline-block', background: 'rgba(200,168,75,0.1)',
                  borderRadius: 100, padding: '4px 12px',
                  color: '#6B5A2A', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 12,
                }}>{s.time}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22, fontWeight: 800, color: C.forestMid,
                  margin: '0 0 12px', letterSpacing: '-0.02em',
                }}>{s.title}</h3>
                <p style={{ color: '#4A5D4C', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  const { ref, controls } = useScrollReveal();
  return (
    <section id="apply" style={{
      background: C.forestMid, padding: '130px 48px',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 350, pointerEvents: 'none',
        background: `radial-gradient(ellipse, rgba(200,168,75,0.1) 0%, transparent 70%)`,
      }} />

      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div ref={ref} initial="hidden" animate={controls} variants={stagger}>
          <motion.div variants={fadeIn} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(200,168,75,0.09)', border: `1px solid ${C.border}`,
            borderRadius: 100, padding: '6px 18px', marginBottom: 32,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold }} />
            <span style={{ color: C.gold, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>
              LIMITED SPOTS AVAILABLE
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: 900, color: '#fff',
            margin: '0 0 24px', lineHeight: 1.05, letterSpacing: '-0.03em',
          }}>
            Stop leaving money<br />
            <span style={{ color: C.gold }}>on the table.</span>
          </motion.h2>

          <motion.p variants={fadeIn} style={{
            color: C.muted, fontSize: 18, lineHeight: 1.75,
            margin: '0 auto 48px', maxWidth: 500,
          }}>
            We only take on a small number of new clients each month to ensure every
            brand gets the attention it deserves. Apply now to claim your spot.
          </motion.p>

          <motion.div variants={fadeIn} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a href="mailto:hello@abuecom.com"
              whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
              style={{
                background: C.gold, color: C.forest, padding: '16px 40px', borderRadius: 8,
                fontSize: 16, fontWeight: 800, textDecoration: 'none',
                boxShadow: `0 8px 40px rgba(200,168,75,0.25)`,
                display: 'inline-block',
              }}>
              Apply to Work Together →
            </motion.a>
            <motion.a href="mailto:hello@abuecom.com"
              whileHover={{ scale: 1.02 }}
              style={{
                border: `1px solid rgba(200,168,75,0.3)`, color: C.text,
                padding: '16px 32px', borderRadius: 8,
                fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block',
              }}>
              Book a Free Audit Call
            </motion.a>
          </motion.div>

          <motion.p variants={fadeIn} style={{ color: '#3D4E3E', fontSize: 13, marginTop: 24 }}>
            No contracts. No retainers until you're ready. Just results.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: C.charcoal, borderTop: `1px solid rgba(255,255,255,0.05)`,
      padding: '48px',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6, background: C.gold, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L10 6H14.5L11 9L12.5 14L8 11L3.5 14L5 9L1.5 6H6L8 1.5Z" fill={C.forest} />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>
              Abu Ecom
            </div>
            <div style={{ color: '#2D3E2E', fontSize: 11, marginTop: 1 }}>Email Retention for Muslim Brands</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 32 }}>
          {['Services', 'Results', 'Process', 'Apply'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: '#2D3E2E', fontSize: 13, textDecoration: 'none', fontWeight: 500,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = C.gold}
              onMouseLeave={e => e.target.style.color = '#2D3E2E'}
            >{l}</a>
          ))}
        </div>

        <div style={{ color: '#1E2E1F', fontSize: 12 }}>© 2025 Abu Ecom. All rights reserved.</div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AbuEcom() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}>
      <Head>
        <title>Abu Ecom — Email Retention for Muslim Shopify Brands</title>
        <meta name="description" content="Abu Ecom builds email retention systems exclusively for Muslim-owned Shopify brands. Turn one-time buyers into loyal customers." />
      </Head>

      <Nav scrolled={scrolled} />
      <Hero />
      <Problem />
      <System />
      <WhyMuslim />
      <Results />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}
