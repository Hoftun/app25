import {text} from 'express';
import fs from 'node:fs/promises';

//Enums for log levels
let level_id = 0;
export const LOGG_LEVELS = {
  VERBOSE: ++level_id,
  IMPORTANT: ++level_id,
  ALWAYS: ++level_id,
};

let currentGlobalLogLevel = LOGG_LEVELS.VERBOSE;

let logInstance = async (req, res, next) => {
  await logVerbose(req, res),
  await logImportant(req, res),
  await logAlways(req, res),
  next();
};

const log = function (loggLevel)  {
  currentGlobalLogLevel = loggLevel;
  return  logInstance;
}

export const eventLogger = function (eventDescription, loggLevel = LOGG_LEVELS.VERBOSE) {

  if(loggLevel >= correntGlobalLogLevel) {

    console.log(`${Date.now()}|${eventDescription}`);
    savelog(`${Date.now()}|${eventDescription}`);
  }
  
}

const colorize =  (text) => {
  const colors = {
    red: '\x1b[1;31m',
    green: '\x1b[1;32m',
    yellow: '\x1b[1;33m',
    reset: '\x1b[0m',
  }
  const methods = {
    GET: colors.green,
    POST: colors.red,
    PUT: colors.red,
    PATCH: colors.yellow,
  }

return`"${methods[text]}}${text}${colors.reset}`
}



const logVerbose = async (req, res, next) =>{
  if (LOGG_LEVELS.VERBOSE == currentGlobalLogLevel) {
    await printLog(req, res);
  }
}
const logImportant = async (req, res, next) =>{
  if (LOGG_LEVELS.IMPORTANT == currentGlobalLogLevel) {
      await printLog(req, res);
  }
}

const logAlways = async (req, res, next) =>{
  if (LOGG_LEVELS.ALWAYS == currentGlobalLogLevel) {
   await printLog(req, res);
  }
}

const printLog = async (req, res) => {
  console.log(`${Date.now()}|${colorize(req.method)}|${req.url}`);
  await savelog(`${Date.now()}|${req.method}|${req.url}`);
}

const logFilePath = "src/logs/log.csv";

const ensureLogFileExists = async () => {
  try {
    await fs.mkdir("src/logs", { recursive: true });
   
    try {
      await fs.access(logFilePath);
    } catch (err) {
      await fs.writeFile(logFilePath, "");  
    }
  } catch (err) {
    console.error("Error ensuring log file:", err);
  }
}

const savelog = async (text) => {
  await ensureLogFileExists();  
  text += "\n";
  await fs.appendFile(logFilePath, text);
}


export default log;

