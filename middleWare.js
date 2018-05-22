const logger = (req, res, next) => {
    console.log("middleware logger is working");
    next();
}

module.exports = {
    logger: logger,
}