const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.loginPage);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/", (req, res) => {
    res.redirect("/users");
});

module.exports = router;
