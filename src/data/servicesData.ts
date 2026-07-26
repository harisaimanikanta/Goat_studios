export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export const servicesData: Service[] = [
  {
    id: "01",
    title: "3D ANIMATION",
    subtitle: "High-Fidelity Spatial Dynamics",
    description: "Creating keyframe and physics-based fluid, rigid-body, and organic motion simulations that defy gravity.",
    tags: ["Character Rigging", "Kinetic Physics", "Procedural Flow"]
  },
  {
    id: "02",
    title: "CGI & ENVIRONMENTS",
    subtitle: "Virtual Worldcrafting",
     description: "Integrating simulated particles, dust arrays, optical flares, and photorealistic CGI seamlessly into raw physical footage.",
    tags: ["Houdini Particles", "Compositing", "Chroma Keying"]
    
  },
  {
    id: "03",
    title: "HYPER-REAL VFX",
    subtitle: "Reality Manipulation",
    description: "Architectural and environmental digital twins built with procedural materials, complex scattering, and hyper-realistic lighting.",
   
    
    tags: ["Octane/Redshift", "Brutalist Spaces", "Micro-detail Textures"]
  },
  
 
  {
    id: "05",
    title: "OG virtual scene",
    subtitle: "Graphic Kinetic Systems",
    description: "Translating brand guidelines, typography, and vector elements into fluid, interactive, magnetic screen animations.",
    tags: ["Typography Motion", "UI Mockups", "Dynamic Idents"]
  },
  {
    id: "06",
    title: "MUSIC & SOUND PRODUCTION",
    subtitle: "Acoustic Atmosphere",
    description: "Synthesized dark synthwave, organic drones, and deep sub-basses crafted exclusively to support premium visual branding.",
    tags: ["Modular Synthesizers", "Foley Sound", "Bespoke Scoring"]
  },
  {
    id: "07",
    title: "PRODUCT VISUALIZATION",
    subtitle: "Industrial Masterpieces",
    description: "Showcasing premium consumer electronics, luxury chronographs, and futuristic hypercars with laboratory-level precision.",
    tags: ["Hard-Surface Modeling", "Studio Lighting", "Exploded Views"]
  },
 
];
