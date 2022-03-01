const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const twilioService = require("../services/twilioService");

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "Registration successful" }))
    .catch(next);
}

// twilio
router.post("/getOTP", getOTP);
router.post("/verifyOTP", verifyOTP);

function getOTP(req, res) {
  twilioService
    .sendOTP(req.body.phone)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.error(err));
}

function verifyOTP(req, res) {
  twilioService
    .verifyOTP(req.body.phone, req.body.otp)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.error(err));
}

module.exports = router;
