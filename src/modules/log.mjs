const log = function (isEnabled)  {

  return function (req, res, next) {
    if (isEnabled) {
      console.log(`${Date.now()}|${req.method}|${req.url}`);
    }
  
  }
  // next();
};


export default log;

//en lett refactor som gir oss mulighet til å skru av all logging på en gang