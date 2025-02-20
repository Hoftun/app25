//Enums for log levels
let level_id = 0;
export const LOGG_LEVELS = {
  VERBOSE: ++level_id,
  IMPORTANT: ++level_id,
  ALWAYS: ++level_id,
};

let currentGlobalLogLevel = LOGG_LEVELS.VERBOSE;

let logInstance = null;

const log = function (loggLevel)  {

  currentGlobalLogLevel = loggLevel;
  if (logInstance == null) {
    logInstance = baseLoggFunction
  }
  return  logInstance;

  
}

const baseLoggFunction = (req, res, next) => {
  logVerbose(req, res),
  logImportant(req, res),
  logAlways(req, res),
  next();
}

const logVerbose = (req, res, next) =>{
  if (LOGG_LEVELS.VERBOSE == currentGlobalLogLevel) {
    printLog(req, res);
  }
}
const logImportant = (req, res, next) =>{
  if (LOGG_LEVELS.IMPORTANT == currentGlobalLogLevel) {
      printLog(req, res);
  }
}

const logAlways = (req, res, next) =>{
  if (LOGG_LEVELS.ALWAYS == currentGlobalLogLevel) {
    printLog(req, res);
  }
}

const printLog = (req, res) => {
  console.log(`${Date.now()}|${req.method}|${req.url}`);
}



export default log;

