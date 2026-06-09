"use client";

import React, { useState, useEffect, useRef, ReactNode, use } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Call, Chat, Mail01Icon, Message, Question, Twitter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail, Target } from "lucide-react";
import { useAuthStore } from "@/lib/stores/authStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LabelList } from "recharts";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/navbar/navbar";

interface HelplineStaticInfo {
   icon:  any
   title: string;
   sub: string;
   value: string;
   hint: string;
   action: string;
   cta: string;
   color: string
}
/* ─── data ──────────────────────────────────────────────────── */
const CHANNELS: HelplineStaticInfo[] = [
  {
    icon:  Call,
    title: "Call Us",
    sub: "Talk to a real human",
    value: "1800-123-4567",
    hint: "Mon–Sun · 8 AM – 11 PM",
    action: "tel:18001234567",
    cta: "Call Now",
    color: "#e74c3c",
  },
  {
    icon: Chat,
    title: "Live Chat",
    sub: "Avg. wait under 2 min",
    value: "Start a conversation",
    hint: "Available 24 × 7",
    action: "#chat",
    cta: "Open Chat",
    color: "#ff6b35",
  },
  {
    icon: Mail01Icon,
    title: "Email Support",
    sub: "We reply within 2 hours",
    value: "help@dineout.in",
    hint: "For non-urgent queries",
    action: "mailto:help@dineout.in",
    cta: "Send Email",
    color: "#e74c3c",
  },
  {
    icon: Twitter,
    title: "Twitter / X",
    sub: "DM us anytime",
    value: "@DineoutHelp",
    hint: "Usually replies in 30 min",
    action: "https://twitter.com/DineoutHelp",
    cta: "Open Twitter",
    color: "#ff6b35",
  },
];

const FAQS = [
  {
    q: "How do I cancel or modify my reservation?",
    a: "Go to My Bookings → select the reservation → tap 'Modify' or 'Cancel'. Cancellations made 2+ hours before are fully refunded.",
  },
  {
    q: "My order hasn't arrived — what do I do?",
    a: "Use the live tracker in-app. If it shows 'delivered' but you haven't received it, tap 'Report an issue' and we'll resolve it within 30 minutes.",
  },
  {
    q: "How do I get a refund for a cancelled order?",
    a: "Refunds are processed automatically within 5–7 business days to your original payment method. UPI refunds are instant.",
  },
  {
    q: "The restaurant I booked is closed — what now?",
    a: "We're sorry! Tap 'Report closed restaurant' in your booking. You'll get a full refund plus a ₹200 coupon for the inconvenience.",
  },
  {
    q: "Can I add special dietary requirements to my booking?",
    a: "Yes — when booking, tap 'Special Requests' and add notes. You can also call the restaurant directly via the booking confirmation page.",
  },
  {
    q: "How does Dineout's cashback work?",
    a: "Cashback is credited to your Dineout wallet within 24 hours of a confirmed dine-in. It can be used on your next 3 transactions.",
  },
];

const FLOATS = [
  { e: "🍕", x: "4%",  y: "10%", s: 40, r: -14, d: "5.2s", dl: "0s"   },
  { e: "🍔", x: "90%", y: "7%",  s: 36, r: 10,  d: "4.6s", dl: "0.5s" },
  { e: "🍜", x: "2%",  y: "52%", s: 34, r: -8,  d: "6.1s", dl: "1.1s" },
  { e: "🧁", x: "93%", y: "48%", s: 32, r: 12,  d: "5.5s", dl: "0.3s" },
  { e: "🍣", x: "6%",  y: "82%", s: 36, r: -18, d: "4.9s", dl: "0.8s" },
  { e: "🌮", x: "88%", y: "80%", s: 34, r: 15,  d: "5.8s", dl: "1.4s" },
];

