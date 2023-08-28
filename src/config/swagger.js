import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import log from "../config/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupSwagger = (app) => {
  const swaggerDefinition = {
    info: {
      openapi: "3.0.0",
      title: "Livraria",
      version: "1.0.0",
    }
  };

  log.info([path.join(__dirname, "../routes/*.js")]);

  const swaggerOptions = {
    swaggerDefinition,
    apis: [path.join(__dirname, "../routes/*.js")]
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
};

export default setupSwagger;
