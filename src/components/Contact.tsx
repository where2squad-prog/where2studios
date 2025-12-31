'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function Contact() {

  useEffect(() => {
    // Load Cal.com embed script
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
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const deliverables = [
    "3 content angles tailored to your business",
    "A posting system for the next 30 days",
    "Partnership ideas to reach new customers"
  ]

  return (
    <section id="contact" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-golden-yellow rounded-full" />
            <span className="font-fredoka text-sm font-medium text-golden-yellow uppercase tracking-widest">
              Let's Talk
            </span>
            <div className="w-3 h-3 bg-brick-red rounded-full" />
          </div>
          
          <h2 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-near-black">
            Book a 30-Minute <span className="text-golden-yellow">Growth Audit</span>
          </h2>
          
          <p className="text-xl text-near-black/70 max-w-2xl mx-auto mb-8">
            Tell us your goals, audience, and current bottlenecks. We'll show you exactly how to turn content into customers.
          </p>
          
          {/* Deliverables */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 bg-golden-yellow/10 border border-golden-yellow/20 rounded-full px-4 py-2"
              >
                <Check className="w-4 h-4 text-golden-yellow" />
                <span className="text-sm font-medium text-near-black">{item}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Qualifier */}
          <p className="text-sm text-near-black/50 italic">
            Best if you can post at least 3x/week and want measurable growth
          </p>
        </motion.div>

        {/* Cal.com Booking Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-xl">
            {/* Widget Header */}
            <div className="bg-card/50 px-8 py-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-fredoka text-xl font-semibold text-near-black mb-1">
                    Where2Studios Growth Audit
                  </h3>
                  <p className="text-near-black/60">
                    30 minutes • Video call • Free
                  </p>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-near-black/60 font-medium">Available now</span>
                </div>
              </div>
            </div>
            
            {/* Cal.com Embed Container */}
            <div className="p-0 bg-white">
              <div 
                style={{
                  width: '100%',
                  height: '600px',
                  overflow: 'scroll'
                }} 
                id="my-cal-inline-mojju-discovery-call"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}