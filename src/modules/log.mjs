//Enums for log levels
let level_id = 0;
export const LOGG_LEVELS = {
  VERBOSE: ++level_id,
  IMPORTANT: ++level_id,
  ALWAYS: ++level_id,
};

let currentGlobalLogLevel = LOGG_LEVELS.VERBOSE;

const log = function (loggLevel)  {

  return function (req, res, next) {
    if (loggLevel >= currentGlobalLogLevel) {
      console.log(`${Date.now()}|${req.method}|${req.url}`);
    }
    next();
  }
  
};


export default log;

