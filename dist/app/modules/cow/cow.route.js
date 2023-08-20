"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRouter = void 0;
const express_1 = __importDefault(require("express"));
const cow_controllers_1 = require("./cow.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cow_validations_1 = require("./cow.validations");
const router = express_1.default.Router();
router.post('/create-cows', (0, validateRequest_1.default)(cow_validations_1.createCowZodSchema), cow_controllers_1.cowControllers.createCowController);
router.patch('/cows/:id', (0, validateRequest_1.default)(cow_validations_1.updateCowZodSchema), cow_controllers_1.cowControllers.updateCowsController);
router.get('/cows', cow_controllers_1.cowControllers.getAllCowsController);
router.get('/cows/:id', cow_controllers_1.cowControllers.getSignleCowsController);
router.delete('/cows/:id', cow_controllers_1.cowControllers.deleteCowsController);
exports.cowRouter = router;
