var Car = require("../models/car");
const { body, validationResult } = require("express-validator");

exports.carList = (req, res, next) => {
  Car.find({}, "carName")
    .sort({ carName: 1 })
    .exec((err, result) => {
      if (err) next(err);
      res.send(result);
    });
};

exports.carDetail = (req, res, next) => {
  console.log("mama");
  Car.findById(req.params.id).exec((err, result) => {
    if (err) next(err);
    if (result == undefined) {
      var err = new Error("Car not found.");
      err.status = 404;
      return next(err);
    }
    res.send(result);
  });
};

exports.carPost = [
  body("carName", "Car name required").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    console.log("hii");
    const errors = validationResult(req);

    const car = new Car({
      carName: req.body.carName,
      amount: req.body.amount,
      currency: req.body.currency,
    });

    if (!errors.isEmpty()) {
      res.send(errors.array());
    } else {
      Car.findOne({ carName: req.body.carName }).exec((err, result) => {
        if (err) res.send(err);

        if (result) {
          res.send("already exists");
        } else {
          car.save((err) => {
            if (err) res.send(err);
            res.send("success");
          });
        }
      });
    }
  },
];

exports.carDelete = (req, res) => {
  res.send("Not Implemented carDelete");
};
