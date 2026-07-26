export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  role: string;
  client: string;
  link: string;
  videoUrl: string;
}

export const portfolioData: Project[] = [
  {
    id: "01",
    title: "NEO-CONSTRUCT",
    category: "CGI & Architectural Visualization",
    year: "2026",
    image: "https://res.cloudinary.com/bjzirr40/image/upload/v1784837040/Preview_2_gizi70.png",
    description: "A brutalist digital monolithic structure merging raw concrete with interactive quantum light arrays.",
    role: "Lead CGI & Environmental Design",
    client: "Aether Dynamics",
    link: "#",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "02",
    title: "STRANGER THINGS INSPIRED",
    category: "CGI & Product Visualization",
    year: "2026",
    image: "https://res.cloudinary.com/bjzirr40/image/upload/v1784837028/Timeline_1_01_00_37_03.jpg_jb4ukj.jpg",
    description: "An aerodynamic study of future electric luxury sports hypercars, utilizing ray-traced wind simulation.",
    role: "Automotive Lighting & Rendering",
    client: "Apex Electric",
    link: "#",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "03",
    title: "TAROT CARDS",
    category: "3D Interactive CARDS",
    year: "2025",
    image: "https://res.cloudinary.com/bjzirr40/image/upload/v1784837021/Timeline_1_01_00_43_22.jpg_seesfv.jpg",
    description: "3D cards desigined and simulated using blender which shows the expertise in every feild.",
    role: "Lead Interactive Prototyping",
    client: "Nothing Labs",
    link: "#",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "04",
    title: "DODGE KINGSWAY",
    category: "Motion Design & VFX",
    year: "2025",
    image: "https://res.cloudinary.com/bjzirr40/image/upload/v1784837027/WhatsApp_Image_2026-07-24_at_12.39.41_AM_cfmnv7.jpg",
    description: "Soundwave reactive visuals for experimental synthesizers, driven by procedural particle dynamics.",
    role: "Creative Direction & VFX Master",
    client: "Mute Records",
    link: "#",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "05",
    title: "BLACK SKULL",
    category: "Luxury Wearables & CGI",
    year: "2026",
    image: "https://res.cloudinary.com/bjzirr40/image/upload/v1784837012/Timeline_1_01_00_32_20.jpg_t7p9om.jpg",
    description: "A digital watch concept inspired by liquid mechanics and high-end mechanical tourbillons.",
    role: "3D Modeling & Material Design",
    client: "LINKED IN",
    link: "#",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

