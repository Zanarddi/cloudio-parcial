import {DataSource}  from "typeorm"
import dotenv from "dotenv"

dotenv.config()


export const AppDataSource = new DataSource({
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
})