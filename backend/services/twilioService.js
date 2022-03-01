const accountSid = "AC2ffb67037ed746bd6d5e595b4379c882";
const authToken = "5efe3d2950e2a4944d4dbaa43fae4067";
const client = require("twilio")(accountSid, authToken);

function sendOTP(phoneNumber) {
  return new Promise((resolve, reject) => {
    client.verify
      .services("VA471bf302962343a31ae0330845a3fba3")
      .verifications.create({ to: phoneNumber, channel: "sms" })
      .then((verification) => {
        console.log(verification.status);
        resolve(verification);
      })
      .catch((err) => {
        console.log(err);
        resolve(err);
      });
  });
}

function verifyOTP(phoneNumber, otp) {
  return new Promise((resolve, reject) => {
    client.verify
      .services("VA471bf302962343a31ae0330845a3fba3")
      .verificationChecks.create({ to: phoneNumber, code: otp })
      .then((verification_check) => {
        console.log(verification_check.status);
        resolve(verification_check);
      })
      .catch((err) => {
        console.log(err);
        resolve(err);
      });
  });
}

module.exports = {
  sendOTP,
  verifyOTP,
};
