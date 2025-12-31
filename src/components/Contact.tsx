'use client'

import { useEffect } from 'react'

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

  return (
    <section id="contact" className="relative py-32 bg-card/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Let's Build Together
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="font-fredoka text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight mb-8">
            <span className="block mb-2">Ready to Build Your Engine?</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Book a discovery call. Tell us your goals, audience, and offer—and let's build a content system that drives real growth.
          </p>
        </div>

        {/* Cal.com Booking Widget */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-background clean-border rounded-3xl overflow-hidden elevated-shadow">
            {/* Widget Header */}
            <div className="bg-card/50 px-8 py-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-foreground mb-1">
                    Where2Studios Discovery Call
                  </h3>
                  <p className="text-muted-foreground">
                    30 minutes • Video call • Free consultation
                  </p>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent-emerald rounded-full" />
                  <span className="text-sm text-muted-foreground font-medium">Available now</span>
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
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-background clean-border rounded-2xl p-6 subtle-shadow">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-accent-blue rounded-full" />
              </div>
              <h4 className="font-fredoka font-semibold text-foreground mb-2">Diagnose</h4>
              <p className="text-muted-foreground text-sm">
                Goals, audience, offer—what does success look like for you?
              </p>
            </div>
            
            <div className="bg-background clean-border rounded-2xl p-6 subtle-shadow">
              <div className="w-12 h-12 bg-accent-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-accent-emerald rounded-full" />
              </div>
              <h4 className="font-fredoka font-semibold text-foreground mb-2">Custom Strategy</h4>
              <p className="text-muted-foreground text-sm">
                Content pillars, hooks, and a posting cadence built for your brand.
              </p>
            </div>
            
            <div className="bg-background clean-border rounded-2xl p-6 subtle-shadow">
              <div className="w-12 h-12 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-accent-purple rounded-full" />
              </div>
              <h4 className="font-fredoka font-semibold text-foreground mb-2">Next Steps</h4>
              <p className="text-muted-foreground text-sm">
                Clear roadmap to start producing and publishing content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}