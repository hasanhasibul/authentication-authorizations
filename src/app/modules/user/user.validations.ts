import z from "zod";

export const UserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "password is required",
    }),

    role: z.enum(["seller", "buyer", "admin"], {
      required_error: "role is required",
    }),

    name: z.object({
      firstName: z
        .string({
          required_error: "First Name is required",
        })
        .trim(),
      lastName: z
        .string({
          required_error: "First Name is required",
        })
        .trim(),
    }),
    phoneNumber: z.string({
      required_error: "phone is required",
    }),
    address: z.string({
      required_error: "address is required",
    }),
    budget: z.number({
      required_error: "budget is required",
    }),
    income: z.number({
      required_error: "number is required",
    }),
  }),
});

export const UserUpdateZodSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: "password is required",
      })
      .optional(),

    role: z
      .enum(["seller", "buyer"], {
        required_error: "role is required",
      })
      .optional(),

    name: z
      .object({
        firstName: z
          .string({
            required_error: "First Name is required",
          })
          .trim()
          .optional(),
        lastName: z
          .string({
            required_error: "First Name is required",
          })
          .trim()
          .optional(),
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: "phone is required",
      })
      .optional(),
    address: z
      .string({
        required_error: "address is required",
      })
      .optional(),
    budget: z
      .number({
        required_error: "budget is required",
      })
      .optional(),
    income: z
      .number({
        required_error: "number is required",
      })
      .optional(),
  }),
});
