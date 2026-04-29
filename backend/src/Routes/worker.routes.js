const express = require("express");
const { getWorkers, getWorkerById, updateWorkerProfile } = require("../controller/worker.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

const router = express.Router();

router.get("/", getWorkers);
router.get("/:id", getWorkerById);
router.patch("/profile", authMiddleware, updateWorkerProfile);

module.exports = router;
