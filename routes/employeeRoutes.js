const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employeeController");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", employeeController.index);
router.get("/detail/:id", employeeController.detail);
router.get("/create", employeeController.create);
router.post("/create", uploadMiddleware, employeeController.store);
router.get("/edit/:id", employeeController.edit);
router.post("/edit/:id", uploadMiddleware, employeeController.update);
router.get("/delete/:id", employeeController.delete);

module.exports = router;
