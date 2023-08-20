import z from "zod";
export const adminZodValidationSchema = z.object({
  body: z.object({
    address: z.string({
      required_error: "Address is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "last name is required",
      }),
    }),
    phoneNumber: z.string({
      required_error: "phoneNumber is required",
    }),
    role: z.enum(["admin"], {
      required_error: "Role is required",
    }),
  }),
});
