import express, { Request, Response, NextFunction } from 'express';
import cookies from "cookie-parser";
import upload from 'express-fileupload';
import cors from "cors";
import bodyParser from 'body-parser';
import { config } from "dotenv";
import connect from './utils/db-connection';
import indexRouter from "./routes/index";

connect();
config();

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cookies());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.ORIGIN!],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
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