"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validations_1 = require("./user.validations");
const router = express_1.default.Router();
router.post('/create-user', (0, validateRequest_1.default)(user_validations_1.UserZodSchema), user_controllers_1.userController.createUserController);
router.get('/users', user_controllers_1.userController.getUserController);
router.delete('/users/:id', user_controllers_1.userController.deleteUserController);
router.get('/users/:id', user_controllers_1.userController.getUserByIdController);
router.patch('/users/:id', (0, validateRequest_1.default)(user_validations_1.UserUpdateZodSchema), user_controllers_1.userController.UserUpdateByIdController);
exports.userRouter = router;
