import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BRAND_INFO, SOCIAL_LINKS } from "../../utils/constants";
import MagneticButton from "../Button/MagneticButton";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, ExternalLink } from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "3D Animation",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct mailto link
    const mailtoLink = `mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "3D Animation", message: "" });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="contact-section border-t border-cyan-500/20">
      <div className="contact-bg-glow" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              [INITIATE_STUDIO_DIRECTIVE]
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mt-4 uppercase">
              CO<span className="stroke-text-cyber">LLABORATE</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-300 max-w-sm font-sans tracking-wide leading-relaxed font-light">
            Ready to design your next digital monument? Direct your inquiries to our team.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Block: Details & Custom coordinate grid */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-8">
              {/* Info Items */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider block uppercase">
                    DIRECT EMAIL DISPATCH
                  </span>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="text-sm font-mono text-white hover:text-cyan-300 transition-colors mt-0.5 block font-bold"
                  >
                    {BRAND_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/80 border border-yellow-400/50 flex items-center justify-center text-yellow-400 shrink-0 shadow-[0_0_15px_rgba(255,230,0,0.3)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-yellow-400 font-bold tracking-wider block uppercase">
                    SECURE HOTLINE
                  </span>
                  <a
                    href={`tel:${BRAND_INFO.phone}`}
                    className="text-sm font-mono text-white hover:text-yellow-300 transition-colors mt-0.5 block font-bold"
                  >
                    {BRAND_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Global Location Highlighted */}
              <div className="p-4 rounded-xl bg-black/60 border border-cyan-400/30 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-400 text-xs font-mono font-bold">
                    HQ
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">GLOBAL HQ</span>
                    <span className="text-xs font-mono text-white">{BRAND_INFO.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Interactive Blueprint Coordinate Map (Clickable to Google Maps Destination) */}
            <a
              href={BRAND_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-blueprint-container relative mt-4 block group cursor-pointer border border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]"
              title="Click to view destination on Google Maps"
            >
              {/* Cyber HUD Corner Decorators */}
              <div className="cyber-corner-tl opacity-80 group-hover:scale-110 transition-transform" />
              <div className="cyber-corner-tr opacity-80 group-hover:scale-110 transition-transform" />
              <div className="cyber-corner-bl opacity-80 group-hover:scale-110 transition-transform" />
              <div className="cyber-corner-br opacity-80 group-hover:scale-110 transition-transform" />

              <div className="map-grid-lines" />
              <div className="map-radar-glow" />

              {/* Monolithic Coordinate Pulse Dot */}
              <div className="absolute top-[45%] left-[55%] w-4 h-4 rounded-full bg-cyan-400 border-2 border-black flex items-center justify-center shadow-[0_0_20px_#00f0ff] group-hover:scale-125 transition-transform">
                <span className="absolute w-8 h-8 rounded-full border border-cyan-400/50 animate-ping" />
              </div>

              {/* Subtle Hover Indication Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-black/90 text-cyan-300 border border-cyan-400 px-3.5 py-2 rounded-lg font-mono text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] font-bold uppercase">
                  <span>OPEN IN GOOGLE MAPS</span>
                  <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
                </span>
              </div>

              {/* Lower HUD Coordinates Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-cyan-300 bg-black/80 p-2.5 rounded-lg border border-cyan-500/30 font-bold z-10">
                <span className="truncate">{BRAND_INFO.coordinates}</span>
                <span className="text-yellow-400 uppercase shrink-0 ml-2 group-hover:text-cyan-300 transition-colors">GRID ACTIVE ↗</span>
              </div>
            </a>
          </div>

          {/* Right Block: Luxury Contact Form */}
          <div className="lg:col-span-7">
            <div className="contact-glass-card p-6 md:p-10 relative">
              {/* Cyber HUD Corner Decorators */}
              <div className="cyber-corner-tl opacity-80" />
              <div className="cyber-corner-tr opacity-80" />
              <div className="cyber-corner-bl opacity-80" />
              <div className="cyber-corner-br opacity-80" />

              {/* Success Screen Overlay */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-black/95 z-20 flex flex-col items-center justify-center text-center p-8 border border-cyan-400/50"
                  >
                    <CheckCircle2 className="w-16 h-16 text-cyan-400 mb-4 animate-bounce" />
                    <h3 className="text-2xl font-mono font-bold tracking-tight text-white">
                      TRANSMISSION RECEIVED
                    </h3>
                    <p className="text-zinc-300 text-sm mt-3 max-w-sm leading-relaxed font-mono font-light">
                      Your spatial directives have been securely logged. Our curators will contact you shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
                      YOUR BRAND NAME
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Porsche Design"
                      className="contact-input"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
                      SECURE EMAIL ADDRESS
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. contact@porsche.co"
                      className="contact-input"
                    />
                  </div>
                </div>

                {/* Subject Selector */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
                    DIRECTIVE CATEGORY
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="contact-input cursor-pointer"
                  >
                    <option value="3D Animation">3D ANIMATION &amp; CGI</option>
                    <option value="Product Visualization">PRODUCT VISUALIZATION</option>
                    <option value="Sound Design">BESPOKE AUDIOS</option>
                    <option value="Interactive Prototyping">INTERACTIVE 3D WEB EXPERIENCES</option>
                  </select>
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
                    PROJECT SCOPE DIRECTIVE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe the aesthetic and functional directives of your project in detail..."
                    className="contact-input resize-none"
                  />
                </div>

                {/* Submit Container */}
                <div className="mt-4 flex flex-col gap-4">
                  <MagneticButton
                    type="submit"
                    className="w-full py-4 text-xs tracking-[0.2em] font-mono font-bold bg-gradient-to-r from-cyan-400 to-yellow-500 text-black border-0 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-[1.02] transition-transform"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "TRANSMIT DIRECTIVE (EMAIL)"}
                  </MagneticButton>
                  <a
                    href={`https://wa.me/${BRAND_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hi, I recently came across your website and wanted to learn a bit more about GOAT Studios. Could you tell me about your studio, the services you offer, and the types of projects you typically work on?")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 text-xs tracking-[0.2em] font-mono font-bold bg-[#25D366] text-black border-0 shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 rounded-[8px]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    MESSAGE ON WHATSAPP
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
