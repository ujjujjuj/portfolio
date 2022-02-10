const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const resMethods = require("./middleware/resMethods");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(resMethods);

app.use("/admin", require("./routes/admin"));
app.use("/", require("./routes/index"));

mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/portfolio", () => {
    const serverPort = process.env.PORT || 3000;
    app.listen(serverPort, () => console.log(`Listening on port http://localhost:${serverPort}`));
});
