// Import webhook handlers
const paystackWebhook = require("./webhooks/paystackWebhook");
const paymentwebookdetector = require("./webhooks/paymentwebookdetector");
const checkExpiryDates = require("./bootaction/booterone");
const bootAffExpiryDates = require("./bootaction/boottwo");

const paynaira = require("./webhooks/paynaira");
const paydollar = require("./webhooks/paydollar");
const multiPayment = require("./webhooks/multiPayment");

// Export Cloud Functions
exports.paystackWebhook = paystackWebhook;
exports.paymentwebookdetector = paymentwebookdetector;
exports.checkExpiryDates = checkExpiryDates;
exports.paynaira = paynaira;
exports.paydollar = paydollar;
exports.bootAffExpiryDates = bootAffExpiryDates;
exports.multiPayment = multiPayment;
