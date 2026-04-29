const express = require("express");
const { getPGs, getPGById } = require("../controller/pg.controller");

const router = express.Router();

router.get("/", getPGs);
router.get("/:id", getPGById);

module.exports = router;
