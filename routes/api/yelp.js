const express = require("express");
const router = express.Router();
const yelpCtrl = require("../../controllers/yelp");

/*---------- Public Routes ----------*/
router.post("/get", yelpCtrl.getYelp);
router.post("/getspecific", yelpCtrl.getYelpSpecific);
router.post("/addlocation", yelpCtrl.addLocation);
router.post("/getsavedlocations", yelpCtrl.getLocations);

/*---------- Protected Routes ----------*/

module.exports = router;
