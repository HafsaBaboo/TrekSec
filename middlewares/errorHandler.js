//check conditions
//1) NOT FOUND

const notFound = (req, res, next) => {
    const error = new Error(`Not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//error handler for our APIs

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err?.message,
        //stack: err?.stack,
    });

};

module.exports = {errorHandler, notFound};

//now we go to index.js and we have to keep in mind that we have to pass the middleware after the "authRoute"