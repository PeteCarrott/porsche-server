"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userRouter = express.Router();
userRouter.get("/", (req, res) => {
    res.send("i.m router");
});
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map