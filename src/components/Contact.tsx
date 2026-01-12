'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

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

  return (
    <section id="contact" className="relative py-12 sm:py-16 bg-m3-surface-variant overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Contact Header - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-m3-on-surface mb-3">
            Want content that feels <span className="text-m3-secondary">real</span>?
          </h2>
          
          <p className="text-m3-on-surface/60 max-w-md mx-auto">
            Book a call and let's build something your audience wants to be part of.
          </p>
        </motion.div>

        {/* Cal.com Widget - M3 Elevated Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="m3-elevated-card overflow-hidden">
            <div className="bg-m3-surface px-4 sm:px-6 py-4 border-b border-m3-outline flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-m3-on-surface">
                  Where2Studios Growth Audit
                </h3>
                <p className="text-m3-on-surface/50 text-xs">
                  30 min · Video call · Free
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-m3-on-surface/50">Available</span>
              </div>
            </div>
            
            <div className="p-0 bg-m3-surface">
              <div 
                style={{ width: '100%', overflow: 'auto' }} 
                className="min-h-[400px] sm:min-h-[450px]"
                id="my-cal-inline-mojju-discovery-call"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
