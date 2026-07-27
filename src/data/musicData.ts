export interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  audioUrl: string;
  youtubeId?: string;
  description: string;
  status: string;
}

export const musicData: Track[] = [
  {
    id: "01",
    title: "GOAT STUDIOS ANTHEM",
    album: "GOAT STUDIOS VOL. 1",
    duration: "03:45",
    audioUrl: "",
    youtubeId: "uXE4OrL0uXw",
    description: "Official GOAT Studios synthetic acoustic soundtrack featuring procedural monoliths and 8K CGI visuals.",
    status: "STILL IN PRODUCTION"
  },
  {
    id: "02",
    title: "CYBERPUNK NEON DRIFT",
    album: "GOAT STUDIOS VOL. 1",
    duration: "04:12",
    audioUrl: "",
    youtubeId: "uXE4OrL0uXw",
    description: "Deep analog synth wave scoring spatial digital environments designed by GOAT Studios.",
    status: "STILL IN PRODUCTION"
  },
  {
    id: "03",
    title: "QUANTUM MONOLITH",
    album: "GOAT STUDIOS VOL. 1",
    duration: "02:58",
    audioUrl: "",
    youtubeId: "uXE4OrL0uXw",
    description: "Modular analog synthesizer soundscapes engineered for luxury motion & digital realities.",
    status: "STILL IN PRODUCTION"
  }
];
