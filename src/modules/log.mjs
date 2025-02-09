const log = function (req, res, next) {
    console.log(`${Date.now()}|${req.method}|${req.url}`);
    next();
    
};


export default log;