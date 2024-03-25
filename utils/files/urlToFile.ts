export function urlToFile(dataURL: string): File | undefined {
  var arr = dataURL.split(",");
  if (arr.length < 2) return;
  // @ts-ignore
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type: mime });
  return new File([blob], "file", { type: mime });
}
