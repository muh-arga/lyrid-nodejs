const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", userController.index);
router.get("/detail/:id", userController.detail);
router.get("/create", userController.create);
router.post("/create", userController.store);
router.get("/edit/:id", userController.edit);
router.post("/edit/:id", userController.update);
router.get("/delete/:id", userController.delete);

module.exports = router;
