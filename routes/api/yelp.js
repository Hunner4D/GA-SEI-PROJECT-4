const express = require("express");
const router = express.Router();
const yelpCtrl = require("../../controllers/yelp");

/*---------- Public Routes ----------*/
router.post("/get", yelpCtrl.getYelp);
router.post("/getspecific", yelpCtrl.getYelpSpecific);
router.post("/addlocation", yelpCtrl.addLocation);
router.post("/deletelocation", yelpCtrl.deleteLocation);
router.post("/getsavedlocations", yelpCtrl.getSavedLocations);

/*--------- Protected Routes ---------*/

module.exports = router;
