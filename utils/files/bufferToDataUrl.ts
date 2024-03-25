export const bufferToDataUrl = (buffer: Buffer[] | Buffer, type: string) => {
  const isArray = Array.isArray(buffer)
  return `data:${type};base64,${isArray ? Buffer.concat(buffer).toString('base64') : buffer.toString('base64')}`
}
