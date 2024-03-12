export const dataUrlToBuffer = (dataUrl: string): Buffer => {
  const base64 = dataUrl.split(",")[1];
  const buffer = Buffer.from(base64, "base64");
  return buffer;
};
