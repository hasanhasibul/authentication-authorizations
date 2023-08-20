"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (errors) => {
    if (errors.name === 'ValidationError') {
        const allErrors = Object.values(errors.errors).map((error) => {
            return {
                path: error === null || error === void 0 ? void 0 : error.path,
                message: error === null || error === void 0 ? void 0 : error.message,
            };
        });
        const statusCode = 400;
        return {
            statusCode,
            message: 'Validation Error',
            errorMessages: allErrors,
        };
    }
};
exports.handleValidationError = handleValidationError;
