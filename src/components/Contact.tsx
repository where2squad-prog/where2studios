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
    <section id="contact" className="relative py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Contact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-xs font-semibold text-brick-red uppercase tracking-widest">
            Let's Talk
          </span>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-near-black mt-2 mb-2">
            Want content that feels <span className="text-brick-red">real</span>?
          </h2>
          
          <p className="text-sm text-near-black/60 max-w-md mx-auto mb-4">
            Book a call and let's build something your audience wants to be part of.
          </p>
          
          {/* Inline Deliverables */}
          <div className="flex flex-wrap justify-center gap-2">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 text-xs bg-near-black/5 px-3 py-1.5 rounded-full"
              >
                <Check className="w-3 h-3 text-brick-red" />
                <span className="text-near-black">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cal.com Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-muted/50 px-4 sm:px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-near-black">
                  Where2Studios Growth Audit
                </h3>
                <p className="text-near-black/50 text-xs">
                  30 min • Video call • Free
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-near-black/50">Available</span>
              </div>
            </div>
            
            <div className="p-0 bg-white">
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