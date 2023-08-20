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
exports.orderServices = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const cow_modal_1 = __importDefault(require("../cow/cow.modal"));
const user_model_1 = __importDefault(require("../user/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createOrderService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const cowDetails = yield cow_modal_1.default
            .findById((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.cow)
            .populate('seller');
        if (!cowDetails) {
            throw new Error('cowDetails Not Found');
        }
        const userDetails = yield user_model_1.default.findById((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.buyer);
        if (!userDetails) {
            throw new Error('userDetails Not Found');
        }
        const cowPrice = (cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.price) || 0;
        const sellerCorrentIncome = ((_c = cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.seller) === null || _c === void 0 ? void 0 : _c.income) || 0;
        const budget = (userDetails === null || userDetails === void 0 ? void 0 : userDetails.budget) || 0;
        const remainingBuyedBudget = budget - cowPrice;
        const selletIncome = sellerCorrentIncome + cowPrice;
        const sellerId = (_d = cowDetails === null || cowDetails === void 0 ? void 0 : cowDetails.seller) === null || _d === void 0 ? void 0 : _d._id;
        const userResponseSeller = yield user_model_1.default.findByIdAndUpdate(sellerId, {
            income: selletIncome,
        });
        if (!userResponseSeller) {
            throw new Error('seller income updated fail');
        }
        const userResponse = yield user_model_1.default.findByIdAndUpdate((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.buyer, {
            budget: remainingBuyedBudget,
        });
        if (!userResponse) {
            throw new Error('buyer budget updated fail');
        }
        const order = yield order_model_1.default.create(req.body);
        if (!order) {
            throw new Error('order creation fail');
        }
        session.commitTransaction();
        session.endSession();
        return order;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
const getAllOrderService = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find({}).populate('buyer').populate('cow');
    if (!orders) {
        throw new Error('order retrived fail');
    }
    return orders;
});
exports.orderServices = {
    createOrderService,
    getAllOrderService,
};
