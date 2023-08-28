import { createLogger, format, transports } from "winston";
import chalk from "chalk";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ message, timestamp, level }) => {
      return trataLogInfo(message, timestamp, level);
    })
  ),
  transports: [new transports.Console()]
},
{
  level: "error",
  format: format.combine(
    format.timestamp(),
    format.printf(({ message, timestamp, level }) => {
      return trataLogError(message, timestamp, level);
    })
  ),
  transports: [new transports.Console()]
}
);

function trataLogInfo(message, timestamp, level){
  return `{${chalk.gray("message")}:${message}, ${chalk.blue("timestamp")}:${timestamp}, ${chalk.yellow("level")}:${level}}`;
}

function trataLogError(message, timestamp, level){
  return `{${chalk.red("message")}:${message}, ${chalk.red("timestamp")}:${timestamp}, ${chalk.red("level")}:${level}}`;
}

export default logger;
