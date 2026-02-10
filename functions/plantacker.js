const dateAdder = require("./dateadddon");
const { v4: uuidv4 } = require("uuid");

const DocId = uuidv4();
function getSubscriptionType(amount) {
  let SubType;
  switch (amount) {
    case 160000:
      SubType = "Elpis Plan";
      break;
    case 240000:
      SubType = "Kodesh Elite";
      break;
    case 400000:
      SubType = "Dunamis Rahab";
      break;
    default:
      SubType = "Elpis Plan";
  }
  return SubType;
}

// This is for Signal Addon Purchase
function getSignalSubType(amount) {
  let SubType;
  switch (amount) {
    case 48000:
      SubType = "Kodesh";
      break;
    case 80000:
      SubType = "Dunamis";
      break;
    default:
      SubType = "Elpis";
  }
  return SubType;
}

// To Check Which Student Plan They Paid For and give them access automatically by update their SignalPlan and SignalStatus
function planCheckForSignalTag(amount) {
  let planNameSignal;
  switch (amount) {
    case 160000:
      planNameSignal = "Elpis";
      break;
    case 240000:
      planNameSignal = "Kodesh";
      break;
    case 400000:
      planNameSignal = "Dunamis";
      break;
    default:
      planNameSignal = `Elpis`;
  }
  return planNameSignal;
}
// To Check for Signal Expiry Date & Plan Subscription Date
function planCheckForSignalDate(amount) {
  let planSignalEx;
  switch (amount) {
    case 160000:
      planSignalEx = dateAdder(30).toString();
      break;
    case 240000:
      planSignalEx = dateAdder(42).toString();
      break;
    case 400000:
      planSignalEx = dateAdder(90).toString();
      break;
    default:
      planSignalEx = dateAdder(30).toString();
  }
  return planSignalEx;
}

function planTypeMessageTag(amount) {
  let planName;
  switch (amount) {
    case 128000:
      planName = "Elpis Plan/$80";
      break;
    case 208000:
      planName = "Kodesh/$130";
      break;
    case 368000:
      planName = "Dunamis Rahab/$230";
      break;
    default:
      planName = `Elpis Plan/${amountInNGN} ${currency}`;
  }
  return planName;
}

function planDetectorTagAffiliate(amount) {
  let planName;
  switch (amount) {
    case 128000:
      planName = "Elpis Plan/$80";
      break;
    case 208000:
      planName = "Kodesh/$130";
      break;
    case 368000:
      planName = "Dunamis Rahab/$230";
      break;
    default:
      planName = `Elpis Plan/${amountInNGN} ${currency}`;
  }
}

// You can also add more functions here if needed

// Cascader For All Naira

module.exports = {
  getSubscriptionType,
  getSignalSubType,
  planTypeMessageTag,
  planCheckForSignalTag,
  planCheckForSignalDate,
  DocId,
};
