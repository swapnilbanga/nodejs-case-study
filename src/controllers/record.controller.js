const { mongoose } = require("../config/config");
const { Record } = require("../models");
const asyncHandler = require("../utilities/asyncHandler");
const { isValidDate } = require("../utilities/helpers");

const queryObject = asyncHandler(async (req, res, next) => {
  const { startDate, endDate, minCount, maxCount } = req.body;

  // normally I would add exception types and validators
  if (!startDate || !endDate || !minCount || !maxCount) {
    return res.status(422).send({
      records: [],
      code: "1",
      msg: "One or more inputs missing",
    });
  }

  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);

  // if it's not a JSON payload, good chance we recieve these as a string
  const formattedMinCount = parseInt(minCount);
  const formattedMaxCount = parseInt(maxCount);

  let errorMessage = null;

  if (
    !Number.isInteger(formattedMaxCount) ||
    !Number.isInteger(formattedMinCount)
  ) {
    errorMessage = "Min and max should be valid numbers";
  }

  if (!isValidDate(formattedStartDate) || !isValidDate(formattedEndDate)) {
    errorMessage = "One or both of your dates are invalid";
  }

  if (formattedStartDate > new Date() || formattedEndDate > new Date()) {
    errorMessage = "Dates can't be in the future";
  }

  if (formattedStartDate > formattedEndDate) {
    errorMessage = "Start date can't be after end date";
  }

  if (formattedMinCount > formattedMaxCount) {
    errorMessage = "Min count should be less than max count";
  }

  if (errorMessage) {
    return res.status(422).send({
      records: [],
      code: "1",
      msg: errorMessage,
    });
  }

  // I could use a service but since we only have one endpoint...
  const records = await Record.aggregate([
    {
      $match: {
        createdAt: {
          $gte: formattedStartDate,
          $lt: formattedEndDate,
        },
      },
    },
    {
      $addFields: {
        totalCount: {
          $sum: "$counts",
        },
      },
    },
    {
      $match: {
        totalCount: {
          $gte: formattedMinCount,
          $lt: formattedMaxCount,
        },
      },
    },
  ]).project({ key: 1, createdAt: 1, totalCount: 1, _id: 0 }); // not sending _id in response

  return res.status(200).send({
    records: records,
    code: "0",
    msg: "Success",
  });
});

module.exports = {
  queryObject,
};
