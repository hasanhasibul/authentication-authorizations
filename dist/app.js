"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
const user_route_1 = require("./app/modules/user/user.route");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cow_route_1 = require("./app/modules/cow/cow.route");
const order_route_1 = __importDefault(require("./app/modules/order/order.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/user', user_route_1.userRouter);
app.use('/api/v1/cow', cow_route_1.cowRouter);
app.use('/api/v1/order', order_route_1.default);
app.get('/api/v1', (req, res) => {
    res.send('Hello World!');
});
app.use((req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        data: {},
        message: '404 not found',
    });
});
app.use(globalErrorHandler_1.default);
exports.default = app;
