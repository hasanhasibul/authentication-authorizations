"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = require("../../errors/handleValidationError");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const config_1 = __importDefault(require("../../config"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifyError = (0, handleValidationError_1.handleValidationError)(error);
        statusCode = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.statusCode;
        message = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.message;
        errorMessages = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.errorMessages;
    }
    else if (error.name === 'ZodError') {
        const simplifyZodError = (0, handleZodError_1.default)(error);
        statusCode = simplifyZodError === null || simplifyZodError === void 0 ? void 0 : simplifyZodError.statusCode;
        message = simplifyZodError === null || simplifyZodError === void 0 ? void 0 : simplifyZodError.message;
        errorMessages = simplifyZodError === null || simplifyZodError === void 0 ? void 0 : simplifyZodError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.send({
        statusCode,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
