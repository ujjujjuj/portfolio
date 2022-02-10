const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        message: String,
    },
    { versionKey: false }
);

module.exports = mongoose.model("Submission", submissionSchema);
