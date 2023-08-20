"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const cow_constant_1 = require("./cow.constant");
const cowSchema = new mongoose_1.Schema({
    age: {
        type: Number,
        required: true,
    },
    breed: {
        type: String,
        enum: [
            'Brahman',
            'Nellore',
            'Sahiwal',
            'Gir',
            'Indigenous',
            'Tharparkar',
            'Kankrej',
        ],
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [...cow_constant_1.enumCategoris],
    },
    label: {
        type: String,
        required: true,
        enum: ['for sale', 'sold out'],
    },
    location: {
        type: String,
        required: true,
        enum: [...cow_constant_1.enumLocations],
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seller: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
    },
    weight: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const cowModel = mongoose_1.default.model('cows', cowSchema);
exports.default = cowModel;
