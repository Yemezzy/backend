"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredinput = exports.schema = void 0;
const zod_1 = require("zod");
const schema = zod_1.z.object({
    firstname: zod_1.z.string().trim().min(1),
    lastname: zod_1.z.string().trim().min(1),
    username: zod_1.z.string().trim().min(1),
    email: zod_1.z.string().trim().min(1),
    password: zod_1.z.string().trim().min(1),
    confirm_password: zod_1.z.string().trim().min(1)
});
exports.schema = schema;
const requiredinput = schema.required({
    firstname: true,
    lastname: true,
    username: true,
    email: true,
    password: true,
    confirm_password: true
});
exports.requiredinput = requiredinput;
