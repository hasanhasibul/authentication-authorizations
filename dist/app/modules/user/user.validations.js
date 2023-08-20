"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateZodSchema = exports.UserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string({
            required_error: 'password is required',
        }),
        role: zod_1.default.enum(['seller', 'buyer'], {
            required_error: 'role is required',
        }),
        name: zod_1.default.object({
            firstName: zod_1.default
                .string({
                required_error: 'First Name is required',
            })
                .trim(),
            lastName: zod_1.default
                .string({
                required_error: 'First Name is required',
            })
                .trim(),
        }),
        phoneNumber: zod_1.default.string({
            required_error: 'phone is required',
        }),
        address: zod_1.default.string({
            required_error: 'address is required',
        }),
        budget: zod_1.default.number({
            required_error: 'budget is required',
        }),
        income: zod_1.default.number({
            required_error: 'number is required',
        }),
    }),
});
exports.UserUpdateZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default
            .string({
            required_error: 'password is required',
        })
            .optional(),
        role: zod_1.default
            .enum(['seller', 'buyer'], {
            required_error: 'role is required',
        })
            .optional(),
        name: zod_1.default
            .object({
            firstName: zod_1.default
                .string({
                required_error: 'First Name is required',
            })
                .trim()
                .optional(),
            lastName: zod_1.default
                .string({
                required_error: 'First Name is required',
            })
                .trim()
                .optional(),
        })
            .optional(),
        phoneNumber: zod_1.default
            .string({
            required_error: 'phone is required',
        })
            .optional(),
        address: zod_1.default
            .string({
            required_error: 'address is required',
        })
            .optional(),
        budget: zod_1.default
            .number({
            required_error: 'budget is required',
        })
            .optional(),
        income: zod_1.default
            .number({
            required_error: 'number is required',
        })
            .optional(),
    }),
});
