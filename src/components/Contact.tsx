'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function Contact() {

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
      (function (C, A, L) { 
        let p = function (a, ar) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      
      Cal("init", "mojju-discovery-call", {origin:"https://app.cal.com"});
      
      Cal.ns["mojju-discovery-call"]("inline", {
        elementOrSelector:"#my-cal-inline-mojju-discovery-call",
        config: {"layout":"month_view"},
        calLink: "mojli/30min",
      });
      
      Cal.ns["mojju-discovery-call"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `
    
    document.body.appendChild(script)
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const brandPlaceholders = [
    { name: "Brand 1" },
    { name: "Brand 2" },
    { name: "Brand 3" },
    { name: "Brand 4" },
    { name: "Brand 5" },
    { name: "Brand 6" },
  ]

  const deliverables = [
    "3 content angles",
    "30-day posting system",
    "Partnership ideas"
  ]

  return (
    <section id="contact" className="relative py-12 bg-cream-highlight">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Trusted By - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-8"
        >
          <span className="font-fredoka text-xs font-medium text-near-black/50 uppercase tracking-widest">
            Trusted By Growing Brands
          </span>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-4 max-w-3xl mx-auto">
            {brandPlaceholders.map((_, index) => (
              <div
                key={index}
                className="w-24 h-10 rounded-lg bg-near-black/5 border border-near-black/10 flex items-center justify-center"
              >
                <span className="font-fredoka text-xs text-near-black/30">Logo</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-px bg-near-black/10 mx-auto mb-8" />

        {/* Contact Header - Condensed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-golden-yellow rounded-full" />
            <span className="font-fredoka text-xs font-medium text-golden-yellow uppercase tracking-widest">
              Let's Talk
            </span>
            <div className="w-2 h-2 bg-brick-red rounded-full" />
          </div>
          
          <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-near-black mb-2">
            Book a 30-Minute <span className="text-golden-yellow">Growth Audit</span>
          </h2>
          
          <p className="text-sm text-near-black/60 max-w-xl mx-auto mb-4">
            Tell us your goals, audience, and bottlenecks. We'll show you how to turn content into customers.
          </p>
          
          {/* Inline Deliverables */}
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 text-xs"
              >
                <Check className="w-3 h-3 text-golden-yellow" />
                <span className="text-near-black/70">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cal.com Widget - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-card/50 px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-fredoka text-base font-semibold text-near-black">
                  Where2Studios Growth Audit
                </h3>
                <p className="text-near-black/50 text-xs">
                  30 min • Video call • Free
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-near-black/50">Available</span>
              </div>
            </div>
            
            <div className="p-0 bg-white">
              <div 
                style={{ width: '100%', height: '500px', overflow: 'scroll' }} 
                id="my-cal-inline-mojju-discovery-call"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}