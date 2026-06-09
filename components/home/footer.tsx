"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LOGOS } from "@/public/logo/logo";

const LINKS = {
  Explore:  ["Top Restaurants", "New Openings", "Trending Now", "Cuisines", "Dine-in Deals"],
  Company:  ["About Us", "Careers", "Press", "Blog", "Investors"],
  Support:  ["Help Centre", "Contact Us", "Track Order", "Partner with Us"],
  Legal:    ["Privacy Policy", "Terms of Use", "Cookie Policy", "Refund Policy"],
};

const SOCIALS = [
  { label: "Instagram", emoji: "📸", href: "#" },
  { label: "Twitter",   emoji: "🐦", href: "#" },
  { label: "YouTube",   emoji: "▶️",  href: "#" },
  { label: "LinkedIn",  emoji: "💼", href: "#" },
];

export function Footer() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── entrance ── */
        @keyframes fade-up {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu      { opacity:0; }
        .fu.show { animation: fade-up 0.7s cubic-bezier(.22,1,.36,1) both; }

        /* ── sun pulse ── */
        @keyframes sun-glow {
          0%,100% { filter: drop-shadow(0 0 28px #ffb347cc) drop-shadow(0 0 60px #ff6b0066); }
          50%     { filter: drop-shadow(0 0 48px #ffcc44ee) drop-shadow(0 0 100px #ff6b0088); }
        }
        .sun-glow { animation: sun-glow 3s ease-in-out infinite; }

        /* ── birds ── */
        @keyframes bird-fly {
          0%   { transform: translate(0,0)      scaleX(1); }
          49%  { transform: translate(60px,-18px) scaleX(1); }
          50%  { transform: translate(60px,-18px) scaleX(-1); }
          100% { transform: translate(0,0)      scaleX(-1); }
        }
        @keyframes bird-fly2 {
          0%   { transform: translate(0,0)       scaleX(1); }
          49%  { transform: translate(-50px,-14px) scaleX(1); }
          50%  { transform: translate(-50px,-14px) scaleX(-1); }
          100% { transform: translate(0,0)       scaleX(-1); }
        }
        .bird1 { animation: bird-fly  6s ease-in-out infinite; }
        .bird2 { animation: bird-fly2 8s ease-in-out 1s infinite; }
        .bird3 { animation: bird-fly  7s ease-in-out 2s infinite; }

        /* ── floating leaves ── */
        @keyframes leaf1 {
          0%   { transform: translate(0,0)      rotate(0deg)   opacity:1; }
          100% { transform: translate(-40px,60px) rotate(-120deg); opacity:0; }
        }
        @keyframes leaf2 {
          0%   { transform: translate(0,0)     rotate(30deg);  opacity:1; }
          100% { transform: translate(30px,70px) rotate(140deg); opacity:0; }
        }
        .leaf1 { animation: leaf1 5s ease-in  1s  infinite; }
        .leaf2 { animation: leaf2 6s ease-in  2.5s infinite; }
        .leaf3 { animation: leaf1 4.5s ease-in 0.5s infinite; }

        /* ── steam ── */
        @keyframes steam {
          0%   { transform: translateY(0) scaleX(1) opacity:0.6; }
          100% { transform: translateY(-22px) scaleX(1.4); opacity:0; }
        }
        .steam1 { animation: steam 2.2s ease-out infinite; }
        .steam2 { animation: steam 2.2s ease-out 0.7s infinite; }
        .steam3 { animation: steam 2.2s ease-out 1.4s infinite; }

        /* ── link underline ── */
        .lnk {
          position:relative; display:inline-block;
          opacity:0.55; font-size:0.8rem;
          transition: opacity 0.2s;
          color: #fff;
          text-decoration: none;
        }
        .lnk::after {
          content:''; position:absolute;
          left:0; bottom:-2px;
          width:0; height:1.5px;
          background: #ff6b35;
          transition: width 0.25s ease;
        }
        .lnk:hover { opacity:1; }
        .lnk:hover::after { width:100%; }

        .social-pill {
          display:flex; align-items:center; gap:6px;
          padding: 6px 14px; border-radius:999px;
          border: 1px solid rgba(255,255,255,0.2);
          font-size:0.72rem; font-weight:600;
          color:#fff; opacity:0.7;
          transition: all 0.2s;
          text-decoration:none;
        }
        .social-pill:hover {
          opacity:1; transform:translateY(-2px);
          border-color: #ff6b35;
          background: rgba(255,107,53,0.15);
        }

        /* ── shimmer brand ── */
        @keyframes brand-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        .brand-shine {
          background: linear-gradient(90deg, #fff 0%, #ff6b35 40%, #ffcc44 60%, #fff 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: brand-shimmer 4s linear infinite;
        }

        /* ── moto word reveal ── */
        @keyframes word-in {
          from { opacity:0; transform: translateY(100%) skewY(4deg); }
          to   { opacity:1; transform: translateY(0)    skewY(0deg); }
        }
        .word-reveal span {
          display:inline-block;
          opacity:0;
          transform: translateY(100%) skewY(4deg);
        }
        .word-reveal.show span {
          animation: word-in 0.55s cubic-bezier(.22,1,.36,1) forwards;
        }

        /* email input */
        .email-input {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          border-radius: 12px;
          padding: 10px 16px;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .email-input::placeholder { color: rgba(255,255,255,0.35); }
        .email-input:focus { border-color: #ff6b35; }
      `}</style>

      <footer ref={ref} className="relative overflow-hidden rounded-t-[9rem]" style={{ background: "#1a0505", borderTop: "none" }}>

        {/* ══════════════════════════════════════════
            ILLUSTRATED SCENE  (SVG)
        ══════════════════════════════════════════ */}
        <div className="relative w-full" style={{ height: "clamp(280px, 45vw, 480px)" }}>
          <svg
            viewBox="0 0 1200 480"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMax slice"
          >
            {/* ── SKY gradient ── */}
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#1a0505" />
                <stop offset="40%"  stopColor="#3d0a0a" />
                <stop offset="100%" stopColor="#7a1c0a" />
              </linearGradient>
              <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ffe566" />
                <stop offset="55%"  stopColor="#ffaa22" />
                <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#c0392b" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7a1c0a" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="ground1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#5c1010" />
                <stop offset="100%" stopColor="#2d0606" />
              </linearGradient>
              <linearGradient id="ground2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#3d0a0a" />
                <stop offset="100%" stopColor="#1a0505" />
              </linearGradient>
              <filter id="blur4">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {/* sky */}
            <rect width="1200" height="480" fill="url(#sky)" />

            {/* ── SUN ── */}
            <circle cx="600" cy="200" r="80" fill="url(#sunGrad)" className="sun-glow" />
            {/* sun halo */}
            <circle cx="600" cy="200" r="110" fill="none" stroke="#ffaa22" strokeWidth="1" strokeOpacity="0.2" />
            <circle cx="600" cy="200" r="140" fill="none" stroke="#ff8800" strokeWidth="0.5" strokeOpacity="0.12" />

            {/* ── BIRDS ── */}
            <g className="bird1" style={{ transformOrigin:"520px 160px" }}>
              <path d="M510,160 Q515,155 520,160 Q525,155 530,160" stroke="#ffddaa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
            <g className="bird2" style={{ transformOrigin:"640px 148px" }}>
              <path d="M630,148 Q635,143 640,148 Q645,143 650,148" stroke="#ffddaa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
            <g className="bird3" style={{ transformOrigin:"700px 165px" }}>
              <path d="M693,165 Q697,161 700,165 Q703,161 707,165" stroke="#ffddaa" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>

            {/* ── FAR BUILDINGS (silhouette, reddish) ── */}
            {/* far left cluster */}
            <g fill="#4a0e0e" opacity="0.7">
              <rect x="30"  y="290" width="28" height="90" rx="2"/>
              <rect x="25"  y="260" width="18" height="30" rx="1"/>
              <rect x="62"  y="275" width="22" height="105" rx="2"/>
              <rect x="88"  y="285" width="30" height="95" rx="2"/>
              <rect x="90"  y="255" width="14" height="30" rx="1"/>
              {/* windows */}
              <rect x="34"  y="300" width="6"  height="5" fill="#ff8833" opacity="0.6"/>
              <rect x="44"  y="300" width="6"  height="5" fill="#ff8833" opacity="0.3"/>
              <rect x="34"  y="312" width="6"  height="5" fill="#ff8833" opacity="0.4"/>
              <rect x="67"  y="285" width="5"  height="5" fill="#ffcc44" opacity="0.5"/>
              <rect x="75"  y="285" width="5"  height="5" fill="#ff8833" opacity="0.3"/>
            </g>

            {/* far right cluster */}
            <g fill="#4a0e0e" opacity="0.7">
              <rect x="1080" y="285" width="30" height="95" rx="2"/>
              <rect x="1082" y="258" width="16" height="28" rx="1"/>
              <rect x="1114" y="295" width="24" height="85" rx="2"/>
              <rect x="1142" y="278" width="32" height="102" rx="2"/>
              <rect x="1145" y="250" width="18" height="30" rx="1"/>
              <rect x="1086" y="268" width="6"  height="5" fill="#ffcc44" opacity="0.5"/>
              <rect x="1096" y="268" width="6"  height="5" fill="#ff8833" opacity="0.4"/>
              <rect x="1086" y="280" width="6"  height="5" fill="#ff8833" opacity="0.3"/>
              <rect x="1148" y="260" width="6"  height="5" fill="#ffcc44" opacity="0.6"/>
              <rect x="1158" y="260" width="6"  height="5" fill="#ff8833" opacity="0.3"/>
            </g>

            {/* ── MID BUILDINGS (main skyline) ── */}
            {/* left skyline */}
            <g fill="#6b1212">
              {/* building 1 — tall office */}
              <rect x="100" y="220" width="55" height="180" rx="3"/>
              <rect x="108" y="210" width="38" height="12" rx="1"/>
              {/* windows grid */}
              {[0,1,2,3,4,5].map(r => [0,1,2].map(c => (
                <rect key={`b1-${r}-${c}`} x={110+c*14} y={225+r*22} width="8" height="10"
                  fill={((r * 7 + c * 13) % 100) > 40 ? "#ff8833" : "#ffcc44"} opacity={0.3 + (((r * 11 + c * 17) % 100) / 100) * 0.4}/>
              )))}
              {/* building 2 */}
              <rect x="160" y="245" width="45" height="155" rx="2"/>
              {[0,1,2,3].map(r => [0,1].map(c => (
                <rect key={`b2-${r}-${c}`} x={166+c*16} y={255+r*25} width="10" height="12"
                  fill="#ff8833" opacity={0.25+r*0.1}/>
              )))}
              {/* building 3 — wide */}
              <rect x="210" y="260" width="70" height="140" rx="2"/>
              <rect x="215" y="248" width="28" height="14" rx="1"/>
              <rect x="252" y="248" width="22" height="14" rx="1"/>
              {[0,1,2,3].map(r => [0,1,2,3].map(c => (
                <rect key={`b3-${r}-${c}`} x={216+c*16} y={268+r*22} width="10" height="12"
                  fill={r%2===0?"#ffcc44":"#ff8833"} opacity={0.3+c*0.05}/>
              )))}
            </g>

            {/* right skyline */}
            <g fill="#6b1212">
              <rect x="945"  y="230" width="60" height="170" rx="3"/>
              <rect x="952"  y="218" width="45" height="14" rx="1"/>
              {[0,1,2,3,4].map(r => [0,1,2].map(c => (
                <rect key={`rb1-${r}-${c}`} x={952+c*16} y={238+r*22} width="10" height="12"
                  fill="#ff8833" opacity={0.3+r*0.05}/>
              )))}
              <rect x="1010" y="250" width="50" height="150" rx="2"/>
              {[0,1,2,3].map(r => [0,1].map(c => (
                <rect key={`rb2-${r}-${c}`} x={1016+c*17} y={258+r*24} width="11" height="13"
                  fill="#ffcc44" opacity={0.25+c*0.1}/>
              )))}
              <rect x="1065" y="240" width="42" height="160" rx="2"/>
              <rect x="1068" y="228" width="30" height="14" rx="1"/>
              {[0,1,2,3,4].map(r => [0,1].map(c => (
                <rect key={`rb3-${r}-${c}`} x={1070+c*14} y={248+r*22} width="9" height="11"
                  fill="#ff8833" opacity={0.3+r*0.04}/>
              )))}
            </g>

            {/* ── RESTAURANT BUILDINGS (hero, foreground-ish) ── */}
            {/* LEFT RESTAURANT — big diner */}
            <g fill="#8b1a1a">
              {/* main body */}
              <rect x="290" y="300" width="120" height="130" rx="4"/>
              {/* roof / canopy */}
              <polygon points="270,302 420,302 410,282 280,282" fill="#a52020"/>
              {/* sign board */}
              <rect x="300" y="268" width="100" height="16" rx="3" fill="#c0392b"/>
              <rect x="303" y="270" width="94" height="12" rx="2" fill="#e74c3c" opacity="0.7"/>
              {/* door */}
              <rect x="338" y="360" width="24" height="40" rx="2" fill="#5c0e0e"/>
              <circle cx="358" cy="381" r="2" fill="#ffcc44"/>
              {/* windows */}
              <rect x="298" y="312" width="28" height="24" rx="2" fill="#ffb347" opacity="0.6"/>
              <rect x="336" y="312" width="28" height="24" rx="2" fill="#ffb347" opacity="0.5"/>
              <rect x="374" y="312" width="28" height="24" rx="2" fill="#ffb347" opacity="0.65"/>
              {/* awning stripes */}
              {[0,1,2,3,4].map(i => (
                <rect key={i} x={272+i*30} y="282" width="15" height="20" fill="#c0392b" opacity="0.8"/>
              ))}
              {/* steam from kitchen */}
              <g opacity="0.5">
                <ellipse cx="350" cy="265" rx="3" ry="5" fill="none" stroke="#fff" strokeWidth="1.5" className="steam1"/>
                <ellipse cx="362" cy="265" rx="3" ry="5" fill="none" stroke="#fff" strokeWidth="1.5" className="steam2"/>
                <ellipse cx="374" cy="265" rx="3" ry="5" fill="none" stroke="#fff" strokeWidth="1.5" className="steam3"/>
              </g>
            </g>

            {/* CENTRE-LEFT — small café */}
            <g fill="#7a1818">
              <rect x="430" y="330" width="80" height="100" rx="3"/>
              <rect x="425" y="316" width="90" height="16" rx="2" fill="#992222"/>
              <rect x="433" y="302" width="74" height="16" rx="2" fill="#b02828"/>
              {/* door */}
              <rect x="454" y="368" width="18" height="32" rx="2" fill="#4a0e0e"/>
              {/* windows */}
              <rect x="434" y="338" width="22" height="18" rx="2" fill="#ffcc44" opacity="0.55"/>
              <rect x="464" y="338" width="22" height="18" rx="2" fill="#ffb347" opacity="0.5"/>
              {/* neon sign */}
              <rect x="436" y="320" width="68" height="10" rx="2" fill="#e74c3c" opacity="0.4"/>
            </g>

            {/* CENTRE-RIGHT — tall hotel */}
            <g fill="#7a1818">
              <rect x="690" y="280" width="100" height="150" rx="4"/>
              <rect x="700" y="266" width="80" height="16" rx="2" fill="#992222"/>
              <polygon points="685,282 795,282 790,264 690,264" fill="#a52020"/>
              {/* windows grid 4x3 */}
              {[0,1,2,3,4].map(r => [0,1,2].map(c => (
                <rect key={`h-${r}-${c}`} x={698+c*28} y={292+r*22} width="18" height="14"
                  fill={r<2?"#ffcc44":"#ffb347"} opacity={0.4+c*0.08}/>
              )))}
              {/* door */}
              <rect x="726" y="374" width="28" height="36" rx="2" fill="#4a0e0e"/>
              <circle cx="750" cy="393" r="2.5" fill="#ffcc44"/>
              {/* hotel sign top */}
              <rect x="712" y="256" width="56" height="10" rx="2" fill="#c0392b"/>
            </g>

            {/* RIGHT RESTAURANT */}
            <g fill="#8b1a1a">
              <rect x="800" y="305" width="110" height="125" rx="4"/>
              <polygon points="788,307 920,307 912,288 796,288" fill="#a52020"/>
              <rect x="800" y="274" width="110" height="16" rx="3" fill="#c0392b"/>
              {/* windows */}
              <rect x="808" y="318" width="26" height="22" rx="2" fill="#ffb347" opacity="0.6"/>
              <rect x="844" y="318" width="26" height="22" rx="2" fill="#ffcc44" opacity="0.5"/>
              <rect x="880" y="318" width="22" height="22" rx="2" fill="#ffb347" opacity="0.6"/>
              {/* door */}
              <rect x="843" y="360" width="24" height="40" rx="2" fill="#5c0e0e"/>
              {/* awning */}
              {[0,1,2].map(i => (
                <rect key={i} x={790+i*32} y="288" width="18" height="19" fill="#b02828" opacity="0.8"/>
              ))}
              <g opacity="0.45">
                <ellipse cx="850" cy="272" rx="3" ry="5" fill="none" stroke="#fff" strokeWidth="1.5" className="steam1"/>
                <ellipse cx="864" cy="272" rx="3" ry="5" fill="none" stroke="#fff" strokeWidth="1.5" className="steam2"/>
              </g>
            </g>

            {/* ── STREET / GROUND ── */}
            {/* mid ground */}
            <path d="M0,380 C300,360 700,375 1200,365 L1200,480 L0,480 Z" fill="#3d0808"/>
            {/* sidewalk */}
            <path d="M0,400 C200,390 600,402 1200,395 L1200,480 L0,480 Z" fill="#2d0606"/>

            {/* ── ROAD ── winding toward horizon */}
            <path
              d="M460,480 C490,440 530,410 570,390 C600,376 620,370 600,360"
              stroke="url(#road)" strokeWidth="38" fill="none" strokeLinecap="round"
            />
            {/* road centre dashes */}
            <path
              d="M490,470 C510,445 540,420 570,400 C590,385 600,373 598,364"
              stroke="#ff6b35" strokeWidth="1.5" fill="none" strokeLinecap="round"
              strokeDasharray="10 10" opacity="0.5"
            />

            {/* ── FOREGROUND ground strip ── */}
            <path d="M0,435 C400,420 800,438 1200,425 L1200,480 L0,480 Z" fill="#1f0404"/>

            {/* ── STREET LAMPS ── */}
            {[180, 420, 780, 1020].map((x, i) => (
              <g key={i}>
                <rect x={x-2} y="350" width="4" height="90" fill="#3a0808"/>
                <path d={`M${x-2},352 Q${x+12},340 ${x+18},345`} stroke="#3a0808" strokeWidth="3" fill="none"/>
                <circle cx={x+18} cy="345" r="6" fill="#ffee88" opacity="0.85"/>
                <circle cx={x+18} cy="345" r="12" fill="#ffee88" opacity="0.12"/>
              </g>
            ))}

            {/* ── FLOATING FOOD garnish ── */}
            {/* leaf / herb floats */}
            <text x="240" y="350" fontSize="22" className="leaf1" style={{ transformOrigin:"240px 350px" }}>🌿</text>
            <text x="540" y="320" fontSize="18" className="leaf2" style={{ transformOrigin:"540px 320px" }}>🌶️</text>
            <text x="960" y="345" fontSize="20" className="leaf3" style={{ transformOrigin:"960px 345px" }}>🍃</text>

            {/* ── SCOOTER (delivery) ── */}
            <g opacity="0.85" transform="translate(548,400)">
              {/* body */}
              <ellipse cx="0" cy="0" rx="22" ry="12" fill="#c0392b"/>
              <rect x="-18" y="-18" width="36" height="18" rx="5" fill="#e74c3c"/>
              {/* box */}
              <rect x="-14" y="-32" width="28" height="18" rx="3" fill="#ff6b35"/>
              <rect x="-11" y="-30" width="22" height="5" rx="1" fill="#ffb347" opacity="0.6"/>
              {/* wheels */}
              <circle cx="-18" cy="10" r="9" fill="#2d0606" stroke="#ff6b35" strokeWidth="2"/>
              <circle cx="18"  cy="10" r="9" fill="#2d0606" stroke="#ff6b35" strokeWidth="2"/>
              <circle cx="-18" cy="10" r="3" fill="#ff8833"/>
              <circle cx="18"  cy="10" r="3" fill="#ff8833"/>
              {/* handlebar */}
              <rect x="12" y="-22" width="3" height="10" rx="1" fill="#5c1010"/>
              <rect x="10" y="-22" width="8"  height="2.5" rx="1" fill="#5c1010"/>
            </g>

            {/* ── BOTTOM FADE — starts high, full bleed into footer body ── */}
            <defs>
              <linearGradient id="fadeBot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#1a0505" stopOpacity="0"/>
                <stop offset="55%"  stopColor="#1a0505" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#1a0505" stopOpacity="1"/>
              </linearGradient>
            </defs>
            {/* tall fade rect — starts from y=260 so buildings melt into bg */}
            <rect x="0" y="260" width="1200" height="220" fill="url(#fadeBot)"/>
          </svg>

          {/* ── tagline over scene ── */}
          <div className="absolute bottom-10 left-8 md:left-16 z-10">
            <div
              className={`word-reveal ${visible ? "show" : ""}`}
              style={{ lineHeight: 1.1 }}
            >
              {["You can", "taste the", "difference"].map((line, li) => (
                <div key={li} className="overflow-hidden block">
                  <span
                    className="block font-black text-white"
                    style={{
                      fontSize: "clamp(1.6rem, 4vw, 3rem)",
                      textShadow: "0 2px 16px rgba(0,0,0,0.6)",
                      animationDelay: `${0.2 + li * 0.12}s`,
                    }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            FOOTER CONTENT — pulled up so scene bleeds in
        ══════════════════════════════════════════ */}
        <div className="relative z-10" style={{ background: "#1a0505", marginTop: "-2px" }}>

          {/* newsletter strip — NO top border, blends straight out of scene */}
          <div
            className={`fu ${visible ? "show" : ""} border-b mx-6 md:mx-16 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
            style={{ borderColor: "rgba(255,107,53,0.15)", animationDelay:"0.1s" }}
          >
            <div>
              <p className="font-black text-base text-white">🍽️ Get weekly picks in your inbox</p>
              <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.45)" }}>
                Curated restaurants, exclusive deals — every Friday.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input type="email" placeholder="your@email.com" className="email-input md:w-56" />
              <button
                className="px-5 py-2.5 bg-red-500 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
               
              >
                Subscribe →
              </button>
            </div>
          </div>

          {/* brand + nav */}
          <div className={`fu ${visible ? "show" : ""} px-6 md:px-16 pt-12 pb-6`} style={{ animationDelay:"0.2s" }}>
            <div className="flex flex-col md:flex-row gap-12 justify-between">

              {/* brand col */}
              <div className="md:w-64 shrink-0">
               <Image
                 alt=""
                 src={LOGOS.LOGO}
                 className="w-44 h-44 object-contain"
               />
                 <p className="text-sm leading-relaxed " style={{ color:"rgba(255,255,255,0.45)" }}>
                  discover, book & savour restaurants across Canada.
                </p>
              </div>

              {/* nav cols */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                {Object.entries(LINKS).map(([heading, links]) => (
                  <div key={heading}>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                      style={{ color:"rgba(255,107,53,0.7)" }}>
                      {heading}
                    </p>
                    <ul className="space-y-2.5">
                      {links.map(l => (
                        <li key={l}><Link href="#" className="lnk">{l}</Link></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div
            className={`fu ${visible ? "show" : ""} px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-3 border-t`}
            style={{ borderColor:"rgba(255,255,255,0.07)", animationDelay:"0.3s" }}
          >
            <p className="text-xs" style={{ color:"rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} Dineout · Made with ❤️ &amp; 🌶️ in India
            </p>
            <div className="flex items-center gap-1 text-lg select-none" aria-hidden>
              {["🥗","🍛","🍕","🥩","🍜","🥐","🍣","🧁"].map((e,i) => (
                <span key={i}
                  className="inline-block transition-transform duration-200 cursor-default"
                  style={{ fontSize: 18 }}
                  onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.transform = "scale(1.5) translateY(-4px)"; }}
                  onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.transform = "scale(1) translateY(0)"; }}
                >{e}</span>
              ))}
            </div>
            <div className="flex gap-4">
              {["Privacy","Terms","Cookies"].map(l => (
                <Link key={l} href="#" className="text-[10px] transition-opacity hover:opacity-70"
                  style={{ color:"rgba(255,255,255,0.3)" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}