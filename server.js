import app from "./src/app.js";
import log  from "./src/config/logger.js";
import "dotenv/config.js";


const port = process.env.PORT || 3000;


app.listen(port, () => {
  log.info(`Servidor escutando em http://localhost:${port}`);
});