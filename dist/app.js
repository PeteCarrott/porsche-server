"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userRouter_1 = require("./router/userRouter");
const app = express();
const PORT = 5000;
app.get("/", (req, res) => {
    res.send("Hello world!aaa");
});
app.use("/user", userRouter_1.default);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//# sourceMappingURL=app.js.map