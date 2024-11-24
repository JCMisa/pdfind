import { z } from "zod";

export const uploadPdfValidation = z.object({
  pdfTitle: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title must be at most 100 characters long." }),
});
