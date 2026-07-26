export interface TeamMember {
  id: string;
  name: string;
  role: string;
  studioLocation: string;
  bio: string;
  image: string;
  upiId?: string;
  qrCode?: string;
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

export const teamData: TeamMember[] = [
  {
    id: "01",
    name: "Mr.Nooruddin",
    role: "Creative Director",
    studioLocation: "",
    bio: "From concept to execution, I lead teams of designers, 3D artists, filmmakers, and music producers to create work that inspires, connects, and leaves a lasting impact.",
    image: "/nouser.jpg",
    socials: {
      instagram: "https://www.instagram.com/md_nooruddin39?igsh=OTZsam13ZGs5eDl1",
    }
  },
  {
    id: "02",
    name: "Ram Charan Pidamarthi",
    role: "2D & 3D Artist",
    studioLocation: "",
    bio: "Master of After Effects and Blender, crafting immersive virtual worlds through cinematic motion design, stunning 3D visuals, and creative storytelling.",
    image: "/f3.jpg",
    upiId: "6303328461-3@ybl",
    qrCode: "/sarkar-qr.png",
    socials: {
      instagram: "https://www.instagram.com/sarkar.aep?igsh=MTBpNzczZW80enBhcg==",
    }
  },
  {
    id: "03",
    name: "Md Mohiuddin Azad Mesbah",
    role: "3D Artist",
    studioLocation: "Bangladesh",
    bio: "Creating immersive 3D worlds, cinematic visuals, and digital experiences that leave a lasting impression.",
    image: "/f2.jpg",
    socials: {
      instagram: "https://www.instagram.com/mohi_uddin_96?igsh=MWV6MzM5YnI3MWVvcg==",

    }
  },
  {
    id: "04",
    name: "Vanapalli Sahil",
    role: "Sound Architect & Composer",
    studioLocation: "Hyderabad",
    bio: "DJ & Music Producer delivering powerful drops, immersive melodies, and genre-defying productions designed for clubs, festivals, and beyond.",
    image: "/f1.jpeg",
    socials: {
      twitter: "#",

    }
  }
];