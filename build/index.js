"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`App is listening on port ${process.env.SERVER_PORT}`);
});
app.post("/create", (req, res) => {
    console.log(req);
    res.send("Testing your /create");
});
app.get("/list", (req, res) => {
    console.log(req);
    res.send("Testing your /list");
});
app.get("/list/:id", (req, res) => {
    console.log(req);
    res.send('You tried to access: ' + req.url);
});
app.get('*', function (req, res) {
    res.send('You tried to access: ' + req.url);
});
