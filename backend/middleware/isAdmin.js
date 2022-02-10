module.exports = (req, res, next) => {
    if (req.query.pwd && req.query.pwd == process.env.TEST_PASS) return next(); // TODO : change this
    res.error("not authorized");
};
