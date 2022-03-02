const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const twilioService = require("../services/twilioService");

// routes
router.post("/authenticate", authenticate);
router.post("/register", register);

function authenticate(req, res) {
  userService
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch((err) => console.error(err));
}

function register(req, res) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "Registration successful" }))
    .catch((err) => console.error(err));
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
