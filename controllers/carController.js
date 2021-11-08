var Car = require("../models/car");
const { body, validationResult } = require("express-validator");
var razorpay = require('razorpay');

const razorpayInstance = new razorpay({
  
  // Replace with your key_id
  key_id: 'rzp_test_APipHlpshTxbfM',

  // Replace with your key_secret
  key_secret: 'gflnM0HgbQ89TiCzuPVDZ9VX'
});

exports.carList = (req, res, next) => {
  Car.find({})
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

exports.carOrder = (req,res)=>{
  console.log('order received')
  const {amount,currency} = req.body;

  razorpayInstance.orders.create({amount,currency},(err,order)=>{
    if(!err) res.json(order);
    else res.send(err);
  })

}