const fs = require('fs');
const content = fs.readFileSync('src/components/Contact/Contact.tsx', 'utf-8');

const updatedContent = content
  .replace('import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";', 'import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from "lucide-react";')
  .replace(
    /\{\/\* Submit Container \*\/\}[\s\S]*?<\/div>/,
    `{/* Submit Container */}
                <div className="mt-4 flex flex-col gap-4">
                  <MagneticButton
                    type="submit"
                    className="w-full py-4 text-xs tracking-[0.2em] font-mono font-bold bg-gradient-to-r from-cyan-400 to-yellow-500 text-black border-0 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-[1.02] transition-transform"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "TRANSMIT DIRECTIVE (EMAIL)"}
                  </MagneticButton>
                  <a
                    href={\`https://wa.me/\${BRAND_INFO.phone.replace(/\\D/g, '')}\`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 text-xs tracking-[0.2em] font-mono font-bold bg-[#25D366] text-black border-0 shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 rounded-[8px]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    MESSAGE ON WHATSAPP
                  </a>
                </div>`
  );

fs.writeFileSync('src/components/Contact/Contact.tsx', updatedContent);
