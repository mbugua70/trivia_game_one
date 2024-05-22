const express = require("express");
const { Router } = require("express");
const userAuthController = require("../controllers/userAuthController");
const router = Router();


// signup routes

router.post("/signup", userAuthController.signUpUser);

module.exports = router;
