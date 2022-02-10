const express = require("express");
const IndexController = require("../controllers/index");

const router = express.Router();

router.post("/contact", IndexController.contactSubmit);
router.get("/cow", IndexController.moo);
router.all("*", IndexController.notFound);

module.exports = router;
