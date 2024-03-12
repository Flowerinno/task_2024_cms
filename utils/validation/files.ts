import z from "zod";

export const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
export const maxSizeInMB = 8;

export const checkFileSize = (sizeMb: number) => {
  return (files: File[]) => files.every((file) => file.size / 1000000 < sizeMb);
};

export const checkFileType = (accept: string[]) => {
  return (files: File[]) => files.every((file) => accept.includes(file.type));
};

export const fileArrayValidation = () => {
  return z
    .array(z.instanceof(File), {
      errorMap: () => ({ message: "File is required." }),
    })
    .max(1, { message: "Only one file is allowed." })
    .refine(checkFileSize(maxSizeInMB), {
      message: `File size should not exceed ${maxSizeInMB}mb.`,
    })
    .refine(checkFileType(allowedTypes), { message: "Invalid file format." });
};
