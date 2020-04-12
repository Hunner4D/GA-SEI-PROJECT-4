const express = require("express");
const router = express.Router();
const yelpCtrl = require("../../controllers/yelp");

/*---------- Public Routes ----------*/
router.post("/get", yelpCtrl.getYelp);

/*---------- Protected Routes ----------*/

module.exports = router;
