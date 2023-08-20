"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowServices = void 0;
const cow_modal_1 = __importDefault(require("./cow.modal"));
const helpers_1 = require("../../../helpers");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createCowServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield cow_modal_1.default.create(req.body);
    if (!response) {
        throw new Error('cow created fail');
    }
    return response;
});
const getAllCowServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, searchTerm, sortBy, sortOrder } = (0, helpers_1.paginationHelper)(req);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: ['location', 'breed', 'category'].map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    const filtersDataByPrice = (0, pick_1.default)(req.query, ['minPrice', 'maxPrice']);
    if (Object.keys(filtersDataByPrice).length) {
        andConditions.push({
            $and: Object.entries(filtersDataByPrice).map(([field, value]) => {
                if (field === 'minPrice') {
                    return {
                        price: { $gte: value },
                    };
                }
                if (field === 'maxPrice') {
                    return {
                        price: { $lte: value },
                    };
                }
            }),
        });
    }
    const filtersDataByLocation = (0, pick_1.default)(req.query, ['location']);
    if (Object.keys(filtersDataByLocation).length) {
        andConditions.push({
            $and: Object.entries(filtersDataByLocation).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const total = yield cow_modal_1.default.countDocuments();
    const response = yield cow_modal_1.default
        .find(whereConditions)
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(Number(limit));
    if (!response) {
        throw new Error('cow retrived fail');
    }
    return {
        meta: {
            page: page,
            limit: limit,
            count: total,
        },
        response: response,
    };
});
const getSingleCowServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const response = yield cow_modal_1.default.findById(id);
    if (!response) {
        throw new Error('cow retrived fail');
    }
    return response;
});
const updateCowServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const response = yield cow_modal_1.default.findByIdAndUpdate(id, req.body);
    if (!response) {
        throw new Error('cow updated fail');
    }
    return response;
});
const deleteCowServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const response = yield cow_modal_1.default.findByIdAndDelete(id);
    if (!response) {
        throw new Error('cow deleted fail');
    }
    return response;
});
exports.cowServices = {
    createCowServices,
    getAllCowServices,
    getSingleCowServices,
    deleteCowServices,
    updateCowServices,
};
