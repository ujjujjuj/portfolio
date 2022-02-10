const express = require("express");
const AdminController = require("../controllers/admin");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();
router.use(isAdmin);

router.get("/submissions", AdminController.viewSubmissions);

module.exports = router;
