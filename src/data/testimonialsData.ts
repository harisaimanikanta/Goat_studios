export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "01",
    quote: "Goat Studios did not just render our hardware; they captured the absolute metaphysical soul of our industrial design. Their work is purely artistic and cinematic.",
    author: "Philip Yang",
    role: "Ast.Creative Director",
    company: "Ather Studios",
    avatar: "/c3.png"
  },
  {
    id: "02",
    quote: "Mohiuddin is a talented 3D artist who helped me with 3D model video editing and rendering.",
    author: "Muhammad Asad",
    role: "Creative Director",
    company: "Motion CC",
    avatar: "/c2.png"
  },
  {
    id: "03",
    quote: "I definitely recommend working with Goat Studios and I will be a repeat client..",
    author: "Leo Friedman",
    role: " Founder",
    company: "I promo ",
    avatar: "/c1.png"
  }
];
