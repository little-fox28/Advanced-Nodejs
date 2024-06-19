function Logger(req, res, next) {
    console.log(`Req method: ${req.method} ${req.originalUrl}`);
    next()
}

export default Logger;