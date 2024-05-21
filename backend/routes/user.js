const express = require("express");
const { Router } = require("express");
const userAuthController = require("../controllers/userAuthController");
const router = Router();

// login routes

router.post("/login", userAuthController.loginUser);

// signup routes

router.post("/signup", userAuthController.signUpUser);

module.exports = router;
