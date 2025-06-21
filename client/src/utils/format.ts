export const formatTime = (date: Date): string =>
  date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
