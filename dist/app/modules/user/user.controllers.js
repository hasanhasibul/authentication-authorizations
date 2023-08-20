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
exports.userController = void 0;
const user_services_1 = require("./user.services");
const http_status_codes_1 = require("http-status-codes");
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const reqBody = {
            address: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.address,
            budget: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.budget,
            income: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.income,
            password: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.password,
            phoneNumber: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.phoneNumber,
            role: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.role,
            name: {
                firstName: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.name.firstName,
                lastName: (_j = (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.name) === null || _j === void 0 ? void 0 : _j.lastName,
            },
        };
        yield (user_services_1.userServices === null || user_services_1.userServices === void 0 ? void 0 : user_services_1.userServices.createUserServices(reqBody));
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: 'Users created successfully',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
const getUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_services_1.userServices.getUserServices();
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'Users retrieved successfully',
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_services_1.userServices.deleteUserServices(req);
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'Users deleted successfully',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
const getUserByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_services_1.userServices.getUserByIdServices(req);
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'Users retrieved successfully',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
const UserUpdateByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_services_1.userServices.updateUserServices(req);
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'Users update successfully',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    createUserController,
    getUserController,
    deleteUserController,
    getUserByIdController,
    UserUpdateByIdController,
};
