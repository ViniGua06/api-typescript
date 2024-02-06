import Express from "express";
import Cors from "cors";
import bodyParser from "body-parser";

import { AppDataSource } from "./database/data-source";

import userRouter from "./routes/user.route";
import { tokenVerifyer } from "./middlewares/tokenVerifyer.middleware";

const app = Express();

const PORT = process.env.PORT || 2000;

app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);
app.use(tokenVerifyer);

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log("BD rodando e servidor rodando na porta" + PORT);
  });
});
