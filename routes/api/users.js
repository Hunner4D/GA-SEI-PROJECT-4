const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const usersCtrl = require("../../controllers/users");

/*---------- Public Routes ----------*/
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.post("/yelp", usersCtrl.getYelp);

/*---------- Protected Routes ----------*/

module.exports = router;
