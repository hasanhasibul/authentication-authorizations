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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderControllers = void 0;
const order_services_1 = require("./order.services");
const http_status_codes_1 = require("http-status-codes");
const createOrderController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_services_1.orderServices.createOrderService(req);
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: 'Cow created successfully',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllOrderController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_services_1.orderServices.getAllOrderService();
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: 'Cows Retrived successfully',
            data: orders,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.orderControllers = {
    createOrderController,
    getAllOrderController,
};
