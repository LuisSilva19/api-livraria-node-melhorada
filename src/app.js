import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import log from "./config/logger.js";
import setupSwagger from "./config/swagger.js";
import cors from "cors";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

db.on("error", console.log.bind(console, "Erro de conexão"));

db.once("open", () => {
  log.info("conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());
app.use(cors());

routes(app);

setupSwagger(app);
app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;