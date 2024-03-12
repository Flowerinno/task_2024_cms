export const fileToDataUrl = async (file: File) => {
  if (!file) return "";

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        resolve(e.target.result as string);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
