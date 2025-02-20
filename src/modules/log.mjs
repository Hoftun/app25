//Enums for log levels
let level_id = 0;
export const LOGG_LEVELS = {
  VERBOSE: ++level_id,
  IMPORTANT: ++level_id,
  ALWAYS: ++level_id,
};

let currentGlobalLogLevel = LOGG_LEVELS.VERBOSE;

const log = function (loggLevel)  {




  return 
  
}

const logVerbose = (req, res, next) =>{
  if (LOGG_LEVELS.VERBOSE == currentGlobalLogLevel) {
    printLog(req, res);
  }
  next();
}
const logImportant = (req, res, next) =>{
  if (LOGG_LEVELS.IMPORTANT == currentGlobalLogLevel) {
      printLog(req, res);
  }
  next();
}

const logAlways = (req, res, next) =>{
  if (LOGG_LEVELS.ALWAYS == currentGlobalLogLevel) {
    printLog(req, res);
  }
  next();
}

const printLog = (req, res) => {
  console.log(`${Date.now()}|${req.method}|${req.url}`);
}



export default log;

