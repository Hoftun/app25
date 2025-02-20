//Enums for log levels
let level_id = 0;
export const LOGG_LEVELS = {
  VERBOSE: ++level_id,
  IMPORTANT: ++level_id,
  ALWAYS: ++level_id,
};

let currentGlobalLogLevel = LOGG_LEVELS.VERBOSE;

let logInstance = (req, res, next) => {
  logVerbose(req, res),
  logImportant(req, res),
  logAlways(req, res),
  next();
};

const log = function (loggLevel)  {
  currentGlobalLogLevel = loggLevel;
  return  logInstance;
}

const colorize =  (text) => {
  const colors = {
    red: '\x1b[1;31m',
    green: '\x1b[1;32m',
    yellow: '\x1b[1;33m',
  }
  const methods = {
    GET: colors.green,
    POST: colors.red,
    PUT: colors.red,
    PATCH: colors.yellow,
  }

return`"${methods[text]}}${text}..`
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
  console.log(`${Date.now()}|${colorize(req.method)}|${req.url}`);
}



export default log;

