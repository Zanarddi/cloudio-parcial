"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
// import dotenv from "dotenv"
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.HOST,
    port: parseInt(`${process.env.PORT}`),
    username: process.env.USER,
    password: process.env.PASS,
    database: process.env.NAME,
    synchronize: true,
    logging: false,
    entities: [],
    migrations: ["build/migration/*{.ts,.js}"],
    subscribers: []
});
