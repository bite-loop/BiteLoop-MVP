import { useAuthStore } from "@/lib/stores/authStore"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { LOGOS } from "@/public/logo/logo"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading, fetchProfile } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)
  const [minTimeDone, setMinTimeDone] = useState(false)
  const minTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const publicRoutes = ['/', '/login', '/signup', '/reset-password']

  useEffect(() => {
    setMinTimeDone(false)
    minTimerRef.current = setTimeout(() => setMinTimeDone(true), 2000)

    const checkAuth = async () => {
      await fetchProfile()
      setIsChecking(false)
    }
    checkAuth()

    return () => {
      if (minTimerRef.current) clearTimeout(minTimerRef.current)
    }
  }, [pathname, fetchProfile])

  useEffect(() => {
    if (isChecking || isLoading || !minTimeDone) return

    const isPublicRoute = publicRoutes.includes(pathname)

    if (!user && !isPublicRoute) {
      router.push('/login')
      return
    }

    if (user && isPublicRoute && pathname !== '/') {
      router.push('/feed')
      return
    }
  }, [user, isChecking, isLoading, minTimeDone, pathname, router])

  /* ─────────────────────────────────────────────
     LOADING SCREEN
  ───────────────────────────────────────────── */
  if (isChecking || isLoading || !minTimeDone) {
    return (
      <>
        <style>{`
          /* ── tokens ── */
          .bl-wrap {
            --acc:   #e8260b;
            --acc2:  #ff6b35;
            --acc3:  #ffb347;
            --bg:    #0d0300;
            --surf:  #1c0a06;
            --surf2: #2a1008;
            --text:  #fff5f0;
            --muted: #a06050;
          }

          /* ── base ── */
          .bl-wrap {
            min-height: 100dvh;
            background: var(--bg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            font-family: sans-serif;
          }

          /* ── radial sky glow ── */
          .bl-sky {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(ellipse 70% 45% at 50% 60%,  #3d0c0488 0%, transparent 70%),
              radial-gradient(ellipse 40% 30% at 50% 55%,  #ff4d0022 0%, transparent 60%);
            pointer-events: none;
          }

          /* ── orbit ring ── */
          @keyframes orbit-spin {
            from { transform: translate(-50%,-50%) rotate(0deg); }
            to   { transform: translate(-50%,-50%) rotate(360deg); }
          }
          .bl-orbit {
            position: absolute;
            top: 50%; left: 50%;
            border-radius: 50%;
            border: 1px solid rgba(232,38,11,0.12);
            pointer-events: none;
          }
          .bl-orbit-1 { width: 320px; height: 320px; animation: orbit-spin 18s linear infinite; }
          .bl-orbit-2 { width: 480px; height: 480px; border-style: dashed; animation: orbit-spin 28s linear infinite reverse; border-color: rgba(255,107,53,0.08); }
          .bl-orbit-3 { width: 640px; height: 640px; animation: orbit-spin 40s linear infinite; border-color: rgba(255,179,71,0.05); }

          /* ── food items on orbit ── */
          @keyframes counter-spin-1 { from { transform: rotate(0deg);    } to { transform: rotate(-360deg);   } }
          @keyframes counter-spin-2 { from { transform: rotate(0deg);    } to { transform: rotate(360deg);    } }
          .bl-orbit-food {
            position: absolute;
            top: 50%; left: 50%;
            pointer-events: none;
          }
          /* Each food sits at a point on orbit-1, spins counter so it stays upright */
          .bl-food-item {
            position: absolute;
            font-size: 20px;
            animation: counter-spin-1 18s linear infinite;
            transform-origin: center center;
          }

          /* ── logo bob ── */
          @keyframes logo-bob {
            0%,100% { transform: translateY(0px) scale(1);    }
            50%      { transform: translateY(-8px) scale(1.03); }
          }
          @keyframes logo-in {
            from { opacity:0; transform: scale(0.6); }
            to   { opacity:1; transform: scale(1); }
          }
          .bl-logo-shell {
            position: relative; z-index: 10;
            width: 100px; height: 100px;
            border-radius: 28px;
            background: var(--surf2);
            border: 1.5px solid rgba(232,38,11,0.3);
            display: flex; align-items: center; justify-content: center;
            animation: logo-bob 2.8s ease-in-out infinite, logo-in 0.5s cubic-bezier(.34,1.56,.64,1) both;
            box-shadow: 0 0 0 8px rgba(232,38,11,0.06), 0 0 40px rgba(232,38,11,0.18);
            margin-bottom: 20px;
          }

          /* ── steam ── */
          @keyframes steam {
            0%   { opacity:0; transform: translateY(0)    scaleX(1); }
            30%  { opacity:0.7; }
            100% { opacity:0; transform: translateY(-20px) scaleX(1.8); }
          }
          .bl-steam {
            position: absolute; top: -14px; left: 50%;
            transform: translateX(-50%);
            display: flex; gap: 6px;
          }
          .bl-steam span {
            display: block; width: 3px; height: 10px;
            border-radius: 99px; background: var(--acc2); opacity:0;
            animation: steam 1.9s ease-in-out infinite;
          }
          .bl-steam span:nth-child(2) { animation-delay: 0.38s; }
          .bl-steam span:nth-child(3) { animation-delay: 0.76s; }

          /* ── pulse ring on logo ── */
          @keyframes logo-pulse {
            0%   { box-shadow: 0 0 0 0   rgba(232,38,11,0.45); }
            70%  { box-shadow: 0 0 0 18px rgba(232,38,11,0);   }
            100% { box-shadow: 0 0 0 0   rgba(232,38,11,0);    }
          }
          .bl-logo-pulse { animation: logo-bob 2.8s ease-in-out infinite, logo-in 0.5s cubic-bezier(.34,1.56,.64,1) both, logo-pulse 2.4s ease-out 0.5s infinite; }

          /* ── brand name ── */
          @keyframes fade-up {
            from { opacity:0; transform:translateY(12px); }
            to   { opacity:1; transform:translateY(0); }
          }
          .bl-brand {
            font-size: 2rem; font-weight: 900;
            letter-spacing: -0.03em;
            color: var(--text);
            animation: fade-up 0.5s ease 0.2s both;
            z-index: 10; position: relative;
          }
          .bl-brand em {
            font-style: normal;
            background: linear-gradient(90deg, var(--acc), var(--acc2), var(--acc3));
            -webkit-background-clip: text; background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .bl-tagline {
            font-size: 0.7rem; font-weight: 400;
            letter-spacing: 0.22em; text-transform: uppercase;
            color: var(--muted);
            animation: fade-up 0.5s ease 0.32s both;
            z-index: 10; position: relative;
            margin-top: 3px; margin-bottom: 28px;
          }

          /* ── progress bar ── */
          @keyframes bar-fill {
            0%   { width: 0%; }
            60%  { width: 70%; }
            100% { width: 92%; }
          }
          @keyframes bar-shimmer {
            from { transform: translateX(-100%); }
            to   { transform: translateX(400%); }
          }
          .bl-bar-track {
            width: 180px; height: 3px;
            background: var(--surf2);
            border-radius: 99px; overflow: hidden;
            z-index: 10; position: relative;
            animation: fade-up 0.5s ease 0.4s both;
          }
          .bl-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--acc), var(--acc2), var(--acc3));
            border-radius: 99px;
            animation: bar-fill 2s cubic-bezier(0.4,0,0.2,1) forwards;
            position: relative; overflow: hidden;
          }
          .bl-bar-fill::after {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: bar-shimmer 1.4s ease infinite;
          }

          /* ── status dots ── */
          @keyframes dot-blink {
            0%,80%,100% { opacity:0.2; transform:scale(0.75); }
            40%          { opacity:1;   transform:scale(1); }
          }
          .bl-status {
            display: flex; align-items: center; gap: 7px;
            font-size: 0.68rem; color: var(--muted);
            letter-spacing: 0.04em;
            margin-top: 10px;
            z-index: 10; position: relative;
            animation: fade-up 0.5s ease 0.5s both;
          }
          .bl-dots { display: flex; gap: 3px; }
          .bl-dots span {
            width: 3px; height: 3px; border-radius: 50%;
            background: var(--acc2);
            animation: dot-blink 1.3s ease-in-out infinite;
          }
          .bl-dots span:nth-child(2) { animation-delay: 0.22s; }
          .bl-dots span:nth-child(3) { animation-delay: 0.44s; }

          /* ── scatter food (corners) ── */
          @keyframes scatter-float {
            0%,100% { transform: rotate(var(--sr)) translateY(0); }
            50%      { transform: rotate(var(--sr)) translateY(-10px); }
          }
          .bl-scatter {
            position: absolute; pointer-events: none; font-size: 28px;
            opacity: 0.18;
            animation: scatter-float var(--sd) ease-in-out var(--sdl) infinite;
          }

          /* ── cityscape silhouette (bottom) ── */
          .bl-city {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 120px;
            pointer-events: none;
          }
        `}</style>

        <div className="bl-wrap">
          <div className="bl-sky" />

          {/* orbit rings */}
          <div className="bl-orbit bl-orbit-1" />
          <div className="bl-orbit bl-orbit-2" />
          <div className="bl-orbit bl-orbit-3" />

          {/* food items orbiting on ring-1 (160px radius) */}
          {(["🍕","🍔","🌮","🍜","🧁","🍣"] as const).map((e, i) => {
            const angle = (i / 6) * 360
            const rad   = (angle * Math.PI) / 180
            const r     = 160
            const x     = r * Math.cos(rad)
            const y     = r * Math.sin(rad)
            return (
              <div
                key={i}
                className="bl-food-item"
                style={{
                  position: "absolute",
                  top:  "50%",
                  left: "50%",
                  marginLeft: x - 12,
                  marginTop:  y - 12,
                  fontSize: 22,
                  animation: `counter-spin-1 18s linear infinite`,
                  transformOrigin: `${-x + 12}px ${-y + 12}px`,
                } as React.CSSProperties}
              >
                {e}
              </div>
            )
          })}

          {/* corner scatter */}
          {[
            { e:"🍛", t:"8%",  l:"5%",  r: -12, d:"5.4s", dl:"0s"   },
            { e:"🥗", t:"10%", l:"88%", r:  10, d:"4.8s", dl:"0.6s" },
            { e:"🥐", t:"78%", l:"4%",  r:  14, d:"6.1s", dl:"1.1s" },
            { e:"🍦", t:"80%", l:"91%", r: -8,  d:"5.7s", dl:"0.4s" },
          ].map((s, i) => (
            <div
              key={i}
              className="bl-scatter"
              style={{ top:s.t, left:s.l, "--sr":`${s.r}deg`, "--sd":s.d, "--sdl":s.dl } as React.CSSProperties}
            >
              {s.e}
            </div>
          ))}

          {/* logo */}
          <div className="bl-logo-shell bl-logo-pulse">
            <div className="bl-steam">
              <span /><span /><span />
            </div>
            <Image
              src={LOGOS.LOGO}
              alt="BiteLoop"
              width={62}
              height={62}
              style={{ objectFit:"contain", borderRadius:8 }}
              priority
            />
          </div>

          {/* brand */}
          <div className="bl-brand">Bite<em>Loop</em></div>
          <div className="bl-tagline">Hot food · Fast delivery</div>

          {/* progress */}
          <div className="bl-bar-track">
            <div className="bl-bar-fill" />
          </div>

          <div className="bl-status">
            Getting things ready
            <div className="bl-dots"><span /><span /><span /></div>
          </div>

          {/* city silhouette */}
          <svg className="bl-city" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cityFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1c0a06" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#0d0300" stopOpacity="1"/>
              </linearGradient>
            </defs>
            {/* buildings */}
            <g fill="url(#cityFade)">
              <rect x="0"   y="60"  width="60"  height="60"/>
              <rect x="10"  y="40"  width="30"  height="20"/>
              <rect x="65"  y="70"  width="45"  height="50"/>
              <rect x="70"  y="50"  width="20"  height="22"/>
              <rect x="115" y="45"  width="55"  height="75"/>
              <rect x="125" y="30"  width="25"  height="17"/>
              <rect x="175" y="65"  width="40"  height="55"/>
              <rect x="220" y="55"  width="50"  height="65"/>
              <rect x="230" y="38"  width="22"  height="19"/>
              <rect x="275" y="72"  width="35"  height="48"/>
              <rect x="315" y="48"  width="55"  height="72"/>
              <rect x="324" y="32"  width="28"  height="18"/>
              <rect x="375" y="68"  width="40"  height="52"/>
              {/* gap for centre sun */}
              <rect x="800"  y="68" width="40"  height="52"/>
              <rect x="845"  y="48" width="55"  height="72"/>
              <rect x="854"  y="32" width="28"  height="18"/>
              <rect x="905"  y="55" width="50"  height="65"/>
              <rect x="914"  y="38" width="22"  height="19"/>
              <rect x="960"  y="65" width="40"  height="55"/>
              <rect x="1005" y="45" width="55"  height="75"/>
              <rect x="1015" y="30" width="25"  height="17"/>
              <rect x="1065" y="70" width="45"  height="50"/>
              <rect x="1115" y="40" width="30"  height="20"/>
              <rect x="1110" y="60" width="60"  height="60"/>
              <rect x="1140" y="60" width="60"  height="60"/>
            </g>
            {/* window dots */}
            <g fill="#ff6b35" opacity="0.25">
              {[30,85,135,155,185,240,260,330,350,390,820,865,885,930,950,1020,1040,1080,1130].map((x,i)=>(
                <rect key={i} x={x} y={50+(i%3)*14} width="5" height="5" rx="1"/>
              ))}
            </g>
          </svg>
        </div>
      </>
    )
  }

  if (!user && !publicRoutes.includes(pathname)) {
    return null
  }

  return <>{children}</>
}