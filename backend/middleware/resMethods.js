module.exports = (_, res, next) => {
    res.success = (data, message) => {
        return res.json({ error: false, data, message });
    };
    res.error = (message) => {
        return res.json({ error: true, message });
    };
    next();
};
