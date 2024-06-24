import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "express-async-errors";
import { routes } from "./routes";
import { errorHandler } from "./http/middlewares/error-handler";
import { notFound } from "./http/middlewares/not-found";

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);

app.use(notFound);
app.use(errorHandler);
