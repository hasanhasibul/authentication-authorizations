"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controllers_1 = require("./order.controllers");
const router = express_1.default.Router();
router.post('/orders', order_controllers_1.orderControllers.createOrderController);
router.get('/orders', order_controllers_1.orderControllers.getAllOrderController);
const orderRoutes = router;
exports.default = orderRoutes;
