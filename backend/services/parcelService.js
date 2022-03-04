const db = require("../config/db");

const COUPON_CODES = {
  GET50: 50,
};
let cost = 0;
function costEstimate(parcelData) {
  return new Promise((resolve, reject) => {
    try {
      // let cost = 0;
      let weight = parseInt(parcelData.weight);
      let area = parseInt(parcelData.length) * parseInt(parcelData.breadth);
      if (parcelData.type === "Same Day") {
        cost = weight * area * 2;
      } else if (parcelData.type === "Overnight") {
        cost = weight * area * 1.5;
      } else {
        cost = weight * area * 1;
      }
      resolve(cost);
    } catch (error) {
      reject(error);
    }
  });
}

function verifyCost({ paymentAmount, discount }) {
  console.log("Payment Amount" + paymentAmount);
  console.log("\n Cost" + cost);
  return new Promise((resolve, reject) => {
    try {
      if (paymentAmount + discount === cost) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function verifyCoupon(couponData) {
  return new Promise((resolve, reject) => {
    try {
      let coupon = couponData.coupon.toUpperCase();
      if (COUPON_CODES[coupon]) {
        resolve(COUPON_CODES[coupon]);
      } else {
        resolve(0);
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

async function saveParcelData(parcelData) {
  await db.Parcel.create(parcelData);
}

module.exports = {
  costEstimate,
  verifyCoupon,
  verifyCost,
  saveParcelData,
};
