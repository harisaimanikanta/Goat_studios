export interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  audioUrl: string;
  description: string;
}

export const musicData: Track[] = [
  {
    id: "01",
    title: "",
    album: "GOAT STUDIOS",
    duration: "03:45",
    audioUrl: "/audio/track-1.mp3",
    description: ""
  },
  {
    id: "02",
    title: "",
    album: "GOAT STUDIOS",
    duration: "",
    audioUrl: "/audio/track-2.mp3",
    description: ""
  },
  {
    id: "03",
    title: "",
    album: "GOAT STUDIOS",
    duration: "02:58",
    audioUrl: "/audio/track-3.mp3",
    description: ""
  },
  {
    id: "04",
    title: "QUANTUM LIGHTS",
    album: "GOAT STUDIOS",
    duration: "05:24",
    audioUrl: "/audio/track-4.mp3",
    description: ""
  }
];
