"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpRoutes = void 0;
const express_1 = require("express");
const router_v1 = (0, express_1.Router)();
const setUpRoutes = (app) => {
    //router v1
    app.use("/api/v1", router_v1);
};
exports.setUpRoutes = setUpRoutes;
