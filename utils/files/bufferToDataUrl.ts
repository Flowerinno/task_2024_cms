export const bufferToDataUrl = (buffer: Buffer[], type: string) => {
  return `data:${type};base64,${buffer.join(",").toString()}`;
};
