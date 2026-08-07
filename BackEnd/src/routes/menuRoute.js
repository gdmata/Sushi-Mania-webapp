const express = require("express");
const { getMenuItems } = require("../controllers/menuController.js");
const router = express.Router();

router.get("/menu", getMenuItems);

module.exports = router;
