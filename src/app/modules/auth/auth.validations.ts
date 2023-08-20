import z from "zod";

export const useLoginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    password: z.string({
      required_error: "password is required",
    }),
  }),
});

export const authTokeZodSchema = z.object({
  headers: z.object({
    Authorization: z.string({
      required_error: "Access token is missing",
    }),
  }),
});

export const updatePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password is required",
    }),
    newPassword: z.string({
      required_error: "New password is required",
    }),
  }),
});