/* ─── FAQ accordion item ─────────────────────────────────────── */
function FaqItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/40"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-primary/5 transition-colors duration-200"
      >
        <span className="font-semibold text-sm leading-snug">{faq.q}</span>
        <span
          className="text-primary text-xl shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? "200px" : "0px", transition: "max-height 0.35s ease" }}
      >
        <p className="px-5 pb-4 text-sm leading-relaxed opacity-65">{faq.a}</p>
      </div>
    </div>
  );
}

/* ─── main ───────────────────────────────────────────────────── */
export default function Helpline() {
  const {fetchProfile, user} = useAuthStore()
  useEffect(() => {
    fetchProfile()
  },[ fetchProfile])
  const [visible, setVisible] = useState(false);
  const [loading,setIsLoading] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", issue: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);
  
 useEffect(() => {
 
  if (user) {
    setFormState((prev) => ({
      ...prev,
      name: String(user.displayName ?? ""),
      email: String(user.email ?? ""),
    }));
  }
}, [user]);
  const handleSubmit = async () => {
     if (!formState.name || !formState.email || !formState.msg) return;
     setIsLoading(true);
    try {
      const response = await fetch('/api/user/helplineContact', {
         method: "POST",
         headers: {
          'Content-Type': 'application/json'
         },
          body: JSON.stringify({
             name: formState.name,
             email: formState.email,
             issue: formState.issue,
             msg: formState.msg,
             userId: user?.id || null
          })
      })

      const data = await response.json()
      if( response.ok) {
         setSubmitted(true)
      } else {
         throw new Error(data.error || 'Failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
       setIsLoading(false)
    }
  };

  return (
    <>
      <style>{`
        @keyframes float-bob {
          0%,100% { transform: rotate(var(--fr)) translateY(0)    scale(1);    }
          50%     { transform: rotate(var(--fr)) translateY(-14px) scale(1.06); }
        }
        @keyframes pop-in {
          0%   { opacity:0; transform: rotate(var(--fr)) scale(0.3); }
          70%  { transform: rotate(var(--fr)) scale(1.12); }
          100% { opacity:1; transform: rotate(var(--fr)) scale(1); }
        }
        @keyframes fade-up {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes badge-pop {
          0%   { opacity:0; transform:scale(0.7) rotate(-3deg); }
          70%  { transform:scale(1.06) rotate(1deg); }
          100% { opacity:1; transform:scale(1) rotate(0deg); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow:0 0 0 0    hsl(var(--primary)/0.4); }
          70%  { box-shadow:0 0 0 12px hsl(var(--primary)/0); }
          100% { box-shadow:0 0 0 0    hsl(var(--primary)/0); }
        }
        @keyframes shimmer-text {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes card-in {
          from { opacity:0; transform:translateY(32px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes tick-in {
          0%   { opacity:0; transform:scale(0); }
          60%  { transform:scale(1.3); }
          100% { opacity:1; transform:scale(1); }
        }

        .fu       { opacity:0; }
        .fu.show  { animation: fade-up   0.7s cubic-bezier(.22,1,.36,1) both; }
        .ci.show  { animation: card-in   0.65s cubic-bezier(.22,1,.36,1) both; }
        .bp.show  { animation: badge-pop 0.55s cubic-bezier(.34,1.56,.64,1) both; }
        .pulse-ring { animation: pulse-ring 2.4s ease-out infinite; }

        .shimmer-word {
          background: linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--destructive)) 40%, hsl(var(--primary)) 80%);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation: shimmer-text 3s linear infinite;
        }

        .channel-card {
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .channel-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 40px hsl(var(--primary)/0.12);
          border-color: hsl(var(--primary)/0.5);
        }

        .form-input {
          width:100%; padding:10px 14px; border-radius:12px;
          border:1px solid hsl(var(--border));
          background:hsl(var(--background));
          color:inherit; font-size:0.875rem; outline:none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: hsl(var(--primary)/0.6);
          box-shadow: 0 0 0 3px hsl(var(--primary)/0.1);
        }
        select.form-input option { background: hsl(var(--background)); }

        .tick-anim { animation: tick-in 0.5s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      <div ref={ref} className="relative min-h-screen overflow-x-hidden">

        {/* ── dot grid bg ── */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.025] -z-10"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── floating food ── */}
        {FLOATS.map((f, i) => (
          <div
            key={i}
            className="pointer-events-none absolute select-none"
            style={{
              left: f.x, top: f.y, fontSize: f.s,
              "--fr": `${f.r}deg`,
              opacity: visible ? 0.55 : 0,
              transition: `opacity 0.5s ease ${parseFloat(f.dl) + 0.1}s`,
              animation: visible
                ? `float-bob ${f.d} ease-in-out ${f.dl} infinite, pop-in 0.5s cubic-bezier(.34,1.56,.64,1) ${f.dl} both`
                : "none",
            } as React.CSSProperties}
          >
            {f.e}
          </div>
        ))}

        <div className="container mx-auto px-4 py-44 max-w-5xl">
          <Navbar/>

          {/* ── hero ── */}
          <div className="text-center mb-16">
            <div className={`bp ${visible ? "show" : ""} mb-5 inline-block`}>
              <Badge variant="secondary" className="pulse-ring px-4 py-1.5 text-xs font-semibold uppercase tracking-widest gap-2 rounded-full">
                <span>🎧</span> We&apos;re here for you
              </Badge>
            </div>

            <h1 className={`fu ${visible ? "show" : ""} text-4xl md:text-6xl font-black leading-[1.08] tracking-tight mb-4`} style={{ animationDelay: "0.1s" }}>
              How can we{" "}
              <span className="bg-red-500">help you?</span>
            </h1>

            <p className={`fu ${visible ? "show" : ""} text-base md:text-lg opacity-60 max-w-md mx-auto leading-relaxed`} style={{ animationDelay: "0.2s" }}>
              Got a question, issue, or just want to say hi? Our support team is always around — pick your preferred channel below.
            </p>

            {/* live status pill */}
            <div className={`fu ${visible ? "show" : ""} mt-5 flex items-center justify-center gap-2`} style={{ animationDelay: "0.28s" }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-medium opacity-60">Support team is online now</span>
            </div>
          </div>

          {/* ── contact channel cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {CHANNELS.map((c, i) => (
              <a
                key={i}
                href={c.action}
                className={`ci ${visible ? "show" : ""} channel-card bg-card border rounded-2xl p-5 flex flex-col gap-3 no-underline`}
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
               <div
                 className="flex items-center justify-center w-12 bg-red-500 h-12 rounded-xl"
                 
                  >
                {typeof c.icon === "string" ? (
                 <span className="text-2xl">{c.icon}</span>
                  ) : (
                 <HugeiconsIcon icon={c.icon} size={24} />
                  )}
                  </div>
                <div>
                  <p className="font-black text-base leading-none mb-1">{c.title}</p>
                  <p className="text-xs opacity-50">{c.sub}</p>
                </div>
                <p className="text-sm font-semibold opacity-80 leading-snug">{c.value}</p>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
                  <span className="text-[10px] opacity-40">{c.hint}</span>
                  <span className="text-xs font-bold text-primary">{c.cta} →</span>
                </div>
              </a>
            ))}
          </div>

          {/* ── two-col: FAQ + Form ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">

            {/* FAQ */}
            <div>
              <div className={`fu ${visible ? "show" : ""} mb-6`} style={{ animationDelay: "0.5s" }}>
                <span className="text-2xl mb-2 block">
                 <HugeiconsIcon icon={Question} />
                </span> 
                <h2 className="text-2xl font-black tracking-tight">Frequently asked</h2>
                <p className="text-sm opacity-50 mt-1">Quick answers to common questions.</p>
              </div>
              <div className={`fu ${visible ? "show" : ""} space-y-3`} style={{ animationDelay: "0.58s" }}>
                {FAQS.map((f, i) => <FaqItem key={i} faq={f} index={i} />)}
              </div>
            </div>

            {/* Contact form */}
            <div className={`fu ${visible ? "show" : ""}`} style={{ animationDelay: "0.55s" }}>
              <div className="mb-6">
                <span className="text-2xl mb-2 block">
                  <HugeiconsIcon icon={Message} />
                </span>
                <h2 className="text-2xl font-black tracking-tight">Send a message</h2>
                <p className="text-sm opacity-50 mt-1">We&apos;ll get back to you within 2 hours.</p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4 border rounded-2xl bg-card">
                  <span className="text-5xl tick-anim">✅</span>
                  <p className="font-black text-lg">Message sent!</p>
                  <p className="text-sm opacity-55 text-center max-w-xs">
                    We&apos;ve received your message and will reply to <strong>{formState.email}</strong> within 2 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name:"", email:"", issue:"", msg:"" }); }}
                    className="text-xs text-primary underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <div className="bg-card border rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-semibold opacity-50 block mb-2">Your name</Label>
                     <Input
                        placeholder="your name"
                        value={formState.name}
                         onChange={(e) =>
                         setFormState((s) => ({
                                   ...s,
                                name: e.target.value,
                                }))
                                }
                          className="rounded-md border-none"
                          />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold opacity-50 block mb-2">Email</Label>
                      <Input
                        className="rounded-md border-none"
                        type="email"
                        placeholder="xxx@gmail.com"
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold opacity-50 block mb-2">Issue type</Label>
                    <Select
  value={formState.issue}
  onValueChange={(val) => 
    setFormState((s) => 
     (
      {...s,
       issue: val ?? ''
      }
     )
    )
  }
>
  <SelectTrigger className="rounded-md border-none">
    <SelectValue placeholder="Select an issue..." />
  </SelectTrigger>

  <SelectContent align="end" className={"p-2"}>
    <SelectItem value="Order not delivered">
      Order not delivered
    </SelectItem>

    <SelectItem value="Reservation problem">
      Reservation problem
    </SelectItem>

    <SelectItem value="Refund request">
      Refund request
    </SelectItem>

    <SelectItem value="Wrong items delivered">
      Wrong items delivered
    </SelectItem>

    <SelectItem value="App / Technical issue">
      App / Technical issue
    </SelectItem>

    <SelectItem value="Other">
      Other
    </SelectItem>
  </SelectContent>
</Select>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold opacity-50 block mb-1">Message</Label>
                    <Textarea
                      rows={4}
                      placeholder="Tell us what happened and we'll sort it out..."
                      value={formState.msg}
                      onChange={(e) =>
                         setFormState((s) => ({
                              ...s,
                              msg: e.target.value,
                            }))
                          }
                          className="resize-none rounded-md border-none"
                          />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full rounded-md font-bold tracking-wide"
                    size="lg"
                    disabled={!formState.name || !formState.email || !formState.msg}
                  >
                    Send Message →
                  </Button>

                  <p className="text-[10px] opacity-35 text-center">
                    By submitting you agree to our Privacy Policy. We never share your data.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── bottom trust strip ── */}
          <div className={`fu ${visible ? "show" : ""} rounded-2xl border bg-card/60 p-6 flex flex-wrap justify-center gap-8 text-center`} style={{ animationDelay: "0.7s" }}>
            {[
              { icon: "⚡", stat: "< 2 min",   label: "Avg. chat wait time" },
              { icon: "✅", stat: "97%",        label: "Issues resolved first contact" },
              { icon: "🌙", stat: "24 × 7",     label: "Support availability" },
              { icon: "⭐", stat: "4.8 / 5",    label: "Customer satisfaction" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div className="text-left">
                  <p className="font-black text-lg leading-none">{s.stat}</p>
                  <p className="text-[11px] opacity-45 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}