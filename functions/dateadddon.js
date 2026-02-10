const moment = require("moment");

const dateAdder = (Period) => {
  return moment().add(Period, "days").format("YYYY-MM-DD");
};

module.exports = dateAdder;
