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

  const deliverables = [
    "3 content angles",
    "30-day posting system",
    "Partnership ideas"
  ]

  return (
    <section id="contact" className="relative py-12 bg-white overflow-hidden">
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-golden-yellow/[0.05] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-golden-yellow/[0.05] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Contact Header - Condensed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <motion.div 
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-brick-red rounded-full" 
            />
            <span className="font-fredoka text-xs font-medium text-white uppercase tracking-widest">
              Let's Talk
            </span>
            <motion.div 
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-2 h-2 bg-brick-red rounded-full" 
            />
          </div>
          
          <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-near-black mb-2">
            Want content that feels <span className="text-brick-red">real</span> and actually works?
          </h2>
          
          <p className="text-sm text-near-black/60 max-w-xl mx-auto mb-4">
            Book a call and let's build something your audience wants to be part of.
          </p>
          
          {/* Inline Deliverables */}
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-1.5 text-xs bg-near-black/10 px-3 py-1.5 rounded-full"
              >
                <Check className="w-3 h-3 text-brick-red" />
                <span className="text-near-black">{item}</span>
              </motion.div>
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
                style={{ width: '100%', overflow: 'auto' }} 
                className="min-h-[400px] sm:min-h-[500px]"
                id="my-cal-inline-mojju-discovery-call"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}