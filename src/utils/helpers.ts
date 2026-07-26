export function cn(...classes: (string | undefined | null | boolean | number)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function lerp(start: number, end: number, amt: number): number {
  return (1 - amt) * start + amt * end;
}
