import express, { Request, Response, NextFunction } from 'express';
import cookies from "cookie-parser";
import upload from 'express-fileupload';
import cors from "cors";
import bodyParser from 'body-parser';
import { config } from "dotenv";
import connect, {sequelize} from './utils/db-connection';
import indexRouter from "./routes/index";

import 'dotenv/config';
import { createAgent } from '@forestadmin/agent';
import { createSequelizeDataSource } from '@forestadmin/datasource-sequelize';

connect();
config();


const app = express();

createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET!,
    envSecret: process.env.FOREST_ENV_SECRET!,
    isProduction: process.env.NODE_ENV === 'production',
    typingsPath: './typings.ts',
    typingsMaxDepth: 5,

})
    .addDataSource(createSequelizeDataSource(sequelize))
    .mountOnExpress(app)
    .start();

const port = process.env.PORT ?? 4000;

app.use(cookies());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.ORIGIN!],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
}));


app.use('/', indexRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    return next(new Error('Invalid route'));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({ message: err.message || "an unknown error occurred" });
});


app.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
});