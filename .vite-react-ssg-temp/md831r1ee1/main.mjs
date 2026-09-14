var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua;
import { ViteReactSSG } from "vite-react-ssg";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient, useMutation, dehydrate, hydrate } from "@tanstack/react-query";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useLocation, Link, Outlet, Navigate, useSearchParams, useParams, useNavigate } from "react-router-dom";
import * as React from "react";
import { useEffect, createContext, useState, useContext, useCallback, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { AnimatePresence, motion, useReducedMotion, useInView } from "framer-motion";
import { X, Check, Loader2, Send, Cookie, Settings, ArrowRight, Menu, Instagram, Linkedin, ArrowLeft, Film, Mic, Share2, CalendarDays, Play, ArrowUpDown, Grid3X3, ChevronDown, CheckCircle2, Eye, MapPin, Target, Users, Package, Lightbulb, Scissors, BarChart3, Calendar, Home, ChevronUp, LogOut, Plus, Pin, PinOff, EyeOff, Edit2, Trash2, UploadCloud, AlertCircle, Save, ArrowUp, ArrowDown, LogIn, Sparkles, UtensilsCrossed, Plane, Globe, CalendarClock, Building2, Video } from "lucide-react";
import { z } from "zod";
import { useTheme } from "next-themes";
import { Toaster as Toaster$1, toast } from "sonner";
import useEmblaCarousel from "embla-carousel-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import mod from "react-helmet-async";
import * as tus from "tus-js-client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { getCalApi } from "@calcom/embed-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import * as SheetPrimitive from "@radix-ui/react-dialog";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/components/layout/ScrollToTop.tsx");
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/integrations/supabase/previewAuthStorage.ts");
function brokeredPreviewStorage() {
  var _a2, _b2;
  if (typeof window === "undefined") return void 0;
  const host = location.hostname;
  const PREVIEW_ZONES = ["lovableproject.com", "lovableproject-dev.com", "lovable.app", "gpt-eng.com", "gptengineer.run"];
  const onPreviewZone = PREVIEW_ZONES.some((z2) => host === z2 || host.endsWith("." + z2));
  const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}";
  const projectId = onPreviewZone ? ((_a2 = host.match(new RegExp("^(?:id-preview(?:-[a-z0-9]+)?|project)--(" + UUID + ")(?:-dev)?(?=\\.|$)", "i"))) == null ? void 0 : _a2[1]) ?? ((_b2 = host.match(new RegExp("^(" + UUID + ")(?=[.-])", "i"))) == null ? void 0 : _b2[1]) : void 0;
  const framed = window.parent && window.parent !== window;
  if (!projectId || !framed) return localStorage;
  const dev = host.endsWith(".lovableproject-dev.com") || host.endsWith(".gpt-eng.com");
  const EDITOR = dev ? /^https:\/\/([a-z0-9-]+\.)*(lovable\.dev|gptengineer\.app)$|^http:\/\/localhost:3000$/ : /^https:\/\/([a-z0-9-]+\.)*(lovable\.dev|gptengineer\.app)$/;
  const ancestor = location.ancestorOrigins && location.ancestorOrigins[0] || (document.referrer ? new URL(document.referrer).origin : "");
  const editorOrigins = ancestor && EDITOR.test(ancestor) ? [ancestor] : dev ? ["https://lovable.dev", "http://localhost:3000"] : ["https://lovable.dev"];
  const RESULT = "lovable-preview-auth:result";
  const TIMEOUT = 2e3;
  const newId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
  const request = (type, key, value) => new Promise((resolve) => {
    const requestId = newId();
    let done = false;
    let timer;
    const finish = (r) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      resolve(r);
    };
    const onMessage = (e) => {
      if (editorOrigins.indexOf(e.origin) < 0) return;
      const d = e.data;
      if (d && d.type === RESULT && d.requestId === requestId) finish(d);
    };
    window.addEventListener("message", onMessage);
    const msg = { type, requestId, projectId, key };
    if (value !== void 0) msg["value"] = value;
    for (const origin of editorOrigins) window.parent.postMessage(msg, origin);
    timer = setTimeout(() => finish(null), TIMEOUT);
  });
  let firstGet = true;
  const RETRY_DELAY = 250;
  return {
    getItem: async (key) => {
      let res = await request("lovable-preview-auth:get", key);
      if (!res && firstGet) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
        res = await request("lovable-preview-auth:get", key);
      }
      firstGet = false;
      if (res && res.ok && typeof res.value === "string") {
        if (res.value === "") {
          localStorage.removeItem(key);
          return null;
        }
        return res.value;
      }
      return localStorage.getItem(key);
    },
    setItem: (key, value) => {
      localStorage.setItem(key, value);
      return request("lovable-preview-auth:set", key, value).then(() => void 0);
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
      return request("lovable-preview-auth:remove", key).then(() => void 0);
    }
  };
}
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/integrations/supabase/client.ts");
const SUPABASE_URL = "https://ndnuwfsuanbjjtfflbfc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbnV3ZnN1YW5iamp0ZmZsYmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MzUwMzksImV4cCI6MjA4NTMxMTAzOX0.K2eSGJrHlF3x4z7PZtgU4XdCvTHoull8C6dMz_a7uus";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true
  }
});
(_d = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _d.call(globalThis, "src/hooks/useAuth.tsx");
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkAdminRole = async (userId) => {
    try {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }
      return !!data;
    } catch (err) {
      console.error("Error checking admin role:", err);
      return false;
    }
  };
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser((newSession == null ? void 0 : newSession.user) ?? null);
        if (newSession == null ? void 0 : newSession.user) {
          setTimeout(async () => {
            const adminStatus = await checkAdminRole(newSession.user.id);
            setIsAdmin(adminStatus);
            setIsLoading(false);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser((initialSession == null ? void 0 : initialSession.user) ?? null);
      if (initialSession == null ? void 0 : initialSession.user) {
        const adminStatus = await checkAdminRole(initialSession.user.id);
        setIsAdmin(adminStatus);
      }
      setIsLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, session, isAdmin, isLoading, signIn, signOut }, children });
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
(_e = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _e.call(globalThis, "src/contexts/BookingSheetContext.tsx");
const BookingSheetContext = createContext(void 0);
function BookingSheetProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState({});
  const openSheet = (next) => {
    const clean = {};
    if (next && typeof next === "object") {
      const raw = next;
      for (const key of ["conference", "running", "need", "venue", "source"]) {
        const value = raw[key];
        if (typeof value === "string" && value) clean[key] = value;
      }
    }
    setPrefill(clean);
    setIsOpen(true);
  };
  const closeSheet = () => setIsOpen(false);
  return /* @__PURE__ */ jsx(BookingSheetContext.Provider, { value: { isOpen, prefill, openSheet, closeSheet }, children });
}
function useBookingSheet() {
  const context = useContext(BookingSheetContext);
  if (!context) {
    throw new Error("useBookingSheet must be used within a BookingSheetProvider");
  }
  return context;
}
(_f = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _f.call(globalThis, "src/lib/submitContact.ts");
async function submitContact(formData) {
  const url2 = `${"https://ndnuwfsuanbjjtfflbfc.supabase.co"}/functions/v1/submit-contact`;
  const res = await fetch(url2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbnV3ZnN1YW5iamp0ZmZsYmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MzUwMzksImV4cCI6MjA4NTMxMTAzOX0.K2eSGJrHlF3x4z7PZtgU4XdCvTHoull8C6dMz_a7uus"}`
    },
    body: JSON.stringify({
      ...formData,
      page_url: window.location.href
    })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data == null ? void 0 : data.error) || "Failed to send message");
  }
  return data;
}
(_g = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _g.call(globalThis, "src/lib/conventions.ts");
const conventions = [
  {
    slug: "dreamforce",
    name: "Dreamforce",
    organizer: "Salesforce",
    venue: "Moscone North, South and West",
    audience: "Salesforce customers, partners and ISVs fill SoMa for three days and every partner needs proof their activation was busy.",
    buyers: [
      "Salesforce partners and ISVs running an activation",
      "sponsors",
      "hospitality suites near Moscone"
    ],
    editions: [
      { year: 2023, start: "2023-09-12", end: "2023-09-14" },
      { year: 2024, start: "2024-09-17", end: "2024-09-19" },
      { year: 2026, start: "2026-09-15", end: "2026-09-17" }
    ],
    proofSlugs: [
      "ownbackup-dreamforce-2024",
      "ownbackup-dreamforce-2023",
      "immuta-brand-hq-build-montage"
    ],
    faqs: [
      {
        q: "Do you cover Dreamforce side events outside Moscone?",
        a: "Yes. Most of our Dreamforce work is in the hotels, rooftops and restaurants around Moscone, including The Howard."
      },
      {
        q: "How fast can we get clips during Dreamforce?",
        a: "Shoot day one, clip in your inbox by 10am day two, so your team can post while the show is still running."
      }
    ]
  },
  {
    slug: "rsac",
    name: "RSAC Conference",
    organizer: "RSA Conference",
    venue: "Moscone Center",
    audience: "Security buyers walk the halls all day, so vendors need footage from the hub and the suite, not just the booth.",
    buyers: [
      "security vendors running experience hubs and hospitality suites",
      "podcast and exec content teams"
    ],
    editions: [
      { year: 2024, start: "2024-05-06", end: "2024-05-09" },
      { year: 2025, start: "2025-04-28", end: "2025-05-01" },
      { year: 2027, start: "2027-04-05", end: "2027-04-08" }
    ],
    proofSlugs: [
      "cloudflare-rsa-conference-2025",
      "claroty-rsa-conference-2024",
      "rsa-conference-2025-b-restaurant"
    ],
    faqs: [
      {
        q: "Can you run a podcast day during RSAC?",
        a: "Yes. We have shot back to back podcast and interview days for security vendors at RSAC, including multi camera setups in a suite."
      },
      {
        q: "Can one crew cover a hub and an evening party?",
        a: "Usually yes for a single day. Across the full week we put a fresh crew on each day so the edits keep landing overnight."
      }
    ]
  },
  {
    slug: "snowflake-summit",
    name: "Snowflake Summit",
    organizer: "Snowflake",
    venue: "Moscone Center",
    audience: "Data platform partners compete for the same attendees, so the lounge and the customer dinner both need footage.",
    buyers: ["data platform partners running lounges and meeting hubs"],
    editions: [
      { year: 2025, start: "2025-06-02", end: "2025-06-05" },
      { year: 2026, start: "2026-06-01", end: "2026-06-04" },
      { year: 2027, start: "2027-06-07", end: "2027-06-10" }
    ],
    proofSlugs: [
      "immuta-snowflake-summit-2025",
      "snowflake-summit-2025-b-restaurant",
      "immuta-brand-hq-build-montage"
    ],
    faqs: [
      {
        q: "Do you shoot the build out before Snowflake Summit opens?",
        a: "Yes. We shoot load in and the finished space the morning before doors, which gives you a clean build montage."
      },
      {
        q: "Can you cover a customer dinner the same day as the lounge?",
        a: "Yes. Lounge in the day, dinner at night, one crew, and the clip goes out the next morning."
      }
    ]
  },
  {
    slug: "data-ai-summit",
    name: "Data + AI Summit",
    organizer: "Databricks",
    venue: "Moscone North, West and South",
    audience: "Data and AI vendors run activations within a block of Moscone and need clips their field teams can post the same week.",
    buyers: ["data and AI vendors running activations and side events"],
    editions: [{ year: 2027, start: "2027-06-21", end: "2027-06-24" }],
    proofSlugs: [
      "dataiku-brand-hq-build-montage",
      "hex-brand-hq-build-montage",
      "github-brand-hq-build-montage"
    ],
    faqs: [
      {
        q: "Do you shoot activation build montages for Data + AI Summit?",
        a: "Yes. Build montages are one of our most requested films for this week, from empty room to opening night."
      },
      {
        q: "Can you deliver a clip per day across the summit?",
        a: "Yes. One clip by 10am each morning for the day before, then the full recap the same week."
      }
    ]
  },
  {
    slug: "techcrunch-disrupt",
    name: "TechCrunch Disrupt",
    organizer: "TechCrunch",
    venue: "Moscone West",
    audience: "Founders launching and funds hosting want fast, human footage they can post before the news cycle moves on.",
    buyers: ["startups launching", "VCs hosting founder events", "sponsors"],
    editions: [{ year: 2026, start: "2026-10-13", end: "2026-10-15" }],
    proofSlugs: [
      "the-agent-open-san-francisco",
      "onchain-summit-2024",
      "passionfroot-tech-event-recap"
    ],
    faqs: [
      {
        q: "Can you shoot a launch announcement during Disrupt?",
        a: "Yes. We shoot the stage moment, the booth and short founder pieces to camera, then cut a vertical the same night if you need it."
      },
      {
        q: "Do you cover founder dinners around Disrupt?",
        a: "Yes. We shoot quiet, no big lights, and you approve every clip before anything goes out."
      }
    ]
  },
  {
    slug: "gdc",
    name: "GDC Festival of Gaming",
    organizer: "Informa",
    venue: "Moscone Center",
    audience: "Studios and platform vendors run suites, parties and press days across the week and want footage that looks like the game, not a trade show.",
    buyers: ["game studios, publishers and platform vendors running suites and parties"],
    editions: [{ year: 2027, start: "2027-03-01", end: "2027-03-05" }],
    proofSlugs: [
      "xsolla-brand-hq-build-montage",
      "1password-brand-hq-build-montage",
      "the-veranda-venue-film"
    ],
    faqs: [
      {
        q: "Can you shoot a GDC party and keep it usable for marketing?",
        a: "Yes. We shoot parties with a light kit that keeps faces clean, and you sign off on every face that appears."
      },
      {
        q: "Do you cover press and partner days during GDC?",
        a: "Yes. Press days, partner meetings and suite demos all cut well into a week recap and short exec clips."
      }
    ]
  },
  {
    slug: "sf-tech-week",
    name: "SF Tech Week",
    organizer: "a16z",
    venue: "citywide side events",
    audience: "Hundreds of side events run in one week and hosts need something posted while the city is still full.",
    buyers: [
      "startups and funds hosting side events",
      "sponsors",
      "brands running activations across the city"
    ],
    editions: [{ year: 2026, start: "2026-10-05", end: "2026-10-11" }],
    proofSlugs: [
      "the-agent-open-san-francisco",
      "dataiku-brand-hq-build-montage",
      "cloudflare-rsa-conference-2025"
    ],
    href: "/sf-tech-week",
    faqs: [
      {
        q: "How many events can you cover in one Tech Week?",
        a: "Up to four events across the week with one crew per event, more if we plan it early."
      },
      {
        q: "How late can we book a Tech Week night?",
        a: "Nights fill first. If a crew is still open we will take a booking the day before."
      }
    ]
  }
];
const sharedConventionFaqs = [
  {
    q: "Do you work inside Moscone?",
    a: "We cover side events, activations and suites around Moscone. Inside the halls depends on the organizer's media rules."
  },
  {
    q: "How early should we book?",
    a: "Conference week crews book out four to six weeks ahead. If you are inside two weeks, message us anyway, we hold a standby crew."
  },
  {
    q: "Do you deliver photo too?",
    a: "Yes, edited photo selects come with every conference week booking."
  }
];
const DAY$1 = 864e5;
function pacificOffset(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const nthSunday = (month, nth) => {
    const first = new Date(Date.UTC(y, month - 1, 1)).getUTCDay();
    return 1 + (7 - first) % 7 + (nth - 1) * 7;
  };
  const dstStart = nthSunday(3, 2);
  const dstEnd = nthSunday(11, 1);
  const after = m > 3 || m === 3 && d >= dstStart;
  const before = m < 11 || m === 11 && d < dstEnd;
  return after && before ? "-07:00" : "-08:00";
}
function pacificMidnight(iso) {
  return (/* @__PURE__ */ new Date(`${iso}T00:00:00${pacificOffset(iso)}`)).getTime();
}
function getEditionPhase(edition, now = /* @__PURE__ */ new Date()) {
  const t = now.getTime();
  const start = pacificMidnight(edition.start);
  const endExclusive = pacificMidnight(edition.end) + DAY$1;
  const totalDays = Math.max(1, Math.round((endExclusive - start) / DAY$1));
  if (t < start) return { kind: "countdown", days: Math.ceil((start - t) / DAY$1) };
  if (t < endExclusive) {
    const day = Math.min(totalDays, Math.floor((t - start) / DAY$1) + 1);
    return { kind: "live", day, totalDays, daysLeft: Math.ceil((endExclusive - t) / DAY$1) };
  }
  return { kind: "wrapped" };
}
function getNextEdition(convention, now = /* @__PURE__ */ new Date()) {
  const sorted = [...convention.editions].sort((a, b) => a.start.localeCompare(b.start));
  return sorted.find((edition) => getEditionPhase(edition, now).kind !== "wrapped") ?? null;
}
function getConventionStatus(convention, now = /* @__PURE__ */ new Date()) {
  const edition = getNextEdition(convention, now);
  if (!edition) return { edition: null, phase: { kind: "tba" } };
  return { edition, phase: getEditionPhase(edition, now) };
}
function nextUnknownYear(convention) {
  const last = convention.editions[convention.editions.length - 1];
  return ((last == null ? void 0 : last.year) ?? (/* @__PURE__ */ new Date()).getFullYear()) + 1;
}
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function formatEditionRange(edition) {
  const [, sm, sd] = edition.start.split("-").map(Number);
  const [ey, em, ed] = edition.end.split("-").map(Number);
  const startPart = `${MONTHS[sm - 1]} ${sd}`;
  const endPart = sm === em ? `${ed}` : `${MONTHS[em - 1]} ${ed}`;
  return `${startPart} to ${endPart}, ${ey}`;
}
function conventionHref(convention) {
  return convention.href ?? `/conventions/${convention.slug}`;
}
function statusChip(convention, phase) {
  if (phase.kind === "live") return "Live now";
  if (phase.kind === "countdown")
    return phase.days === 1 ? "Tomorrow" : `In ${phase.days} days`;
  return `Wrapped, ${nextUnknownYear(convention)} TBA`;
}
function conventionSortKey(convention, now = /* @__PURE__ */ new Date()) {
  const edition = getNextEdition(convention, now);
  return edition ? edition.start : "9999-12-31";
}
(_h = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _h.call(globalThis, "src/components/booking/BookingFormSheet.tsx");
const bookingSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional(),
  company: z.string().trim().max(100).optional(),
  role: z.string().trim().max(100).optional(),
  conference: z.string().min(1, "Required"),
  eventDates: z.string().trim().max(120).optional(),
  running: z.string().min(1, "Required"),
  service: z.string().min(1, "Required"),
  budget: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Required").max(2e3),
  website: z.string().max(0, "Bot detected")
});
const conferenceOptions = [
  ...[...conventions].sort((a, b) => conventionSortKey(a).localeCompare(conventionSortKey(b))).map((c) => c.name),
  "Another conference",
  "Not tied to a conference"
];
const runningOptions = [
  "Brand HQ or experience hub",
  "Hospitality suite or lounge",
  "Side event or party",
  "Sponsor activation",
  "Exec content or podcast",
  "Other"
];
const needOptions = [
  "Activation recap",
  "Exec clips for LinkedIn",
  "Same week social cutdowns",
  "Full week coverage",
  "Sponsor cut",
  "Not sure yet"
];
const emptyForm$1 = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  conference: "",
  eventDates: "",
  running: "",
  service: "",
  budget: "",
  message: "",
  website: ""
};
function BookingFormSheet() {
  const { isOpen, closeSheet, prefill } = useBookingSheet();
  const [formData, setFormData] = useState(emptyForm$1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  useEffect(() => {
    if (!isOpen) return;
    setFormData((prev) => ({
      ...prev,
      conference: prefill.conference && conferenceOptions.includes(prefill.conference) ? prefill.conference : prefill.conference ? "Another conference" : prev.conference,
      running: prefill.running ?? prev.running,
      service: prefill.need ?? prev.service,
      message: prefill.venue ? `Venue: ${prefill.venue}
${prev.message}`.trim() : prev.message
    }));
  }, [isOpen, prefill]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
    }
  };
  const validate = () => {
    const parsed = bookingSchema.safeParse(formData);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const newErrors = {};
    parsed.error.errors.forEach((e) => {
      if (e.path[0]) newErrors[e.path[0]] = e.message;
    });
    setErrors(newErrors);
    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        company: formData.company || void 0,
        service: formData.service,
        message: `[Conference: ${formData.conference}] [Running: ${formData.running}]${formData.role ? ` [Role: ${formData.role}]` : ""}

${formData.message}`,
        phone: formData.phone || void 0,
        budget: formData.budget || void 0,
        timeline: formData.eventDates || void 0,
        source: prefill.source || "booking-sheet"
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClose = useCallback(() => {
    closeSheet();
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData(emptyForm$1);
      setErrors({});
      setSubmitError(null);
    }, 300);
  }, [closeSheet]);
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        handleClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);
  const inputClasses = (hasError) => `w-full px-3 py-2 rounded-lg bg-m3-surface text-m3-on-surface text-sm border ${hasError ? "border-m3-secondary ring-1 ring-m3-secondary" : "border-m3-outline/30"} focus:outline-none focus:ring-2 focus:ring-m3-primary/50 focus:border-m3-primary transition-all`;
  const selectClasses = (hasError) => `${inputClasses(hasError)} appearance-none cursor-pointer`;
  const labelClasses = "text-xs font-medium text-m3-on-surface/80 mb-1 block";
  const SelectArrow = () => /* @__PURE__ */ jsx("div", { className: "absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ jsx(
    "svg",
    {
      className: "w-3.5 h-3.5 text-m3-on-surface/50",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
    }
  ) });
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
        className: "fixed inset-0 bg-black/60 z-[140]",
        onClick: handleClose
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring", damping: 28, stiffness: 350 },
        className: "fixed top-0 right-0 bottom-0 w-full max-w-md bg-m3-surface-variant z-[145] shadow-2xl flex flex-col",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 bg-m3-surface-variant px-5 pt-5 pb-4 relative", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleClose,
                className: "absolute top-3 right-3 p-2 hover:bg-m3-surface rounded-full transition-colors",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-m3-on-surface/70" })
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl font-semibold text-m3-on-surface text-center", children: "Tell us about your conference week" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-m3-on-surface/50 text-center mt-1", children: "We reply within 1 business day" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto px-5 py-4", children: isSubmitted ? /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              role: "status",
              "aria-live": "polite",
              className: "text-center py-8",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Check, { className: "w-7 h-7 text-m3-primary" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-m3-on-surface mb-2", children: "Got it." }),
                /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/60 text-sm mb-5", children: "We reply within 1 business day with a scope and a price for your dates." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: "/work",
                      onClick: handleClose,
                      className: "m3-outlined-button inline-flex items-center justify-center text-sm py-2",
                      children: "See Our Work"
                    }
                  ),
                  /* @__PURE__ */ jsx("button", { onClick: handleClose, className: "m3-text-button text-m3-primary text-sm", children: "Close" })
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "website",
                value: formData.website,
                onChange: handleChange,
                className: "absolute -left-[9999px] opacity-0",
                tabIndex: -1,
                autoComplete: "off"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "booking-name", className: labelClasses, children: "Name *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "booking-name",
                    type: "text",
                    name: "name",
                    required: true,
                    "aria-required": "true",
                    value: formData.name,
                    onChange: handleChange,
                    className: inputClasses(!!errors.name),
                    placeholder: "Your name"
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "booking-email", className: labelClasses, children: "Email *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "booking-email",
                    type: "email",
                    name: "email",
                    required: true,
                    "aria-required": "true",
                    value: formData.email,
                    onChange: handleChange,
                    className: inputClasses(!!errors.email),
                    placeholder: "you@company.com"
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "booking-phone", className: labelClasses, children: "Phone" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "booking-phone",
                    type: "tel",
                    name: "phone",
                    value: formData.phone,
                    onChange: handleChange,
                    className: inputClasses(false),
                    placeholder: "Best number to reach you"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "booking-company", className: labelClasses, children: "Company" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "booking-company",
                    type: "text",
                    name: "company",
                    value: formData.company,
                    onChange: handleChange,
                    className: inputClasses(false),
                    placeholder: "Company name"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "booking-role", className: labelClasses, children: "Role" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "booking-role",
                  type: "text",
                  name: "role",
                  value: formData.role,
                  onChange: handleChange,
                  className: inputClasses(false),
                  placeholder: "Marketing, events, founder"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "booking-conference", className: labelClasses, children: "Conference *" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "booking-conference",
                      name: "conference",
                      required: true,
                      "aria-required": "true",
                      value: formData.conference,
                      onChange: handleChange,
                      className: selectClasses(!!errors.conference),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "Select" }),
                        conferenceOptions.map((option) => /* @__PURE__ */ jsx("option", { value: option, children: option }, option))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(SelectArrow, {})
                ] }),
                errors.conference && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.conference })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "booking-eventDates", className: labelClasses, children: "Event dates" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "booking-eventDates",
                    type: "text",
                    name: "eventDates",
                    value: formData.eventDates,
                    onChange: handleChange,
                    className: inputClasses(false),
                    placeholder: "Oct 5 to 7"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "booking-running", className: labelClasses, children: "What are you running? *" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "booking-running",
                    name: "running",
                    required: true,
                    "aria-required": "true",
                    value: formData.running,
                    onChange: handleChange,
                    className: selectClasses(!!errors.running),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select" }),
                      runningOptions.map((option) => /* @__PURE__ */ jsx("option", { value: option, children: option }, option))
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(SelectArrow, {})
              ] }),
              errors.running && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.running })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "booking-service", className: labelClasses, children: "What do you need? *" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "booking-service",
                    name: "service",
                    required: true,
                    "aria-required": "true",
                    value: formData.service,
                    onChange: handleChange,
                    className: selectClasses(!!errors.service),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select" }),
                      needOptions.map((option) => /* @__PURE__ */ jsx("option", { value: option, children: option }, option))
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(SelectArrow, {})
              ] }),
              errors.service && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.service })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "booking-budget", className: labelClasses, children: "Budget range" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "booking-budget",
                  type: "text",
                  name: "budget",
                  value: formData.budget,
                  onChange: handleChange,
                  className: inputClasses(false),
                  placeholder: "A range is fine"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "booking-message", className: labelClasses, children: "Notes *" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "booking-message",
                  name: "message",
                  required: true,
                  "aria-required": "true",
                  value: formData.message,
                  onChange: handleChange,
                  rows: 3,
                  className: `${inputClasses(!!errors.message)} resize-none`,
                  placeholder: "Venue, run of show, deliverables"
                }
              ),
              errors.message && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.message })
            ] }),
            submitError && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-xs", children: submitError }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                disabled: isSubmitting,
                className: "w-full m3-filled-button flex items-center justify-center gap-2 py-3 text-sm disabled:opacity-50 mt-2",
                children: [
                  isSubmitting ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
                  "Send"
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-m3-outline/20 mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-6 text-m3-on-surface/50", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 1.5,
                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                ) }),
                /* @__PURE__ */ jsx("span", { className: "text-xs", children: "30 min call" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 1.5,
                    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                ) }),
                /* @__PURE__ */ jsx("span", { className: "text-xs", children: "No commitment" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 1.5,
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                ) }),
                /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Free quote" })
              ] })
            ] }) })
          ] }) })
        ]
      }
    )
  ] }) });
}
(_i = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _i.call(globalThis, "src/components/CookieConsent.tsx");
const CONSENT_KEY = "cookie-consent";
const PREFERENCES_KEY = "cookie-preferences";
function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    // Always required
    analytics: false,
    marketing: false
  });
  useEffect(() => {
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);
  const saveConsent = (prefs) => {
    localStorage.setItem(CONSENT_KEY, "true");
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    setIsVisible(false);
  };
  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };
  const handleAcceptNecessary = () => {
    const necessaryOnly = { necessary: true, analytics: false, marketing: false };
    setPreferences(necessaryOnly);
    saveConsent(necessaryOnly);
  };
  const handleSavePreferences = () => {
    saveConsent(preferences);
  };
  const togglePreference = (key) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
      transition: { type: "spring", damping: 25, stiffness: 300 },
      className: "fixed bottom-0 left-0 right-0 z-[130] p-4 sm:p-6",
      children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "m3-elevated-card bg-m3-surface border border-m3-outline/20 p-4 sm:p-6 shadow-2xl", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !showSettings ? /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-m3-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Cookie, { className: "w-5 h-5 text-m3-primary" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-m3-on-surface text-sm sm:text-base", children: "We value your privacy" }),
                /* @__PURE__ */ jsxs("p", { className: "text-m3-on-surface/70 text-xs sm:text-sm mt-1 leading-relaxed", children: [
                  'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.',
                  /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "text-m3-primary hover:underline ml-1", children: "Learn more" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleAcceptAll,
                  className: "m3-filled-button text-sm py-2.5 px-5 order-1 sm:order-2",
                  children: "Accept All"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleAcceptNecessary,
                  className: "m3-outlined-button text-sm py-2.5 px-5 order-2 sm:order-1",
                  children: "Necessary Only"
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setShowSettings(true),
                  className: "m3-text-button text-m3-on-surface/70 text-sm py-2.5 flex items-center justify-center gap-1.5 order-3",
                  children: [
                    /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" }),
                    "Customize"
                  ]
                }
              )
            ] })
          ]
        },
        "main"
      ) : /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-m3-on-surface", children: "Cookie Settings" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setShowSettings(false),
                  className: "p-1.5 hover:bg-m3-surface-variant rounded-full transition-colors",
                  children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-m3-on-surface/70" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-m3-surface-variant/50", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium text-m3-on-surface text-sm", children: "Necessary" }),
                  /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/60 text-xs", children: "Required for the website to function" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-11 h-6 rounded-full bg-m3-primary/30 flex items-center px-0.5 cursor-not-allowed", children: /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-m3-primary shadow-sm ml-auto" }) })
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => togglePreference("analytics"),
                  className: "w-full flex items-center justify-between p-3 rounded-xl bg-m3-surface-variant/50 hover:bg-m3-surface-variant transition-colors text-left",
                  children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-medium text-m3-on-surface text-sm", children: "Analytics" }),
                      /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/60 text-xs", children: "Help us understand how visitors use our site" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: `w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${preferences.analytics ? "bg-m3-primary/30" : "bg-m3-outline/30"}`, children: /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded-full shadow-sm transition-all ${preferences.analytics ? "bg-m3-primary ml-auto" : "bg-m3-surface-variant"}` }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => togglePreference("marketing"),
                  className: "w-full flex items-center justify-between p-3 rounded-xl bg-m3-surface-variant/50 hover:bg-m3-surface-variant transition-colors text-left",
                  children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-medium text-m3-on-surface text-sm", children: "Marketing" }),
                      /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/60 text-xs", children: "Personalized ads and content" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: `w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${preferences.marketing ? "bg-m3-primary/30" : "bg-m3-outline/30"}`, children: /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded-full shadow-sm transition-all ${preferences.marketing ? "bg-m3-primary ml-auto" : "bg-m3-surface-variant"}` }) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setShowSettings(false),
                  className: "m3-outlined-button text-sm py-2.5 px-5 flex-1",
                  children: "Back"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleSavePreferences,
                  className: "m3-filled-button text-sm py-2.5 px-5 flex-1",
                  children: "Save Preferences"
                }
              )
            ] })
          ]
        },
        "settings"
      ) }) }) })
    }
  ) });
}
(_j = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _j.call(globalThis, "src/components/ui/sonner.tsx");
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
(_k = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _k.call(globalThis, "src/lib/queryClient.ts");
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // The prerendered cache is handed to the client, so the first render
      // matches the static HTML instead of a loading state. A short stale time
      // stops an instant refetch from swapping content under the user.
      staleTime: 6e4
    }
  }
});
(_l = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _l.call(globalThis, "src/App.tsx");
function App() {
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsxs(BookingSheetProvider, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(BookingFormSheet, {}),
    /* @__PURE__ */ jsx(CookieConsent, {}),
    /* @__PURE__ */ jsx(Toaster, {})
  ] }) }) });
}
(_m = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _m.call(globalThis, "src/components/auth/AdminRoute.tsx");
function AdminRoute({ children }) {
  const { user, isAdmin, isLoading } = useAuth();
  const location2 = useLocation();
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-m3-surface-dark flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-4 border-m3-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/60", children: "Loading..." })
    ] }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/admin/login", state: { from: location2 }, replace: true });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-m3-surface-dark flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-md", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-m3-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-m3-secondary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
      /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-2xl font-semibold text-m3-on-dark mb-2", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/60 mb-6", children: "You don't have admin permissions to access this page." }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "m3-filled-button inline-block", children: "Go to Homepage" })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
}
const logo = "/assets/where2studios-logo-D4WgZJUs.png";
(_n = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _n.call(globalThis, "src/lib/techWeek.ts");
const SF_START = /* @__PURE__ */ new Date("2026-10-05T00:00:00-07:00");
const SF_END_EXCLUSIVE = /* @__PURE__ */ new Date("2026-10-12T00:00:00-07:00");
const LA_END_EXCLUSIVE = /* @__PURE__ */ new Date("2026-10-19T00:00:00-07:00");
const DAY = 864e5;
function getTechWeekPhase(now = /* @__PURE__ */ new Date()) {
  const t = now.getTime();
  if (t < SF_START.getTime()) {
    return { kind: "countdown", days: Math.ceil((SF_START.getTime() - t) / DAY) };
  }
  if (t < SF_END_EXCLUSIVE.getTime()) {
    const day = Math.min(7, Math.floor((t - SF_START.getTime()) / DAY) + 1);
    return { kind: "live", day, daysLeft: Math.ceil((SF_END_EXCLUSIVE.getTime() - t) / DAY) };
  }
  if (t < LA_END_EXCLUSIVE.getTime()) return { kind: "la-week" };
  return { kind: "wrapped" };
}
function isTechWeekPromoLive(phase) {
  return phase.kind === "countdown" || phase.kind === "live";
}
const techWeekPackages = [
  {
    id: "single-event-recap",
    name: "Single Event Recap",
    description: "One event, up to 5 hours on site. A 60 to 90 second recap edit and 20 edited photo selects within 5 business days.",
    startingPrice: 3500
  },
  {
    id: "next-morning",
    name: "Next Morning",
    tag: "Most booked for Tech Week",
    description: "Everything in Single Event Recap, plus an overnight edit. A 30 second teaser and one vertical clip by 10am the next day.",
    startingPrice: 4500
  },
  {
    id: "recap-social-pack",
    name: "Recap + Social Pack",
    description: "Everything in Next Morning, plus 5 vertical cutdowns for Reels, TikTok and LinkedIn, captioned and ready within 5 business days.",
    startingPrice: 5500
  },
  {
    id: "full-week",
    name: "Full Week Coverage",
    description: "Up to 4 events across October 5 to 11, one crew per event. Teaser and vertical clip by 10am daily, one week recap film, shared folder.",
    startingPrice: 18e3
  }
];
const SPONSOR_OPTION = "Sponsor coverage";
const techWeekNeedOptions = [
  ...techWeekPackages.map((p) => p.name),
  SPONSOR_OPTION,
  "Not sure yet"
];
(_o = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _o.call(globalThis, "src/hooks/useTechWeekPhase.ts");
const buildTime = "2026-09-14T18:45:32.821Z";
const BUILD_TIME$1 = buildTime;
function useTechWeekPhase() {
  const [phase, setPhase] = useState(
    () => getTechWeekPhase(new Date(BUILD_TIME$1))
  );
  useEffect(() => {
    const tick = () => setPhase(getTechWeekPhase(/* @__PURE__ */ new Date()));
    tick();
    const id = setInterval(tick, 6e4);
    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return phase;
}
(_p = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _p.call(globalThis, "src/hooks/useConventionStatus.ts");
const BUILD_TIME = "2026-09-14T18:45:32.821Z";
function useConventionClock() {
  const [now, setNow] = useState(() => new Date(BUILD_TIME));
  useEffect(() => {
    const tick = () => setNow(/* @__PURE__ */ new Date());
    tick();
    const id = setInterval(tick, 6e4);
    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return now;
}
function useConventionStatus(convention) {
  const now = useConventionClock();
  return { ...getConventionStatus(convention, now), now };
}
(_q = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _q.call(globalThis, "src/components/techweek/AnnouncementBar.tsx");
const STORAGE_KEY = "w2s-techweek-bar-dismissed";
const WINDOW_DAYS = 21;
function techWeekCopy(phase) {
  if (phase.kind === "live") {
    return `Tech Week is live, day ${phase.day} of 7. Same day crews still available`;
  }
  if (phase.kind === "countdown") {
    if (phase.days === 1) return "SF Tech Week starts tomorrow. Last crew nights open";
    if (phase.days <= 7) return `SF Tech Week starts in ${phase.days} days. Crew nights are filling up`;
    return "SF Tech Week, Oct 5 to 11. Next morning recaps. Book your date";
  }
  return null;
}
function conventionCopy(convention, phase) {
  if (phase.kind === "live") {
    return `${convention.name} is live, day ${phase.day} of ${phase.totalDays}. Same day crews available`;
  }
  if (phase.kind === "countdown") {
    if (phase.days === 1) return `${convention.name} starts tomorrow. Standby crews open`;
    return `${convention.name} starts in ${phase.days} days. Crews still available. Book your dates`;
  }
  return null;
}
function pickConvention(now) {
  const candidates = conventions.map((convention) => ({ convention, ...getConventionStatus(convention, now) })).filter(({ phase }) => {
    if (phase.kind === "live") return true;
    return phase.kind === "countdown" && phase.days <= WINDOW_DAYS;
  }).sort((a, b) => {
    var _a2, _b2;
    return (((_a2 = a.edition) == null ? void 0 : _a2.start) ?? "9999").localeCompare(((_b2 = b.edition) == null ? void 0 : _b2.start) ?? "9999");
  });
  return candidates[0] ?? null;
}
function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const techWeekPhase = useTechWeekPhase();
  const now = useConventionClock();
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setDismissed(true);
    } catch {
    }
  }, []);
  const soonest = pickConvention(now);
  const isTechWeek = (soonest == null ? void 0 : soonest.convention.slug) === "sf-tech-week";
  let copy = null;
  let href = "/sf-tech-week";
  if (isTechWeek) {
    copy = isTechWeekPromoLive(techWeekPhase) ? techWeekCopy(techWeekPhase) : null;
  } else if (soonest) {
    copy = conventionCopy(soonest.convention, soonest.phase);
    href = conventionHref(soonest.convention);
  }
  if (dismissed || !copy) return null;
  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
    }
  };
  const promoAttrs = isTechWeek ? { "data-techweek-promo": true } : { "data-convention-promo": true };
  return /* @__PURE__ */ jsxs("div", { ...promoAttrs, className: "relative bg-m3-primary text-m3-on-primary", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto flex items-center gap-2 px-3 sm:px-6 py-2 pr-10", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: href,
        className: "flex items-center gap-1.5 min-w-0 text-[11px] sm:text-sm font-semibold leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-on-primary rounded",
        children: [
          /* @__PURE__ */ jsx("span", { className: "min-w-0", children: copy }),
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 shrink-0" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: dismiss,
        "aria-label": "Dismiss notice",
        className: "absolute right-2 top-1/2 -translate-y-1/2 min-w-10 min-h-10 flex items-center justify-center rounded-full hover:bg-m3-on-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-on-primary",
        children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
      }
    )
  ] });
}
(_r = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _r.call(globalThis, "src/components/layout/Navbar.tsx");
const baseNavLinks = [
  { href: "/work", label: "Work" },
  { href: "/conventions", label: "Conferences" },
  { href: "/services", label: "Services" },
  { href: "/who-we-are", label: "About" }
];
const techWeekLink = { href: "/sf-tech-week", label: "SF Tech Week", timely: true };
function Navbar({ variant = "dark" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location2 = useLocation();
  const { openSheet } = useBookingSheet();
  const isLight = variant === "light";
  const textColor = isLight ? "text-m3-on-surface" : "text-m3-on-dark";
  const bgColor = isLight ? "bg-m3-surface" : "bg-m3-surface-dark";
  const navRef = useRef(null);
  const techWeekPhase = useTechWeekPhase();
  const navLinks = isTechWeekPromoLive(techWeekPhase) ? [techWeekLink, ...baseNavLinks] : baseNavLinks;
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const setVar = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  const focusRing2 = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-surface-dark rounded-md";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.nav,
      {
        ref: navRef,
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.3 },
        className: "fixed top-0 left-0 right-0 w-full z-[110]",
        children: [
          /* @__PURE__ */ jsx(AnnouncementBar, {}),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? `py-2 ${bgColor}/95 backdrop-blur-xl border-b ${isLight ? "border-m3-outline" : "border-m3-on-dark/10"}` : `py-3 lg:py-4 ${isLight ? "bg-transparent" : "bg-gradient-to-b from-m3-surface-dark/70 via-m3-surface-dark/40 to-transparent"}`}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between max-w-7xl mx-auto", children: [
                /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center cursor-pointer", children: /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    animate: { scale: isScrolled ? 0.75 : 1 },
                    transition: { duration: 0.3 },
                    src: logo,
                    alt: "Where2Studios",
                    className: `w-auto drop-shadow-2xl origin-left transition-all duration-300 ${isScrolled ? "h-12 sm:h-14 lg:h-18" : "h-14 sm:h-18 lg:h-24"}`
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-1 lg:gap-2 ml-auto", children: navLinks.map((link) => /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: link.href,
                    ..."timely" in link && link.timely ? { "data-techweek-promo": true } : {},
                    "aria-current": link.href === "/services" ? location2.pathname.startsWith("/services") ? "page" : void 0 : location2.pathname === link.href ? "page" : void 0,
                    className: `m3-text-button relative transition-colors ${isLight ? "text-m3-on-surface/80 hover:text-m3-on-surface" : "text-m3-on-dark/80 hover:text-m3-on-dark"} ${(link.href === "/services" ? location2.pathname.startsWith("/services") : location2.pathname === link.href) ? isLight ? "text-m3-on-surface" : "text-m3-on-dark" : ""} ${focusRing2}`,
                    children: [
                      "timely" in link && link.timely && /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-m3-primary mr-1.5 align-middle" }),
                      link.label,
                      (link.href === "/services" ? location2.pathname.startsWith("/services") : location2.pathname === link.href) && /* @__PURE__ */ jsx("span", { className: "absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 rounded-full bg-m3-primary" })
                    ]
                  },
                  link.href
                )) }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 md:hidden", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
                    "aria-label": isMobileMenuOpen ? "Close menu" : "Open menu",
                    "aria-expanded": isMobileMenuOpen,
                    className: `min-w-11 min-h-11 flex items-center justify-center rounded-full ${textColor} hover:bg-m3-on-dark/10 transition-colors ${focusRing2}`,
                    children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
                  }
                ) })
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "md:hidden fixed inset-0 bg-m3-surface-dark/60 backdrop-blur-sm z-[105]",
          onClick: () => setIsMobileMenuOpen(false)
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { x: "100%" },
          animate: { x: "0%" },
          exit: { x: "100%" },
          transition: { type: "spring", damping: 25, stiffness: 200 },
          className: "md:hidden fixed top-0 right-0 h-full w-80 bg-m3-surface-dark/95 backdrop-blur-xl border-l border-m3-on-dark/10 z-[120]",
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full overflow-y-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-m3-on-dark/10", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/",
                  onClick: () => setIsMobileMenuOpen(false),
                  className: `flex items-center ${focusRing2}`,
                  "aria-label": "Where2Studios home",
                  children: /* @__PURE__ */ jsx("img", { src: logo, alt: "Where2Studios", className: "h-10 w-auto" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsMobileMenuOpen(false),
                  "aria-label": "Close menu",
                  className: `min-w-11 min-h-11 flex items-center justify-center rounded-full text-m3-on-dark hover:bg-m3-on-dark/10 ${focusRing2}`,
                  children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("nav", { className: "flex flex-col px-6 pt-4 gap-2", children: navLinks.map((link) => {
              const isActive = location2.pathname === link.href || link.href === "/services" && location2.pathname.startsWith("/services");
              return /* @__PURE__ */ jsxs(
                Link,
                {
                  to: link.href,
                  ..."timely" in link && link.timely ? { "data-techweek-promo": true } : {},
                  onClick: () => setIsMobileMenuOpen(false),
                  "aria-current": isActive ? "page" : void 0,
                  className: `font-fredoka text-3xl font-semibold py-3 px-2 rounded-lg transition-colors ${isActive ? "text-m3-primary" : "text-m3-on-dark hover:text-m3-primary"} ${focusRing2}`,
                  children: [
                    "timely" in link && link.timely && /* @__PURE__ */ jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-m3-primary mr-2 align-middle" }),
                    link.label
                  ]
                },
                link.href
              );
            }) }),
            /* @__PURE__ */ jsxs("div", { className: "px-6 pb-8 pt-10 space-y-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setIsMobileMenuOpen(false);
                    openSheet();
                  },
                  className: `w-full m3-filled-button text-base ${focusRing2}`,
                  children: "Book a Call"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-m3-on-dark/60", children: "We reply within 1 business day." }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.instagram.com/where2studios/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Where2Studios on Instagram",
                    className: `p-2 rounded-full text-m3-on-dark/60 hover:text-m3-primary hover:bg-m3-on-dark/10 transition-colors ${focusRing2}`,
                    children: /* @__PURE__ */ jsx(Instagram, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.linkedin.com/company/where2studios/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Where2Studios on LinkedIn",
                    className: `p-2 rounded-full text-m3-on-dark/60 hover:text-m3-primary hover:bg-m3-on-dark/10 transition-colors ${focusRing2}`,
                    children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5" })
                  }
                )
              ] })
            ] })
          ] })
        }
      )
    ] }) })
  ] });
}
(_s = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _s.call(globalThis, "src/components/layout/SkipLink.tsx");
function SkipLink() {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "#main-content",
      className: "sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-3 focus:rounded-lg focus:bg-m3-surface-dark focus:text-m3-on-dark focus:font-fredoka focus:font-semibold focus:text-sm focus:outline-none focus:ring-2 focus:ring-m3-primary",
      children: "Skip to main content"
    }
  );
}
const version$1 = 1;
const asset_id$1 = "38ec0471-7706-46b5-b7f1-8555984c1cd9";
const project_id$1 = "2bb4daec-4a94-4b24-bf81-fcab77007c43";
const url$1 = "/__l5e/assets-v1/38ec0471-7706-46b5-b7f1-8555984c1cd9/hero-background-v2.mp4";
const r2_key$1 = "a/v1/2bb4daec-4a94-4b24-bf81-fcab77007c43/38ec0471-7706-46b5-b7f1-8555984c1cd9/hero-background-v2.mp4";
const original_filename$1 = "hero-background-v2.mp4";
const size$1 = 12879517;
const content_type$1 = "video/mp4";
const created_at$1 = "2026-09-10T23:43:13Z";
const heroVideoAsset = {
  version: version$1,
  asset_id: asset_id$1,
  project_id: project_id$1,
  url: url$1,
  r2_key: r2_key$1,
  original_filename: original_filename$1,
  size: size$1,
  content_type: content_type$1,
  created_at: created_at$1
};
(_t = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _t.call(globalThis, "src/components/home/ConversionHero.tsx");
function ConversionHero() {
  const { openSheet } = useBookingSheet();
  const reduce = useReducedMotion();
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen w-full overflow-hidden bg-m3-surface-dark", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-full h-full overflow-hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
      "video",
      {
        className: "absolute inset-0 w-full h-full object-cover object-center sm:blur-[2px] sm:scale-105",
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        preload: "auto",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx("source", { src: heroVideoAsset.url, type: "video/mp4" })
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/45 sm:to-black/10" }),
    /* @__PURE__ */ jsx("div", { className: "relative z-40 min-h-screen flex items-center", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-24 lg:py-32", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: reduce ? false : { y: 20 },
        animate: { y: 0 },
        transition: { duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
        className: "max-w-[640px]",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-m3-primary text-xs font-semibold tracking-widest uppercase mb-2 sm:mb-3 md:mb-4", children: "Where2Studios" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-[1.1] sm:leading-tight md:leading-tight mb-3 sm:mb-4 md:mb-6", children: [
            "Video coverage for conference week",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-m3-primary", children: "activations." })
          ] }),
          /* @__PURE__ */ jsx("p", { id: "answer", className: "text-sm sm:text-base md:text-lg text-white/75 max-w-md sm:max-w-lg md:max-w-2xl leading-snug sm:leading-relaxed md:leading-relaxed mb-4 sm:mb-6 md:mb-8", children: "Experience hubs, lounges, off-site HQs and side events near Moscone. Cloudflare at RSAC, Google's Pixel House, Immuta at Snowflake Summit, OwnBackup at Dreamforce. Clips by 10am the next day." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: openSheet,
                className: "h-12 inline-flex items-center justify-center rounded-lg bg-m3-primary text-m3-on-primary font-semibold text-base px-7 shadow-sm hover:brightness-110 transition-all",
                children: "Book a Call"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/work",
                className: "h-12 inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur font-medium text-base px-7 hover:bg-white/15 transition-all",
                children: "See Our Work"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white/50 text-xs sm:text-sm mt-2 sm:mt-3 mb-4 sm:mb-5", children: "Tell us your conference dates. We reply within 1 business day." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-30",
        style: {
          background: "linear-gradient(180deg, transparent 0%, hsl(var(--m3-surface-variant) / 0.7) 100%)"
        }
      }
    )
  ] });
}
(_u = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _u.call(globalThis, "src/hooks/use-mobile.tsx");
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
(_v = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _v.call(globalThis, "src/hooks/useMarqueeScroll.ts");
function useMarqueeScroll(options = {}) {
  const { speed = 40, enabled = true } = options;
  const viewportRef = React.useRef(null);
  const contentRef = React.useRef(null);
  React.useEffect(() => {
    if (!enabled) return;
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) return;
    let contentWidth = 0;
    let raf = 0;
    let lastTs = 0;
    let needsWidthUpdate = true;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === content) {
          contentWidth = entry.contentRect.width * 2;
        }
      }
    });
    ro.observe(content);
    const initRaf = requestAnimationFrame(() => {
      contentWidth = content.scrollWidth;
      viewport.scrollLeft = 0;
      needsWidthUpdate = false;
    });
    const step = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1e3;
      lastTs = ts;
      if (contentWidth > 0 && !needsWidthUpdate) {
        const newScrollLeft = viewport.scrollLeft + speed * dt;
        if (newScrollLeft >= contentWidth) {
          viewport.scrollLeft = newScrollLeft - contentWidth;
        } else {
          viewport.scrollLeft = newScrollLeft;
        }
      }
      raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(initRaf);
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed, enabled]);
  return { viewportRef, contentRef };
}
(_w = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _w.call(globalThis, "src/hooks/useCountUp.ts");
function useCountUp({ end, duration = 2e3, suffix = "", prefix = "", startDelay = 1500 }) {
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (hasAnimated) return;
    setCount(0);
    const timeout = setTimeout(() => {
      setHasAnimated(true);
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * end);
        setCount(currentCount);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [end, duration, hasAnimated, startDelay]);
  const formatted = prefix + count.toLocaleString() + suffix;
  return { ref, formatted };
}
const brandPacbio = "/assets/brand-pacbio-pgCLlzfU.svg";
const brandTurbopuffer = "/assets/brand-turbopuffer-BK1C6hKD.png";
const glyphCoinbase = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eCoinbase%3c/title%3e%3cpath%20d='M4.844%2011.053c-.872%200-1.553.662-1.553%201.548s.664%201.542%201.553%201.542c.889%200%201.564-.667%201.564-1.547%200-.875-.664-1.543-1.564-1.543zm.006%202.452c-.497%200-.86-.386-.86-.904%200-.523.357-.909.854-.909.502%200%20.866.392.866.91%200%20.517-.364.903-.86.903zm1.749-1.778h.433v2.36h.693V11.11H6.599zm-5.052-.035c.364%200%20.653.224.762.558h.734c-.133-.713-.722-1.197-1.49-1.197-.872%200-1.553.662-1.553%201.548%200%20.887.664%201.543%201.553%201.543.75%200%201.351-.484%201.484-1.203h-.728a.78.78%200%2001-.756.564c-.502%200-.855-.386-.855-.904%200-.523.347-.909.85-.909zm18.215.622l-.508-.075c-.242-.035-.415-.115-.415-.305%200-.207.225-.31.53-.31.336%200%20.55.143.595.379h.67c-.075-.599-.537-.95-1.247-.95-.733%200-1.218.375-1.218.904%200%20.506.317.8.958.892l.508.075c.249.034.387.132.387.316%200%20.236-.242.334-.577.334-.41%200-.641-.167-.676-.42h-.681c.064.581.52.99%201.35.99.757%200%201.26-.346%201.26-.938%200-.53-.364-.806-.936-.892zM7.378%209.885a.429.429%200%2000-.444.437c0%20.254.19.438.444.438a.429.429%200%2000.445-.438.429.429%200%2000-.445-.437zm10.167%202.245c0-.645-.392-1.076-1.224-1.076-.785%200-1.224.397-1.31%201.007h.687c.035-.236.22-.432.612-.432.352%200%20.525.155.525.345%200%20.248-.317.311-.71.351-.531.058-1.19.242-1.19.933%200%20.535.4.88%201.034.88.497%200%20.809-.207.965-.535.023.293.242.483.548.483h.404v-.616h-.34v-1.34zm-.68.748c0%20.397-.347.69-.769.69-.26%200-.48-.11-.48-.34%200-.293.353-.373.676-.408.312-.028.485-.097.572-.23zm-3.679-1.825c-.386%200-.71.162-.94.432V9.856h-.693v4.23h.68v-.391c.232.282.56.449.953.449.832%200%201.461-.656%201.461-1.543%200-.886-.64-1.548-1.46-1.548zm-.103%202.452c-.497%200-.86-.386-.86-.904%200-.517.369-.909.865-.909.503%200%20.855.386.855.91%200%20.517-.364.903-.86.903zm-3.187-2.452c-.45%200-.745.184-.919.443v-.385H8.29v2.975h.693v-1.617c0-.455.289-.777.716-.777.398%200%20.647.282.647.69v1.704h.692v-1.755c0-.748-.386-1.278-1.142-1.278zM24%2012.503c0-.851-.624-1.45-1.46-1.45-.89%200-1.542.668-1.542%201.548%200%20.927.698%201.543%201.553%201.543.722%200%201.287-.426%201.432-1.03h-.722c-.104.264-.358.414-.699.414-.445%200-.78-.276-.854-.76H24v-.264zm-2.252-.23c.11-.414.422-.615.78-.615.392%200%20.693.224.762.615Z'/%3e%3c/svg%3e";
const glyphStripe = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eStripe%3c/title%3e%3cpath%20d='M13.976%209.15c-2.172-.806-3.356-1.426-3.356-2.409%200-.831.683-1.305%201.901-1.305%202.227%200%204.515.858%206.09%201.631l.89-5.494C18.252.975%2015.697%200%2012.165%200%209.667%200%207.589.654%206.104%201.872%204.56%203.147%203.757%204.992%203.757%207.218c0%204.039%202.467%205.76%206.476%207.219%202.585.92%203.445%201.574%203.445%202.583%200%20.98-.84%201.545-2.354%201.545-1.875%200-4.965-.921-6.99-2.109l-.9%205.555C5.175%2022.99%208.385%2024%2011.714%2024c2.641%200%204.843-.624%206.328-1.813%201.664-1.305%202.525-3.236%202.525-5.732%200-4.128-2.524-5.851-6.594-7.305h.003z'/%3e%3c/svg%3e";
const glyphGithub = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eGitHub%3c/title%3e%3cpath%20d='M12%20.297c-6.63%200-12%205.373-12%2012%200%205.303%203.438%209.8%208.205%2011.385.6.113.82-.258.82-.577%200-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422%2018.07%203.633%2017.7%203.633%2017.7c-1.087-.744.084-.729.084-.729%201.205.084%201.838%201.236%201.838%201.236%201.07%201.835%202.809%201.305%203.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93%200-1.31.465-2.38%201.235-3.22-.135-.303-.54-1.523.105-3.176%200%200%201.005-.322%203.3%201.23.96-.267%201.98-.399%203-.405%201.02.006%202.04.138%203%20.405%202.28-1.552%203.285-1.23%203.285-1.23.645%201.653.24%202.873.12%203.176.765.84%201.23%201.91%201.23%203.22%200%204.61-2.805%205.625-5.475%205.92.42.36.81%201.096.81%202.22%200%201.606-.015%202.896-.015%203.286%200%20.315.21.69.825.57C20.565%2022.092%2024%2017.592%2024%2012.297c0-6.627-5.373-12-12-12'/%3e%3c/svg%3e";
const glyph1password = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3e1Password%3c/title%3e%3cpath%20d='M12%200c6.627%200%2012%205.373%2012%2012%200%206.628-5.373%2012-12%2012S0%2018.628%200%2012C0%205.373%205.373%200%2012%200m-.893%204.86c-.485%200-.727.001-.913.095a.87.87%200%200%200-.378.379c-.094.185-.095.428-.095.912v2.747c0%20.12%200%20.182.016.238q.02.075.065.138a1%201%200%200%200%20.175.162l.695.564c.113.092.17.139.19.194a.22.22%200%200%201%200%20.15c-.02.056-.077.102-.19.194l-.695.564a1%201%200%200%200-.175.162.4.4%200%200%200-.065.138%201%201%200%200%200-.016.238v6.019c0%20.485%200%20.728.095.913a.87.87%200%200%200%20.378.378c.186.094.428.094.913.094h1.786c.485%200%20.727%200%20.913-.094a.87.87%200%200%200%20.378-.378c.095-.185.095-.428.095-.913v-2.747c0-.12%200-.182-.016-.238a.4.4%200%200%200-.065-.138%201%201%200%200%200-.175-.162l-.695-.564c-.113-.092-.17-.138-.191-.193a.22.22%200%200%201%200-.152c.02-.055.078-.1.19-.193l.696-.564a1%201%200%200%200%20.175-.162.4.4%200%200%200%20.065-.138%201%201%200%200%200%20.016-.238V6.246c0-.484%200-.727-.095-.912a.87.87%200%200%200-.378-.379c-.186-.094-.428-.094-.913-.094Z'/%3e%3c/svg%3e";
const glyphCursor = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eCursor%3c/title%3e%3cpath%20d='M11.503.131%201.891%205.678a.84.84%200%200%200-.42.726v11.188c0%20.3.162.575.42.724l9.609%205.55a1%201%200%200%200%20.998%200l9.61-5.55a.84.84%200%200%200%20.42-.724V6.404a.84.84%200%200%200-.42-.726L12.497.131a1.01%201.01%200%200%200-.996%200M2.657%206.338h18.55c.263%200%20.43.287.297.515L12.23%2022.918c-.062.107-.229.064-.229-.06V12.335a.59.59%200%200%200-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23'/%3e%3c/svg%3e";
const glyphModal = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eModal%3c/title%3e%3cpath%20d='M4.89%205.57%200%2014.002l2.521%204.4h5.05l4.396-7.718%204.512%207.709%204.996.037L24%2014.057l-4.857-8.452-5.073-.015-2.076%203.598L9.94%205.57Zm.837.729h3.787l1.845%203.252H7.572Zm9.189.021%203.803.012%204.228%207.355-3.736-.027zm-9.82.346L6.94%209.914l-4.209%207.389-1.892-3.3Zm9.187.014%204.297%207.343-1.892%203.282-4.3-7.344zm-6.713%203.6h3.79l-4.212%207.394H3.361Zm11.64%204.109%203.74.027-1.893%203.281-3.74-.027z'/%3e%3c/svg%3e";
const glyphBraintrust = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eBraintrust%3c/title%3e%3cpath%20d='M0%2012.002C0%205.372%205.374-.002%2012.001-.002%2018.626-.002%2024%205.372%2024%2012.002c0%206.625-5.374%2012-11.999%2012h-9.98a2.01%202.01%200%200%201-2.013-2.013V12.01zm0%200'/%3e%3c/svg%3e";
const glyphCloudflare = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eCloudflare%3c/title%3e%3cpath%20d='M16.5088%2016.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559%200%200%201-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489%202.1601-.8868%202.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039%200-4.6284%201.6177-5.3876%203.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665%201.083-2.2861%202.2856-.0283.31-.0069.6128.0635.894C1.5683%2013.171%200%2014.7754%200%2016.752c0%20.1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909%200%20.1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771%200-.1611%200-.2383.0112-.0566%200-.1054.0415-.127.0976l-.3378%201.1744c-.1475.5068-.0918.9707.1543%201.3164.2256.3164.6055.498%201.0625.5195l1.8437.1133c.0557%200%20.1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527%201.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771%200%20.1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803%200-2.6025-2.125-4.727-4.7344-4.727'/%3e%3c/svg%3e";
const googleIcon = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eGoogle%3c/title%3e%3cpath%20d='M12.48%2010.92v3.28h7.84c-.24%201.84-.853%203.187-1.787%204.133-1.147%201.147-2.933%202.4-6.053%202.4-4.827%200-8.6-3.893-8.6-8.72s3.773-8.72%208.6-8.72c2.6%200%204.507%201.027%205.907%202.347l2.307-2.307C18.747%201.44%2016.133%200%2012.48%200%205.867%200%20.307%205.387.307%2012s5.56%2012%2012.173%2012c3.573%200%206.267-1.173%208.373-3.36%202.16-2.16%202.84-5.213%202.84-7.667%200-.76-.053-1.467-.173-2.053H12.48z'/%3e%3c/svg%3e";
(_x = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _x.call(globalThis, "src/components/TrustedBrands.tsx");
const MOBILE_SPEED = 24;
function TrustedBrands() {
  const isMobile = useIsMobile();
  const conventionWeeks = useCountUp({ end: 9, duration: 2e3, suffix: "+" });
  const techBrands = useCountUp({ end: 20, duration: 2e3, suffix: "+" });
  const hqFilms = useCountUp({ end: 22, duration: 2e3 });
  const trackRef = useRef(null);
  const {
    viewportRef,
    contentRef
  } = useMarqueeScroll({
    speed: 22,
    enabled: !isMobile
  });
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isMobile) return;
    const apply = () => {
      const half = track.scrollWidth / 2;
      if (half > 0) {
        track.style.setProperty("--marquee-duration", `${(half / MOBILE_SPEED).toFixed(2)}s`);
      }
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(track);
    return () => observer.disconnect();
  }, [isMobile]);
  const brands = [
    { name: "Cloudflare", glyph: glyphCloudflare },
    { name: "Google", glyph: googleIcon },
    { name: "GitHub", glyph: glyphGithub },
    { name: "1Password", glyph: glyph1password },
    { name: "Immuta" },
    { name: "ReliaQuest" },
    { name: "Cohesity" },
    { name: "Coinbase", glyph: glyphCoinbase },
    { name: "Stripe", glyph: glyphStripe },
    { name: "Salesforce" },
    { name: "turbopuffer", wordmark: brandTurbopuffer },
    { name: "Parallel" },
    { name: "LlamaIndex" },
    { name: "Braintrust", glyph: glyphBraintrust },
    { name: "Modal", glyph: glyphModal },
    { name: "Browserbase" },
    { name: "Cursor", glyph: glyphCursor },
    { name: "Xsolla" },
    { name: "Gourmet Provisions" },
    { name: "PacBio", wordmark: brandPacbio }
  ];
  const renderBrand = (brand, decorative) => {
    const textClass = "font-fredoka font-semibold text-xl sm:text-2xl text-m3-on-surface tracking-tight whitespace-nowrap leading-none";
    return /* @__PURE__ */ jsx("div", { className: "marquee-item h-10 sm:h-12 flex items-center gap-3", children: brand.wordmark ? /* @__PURE__ */ jsx(
      "img",
      {
        src: brand.wordmark,
        alt: decorative ? "" : `${brand.name} logo, a Where2Studios client`,
        "aria-hidden": decorative || void 0,
        className: "h-7 sm:h-8 w-auto max-w-[170px] sm:max-w-[210px] object-contain",
        style: { filter: "brightness(0) saturate(100%)" },
        draggable: false
      }
    ) : brand.glyph ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: brand.glyph,
          alt: "",
          "aria-hidden": "true",
          className: "h-6 sm:h-7 w-auto",
          style: { filter: "brightness(0) saturate(100%)" },
          draggable: false
        }
      ),
      /* @__PURE__ */ jsx("span", { "aria-hidden": decorative || void 0, className: textClass, children: brand.name })
    ] }) : /* @__PURE__ */ jsx("span", { "aria-hidden": decorative || void 0, className: textClass, children: brand.name }) });
  };
  return /* @__PURE__ */ jsxs("section", { className: "py-16 sm:py-20 lg:py-24 relative w-full overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-8 sm:mb-10 px-4", children: /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/50 text-xs font-semibold uppercase tracking-widest mb-2", children: "Worked with" }) }),
    /* @__PURE__ */ jsxs("div", { className: "marquee-container", children: [
      /* @__PURE__ */ jsx("div", { className: "marquee-fade marquee-fade-left" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `marquee-viewport ${isMobile ? "marquee-css-animated" : ""}`,
          ref: isMobile ? void 0 : viewportRef,
          children: /* @__PURE__ */ jsxs("div", { className: `marquee-track ${isMobile ? "marquee-track-animated" : ""}`, ref: trackRef, children: [
            /* @__PURE__ */ jsx("div", { className: "marquee-content", ref: isMobile ? void 0 : contentRef, children: brands.map(
              (brand) => /* @__PURE__ */ jsx("div", { children: renderBrand(brand, false) }, brand.name)
            ) }),
            /* @__PURE__ */ jsx("div", { className: "marquee-content", "aria-hidden": "true", children: brands.map(
              (brand) => /* @__PURE__ */ jsx("div", { children: renderBrand(brand, true) }, `${brand.name}-dup`)
            ) })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "marquee-fade marquee-fade-right" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 mt-10 sm:mt-14", ref: conventionWeeks.ref, children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-6 sm:gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums", children: conventionWeeks.formatted }),
        /* @__PURE__ */ jsx("div", { className: "text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1", children: "Conference weeks covered" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", ref: techBrands.ref, children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums", children: techBrands.formatted }),
        /* @__PURE__ */ jsx("div", { className: "text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1", children: "Tech brands" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", ref: hqFilms.ref, children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums", children: hqFilms.formatted }),
        /* @__PURE__ */ jsx("div", { className: "text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1", children: "Activation films" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums", children: "10am" }),
        /* @__PURE__ */ jsx("div", { className: "text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1", children: "Next morning clip delivery" })
      ] })
    ] }) }) })
  ] });
}
(_y = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _y.call(globalThis, "src/components/techweek/TechWeekCallout.tsx");
function TechWeekHomeBlock() {
  const phase = useTechWeekPhase();
  if (!isTechWeekPromoLive(phase)) return null;
  const heading = phase.kind === "live" ? "We are on the ground at Tech Week this week. Clips back the next morning." : "We cover Tech Week side events and send the first clip back the next morning.";
  return /* @__PURE__ */ jsx(
    "section",
    {
      "data-techweek-promo": true,
      className: "bg-m3-surface-dark border-y border-m3-on-dark/10 py-8 sm:py-10",
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-m3-primary text-xs font-semibold uppercase tracking-widest", children: "SF Tech Week, October 5 to 11, 2026" }),
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-dark mt-2", children: heading }),
        /* @__PURE__ */ jsxs(Link, { to: "/sf-tech-week", className: "m3-filled-button text-sm px-6 py-3 mt-5 inline-flex items-center gap-2", children: [
          "See Tech Week coverage",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] })
    }
  );
}
function TechWeekInlineCallout() {
  const phase = useTechWeekPhase();
  if (!isTechWeekPromoLive(phase)) return null;
  return /* @__PURE__ */ jsx("div", { "data-techweek-promo": true, className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs(
    Link,
    {
      to: "/sf-tech-week",
      className: "m3-outlined-card flex items-center justify-between gap-3 p-4 max-w-3xl hover:border-m3-primary transition-colors",
      children: [
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-m3-on-surface/80", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-m3-on-surface", children: "SF Tech Week, Oct 5 to 11." }),
          " Next morning recaps for side events and sponsors."
        ] }),
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-m3-primary shrink-0" })
      ]
    }
  ) });
}
(_z = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _z.call(globalThis, "src/components/home/UpcomingConventions.tsx");
function UpcomingConventions() {
  const now = useConventionClock();
  const next = conventions.map((convention) => ({ convention, ...getConventionStatus(convention, now) })).sort((a, b) => {
    var _a2, _b2;
    return (((_a2 = a.edition) == null ? void 0 : _a2.start) ?? "9999").localeCompare(((_b2 = b.edition) == null ? void 0 : _b2.start) ?? "9999");
  }).slice(0, 3);
  return /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-14 bg-m3-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface", children: "Coming up near Moscone" }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/conventions",
          className: "inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm",
          children: [
            "Full calendar",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-3 gap-4 mt-6", children: next.map(({ convention, edition, phase }) => /* @__PURE__ */ jsxs(
      Link,
      {
        to: conventionHref(convention),
        className: "m3-outlined-card p-4 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-fredoka font-semibold text-m3-on-surface", children: convention.name }),
            /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-m3-primary/15 text-m3-primary text-[10px] font-semibold px-2.5 py-1", children: statusChip(convention, phase) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70 mt-1.5", children: edition ? formatEditionRange(edition) : `${nextUnknownYear(convention)} dates to be announced` })
        ]
      },
      convention.slug
    )) })
  ] }) });
}
(_A = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _A.call(globalThis, "src/lib/utils.ts");
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
(_B = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _B.call(globalThis, "src/components/ui/button.tsx");
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size: size2, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size: size2, className })), ref, ...props });
  }
);
Button.displayName = "Button";
(_C = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _C.call(globalThis, "src/components/ui/carousel.tsx");
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(
  ({ className, variant = "outline", size: size2 = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size: size2,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(
  ({ className, variant = "outline", size: size2 = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size: size2,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
(_D = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _D.call(globalThis, "src/data/deliverables.ts");
const deliverables$1 = [
  {
    id: "activation-recap",
    title: "Activation recap",
    line: "The film of the week, ready for the sponsorship deck.",
    icon: Film
  },
  {
    id: "exec-clips",
    title: "Exec clips for LinkedIn",
    line: "Your CEO and speakers, cut while the show is still on.",
    icon: Mic
  },
  {
    id: "social-cutdowns",
    title: "Same week social cutdowns",
    line: "Vertical and square versions your sales team posts all quarter.",
    icon: Share2
  },
  {
    id: "full-week-coverage",
    title: "Full week coverage",
    line: "A crew on site from load in to the last dinner.",
    icon: CalendarDays
  }
];
(_E = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _E.call(globalThis, "src/components/home/ServiceLanes.tsx");
function ServiceLanes() {
  const reduce = useReducedMotion();
  const [api, setApi] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  const renderCard = (item) => /* @__PURE__ */ jsxs("div", { className: "h-full m3-outlined-card p-6 sm:p-8 flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(item.icon, { className: "w-6 h-6 text-m3-primary" }) }),
      /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-lg sm:text-xl font-semibold text-m3-on-surface", children: item.title })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/80", children: item.line })
  ] });
  return /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-20 lg:py-24 bg-m3-surface-variant", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { y: 20 },
        whileInView: { y: 0 },
        viewport: { once: true, amount: 0.1 },
        className: "text-center mb-10 sm:mb-12",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface", children: "What we do" }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/why-a-dedicated-crew",
              className: "inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm mt-3",
              children: [
                "Why a dedicated crew",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "md:hidden -mx-4 sm:-mx-8", children: [
      /* @__PURE__ */ jsx(
        Carousel,
        {
          setApi,
          opts: { align: "start", loop: false, duration: reduce ? 0 : 25 },
          className: "w-full",
          children: /* @__PURE__ */ jsx(CarouselContent, { className: "-ml-0", children: deliverables$1.map((item, index) => /* @__PURE__ */ jsx(
            CarouselItem,
            {
              className: `basis-[88%] sm:basis-[80%] pr-3 ${index === 0 ? "pl-4 sm:pl-8" : "pl-0"}`,
              children: renderCard(item)
            },
            item.id
          )) })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center gap-2", children: deliverables$1.map((_, index) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => api == null ? void 0 : api.scrollTo(index),
          "aria-label": `Go to item ${index + 1} of ${deliverables$1.length}`,
          "aria-current": activeIndex === index ? "true" : void 0,
          className: `h-2 my-3 box-content py-4 px-4 bg-clip-content rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 ${activeIndex === index ? "w-6 bg-m3-primary" : "w-2 bg-m3-on-surface/20"}`
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: deliverables$1.map((item, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1 },
        children: renderCard(item)
      },
      item.id
    )) })
  ] }) });
}
(_F = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _F.call(globalThis, "src/hooks/useCaseStudy.ts");
function usePhotoProjects() {
  return useQuery({
    queryKey: ["photo-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("media_type", "photo").eq("published", true).eq("show_on_main_site", true).order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    }
  });
}
function useCaseStudy(slug) {
  return useQuery({
    queryKey: ["case-study", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).eq("published", true).single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });
}
function useAllProjects(options) {
  return useQuery({
    queryKey: ["all-projects", options == null ? void 0 : options.category],
    queryFn: async () => {
      let query = supabase.from("projects").select("*").eq("published", true).eq("show_on_main_site", true).order("display_order", { ascending: true });
      if ((options == null ? void 0 : options.category) && options.category !== "all") {
        query = query.eq("category", options.category);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
}
function useUploadedVideoProjects(limit = 4) {
  return useQuery({
    queryKey: ["uploaded-video-projects", limit],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("source", "upload").eq("media_type", "video").eq("published", true).eq("show_on_main_site", true).order("display_order", { ascending: true }).limit(limit);
      if (error) throw error;
      return data;
    }
  });
}
(_G = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _G.call(globalThis, "src/hooks/useProjects.ts");
function proofWall(all, slugs) {
  return slugs.map((slug) => all.find((p) => p.slug === slug)).filter((p) => !!p && p.show_on_main_site !== false);
}
function getYouTubeVideoId$1(url2) {
  if (!url2) return null;
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url2.match(regex);
  return match ? match[1] : null;
}
function getYouTubeThumbnail(videoUrl) {
  const videoId = getYouTubeVideoId$1(videoUrl);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
function getThumbnail(project) {
  if (project.thumbnail_url) return project.thumbnail_url;
  const ytThumbnail = getYouTubeThumbnail(project.video_url);
  if (ytThumbnail) return ytThumbnail;
  return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop";
}
function useProjects(options = {}) {
  return useQuery({
    queryKey: ["projects", options],
    queryFn: async () => {
      let query = supabase.from("projects").select("*").eq("show_on_main_site", true).order("display_order", { ascending: true });
      if (options.category && options.category !== "all") {
        query = query.eq("category", options.category);
      }
      if (options.featured !== void 0) {
        query = query.eq("featured", options.featured);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
}
(_H = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _H.call(globalThis, "src/lib/video.ts");
function isYouTubeUrl(url2) {
  if (!url2) return false;
  return /(?:youtube\.com|youtu\.be)/i.test(url2);
}
function getYouTubeVideoId(url2) {
  if (!url2) return null;
  const shortMatch = url2.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url2.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (longMatch) return longMatch[1];
  const embedMatch = url2.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
}
function getYouTubeEmbedUrl(url2, options = {}) {
  const id = getYouTubeVideoId(url2);
  if (!id) return null;
  const params = new URLSearchParams();
  params.set("rel", "0");
  params.set("modestbranding", "1");
  if (options.autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
  }
  if (options.loop) {
    params.set("loop", "1");
    params.set("playlist", id);
  }
  if (options.controls === false) params.set("controls", "0");
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
function isVimeoUrl(url2) {
  if (!url2) return false;
  return /vimeo\.com/i.test(url2);
}
function getVimeoVideoId(url2) {
  if (!url2) return null;
  const match = url2.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}
function getVimeoEmbedUrl(url2, options = {}) {
  const id = getVimeoVideoId(url2);
  if (!id) return null;
  const params = new URLSearchParams();
  if (options.autoplay) {
    params.set("autoplay", "1");
    params.set("muted", "1");
  } else if (options.mute) {
    params.set("muted", "1");
  }
  if (options.loop) params.set("loop", "1");
  if (options.controls === false) params.set("controls", "0");
  const query = params.toString();
  return query ? `https://player.vimeo.com/video/${id}?${query}` : `https://player.vimeo.com/video/${id}`;
}
function isDirectVideoUrl(url2) {
  if (!url2) return false;
  if (isYouTubeUrl(url2) || isVimeoUrl(url2)) return false;
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url2);
}
function isPortraitMedia(media) {
  const { width, height } = media;
  if (!width || !height) return false;
  return height > width;
}
function getVideoEmbedUrl(url2, options = {}) {
  if (isVimeoUrl(url2)) return getVimeoEmbedUrl(url2, options);
  return getYouTubeEmbedUrl(url2, options);
}
(_I = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _I.call(globalThis, "src/components/home/FeaturedCaseStudies.tsx");
const FILTER_LABELS = {
  "convention-week": "Conference Activations",
  "event-recaps": "Event Recap",
  "brand-films": "Brand Film"
};
const FLAGSHIP_SLUG = "the-agent-open-san-francisco";
const CLOSING_SLUG = "google-pixel-house-nba-all-star-2025";
const EXCLUDED_SLUGS = [FLAGSHIP_SLUG, CLOSING_SLUG];
function isRecent(project) {
  if (/\b(202[5-9]|20[3-9]\d)\b/.test(project.title)) return true;
  return (project.created_at || "").startsWith("2026");
}
function getCorporateLabel$1(title) {
  const lower = title.toLowerCase();
  if (lower.includes("recap")) return "Recap";
  if (lower.includes("montage")) return "Montage";
  if (lower.includes("interview")) return "Recap";
  return "Corporate";
}
function getCategoryLabel(project) {
  return project.category === "corporate" ? getCorporateLabel$1(project.title) : FILTER_LABELS[project.category] || project.category;
}
function MediaBlock({ project }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project);
  if (project.video_url && (isYouTubeUrl(project.video_url) || isVimeoUrl(project.video_url))) {
    const embed = getVideoEmbedUrl(project.video_url, { autoplay: false, controls: true });
    const host = isVimeoUrl(project.video_url) ? "Vimeo" : "YouTube";
    if (isPortraitMedia(project)) {
      return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full overflow-hidden bg-m3-surface-dark", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: thumbnail,
            alt: "",
            "aria-hidden": "true",
            className: "absolute inset-0 w-full h-full object-cover scale-110 blur-xl brightness-[0.45]"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: embed,
            className: "h-full max-w-full aspect-[9/16]",
            title: project.title,
            "aria-label": `Watch ${project.title} on ${host}`,
            allow: "autoplay; fullscreen; picture-in-picture",
            allowFullScreen: true
          }
        ) })
      ] });
    }
    return /* @__PURE__ */ jsx("div", { className: "relative w-full h-full overflow-hidden bg-m3-surface-dark", children: /* @__PURE__ */ jsx(
      "iframe",
      {
        src: embed,
        className: "absolute inset-0 w-full h-full",
        title: project.title,
        "aria-label": `Watch ${project.title} on ${host}`,
        allow: "autoplay; fullscreen; picture-in-picture",
        allowFullScreen: true
      }
    ) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full overflow-hidden bg-m3-surface-dark", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: thumbnail,
        alt: `Video still from the ${project.title} project by Where2Studios`,
        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
        loading: "lazy"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-m3-surface-dark/60 via-transparent to-transparent" }),
    project.video_url && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-m3-primary/90 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx(Play, { className: "w-7 h-7 text-m3-on-primary fill-current ml-0.5" }) }) })
  ] });
}
function FlagshipCard({ project }) {
  const reduce = useReducedMotion();
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: reduce ? 0 : 0.6 },
      whileHover: reduce ? void 0 : { y: -4 },
      children: /* @__PURE__ */ jsx(
        Link,
        {
          to: `/work/${project.slug || project.id}`,
          "aria-label": `Read the ${project.title} case study`,
          className: "group block m3-elevated-card overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-background",
          children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-5 gap-0", children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-3 aspect-video lg:aspect-auto lg:min-h-[420px]", children: /* @__PURE__ */ jsx(MediaBlock, { project }) }),
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center gap-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-m3-secondary text-xs font-semibold uppercase tracking-widest", children: getCategoryLabel(project) }),
              project.client_name && /* @__PURE__ */ jsx("span", { className: "inline-flex self-start px-3 py-1 rounded-full bg-m3-surface-variant text-m3-on-surface text-xs font-semibold", children: project.client_name }),
              /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-3xl lg:text-4xl font-semibold text-m3-on-surface group-hover:text-m3-primary transition-colors", children: project.title }),
              project.result && /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/70 text-base lg:text-lg", children: project.result }),
              /* @__PURE__ */ jsxs("span", { className: "m3-filled-button inline-flex items-center gap-2 self-start mt-2", children: [
                "Watch the film",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
function SupportingCard({ project, index }) {
  const reduce = useReducedMotion();
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.1 * index },
      whileHover: reduce ? void 0 : { y: -4 },
      children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/work/${project.slug || project.id}`,
          "aria-label": `Read the ${project.title} case study`,
          className: "group block m3-elevated-card overflow-hidden h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-background",
          children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-video", children: /* @__PURE__ */ jsx(MediaBlock, { project }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-m3-secondary text-xs font-semibold uppercase tracking-widest", children: getCategoryLabel(project) }),
              /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-xl font-semibold text-m3-on-surface group-hover:text-m3-primary transition-colors line-clamp-2", children: project.title }),
              project.result && /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70 line-clamp-2", children: project.result }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-m3-primary font-medium text-sm mt-1", children: [
                "Watch the film",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function CaseStudyCardInner({ project }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project);
  const categoryLabel = project.category === "corporate" ? getCorporateLabel$1(project.title) : FILTER_LABELS[project.category] || project.category;
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: `/work/${project.slug || project.id}`,
      className: "group block m3-elevated-card overflow-hidden hover:shadow-xl transition-all duration-300 h-full",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: thumbnail,
              alt: `Video still from the ${project.title} project by Where2Studios`,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-m3-surface-dark/80 via-transparent to-transparent" }),
          project.video_url && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-m3-primary/90 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx(Play, { className: "w-6 h-6 text-m3-on-primary fill-current ml-0.5" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-m3-surface/90 text-m3-on-surface text-xs font-semibold shadow-sm", children: categoryLabel }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-lg font-semibold text-m3-on-surface mb-2 line-clamp-1 group-hover:text-m3-primary transition-colors", children: project.title }),
          project.result && /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70 line-clamp-2 mb-3", children: project.result }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-m3-primary font-medium text-sm group-hover:gap-3 transition-all", children: [
            "Watch the film",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] })
      ]
    }
  );
}
function FeaturedCaseStudies() {
  const { data: allProjects, isLoading } = useAllProjects();
  const reduce = useReducedMotion();
  const [api, setApi] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  useEffect(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  const flagship = allProjects == null ? void 0 : allProjects.find((p) => p.slug === FLAGSHIP_SLUG);
  const closing = allProjects == null ? void 0 : allProjects.find((p) => p.slug === CLOSING_SLUG);
  const pool = (allProjects || []).filter(
    (p) => p.category === "convention-week" && !EXCLUDED_SLUGS.includes(p.slug || "") && isRecent(p)
  ).sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  const rsacPool = pool.filter((p) => p.convention_slug === "rsac");
  const pickPool = rsacPool.length > 0 ? rsacPool : pool;
  const poolKey = pickPool.map((p) => p.id).join(",");
  useEffect(() => {
    const ids = poolKey ? poolKey.split(",") : [];
    if (ids.length === 0) {
      setPicked(null);
      return;
    }
    setPicked(ids[Math.floor(Math.random() * ids.length)]);
  }, [poolKey]);
  if (isLoading) {
    return /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-20 lg:py-24 bg-m3-surface", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] bg-m3-surface-variant rounded-2xl animate-pulse" }, i)) }) }) });
  }
  if (!flagship) {
    return null;
  }
  const rotating = (picked ? pool.find((p) => p.id === picked) : pool[0]) || pool[0];
  const supporting = [rotating, closing].filter((p) => Boolean(p));
  const mobileProjects = [flagship, ...supporting];
  return /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-20 lg:py-24 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { y: 20 },
        whileInView: { y: 0 },
        viewport: { once: true, amount: 0.1 },
        className: "text-center mb-10 sm:mb-12",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mb-3", children: "Recent conference week work" }),
          /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/70 text-base sm:text-lg max-w-2xl mx-auto", children: "Activations, hospitality suites and side events in San Francisco." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "md:hidden -mx-4 sm:-mx-8", children: [
      /* @__PURE__ */ jsx(
        Carousel,
        {
          setApi,
          opts: { align: "start", loop: false, duration: reduce ? 0 : 25 },
          className: "w-full",
          children: /* @__PURE__ */ jsx(CarouselContent, { className: "-ml-0", children: mobileProjects.map((project, index) => /* @__PURE__ */ jsx(
            CarouselItem,
            {
              className: `basis-[88%] sm:basis-[80%] pr-3 ${index === 0 ? "pl-4 sm:pl-8" : "pl-0"}`,
              children: /* @__PURE__ */ jsx(CaseStudyCardInner, { project })
            },
            project.id
          )) })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center gap-2", children: mobileProjects.map((_, index) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => api == null ? void 0 : api.scrollTo(index),
          "aria-label": `Go to project ${index + 1} of ${mobileProjects.length}`,
          "aria-current": activeIndex === index ? "true" : void 0,
          className: `h-2 my-3 box-content py-4 px-4 bg-clip-content rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 ${activeIndex === index ? "w-6 bg-m3-primary" : "w-2 bg-m3-on-surface/20"}`
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex md:flex-col gap-6", children: [
      flagship && /* @__PURE__ */ jsx(FlagshipCard, { project: flagship }),
      supporting.length > 0 && /* @__PURE__ */ jsx("div", { className: `grid gap-6 ${supporting.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"}`, children: supporting.map((p, i) => /* @__PURE__ */ jsx(SupportingCard, { project: p, index: i }, p.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/work",
        className: "m3-outlined-button inline-flex items-center gap-2",
        children: [
          "See Our Work",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ]
      }
    ) })
  ] }) });
}
const Helmet = mod.Helmet;
mod.HelmetProvider;
mod.HelmetData;
(_J = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _J.call(globalThis, "src/components/portfolio/PhotoLightbox.tsx");
function PhotoLightbox({ photos, activeIndex, onClose, onNavigate }) {
  const active = activeIndex === null ? null : photos[activeIndex];
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((activeIndex + 1) % photos.length);
      if (event.key === "ArrowLeft") onNavigate((activeIndex - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, photos.length, onClose, onNavigate]);
  if (!active) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": active.title,
      onClick: onClose,
      className: "fixed inset-0 z-[190] bg-m3-surface-dark/95 flex items-center justify-center p-4",
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            "aria-label": "Close photo",
            className: "absolute top-4 right-4 p-2 rounded-full bg-m3-surface/90 text-m3-on-surface",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: active.url,
            alt: active.title,
            onClick: (event) => event.stopPropagation(),
            className: "max-h-[90vh] max-w-full w-auto object-contain rounded-xl"
          }
        )
      ]
    }
  );
}
(_K = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _K.call(globalThis, "src/lib/portfolioMedia.ts");
const PORTFOLIO_BUCKET = "portfolio";
const RESUMABLE_THRESHOLD = 6 * 1024 * 1024;
const VIDEO_EXTENSIONS = ["mp4", "mov", "webm", "m4v"];
const PHOTO_EXTENSIONS = ["jpg", "jpeg", "png", "heic", "heif", "webp"];
const UPLOAD_ACCEPT = "video/mp4,video/quicktime,video/webm,image/jpeg,image/png,image/heic,image/heif,image/webp,.mp4,.mov,.webm,.jpg,.jpeg,.png,.heic,.heif,.webp";
function fileExtension(name) {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}
function detectMediaType(file) {
  const ext = fileExtension(file.name);
  if (file.type.startsWith("video/") || VIDEO_EXTENSIONS.includes(ext)) return "video";
  if (file.type.startsWith("image/") || PHOTO_EXTENSIONS.includes(ext)) return "photo";
  return null;
}
function titleFromFilename(name) {
  let base = name.replace(/\.[^.]+$/, "");
  base = base.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  base = base.replace(/\s+(?:v|ver|version)\s?\d+$/i, "");
  base = base.replace(/\s+(?:final|draft|copy|export|edit|render)$/i, "");
  base = base.replace(/\s+\(\d+\)$/, "");
  return base.trim();
}
function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
function buildStoragePath(folder, filename) {
  const ext = fileExtension(filename);
  const base = slugify(titleFromFilename(filename)) || "media";
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${folder}/${base}-${stamp}${rand}${ext ? `.${ext}` : ""}`;
}
function getPortfolioPublicUrl(path) {
  return supabase.storage.from(PORTFOLIO_BUCKET).getPublicUrl(path).data.publicUrl;
}
function portfolioPathFromUrl(url2) {
  if (!url2) return null;
  const marker = `/storage/v1/object/public/${PORTFOLIO_BUCKET}/`;
  const idx = url2.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url2.slice(idx + marker.length).split("?")[0]);
}
function isUploadedVideo(project) {
  return project.source === "upload" && (project.media_type ?? "video") === "video";
}
async function extractVideoMeta(file) {
  const url2 = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  video.crossOrigin = "anonymous";
  video.src = url2;
  try {
    await new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => reject(new Error("metadata timeout")), 2e4);
      video.onloadedmetadata = () => {
        window.clearTimeout(timer);
        resolve();
      };
      video.onerror = () => {
        window.clearTimeout(timer);
        reject(new Error("cannot read video"));
      };
    });
    const duration = Number.isFinite(video.duration) ? video.duration : null;
    const width = video.videoWidth || null;
    const height = video.videoHeight || null;
    let poster = null;
    try {
      const target = duration && duration > 1.2 ? 1 : 0.1;
      await new Promise((resolve, reject) => {
        const timer = window.setTimeout(() => reject(new Error("seek timeout")), 2e4);
        video.onseeked = () => {
          window.clearTimeout(timer);
          resolve();
        };
        video.currentTime = target;
      });
      const canvas = document.createElement("canvas");
      canvas.width = width || 1280;
      canvas.height = height || 720;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        poster = await new Promise(
          (resolve) => canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.82)
        );
      }
    } catch {
      poster = null;
    }
    return { duration, width, height, poster };
  } finally {
    URL.revokeObjectURL(url2);
    video.removeAttribute("src");
  }
}
async function readImageSize(file) {
  const url2 = URL.createObjectURL(file);
  try {
    return await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth || null, height: img.naturalHeight || null });
      img.onerror = () => resolve({ width: null, height: null });
      img.src = url2;
    });
  } finally {
    URL.revokeObjectURL(url2);
  }
}
async function simpleUpload(path, body, contentType) {
  const { error } = await supabase.storage.from(PORTFOLIO_BUCKET).upload(path, body, {
    contentType,
    upsert: false
  });
  if (error) throw error;
}
async function resumableUpload(path, file, contentType, onProgress) {
  var _a2;
  const { data } = await supabase.auth.getSession();
  const token = (_a2 = data.session) == null ? void 0 : _a2.access_token;
  if (!token) throw new Error("You need to be signed in to upload.");
  const endpoint = `${"https://ndnuwfsuanbjjtfflbfc.supabase.co"}/storage/v1/upload/resumable`;
  await new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint,
      retryDelays: [0, 1e3, 3e3, 6e3, 12e3],
      headers: {
        authorization: `Bearer ${token}`,
        "x-upsert": "false"
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName: PORTFOLIO_BUCKET,
        objectName: path,
        contentType,
        cacheControl: "3600"
      },
      chunkSize: 6 * 1024 * 1024,
      onError: (error) => reject(error),
      onProgress: (sent, total) => onProgress == null ? void 0 : onProgress(total ? sent / total : 0),
      onSuccess: () => resolve()
    });
    upload.start();
  });
}
async function uploadPortfolioFile(path, body, contentType, onProgress) {
  if (body.size > RESUMABLE_THRESHOLD) {
    await resumableUpload(path, body, contentType, onProgress);
  } else {
    await simpleUpload(path, body, contentType);
    onProgress == null ? void 0 : onProgress(1);
  }
  return getPortfolioPublicUrl(path);
}
async function removePortfolioObjects(paths) {
  const clean = paths.filter(Boolean);
  if (clean.length === 0) return;
  const { error } = await supabase.storage.from(PORTFOLIO_BUCKET).remove(clean);
  if (error) throw error;
}
const UPLOAD_CATEGORIES = [
  { value: "convention-week", label: "Conference Activations" },
  { value: "event-recaps", label: "Event Recaps" },
  { value: "brand-films", label: "Brand Films" },
  { value: "photos", label: "Photos" }
];
function portfolioImageUrl(url2, width, quality = 75) {
  if (!url2) return url2;
  const marker = "/storage/v1/object/public/";
  if (!url2.includes(marker)) return url2;
  const rendered = url2.replace(marker, "/storage/v1/render/image/public/");
  return `${rendered}?width=${width}&quality=${quality}&resize=contain`;
}
const PORTFOLIO_IMAGE_WIDTHS = [600, 900, 1200];
function portfolioImageSrcSet(url2) {
  if (!url2 || !url2.includes("/storage/v1/object/public/")) return void 0;
  return PORTFOLIO_IMAGE_WIDTHS.map((w) => `${portfolioImageUrl(url2, w)} ${w}w`).join(", ");
}
(_L = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _L.call(globalThis, "src/components/home/FromTheFloor.tsx");
const PHOTO_COUNT = 8;
function FloorVideo({ project }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setVisible(entry.isIntersecting);
        const video = videoRef.current;
        if (!video || reduce) return;
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => void 0);
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);
  const poster = project.thumbnail_url ?? void 0;
  return /* @__PURE__ */ jsx("div", { ref: wrapRef, className: "aspect-video overflow-hidden rounded-2xl bg-m3-surface-dark", children: /* @__PURE__ */ jsx(
    "video",
    {
      ref: videoRef,
      src: visible || reduce ? project.video_url ?? void 0 : void 0,
      poster,
      title: project.title,
      "aria-label": project.title,
      preload: visible ? "metadata" : "none",
      playsInline: true,
      muted: true,
      loop: true,
      onMouseEnter: (event) => {
        if (!reduce) return;
        event.currentTarget.muted = true;
        event.currentTarget.play().catch(() => void 0);
      },
      onMouseLeave: (event) => {
        if (!reduce) return;
        event.currentTarget.pause();
      },
      className: "w-full h-full object-cover"
    }
  ) });
}
function FromTheFloor() {
  const { data: videos } = useUploadedVideoProjects(4);
  const { data: allPhotos } = usePhotoProjects();
  const [activeIndex, setActiveIndex] = useState(null);
  const ordered = [
    ...(allPhotos ?? []).filter((p) => p.featured),
    ...(allPhotos ?? []).filter((p) => !p.featured)
  ];
  const photos = ordered.slice(0, PHOTO_COUNT).map((photo) => ({
    id: photo.id,
    title: photo.title,
    url: photo.thumbnail_url || "",
    width: photo.width,
    height: photo.height
  }));
  const gallerySchema = photos.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": "https://where2studios.com/#event-photography",
    name: "Event photography from the floor",
    associatedMedia: photos.map((photo) => ({
      "@type": "ImageObject",
      contentUrl: photo.url,
      name: photo.title,
      width: photo.width ?? void 0,
      height: photo.height ?? void 0,
      creator: { "@id": "https://where2studios.com/#business" },
      copyrightHolder: { "@id": "https://where2studios.com/#business" },
      contentLocation: "San Francisco, CA",
      license: "https://where2studios.com/terms",
      acquireLicensePage: "https://where2studios.com/contact",
      creditText: "Where2Studios"
    }))
  } : null;
  return /* @__PURE__ */ jsxs("section", { className: "py-16 sm:py-20 lg:py-24 bg-m3-background", children: [
    gallerySchema && /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(gallerySchema) }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsx("span", { className: "text-m3-secondary text-xs font-semibold uppercase tracking-widest", children: "Photo and video" }),
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-background mt-2 mb-3", children: "Stills and build montages from the floor" }),
        /* @__PURE__ */ jsx("p", { className: "text-m3-on-background/70", children: "Photo selects and build films ship with every conference booking." })
      ] }),
      videos && videos.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10", children: videos.map((project) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/work/${project.slug || project.id}`,
          className: "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary rounded-2xl",
          children: [
            /* @__PURE__ */ jsx(FloorVideo, { project }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs sm:text-sm text-m3-on-background/70 line-clamp-2 group-hover:text-m3-primary transition-colors", children: project.title })
          ]
        },
        project.id
      )) }),
      photos.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-4 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: photos.map((photo, index) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveIndex(index),
          "aria-label": `Open photo, ${photo.title}`,
          className: "shrink-0 basis-[46%] sm:basis-auto snap-start overflow-hidden rounded-2xl aspect-square focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: portfolioImageUrl(photo.url, 900),
              srcSet: portfolioImageSrcSet(photo.url),
              sizes: "(min-width: 640px) 25vw, 46vw",
              alt: `${photo.title}, event photography by Where2Studios in San Francisco`,
              width: photo.width ?? void 0,
              height: photo.height ?? void 0,
              loading: "lazy",
              decoding: "async",
              className: "w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            }
          )
        },
        photo.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/work?view=photos",
          className: "m3-outlined-button inline-flex items-center gap-2 text-sm",
          children: [
            "See all photos and films",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      PhotoLightbox,
      {
        photos,
        activeIndex,
        onClose: () => setActiveIndex(null),
        onNavigate: setActiveIndex
      }
    )
  ] });
}
(_M = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _M.call(globalThis, "src/components/figma/ImageWithFallback.tsx");
function ImageWithFallback({
  src,
  alt,
  className,
  style,
  fallback = "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop"
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: imgSrc,
      alt,
      className,
      style,
      onError: handleError,
      loading: "lazy"
    }
  );
}
const joshuaPhoto = "/assets/team-joshua-DlkPiMKm.png";
const danielPhoto = "/assets/team-daniel-BWKzwI79.png";
const ryanPhoto = "/assets/team-ryan-DD5SMFNX.png";
const gavinPhoto = "/assets/team-gavin-CW0k5CU8.png";
const anthonyPhoto = "/assets/team-member-1-CgNtzih6.png";
const josephPhoto = "/assets/team-member-2-DEzeFjf7.png";
(_N = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _N.call(globalThis, "src/components/Team.tsx");
function Team({ limit } = {}) {
  const teamMembers2 = [
    {
      name: "Joshua Saltiban",
      role: "CEO",
      image: joshuaPhoto
    },
    {
      name: "Gavin Legaspi",
      role: "Creative Director",
      image: gavinPhoto
    },
    {
      name: "Daniel Martinez",
      role: "Operations Lead",
      image: danielPhoto
    },
    {
      name: "Ryan Sison",
      role: "Lead Videographer",
      image: ryanPhoto
    },
    {
      name: "Anthony Gonzalez",
      role: "Content Producer",
      image: anthonyPhoto
    },
    {
      name: "Joseph Jimenez",
      role: "Lead Photographer",
      image: josephPhoto
    }
  ];
  const visibleMembers = limit ? teamMembers2.slice(0, limit) : teamMembers2;
  return /* @__PURE__ */ jsx("section", { id: "team", className: "relative py-16 sm:py-20 lg:py-24 bg-m3-background overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 relative z-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-12", children: [
      /* @__PURE__ */ jsx(
        motion.h2,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          viewport: { once: true },
          className: "font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mb-3",
          children: "Who you'll work with"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          viewport: { once: true },
          className: "text-m3-on-surface/70 text-base sm:text-lg max-w-2xl mx-auto",
          children: "The team behind every shoot."
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto", children: visibleMembers.map((member, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: index * 0.05 },
        viewport: { once: true },
        children: /* @__PURE__ */ jsxs("div", { className: "m3-outlined-card overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "relative aspect-square overflow-hidden bg-m3-surface-variant", children: /* @__PURE__ */ jsx(
            ImageWithFallback,
            {
              src: member.image,
              alt: `Portrait of ${member.name} of the Where2Studios team`,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 text-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-base font-bold text-m3-on-surface truncate", children: member.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-m3-secondary font-medium", children: member.role })
          ] })
        ] })
      },
      member.name
    )) }),
    limit && limit < teamMembers2.length && /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/who-we-are",
        className: "inline-flex items-center gap-2 text-m3-primary font-medium hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-background rounded",
        children: [
          "Meet the full team",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ]
      }
    ) })
  ] }) });
}
(_O = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _O.call(globalThis, "src/components/home/FinalCTA.tsx");
function FinalCTA() {
  const { openSheet } = useBookingSheet();
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-16 sm:py-20 lg:py-24 bg-m3-surface-dark", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { y: 20 },
      whileInView: { y: 0 },
      viewport: { once: true, amount: 0.1 },
      className: "max-w-3xl mx-auto text-center",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-dark mb-3", children: "Let's make something worth watching." }),
        /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/50 text-sm mb-8", children: "We reply within 1 business day." }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: openSheet,
            className: "m3-filled-button text-base sm:text-lg px-8 py-4",
            children: "Book a Call"
          }
        ) })
      ]
    }
  ) }) });
}
(_P = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _P.call(globalThis, "src/components/Footer.tsx");
function Footer() {
  const { openSheet } = useBookingSheet();
  const techWeekPhase = useTechWeekPhase();
  const showTechWeek = isTechWeekPromoLive(techWeekPhase);
  const links = [
    { label: "Work", href: "/work" },
    { label: "Conference calendar", href: "/conventions" },
    { label: "Services", href: "/services" },
    { label: "Why a dedicated crew", href: "/why-a-dedicated-crew" },
    { label: "About", href: "/who-we-are" },
    { label: "Contact", href: "/contact" }
  ];
  const services = [
    ...showTechWeek ? [{ label: "SF Tech Week video coverage", href: "/sf-tech-week", promo: true }] : [],
    { label: "Event recap videos in the Bay Area", href: "/event-recap-videos" },
    { label: "Activation recap", href: "/services#activation-recap" },
    { label: "Exec clips for LinkedIn", href: "/services#exec-clips" },
    { label: "Same week social cutdowns", href: "/services#social-cutdowns" },
    { label: "Full week coverage", href: "/services#full-week-coverage" }
  ];
  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" }
  ];
  return /* @__PURE__ */ jsx("footer", { className: "relative py-12 sm:py-16 pb-24 sm:pb-28 bg-m3-surface-dark text-m3-on-dark", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 sm:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2 lg:col-span-1", children: [
        /* @__PURE__ */ jsx("div", { className: "font-fredoka text-m3-primary text-xl font-medium mb-3", children: "Where2Studios" }),
        /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/60 text-sm mb-1 max-w-xs", children: "Video coverage for conference week activations." }),
        /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/50 text-xs mb-4 max-w-xs", children: "Activation recaps, exec clips and same week social cutdowns, San Francisco." }),
        /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/40 text-xs mb-4", children: "We reply within 1 business day." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: openSheet,
            className: "m3-filled-button text-sm",
            children: "Book a Call"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-sm font-medium text-m3-on-dark mb-4", children: "Links" }),
        /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-2", children: links.map((link) => /* @__PURE__ */ jsx(
          Link,
          {
            to: link.href,
            className: "text-m3-on-dark/70 hover:text-m3-on-dark text-sm transition-colors",
            children: link.label
          },
          link.label
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-sm font-medium text-m3-on-dark mb-4", children: "Services" }),
        /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-2", children: services.map((link) => /* @__PURE__ */ jsx(
          Link,
          {
            to: link.href,
            ..."promo" in link && link.promo ? { "data-techweek-promo": true } : {},
            className: "text-m3-on-dark/70 hover:text-m3-on-dark text-sm transition-colors",
            children: link.label
          },
          link.label
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-sm font-medium text-m3-on-dark mb-4", children: "Legal" }),
        /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-2", children: legalLinks.map((link) => /* @__PURE__ */ jsx(
          Link,
          {
            to: link.href,
            className: "text-m3-on-dark/70 hover:text-m3-on-dark text-sm transition-colors",
            children: link.label
          },
          link.label
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-m3-on-dark/10 pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-m3-on-dark/50", children: "© 2026 Where2Studios. All rights reserved." }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-m3-on-dark/40", children: "San Francisco Bay Area" })
    ] }) })
  ] }) });
}
(_Q = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Q.call(globalThis, "src/components/layout/FloatingCTA.tsx");
function FloatingCTA({
  label = "Book a Call",
  hideWhenVisibleId = "contact",
  scrollToId: scrollToId2,
  mobileOnly = false
}) {
  const { openSheet } = useBookingSheet();
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const target = document.getElementById(hideWhenVisibleId);
    if (!target) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, [hideWhenVisibleId]);
  const handleClick = () => {
    var _a2;
    if (scrollToId2) {
      (_a2 = document.getElementById(scrollToId2)) == null ? void 0 : _a2.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start"
      });
      return;
    }
    openSheet();
  };
  return /* @__PURE__ */ jsx(
    motion.button,
    {
      onClick: handleClick,
      animate: {
        opacity: hidden ? 0 : 1,
        y: reduce ? 0 : hidden ? 20 : 0,
        pointerEvents: hidden ? "none" : "auto"
      },
      transition: { duration: reduce ? 0 : 0.3 },
      whileHover: reduce ? void 0 : { scale: 1.05 },
      whileTap: reduce ? void 0 : { scale: 0.95 },
      style: {
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        right: "max(1rem, env(safe-area-inset-right))"
      },
      className: `m3-filled-button fixed sm:!bottom-6 sm:!right-6 z-50 rounded-full shadow-lg px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-on-primary focus-visible:ring-offset-2 ${mobileOnly ? "md:hidden" : ""}`,
      "aria-label": label,
      children: label
    }
  );
}
(_R = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _R.call(globalThis, "src/components/SEOHead.tsx");
const SITE_URL$3 = "https://where2studios.com";
const BUILD_DATE = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
const areaServed$1 = [
  { "@type": "City", name: "San Francisco" },
  { "@type": "City", name: "Oakland" },
  { "@type": "City", name: "San Jose" },
  { "@type": "City", name: "Sunnyvale" },
  { "@type": "City", name: "Berkeley" },
  { "@type": "City", name: "Union City" },
  { "@type": "City", name: "Fremont" },
  { "@type": "City", name: "Santa Clara" },
  { "@type": "City", name: "Palo Alto" },
  { "@type": "AdministrativeArea", name: "San Francisco Bay Area" }
];
const knowsAbout = [
  "conference week video coverage",
  "activation film",
  "event recap video",
  "conference video production",
  "event videography",
  "highlight reel",
  "speaker reel",
  "brand activation video",
  "Event Photography"
];
const BUSINESS_DESCRIPTION = "Where2Studios produces event recap videos for conferences, summits and brand activations in San Francisco, San Jose and across the Bay Area. Next day teasers, speaker clips, full recap edits.";
const sameAs = [
  "https://www.instagram.com/where2studios/",
  "https://www.linkedin.com/company/where2studios/"
];
const LOGO_URL = `${SITE_URL$3}/email-assets/logo-circle.png`;
const OG_IMAGE_URL = `${SITE_URL$3}/og/home.png`;
function absoluteUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL$3}${path.startsWith("/") ? path : `/${path}`}`;
}
const BRAND_SUFFIX = " | Where2Studios";
const TITLE_MAX = 65;
function normalizeTitle(raw) {
  let base = raw.replace(/\s*\|\s*Where2Studios(\s+Case Study)?\s*$/i, "").trim();
  while (base.length + BRAND_SUFFIX.length > TITLE_MAX && base.includes(" | ")) {
    const shorter = base.slice(0, base.lastIndexOf(" | ")).trim();
    if (shorter.length + BRAND_SUFFIX.length < 35) break;
    base = shorter;
  }
  let full = base.length + BRAND_SUFFIX.length <= TITLE_MAX ? `${base}${BRAND_SUFFIX}` : base;
  if (full.length > TITLE_MAX) {
    full = full.slice(0, TITLE_MAX);
    const cut = full.lastIndexOf(" ");
    if (cut > 40) full = full.slice(0, cut);
    full = full.replace(/[,;:.\-\s|]+$/, "");
  }
  return full;
}
const DESCRIPTION_TAIL = " Where2Studios covers conference week activations, suites and side events in San Francisco.";
function normalizeDescription(raw) {
  let d = raw.replace(/\s+/g, " ").trim();
  if (d.length < 90) {
    d = `${d}${d.endsWith(".") ? "" : "."}${DESCRIPTION_TAIL}`.trim();
  }
  if (d.length > 158) {
    const sentenceEnd = d.lastIndexOf(". ", 158);
    if (sentenceEnd >= 90) {
      d = d.slice(0, sentenceEnd + 1);
    } else {
      d = d.slice(0, 158);
      const cut = d.lastIndexOf(" ");
      if (cut > 90) d = d.slice(0, cut);
      d = d.replace(/[,;:\-\s]+$/, "");
    }
  }
  return d;
}
const SEGMENT_LABELS = {
  work: "Work",
  conventions: "Conference calendar",
  services: "Services",
  contact: "Contact",
  socials: "Social media management",
  "backyard-bayou-socials": "Social media management",
  "who-we-are": "About",
  "sf-tech-week": "SF Tech Week",
  "event-recap-videos": "Event recap videos",
  "why-a-dedicated-crew": "Why a dedicated crew",
  where2boys: "Where2Boys",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  accessibility: "Accessibility",
  "404": "Page not found",
  admin: "Admin",
  login: "Login"
};
function humanize(segment) {
  return SEGMENT_LABELS[segment] ?? segment.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function buildBreadcrumb(pathname, leafName) {
  const segments = pathname.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL$3 }];
  let acc = "";
  segments.forEach((segment, index) => {
    acc += `/${segment}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: index === segments.length - 1 ? leafName : humanize(segment),
      item: `${SITE_URL$3}${acc}`
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
  };
}
function SEOHead({
  title,
  description,
  ogTitle,
  image = "/og/home.png",
  imageAlt,
  imageWidth = 1200,
  imageHeight = 630,
  url: url2,
  canonical,
  robots = "index, follow, max-image-preview:large, max-snippet:-1",
  type = "website",
  schema: schema2,
  answer,
  breadcrumbName
}) {
  const location2 = useLocation();
  const fullTitle = normalizeTitle(title);
  const socialTitle = ogTitle || fullTitle;
  const metaDescription = normalizeDescription(description);
  const rawPath = canonical || url2 || location2.pathname || "/";
  const absolute = absoluteUrl(rawPath);
  const pageUrl = absolute === `${SITE_URL$3}/` ? absolute : absolute.replace(/\/$/, "");
  const imageUrl = absoluteUrl(image);
  const imageType = /\.jpe?g(\?|$)/i.test(imageUrl) ? "image/jpeg" : "image/png";
  const pathname = pageUrl.replace(SITE_URL$3, "") || "/";
  const provided = schema2 ? Array.isArray(schema2) ? schema2 : [schema2] : [];
  const schemas = [...provided];
  const hasBreadcrumb = provided.some((item) => {
    const t = item == null ? void 0 : item["@type"];
    return Array.isArray(t) ? t.includes("BreadcrumbList") : t === "BreadcrumbList";
  });
  if (!hasBreadcrumb && pathname !== "/") {
    schemas.push(buildBreadcrumb(pathname, breadcrumbName || fullTitle.replace(BRAND_SUFFIX, "")));
  }
  if (answer) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: fullTitle,
      description: metaDescription,
      inLanguage: "en-US",
      isPartOf: { "@id": `${SITE_URL$3}/#website` },
      about: { "@id": `${SITE_URL$3}/#business` },
      dateModified: BUILD_DATE,
      primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#answer"]
      }
    });
  }
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: robots }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: socialTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: imageUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: String(imageWidth) }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: String(imageHeight) }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:type", content: imageType }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: imageAlt || socialTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: pageUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Where2Studios" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "en_US" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: socialTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: imageUrl }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image:alt", content: imageAlt || socialTitle }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: pageUrl }),
    schemas.map((item, i) => /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(item) }, i))
  ] });
}
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${SITE_URL$3}/#business`,
  name: "Where2Studios",
  url: SITE_URL$3,
  logo: LOGO_URL,
  image: OG_IMAGE_URL,
  description: BUSINESS_DESCRIPTION,
  email: "contact@where2studios.com",
  priceRange: "$$$",
  // Replace with the real street address and postal code once the Google Business Profile is set up,
  // and keep geo.position in index.html in sync with it.
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco Bay Area",
    addressRegion: "CA",
    addressCountry: "US"
  },
  areaServed: areaServed$1,
  knowsAbout,
  sameAs,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Video production services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Recap Video Production" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conference and Summit Coverage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Speaker and Panel Clips" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Activation Films" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Content and Management" } }
    ]
  }
};
(_S = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _S.call(globalThis, "src/pages/HomePage.tsx");
function HomePage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Conference Week Video Coverage, San Francisco | Where2Studios",
        ogTitle: "Where2Studios",
        description: "Conference week video coverage in San Francisco. Activation, suite and side event films for Cloudflare, Google, Immuta and OwnBackup, with clips by 10am.",
        url: "https://where2studios.com/",
        image: "/og/home.png",
        imageAlt: "Conference week video coverage",
        answer: true,
        breadcrumbName: "Home",
        schema: organizationSchema
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-background text-m3-on-background", children: [
      /* @__PURE__ */ jsx(Navbar, { variant: "dark" }),
      /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "relative outline-none", children: [
        /* @__PURE__ */ jsx(ConversionHero, {}),
        /* @__PURE__ */ jsx(TechWeekHomeBlock, {}),
        /* @__PURE__ */ jsx(UpcomingConventions, {}),
        /* @__PURE__ */ jsx(TrustedBrands, {}),
        /* @__PURE__ */ jsx(ServiceLanes, {}),
        /* @__PURE__ */ jsx(FeaturedCaseStudies, {}),
        /* @__PURE__ */ jsx(FromTheFloor, {}),
        /* @__PURE__ */ jsx(Team, { limit: 4 }),
        /* @__PURE__ */ jsx(FinalCTA, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(FloatingCTA, {})
    ] })
  ] });
}
(_T = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _T.call(globalThis, "src/components/portfolio/UploadVideo.tsx");
function UploadVideo({ src, poster, title, hoverPreview = false, className = "" }) {
  const ref = useRef(null);
  const handleEnter = () => {
    if (!hoverPreview) return;
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => void 0);
  };
  const handleLeave = () => {
    if (!hoverPreview) return;
    const video = ref.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };
  return /* @__PURE__ */ jsx(
    "video",
    {
      ref,
      src,
      poster: poster ?? void 0,
      title,
      "aria-label": title,
      preload: "none",
      playsInline: true,
      muted: hoverPreview,
      controls: !hoverPreview,
      onMouseEnter: handleEnter,
      onMouseLeave: handleLeave,
      onClick: (event) => {
        if (!hoverPreview) return;
        const video = event.currentTarget;
        video.controls = true;
        video.muted = false;
        video.play().catch(() => void 0);
      },
      className: className || "w-full h-full object-cover"
    }
  );
}
(_U = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _U.call(globalThis, "src/components/portfolio/PhotoGrid.tsx");
function PhotoGrid({ photos }) {
  const [activeIndex, setActiveIndex] = useState(null);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]", children: photos.map((photo, index) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveIndex(index),
        className: "mb-6 block w-full overflow-hidden rounded-2xl m3-elevated-card group focus:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: portfolioImageUrl(photo.url, 900),
            srcSet: portfolioImageSrcSet(photo.url),
            sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
            alt: photo.title,
            width: photo.width ?? void 0,
            height: photo.height ?? void 0,
            loading: "lazy",
            decoding: "async",
            className: "w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          }
        )
      },
      photo.id
    )) }),
    /* @__PURE__ */ jsx(
      PhotoLightbox,
      {
        photos,
        activeIndex,
        onClose: () => setActiveIndex(null),
        onNavigate: setActiveIndex
      }
    )
  ] });
}
(_V = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _V.call(globalThis, "src/components/layout/KeepReading.tsx");
const BASE_LINKS = [
  { label: "Conference calendar", href: "/conventions" },
  { label: "Why a dedicated crew", href: "/why-a-dedicated-crew" },
  { label: "Our work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" }
];
function KeepReading({
  links,
  className = ""
}) {
  const phase = useTechWeekPhase();
  const { pathname } = useLocation();
  const here = pathname.replace(/\/+$/, "") || "/";
  const all = links ?? (isTechWeekPromoLive(phase) ? [...BASE_LINKS, { label: "SF Tech Week coverage", href: "/sf-tech-week" }] : BASE_LINKS);
  const items = all.filter((item) => (item.href.replace(/\/+$/, "") || "/") !== here);
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsx("section", { className: `py-8 bg-m3-background border-t border-m3-on-surface/10 ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-m3-on-surface/50", children: "Keep reading" }),
    /* @__PURE__ */ jsx("nav", { className: "mt-3 flex flex-wrap gap-x-5 gap-y-2", children: items.map((item) => /* @__PURE__ */ jsx(
      Link,
      {
        to: item.href,
        className: "text-sm text-m3-on-surface/75 underline hover:text-m3-primary transition-colors",
        children: item.label
      },
      item.href
    )) })
  ] }) });
}
(_W = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _W.call(globalThis, "src/pages/WorkPage.tsx");
const CATEGORIES = ["all", "convention-week", "event-recaps", "brand-films"];
const CATEGORY_LABELS$1 = {
  all: "All",
  "convention-week": "Conference Activations",
  "event-recaps": "Event Recaps",
  "brand-films": "Brand Films",
  photos: "Photos"
};
function FilterChip({ label, active, onClick }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      className: `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${active ? "bg-m3-primary text-m3-on-primary shadow-md" : "bg-m3-surface text-m3-on-surface hover:bg-m3-primary/10 border border-m3-outline"}`,
      children: label
    }
  );
}
function getCorporateLabel(title) {
  const lower = title.toLowerCase();
  if (lower.includes("recap")) return "Recap";
  if (lower.includes("montage")) return "Montage";
  if (lower.includes("interview")) return "Recap";
  return "Corporate";
}
function ProjectCard$1({ project, index }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project);
  const categoryLabel = project.category === "corporate" ? getCorporateLabel(project.title) : CATEGORY_LABELS$1[project.category] || project.category;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/work/${project.slug || project.id}`,
          className: "group block m3-elevated-card overflow-hidden hover:shadow-xl transition-all duration-300",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
              isUploadedVideo(project) && project.video_url ? /* @__PURE__ */ jsx(
                UploadVideo,
                {
                  src: project.video_url,
                  poster: thumbnail,
                  title: project.title,
                  hoverPreview: true,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsx(
                "img",
                {
                  src: thumbnail,
                  alt: `Event recap video for ${project.title}`,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none bg-gradient-to-t from-m3-surface-dark/80 via-transparent to-transparent" }),
              project.video_url && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-m3-primary/90 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx(Play, { className: "w-5 h-5 text-m3-on-primary fill-current ml-0.5" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-m3-surface/90 text-m3-on-surface text-xs font-semibold shadow-sm", children: categoryLabel }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-base font-semibold text-m3-on-surface mb-1 line-clamp-1 group-hover:text-m3-primary transition-colors", children: project.title }),
              project.result && /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/60 line-clamp-2 mb-2", children: project.result }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-m3-primary font-medium text-sm group-hover:gap-2 transition-all", children: [
                "Watch the film",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function WorkPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const requested = viewParam && [...CATEGORIES, "photos"].includes(viewParam) ? viewParam : "all";
  const activeCategory = mounted ? requested : "all";
  const [sortBy, setSortBy] = useState("featured");
  const setActiveCategory = (category) => {
    const next = new URLSearchParams(searchParams);
    if (category === "all") next.delete("view");
    else next.set("view", category);
    setSearchParams(next, { replace: true });
  };
  const { data: projects, isLoading } = useAllProjects({
    category: activeCategory === "all" ? void 0 : activeCategory
  });
  const { data: photos } = usePhotoProjects();
  const hasPhotos = ((photos == null ? void 0 : photos.length) ?? 0) > 0;
  const visibleCategories = hasPhotos ? [...CATEGORIES, "photos"] : CATEGORIES;
  const showPhotos = activeCategory === "photos";
  const sortedProjects = projects == null ? void 0 : projects.filter((project) => project.media_type !== "photo").slice().sort((a, b) => {
    if (sortBy === "featured") {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.display_order ?? 0) - (b.display_order ?? 0);
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-variant", children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Event Recap Video Portfolio | Bay Area Event Films | Where2Studios",
        description: "See our event recap videos: conference recaps, summit coverage, brand activations and corporate event films shot across San Francisco, San Jose and the Bay Area.",
        url: "https://where2studios.com/work",
        schema: {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Event Recap Video Portfolio",
          url: "https://where2studios.com/work",
          description: "Event recap videos, conference and summit coverage, brand activation films and corporate event videography by Where2Studios in the San Francisco Bay Area.",
          isPartOf: { "@id": "https://where2studios.com/#website" },
          about: { "@id": "https://where2studios.com/#event-recap-video-production" }
        }
      }
    ),
    /* @__PURE__ */ jsx(Navbar, { variant: "light" }),
    /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "outline-none", children: [
      /* @__PURE__ */ jsx("section", { className: "pt-28 pb-8 sm:pt-40 sm:pb-12 bg-m3-surface-variant", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 30 },
          animate: { y: 0 },
          transition: { duration: 0.8 },
          className: "max-w-3xl",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-m3-primary text-xs font-semibold uppercase tracking-widest", children: "Portfolio" }),
            /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2", children: "Event recap videos and brand films we've shipped" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl", children: "Recaps from conferences, summits, brand activations and corporate events across San Francisco, San Jose and the Bay Area." }),
            /* @__PURE__ */ jsx("p", { className: "mt-3", children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/event-recap-videos",
                className: "inline-flex items-center gap-1.5 text-sm font-medium text-m3-primary hover:gap-2 transition-all",
                children: [
                  "How our event recap video production works",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ) })
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsx("section", { className: "sticky top-[var(--nav-h)] z-50 bg-m3-surface-variant backdrop-blur-sm py-4", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: visibleCategories.map((cat) => /* @__PURE__ */ jsx(
          FilterChip,
          {
            label: CATEGORY_LABELS$1[cat],
            active: activeCategory === cat,
            onClick: () => setActiveCategory(cat)
          },
          cat
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "w-4 h-4 text-m3-on-surface/50" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: sortBy,
              onChange: (e) => setSortBy(e.target.value),
              className: "bg-m3-surface border border-m3-outline rounded-lg px-3 py-2 text-sm text-m3-on-surface",
              children: [
                /* @__PURE__ */ jsx("option", { value: "featured", children: "Featured" }),
                /* @__PURE__ */ jsx("option", { value: "recent", children: "Most Recent" })
              ]
            }
          )
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: showPhotos ? /* @__PURE__ */ jsx(
        PhotoGrid,
        {
          photos: (photos ?? []).map((photo) => ({
            id: photo.id,
            title: photo.title,
            url: photo.thumbnail_url || "",
            width: photo.width,
            height: photo.height
          }))
        }
      ) : isLoading ? /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] bg-m3-surface rounded-2xl animate-pulse" }, i)) }) : sortedProjects && sortedProjects.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: sortedProjects.map((project, index) => /* @__PURE__ */ jsx(ProjectCard$1, { project, index }, project.id)) }) : /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "text-center py-16",
          children: [
            /* @__PURE__ */ jsx(Grid3X3, { className: "w-12 h-12 text-m3-on-surface/30 mx-auto mb-4" }),
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl font-semibold text-m3-on-surface mb-2", children: "Coming Soon" }),
            /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/60 max-w-md mx-auto", children: "New projects are on the way. Check back soon or contact us to discuss your project." })
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface", children: "Ready to be next?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-m3-on-surface/60", children: "Book a strategy call and we'll map deliverables, timeline, and budget." }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-m3-on-surface/40 text-sm", children: "Free 30 minute strategy call, we reply within 1 business day." }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "m3-filled-button inline-flex items-center gap-2 text-lg", children: "Book a Call" }) })
      ] }) }),
      /* @__PURE__ */ jsx(KeepReading, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(FloatingCTA, {})
  ] });
}
(_X = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _X.call(globalThis, "src/components/ui/accordion.tsx");
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
(_Y = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Y.call(globalThis, "src/pages/EventRecapVideosPage.tsx");
const PAGE_DESCRIPTION$3 = "Event recap videos for conferences, summits, brand activations and corporate events in the San Francisco Bay Area. Next day teaser edits, speaker and panel clips, full recap edits, vertical cutdowns.";
const SHORT_ANSWER = "An event recap video is a short film that turns your event into content you can keep using. Where2Studios covers conferences, summits and brand activations across the San Francisco Bay Area, then delivers a next day teaser, a full recap edit, speaker and panel clips, and vertical cutdowns for social.";
const deliverables = [
  {
    title: "Full recap edit",
    line: "Your hero asset, 60 to 120 seconds, built around the story of the day."
  },
  {
    title: "Next day teaser edit",
    line: "A short cut you can post while people are still talking about the event."
  },
  {
    title: "Speaker and panel clips",
    line: "Standalone clips of the talks and panels worth sharing on their own."
  },
  {
    title: "Vertical cutdowns",
    line: "Reframed versions sized for Instagram, TikTok and LinkedIn."
  },
  { title: "Photo selects", line: "Edited stills from the day for decks, recaps and press." }
];
const steps = [
  { n: "01", title: "Strategy call", line: "We learn the goal, the audience and where the video needs to run." },
  { n: "02", title: "Shot list and run of show", line: "We map moments, speakers and timing against your schedule." },
  { n: "03", title: "Coverage day", line: "Our crew shoots the room, the stage, the details and the interviews." },
  { n: "04", title: "Delivery", line: "Teaser first, then the full recap, clips, verticals and photo selects." }
];
const eventTypes = [
  "Tech conferences and summits",
  "Corporate offsites and all hands",
  "Product launches and brand activations",
  "Festivals and food events",
  "Nonprofit galas and fundraisers",
  "Sports and community events"
];
const faqs$2 = [
  {
    q: "What is an event recap video?",
    a: "A short edit that captures what your event was about. Most brands use it for follow up email, social and next year promotion."
  },
  {
    q: "How much does an event recap video cost in the Bay Area?",
    a: "Quote based, not a fixed package. It depends on event length, crew size, deliverables and turnaround. Book a call and we scope it same day."
  },
  {
    q: "How fast can you turn around a recap?",
    a: "The teaser comes first so you have something to post right away. The full recap, clips and verticals follow once the edit is locked."
  },
  {
    q: "What is the difference between a teaser and a full recap?",
    a: "The teaser is a short cut built for speed. The full recap is the 60 to 120 second hero edit with more of the story."
  },
  {
    q: "How many shooters do you send?",
    a: "It depends on the event. We size the crew on the call so nothing important gets missed."
  },
  {
    q: "Do you cover multi day conferences?",
    a: "Yes. We plan coverage day by day against your run of show and keep the same crew across the event."
  },
  {
    q: "Do you handle photo as well as video?",
    a: "Yes. You can add edited photo selects to any event package, shot by the same team."
  },
  {
    q: "Do you help with posting and distribution?",
    a: "Yes. We also offer social media management and content distribution if you want the recap posted and cut per platform."
  }
];
function EventProjectCard({ project, index }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.05 },
      children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/work/${project.slug || project.id}`,
          className: "group block m3-elevated-card overflow-hidden hover:shadow-xl transition-all duration-300",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: thumbnail,
                  alt: `Event recap video for ${project.title}`,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-m3-surface-dark/80 via-transparent to-transparent" }),
              project.video_url && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-m3-primary/90 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx(Play, { className: "w-5 h-5 text-m3-on-primary fill-current ml-0.5" }) }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-base font-semibold text-m3-on-surface mb-1 line-clamp-1 group-hover:text-m3-primary transition-colors", children: project.title }),
              project.result && /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/60 line-clamp-2 mb-2", children: project.result }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-m3-primary font-medium text-sm group-hover:gap-2 transition-all", children: [
                "Watch the film",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function EventRecapVideosPage() {
  const { openSheet } = useBookingSheet();
  const { data: recaps } = useAllProjects({ category: "event-recaps" });
  const { data: events } = useAllProjects({ category: "events" });
  const proof = [...recaps || [], ...events || []].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.display_order ?? 0) - (b.display_order ?? 0);
  }).slice(0, 6);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Event Recap Video Production",
    serviceType: "Event Recap Video Production",
    description: PAGE_DESCRIPTION$3,
    url: "https://where2studios.com/event-recap-videos",
    provider: { "@id": "https://where2studios.com/#business" },
    areaServed: areaServed$1,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Event recap video deliverables",
      itemListElement: deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d.title, description: d.line }
      }))
    }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs$2.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://where2studios.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://where2studios.com/services" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Event Recap Videos",
        item: "https://where2studios.com/event-recap-videos"
      }
    ]
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Event Recap Videos for Bay Area Conferences",
        description: PAGE_DESCRIPTION$3,
        answer: true,
        url: "https://where2studios.com/event-recap-videos",
        schema: [serviceSchema, faqSchema, breadcrumbSchema]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-variant", children: [
      /* @__PURE__ */ jsx(Navbar, { variant: "light" }),
      /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "outline-none", children: [
        /* @__PURE__ */ jsx("section", { className: "pt-28 pb-10 sm:pt-40 sm:pb-14", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            className: "max-w-3xl",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-m3-primary text-xs font-semibold uppercase tracking-widest", children: "Event Recap Videos" }),
              /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2", children: "Event recap videos for Bay Area conferences and brand events" }),
              /* @__PURE__ */ jsx("p", { id: "answer", className: "mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-2xl", children: SHORT_ANSWER }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start gap-3 mt-6", children: [
                /* @__PURE__ */ jsx("button", { onClick: openSheet, className: "m3-filled-button text-sm px-6 py-3", children: "Book a Call" }),
                /* @__PURE__ */ jsx(Link, { to: "/work", className: "m3-outlined-button text-sm px-6 py-3", children: "See Event Recaps" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/50 text-xs mt-3", children: "We reply within 1 business day." })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "pb-8", children: /* @__PURE__ */ jsx(TechWeekInlineCallout, {}) }),
        /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-8", children: "What you get" }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: deliverables.map((d) => /* @__PURE__ */ jsxs("div", { className: "m3-outlined-card p-5 h-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-m3-primary shrink-0" }),
              /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-base font-semibold text-m3-on-surface", children: d.title })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70", children: d.line })
          ] }, d.title)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-8", children: "How it works" }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: steps.map((s) => /* @__PURE__ */ jsxs("div", { className: "m3-elevated-card p-5 h-full", children: [
            /* @__PURE__ */ jsx("div", { className: "text-m3-primary font-fredoka text-sm font-semibold mb-2", children: s.n }),
            /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-base font-semibold text-m3-on-surface mb-1", children: s.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70", children: s.line })
          ] }, s.n)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6", children: "Events we cover" }),
          /* @__PURE__ */ jsx("ul", { className: "grid sm:grid-cols-2 gap-x-8 gap-y-2 max-w-3xl", children: eventTypes.map((type) => /* @__PURE__ */ jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm sm:text-base text-m3-on-surface/80",
              children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-m3-primary mt-1 shrink-0" }),
                type
              ]
            },
            type
          )) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-4", children: "Where we shoot" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm sm:text-base text-m3-on-surface/75", children: [
            /* @__PURE__ */ jsx("p", { children: "Most of our event work happens in San Francisco, Oakland and San Jose. We travel for multi day conferences." }),
            /* @__PURE__ */ jsx("p", { children: "We also shoot Sunnyvale, Santa Clara and Palo Alto, plus Berkeley, Fremont and Union City in the East Bay." })
          ] })
        ] }) }),
        proof.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-8", children: "Recent event recaps" }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: proof.map((project, index) => /* @__PURE__ */ jsx(EventProjectCard, { project, index }, project.id)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6", children: "Event recap video FAQ" }),
          /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs$2.map((faq, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${i}`, children: [
            /* @__PURE__ */ jsx(AccordionTrigger, { "data-faq-question": true, className: "text-left text-sm sm:text-base text-m3-on-surface", children: faq.q }),
            /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm text-m3-on-surface/70", children: faq.a })
          ] }, `faq-${i}`)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface", children: "Got an event on the calendar?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-m3-on-surface/60 max-w-xl mx-auto", children: "Tell us the event and the dates. We reply within 1 business day." }),
          /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx("button", { onClick: openSheet, className: "m3-filled-button text-lg px-8 py-4", children: "Book a Call" }) })
        ] }) }),
        /* @__PURE__ */ jsx(KeepReading, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(FloatingCTA, {})
    ] })
  ] });
}
(_Z = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Z.call(globalThis, "src/components/layout/PageLayout.tsx");
function PageLayout({
  children,
  navVariant = "dark",
  keepReading = true
}) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-background text-m3-on-background", children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(Navbar, { variant: navVariant }),
    /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "relative outline-none", children: [
      children,
      keepReading && /* @__PURE__ */ jsx(KeepReading, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
(__ = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : __.call(globalThis, "src/components/ProjectCard.tsx");
function ProjectCard({ project, index = 0, aspectRatio = "vertical", onClick }) {
  const thumbnail = getThumbnail(project);
  const isHorizontal = aspectRatio === "horizontal";
  const [portraitStill, setPortraitStill] = useState(false);
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      className: "group cursor-pointer active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary rounded-2xl",
      onClick: handleClick,
      ...onClick ? {
        role: "button",
        tabIndex: 0,
        "aria-label": `Play ${project.title}`,
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
          }
        }
      } : {},
      children: /* @__PURE__ */ jsx("div", { className: `m3-elevated-card overflow-hidden ${isHorizontal ? "aspect-video" : "aspect-[9/16]"}`, children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full", children: [
        portraitStill ? /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: thumbnail,
              alt: "",
              "aria-hidden": "true",
              className: "absolute inset-0 w-full h-full object-cover scale-110 blur-xl brightness-[0.45]"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: thumbnail,
              alt: `Video still from the ${project.title} project by Where2Studios`,
              className: "h-full w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
            }
          ) })
        ] }) : /* @__PURE__ */ jsx(
          "img",
          {
            src: thumbnail,
            alt: `Video still from the ${project.title} project by Where2Studios`,
            onLoad: (event) => {
              const img = event.currentTarget;
              if (img.naturalHeight > img.naturalWidth) setPortraitStill(true);
            },
            className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-m3-surface-dark via-m3-surface-dark/20 to-transparent opacity-80" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 hidden sm:flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-m3-surface flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl", children: /* @__PURE__ */ jsx(Play, { className: "w-6 h-6 text-m3-on-surface fill-current ml-0.5" }) }) }),
        project.result && !isHorizontal && /* @__PURE__ */ jsxs("div", { className: `absolute top-2 sm:top-4 right-2 sm:right-4 bg-m3-surface-dark/70 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 flex items-center gap-1 max-w-[80%]`, children: [
          /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3 shrink-0 text-m3-on-dark/70" }),
          /* @__PURE__ */ jsx("span", { className: "text-m3-on-dark text-[10px] sm:text-xs font-semibold truncate", children: project.result })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3 sm:p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-m3-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1", children: project.category }),
          /* @__PURE__ */ jsx("h3", { className: `font-fredoka font-semibold text-m3-on-dark line-clamp-2 ${isHorizontal ? "text-sm sm:text-lg" : "text-sm sm:text-xl"}`, children: project.title })
        ] })
      ] }) })
    }
  );
}
(_$ = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _$.call(globalThis, "src/components/VideoModal.tsx");
function VideoModal({ isOpen, onClose, videoUrl, title, portrait = false }) {
  const isDirect = isDirectVideoUrl(videoUrl);
  const embedUrl = isDirect ? null : getVideoEmbedUrl(videoUrl, { autoplay: true });
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-[200] flex items-center justify-center p-4",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-m3-surface-dark/95 backdrop-blur-xl" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-4 right-4 z-10 p-3 rounded-full bg-m3-on-dark/10 hover:bg-m3-on-dark/20 text-m3-on-dark transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            transition: { type: "spring", damping: 25, stiffness: 300 },
            className: `relative z-10 m3-elevated-card overflow-hidden ${portrait ? "h-[78vh] max-h-[78vh] aspect-[9/16] w-auto max-w-full" : "w-full max-w-5xl aspect-video"}`,
            onClick: (e) => e.stopPropagation(),
            children: isDirect && videoUrl ? /* @__PURE__ */ jsx(
              "video",
              {
                src: videoUrl,
                title: title || "Video",
                "aria-label": title || "Video",
                controls: true,
                autoPlay: true,
                playsInline: true,
                className: "w-full h-full object-contain bg-m3-surface-dark"
              }
            ) : embedUrl ? /* @__PURE__ */ jsx(
              "iframe",
              {
                src: embedUrl,
                title: title || "Video",
                className: "w-full h-full",
                allow: "autoplay; fullscreen; picture-in-picture",
                allowFullScreen: true
              }
            ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-m3-surface-dark", children: /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/50", children: "Video not available" }) })
          }
        ),
        title && /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            className: "absolute bottom-8 text-m3-on-dark text-lg font-medium",
            children: title
          }
        )
      ]
    }
  ) });
}
(_aa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _aa.call(globalThis, "src/components/techweek/TechWeekCountdown.tsx");
function TechWeekCountdown({ className = "" }) {
  const phase = useTechWeekPhase();
  let text = null;
  if (phase.kind === "live") text = `Tech Week is live, day ${phase.day} of 7`;
  else if (phase.kind === "countdown")
    text = phase.days === 1 ? "SF Tech Week starts tomorrow" : `${phase.days} days until SF Tech Week`;
  if (!text) return null;
  return /* @__PURE__ */ jsx("p", { className: `font-fredoka font-semibold text-m3-primary ${className}`, "aria-live": "polite", children: text });
}
(_ba = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ba.call(globalThis, "src/components/techweek/TechWeekForm.tsx");
const schema$1 = z.object({
  name: z.string().trim().min(1, "Add your name").max(100),
  email: z.string().trim().min(1, "Add your email").email("Add a valid email").max(255),
  company: z.string().trim().min(1, "Add your company").max(120),
  eventDates: z.string().trim().min(1, "Add your date").max(120),
  venue: z.string().trim().min(1, "Add a venue or neighborhood").max(120),
  need: z.string().trim().min(1, "Pick what you need")
});
const empty$1 = {
  name: "",
  email: "",
  company: "",
  eventDates: "",
  venue: "",
  need: ""
};
function TechWeekForm({ preselected, onPreselect }) {
  const [values, setValues] = useState(empty$1);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const need = preselected || values.need;
  const set = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: void 0 }));
    if (key === "need") onPreselect(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = schema$1.safeParse({ ...values, need });
    if (!parsed.success) {
      const next = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) next[err.path[0]] = err.message;
      });
      setErrors(next);
      return;
    }
    setSubmitting(true);
    try {
      await submitContact({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        service: parsed.data.need,
        timeline: parsed.data.eventDates,
        message: `SF Tech Week 2026 request.
Event date or dates: ${parsed.data.eventDates}
Venue or neighborhood: ${parsed.data.venue}
What they need: ${parsed.data.need}`,
        source: "sf-tech-week"
      });
      toast.success("Got it. We will get back to you about your Tech Week date.");
      setDone(true);
      setValues(empty$1);
      onPreselect("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };
  const inputClass = "w-full rounded-xl bg-m3-surface border border-m3-outline px-4 py-3 text-sm text-m3-on-surface placeholder:text-m3-on-surface/40 focus:outline-none focus:ring-2 focus:ring-m3-primary";
  const labelClass = "block text-xs font-semibold text-m3-on-surface/70 mb-1.5";
  if (done) {
    return /* @__PURE__ */ jsxs("div", { role: "status", "aria-live": "polite", className: "m3-elevated-card p-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-m3-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsx(Check, { className: "w-7 h-7 text-m3-primary" }) }),
      /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-2xl font-semibold text-m3-on-surface mb-2", children: "Got it." }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70", children: "We reply within one business day. During Tech Week week we reply same day." }),
      /* @__PURE__ */ jsx("button", { onClick: () => setDone(false), className: "m3-text-button text-m3-primary mt-4", children: "Send another date" })
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "tw-name", children: "Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "tw-name",
            className: inputClass,
            value: values.name,
            onChange: (e) => set("name", e.target.value)
          }
        ),
        errors.name && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "tw-email", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "tw-email",
            type: "email",
            className: inputClass,
            value: values.email,
            onChange: (e) => set("email", e.target.value)
          }
        ),
        errors.email && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "tw-company", children: "Company" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "tw-company",
          className: inputClass,
          value: values.company,
          onChange: (e) => set("company", e.target.value)
        }
      ),
      errors.company && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.company })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "tw-dates", children: "Event date or dates" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "tw-dates",
            className: inputClass,
            placeholder: "Oct 7, evening",
            value: values.eventDates,
            onChange: (e) => set("eventDates", e.target.value)
          }
        ),
        errors.eventDates && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.eventDates })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "tw-venue", children: "Venue or neighborhood" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "tw-venue",
            className: inputClass,
            placeholder: "SoMa",
            value: values.venue,
            onChange: (e) => set("venue", e.target.value)
          }
        ),
        errors.venue && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.venue })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "tw-need", children: "What you need" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          id: "tw-need",
          className: inputClass,
          value: need,
          onChange: (e) => set("need", e.target.value),
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Pick one" }),
            techWeekNeedOptions.map((option) => /* @__PURE__ */ jsx("option", { value: option, children: option }, option))
          ]
        }
      ),
      errors.need && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.need })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "submit",
        disabled: submitting,
        className: "m3-filled-button w-full text-base py-3.5 flex items-center justify-center gap-2 disabled:opacity-60",
        children: [
          submitting ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : null,
          "Send it over"
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-m3-on-surface/60 text-center", children: "We reply within one business day. During Tech Week week we reply same day." })
  ] });
}
(_ca = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ca.call(globalThis, "src/pages/SFTechWeekPage.tsx");
const PAGE_TITLE$1 = "SF Tech Week Video Coverage, October 5 to 11 2026 | Where2Studios";
const PAGE_DESCRIPTION$2 = "Event video and next morning recaps for SF Tech Week 2026 side events, panels, mixers and founder dinners. Bay Area crew. We cover LA Tech Week too.";
const PAGE_URL$1 = "https://where2studios.com/sf-tech-week";
const whyPoints = [
  "Hundreds of events run that week. Attention is highest while it is happening.",
  "Post the morning after and your event stays in the feed for the rest of the week, while everyone who came is still in town."
];
const bookingSteps = [
  "Send us the event, the date and the times.",
  "We confirm a crew and lock your slot.",
  "We shoot.",
  "Teaser and vertical clips by 10am the next day. Full recap after the week."
];
const PROOF_SLUGS$1 = [
  "the-agent-open-san-francisco",
  "dataiku-brand-hq-build-montage",
  "cloudflare-rsa-conference-2025",
  "claroty-rsa-conference-2024",
  "rsa-conference-2025-b-restaurant"
];
const faqs$1 = [
  {
    q: "Do you cover SF Tech Week events?",
    a: "Yes. We work as an SF Tech Week videographer across San Francisco from October 5 to 11, 2026, and across the wider Bay Area."
  },
  {
    q: "How fast can I get video from my Tech Week event?",
    a: "On the Next Morning package, a 30 second teaser and one vertical clip by 10am the next morning. Recap edits follow within 5 business days."
  },
  {
    q: "How much does Tech Week video coverage cost?",
    a: "Single Event Recap $3,500, Next Morning $4,500, Recap + Social Pack $5,500, Full Week Coverage $18,000. Sponsor cuts start at $1,500. We quote same day."
  },
  {
    q: "Can you cover more than one event during Tech Week?",
    a: "Yes. Full Week Coverage is built for hosts running several events across the week."
  },
  {
    q: "Do you cover LA Tech Week?",
    a: "Yes. We take LA Tech Week videographer bookings for October 12 to 18. Tell us early so we can plan the travel."
  },
  {
    q: "My event is a private founder dinner. Can you still shoot it?",
    a: "Yes. We shoot quiet, no big lights, and you approve every clip before anything goes out."
  },
  {
    q: "How late can I book before October 5?",
    a: "Book as early as you can. Nights fill first. If we still have a crew we will take a booking the day before."
  },
  {
    q: "Do you handle sponsor deliverables?",
    a: "Yes. We cut a sponsor version with their branding, their people and their logo placements."
  }
];
function scrollTo$1(id) {
  var _a2;
  (_a2 = document.getElementById(id)) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "start" });
}
const WRAPPED_TITLE = "SF Tech Week Videographer, Event Video Coverage | Where2Studios";
const WRAPPED_DESCRIPTION = "Where2Studios covers SF Tech Week side events, panels, mixers and founder dinners with next morning recaps and vertical clips. Bay Area crew. Book early for Tech Week 2027.";
const heroCopy = {
  current: {
    eyebrow: "October 5 to 11, 2026",
    h1: "Event video for SF Tech Week",
    subhead: "We cover SF Tech Week side events October 5 to 11 and send a teaser and a vertical clip back by 10am the next day.",
    cta: "Lock your date"
  },
  "la-week": {
    eyebrow: "SF Tech Week has wrapped",
    h1: "SF recaps are cutting now. LA Tech Week is next.",
    subhead: "We are covering LA Tech Week October 12 to 18 and delivering SF Tech Week recaps this week. Book LA dates while crews are open.",
    cta: "Book LA Tech Week"
  },
  wrapped: {
    eyebrow: "SF Tech Week 2026 has wrapped",
    h1: "Get on the list for Tech Week 2027",
    subhead: "We covered SF Tech Week 2026 side events, activations and founder dinners. Tell us about your next conference week and we will hold the date.",
    cta: "Book your next event"
  }
};
function SFTechWeekPage() {
  const { data: projects } = useProjects();
  const [activeVideo, setActiveVideo] = useState(null);
  const [preselected, setPreselected] = useState("");
  const phase = useTechWeekPhase();
  const isPast = phase.kind === "la-week" || phase.kind === "wrapped";
  const hero = phase.kind === "la-week" ? heroCopy["la-week"] : phase.kind === "wrapped" ? heroCopy.wrapped : heroCopy.current;
  const proof = useMemo(() => {
    const all = projects || [];
    return proofWall(all, PROOF_SLUGS$1);
  }, [projects]);
  const requestQuote = (packageName) => {
    setPreselected(packageName);
    scrollTo$1("tech-week-form");
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SF Tech Week Video Coverage",
    serviceType: "Event video production",
    description: PAGE_DESCRIPTION$2,
    url: PAGE_URL$1,
    provider: { "@id": "https://where2studios.com/#business" },
    areaServed: areaServed$1,
    validFrom: "2026-09-10",
    validThrough: "2026-10-18",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "SF Tech Week packages",
      itemListElement: techWeekPackages.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.name, description: p.description },
        ...p.startingPrice ? { price: p.startingPrice, priceCurrency: "USD" } : { availability: "https://schema.org/InStock" }
      }))
    }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs$1.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://where2studios.com" },
      { "@type": "ListItem", position: 2, name: "SF Tech Week", item: PAGE_URL$1 }
    ]
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: phase.kind === "wrapped" ? WRAPPED_TITLE : PAGE_TITLE$1,
        ogTitle: "SF Tech Week video coverage",
        description: phase.kind === "wrapped" ? WRAPPED_DESCRIPTION : PAGE_DESCRIPTION$2,
        url: PAGE_URL$1,
        answer: true,
        image: "/og/sf-tech-week.png",
        imageAlt: "SF Tech Week video coverage",
        breadcrumbName: "SF Tech Week",
        robots: "index, follow",
        schema: [serviceSchema, faqSchema, breadcrumbSchema]
      }
    ),
    /* @__PURE__ */ jsxs(PageLayout, { navVariant: "dark", children: [
      /* @__PURE__ */ jsx("section", { className: "bg-m3-surface-dark pb-12 sm:pb-16 pt-[calc(var(--nav-h,112px)+1.5rem)] sm:pt-[calc(var(--nav-h,112px)+2.5rem)]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-m3-primary text-xs font-semibold uppercase tracking-widest", children: hero.eyebrow }),
        /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-dark mt-3", children: hero.h1 }),
        /* @__PURE__ */ jsx("p", { id: "answer", className: "mt-4 text-base sm:text-lg text-m3-on-dark/75", children: hero.subhead }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-6", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scrollTo$1("tech-week-form"),
              className: "m3-filled-button text-sm px-6 py-3",
              children: hero.cta
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scrollTo$1("tech-week-proof"),
              className: "m3-outlined-button text-sm px-6 py-3 text-m3-on-dark border-m3-on-dark/30",
              children: "See the work"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(TechWeekCountdown, { className: "mt-5 text-lg" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-m3-on-dark/60", children: "Bay Area crew. We also cover LA Tech Week, October 12 to 18." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-m3-background", children: /* @__PURE__ */ jsx(TrustedBrands, {}) }),
      /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-14 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface", children: "A recap that lands three weeks later lands in a dead feed" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-4", children: whyPoints.map((point) => /* @__PURE__ */ jsx(
          "li",
          {
            className: "text-sm sm:text-base text-m3-on-surface/75 border-l-2 border-m3-primary pl-4",
            children: point
          },
          point
        )) })
      ] }) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          id: "tech-week-proof",
          className: "py-12 sm:py-20 bg-m3-background scroll-mt-[calc(var(--nav-h,80px)+16px)]",
          children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface", children: "Tech events we have already covered" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm sm:text-base text-m3-on-surface/70", children: "Real work, not a mood board." }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm font-semibold text-m3-on-surface/80", children: "The Agent Open. Dataiku. Cloudflare. Claroty. RSA Conference week." }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8", children: proof.map((project, index) => /* @__PURE__ */ jsx(
              ProjectCard,
              {
                project,
                index,
                aspectRatio: "vertical",
                onClick: () => setActiveVideo(project)
              },
              project.id
            )) }),
            /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/work",
                className: "inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm",
                children: [
                  "See all our work",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ) })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface", children: "Four ways to book us for Tech Week" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 mb-8 text-sm sm:text-base text-m3-on-surface/70", children: "Side event video coverage, priced per event or per week." }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: techWeekPackages.map((pkg) => /* @__PURE__ */ jsxs("div", { className: "m3-elevated-card p-5 flex flex-col", children: [
          pkg.tag && /* @__PURE__ */ jsx("span", { className: "self-start rounded-full bg-m3-primary/15 text-m3-primary text-[11px] font-semibold px-3 py-1 mb-3", children: pkg.tag }),
          /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-lg font-semibold text-m3-on-surface", children: pkg.name }),
          pkg.startingPrice !== null && /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-m3-primary mt-1", children: [
            "Starting at $",
            pkg.startingPrice.toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70 mt-2 flex-1", children: pkg.description }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => requestQuote(pkg.name),
              className: "m3-outlined-button text-sm px-5 py-2.5 mt-5 self-start",
              children: "Request a quote"
            }
          )
        ] }, pkg.id)) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-m3-on-surface/60 mt-6", children: "Starting prices. Every event is different, so we scope each one and quote the same day. Speaker and panel clips, extra cutdowns and additional hours are quoted as add ons." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-surface-dark", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-dark", children: "Sponsoring an event that week?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base text-m3-on-dark/75", children: "You paid for the logo, the bar tab and the booth. We cut a sponsor version with your branding, your people and your verticals." }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm sm:text-base text-m3-on-dark/75", children: "Sponsor cut: starting at $1,500 added to any package." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => requestQuote(SPONSOR_OPTION),
            className: "m3-filled-button text-sm px-6 py-3 mt-6",
            children: "Talk to us about sponsor coverage"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6", children: "How booking works" }),
        /* @__PURE__ */ jsx("ol", { className: "space-y-4", children: bookingSteps.map((step, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm sm:text-base text-m3-on-surface/75", children: [
          /* @__PURE__ */ jsx("span", { className: "font-fredoka font-semibold text-m3-primary shrink-0", children: String(i + 1).padStart(2, "0") }),
          step
        ] }, step)) }),
        !isPast && /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-m3-on-surface/60", children: "We run a limited number of crews per night from October 5 to 11. Once a night is full it is full." })
      ] }) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          id: "tech-week-form",
          className: "py-12 sm:py-16 bg-m3-surface-variant scroll-mt-[calc(var(--nav-h,80px)+16px)]",
          children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-2xl", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6", children: "Lock your Tech Week date" }),
            /* @__PURE__ */ jsx(TechWeekForm, { preselected, onPreselect: setPreselected })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6", children: "Tech Week questions" }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs$1.map((faq, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `tw-faq-${i}`, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { "data-faq-question": true, className: "text-left text-sm sm:text-base text-m3-on-surface", children: faq.q }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm text-m3-on-surface/70", children: faq.a })
        ] }, `tw-faq-${i}`)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20 bg-m3-surface text-center", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-2xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface", children: isPast ? "Planning a conference week?" : "October 5 is close" }),
        !isPast && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm sm:text-base text-m3-on-surface/70", children: "San Francisco Tech Week video production books out fast. Send us your date and we will tell you today if we can cover it." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scrollTo$1("tech-week-form"),
            className: "m3-filled-button text-base px-7 py-3.5 mt-6",
            children: isPast ? hero.cta : "Lock your date"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      VideoModal,
      {
        isOpen: !!activeVideo,
        onClose: () => setActiveVideo(null),
        videoUrl: (activeVideo == null ? void 0 : activeVideo.video_url) || null,
        title: activeVideo == null ? void 0 : activeVideo.title,
        portrait: activeVideo ? isPortraitMedia(activeVideo) : false
      }
    )
  ] });
}
(_da = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _da.call(globalThis, "src/pages/CaseStudyPage.tsx");
const CATEGORY_LABELS = {
  "convention-week": "Conference Activations",
  "event-recaps": "Event Recap",
  "brand-films": "Brand Film",
  "founder-story": "Founder Story",
  "product-demo": "Product Demo"
};
function SectionBlock({
  icon: Icon,
  title,
  helperLine,
  children,
  delay = 0
}) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-m3-primary" }),
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl font-semibold text-m3-on-surface", children: title })
        ] }),
        helperLine && /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/50 text-sm mb-4 ml-8", children: helperLine }),
        !helperLine && /* @__PURE__ */ jsx("div", { className: "mb-4" }),
        children
      ]
    }
  );
}
function BulletList({ items }) {
  return /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: items.map((point, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-m3-secondary mt-1 flex-shrink-0" }),
    /* @__PURE__ */ jsx("span", { className: "text-m3-on-surface/80", children: point })
  ] }, i)) });
}
function NumberedList({ items }) {
  return /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: items.map((point, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-m3-primary/10 text-m3-primary text-xs font-semibold flex items-center justify-center flex-shrink-0", children: i + 1 }),
    /* @__PURE__ */ jsx("span", { className: "text-m3-on-surface/80", children: point })
  ] }, i)) });
}
function isoDuration(seconds) {
  if (!seconds || seconds <= 0) return void 0;
  const total = Math.round(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `PT${m > 0 ? `${m}M` : ""}${s}S`;
}
function buildJsonLd(project, thumbnail, isPodcast, description, convention) {
  const pageUrl = `https://where2studios.com/work/${project.slug || project.id}`;
  const base = {
    "@context": "https://schema.org",
    "@type": project.video_url ? "VideoObject" : "CreativeWork",
    name: project.title,
    description,
    thumbnailUrl: thumbnail,
    url: pageUrl,
    ...project.created_at && { uploadDate: new Date(project.created_at).toISOString() },
    ...project.video_url && { embedUrl: project.video_url, contentUrl: project.video_url },
    ...project.media_url && { contentUrl: project.media_url },
    ...isoDuration(project.duration_seconds) && { duration: isoDuration(project.duration_seconds) },
    ...project.width && project.height ? { width: project.width, height: project.height } : {},
    ...project.location && {
      contentLocation: { "@type": "Place", name: project.location }
    },
    inLanguage: "en-US",
    isFamilyFriendly: true,
    author: {
      "@type": "Organization",
      name: "Where2Studios"
    },
    publisher: { "@id": "https://where2studios.com/#business" }
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://where2studios.com" },
      { "@type": "ListItem", position: 2, name: "Work", item: "https://where2studios.com/work" },
      { "@type": "ListItem", position: 3, name: project.title, item: pageUrl }
    ]
  };
  if (isPodcast) {
    return [
      base,
      {
        "@context": "https://schema.org",
        "@type": "PodcastEpisode",
        name: project.title,
        description: project.result || project.description,
        ...project.video_url && { url: project.video_url },
        productionCompany: {
          "@type": "Organization",
          name: "Where2Studios"
        },
        partOfSeries: {
          "@type": "PodcastSeries",
          name: project.client_name ? `${project.client_name} Podcast` : project.title
        }
      },
      breadcrumb
    ];
  }
  const eventSchema = convention ? {
    "@context": "https://schema.org",
    "@type": "Event",
    name: convention.name,
    url: `https://where2studios.com/conventions/${convention.slug}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...convention.venue && {
      location: {
        "@type": "Place",
        name: convention.venue,
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          addressCountry: "US"
        }
      }
    },
    ...convention.organizer && {
      organizer: { "@type": "Organization", name: convention.organizer }
    },
    subjectOf: { "@id": pageUrl }
  } : null;
  return eventSchema ? [base, breadcrumb, eventSchema] : [base, breadcrumb];
}
function CaseStudyPage() {
  var _a2, _b2, _c2;
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openSheet } = useBookingSheet();
  const { data: project, isLoading, error } = useCaseStudy(slug || "");
  const isPhoto = (project == null ? void 0 : project.media_type) === "photo";
  const isHidden = !!project && project.show_on_main_site === false;
  const redirectTo = isPhoto ? "/work?view=photos" : isHidden ? "/work" : null;
  useEffect(() => {
    if (redirectTo) navigate(redirectTo, { replace: true });
  }, [redirectTo, navigate]);
  if (redirectTo) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        SEOHead,
        {
          title: `${project.title} | Where2Studios`,
          description: "This item lives in the Where2Studios portfolio gallery.",
          url: `https://where2studios.com/work/${project.slug || project.id}`,
          robots: "noindex, follow"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-m3-surface-variant" })
    ] });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-variant", children: [
      /* @__PURE__ */ jsx(Navbar, { variant: "light" }),
      /* @__PURE__ */ jsx("div", { className: "pt-32 pb-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse", children: [
        /* @__PURE__ */ jsx("div", { className: "h-8 w-48 bg-m3-surface rounded mb-4" }),
        /* @__PURE__ */ jsx("div", { className: "h-12 w-96 bg-m3-surface rounded mb-8" }),
        /* @__PURE__ */ jsx("div", { className: "aspect-video bg-m3-surface rounded-2xl" })
      ] }) }) })
    ] });
  }
  if (error || !project) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-variant", children: [
      /* @__PURE__ */ jsx(Navbar, { variant: "light" }),
      /* @__PURE__ */ jsx("div", { className: "pt-32 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl font-semibold text-m3-on-surface mb-4", children: "Project Not Found" }),
        /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/60 mb-8", children: "This project doesn't exist or has been removed." }),
        /* @__PURE__ */ jsx(Link, { to: "/work", className: "m3-filled-button", children: "Back to Work" })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  const thumbnail = project.thumbnail_url || getThumbnail(project);
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category;
  const videoEmbedUrl = getVideoEmbedUrl(project.video_url, { controls: true });
  const videoHost = isVimeoUrl(project.video_url) ? "Vimeo" : "YouTube";
  const isPodcast = project.category === "podcasts";
  const convention = project.convention_slug ? conventions.find((c) => c.slug === project.convention_slug) : void 0;
  const objectivePoints = ((_a2 = project.challenge) == null ? void 0 : _a2.split("\n").filter(Boolean)) || [];
  const strategyPoints = ((_b2 = project.approach) == null ? void 0 : _b2.split("\n").filter(Boolean)) || [];
  const metrics = project.metrics_json;
  const isEventProject = project.category === "event-recaps" || project.category === "events";
  const rawSubject = project.title.length < 34 && project.client_name && !project.title.includes(project.client_name) ? `${project.title}, ${project.client_name}` : project.title;
  const titleSubject = (() => {
    let subject = rawSubject;
    while (subject.length + 16 > 65 && subject.includes(", ")) {
      const cut = subject.lastIndexOf(", ");
      const tail = subject.slice(cut + 2).trim();
      const isVenue = /^(the |b restaurant)/i.test(tail) || (project.location || "").includes(tail);
      const shorter = subject.slice(0, cut).trim();
      if (!isVenue || shorter.length < 20) break;
      subject = shorter;
    }
    return subject;
  })();
  const pageTitle = isEventProject ? `${titleSubject} | Event Recap Video Case Study | Where2Studios` : `${titleSubject} | ${categoryLabel} Case Study | Where2Studios`;
  const bodyText = project.description || project.result || "";
  const firstSentence = (() => {
    const clean = bodyText.replace(/\s+/g, " ").trim();
    if (!clean) return "";
    const match = clean.match(/^.*?[.!?](\s|$)/);
    return (match ? match[0] : clean).trim();
  })();
  const editionYear = (_c2 = project.title.match(/\b(20\d{2})\b/)) == null ? void 0 : _c2[1];
  const pageDescription = (project.client_name && convention ? `${project.client_name} at ${convention.name}${editionYear ? ` (${editionYear})` : ""}${project.location ? `, ${project.location}` : ""}. ${firstSentence}` : `${firstSentence} Filmed by Where2Studios in ${project.location || "San Francisco"}.`).replace(/\s+/g, " ").trim();
  const jsonLd = buildJsonLd(project, thumbnail, isPodcast, pageDescription, convention);
  const answerLine = project.client_name && project.location ? `${isEventProject ? "Event recap video" : categoryLabel} produced by Where2Studios for ${project.client_name} at ${project.location}${convention ? `, during ${convention.name}` : ""}.` : project.client_name ? `${isEventProject ? "Event recap video" : categoryLabel} produced by Where2Studios for ${project.client_name}${convention ? `, during ${convention.name}` : ""}.` : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: pageTitle,
        ogTitle: project.client_name && convention ? `${project.client_name} at ${convention.name}` : project.title,
        description: pageDescription,
        image: thumbnail,
        imageAlt: project.title,
        url: `https://where2studios.com/work/${project.slug || project.id}`,
        type: "article",
        schema: jsonLd
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-variant", children: [
      /* @__PURE__ */ jsx(SkipLink, {}),
      /* @__PURE__ */ jsx(Navbar, { variant: "light" }),
      /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "outline-none", children: [
        /* @__PURE__ */ jsx("section", { className: "pt-28 pb-8 sm:pt-36 sm:pb-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => navigate(-1),
              className: "inline-flex items-center gap-2 min-h-11 text-m3-on-surface/70 hover:text-m3-on-surface mb-4 transition-colors",
              children: [
                /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Back to Work" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              className: "grid lg:grid-cols-3 gap-8",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 rounded-full bg-m3-primary/10 text-m3-primary text-xs font-semibold mb-4", children: categoryLabel }),
                  /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-4xl lg:text-5xl font-semibold text-m3-on-surface mb-4", children: project.title }),
                  answerLine && /* @__PURE__ */ jsx("p", { className: "text-base text-m3-on-surface/80 max-w-2xl mb-3", children: answerLine }),
                  project.result && /* @__PURE__ */ jsx("p", { className: "text-lg text-m3-on-surface/70 max-w-2xl", children: project.result })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "m3-tonal-card p-5 space-y-4", children: [
                  project.client_name && /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1", children: "Client" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-m3-on-surface", children: project.client_name })
                  ] }),
                  project.location && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-m3-primary mt-0.5" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1", children: "Location" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface", children: project.location })
                    ] })
                  ] }),
                  project.services && project.services.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-2", children: "Services" }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: project.services.map((service) => /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "px-2 py-1 bg-m3-surface rounded text-xs text-m3-on-surface",
                        children: service
                      },
                      service
                    )) })
                  ] })
                ] }) })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "pb-12", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "rounded-2xl overflow-hidden shadow-xl",
            children: isUploadedVideo(project) && project.video_url ? /* @__PURE__ */ jsx(
              UploadVideo,
              {
                src: project.video_url,
                poster: project.thumbnail_url,
                title: project.title,
                className: "w-full aspect-video bg-m3-surface-dark object-cover"
              }
            ) : videoEmbedUrl ? /* @__PURE__ */ jsx("div", { className: "relative aspect-video", children: /* @__PURE__ */ jsx(
              "iframe",
              {
                src: videoEmbedUrl,
                title: project.title,
                "aria-label": `Watch ${project.title} on ${videoHost}`,
                allow: "autoplay; fullscreen; picture-in-picture",
                allowFullScreen: true,
                className: "absolute inset-0 w-full h-full"
              }
            ) }) : /* @__PURE__ */ jsx(
              "img",
              {
                src: thumbnail,
                alt: `Still frame from the ${categoryLabel.toLowerCase()} Where2Studios produced for ${project.client_name || project.title}`,
                className: "w-full aspect-video object-cover"
              }
            )
          }
        ) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-12 bg-m3-surface", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-14", children: [
          objectivePoints.length > 0 && /* @__PURE__ */ jsx(SectionBlock, { icon: Target, title: "Goal", helperLine: "What the content needed to do.", children: /* @__PURE__ */ jsx(BulletList, { items: objectivePoints }) }),
          project.description && /* @__PURE__ */ jsx(SectionBlock, { icon: Users, title: "Strategy", helperLine: "Positioning, message, and plan.", children: /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/80 leading-relaxed whitespace-pre-line", children: project.description }) }),
          project.deliverables && project.deliverables.length > 0 && /* @__PURE__ */ jsx(SectionBlock, { icon: Package, title: "Deliverables", helperLine: "What we shipped: assets, formats, cutdowns.", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.deliverables.map((item) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-3 py-1.5 bg-m3-surface-variant rounded-full text-sm text-m3-on-surface",
              children: item
            },
            item
          )) }) }),
          strategyPoints.length > 0 && /* @__PURE__ */ jsx(SectionBlock, { icon: Lightbulb, title: "Timeline", helperLine: "Kickoff to delivery.", children: /* @__PURE__ */ jsx(NumberedList, { items: strategyPoints }) }),
          project.services && project.services.length > 0 && /* @__PURE__ */ jsx(SectionBlock, { icon: Scissors, title: "Execution", helperLine: "How we produced and launched it.", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: project.services.map((asset) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 m3-tonal-card",
              children: [
                /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4 text-m3-primary flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-m3-on-surface", children: asset })
              ]
            },
            asset
          )) }) }),
          (metrics || project.result) && /* @__PURE__ */ jsxs(SectionBlock, { icon: BarChart3, title: "Impact", helperLine: "What changed: results, learnings, next step.", children: [
            metrics && Object.keys(metrics).length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6", children: Object.entries(metrics).map(([label, value]) => /* @__PURE__ */ jsxs("div", { className: "m3-elevated-card p-4 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "font-fredoka text-2xl font-semibold text-m3-primary", children: value }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-m3-on-surface/60 mt-1 uppercase tracking-wider", children: label })
            ] }, label)) }),
            project.result && /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/80 leading-relaxed", children: project.result })
          ] })
        ] }) }) }),
        project.images && project.images.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-12 bg-m3-surface-variant", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl font-semibold text-m3-on-surface mb-6 text-center", children: "Gallery" }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: project.images.slice(0, 12).map((img, i) => /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { delay: i * 0.05 },
              className: "aspect-video rounded-xl overflow-hidden",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: img,
                  alt: `Photo ${i + 1} from the ${categoryLabel.toLowerCase()} Where2Studios produced for ${project.client_name || project.title}`,
                  className: "w-full h-full object-cover hover:scale-105 transition-transform duration-500",
                  loading: "lazy"
                }
              )
            },
            i
          )) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-20 bg-m3-surface-dark", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-2xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-dark mb-4", children: "Want this for your conference week?" }),
          /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/70 mb-4", children: "Tell us the conference and what you are running and we will scope it the same day." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => openSheet({
                  conference: convention == null ? void 0 : convention.name,
                  venue: project.location || void 0,
                  need: "Activation recap",
                  source: `case-study:${project.slug || project.id}`
                }),
                className: "m3-filled-button text-lg px-8 py-4 inline-flex items-center gap-2",
                children: [
                  "Book coverage like this",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ),
            convention && /* @__PURE__ */ jsxs(
              Link,
              {
                to: conventionHref(convention),
                className: "text-sm text-m3-on-dark/70 underline hover:text-m3-on-dark transition-colors",
                children: [
                  "See our ",
                  convention.name,
                  " coverage"
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          KeepReading,
          {
            links: [
              { label: "All our work", href: "/work" },
              ...convention ? [{ label: `${convention.name} coverage`, href: conventionHref(convention) }] : [{ label: "Conference calendar", href: "/conventions" }],
              { label: "Why a dedicated crew", href: "/why-a-dedicated-crew" },
              { label: "Services", href: "/services" },
              { label: "Contact", href: "/contact" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
(_ea = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ea.call(globalThis, "src/pages/ServicesPage.tsx");
function ServicesPage() {
  const { openSheet } = useBookingSheet();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Conference Week Video Services | Where2Studios",
        description: "Activation recaps, exec clips for LinkedIn, same week social cutdowns and full week crew coverage for conference week activations in San Francisco."
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-variant", children: [
      /* @__PURE__ */ jsx(Navbar, { variant: "light" }),
      /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "outline-none", children: [
        /* @__PURE__ */ jsx("section", { className: "pt-28 pb-12 sm:pt-40 sm:pb-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            className: "max-w-3xl",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-m3-primary text-xs font-semibold uppercase tracking-widest", children: "Services" }),
              /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2", children: "Four things we deliver for conference week." }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl", children: "You have the venue and the activation. We make the week exist on Monday." }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start gap-3 mt-6", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: openSheet,
                    className: "m3-filled-button text-sm px-6 py-3",
                    children: "Book a Call"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/work",
                    className: "m3-outlined-button text-sm px-6 py-3",
                    children: "See Our Work"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/50 text-xs mt-3", children: "We reply within 1 business day." }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/why-a-dedicated-crew",
                  className: "inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm mt-4",
                  children: [
                    "Why a dedicated crew",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              )
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxs("section", { className: "py-12 sm:py-16", children: [
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 grid gap-6 sm:grid-cols-2", children: deliverables$1.map((item, index) => /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.05 },
              id: item.id,
              style: { scrollMarginTop: "var(--nav-h, 80px)" },
              children: /* @__PURE__ */ jsxs("div", { className: "h-full m3-elevated-card p-6 sm:p-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(item.icon, { className: "w-6 h-6 text-m3-primary" }) }),
                  /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface", children: item.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/80 text-sm sm:text-base", children: item.line })
              ] })
            },
            item.id
          )) }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 mt-8", children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/event-recap-videos",
              className: "inline-flex items-center gap-1.5 text-sm font-medium text-m3-brick-red hover:text-m3-brick-red/80 transition-colors",
              children: [
                "See how our event recap videos work",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface", children: "Not sure what you need?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-m3-on-surface/60 max-w-xl mx-auto", children: "Tell us the dates and what you are running. We scope it the same day." }),
          /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx("button", { onClick: openSheet, className: "m3-filled-button text-lg px-8 py-4", children: "Book a Call" }) })
        ] }) }),
        /* @__PURE__ */ jsx(KeepReading, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(FloatingCTA, {})
    ] })
  ] });
}
(_fa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _fa.call(globalThis, "src/pages/WhyDedicatedCrewPage.tsx");
const SITE_URL$2 = "https://where2studios.com";
const PROOF_SLUGS = [
  "cloudflare-rsa-conference-2025",
  "google-pixel-house-nba-all-star-2025",
  "immuta-snowflake-summit-2025"
];
const STATS = [
  { value: "9+", label: "Conference weeks covered" },
  { value: "20+", label: "Tech brands" },
  { value: "22", label: "Activation films" },
  { value: "10am", label: "Next morning clip delivery" }
];
const SECTIONS = [
  {
    id: "build-to-strike",
    title: "On site from build to strike",
    body: [
      "We shoot a time lapse of the build the morning before doors.",
      "Then we are in the space every day of the week, not just for the party."
    ]
  },
  {
    id: "clips-by-10am",
    title: "Clips by 10am",
    body: [
      "Shoot day one, teaser and one vertical clip in your inbox by 10am day two.",
      "Exec clips follow the same rhythm, so a keynote posts while the speaker is still in town."
    ]
  },
  {
    id: "one-folder",
    title: "One folder for every stakeholder",
    body: [
      "Exec, sponsor, social and sales each need a different cut of the same week.",
      "Everything lands in one shared folder, organised by day and by deliverable."
    ]
  },
  {
    id: "moscone-venues",
    title: "Built for the venues around Moscone",
    body: [
      "We have shot The Howard, B Restaurant and The Veranda, the Gourmet Provisions venue cluster near Moscone.",
      "We know the load in doors, the light at 6pm and where the power is."
    ]
  },
  {
    id: "photo-and-video",
    title: "Photo and video from one crew",
    body: [
      "Edited photo selects ship with every booking.",
      "They are shot by the same crew already in the room."
    ]
  }
];
const HERO_ANSWER = "Whatever you call it, experience hub, lounge, house or brand HQ, it runs from morning meetings to the evening reception. One hired shooter gets you one edit three weeks later. A dedicated crew is on site from build to strike, cuts overnight, and puts a teaser and a vertical clip in your inbox by 10am.";
function WhyDedicatedCrewPage() {
  const { openSheet } = useBookingSheet();
  const { data: projects } = useProjects();
  const [activeVideo, setActiveVideo] = useState(null);
  const proof = useMemo(() => {
    const all = projects || [];
    return proofWall(all, PROOF_SLUGS);
  }, [projects]);
  const title = "Why a Dedicated Conference Week Video Crew | Where2Studios";
  const description = "A single hired shooter gives you one deliverable three weeks later. A dedicated conference week crew is on site from build to strike and delivers clips by 10am the next morning.";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "You do not book a videographer for conference week. You deploy a content crew.",
    description,
    mainEntityOfPage: `${SITE_URL$2}/why-a-dedicated-crew`,
    author: { "@id": `${SITE_URL$2}/#business` },
    publisher: { "@id": `${SITE_URL$2}/#business` }
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL$2 },
      {
        "@type": "ListItem",
        position: 2,
        name: "Why a dedicated crew",
        item: `${SITE_URL$2}/why-a-dedicated-crew`
      }
    ]
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title,
        ogTitle: "Why a dedicated conference week crew",
        description,
        canonical: "/why-a-dedicated-crew",
        answer: true,
        image: "/og/why.png",
        imageAlt: "A dedicated conference week crew",
        breadcrumbName: "Why a dedicated crew",
        type: "article",
        schema: [articleSchema, breadcrumbSchema]
      }
    ),
    /* @__PURE__ */ jsxs(PageLayout, { navVariant: "light", children: [
      /* @__PURE__ */ jsx("section", { className: "bg-m3-background pb-10 sm:pb-14 pt-[calc(var(--nav-h,112px)+1.5rem)] sm:pt-[calc(var(--nav-h,112px)+2.5rem)]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-m3-primary text-xs font-semibold uppercase tracking-widest", children: "Why Where2Studios" }),
        /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-surface mt-3", children: "You do not book a videographer for conference week. You deploy a content crew." }),
        /* @__PURE__ */ jsx("p", { id: "answer", className: "mt-5 text-base sm:text-lg text-m3-on-surface/75", children: HERO_ANSWER })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-surface", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl space-y-10", children: SECTIONS.map((section) => /* @__PURE__ */ jsxs("div", { id: section.id, children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface", children: section.title }),
        section.body.map((line, i) => /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm sm:text-base text-m3-on-surface/75", children: line }, i))
      ] }, section.id)) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-14 bg-m3-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-6 sm:gap-12 lg:gap-16", children: STATS.map((stat) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums", children: stat.value }),
        /* @__PURE__ */ jsx("div", { className: "text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1", children: stat.label })
      ] }, stat.label)) }) }) }) }),
      proof.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface", children: "The work" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8", children: proof.map((project, index) => /* @__PURE__ */ jsx(
          ProjectCard,
          {
            project,
            index,
            aspectRatio: "vertical",
            onClick: () => setActiveVideo(project)
          },
          project.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20 bg-m3-surface-dark", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-dark", children: "Planning a conference week?" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center mt-6", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openSheet({ source: "why-dedicated-crew" }),
              className: "m3-filled-button text-sm px-6 py-3 inline-flex items-center gap-2",
              children: [
                "Book a Call",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/conventions",
              className: "text-sm text-m3-on-dark/70 underline hover:text-m3-on-dark transition-colors",
              children: "See the conference calendar"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      VideoModal,
      {
        isOpen: !!activeVideo,
        onClose: () => setActiveVideo(null),
        videoUrl: (activeVideo == null ? void 0 : activeVideo.video_url) || null,
        title: activeVideo == null ? void 0 : activeVideo.title,
        portrait: activeVideo ? isPortraitMedia(activeVideo) : false
      }
    )
  ] });
}
(_ga = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ga.call(globalThis, "src/hooks/useCalModal.ts");
const CAL_LINK = "where2-studios-tvdbun/discovery-call";
function useCalModal() {
  useEffect(() => {
    (async function() {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#D4AF37" } },
        hideEventTypeDetails: false
      });
    })();
  }, []);
  const openCalModal = useCallback(async () => {
    const cal = await getCalApi();
    cal("modal", {
      calLink: CAL_LINK,
      config: { layout: "month_view" }
    });
  }, []);
  return { openCalModal };
}
(_ha = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ha.call(globalThis, "src/components/ContactForm.tsx");
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  company: z.string().trim().max(100).optional(),
  role: z.string().trim().max(100).optional(),
  companyUrl: z.string().trim().max(255).optional(),
  growthGoal: z.string().min(1, "Please select a growth goal"),
  service: z.string().min(1, "Please select what you need help with"),
  budget: z.string().trim().max(100).optional(),
  timeline: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Notes are required").max(2e3),
  website: z.string().max(0, "Bot detected")
  // Honeypot
});
const growthGoals = [
  { value: "launch", label: "Launch" },
  { value: "awareness", label: "Awareness" },
  { value: "leads", label: "Leads" },
  { value: "sales", label: "Sales" },
  { value: "hiring", label: "Hiring" },
  { value: "community", label: "Community" }
];
const serviceNeeds = [
  { value: "strategy", label: "Strategy" },
  { value: "production", label: "Production" },
  { value: "marketing-execution", label: "Marketing Execution" }
];
function ContactForm({ showBookCall = true, compact = false }) {
  const { openCalModal } = useCalModal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    companyUrl: "",
    growthGoal: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    website: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [pendingCalOpen, setPendingCalOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
    }
  };
  const validate = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = {};
        err.errors.forEach((e) => {
          if (e.path[0]) {
            newErrors[e.path[0]] = e.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  const handleSubmit = async (openCalAfter = false) => {
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        company: formData.company || void 0,
        service: formData.service,
        message: `[Growth Goal: ${formData.growthGoal}]${formData.role ? ` [Role: ${formData.role}]` : ""}${formData.companyUrl ? ` [Website: ${formData.companyUrl}]` : ""}

${formData.message}`,
        phone: formData.phone || void 0,
        budget: formData.budget || void 0,
        timeline: formData.timeline || void 0
      });
      setIsSubmitted(true);
      setPendingCalOpen(openCalAfter);
      if (openCalAfter) {
        openCalModal();
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setIsSubmitted(false);
    setPendingCalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      companyUrl: "",
      growthGoal: "",
      service: "",
      budget: "",
      timeline: "",
      message: "",
      website: ""
    });
  };
  if (isSubmitted) {
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        role: "status",
        "aria-live": "polite",
        className: "m3-elevated-card p-8 sm:p-12 text-center",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Check, { className: "w-8 h-8 text-m3-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-m3-on-surface mb-2", children: "Got it." }),
          /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/60 mb-6", children: "We'll reply within 1 business day with next steps, then you can book your strategy call." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
            !pendingCalOpen && /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: openCalModal,
                className: "m3-filled-button flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                  "Book a Call"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/work",
                className: "m3-outlined-button inline-flex items-center justify-center",
                children: "See Our Work"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: resetForm,
              className: "m3-text-button text-m3-primary mt-4",
              children: "Send another message"
            }
          )
        ]
      }
    );
  }
  const inputClasses = (hasError) => `w-full px-3 py-2.5 rounded-xl bg-m3-surface-variant text-m3-on-surface text-sm border ${hasError ? "border-m3-secondary" : "border-transparent"} focus:outline-none focus:ring-2 focus:ring-m3-primary/30`;
  const selectClasses = (hasError) => `w-full px-3 py-2.5 rounded-xl bg-m3-surface-variant text-m3-on-surface text-sm border ${hasError ? "border-m3-secondary" : "border-transparent"} focus:outline-none focus:ring-2 focus:ring-m3-primary/30`;
  const labelClasses = "text-xs font-medium text-m3-on-surface/70 mb-1.5 block";
  return /* @__PURE__ */ jsx("div", { className: "m3-elevated-card p-5 sm:p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    handleSubmit(false);
  }, className: "space-y-4", noValidate: true, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        name: "website",
        value: formData.website,
        onChange: handleChange,
        className: "absolute -left-[9999px] opacity-0",
        tabIndex: -1,
        autoComplete: "off"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-name", className: labelClasses, children: "Name *" }),
        /* @__PURE__ */ jsx("input", { id: "contact-name", type: "text", name: "name", required: true, "aria-required": "true", value: formData.name, onChange: handleChange, className: inputClasses(!!errors.name), placeholder: "Your name" }),
        errors.name && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-email", className: labelClasses, children: "Email *" }),
        /* @__PURE__ */ jsx("input", { id: "contact-email", type: "email", name: "email", required: true, "aria-required": "true", value: formData.email, onChange: handleChange, className: inputClasses(!!errors.email), placeholder: "you@company.com" }),
        errors.email && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-phone", className: labelClasses, children: "Phone" }),
        /* @__PURE__ */ jsx("input", { id: "contact-phone", type: "tel", name: "phone", value: formData.phone, onChange: handleChange, className: inputClasses(!!errors.phone), placeholder: "Best number to reach you" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-company", className: labelClasses, children: "Company" }),
        /* @__PURE__ */ jsx("input", { id: "contact-company", type: "text", name: "company", value: formData.company, onChange: handleChange, className: inputClasses(!!errors.company), placeholder: "Company name" })
      ] })
    ] }),
    !compact && /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-role", className: labelClasses, children: "Role" }),
        /* @__PURE__ */ jsx("input", { id: "contact-role", type: "text", name: "role", value: formData.role, onChange: handleChange, className: inputClasses(false), placeholder: "Founder, marketing, ops" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-companyUrl", className: labelClasses, children: "Website" }),
        /* @__PURE__ */ jsx("input", { id: "contact-companyUrl", type: "url", name: "companyUrl", value: formData.companyUrl, onChange: handleChange, className: inputClasses(false), placeholder: "Link, if you have it" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-growthGoal", className: labelClasses, children: "What are you trying to grow? *" }),
        /* @__PURE__ */ jsxs("select", { id: "contact-growthGoal", name: "growthGoal", required: true, "aria-required": "true", value: formData.growthGoal, onChange: handleChange, className: selectClasses(!!errors.growthGoal), children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select" }),
          growthGoals.map((g) => /* @__PURE__ */ jsx("option", { value: g.value, children: g.label }, g.value))
        ] }),
        errors.growthGoal && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.growthGoal })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-service", className: labelClasses, children: "What do you need help with? *" }),
        /* @__PURE__ */ jsxs("select", { id: "contact-service", name: "service", required: true, "aria-required": "true", value: formData.service, onChange: handleChange, className: selectClasses(!!errors.service), children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select" }),
          serviceNeeds.map((s) => /* @__PURE__ */ jsx("option", { value: s.value, children: s.label }, s.value))
        ] }),
        errors.service && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.service })
      ] })
    ] }),
    !compact && /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-timeline", className: labelClasses, children: "Timeline" }),
        /* @__PURE__ */ jsx("input", { id: "contact-timeline", type: "text", name: "timeline", value: formData.timeline, onChange: handleChange, className: inputClasses(false), placeholder: "When do you want to launch" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "contact-budget", className: labelClasses, children: "Budget range" }),
        /* @__PURE__ */ jsx("input", { id: "contact-budget", type: "text", name: "budget", value: formData.budget, onChange: handleChange, className: inputClasses(false), placeholder: "A range is fine" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "contact-message", className: labelClasses, children: "Notes *" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "contact-message",
          name: "message",
          required: true,
          "aria-required": "true",
          value: formData.message,
          onChange: handleChange,
          rows: 3,
          className: `${inputClasses(!!errors.message)} resize-none`,
          placeholder: "What's working, what's not, what you want to improve"
        }
      ),
      errors.message && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-[10px] mt-0.5", children: errors.message })
    ] }),
    submitError && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-m3-secondary text-xs", children: submitError }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-2", children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        className: "m3-filled-button flex items-center justify-center gap-2 flex-1 py-2.5 text-sm disabled:opacity-50",
        children: [
          isSubmitting ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
          "Send"
        ]
      }
    ) })
  ] }) });
}
(_ia = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ia.call(globalThis, "src/pages/ContactPage.tsx");
function ContactPage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Contact Our San Francisco Video Crew",
        description: "For press, partnerships, or general questions. Hiring inquiries? Use Book a Call.",
        schema: organizationSchema
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-background", children: [
      /* @__PURE__ */ jsx(Navbar, { variant: "light" }),
      /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "outline-none", children: [
        /* @__PURE__ */ jsx("section", { className: "pt-28 pb-8 sm:pt-40 sm:pb-12 bg-m3-surface", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            className: "max-w-3xl",
            children: [
              /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mb-4", children: "Get in touch" }),
              /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-m3-on-surface/70 max-w-xl", children: "For press, partnerships, or general questions. Hiring inquiries → use Book a Call." })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx("section", { id: "inquiry-form", className: "py-12 sm:py-20 bg-m3-surface-variant scroll-mt-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "max-w-3xl mx-auto",
            children: /* @__PURE__ */ jsx("div", { className: "m3-elevated-card p-6 sm:p-8", children: /* @__PURE__ */ jsx(ContactForm, { showBookCall: true }) })
          }
        ) }) }),
        /* @__PURE__ */ jsx(KeepReading, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
(_ja = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ja.call(globalThis, "src/components/ui/avatar.tsx");
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Image, { ref, className: cn("aspect-square h-full w-full", className), ...props }));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const joshuaSvg = "/assets/joshua-B0TKGPSp.svg";
const danielSvg = "/assets/daniel-CF8thtF8.svg";
const gavinSvg = "/assets/gavin-CwEpex5n.svg";
const anthonySvg = "/assets/anthony-BVGkVrmB.svg";
const ryanSvg = "/assets/ryan-DGZsvl_B.svg";
const josephSvg = "/assets/joseph-HlQ-knOU.svg";
const mayadSvg = "/assets/mayad-b_NW25Zy.svg";
(_ka = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ka.call(globalThis, "src/pages/TeamPage.tsx");
const teamMembers = [
  {
    name: "Joshua Saltiban",
    role: "Chief Executive Officer, Founder",
    blurb: "Building Where2 from the ground up, vision, systems, and execution.",
    image: joshuaSvg,
    instagram: "heyyosalty",
    linkedin: "joshua-saltiban-486003209"
  },
  {
    name: "Daniel Martinez",
    role: "Head of Marketing, Co-Founder",
    blurb: "Marketing that actually moves, strategy, growth, and real results.",
    image: danielSvg,
    instagram: "hungrydanz",
    linkedin: "danieldean94"
  },
  {
    name: "Gavin Legaspi",
    role: "Creative Director, Co-Founder",
    blurb: "Turning real moments into visuals people feel and remember.",
    image: gavinSvg,
    instagram: "batang.gabino",
    linkedin: "gavin-legaspi-a85b57250"
  },
  {
    name: "Anthony Gonzalez",
    role: "Head of Brand & Content Strategy, Co-Founder",
    blurb: "Helping brands stay on point, content strategy with direction and taste.",
    image: anthonySvg,
    instagram: "antjgonz",
    linkedin: "anthony-gonzalez-7a8378349"
  },
  {
    name: "Ryan Sison",
    role: "Video Operations Lead",
    blurb: "Making every shoot run smooth, clean process, clean delivery.",
    image: ryanSvg,
    instagram: "just.ryjo"
  },
  {
    name: "Joseph Jimenez",
    role: "Head of Photography",
    blurb: "Capturing the details that make the story hit harder.",
    image: josephSvg,
    instagram: "itsjobruh"
  },
  {
    name: "Mayad Post Production House",
    role: "Overseas Post Production Powerhouse",
    blurb: "Our overseas post team, fast turnarounds, polished edits, built to scale.",
    image: mayadSvg,
    instagram: "mpost.ph"
  }
];
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function TeamPage() {
  const { openSheet } = useBookingSheet();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Meet the Bay Area Event Video Team | Where2Studios",
        description: "Meet the Where2Studios team. Producers, shooters and editors covering conferences, summits and brand activations across the San Francisco Bay Area.",
        url: "https://where2studios.com/who-we-are",
        schema: organizationSchema
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface", children: [
      /* @__PURE__ */ jsx(Navbar, { variant: "light" }),
      /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "outline-none", children: [
        /* @__PURE__ */ jsx("section", { className: "pt-28 pb-12 sm:pt-40 sm:pb-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            className: "max-w-3xl",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-m3-primary text-xs font-semibold uppercase tracking-widest", children: "Who We Are" }),
              /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2 mb-6", children: "We're not just a media company. We're your growth partner." }),
              /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-m3-on-surface/70 max-w-xl", children: "Built with startups in mind, we help emerging and scaling brands look established, credible, and unforgettable." })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx("section", { className: "pb-12 sm:pb-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl space-y-10", children: [
          /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mb-3", children: "What we do" }),
            /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/70 leading-relaxed", children: "From full scale marketing strategy to cinematic video production, photography, podcast production, event coverage, and brand storytelling, we create media that accelerates businesses forward." })
          ] }),
          /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mb-3", children: "Who we help" }),
            /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/70 leading-relaxed", children: "We specialize in startups and small businesses, and our portfolio spans hospitality, tourism, food and beverage, tech, and service based brands." })
          ] }),
          /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mb-3", children: "How we think" }),
            /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/70 leading-relaxed", children: "Every project starts with a strategy. Every asset has a purpose. Every campaign has a measurable goal. That's how brands grow." })
          ] }),
          /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "pt-4", children: /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/80 text-base sm:text-lg leading-relaxed font-medium italic", children: `"If you're building something worth sharing, we're the team that helps the world see it. Our goal is to tell stories worth sharing."` }) })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "pb-16 sm:pb-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto", children: teamMembers.map((member, index) => /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: index * 0.05 },
            viewport: { once: true },
            children: /* @__PURE__ */ jsxs("div", { className: "m3-outlined-card p-5 h-full transition-all duration-300 hover:border-m3-primary/30 group", children: [
              /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxs(Avatar, { className: "w-16 h-16", children: [
                member.image ? /* @__PURE__ */ jsx(
                  AvatarImage,
                  {
                    src: member.image,
                    alt: `Portrait of ${member.name} of the Where2Studios team`,
                    className: "object-cover"
                  }
                ) : null,
                /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-m3-surface-variant text-m3-on-surface text-lg font-semibold", children: getInitials(member.name) })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-fredoka font-semibold text-m3-on-surface text-sm", children: member.name }),
                /* @__PURE__ */ jsx("p", { className: "text-m3-primary text-xs font-medium mb-2 line-clamp-2", children: member.role }),
                /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/70 text-xs leading-relaxed", children: member.blurb })
              ] }),
              (member.instagram || member.linkedin) && /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-3 mt-4", children: [
                member.instagram && /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `https://instagram.com/${member.instagram}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-m3-on-surface/50 hover:text-m3-primary transition-colors",
                    "aria-label": `${member.name} on Instagram`,
                    children: /* @__PURE__ */ jsx(Instagram, { className: "w-4 h-4" })
                  }
                ),
                member.linkedin && /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `https://linkedin.com/in/${member.linkedin}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-m3-on-surface/50 hover:text-m3-primary transition-colors",
                    "aria-label": `${member.name} on LinkedIn`,
                    children: /* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          },
          member.name
        )) }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24 bg-m3-surface-variant", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface", children: "Ready to work with us?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-m3-on-surface/60 max-w-xl mx-auto", children: "Free 30 minute strategy call, we reply within 1 business day." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx("button", { onClick: openSheet, className: "m3-filled-button text-lg px-8 py-4", children: "Book a Call" }),
            /* @__PURE__ */ jsx(Link, { to: "/work", className: "m3-outlined-button", children: "See Our Work" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(KeepReading, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(FloatingCTA, {})
    ] })
  ] });
}
(_la = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _la.call(globalThis, "src/pages/NotFoundPage.tsx");
function NotFoundPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-dark flex items-center justify-center px-4", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Page Not Found on Where2Studios",
        description: "This page does not exist. Head back to Where2Studios for event recap video production in the San Francisco Bay Area.",
        robots: "noindex, follow"
      }
    ),
    /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "outline-none w-full max-w-3xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "text-center max-w-md mx-auto",
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-8xl sm:text-9xl font-bold text-m3-primary mb-4", children: "404" }),
            /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-m3-on-dark mb-4", children: "Page not found" }),
            /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/60 mb-8", children: "The page you're looking for doesn't exist or has been moved." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
              /* @__PURE__ */ jsxs(Link, { to: "/", className: "m3-filled-button inline-flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsx(Home, { className: "w-4 h-4" }),
                "Go Home"
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => window.history.back(),
                  className: "m3-outlined-button text-m3-on-dark border-m3-on-dark/30 hover:bg-m3-on-dark/10 inline-flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
                    "Go Back"
                  ]
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(KeepReading, { className: "mt-12 bg-transparent border-m3-on-dark/10" })
    ] })
  ] });
}
(_ma = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ma.call(globalThis, "src/hooks/useSocialPosts.ts");
function useSocialClients() {
  return useQuery({
    queryKey: ["social-clients"],
    queryFn: async () => {
      const { data, error } = await supabase.from("social_clients").select("*").order("name", { ascending: true });
      if (error) throw error;
      return data || [];
    }
  });
}
function useAdminSocialPosts() {
  return useQuery({
    queryKey: ["admin-social-posts"],
    queryFn: async () => {
      const { data: posts, error: postsError } = await supabase.from("social_posts").select("*").order("pinned", { ascending: false }).order("created_at", { ascending: false });
      if (postsError) throw postsError;
      if (!posts || posts.length === 0) return [];
      const clientIds = [...new Set(posts.map((p) => p.client_id))];
      const { data: clients, error: clientsError } = await supabase.from("social_clients").select("*").in("id", clientIds);
      if (clientsError) throw clientsError;
      const clientMap = new Map((clients || []).map((c) => [c.id, c]));
      return posts.map((post) => {
        const client = clientMap.get(post.client_id);
        if (!client) return null;
        return { ...post, client };
      }).filter((p) => p !== null);
    }
  });
}
function useCreateSocialPost() {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (post) => {
      const { data, error } = await supabase.from("social_posts").insert(post).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["social-posts"] });
      queryClient2.invalidateQueries({ queryKey: ["admin-social-posts"] });
    }
  });
}
function useUpdateSocialPost() {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { data, error } = await supabase.from("social_posts").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["social-posts"] });
      queryClient2.invalidateQueries({ queryKey: ["admin-social-posts"] });
    }
  });
}
function useDeleteSocialPost() {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("social_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["social-posts"] });
      queryClient2.invalidateQueries({ queryKey: ["admin-social-posts"] });
    }
  });
}
function getSocialThumbnail(post) {
  if (post.thumbnail_url) return post.thumbnail_url;
  return "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=800&fit=crop";
}
(_na = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _na.call(globalThis, "src/components/ui/input.tsx");
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
(_oa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _oa.call(globalThis, "src/components/ui/select.tsx");
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
(_pa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _pa.call(globalThis, "src/pages/admin/SocialAdminPage.tsx");
function SocialAdminPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: clients, isLoading: clientsLoading } = useSocialClients();
  const { data: posts, isLoading: postsLoading } = useAdminSocialPosts();
  const createPost = useCreateSocialPost();
  const updatePost = useUpdateSocialPost();
  const deletePost = useDeleteSocialPost();
  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [clientId, setClientId] = useState("");
  const [permalink, setPermalink] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [pinned, setPinned] = useState(false);
  const [excluded, setExcluded] = useState(false);
  const resetForm = () => {
    setClientId("");
    setPermalink("");
    setTitle("");
    setThumbnailUrl("");
    setPinned(false);
    setExcluded(false);
    setShowAddForm(false);
    setEditingPost(null);
  };
  const handleSubmit = async (e) => {
    var _a2;
    e.preventDefault();
    if (!clientId || !permalink) {
      toast.error("Client and permalink are required");
      return;
    }
    if (!permalink.includes("instagram.com")) {
      toast.error("Please enter a valid Instagram URL");
      return;
    }
    try {
      if (editingPost) {
        await updatePost.mutateAsync({
          id: editingPost.id,
          client_id: clientId,
          permalink,
          title: title || null,
          thumbnail_url: thumbnailUrl || null,
          pinned,
          excluded
        });
        toast.success("Post updated");
      } else {
        await createPost.mutateAsync({
          client_id: clientId,
          permalink,
          title: title || void 0,
          thumbnail_url: thumbnailUrl || void 0,
          pinned,
          excluded
        });
        toast.success("Post added");
      }
      resetForm();
    } catch (error) {
      if ((_a2 = error.message) == null ? void 0 : _a2.includes("duplicate key")) {
        toast.error("This Instagram link already exists");
      } else {
        toast.error(error.message || "Failed to save post");
      }
    }
  };
  const handleEdit = (post) => {
    setEditingPost(post);
    setClientId(post.client_id);
    setPermalink(post.permalink);
    setTitle(post.title || "");
    setThumbnailUrl(post.thumbnail_url || "");
    setPinned(post.pinned);
    setExcluded(post.excluded);
    setShowAddForm(true);
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost.mutateAsync(id);
      toast.success("Post deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete");
    }
  };
  const handleTogglePin = async (post) => {
    try {
      await updatePost.mutateAsync({ id: post.id, pinned: !post.pinned });
      toast.success(post.pinned ? "Unpinned" : "Pinned");
    } catch (error) {
      toast.error(error.message || "Failed to update");
    }
  };
  const handleToggleExclude = async (post) => {
    try {
      await updatePost.mutateAsync({ id: post.id, excluded: !post.excluded });
      toast.success(post.excluded ? "Now visible" : "Now hidden");
    } catch (error) {
      toast.error(error.message || "Failed to update");
    }
  };
  const isLoading = clientsLoading || postsLoading;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-dark", children: [
    /* @__PURE__ */ jsx("nav", { className: "sticky top-0 z-50 bg-m3-surface-dark/90 backdrop-blur-xl border-b border-m3-on-dark/10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16 sm:h-20", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 sm:gap-4 group", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5 text-m3-on-dark group-hover:text-m3-primary transition-colors" }),
        /* @__PURE__ */ jsx("img", { src: logo, alt: "Where2Studios", className: "h-10 sm:h-14 w-auto" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/admin/portfolio",
            className: "hidden sm:inline text-sm text-m3-on-dark/70 hover:text-m3-on-dark transition-colors",
            children: "Portfolio Uploads"
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-lg sm:text-xl font-semibold text-m3-on-dark", children: "Social Media Admin" }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:flex items-center gap-2 text-sm text-m3-on-dark/60", children: /* @__PURE__ */ jsx("span", { children: user == null ? void 0 : user.email }) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSignOut,
            className: "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm\n                           text-m3-on-dark/70 hover:text-m3-on-dark hover:bg-m3-surface-variant/30 transition-colors",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Sign Out" })
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 sm:px-8 lg:px-12 py-8", children: [
      !showAddForm && /* @__PURE__ */ jsxs(
        motion.button,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          onClick: () => setShowAddForm(true),
          className: "mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl \n                       bg-m3-primary text-m3-on-primary font-semibold hover:bg-m3-primary/90 transition-colors",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
            "Add Instagram Post"
          ]
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { children: showAddForm && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 },
          className: "mb-8",
          children: /* @__PURE__ */ jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "bg-m3-surface rounded-2xl p-6 space-y-4 border border-m3-outline",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl font-semibold text-m3-on-surface", children: editingPost ? "Edit Post" : "Add New Post" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: resetForm,
                      className: "p-2 rounded-full hover:bg-m3-surface-variant transition-colors",
                      children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-m3-on-surface/60" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-m3-on-surface mb-1", children: "Client *" }),
                    /* @__PURE__ */ jsxs(Select, { value: clientId, onValueChange: setClientId, children: [
                      /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full bg-m3-surface-variant border-m3-outline", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select client" }) }),
                      /* @__PURE__ */ jsx(SelectContent, { children: clients == null ? void 0 : clients.map((client) => /* @__PURE__ */ jsxs(SelectItem, { value: client.id, children: [
                        client.name,
                        " (@",
                        client.ig_handle,
                        ")"
                      ] }, client.id)) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-m3-on-surface mb-1", children: "Instagram Permalink *" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "url",
                        placeholder: "https://www.instagram.com/p/...",
                        value: permalink,
                        onChange: (e) => setPermalink(e.target.value),
                        className: "bg-m3-surface-variant border-m3-outline"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-m3-on-surface mb-1", children: "Title (optional)" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "text",
                        placeholder: "Custom title for display",
                        value: title,
                        onChange: (e) => setTitle(e.target.value),
                        className: "bg-m3-surface-variant border-m3-outline"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-m3-on-surface mb-1", children: "Thumbnail URL (optional)" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "url",
                        placeholder: "https://...",
                        value: thumbnailUrl,
                        onChange: (e) => setThumbnailUrl(e.target.value),
                        className: "bg-m3-surface-variant border-m3-outline"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 pt-2", children: [
                  /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: pinned,
                        onChange: (e) => setPinned(e.target.checked),
                        className: "w-4 h-4 rounded border-m3-outline text-m3-primary focus:ring-m3-primary"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-m3-on-surface", children: "Pinned (show first)" })
                  ] }),
                  /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: excluded,
                        onChange: (e) => setExcluded(e.target.checked),
                        className: "w-4 h-4 rounded border-m3-outline text-m3-secondary focus:ring-m3-secondary"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-m3-on-surface", children: "Excluded (hide from public)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "submit",
                      disabled: createPost.isPending || updatePost.isPending,
                      className: "bg-m3-primary text-m3-on-primary hover:bg-m3-primary/90",
                      children: [
                        /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 mr-2" }),
                        editingPost ? "Update Post" : "Add Post"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: resetForm, children: "Cancel" })
                ] })
              ]
            }
          )
        }
      ) }),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-20 bg-m3-surface-variant rounded-xl animate-pulse" }, i)) }) : posts && posts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: posts.map((post) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: `flex items-center gap-4 p-4 rounded-xl border transition-colors
                           ${post.excluded ? "bg-m3-surface-variant/50 border-m3-outline/50 opacity-60" : "bg-m3-surface border-m3-outline"}`,
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: getSocialThumbnail(post),
                alt: post.title || post.client.name,
                className: "w-14 h-20 object-cover rounded-lg flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-fredoka font-semibold text-m3-on-surface truncate", children: post.title || post.client.name }),
                post.pinned && /* @__PURE__ */ jsxs("span", { className: "px-2 py-0.5 rounded-full bg-m3-primary/20 text-m3-primary text-xs font-semibold flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Pin, { className: "w-3 h-3" }),
                  " Pinned"
                ] }),
                post.excluded && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-m3-secondary/20 text-m3-secondary text-xs font-semibold", children: "Hidden" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-m3-on-surface/60 truncate", children: [
                "@",
                post.client.ig_handle
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-m3-on-surface/40 truncate mt-1", children: post.permalink })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleTogglePin(post),
                  className: "p-2 rounded-lg hover:bg-m3-surface-variant transition-colors",
                  title: post.pinned ? "Unpin" : "Pin",
                  children: post.pinned ? /* @__PURE__ */ jsx(PinOff, { className: "w-4 h-4 text-m3-primary" }) : /* @__PURE__ */ jsx(Pin, { className: "w-4 h-4 text-m3-on-surface/60" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleToggleExclude(post),
                  className: "p-2 rounded-lg hover:bg-m3-surface-variant transition-colors",
                  title: post.excluded ? "Show" : "Hide",
                  children: post.excluded ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-m3-secondary" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4 text-m3-on-surface/60" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleEdit(post),
                  className: "p-2 rounded-lg hover:bg-m3-surface-variant transition-colors",
                  title: "Edit",
                  children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4 text-m3-on-surface/60" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(post.id),
                  className: "p-2 rounded-lg hover:bg-m3-secondary/10 transition-colors",
                  title: "Delete",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-m3-secondary" })
                }
              )
            ] })
          ]
        },
        post.id
      )) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-16", children: /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/60 mb-4", children: "No posts yet. Add your first Instagram post above." }) })
    ] })
  ] });
}
(_qa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _qa.call(globalThis, "src/components/ui/progress.tsx");
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
(_ra = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ra.call(globalThis, "src/components/ui/switch.tsx");
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
(_sa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _sa.call(globalThis, "src/lib/sha256.ts");
const K = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
class Sha256 {
  constructor() {
    __publicField(this, "h", new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]));
    __publicField(this, "buffer", new Uint8Array(64));
    __publicField(this, "bufferLength", 0);
    __publicField(this, "bytesTotal", 0);
    __publicField(this, "w", new Uint32Array(64));
  }
  update(data) {
    this.bytesTotal += data.length;
    let offset = 0;
    if (this.bufferLength > 0) {
      const need = 64 - this.bufferLength;
      const take = Math.min(need, data.length);
      this.buffer.set(data.subarray(0, take), this.bufferLength);
      this.bufferLength += take;
      offset = take;
      if (this.bufferLength === 64) {
        this.block(this.buffer, 0);
        this.bufferLength = 0;
      }
    }
    while (offset + 64 <= data.length) {
      this.block(data, offset);
      offset += 64;
    }
    if (offset < data.length) {
      this.buffer.set(data.subarray(offset), 0);
      this.bufferLength = data.length - offset;
    }
  }
  digestHex() {
    const bitLen = this.bytesTotal * 8;
    const padLength = this.bufferLength < 56 ? 56 - this.bufferLength : 120 - this.bufferLength;
    const tail = new Uint8Array(padLength + 8);
    tail[0] = 128;
    const view = new DataView(tail.buffer);
    view.setUint32(padLength, Math.floor(bitLen / 4294967296));
    view.setUint32(padLength + 4, bitLen >>> 0);
    this.bytesTotal -= tail.length;
    this.update(tail);
    let out = "";
    for (let i = 0; i < 8; i++) out += this.h[i].toString(16).padStart(8, "0");
    return out;
  }
  block(data, offset) {
    const w = this.w;
    for (let i = 0; i < 16; i++) {
      const j = offset + i * 4;
      w[i] = data[j] << 24 | data[j + 1] << 16 | data[j + 2] << 8 | data[j + 3];
    }
    for (let i = 16; i < 64; i++) {
      const x = w[i - 15];
      const y = w[i - 2];
      const s0 = (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
      const s1 = (y >>> 17 | y << 15) ^ (y >>> 19 | y << 13) ^ y >>> 10;
      w[i] = w[i - 16] + s0 + w[i - 7] + s1 | 0;
    }
    let [a, b, c, d, e, f, g, h] = this.h;
    for (let i = 0; i < 64; i++) {
      const S1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
      const ch = e & f ^ ~e & g;
      const t1 = h + S1 + ch + K[i] + w[i] | 0;
      const S0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
      const maj = a & b ^ a & c ^ b & c;
      const t2 = S0 + maj | 0;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    this.h[0] = this.h[0] + a | 0;
    this.h[1] = this.h[1] + b | 0;
    this.h[2] = this.h[2] + c | 0;
    this.h[3] = this.h[3] + d | 0;
    this.h[4] = this.h[4] + e | 0;
    this.h[5] = this.h[5] + f | 0;
    this.h[6] = this.h[6] + g | 0;
    this.h[7] = this.h[7] + h | 0;
  }
}
async function hashFile(file, onProgress) {
  const hasher = new Sha256();
  const chunkSize = 4 * 1024 * 1024;
  let offset = 0;
  while (offset < file.size) {
    const slice = file.slice(offset, Math.min(offset + chunkSize, file.size));
    const buf = new Uint8Array(await slice.arrayBuffer());
    hasher.update(buf);
    offset += chunkSize;
    onProgress == null ? void 0 : onProgress(Math.min(1, offset / file.size));
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  return hasher.digestHex();
}
(_ta = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ta.call(globalThis, "src/hooks/usePortfolioUploads.ts");
const SELECT = "id, slug, title, client_name, convention_slug, category, media_type, source, video_url, thumbnail_url, file_hash, file_size, duration_seconds, width, height, featured, published, show_on_main_site, display_order, created_at";
function useUploadedProjects() {
  return useQuery({
    queryKey: ["portfolio-uploads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select(SELECT).eq("source", "upload").order("display_order", { ascending: true }).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    }
  });
}
async function findExistingHashes(hashes) {
  if (hashes.length === 0) return /* @__PURE__ */ new Map();
  const { data, error } = await supabase.from("projects").select("id, title, file_hash").in("file_hash", hashes);
  if (error) throw error;
  const map = /* @__PURE__ */ new Map();
  for (const row of data ?? []) {
    if (row.file_hash) map.set(row.file_hash, row.title);
  }
  return map;
}
async function buildUniqueSlug(title) {
  const base = slugify(title) || "upload";
  const { data, error } = await supabase.from("projects").select("slug").like("slug", `${base}%`);
  if (error) throw error;
  const taken = new Set((data ?? []).map((r) => r.slug));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}
function useInsertUploadedProject() {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (row) => {
      const { data, error } = await supabase.from("projects").insert(row).select(SELECT).single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["portfolio-uploads"] });
      queryClient2.invalidateQueries({ queryKey: ["all-projects"] });
    }
  });
}
function useUpdateUploadedProject() {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...changes }) => {
      const { error } = await supabase.from("projects").update(changes).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["portfolio-uploads"] });
      queryClient2.invalidateQueries({ queryKey: ["all-projects"] });
      queryClient2.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
function useDeleteUploadedProject() {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (project) => {
      const paths = [
        portfolioPathFromUrl(project.video_url),
        portfolioPathFromUrl(project.thumbnail_url)
      ].filter((p) => Boolean(p));
      await removePortfolioObjects(paths);
      const { error } = await supabase.from("projects").delete().eq("id", project.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["portfolio-uploads"] });
      queryClient2.invalidateQueries({ queryKey: ["all-projects"] });
      queryClient2.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
(_ua = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ua.call(globalThis, "src/pages/admin/PortfolioAdminPage.tsx");
function statusLabel(item) {
  switch (item.status) {
    case "queued":
      return "Waiting";
    case "hashing":
      return "Checking for duplicates";
    case "duplicate":
      return "Already in portfolio";
    case "uploading":
      return "Uploading";
    case "done":
      return "Added, unpublished";
    case "skipped":
      return item.message || "Skipped";
    default:
      return item.message || "Failed";
  }
}
function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;
}
function visibleFiles(files) {
  return files.filter((file) => !file.name.startsWith("."));
}
async function readEntry(entry) {
  if (entry.name.startsWith(".")) return [];
  if (entry.isFile) {
    const file = await new Promise(
      (resolve) => entry.file(resolve, () => resolve(null))
    );
    return file ? [file] : [];
  }
  const reader = entry.createReader();
  const children = [];
  let batch = [];
  do {
    batch = await new Promise(
      (resolve) => reader.readEntries(resolve, () => resolve([]))
    );
    children.push(...batch);
  } while (batch.length > 0);
  const files = [];
  for (const child of children) files.push(...await readEntry(child));
  return files;
}
function PortfolioAdminPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const inputRef = useRef(null);
  const folderInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [queue, setQueue] = useState([]);
  const [busy, setBusy] = useState(false);
  const { data: uploads, isLoading } = useUploadedProjects();
  const insertProject = useInsertUploadedProject();
  const updateProject = useUpdateUploadedProject();
  const deleteProject = useDeleteUploadedProject();
  const totalProgress = useMemo(() => {
    const active = queue.filter((i) => i.status !== "skipped");
    if (active.length === 0) return 0;
    const sum = active.reduce(
      (acc, i) => acc + (i.status === "done" || i.status === "duplicate" ? 1 : i.progress),
      0
    );
    return Math.round(sum / active.length * 100);
  }, [queue]);
  const patch = useCallback((id, changes) => {
    setQueue((prev) => prev.map((item) => item.id === id ? { ...item, ...changes } : item));
  }, []);
  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };
  const processFiles = useCallback(
    async (files) => {
      if (files.length === 0) return;
      const items = files.map((file) => {
        const mediaType = detectMediaType(file);
        return {
          id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
          file,
          mediaType: mediaType ?? "video",
          status: mediaType ? "queued" : "skipped",
          progress: 0,
          message: mediaType ? void 0 : "Unsupported file type"
        };
      });
      setQueue((prev) => [...prev, ...items]);
      setBusy(true);
      for (const item of items) {
        if (item.status === "skipped") continue;
        try {
          patch(item.id, { status: "hashing", progress: 0.02 });
          const hash = await hashFile(item.file, (f) => patch(item.id, { progress: f * 0.15 }));
          const existing = await findExistingHashes([hash]);
          if (existing.has(hash)) {
            patch(item.id, { status: "duplicate", progress: 1, message: "Already in portfolio" });
            continue;
          }
          patch(item.id, { status: "uploading" });
          const title = titleFromFilename(item.file.name);
          const slug = await buildUniqueSlug(title);
          let videoUrl = null;
          let thumbnailUrl = null;
          let duration = null;
          let width = null;
          let height = null;
          if (item.mediaType === "video") {
            const meta = await extractVideoMeta(item.file).catch(() => ({
              duration: null,
              width: null,
              height: null,
              poster: null
            }));
            duration = meta.duration;
            width = meta.width;
            height = meta.height;
            videoUrl = await uploadPortfolioFile(
              buildStoragePath("videos", item.file.name),
              item.file,
              item.file.type || "video/mp4",
              (f) => patch(item.id, { progress: 0.15 + f * 0.75 })
            );
            if (meta.poster) {
              const posterName = item.file.name.replace(/\.[^.]+$/, "") + ".jpg";
              thumbnailUrl = await uploadPortfolioFile(
                buildStoragePath("posters", posterName),
                meta.poster,
                "image/jpeg"
              );
            }
          } else {
            const size2 = await readImageSize(item.file);
            width = size2.width;
            height = size2.height;
            const url2 = await uploadPortfolioFile(
              buildStoragePath("photos", item.file.name),
              item.file,
              item.file.type || "image/jpeg",
              (f) => patch(item.id, { progress: 0.15 + f * 0.8 })
            );
            videoUrl = null;
            thumbnailUrl = url2;
          }
          const inserted = await insertProject.mutateAsync({
            title,
            slug,
            category: item.mediaType === "photo" ? "photos" : "convention-week",
            media_type: item.mediaType,
            source: "upload",
            video_url: videoUrl,
            thumbnail_url: thumbnailUrl,
            file_hash: hash,
            file_size: item.file.size,
            duration_seconds: duration,
            width,
            height,
            published: false,
            show_on_main_site: true,
            featured: false,
            display_order: 0
          });
          patch(item.id, { status: "done", progress: 1, projectId: inserted.id });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Upload failed";
          patch(item.id, { status: "error", message });
        }
      }
      setBusy(false);
      toast.success("Upload run finished. Everything new is unpublished.");
    },
    [insertProject, patch]
  );
  const onDrop = async (event) => {
    event.preventDefault();
    setDragActive(false);
    const items = Array.from(event.dataTransfer.items ?? []);
    const entries = items.map((item) => typeof item.webkitGetAsEntry === "function" ? item.webkitGetAsEntry() : null).filter((entry) => Boolean(entry));
    if (entries.length === 0) {
      processFiles(visibleFiles(Array.from(event.dataTransfer.files)));
      return;
    }
    const collected = [];
    for (const entry of entries) collected.push(...await readEntry(entry));
    processFiles(visibleFiles(collected));
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-dark", children: [
    /* @__PURE__ */ jsx("nav", { className: "sticky top-0 z-50 bg-m3-surface-dark/90 backdrop-blur-xl border-b border-m3-on-dark/10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16 sm:h-20", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 sm:gap-4 group", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5 text-m3-on-dark group-hover:text-m3-primary transition-colors" }),
        /* @__PURE__ */ jsx("img", { src: logo, alt: "Where2Studios", className: "h-10 sm:h-14 w-auto" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/admin/social",
            className: "hidden sm:inline text-sm text-m3-on-dark/70 hover:text-m3-on-dark transition-colors",
            children: "Social Admin"
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-lg sm:text-xl font-semibold text-m3-on-dark", children: "Portfolio Uploads" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-sm text-m3-on-dark/60", children: user == null ? void 0 : user.email }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSignOut,
            className: "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-m3-on-dark/70 hover:text-m3-on-dark hover:bg-m3-surface-variant/30 transition-colors",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Sign Out" })
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-10", children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            onDragOver: (e) => {
              e.preventDefault();
              setDragActive(true);
            },
            onDragLeave: () => setDragActive(false),
            onDrop,
            onClick: () => {
              var _a2;
              return (_a2 = inputRef.current) == null ? void 0 : _a2.click();
            },
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => {
              var _a2;
              if (e.key === "Enter" || e.key === " ") (_a2 = inputRef.current) == null ? void 0 : _a2.click();
            },
            className: `cursor-pointer rounded-3xl border-2 border-dashed p-10 sm:p-16 text-center transition-colors
              ${dragActive ? "border-m3-primary bg-m3-primary/10" : "border-m3-on-dark/20 hover:border-m3-primary/60"}`,
            children: [
              /* @__PURE__ */ jsx(UploadCloud, { className: "w-10 h-10 mx-auto text-m3-primary mb-4" }),
              /* @__PURE__ */ jsx("p", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-dark", children: "Drop videos and photos here" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-m3-on-dark/60", children: "mp4, mov, webm, jpg, png, heic, webp. Whole folders work too. Large videos resume if the connection drops." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-3", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    onClick: (e) => {
                      var _a2;
                      e.stopPropagation();
                      (_a2 = inputRef.current) == null ? void 0 : _a2.click();
                    },
                    children: "Choose files"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: (e) => {
                      var _a2;
                      e.stopPropagation();
                      (_a2 = folderInputRef.current) == null ? void 0 : _a2.click();
                    },
                    children: "Choose folder"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  type: "file",
                  multiple: true,
                  accept: UPLOAD_ACCEPT,
                  className: "hidden",
                  onChange: (e) => {
                    processFiles(visibleFiles(Array.from(e.target.files ?? [])));
                    e.target.value = "";
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: folderInputRef,
                  type: "file",
                  multiple: true,
                  ...{ webkitdirectory: "", directory: "" },
                  className: "hidden",
                  onChange: (e) => {
                    processFiles(visibleFiles(Array.from(e.target.files ?? [])));
                    e.target.value = "";
                  }
                }
              )
            ]
          }
        ),
        queue.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Progress, { value: totalProgress, className: "h-2 flex-1" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-m3-on-dark/70 w-12 text-right", children: [
              totalProgress,
              "%"
            ] }),
            !busy && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => setQueue([]), children: "Clear" })
          ] }),
          queue.map((item) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "rounded-xl bg-m3-surface-variant/20 border border-m3-on-dark/10 p-3",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-dark truncate", children: item.file.name }),
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-xs text-m3-on-dark/70 whitespace-nowrap", children: [
                    item.status === "done" && /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-m3-primary" }),
                    (item.status === "error" || item.status === "duplicate") && /* @__PURE__ */ jsx(AlertCircle, { className: "w-3.5 h-3.5 text-m3-secondary" }),
                    statusLabel(item)
                  ] })
                ] }),
                (item.status === "hashing" || item.status === "uploading") && /* @__PURE__ */ jsx(Progress, { value: Math.round(item.progress * 100), className: "h-1.5 mt-2" })
              ]
            },
            item.id
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl font-semibold text-m3-on-dark mb-4", children: "Uploaded media" }),
        isLoading ? /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/60 text-sm", children: "Loading..." }) : !uploads || uploads.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-m3-on-dark/60 text-sm", children: "Nothing uploaded yet." }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: uploads.map((project, index) => /* @__PURE__ */ jsx(
          UploadRow,
          {
            project,
            isFirst: index === 0,
            isLast: index === uploads.length - 1,
            onSave: (changes) => updateProject.mutateAsync({ id: project.id, ...changes }).then(() => toast.success("Saved")).catch((e) => toast.error(e.message)),
            onMove: (direction) => {
              const swapWith = uploads[index + direction];
              if (!swapWith) return;
              Promise.all([
                updateProject.mutateAsync({
                  id: project.id,
                  display_order: swapWith.display_order
                }),
                updateProject.mutateAsync({
                  id: swapWith.id,
                  display_order: project.display_order
                })
              ]).catch((e) => toast.error(e.message));
            },
            onDelete: () => {
              if (!window.confirm(`Delete "${project.title}" and its files?`)) return;
              deleteProject.mutateAsync(project).then(() => toast.success("Deleted")).catch((e) => toast.error(e.message));
            }
          },
          project.id
        )) })
      ] })
    ] })
  ] });
}
function UploadRow({
  project,
  isFirst,
  isLast,
  onSave,
  onMove,
  onDelete
}) {
  const [title, setTitle] = useState(project.title);
  const [clientName, setClientName] = useState(project.client_name ?? "");
  const [category, setCategory] = useState(project.category);
  const [conventionSlug, setConventionSlug] = useState(project.convention_slug ?? "none");
  const [published, setPublished] = useState(project.published);
  const [onMainSite, setOnMainSite] = useState(project.show_on_main_site);
  const [featured, setFeatured] = useState(project.featured);
  return /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-m3-surface-variant/20 border border-m3-on-dark/10 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-40 shrink-0", children: [
      project.thumbnail_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: project.thumbnail_url,
          alt: project.title,
          className: "w-full aspect-video object-cover rounded-lg bg-m3-surface-dark",
          loading: "lazy"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "w-full aspect-video rounded-lg bg-m3-surface-dark" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-m3-on-dark/50", children: [
        project.media_type === "photo" ? "Photo" : "Video",
        " ",
        formatSize(project.file_size)
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 grid sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Title" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          value: clientName,
          onChange: (e) => setClientName(e.target.value),
          placeholder: "Client name"
        }
      ),
      /* @__PURE__ */ jsxs(Select, { value: category, onValueChange: setCategory, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Category" }) }),
        /* @__PURE__ */ jsx(SelectContent, { children: UPLOAD_CATEGORIES.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.value, children: c.label }, c.value)) })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: conventionSlug, onValueChange: setConventionSlug, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Convention" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "No convention" }),
          conventions.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.slug, children: c.name }, c.slug))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-m3-on-dark/80", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Switch, { checked: published, onCheckedChange: setPublished }),
          "Published"
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Switch, { checked: onMainSite, onCheckedChange: setOnMainSite }),
          "Main site"
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Switch, { checked: featured, onCheckedChange: setFeatured }),
          "Featured"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex lg:flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          size: "sm",
          onClick: () => onSave({
            title,
            client_name: clientName || null,
            category,
            convention_slug: conventionSlug === "none" ? null : conventionSlug,
            published,
            show_on_main_site: onMainSite,
            featured
          }),
          children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-1" }),
            "Save"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", disabled: isFirst, onClick: () => onMove(-1), "aria-label": "Move up", children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", disabled: isLast, onClick: () => onMove(1), "aria-label": "Move down", children: /* @__PURE__ */ jsx(ArrowDown, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: onDelete, "aria-label": "Delete", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-m3-secondary" }) })
    ] })
  ] }) });
}
(_va = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _va.call(globalThis, "src/integrations/lovable/index.ts");
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        ...opts,
        extraParams: {
          ...opts == null ? void 0 : opts.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
(_wa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _wa.call(globalThis, "src/pages/admin/AdminLoginPage.tsx");
function AdminLoginPage() {
  var _a2, _b2;
  const navigate = useNavigate();
  const location2 = useLocation();
  const { signIn, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const from = ((_b2 = (_a2 = location2.state) == null ? void 0 : _a2.from) == null ? void 0 : _b2.pathname) || "/admin/social";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }
    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError.message || "Invalid credentials");
      setIsLoading(false);
      return;
    }
    navigate(from, { replace: true });
  };
  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin
    });
    if (result.error) {
      setError(result.error.message || "Could not sign in with Google");
      setIsGoogleLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate(from, { replace: true });
  };
  const handleAppleSignIn = async () => {
    setError("");
    setIsAppleLoading(true);
    const result = await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin
    });
    if (result.error) {
      setError(result.error.message || "Could not sign in with Apple");
      setIsAppleLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate(from, { replace: true });
  };
  if (authLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-m3-surface-dark flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-4 border-m3-primary border-t-transparent rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-surface-dark flex flex-col", children: [
    /* @__PURE__ */ jsx("nav", { className: "border-b border-m3-on-dark/10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "flex items-center h-16 sm:h-20", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 sm:gap-4 group", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5 text-m3-on-dark group-hover:text-m3-primary transition-colors" }),
      /* @__PURE__ */ jsx("img", { src: logo, alt: "Where2Studios", className: "h-10 sm:h-14 w-auto" })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "w-full max-w-md",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-m3-surface rounded-2xl p-8 border border-m3-outline shadow-xl", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-m3-primary/20 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(LogIn, { className: "w-7 h-7 text-m3-primary" }) }),
              /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-2xl font-semibold text-m3-on-surface", children: "Admin Login" }),
              /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/60 mt-2 text-sm", children: "Sign in to access the admin dashboard" })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              error && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  className: "flex items-center gap-2 p-3 rounded-xl bg-m3-secondary/10 text-m3-secondary text-sm",
                  children: [
                    /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: error })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-m3-on-surface mb-1", children: "Email" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "email",
                    placeholder: "admin@example.com",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    className: "bg-m3-surface-variant border-m3-outline",
                    autoComplete: "email",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-m3-on-surface mb-1", children: "Password" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "password",
                    placeholder: "••••••••",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    className: "bg-m3-surface-variant border-m3-outline",
                    autoComplete: "current-password",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: isLoading,
                  className: "w-full bg-m3-primary text-m3-on-primary hover:bg-m3-primary/90 h-11 font-semibold",
                  children: isLoading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-m3-on-primary border-t-transparent rounded-full animate-spin" }),
                    "Signing in..."
                  ] }) : "Sign In"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 my-5", children: [
              /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-m3-outline" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-m3-on-surface/50", children: "or" }),
              /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-m3-outline" })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                onClick: handleGoogleSignIn,
                disabled: isGoogleLoading,
                variant: "outline",
                className: "w-full h-11 font-semibold border-m3-outline bg-m3-surface-variant text-m3-on-surface hover:bg-m3-surface-variant/70",
                children: isGoogleLoading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-m3-on-surface border-t-transparent rounded-full animate-spin" }),
                  "Signing in..."
                ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("img", { src: googleIcon, alt: "", "aria-hidden": "true", className: "w-4 h-4" }),
                  "Continue with Google"
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                onClick: handleAppleSignIn,
                disabled: isAppleLoading,
                variant: "outline",
                className: "w-full h-11 mt-3 font-semibold border-m3-outline bg-m3-surface-variant text-m3-on-surface hover:bg-m3-surface-variant/70",
                children: isAppleLoading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-m3-on-surface border-t-transparent rounded-full animate-spin" }),
                  "Signing in..."
                ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" }) }),
                  "Continue with Apple"
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-m3-on-dark/40 text-xs mt-6", children: "Only authorized administrators can access this area." })
        ]
      }
    ) })
  ] });
}
(_xa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _xa.call(globalThis, "src/components/layout/BackButton.tsx");
(_ya = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ya.call(globalThis, "src/components/layout/index.ts");
(_za = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _za.call(globalThis, "src/pages/PrivacyPolicyPage.tsx");
function PrivacyPolicyPage() {
  return /* @__PURE__ */ jsxs(PageLayout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Privacy Policy and Data Practices",
        description: "How Where2Studios collects, uses and protects your information when you use our site or our event video and social media services.",
        url: "https://where2studios.com/privacy",
        robots: "noindex, follow"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background pt-24 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "container max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Last updated: February 1, 2026" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none text-foreground", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "1. Introduction" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: 'Where2Studios ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website where2studios.com (the "Site") or use our video production and social media services.' }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mt-4", children: "By using our Site or services, you agree to the collection and use of information in accordance with this policy." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "2. Information We Collect" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium mb-3 text-foreground", children: "Personal Information" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "When you contact us or request our services, we may collect:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Name" }),
            /* @__PURE__ */ jsx("li", { children: "Email address" }),
            /* @__PURE__ */ jsx("li", { children: "Phone number" }),
            /* @__PURE__ */ jsx("li", { children: "Company name" }),
            /* @__PURE__ */ jsx("li", { children: "Project details and messages you send us" }),
            /* @__PURE__ */ jsx("li", { children: "Budget and timeline preferences" }),
            /* @__PURE__ */ jsx("li", { children: "How you heard about us (referral source)" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium mb-3 mt-6 text-foreground", children: "Automatically Collected Information" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "When you visit our Site, we may automatically collect:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "IP address (used for rate limiting and security purposes only)" }),
            /* @__PURE__ */ jsx("li", { children: "Browser type and version" }),
            /* @__PURE__ */ jsx("li", { children: "Device information" }),
            /* @__PURE__ */ jsx("li", { children: "Pages visited and time spent" }),
            /* @__PURE__ */ jsx("li", { children: "Referring website" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "3. How We Use Your Information" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We use the information we collect to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Respond to your inquiries and provide customer service" }),
            /* @__PURE__ */ jsx("li", { children: "Provide project quotes and discuss project requirements" }),
            /* @__PURE__ */ jsx("li", { children: "Deliver our video production and social media services" }),
            /* @__PURE__ */ jsx("li", { children: "Send you confirmation emails and project updates" }),
            /* @__PURE__ */ jsx("li", { children: "Prevent spam and abuse through rate limiting" }),
            /* @__PURE__ */ jsx("li", { children: "Improve our website and services" }),
            /* @__PURE__ */ jsx("li", { children: "Comply with legal obligations" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "4. Data Protection & Security" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We implement appropriate technical and organizational security measures to protect your personal information, including:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Encrypted data transmission (HTTPS/TLS)" }),
            /* @__PURE__ */ jsx("li", { children: "Secure database storage with row-level security policies" }),
            /* @__PURE__ */ jsx("li", { children: "Limited access to personal data (admin-only access controls)" }),
            /* @__PURE__ */ jsx("li", { children: "Server-side validation and sanitization of all inputs" }),
            /* @__PURE__ */ jsx("li", { children: "Rate limiting to prevent abuse" }),
            /* @__PURE__ */ jsx("li", { children: "Regular security audits" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mt-4", children: "However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "5. Data Retention" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Contact form submissions: Retained for business relationship management and legal compliance" }),
            /* @__PURE__ */ jsx("li", { children: "Rate limiting data: Automatically purged after the rate limit window expires (typically 1 hour)" }),
            /* @__PURE__ */ jsx("li", { children: "Project files and deliverables: Retained according to client agreements" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "6. Sharing Your Information" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Service Providers:" }),
              " We use trusted third-party services (such as email delivery services) to operate our business. These providers are contractually obligated to protect your data."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Legal Requirements:" }),
              " We may disclose your information if required by law, court order, or government request."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Business Transfers:" }),
              " In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "7. Third-Party Services" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Our website may contain links to third-party websites or integrate with third-party services:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Cal.com:" }),
              " For scheduling discovery calls"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Instagram:" }),
              " For displaying our social media portfolio"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Vimeo/YouTube:" }),
              " For hosting video content"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mt-4", children: "These third-party services have their own privacy policies. We encourage you to review their policies before providing any personal information." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "8. Cookies" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Our website uses minimal cookies and local storage for essential functionality only. We do not use tracking cookies or third-party advertising cookies." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "9. Your Rights" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Depending on your location, you may have the following rights regarding your personal information:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Access:" }),
              " Request a copy of the personal information we hold about you"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Correction:" }),
              " Request correction of inaccurate or incomplete information"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Deletion:" }),
              " Request deletion of your personal information"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Portability:" }),
              " Request a copy of your data in a machine-readable format"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Objection:" }),
              " Object to certain types of processing"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground leading-relaxed mt-4", children: [
            "To exercise any of these rights, please contact us at",
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:contact@where2studios.com", className: "text-primary hover:underline", children: "contact@where2studios.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "10. California Privacy Rights (CCPA)" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Right to know what personal information is collected" }),
            /* @__PURE__ */ jsx("li", { children: "Right to know if personal information is sold or disclosed and to whom" }),
            /* @__PURE__ */ jsx("li", { children: "Right to opt-out of the sale of personal information" }),
            /* @__PURE__ */ jsx("li", { children: "Right to non-discrimination for exercising your privacy rights" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mt-4", children: /* @__PURE__ */ jsx("strong", { children: "We do not sell your personal information." }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "11. Children's Privacy" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "12. Changes to This Policy" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.' })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "13. Contact Us" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "If you have any questions about this Privacy Policy or our data practices, please contact us:" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 p-6 bg-muted/30 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-foreground font-semibold", children: "Where2Studios" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "Bay Area, California" }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-1", children: [
              "Email:",
              " ",
              /* @__PURE__ */ jsx("a", { href: "mailto:contact@where2studios.com", className: "text-primary hover:underline", children: "contact@where2studios.com" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-1", children: [
              "Website:",
              " ",
              /* @__PURE__ */ jsx("a", { href: "https://where2studios.com", className: "text-primary hover:underline", children: "where2studios.com" })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
(_Aa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Aa.call(globalThis, "src/pages/TermsOfServicePage.tsx");
function TermsOfServicePage() {
  return /* @__PURE__ */ jsxs(PageLayout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Terms of Service and Site Use",
        description: "The terms that apply when you use the Where2Studios website and our event video production and social media services.",
        url: "https://where2studios.com/terms",
        robots: "noindex, follow"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background pt-24 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "container max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Terms of Service" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Last updated: February 1, 2026" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none text-foreground", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "1. Acceptance of Terms" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "By accessing and using the Where2Studios website (where2studios.com) and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "2. Description of Services" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Where2Studios provides professional video production and social media content creation services, including but not limited to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Corporate video production" }),
            /* @__PURE__ */ jsx("li", { children: "Commercial and advertising content" }),
            /* @__PURE__ */ jsx("li", { children: "Event videography" }),
            /* @__PURE__ */ jsx("li", { children: "Wedding videography" }),
            /* @__PURE__ */ jsx("li", { children: "Social media content creation and management" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "3. Use of Website" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of others. You agree not to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Submit false or misleading information" }),
            /* @__PURE__ */ jsx("li", { children: "Attempt to gain unauthorized access to our systems" }),
            /* @__PURE__ */ jsx("li", { children: "Use automated systems to scrape or collect data" }),
            /* @__PURE__ */ jsx("li", { children: "Interfere with the proper functioning of the website" }),
            /* @__PURE__ */ jsx("li", { children: "Submit spam or malicious content through our contact forms" }),
            /* @__PURE__ */ jsx("li", { children: "Impersonate another person or entity" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "4. Contact Form Submissions" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "When submitting inquiries through our contact form, you agree to:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "Provide accurate and truthful information" }),
            /* @__PURE__ */ jsx("li", { children: "Not submit spam or automated submissions" }),
            /* @__PURE__ */ jsx("li", { children: "Respect our rate limiting policies (designed to prevent abuse)" }),
            /* @__PURE__ */ jsx("li", { children: "Not attempt to bypass security measures" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mt-4", children: "We reserve the right to reject or ignore submissions that violate these terms." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "5. Intellectual Property" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "All content on this website, including but not limited to text, graphics, logos, images, videos, and software, is the property of Where2Studios or its content suppliers and is protected by copyright and trademark laws." }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mt-4", children: "You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "6. Portfolio Content" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "The videos and images displayed in our portfolio are showcased with the permission of our clients. These works remain the intellectual property of their respective owners and Where2Studios. Portfolio content is for demonstration purposes only." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "7. Service Agreements" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Actual video production services are governed by separate service agreements or contracts. These Terms of Service apply to website usage only. Project-specific terms, deliverables, timelines, and payment terms will be outlined in individual service agreements." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "8. Disclaimer of Warranties" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: 'This website is provided "as is" without warranties of any kind, either express or implied. We do not warrant that:' }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mt-3 space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "The website will be uninterrupted or error-free" }),
            /* @__PURE__ */ jsx("li", { children: "Defects will be corrected" }),
            /* @__PURE__ */ jsx("li", { children: "The website is free of viruses or harmful components" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "9. Limitation of Liability" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "To the fullest extent permitted by law, Where2Studios shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the website. This limitation applies regardless of whether the damages arise from use or misuse of the website, inability to use the website, or interruption, suspension, or termination of the website." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "10. Indemnification" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "You agree to indemnify and hold harmless Where2Studios, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the website or violation of these Terms of Service." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "11. Third-Party Links" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites. Accessing third-party links is at your own risk." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "12. Governing Law" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "13. Changes to Terms" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes your acceptance of the modified terms." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "14. Severability" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "15. Contact Information" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "For questions about these Terms of Service, please contact us:" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 p-6 bg-muted/30 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-foreground font-semibold", children: "Where2Studios" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "Bay Area, California" }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-1", children: [
              "Email:",
              " ",
              /* @__PURE__ */ jsx("a", { href: "mailto:contact@where2studios.com", className: "text-primary hover:underline", children: "contact@where2studios.com" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-1", children: [
              "Website:",
              " ",
              /* @__PURE__ */ jsx("a", { href: "https://where2studios.com", className: "text-primary hover:underline", children: "where2studios.com" })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
(_Ba = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ba.call(globalThis, "src/contexts/Where2BoysSheetContext.tsx");
const Where2BoysSheetContext = createContext(void 0);
function Where2BoysSheetProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsx(
    Where2BoysSheetContext.Provider,
    {
      value: {
        isOpen,
        openSheet: () => setIsOpen(true),
        closeSheet: () => setIsOpen(false)
      },
      children
    }
  );
}
function useWhere2BoysSheet() {
  const ctx = useContext(Where2BoysSheetContext);
  if (!ctx) throw new Error("useWhere2BoysSheet must be used inside Where2BoysSheetProvider");
  return ctx;
}
(_Ca = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ca.call(globalThis, "src/components/ui/sheet.tsx");
const Sheet = SheetPrimitive.Root;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
      children,
      /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
        /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
      ] })
    ] })
  ] })
);
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Title, { ref, className: cn("text-lg font-semibold text-foreground", className), ...props }));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
(_Da = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Da.call(globalThis, "src/components/where2boys/Where2BoysContactSheet.tsx");
const COLLAB_TYPES = ["Event coverage", "Restaurant feature", "Brand partnership", "Creator partnership", "Travel invite", "Other"];
const TIMELINES = ["ASAP", "This month", "Next month", "2 to 3 months", "Flexible"];
const BUDGETS = ["Under $1K", "$1K to $3K", "$3K to $5K", "$5K to $10K", "$10K+", "Need a quote"];
function Where2BoysContactSheet() {
  const { isOpen, closeSheet } = useWhere2BoysSheet();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      collab_type: String(fd.get("collab_type") || ""),
      timeline: String(fd.get("timeline") || ""),
      budget_range: String(fd.get("budget_range") || ""),
      message: String(fd.get("message") || ""),
      source: "where2boys"
    };
    const { error: dbError } = await supabase.from("contact_submissions").insert(payload);
    if (dbError) {
      setError("Something went wrong. Please try again or DM us @where2boys.");
      setSubmitting(false);
      return;
    }
    setSuccess(true);
    setSubmitting(false);
  };
  const handleOpenChange = (open) => {
    if (!open) {
      closeSheet();
      setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 300);
    }
  };
  return /* @__PURE__ */ jsx(Sheet, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxs(
    SheetContent,
    {
      side: "right",
      className: "w-full sm:max-w-lg overflow-y-auto p-0 border-l-0",
      style: { background: "#F5EDDF" },
      children: [
        /* @__PURE__ */ jsxs(SheetHeader, { className: "px-6 pt-6 pb-2 text-left", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest", style: { color: "#E84228" }, children: "Tell us where" }),
          /* @__PURE__ */ jsx(SheetTitle, { className: "font-fredoka font-bold text-2xl sm:text-3xl text-m3-on-surface", children: "Let's work together" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-6 pb-8 pt-4", children: success ? /* @__PURE__ */ jsxs(
          "div",
          {
            role: "status",
            "aria-live": "polite",
            className: "rounded-3xl border border-m3-outline p-8 text-center bg-m3-surface",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-m3-surface-dark text-m3-on-dark flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsx(Check, { className: "w-7 h-7" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-fredoka font-bold text-2xl text-m3-on-surface mb-2", children: "Got it." }),
              /* @__PURE__ */ jsx("p", { className: "text-base text-m3-on-surface/70", children: "We'll be in touch. If it's time-sensitive, DM us on Instagram." })
            ]
          }
        ) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsx(Field, { label: "Your name", name: "name", required: true }),
            /* @__PURE__ */ jsx(Field, { label: "Email", name: "email", type: "email", required: true })
          ] }),
          /* @__PURE__ */ jsx(Field, { label: "Company or handle", name: "company" }),
          /* @__PURE__ */ jsx(SelectField, { label: "What kind of collab?", name: "collab_type", options: COLLAB_TYPES, required: true }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsx(SelectField, { label: "Timeline", name: "timeline", options: TIMELINES }),
            /* @__PURE__ */ jsx(SelectField, { label: "Budget range", name: "budget_range", options: BUDGETS })
          ] }),
          /* @__PURE__ */ jsx(TextareaField, { label: "Tell us about it", name: "message", required: true }),
          error && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-sm", style: { color: "#E84228" }, children: error }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: submitting,
              className: "w-full text-m3-on-dark font-fredoka font-semibold text-base sm:text-lg py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60",
              style: { background: "#E84228" },
              children: submitting ? "Sending" : "Send"
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-m3-on-surface/60", children: [
            "Or DM us at",
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.instagram.com/where2boys/",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "font-semibold hover:underline",
                style: { color: "#E84228" },
                children: "@where2boys"
              }
            )
          ] })
        ] }) })
      ]
    }
  ) });
}
function Field({ label, name, type = "text", required = false }) {
  const id = `w2b-sheet-${name}`;
  return /* @__PURE__ */ jsxs("label", { htmlFor: id, className: "block", children: [
    /* @__PURE__ */ jsxs("span", { className: "block text-sm font-semibold text-m3-on-surface mb-1.5", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { style: { color: "#E84228" }, children: " *" })
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id,
        type,
        name,
        required,
        className: "w-full rounded-xl border border-m3-outline bg-m3-surface px-4 py-3 text-base text-m3-on-surface focus:outline-none focus:ring-2 focus:border-transparent",
        style: { ["--tw-ring-color"]: "#E84228" }
      }
    )
  ] });
}
function SelectField({ label, name, options, required = false }) {
  const id = `w2b-sheet-${name}`;
  return /* @__PURE__ */ jsxs("label", { htmlFor: id, className: "block", children: [
    /* @__PURE__ */ jsxs("span", { className: "block text-sm font-semibold text-m3-on-surface mb-1.5", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { style: { color: "#E84228" }, children: " *" })
    ] }),
    /* @__PURE__ */ jsxs(
      "select",
      {
        id,
        name,
        required,
        defaultValue: "",
        className: "w-full rounded-xl border border-m3-outline bg-m3-surface px-4 py-3 text-base text-m3-on-surface focus:outline-none focus:ring-2 focus:border-transparent",
        style: { ["--tw-ring-color"]: "#E84228" },
        children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true }),
          options.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
        ]
      }
    )
  ] });
}
function TextareaField({ label, name, required = false }) {
  const id = `w2b-sheet-${name}`;
  return /* @__PURE__ */ jsxs("label", { htmlFor: id, className: "block", children: [
    /* @__PURE__ */ jsxs("span", { className: "block text-sm font-semibold text-m3-on-surface mb-1.5", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { style: { color: "#E84228" }, children: " *" })
    ] }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        id,
        name,
        required,
        rows: 5,
        className: "w-full rounded-xl border border-m3-outline bg-m3-surface px-4 py-3 text-base text-m3-on-surface focus:outline-none focus:ring-2 focus:border-transparent resize-y",
        style: { ["--tw-ring-color"]: "#E84228" }
      }
    )
  ] });
}
const version = 1;
const asset_id = "c95c49f2-8c9e-4448-bd0d-9345352bcf01";
const project_id = "2bb4daec-4a94-4b24-bf81-fcab77007c43";
const url = "/__l5e/assets-v1/c95c49f2-8c9e-4448-bd0d-9345352bcf01/where2boys-logo.png";
const r2_key = "a/v1/2bb4daec-4a94-4b24-bf81-fcab77007c43/c95c49f2-8c9e-4448-bd0d-9345352bcf01/where2boys-logo.png";
const original_filename = "where2boys-logo.png";
const size = 517058;
const content_type = "image/png";
const created_at = "2026-06-20T17:43:05Z";
const where2boysLogo = {
  version,
  asset_id,
  project_id,
  url,
  r2_key,
  original_filename,
  size,
  content_type,
  created_at
};
(_Ea = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ea.call(globalThis, "src/components/where2boys/Where2BoysHero.tsx");
function Where2BoysHero() {
  const reduce = useReducedMotion();
  const { openSheet } = useWhere2BoysSheet();
  return /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-32", style: { background: "#F5EDDF" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-5 sm:px-8 lg:px-12 max-w-4xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: reduce ? false : { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-xl mb-8 flex items-center justify-center",
        style: { background: "#E84228" },
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: where2boysLogo.url,
            alt: "",
            "aria-hidden": "true",
            className: "w-full h-full object-cover"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        initial: reduce ? false : { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
        className: "font-fredoka font-semibold text-2xl sm:text-3xl mb-2 inline-block",
        style: { color: "#E84228", transform: "rotate(-2deg)" },
        children: "C'mon now!"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.h1,
      {
        initial: reduce ? false : { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.15 },
        className: "font-fredoka font-bold text-5xl sm:text-6xl lg:text-7xl text-m3-on-surface tracking-tight mb-5",
        children: "Where 2 next?"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        initial: reduce ? false : { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.25 },
        className: "text-lg sm:text-xl text-m3-on-surface/70 max-w-xl mb-8 leading-relaxed",
        children: "Bay Area food, spots, culture. We travel for the right invite."
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: openSheet,
        className: "inline-flex items-center gap-2 bg-m3-surface-dark text-m3-on-dark font-fredoka font-semibold text-base px-6 py-3 rounded-full hover:opacity-90 transition-opacity",
        children: [
          "Let's work together",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm text-m3-on-surface/60", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "https://www.instagram.com/where2boys/",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-1.5 hover:text-m3-on-surface transition-colors",
        children: [
          /* @__PURE__ */ jsx(Instagram, { className: "w-4 h-4" }),
          "@where2boys"
        ]
      }
    ) })
  ] }) }) });
}
(_Fa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Fa.call(globalThis, "src/components/where2boys/Where2BoysReach.tsx");
function Where2BoysReach() {
  return /* @__PURE__ */ jsx("section", { className: "py-20 sm:py-24 lg:py-28 bg-m3-surface-dark text-m3-on-dark", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-5 sm:px-8 lg:px-12 max-w-5xl", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest mb-4", style: { color: "#E84228" }, children: "Reach" }),
    /* @__PURE__ */ jsxs("h2", { className: "font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl mb-12 leading-tight", children: [
      "When we feature a spot,",
      " ",
      /* @__PURE__ */ jsx("span", { style: { color: "#E09E24" }, children: "it gets seen." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 sm:gap-12 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-fredoka font-semibold text-4xl sm:text-5xl lg:text-6xl tabular-nums leading-none", style: { color: "#E09E24" }, children: "1.2M+" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-m3-on-dark/60 mt-2", children: "Top post" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-fredoka font-semibold text-4xl sm:text-5xl lg:text-6xl tabular-nums leading-none", style: { color: "#E09E24" }, children: "258K+" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-m3-on-dark/60 mt-2", children: "Monthly average" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-fredoka font-semibold text-xl mb-2", children: "Who we reach" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-m3-on-dark/70 leading-relaxed", children: "Bay Area locals and visitors who care about food, spots, travel, and culture. Curious, hungry, and ready to go where we point them." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-fredoka font-semibold text-xl mb-2", children: "How we work" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-m3-on-dark/70 leading-relaxed", children: "We don't just rack up views. We curate who we feature, frame the highlight, and target the right audience. The result is the right crowd showing up, not just the most." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-dark/50", children: "1.4K followers · 93 posts shipped · growing" })
  ] }) });
}
(_Ga = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ga.call(globalThis, "src/components/where2boys/Where2BoysPillars.tsx");
const pillars = [
  {
    icon: Sparkles,
    label: "Experiences",
    description: "Pop-ups, openings, classes, tastings, festivals, immersive nights. We capture the moment your guests will remember and the reason others should come next time. The angle, the room, the energy. For business owners, that means an event that lives past the night and fills the room for the next one."
  },
  {
    icon: MapPin,
    label: "Spots",
    description: "The Bay Area's best places, and who they're for. Hidden gems, viral picks, neighborhood mainstays worth knowing. Locals looking for the next favorite, visitors looking for the move. For business owners, that means the right crowd showing up, not just the most."
  },
  {
    icon: UtensilsCrossed,
    label: "Food",
    description: "Restaurants, pop-ups, and dishes worth the trip. We capture the flavor, the room, and the people in it. The post tells you what to order and who you're going to enjoy it with. From soft openings to viral menu drops, we frame it so people show up hungry."
  },
  {
    icon: Plane,
    label: "Travel",
    description: "Destinations worth flying for. We frame the moments worth planning a trip around. Bay Area first, anywhere next. If a hotel, destination, or tourism board wants the right audience to see it, we cover it the way we'd cover our own next vacation."
  },
  {
    icon: Globe,
    label: "Culture",
    description: "The people, the communities, and the why behind the place. Festivals, neighborhoods, the chef, the founder. We turn cultural context into content that connects. Brands and events with real community ties get featured the way they deserve."
  }
];
function Where2BoysPillars() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pillars[activeIndex];
  const ActiveIcon = active.icon;
  return /* @__PURE__ */ jsx("section", { className: "py-20 sm:py-24 lg:py-28", style: { background: "#F5EDDF" }, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-5 sm:px-8 lg:px-12 max-w-4xl", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest mb-4 text-center", style: { color: "#E84228" }, children: "What we cover" }),
    /* @__PURE__ */ jsx("h2", { className: "font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl text-m3-on-surface text-center mb-10", children: "Pick a lane." }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-5 gap-2 sm:gap-3 mb-8", children: pillars.map((p, i) => {
      const Icon = p.icon;
      const isActive = i === activeIndex;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveIndex(i),
          "aria-pressed": isActive,
          className: `rounded-2xl border px-1 py-2 sm:p-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-w-0 ${isActive ? "bg-m3-surface-dark text-m3-on-dark border-m3-surface-dark" : "bg-m3-surface text-m3-on-surface border-m3-outline hover:border-m3-on-surface/30"}`,
          style: { ["--tw-ring-color"]: "#E84228" },
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5" }),
            /* @__PURE__ */ jsx("div", { className: "font-fredoka font-semibold text-[10px] leading-tight sm:text-sm break-words", children: p.label })
          ]
        },
        p.label
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-m3-surface border border-m3-outline p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsx(ActiveIcon, { className: "w-6 h-6", style: { color: "#E84228" } }),
        /* @__PURE__ */ jsx("h3", { className: "font-fredoka font-bold text-2xl sm:text-3xl text-m3-on-surface", children: active.label })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-m3-on-surface/75 leading-relaxed", children: active.description })
    ] })
  ] }) });
}
(_Ha = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ha.call(globalThis, "src/components/where2boys/Where2BoysCollab.tsx");
const collabTypes = [
  { icon: CalendarClock, title: "Event coverage", desc: "Pop-ups, openings, festivals" },
  { icon: UtensilsCrossed, title: "Restaurant features", desc: "Menu drops, soft openings" },
  { icon: Building2, title: "Brand partnerships", desc: "Paid posts, integrations, takeovers" },
  { icon: Users, title: "Creator partnerships", desc: "We collab with other creators too" }
];
function Where2BoysCollab() {
  const { openSheet } = useWhere2BoysSheet();
  return /* @__PURE__ */ jsx("section", { className: "py-20 sm:py-24 lg:py-28 bg-m3-surface-dark text-m3-on-dark", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-5 sm:px-8 lg:px-12 max-w-4xl", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest mb-4", style: { color: "#E84228" }, children: "Ways to work with us" }),
    /* @__PURE__ */ jsx("h2", { className: "font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl mb-10 leading-tight", children: "Brands, restaurants, creators. We're open to it." }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: collabTypes.map((c) => {
      const Icon = c.icon;
      return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-m3-on-dark/15 bg-m3-on-dark/5 p-5 sm:p-6 flex gap-4 items-start", children: [
        /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 flex-shrink-0", style: { color: "#E09E24" } }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-fredoka font-semibold text-lg mb-1", children: c.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-dark/70", children: c.desc })
        ] })
      ] }, c.title);
    }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: openSheet,
        className: "mt-8 sm:mt-10 block w-full text-center text-m3-on-dark font-fredoka font-semibold text-base sm:text-lg py-3.5 sm:py-4 rounded-full hover:opacity-90 transition-opacity",
        style: { background: "#E84228" },
        children: "Let's work together"
      }
    )
  ] }) });
}
(_Ia = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ia.call(globalThis, "src/components/where2boys/Where2BoysBridge.tsx");
function Where2BoysBridge() {
  return /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-20 lg:py-24", style: { background: "#F5EDDF" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-5 sm:px-8 lg:px-12 max-w-2xl", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-5 sm:gap-6 items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 bg-m3-surface-dark rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Video, { className: "w-6 h-6", style: { color: "#E09E24" } }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest mb-2", style: { color: "#E84228" }, children: "Production by" }),
      /* @__PURE__ */ jsx("h3", { className: "font-fredoka font-semibold text-xl sm:text-2xl text-m3-on-surface mb-3", children: "Where2Studios" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-m3-on-surface/70 leading-relaxed mb-4", children: "Bay Area video production capturing events that build brands. Strategy, production, and content that performs." }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/",
          className: "text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all",
          style: { color: "#E84228" },
          children: [
            "See Where2Studios",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] })
  ] }) }) });
}
(_Ja = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ja.call(globalThis, "src/pages/Where2BoysPage.tsx");
function Where2BoysPage() {
  return /* @__PURE__ */ jsxs(Where2BoysSheetProvider, { children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Where2Boys. Bay Area food, spots, and culture.",
        description: "Let's work together. Event coverage, restaurant features, brand and creator partnerships. DM @where2boys or tell us where.",
        url: "https://where2studios.com/where2boys"
      }
    ),
    /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "min-h-screen bg-m3-surface outline-none", children: [
      /* @__PURE__ */ jsx(Where2BoysHero, {}),
      /* @__PURE__ */ jsx(Where2BoysReach, {}),
      /* @__PURE__ */ jsx(Where2BoysPillars, {}),
      /* @__PURE__ */ jsx(Where2BoysCollab, {}),
      /* @__PURE__ */ jsx(Where2BoysBridge, {}),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(KeepReading, {})
    ] }),
    /* @__PURE__ */ jsx(Where2BoysContactSheet, {})
  ] });
}
(_Ka = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ka.call(globalThis, "src/pages/AccessibilityPage.tsx");
function AccessibilityPage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Accessibility Statement and Conformance",
        description: "Where2Studios is committed to digital accessibility. Read our accessibility statement, conformance level, and how to report issues.",
        url: "https://where2studios.com/accessibility",
        robots: "noindex, follow"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-background text-m3-on-background", children: [
      /* @__PURE__ */ jsx(Navbar, { variant: "light" }),
      /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "container mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-16 sm:pt-40 sm:pb-24 max-w-3xl outline-none", children: [
        /* @__PURE__ */ jsx("span", { className: "text-m3-primary text-xs font-semibold uppercase tracking-widest", children: "Accessibility" }),
        /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-4xl lg:text-5xl font-semibold text-m3-on-surface mt-2 mb-6", children: "Accessibility statement" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-m3-on-surface/80 text-base leading-relaxed", children: [
          /* @__PURE__ */ jsx("p", { children: "Where2Studios is committed to making our website usable by everyone, including people who rely on assistive technologies such as screen readers, keyboard navigation, and motion-sensitivity preferences." }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3", children: "Conformance target" }),
            /* @__PURE__ */ jsx("p", { children: "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. We test our site with keyboard navigation, common screen readers, and automated scanning tools as content and features change." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3", children: "What we've implemented" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
              /* @__PURE__ */ jsx("li", { children: "Skip-to-content link on every page" }),
              /* @__PURE__ */ jsx("li", { children: "Keyboard-accessible navigation and interactive elements with visible focus indicators" }),
              /* @__PURE__ */ jsx("li", { children: "Semantic HTML landmarks (header, nav, main, footer)" }),
              /* @__PURE__ */ jsx("li", { children: "Form labels paired with inputs, required-field indicators, and screen-reader-announced submission feedback" }),
              /* @__PURE__ */ jsx("li", { children: "Alternative text on meaningful images; decorative imagery hidden from screen readers" }),
              /* @__PURE__ */ jsx("li", { children: "Captioning support on embedded video where available" }),
              /* @__PURE__ */ jsx("li", { children: `Respect for the operating system's "reduce motion" preference` }),
              /* @__PURE__ */ jsx("li", { children: "Color contrast that meets WCAG AA targets for body text" }),
              /* @__PURE__ */ jsx("li", { children: "Mobile touch targets sized for ease of use" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3", children: "Known limitations" }),
            /* @__PURE__ */ jsx("p", { children: "Embedded third-party content, such as YouTube video players and the Cal.com booking widget, may not fully meet our accessibility target. We are working with those providers and offer alternative ways to reach us where possible." }),
            /* @__PURE__ */ jsx("p", { children: "If you encounter content that is hard to use, we want to hear about it." })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3", children: "Report an accessibility issue" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Email",
              " ",
              /* @__PURE__ */ jsx("a", { href: "mailto:contact@where2studios.com", className: "text-m3-secondary font-semibold hover:underline", children: "contact@where2studios.com" }),
              " ",
              "with a description of the issue, the page or feature involved, and the assistive technology you were using. We will respond within a reasonable time and work to address the issue."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3", children: "Last updated" }),
            /* @__PURE__ */ jsx("p", { children: "This statement was last reviewed on July 6, 2026." })
          ] })
        ] }),
        /* @__PURE__ */ jsx(KeepReading, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(FloatingCTA, {})
    ] })
  ] });
}
(_La = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _La.call(globalThis, "src/components/socials/AuditForm.tsx");
const auditSchema = z.object({
  restaurant: z.string().trim().min(1, "Required").max(100),
  name: z.string().trim().min(1, "Required").max(100),
  contact: z.string().trim().min(1, "Required").max(255),
  handle: z.string().trim().max(60).optional(),
  website: z.string().max(0, "Bot detected")
});
const emptyForm = {
  restaurant: "",
  name: "",
  contact: "",
  handle: "",
  website: ""
};
const FALLBACK_EMAIL = "noemail@where2studios.com";
function AuditForm() {
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
    }
  };
  const validate = () => {
    try {
      auditSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const next = {};
        err.errors.forEach((e) => {
          if (e.path[0]) next[e.path[0]] = e.message;
        });
        setErrors(next);
      }
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    const rawContact = formData.contact.trim();
    const isEmail = rawContact.includes("@") && !rawContact.startsWith("@");
    const handle = (formData.handle || "").replace(/^@+/, "");
    try {
      await submitContact({
        name: formData.name,
        email: isEmail ? rawContact : FALLBACK_EMAIL,
        phone: isEmail ? void 0 : rawContact,
        company: formData.restaurant,
        service: "social-media",
        referral: "where2socials-page",
        message: `[IG: @${handle}] [Contact: ${rawContact}] Where2Socials page inquiry`
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const inputClasses = (hasError) => `w-full px-3 py-2.5 rounded-lg bg-m3-surface text-m3-on-surface text-sm border ${hasError ? "border-m3-secondary ring-1 ring-m3-secondary" : "border-m3-outline/40"} focus:outline-none focus:ring-2 focus:ring-m3-primary/50 focus:border-m3-primary transition-all`;
  const labelClasses = "text-xs font-medium text-m3-on-surface/80 mb-1.5 block";
  if (isSubmitted) {
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: reduce ? false : { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        role: "status",
        "aria-live": "polite",
        className: "m3-outlined-card p-8 text-center",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Check, { className: "w-7 h-7 text-m3-primary" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-m3-on-surface/80 text-base max-w-sm mx-auto", children: "Got it. We will reach out within 1 business day." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "m3-outlined-card p-5 sm:p-7 space-y-4", noValidate: true, children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute w-0 h-0 overflow-hidden opacity-0", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "socials-website", children: "Website" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "socials-website",
          name: "website",
          type: "text",
          tabIndex: -1,
          autoComplete: "off",
          value: formData.website,
          onChange: handleChange
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "socials-restaurant", className: labelClasses, children: "Restaurant *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "socials-restaurant",
            name: "restaurant",
            type: "text",
            required: true,
            "aria-required": "true",
            value: formData.restaurant,
            onChange: handleChange,
            "aria-invalid": !!errors.restaurant,
            className: inputClasses(!!errors.restaurant)
          }
        ),
        errors.restaurant && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.restaurant })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "socials-name", className: labelClasses, children: "Your name *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "socials-name",
            name: "name",
            type: "text",
            required: true,
            "aria-required": "true",
            value: formData.name,
            onChange: handleChange,
            "aria-invalid": !!errors.name,
            className: inputClasses(!!errors.name)
          }
        ),
        errors.name && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "socials-contact", className: labelClasses, children: "Phone or email *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "socials-contact",
            name: "contact",
            type: "text",
            required: true,
            "aria-required": "true",
            value: formData.contact,
            onChange: handleChange,
            "aria-invalid": !!errors.contact,
            className: inputClasses(!!errors.contact)
          }
        ),
        errors.contact && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.contact })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "socials-handle", className: labelClasses, children: "Instagram handle" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-m3-on-surface/50 pointer-events-none", children: "@" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "socials-handle",
              name: "handle",
              type: "text",
              value: formData.handle,
              onChange: handleChange,
              className: `${inputClasses(false)} pl-7`
            }
          )
        ] })
      ] })
    ] }),
    submitError && /* @__PURE__ */ jsx("p", { role: "alert", "aria-live": "assertive", className: "text-sm text-m3-secondary", children: submitError }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        className: "m3-filled-button w-full inline-flex items-center justify-center gap-2 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2",
        children: [
          isSubmitting && /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
          isSubmitting ? "Sending" : "Send"
        ]
      }
    )
  ] });
}
(_Ma = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ma.call(globalThis, "src/data/socialsProof.ts");
const socialsProofReels = [
  { shortcode: "DCAF2zYIW7z", stats: ["3.4M views", "93.8K shares"], title: "Backyard Bayou reel, 3.4M views" },
  { shortcode: "DWFXq9PDwpo", stats: ["1.2M views", "55.7K shares", "13K saves"], title: "Backyard Bayou reel, 1.2M views" },
  { shortcode: "DEGwQaSJozD", stats: ["1.9M views", "27.3K shares"], title: "Backyard Bayou reel, 1.9M views" },
  { shortcode: "DFZaQFixYAW", stats: ["1.2M views", "14.4K shares"], title: "Backyard Bayou reel, 1.2M views" },
  { shortcode: "DAcGe94yQ00", stats: ["1.0M views", "18.2K shares"], title: "Backyard Bayou reel, 1.0M views" },
  { shortcode: "DJkD6dgSxVt", stats: ["632K views", "5.6K shares"], title: "Backyard Bayou reel, 632K views" }
];
const crabLogo = "/assets/backyard-bayou-crab-Ue6iRhP-.png";
(_Na = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Na.call(globalThis, "src/pages/SocialsPage.tsx");
const STARTING_PRICE = "$1,500";
function scrollToId(id, instant) {
  var _a2;
  (_a2 = document.getElementById(id)) == null ? void 0 : _a2.scrollIntoView({
    behavior: instant ? "auto" : "smooth",
    block: "start"
  });
}
const stats = [
  { value: 59.7, decimals: 1, suffix: "K", label: "followers" },
  { value: 14.4, decimals: 1, suffix: "M", label: "views" },
  { value: 5, decimals: 0, suffix: "", label: "reels past 1M" },
  { value: 278, decimals: 0, suffix: "K", label: "shares" }
];
function CountUp({ stat }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(reduce ? stat.value : 0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(stat.value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(stat.value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, stat.value]);
  return /* @__PURE__ */ jsxs("span", { ref, className: "font-fredoka font-bold text-3xl sm:text-4xl text-m3-primary", children: [
    display.toFixed(stat.decimals),
    stat.suffix
  ] });
}
const PAGE_DESCRIPTION$1 = "Union City's social media team. We run @thebackyardbayou at Union Landing: 59.7K followers, reels past 1M views. Management, content, influencer invites, commercials. Starting from $1,500 a month.";
const faqs = [
  {
    q: "Do you work with businesses in Union Landing and Union City?",
    a: "Yes. We are based in Union City and we run @thebackyardbayou at Union Landing. We also work with businesses in Fremont, Hayward, and Newark."
  },
  {
    q: "What does social media management include?",
    a: "One film day a month at your business, editing, two to three posts a week on Instagram and TikTok, captions, and replies to comments and DMs."
  },
  {
    q: "How much does it cost?",
    a: "Starting from $1,500 a month. Month to month. Bigger plans add film days and posts."
  },
  {
    q: "Do you do more than social media?",
    a: "Yes. Content creation, influencer invites, commercials, and event recaps through Where2Studios."
  },
  {
    q: "How do I start?",
    a: "Send the short form on this page. We reply within one business day and come by to see your spot."
  }
];
const areaServed = ["Union City", "Union Landing", "Fremont", "Hayward", "Newark"].map((name) => ({
  "@type": "Place",
  name
}));
const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://where2studios.com/backyard-bayou-socials#business",
      name: "Where2Socials",
      alternateName: "Where2Studios Social",
      url: "https://where2studios.com/backyard-bayou-socials",
      image: "https://where2studios.com/og-image.png",
      description: PAGE_DESCRIPTION$1,
      parentOrganization: {
        "@type": "Organization",
        name: "Where2Studios",
        url: "https://where2studios.com"
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Union City",
        addressRegion: "CA",
        postalCode: "94587",
        addressCountry: "US"
      },
      areaServed,
      priceRange: "$1,500+/month",
      email: "socials@where2studios.com",
      sameAs: ["https://www.instagram.com/where2studios"],
      knowsAbout: [
        "social media marketing",
        "social media management",
        "content creation",
        "Instagram Reels",
        "TikTok",
        "influencer marketing",
        "commercials"
      ]
    },
    {
      "@type": "Service",
      name: "Social media management",
      serviceType: "Social media marketing",
      provider: { "@id": "https://where2studios.com/backyard-bayou-socials#business" },
      areaServed,
      offers: {
        "@type": "Offer",
        price: 1500,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 1500,
          priceCurrency: "USD",
          unitText: "MONTH"
        }
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a }
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://where2studios.com" },
        { "@type": "ListItem", position: 2, name: "Socials", item: "https://where2studios.com/backyard-bayou-socials" }
      ]
    }
  ]
};
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2";
function WorkCarousel() {
  const [api, setApi] = useState();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return /* @__PURE__ */ jsxs(
    Carousel,
    {
      setApi,
      opts: { align: "start", loop: true, dragFree: false },
      className: "w-full",
      children: [
        /* @__PURE__ */ jsx(CarouselContent, { className: "-ml-4", children: socialsProofReels.map((reel) => /* @__PURE__ */ jsxs(
          CarouselItem,
          {
            className: "pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3",
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium px-2.5 py-1 rounded-full bg-m3-surface-variant text-m3-on-surface/80", children: reel.stats[0] }) }),
              /* @__PURE__ */ jsx(
                "iframe",
                {
                  src: `https://www.instagram.com/reel/${reel.shortcode}/embed`,
                  title: `Backyard Bayou Instagram reel, ${reel.stats[0]}, Union City`,
                  loading: "lazy",
                  height: 600,
                  className: "w-full rounded-2xl border border-m3-outline bg-m3-surface",
                  style: { height: 600 },
                  scrolling: "no",
                  frameBorder: 0
                }
              )
            ]
          },
          reel.shortcode
        )) }),
        /* @__PURE__ */ jsx(CarouselPrevious, { className: `hidden md:flex -left-4 ${focusRing}` }),
        /* @__PURE__ */ jsx(CarouselNext, { className: `hidden md:flex -right-4 ${focusRing}` }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mt-6", children: socialsProofReels.map((reel, i) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": `Go to reel ${i + 1}`,
            "aria-current": selected === i,
            onClick: () => api == null ? void 0 : api.scrollTo(i),
            className: `h-2 my-3 box-content py-4 px-4 bg-clip-content rounded-full transition-all ${focusRing} ${selected === i ? "w-6 bg-m3-primary" : "w-2 bg-m3-on-surface/25"}`
          },
          reel.shortcode
        )) })
      ]
    }
  );
}
function SocialsPage() {
  const reduce = useReducedMotion();
  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, delay }
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-background text-m3-on-background", children: [
    /* @__PURE__ */ jsx(SkipLink, {}),
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Social Media Marketing in Union City, CA | Where2Socials by Where2Studios",
        description: PAGE_DESCRIPTION$1,
        url: "https://where2studios.com/backyard-bayou-socials",
        image: "https://where2studios.com/og-image.png",
        schema: pageSchema
      }
    ),
    /* @__PURE__ */ jsx(Navbar, { variant: "dark" }),
    /* @__PURE__ */ jsxs("main", { id: "main-content", tabIndex: -1, className: "outline-none", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-m3-surface-dark pb-16 pt-[calc(var(--nav-h,112px)+2rem)]", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0",
            style: {
              background: "radial-gradient(60% 55% at 50% 15%, hsl(var(--m3-primary) / 0.18) 0%, transparent 70%), linear-gradient(to bottom, hsl(var(--m3-surface-dark)) 0%, hsl(var(--m3-surface-dark) / 0.85) 60%, hsl(var(--m3-surface-dark)) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10", children: [
          /* @__PURE__ */ jsx(
            motion.img,
            {
              ...fade(0.05),
              src: crabLogo,
              alt: "Backyard Bayou crab logo. Union City restaurant whose Instagram is run by Where2Socials.",
              width: 260,
              className: "order-first lg:order-last mx-auto w-[140px] lg:w-[260px] drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
            /* @__PURE__ */ jsx(
              motion.h1,
              {
                ...fade(0),
                className: "font-fredoka font-bold text-4xl sm:text-5xl lg:text-6xl text-m3-on-dark tracking-tight leading-tight mb-4",
                children: "We run @thebackyardbayou."
              }
            ),
            /* @__PURE__ */ jsx(motion.p, { ...fade(0.04), className: "text-base text-m3-on-dark/70 mb-8", children: "Social media marketing for Union City and Union Landing businesses." }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                ...fade(0.08),
                className: "grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10",
                children: stats.map((stat) => /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
                  /* @__PURE__ */ jsx(CountUp, { stat }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-m3-on-dark/60 leading-snug", children: stat.label })
                ] }, stat.label))
              }
            ),
            /* @__PURE__ */ jsx(
              motion.h2,
              {
                ...fade(0.16),
                className: "font-fredoka font-bold text-2xl text-m3-on-dark mb-5",
                children: "Want this for your business?"
              }
            ),
            /* @__PURE__ */ jsx(motion.div, { ...fade(0.2), children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => scrollToId("work-with-us", !!reduce),
                className: `m3-filled-button ${focusRing}`,
                children: "Work with us"
              }
            ) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "bg-m3-surface py-10", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka font-bold text-xl text-m3-on-surface mb-4", children: "Our work in Union City" }),
        /* @__PURE__ */ jsx(WorkCarousel, {})
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "work-with-us", className: "bg-m3-surface-variant py-16 scroll-mt-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-5 sm:px-8 lg:px-12 max-w-2xl", children: [
        /* @__PURE__ */ jsx(
          motion.h2,
          {
            ...fade(0),
            className: "font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-surface text-center mb-8",
            children: "Want this for your business?"
          }
        ),
        /* @__PURE__ */ jsx(AuditForm, {}),
        /* @__PURE__ */ jsxs("p", { className: "mt-5 text-center text-sm text-m3-on-surface/55", children: [
          "Starting from ",
          STARTING_PRICE,
          " a month. Month to month."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-center text-sm text-m3-on-surface/55", children: "One film day. Two to three posts a week." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-m3-background py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-5 sm:px-8 lg:px-12 max-w-2xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka font-bold text-2xl text-m3-on-background mb-6", children: "Questions" }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs.map((item, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${i}`, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { "data-faq-question": true, className: "text-left font-fredoka text-base", children: item.q }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm text-m3-on-background/70", children: item.a })
        ] }, item.q)) })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(KeepReading, {})
    ] }),
    /* @__PURE__ */ jsx(
      FloatingCTA,
      {
        label: "Work with us",
        scrollToId: "work-with-us",
        hideWhenVisibleId: "work-with-us",
        mobileOnly: true
      }
    )
  ] });
}
(_Oa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Oa.call(globalThis, "src/pages/SocialsRedirectPage.tsx");
const TARGET = "/backyard-bayou-socials";
function SocialsRedirectPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(TARGET, { replace: true });
  }, [navigate]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-m3-background text-m3-on-background flex items-center justify-center px-6", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Social Media Marketing in Union City, CA | Where2Socials",
        description: "This page moved. Social media marketing and management for Union City and Union Landing businesses is now at /backyard-bayou-socials.",
        canonical: TARGET,
        robots: "noindex, follow"
      }
    ),
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("meta", { httpEquiv: "refresh", content: `0;url=${TARGET}` }) }),
    /* @__PURE__ */ jsxs("p", { className: "text-center text-m3-on-background/70", children: [
      "This page moved.",
      " ",
      /* @__PURE__ */ jsx(Link, { to: TARGET, className: "underline hover:text-m3-primary", children: "Go to Where2Socials" })
    ] })
  ] });
}
(_Pa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Pa.call(globalThis, "src/pages/ConventionsPage.tsx");
const SITE_URL$1 = "https://where2studios.com";
const PAGE_URL = `${SITE_URL$1}/conventions`;
const PAGE_TITLE = "San Francisco Conference Calendar, Video Coverage | Where2Studios";
const PAGE_DESCRIPTION = "Every San Francisco conference week we cover near Moscone, with dates. Dreamforce, RSAC, Snowflake Summit, Data + AI Summit, TechCrunch Disrupt, GDC and SF Tech Week.";
function ConventionsPage() {
  const now = useConventionClock();
  const cards = conventions.map((convention) => {
    const { edition, phase } = getConventionStatus(convention, now);
    return { convention, edition, phase };
  }).sort((a, b) => {
    var _a2, _b2;
    return (((_a2 = a.edition) == null ? void 0 : _a2.start) ?? "9999").localeCompare(((_b2 = b.edition) == null ? void 0 : _b2.start) ?? "9999");
  });
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "San Francisco conference week calendar",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: cards.map((card, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: card.convention.name,
      url: `${SITE_URL$1}${conventionHref(card.convention)}`
    }))
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: PAGE_TITLE,
        ogTitle: "San Francisco conference calendar",
        description: PAGE_DESCRIPTION,
        canonical: "/conventions",
        image: "/og/conventions.png",
        imageAlt: "San Francisco conference calendar",
        schema: [collectionSchema, itemListSchema]
      }
    ),
    /* @__PURE__ */ jsxs(PageLayout, { navVariant: "dark", children: [
      /* @__PURE__ */ jsx("section", { className: "bg-m3-surface-dark pb-12 sm:pb-16 pt-[calc(var(--nav-h,112px)+1.5rem)] sm:pt-[calc(var(--nav-h,112px)+2.5rem)]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-dark", children: "San Francisco conference week calendar" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base sm:text-lg text-m3-on-dark/75", children: "Every conference week we cover near Moscone, with dates." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: cards.map(({ convention, edition, phase }) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: conventionHref(convention),
          className: "m3-elevated-card p-5 flex flex-col hover:shadow-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-lg font-semibold text-m3-on-surface", children: convention.name }),
              /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-m3-primary/15 text-m3-primary text-[11px] font-semibold px-3 py-1", children: statusChip(convention, phase) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-m3-on-surface/80 mt-2", children: edition ? formatEditionRange(edition) : `${nextUnknownYear(convention)} dates to be announced` }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70 mt-1 flex-1", children: convention.venue }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm mt-5", children: [
              "See coverage",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ]
        },
        convention.slug
      )) }) }) })
    ] })
  ] });
}
(_Qa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Qa.call(globalThis, "src/components/conventions/ConventionForm.tsx");
const schema = z.object({
  name: z.string().trim().min(1, "Add your name").max(100),
  email: z.string().trim().email("Add a valid email").max(255),
  company: z.string().trim().min(1, "Add your company").max(120),
  eventDates: z.string().trim().min(1, "Add your date").max(120),
  venue: z.string().trim().min(1, "Add a venue or neighborhood").max(120),
  need: z.string().trim().min(1, "Pick what you need")
});
const empty = {
  name: "",
  email: "",
  company: "",
  eventDates: "",
  venue: "",
  need: ""
};
const conventionNeedOptions = [
  ...deliverables$1.map((d) => d.title),
  "Sponsor coverage",
  "Not sure yet"
];
function ConventionForm({
  slug,
  conventionName,
  year,
  preselected,
  onPreselect
}) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const need = preselected || values.need;
  const conference = `${conventionName} ${year}`;
  const set = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: void 0 }));
    if (key === "need") onPreselect(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse({ ...values, need });
    if (!parsed.success) {
      const next = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) next[err.path[0]] = err.message;
      });
      setErrors(next);
      return;
    }
    setSubmitting(true);
    try {
      await submitContact({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        service: parsed.data.need,
        timeline: parsed.data.eventDates,
        message: `${conference} coverage request.
Event date or dates: ${parsed.data.eventDates}
Venue or neighborhood: ${parsed.data.venue}
What they need: ${parsed.data.need}`,
        source: `convention:${slug}`
      });
      toast.success(`Got it. We will get back to you about your ${conventionName} dates.`);
      setDone(true);
      setValues(empty);
      onPreselect("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };
  const inputClass = "w-full rounded-xl bg-m3-surface border border-m3-outline px-4 py-3 text-sm text-m3-on-surface placeholder:text-m3-on-surface/40 focus:outline-none focus:ring-2 focus:ring-m3-primary";
  const labelClass = "block text-xs font-semibold text-m3-on-surface/70 mb-1.5";
  if (done) {
    return /* @__PURE__ */ jsxs("div", { role: "status", "aria-live": "polite", className: "m3-elevated-card p-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-m3-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsx(Check, { className: "w-7 h-7 text-m3-primary" }) }),
      /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-2xl font-semibold text-m3-on-surface mb-2", children: "Got it." }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70", children: "We reply within one business day. During conference week we reply same day." }),
      /* @__PURE__ */ jsx("button", { onClick: () => setDone(false), className: "m3-text-button text-m3-primary mt-4", children: "Send another date" })
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "conference", value: conference, readOnly: true }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "cv-name", children: "Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "cv-name",
            className: inputClass,
            value: values.name,
            onChange: (e) => set("name", e.target.value)
          }
        ),
        errors.name && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "cv-email", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "cv-email",
            type: "email",
            className: inputClass,
            value: values.email,
            onChange: (e) => set("email", e.target.value)
          }
        ),
        errors.email && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "cv-company", children: "Company" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "cv-company",
          className: inputClass,
          value: values.company,
          onChange: (e) => set("company", e.target.value)
        }
      ),
      errors.company && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.company })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "cv-dates", children: "Event date or dates" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "cv-dates",
            className: inputClass,
            placeholder: "Day two, all day",
            value: values.eventDates,
            onChange: (e) => set("eventDates", e.target.value)
          }
        ),
        errors.eventDates && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.eventDates })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "cv-venue", children: "Venue or neighborhood" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "cv-venue",
            className: inputClass,
            placeholder: "Near Moscone",
            value: values.venue,
            onChange: (e) => set("venue", e.target.value)
          }
        ),
        errors.venue && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.venue })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "cv-need", children: "What you need" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          id: "cv-need",
          className: inputClass,
          value: need,
          onChange: (e) => set("need", e.target.value),
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Pick one" }),
            conventionNeedOptions.map((option) => /* @__PURE__ */ jsx("option", { value: option, children: option }, option))
          ]
        }
      ),
      errors.need && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-xs text-m3-secondary mt-1", children: errors.need })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "submit",
        disabled: submitting,
        className: "m3-filled-button w-full text-base py-3.5 flex items-center justify-center gap-2 disabled:opacity-60",
        children: [
          submitting ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : null,
          "Send it over"
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-m3-on-surface/60 text-center", children: "We reply within one business day. During conference week we reply same day." })
  ] });
}
(_Ra = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ra.call(globalThis, "src/pages/ConventionPage.tsx");
const SITE_URL = "https://where2studios.com";
function conventionTitle(name) {
  const withCity = `${name} Video Coverage, San Francisco`;
  return `${withCity.length + 16 <= 65 ? withCity : `${name} Video Coverage`} | Where2Studios`;
}
function scrollTo(id) {
  var _a2;
  (_a2 = document.getElementById(id)) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "start" });
}
function joinNames(names) {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
function ConventionRedirect({ convention }) {
  const navigate = useNavigate();
  const href = convention.href;
  useEffect(() => {
    navigate(href, { replace: true });
  }, [navigate, href]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: conventionTitle(convention.name),
        description: `Video coverage for ${convention.name} in San Francisco.`,
        canonical: href,
        robots: "noindex, follow"
      }
    ),
    /* @__PURE__ */ jsx(PageLayout, { navVariant: "dark", children: /* @__PURE__ */ jsx("section", { className: "bg-m3-surface-dark min-h-[60vh] pt-[calc(var(--nav-h,112px)+2rem)] pb-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl font-semibold text-m3-on-dark", children: convention.name }),
      /* @__PURE__ */ jsxs(Link, { to: href, className: "m3-filled-button text-sm px-6 py-3 mt-6 inline-block", children: [
        "Go to the ",
        convention.name,
        " page"
      ] })
    ] }) }) })
  ] });
}
function ConventionContent({ convention }) {
  const { data: projects } = useProjects();
  const [activeVideo, setActiveVideo] = useState(null);
  const [preselected, setPreselected] = useState("");
  const { edition, phase } = useConventionStatus(convention);
  const proof = useMemo(() => {
    const all = projects || [];
    return proofWall(all, convention.proofSlugs);
  }, [projects, convention.proofSlugs]);
  const clientNames = useMemo(() => {
    const names = proof.map((p) => p.client_name).filter((name) => !!name);
    return joinNames([...new Set(names)]);
  }, [proof]);
  const taggedCount = useMemo(
    () => (projects || []).filter((p) => p.convention_slug === convention.slug).length,
    [projects, convention.slug]
  );
  const tbaYear = nextUnknownYear(convention);
  const year = (edition == null ? void 0 : edition.year) ?? tbaYear;
  const dateLine = edition ? formatEditionRange(edition) : null;
  const eyebrow = dateLine ?? `${convention.name} ${tbaYear}, dates to be announced`;
  const h1 = phase.kind === "live" ? `${convention.name} is live. Crews on the ground this week.` : `Video coverage for ${convention.name} ${year}`;
  let countdown = null;
  if (phase.kind === "live") {
    countdown = `${convention.name} is live, day ${phase.day} of ${phase.totalDays}`;
  } else if (phase.kind === "countdown") {
    countdown = phase.days === 1 ? `${convention.name} starts tomorrow` : `${phase.days} days until ${convention.name}`;
  }
  const pageUrl = `${SITE_URL}/conventions/${convention.slug}`;
  const title = conventionTitle(convention.name);
  const description = dateLine ? `Video coverage for ${convention.name}, ${dateLine}. Activation, suite and side event films near Moscone, clips by 10am the next day.` : `Video coverage for ${convention.name} ${tbaYear} in San Francisco. Activation, suite and side event films near Moscone, clips by 10am the next day.`;
  const faqs2 = [...convention.faqs, ...sharedConventionFaqs];
  const answer = `Where2Studios covers ${convention.name} in San Francisco for ${joinNames(
    convention.buyers
  )}. Activations, suites, exec meetings and side events near Moscone, clips by 10am, full recap the same week.${clientNames ? ` Past ${convention.name} and conference week work includes ${clientNames} at The Howard, B Restaurant and The Veranda.` : ""}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${convention.name} Video Coverage`,
    serviceType: "Event video production",
    description,
    url: pageUrl,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: areaServed$1
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs2.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Conventions", item: `${SITE_URL}/conventions` },
      { "@type": "ListItem", position: 3, name: convention.name, item: pageUrl }
    ]
  };
  const eventSchema = edition ? {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${convention.name} ${edition.year}`,
    startDate: edition.start,
    endDate: edition.end,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: convention.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US"
      }
    },
    organizer: { "@type": "Organization", name: convention.organizer }
  } : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title,
        ogTitle: `${convention.name} video coverage`,
        description,
        canonical: `/conventions/${convention.slug}`,
        answer: true,
        image: `/og/conventions/${convention.slug}.png`,
        imageAlt: `${convention.name} video coverage`,
        breadcrumbName: convention.name,
        schema: eventSchema ? [serviceSchema, faqSchema, breadcrumbSchema, eventSchema] : [serviceSchema, faqSchema, breadcrumbSchema]
      }
    ),
    /* @__PURE__ */ jsxs(PageLayout, { navVariant: "dark", children: [
      /* @__PURE__ */ jsx("section", { className: "bg-m3-surface-dark pb-12 sm:pb-16 pt-[calc(var(--nav-h,112px)+1.5rem)] sm:pt-[calc(var(--nav-h,112px)+2.5rem)]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-m3-primary text-xs font-semibold uppercase tracking-widest", children: eyebrow }),
        /* @__PURE__ */ jsx("h1", { className: "font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-dark mt-3", children: h1 }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base sm:text-lg text-m3-on-dark/75", children: "Activation, lounge and side event coverage near Moscone. Clips by 10am the next day." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-6", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => scrollTo("convention-form"),
              className: "m3-filled-button text-sm px-6 py-3",
              children: [
                "Book ",
                convention.name,
                " coverage"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scrollTo("convention-proof"),
              className: "m3-outlined-button text-sm px-6 py-3 text-m3-on-dark border-m3-on-dark/30",
              children: "See the work"
            }
          )
        ] }),
        countdown && /* @__PURE__ */ jsx(
          "p",
          {
            className: "font-fredoka font-semibold text-m3-primary mt-5 text-lg",
            "aria-live": "polite",
            children: countdown
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-m3-on-dark/60", children: convention.venue })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-m3-background", children: /* @__PURE__ */ jsx(TrustedBrands, {}) }),
      /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-14 bg-m3-surface", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: /* @__PURE__ */ jsx(
        "p",
        {
          id: "answer",
          className: "text-sm sm:text-base text-m3-on-surface/80 leading-relaxed",
          children: answer
        }
      ) }) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          id: "convention-proof",
          className: "py-12 sm:py-20 bg-m3-background scroll-mt-[calc(var(--nav-h,80px)+16px)]",
          children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface", children: "Conference week work" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm sm:text-base text-m3-on-surface/70", children: "Real work, not a mood board." }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8", children: proof.map((project, index) => /* @__PURE__ */ jsx(
              ProjectCard,
              {
                project,
                index,
                aspectRatio: "vertical",
                onClick: () => setActiveVideo(project)
              },
              project.id
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-6", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/work",
                  className: "inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm",
                  children: [
                    "See all our work",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ),
              taggedCount > proof.length && /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/work?category=convention-week",
                  className: "inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm",
                  children: [
                    "All ",
                    convention.name,
                    " work",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-surface", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface", children: "What we deliver" }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5 mt-8", children: deliverables$1.map((item) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxs("div", { className: "m3-elevated-card p-5", children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-m3-primary", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("h3", { className: "font-fredoka text-lg font-semibold text-m3-on-surface mt-3", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-m3-on-surface/70 mt-2", children: item.line })
          ] }, item.id);
        }) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-m3-on-surface/60 mt-6", children: "Quote based. Send your dates and we scope it the same day." })
      ] }) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          id: "convention-form",
          className: "py-12 sm:py-16 bg-m3-surface-variant scroll-mt-[calc(var(--nav-h,80px)+16px)]",
          children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-2xl", children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6", children: [
              "Book ",
              convention.name,
              " coverage"
            ] }),
            /* @__PURE__ */ jsx(
              ConventionForm,
              {
                slug: convention.slug,
                conventionName: convention.name,
                year,
                preselected,
                onPreselect: setPreselected
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-m3-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6", children: [
          convention.name,
          " questions"
        ] }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs2.map((faq, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `cv-faq-${i}`, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { "data-faq-question": true, className: "text-left text-sm sm:text-base text-m3-on-surface", children: faq.q }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm text-m3-on-surface/70", children: faq.a })
        ] }, `cv-faq-${i}`)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/conventions",
            className: "inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm",
            children: [
              "See the full conference calendar",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      VideoModal,
      {
        isOpen: !!activeVideo,
        onClose: () => setActiveVideo(null),
        videoUrl: (activeVideo == null ? void 0 : activeVideo.video_url) || null,
        title: activeVideo == null ? void 0 : activeVideo.title,
        portrait: isPortraitMedia(activeVideo)
      }
    )
  ] });
}
function ConventionPage() {
  const { slug } = useParams();
  const convention = conventions.find((c) => c.slug === slug);
  if (!convention) return /* @__PURE__ */ jsx(NotFoundPage, {});
  if (convention.href) return /* @__PURE__ */ jsx(ConventionRedirect, { convention });
  return /* @__PURE__ */ jsx(ConventionContent, { convention });
}
function getConventionStaticPaths() {
  return conventions.filter((c) => !c.href).map((c) => `/conventions/${c.slug}`);
}
(_Sa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Sa.call(globalThis, "src/lib/prerenderData.ts");
async function publishedProjects(category) {
  let query = supabase.from("projects").select("*").eq("published", true).eq("show_on_main_site", true).order("display_order", { ascending: true });
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
async function getPublishedCaseStudyPaths() {
  const { data, error } = await supabase.from("projects").select("slug").eq("published", true).eq("show_on_main_site", true).or("media_type.is.null,media_type.neq.photo").not("slug", "is", null);
  if (error) {
    console.warn("[prerender] could not read project slugs:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.slug).filter((slug) => !!slug).map((slug) => `/work/${slug}`);
}
async function prefetchForRoute(queryClient2, routePath) {
  const tasks = [];
  const prefetch = (queryKey, queryFn) => {
    tasks.push(queryClient2.prefetchQuery({ queryKey, queryFn }));
  };
  prefetch(["all-projects", void 0], () => publishedProjects());
  prefetch(["all-projects", "event-recaps"], () => publishedProjects("event-recaps"));
  prefetch(["all-projects", "events"], () => publishedProjects("events"));
  prefetch(["projects", {}], async () => {
    const { data, error } = await supabase.from("projects").select("*").eq("show_on_main_site", true).order("display_order", { ascending: true });
    if (error) throw error;
    return data;
  });
  prefetch(["featured-case-studies", 5], async () => {
    const { data, error } = await supabase.from("projects").select("*").eq("featured", true).eq("published", true).eq("show_on_main_site", true).order("display_order", { ascending: true }).limit(5);
    if (error) throw error;
    return data;
  });
  prefetch(["photo-projects"], async () => {
    const { data, error } = await supabase.from("projects").select("*").eq("media_type", "photo").eq("published", true).eq("show_on_main_site", true).order("display_order", { ascending: true });
    if (error) throw error;
    return data;
  });
  prefetch(["uploaded-video-projects", 4], async () => {
    const { data, error } = await supabase.from("projects").select("*").eq("source", "upload").eq("media_type", "video").eq("published", true).eq("show_on_main_site", true).order("display_order", { ascending: true }).limit(4);
    if (error) throw error;
    return data;
  });
  prefetch(["testimonials"], async () => {
    const { data, error } = await supabase.from("testimonials").select("*").eq("published", true).order("display_order", { ascending: true });
    if (error) throw error;
    return data;
  });
  const caseStudyMatch = routePath.match(/^\/work\/(.+)$/);
  if (caseStudyMatch) {
    const slug = caseStudyMatch[1];
    prefetch(["case-study", slug], async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).eq("published", true).single();
      if (error) throw error;
      return data;
    });
  }
  const results = await Promise.allSettled(tasks);
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.warn("[prerender] data fetch failed:", result.reason);
    }
  });
}
(_Ta = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ta.call(globalThis, "src/routes.tsx");
const routes = [
  {
    path: "/",
    Component: App,
    children: [
      { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) },
      { path: "event-recap-videos", element: /* @__PURE__ */ jsx(EventRecapVideosPage, {}) },
      { path: "sf-tech-week", element: /* @__PURE__ */ jsx(SFTechWeekPage, {}) },
      { path: "work", element: /* @__PURE__ */ jsx(WorkPage, {}) },
      {
        path: "work/:slug",
        element: /* @__PURE__ */ jsx(CaseStudyPage, {}),
        getStaticPaths: getPublishedCaseStudyPaths
      },
      { path: "conventions", element: /* @__PURE__ */ jsx(ConventionsPage, {}) },
      {
        path: "conventions/:slug",
        element: /* @__PURE__ */ jsx(ConventionPage, {}),
        getStaticPaths: getConventionStaticPaths
      },
      { path: "services", element: /* @__PURE__ */ jsx(ServicesPage, {}) },
      { path: "why-a-dedicated-crew", element: /* @__PURE__ */ jsx(WhyDedicatedCrewPage, {}) },
      { path: "contact", element: /* @__PURE__ */ jsx(ContactPage, {}) },
      { path: "who-we-are", element: /* @__PURE__ */ jsx(TeamPage, {}) },
      { path: "socials", element: /* @__PURE__ */ jsx(SocialsRedirectPage, {}) },
      { path: "backyard-bayou-socials", element: /* @__PURE__ */ jsx(SocialsPage, {}) },
      { path: "privacy", element: /* @__PURE__ */ jsx(PrivacyPolicyPage, {}) },
      { path: "terms", element: /* @__PURE__ */ jsx(TermsOfServicePage, {}) },
      { path: "where2boys", element: /* @__PURE__ */ jsx(Where2BoysPage, {}) },
      { path: "accessibility", element: /* @__PURE__ */ jsx(AccessibilityPage, {}) },
      { path: "admin/login", element: /* @__PURE__ */ jsx(AdminLoginPage, {}) },
      {
        path: "admin/social",
        element: /* @__PURE__ */ jsx(AdminRoute, { children: /* @__PURE__ */ jsx(SocialAdminPage, {}) })
      },
      {
        path: "admin/portfolio",
        element: /* @__PURE__ */ jsx(AdminRoute, { children: /* @__PURE__ */ jsx(PortfolioAdminPage, {}) })
      },
      { path: "404", element: /* @__PURE__ */ jsx(NotFoundPage, {}) },
      { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) }
    ]
  }
];
(_Ua = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Ua.call(globalThis, "src/main.tsx");
const EXCLUDED_PREFIXES = ["/admin"];
const includedRoutes = (paths) => paths.filter((route) => {
  const normalized = route.startsWith("/") ? route : `/${route}`;
  if (normalized.includes(":") || normalized.includes("*")) return false;
  return !EXCLUDED_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`)
  );
});
const createRoot = ViteReactSSG(
  { routes },
  async ({ isClient, routePath, initialState }) => {
    var _a2;
    if (!isClient) {
      const route = routePath ?? "/";
      await prefetchForRoute(queryClient, route);
      const slug = (_a2 = route.match(/^\/work\/(.+)$/)) == null ? void 0 : _a2[1];
      initialState.reactQuery = dehydrate(queryClient, {
        shouldDehydrateQuery: (query) => query.queryKey[0] === "case-study" ? query.queryKey[1] === slug : true
      });
      return;
    }
    if (initialState.reactQuery) {
      hydrate(queryClient, initialState.reactQuery);
    }
  }
);
export {
  createRoot,
  includedRoutes
};
