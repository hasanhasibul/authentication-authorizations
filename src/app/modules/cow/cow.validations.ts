import { z } from 'zod'
import {
  enumBreed,
  enumCategoris,
  enumLabel,
  enumLocations,
} from './cow.constant'

export const createCowZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
      })
      .trim(),
    age: z.number({
      required_error: 'age is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    location: z.enum([...enumLocations] as [string, ...string[]], {
      required_error: 'location is required',
    }),

    breed: z.enum([...enumBreed] as [string, ...string[]], {
      required_error: 'breed is required',
    }),
    weight: z.number({
      required_error: 'weight is required',
    }),

    label: z.enum([...enumLabel] as [string, ...string[]], {
      required_error: 'label is required',
    }),
    category: z.enum([...enumCategoris] as [string, ...string[]], {
      required_error: 'category is required',
    }),
    seller: z.string({
      required_error: 'seller is required',
    }),
  }),
})
export const updateCowZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
      })
      .trim()
      .optional(),
    age: z
      .number({
        required_error: 'age is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'price is required',
      })
      .optional(),
    location: z
      .enum([...enumLocations] as [string, ...string[]], {
        required_error: 'location is required',
      })
      .optional(),

    breed: z
      .enum([...enumBreed] as [string, ...string[]], {
        required_error: 'breed is required',
      })
      .optional(),
    weight: z
      .number({
        required_error: 'weight is required',
      })
      .optional(),

    label: z
      .enum([...enumLabel] as [string, ...string[]], {
        required_error: 'label is required',
      })
      .optional(),
    category: z
      .enum([...enumCategoris] as [string, ...string[]], {
        required_error: 'category is required',
      })
      .optional(),
    seller: z
      .string({
        required_error: 'seller is required',
      })
      .optional(),
  }),
})
