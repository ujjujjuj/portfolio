const Submission = require("../models/Submission");

module.exports.viewSubmissions = async (_, res) => {
    const submissions = await Submission.find();
    return res.success(submissions);
};
