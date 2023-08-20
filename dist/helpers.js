"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (req) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';
    const skip = (Number(page) - Number(1)) * Number(limit);
    const searchTerm = req.query.searchTerm;
    return { page, limit, skip, sortBy, sortOrder, searchTerm };
};
exports.paginationHelper = paginationHelper;
