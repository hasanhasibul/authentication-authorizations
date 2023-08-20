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
exports.cowControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const cow_services_1 = require("./cow.services");
const createCowController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cow_services_1.cowServices.createCowServices(req);
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: 'cow created successfully',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllCowsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cows = yield cow_services_1.cowServices.getAllCowServices(req);
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'cows retrived successfully',
            meta: cows.meta,
            data: cows === null || cows === void 0 ? void 0 : cows.response,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSignleCowsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cow = yield cow_services_1.cowServices.getSingleCowServices(req);
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'cows retrived successfully',
            data: cow,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateCowsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cow_services_1.cowServices.updateCowServices(req);
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'cows updated successfully',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteCowsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cow_services_1.cowServices.deleteCowServices(req);
        res.send({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'cows deleted successfully',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
exports.cowControllers = {
    createCowController,
    getAllCowsController,
    getSignleCowsController,
    deleteCowsController,
    updateCowsController,
};
