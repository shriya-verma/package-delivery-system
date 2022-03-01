const express = require("express");
const router = express.Router();
const parcelService = require("../services/parcelService");

// routes
router.post("/cost-estimate", costEstimate);
router.post("/verify-coupon", verifyCoupon);
router.post("/save-parcel-data", saveParcelData);

function costEstimate(req, res, next) {
  parcelService
    .costEstimate(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
}

function verifyCoupon(req, res, next) {
  parcelService
    .verifyCoupon(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
}

function saveParcelData(req, res, next) {
  parcelService
    .saveParcelData(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
}

module.exports = router;
