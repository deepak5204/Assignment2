class AppError extends Error {
    constructor(message, statusCode) {
        super(message); //called parent class and that has message propery, it automatically set message propery

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError