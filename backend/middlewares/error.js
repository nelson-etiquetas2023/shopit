import ErrorHandler from '../utils/errorHandler.js'

function errorMiddleware(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    
    // si estoy en desarollo.
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }

    //si estoy en produccion.
    if (process.env.NODE_ENV === 'PRODUCTION' ) {

        let error = { ...err };
        error.message = err.message;

        //wrong Mongoose object ID error.
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400) 
        }

        //Handling Mongoose validation Error.
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });



    }



    
}

export default errorMiddleware;

