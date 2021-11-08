var express = require("express");
var router = express.Router();

var carController = require("../controllers/carController");

router.get('/',carController.carList);
router.get("/cars", carController.carList);
router.post("/car/create", carController.carPost);
router.get("/car/:id", carController.carDetail);
router.post("/car/:id/delete", carController.carDelete);
router.post('/car/:id/order',carController.carOrder)


module.exports = router;
