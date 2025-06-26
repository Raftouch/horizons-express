export const formatTime = (timestamp: number, offset: number): string => {
  const localTimeStamp = (timestamp + offset) * 1000;
  const date = new Date(localTimeStamp);

  return date.toUTCString().slice(17, 22);
};

// export const formatTime = (date: Date): string =>
//   date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
