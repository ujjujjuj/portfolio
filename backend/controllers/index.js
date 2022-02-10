const axios = require("axios");
const { exec } = require("child_process");
const Submission = require("../models/Submission");

module.exports.contactSubmit = async (req, res) => {
    if (
        !req.body.message ||
        !req.body["g-recaptcha-response"] ||
        !req.body.email ||
        !req.body.name
    ) {
        return res.error("Malformed body");
    }
    const axiosRes = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET,
            response: req.body["g-recaptcha-response"],
        }).toString()
    );
    if (!axiosRes.data.success) {
        res.error("reCAPTCHA failed");
    } else {
        const submission = new Submission({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
        try {
            await submission.save();
            res.success(null, "Form submitted successfully");
        } catch (e) {
            console.log(e);
            res.error("Database error");
        }
    }
};

module.exports.moo = (req, res) => {
    exec("fortune | cowsay", (err, stdout, stderr) => {
        if (err || stderr) {
            console.log(err);
            console.log(stderr);
            return res.error(`:( server error`);
        }
        return res.success(stdout);
    });
};

module.exports.notFound = (req, res) => {
    return res.error("route does not exist");
};
