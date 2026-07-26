export interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  audioUrl: string;
  youtubeId?: string;
  description: string;
}

export const musicData: Track[] = [
  {
    id: "01",
    title: "GOAT STUDIOS ANTHEM",
    album: "GOAT STUDIOS",
    duration: "03:45",
    audioUrl: "/audio/track-1.mp3",
    youtubeId: "uXE4OrL0uXw",
    description: "Official GOAT Studios synthetic acoustic soundtrack featuring procedural monoliths and 8K CGI visuals."
  },
  {
    id: "02",
    title: "CYBERPUNK NEON DRIFT",
    album: "GOAT STUDIOS",
    duration: "04:12",
    audioUrl: "/audio/track-2.mp3",
    youtubeId: "uXE4OrL0uXw",
    description: "Deep analog synth wave scoring spatial digital environments designed by GOAT Studios."
  },
  {
    id: "03",
    title: "QUANTUM MONOLITH",
    album: "GOAT STUDIOS",
    duration: "02:58",
    audioUrl: "/audio/track-3.mp3",
    youtubeId: "uXE4OrL0uXw",
    description: "Modular analog synthesizer soundscapes engineered for luxury motion & digital realities."
  }
];
