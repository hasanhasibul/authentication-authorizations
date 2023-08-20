"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCowZodSchema = exports.createCowZodSchema = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
exports.createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'name is required',
        })
            .trim(),
        age: zod_1.z.number({
            required_error: 'age is required',
        }),
        price: zod_1.z.number({
            required_error: 'price is required',
        }),
        location: zod_1.z.enum([...cow_constant_1.enumLocations], {
            required_error: 'location is required',
        }),
        breed: zod_1.z.enum([...cow_constant_1.enumBreed], {
            required_error: 'breed is required',
        }),
        weight: zod_1.z.number({
            required_error: 'weight is required',
        }),
        label: zod_1.z.enum([...cow_constant_1.enumLabel], {
            required_error: 'label is required',
        }),
        category: zod_1.z.enum([...cow_constant_1.enumCategoris], {
            required_error: 'category is required',
        }),
        seller: zod_1.z.string({
            required_error: 'seller is required',
        }),
    }),
});
exports.updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'name is required',
        })
            .trim()
            .optional(),
        age: zod_1.z
            .number({
            required_error: 'age is required',
        })
            .optional(),
        price: zod_1.z
            .number({
            required_error: 'price is required',
        })
            .optional(),
        location: zod_1.z
            .enum([...cow_constant_1.enumLocations], {
            required_error: 'location is required',
        })
            .optional(),
        breed: zod_1.z
            .enum([...cow_constant_1.enumBreed], {
            required_error: 'breed is required',
        })
            .optional(),
        weight: zod_1.z
            .number({
            required_error: 'weight is required',
        })
            .optional(),
        label: zod_1.z
            .enum([...cow_constant_1.enumLabel], {
            required_error: 'label is required',
        })
            .optional(),
        category: zod_1.z
            .enum([...cow_constant_1.enumCategoris], {
            required_error: 'category is required',
        })
            .optional(),
        seller: zod_1.z
            .string({
            required_error: 'seller is required',
        })
            .optional(),
    }),
});
