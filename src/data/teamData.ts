export interface TeamMember {
  id: string;
  name: string;
  role: string;
  studioLocation: string;
  bio: string;
  image: string;
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
    role: "Founder & Creative Director",
    studioLocation: "",
    bio: "",
    image: "/nouser.jpg",
    socials: {
      instagram: "https://www.instagram.com/md_nooruddin39?igsh=OTZsam13ZGs5eDl1",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: "02",
    name: "",
    role: "Founder & 3D Artist",
    studioLocation: "",
    bio: "Master of AfterEffects and Blender on crafting Virtual worlds.",
    image: "/nouser.jpg",
    socials: {
      instagram: "https://www.instagram.com/sarkar.aep?igsh=MTBpNzczZW80enBhcg==",
      linkedin: "#"
    }
  },
  {
    id: "03",
    name: "Md Mohiuddin Azad Mesbah",
    role: "3D ",
    studioLocation: "GLOBAL",
    bio: "Kai bridges physical code and visual rhythm, bringing smooth inertial mechanics to life.",
    image: "/nouser.jpg",
    socials: {
      instagram: "https://www.instagram.com/mohi_uddin_96?igsh=MWV6MzM5YnI3MWVvcg==",
      twitter: "#"
    }
  },
  {
    id: "04",
    name: "Vanapalli Sahil",
    role: "Sound Architect & Composer",
    studioLocation: "GLOBAL",
    bio: "Using modular analog synthesizers, Marcus scores the custom acoustic monoliths of our cinematic experiences.",
    image: "/f1.jpeg",
    socials: {
      twitter: "#",
      linkedin: "#"
    }
  }
];