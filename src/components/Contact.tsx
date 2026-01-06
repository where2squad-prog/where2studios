'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import brandBackyardBayou from '@/assets/brand-backyard-bayou.svg'
import brandCityline from '@/assets/brand-cityline.svg'
import brandFoodieland from '@/assets/brand-foodieland.svg'
import brandOhgane from '@/assets/brand-ohgane.svg'
import brandPacbio from '@/assets/brand-pacbio.svg'
import brandVisitBerkeley from '@/assets/brand-visit-berkeley.svg'

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

  const brands = [
    { name: "Backyard Bayou", logo: brandBackyardBayou },
    { name: "Cityline", logo: brandCityline },
    { name: "Foodieland", logo: brandFoodieland },
    { name: "Ohgane", logo: brandOhgane },
    { name: "PacBio", logo: brandPacbio },
    { name: "Visit Berkeley", logo: brandVisitBerkeley },
  ]

  const deliverables = [
    "3 content angles",
    "30-day posting system",
    "Partnership ideas"
  ]

  return (
    <section id="contact" className="relative py-12 bg-cream-highlight overflow-hidden">
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-near-black/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-near-black/[0.03] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
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
          <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 mt-6 max-w-5xl mx-auto">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3 group"
              >
                <div 
                  className="rounded-[28px] w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center p-4 sm:p-5 transition-all duration-200"
                  style={{ background: '#0f120a' }}
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="w-full h-full object-contain filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ background: 'transparent' }}
                  />
                </div>
                <span className="font-fredoka text-xs sm:text-sm text-near-black/70 text-center font-medium">
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider with dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-px bg-near-black/20" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-brick-red rounded-full" 
          />
          <div className="w-12 h-px bg-near-black/20" />
        </div>

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
            <span className="font-fredoka text-xs font-medium text-brick-red uppercase tracking-widest">
              Let's Talk
            </span>
            <motion.div 
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-2 h-2 bg-brick-red rounded-full" 
            />
          </div>
          
          <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-near-black mb-2">
            Need story driven video that <span className="text-brick-red">delivers fast</span> and actually works?
          </h2>
          
          <p className="text-sm text-near-black/60 max-w-xl mx-auto mb-4">
            Book a call and let us build it right.
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