const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
// const axiosYelp = require("./axiosYelp");
const YELPSECRET = process.env.YELP_SECRET;
const yelp = require("yelp-fusion");

module.exports = {
  signup,
  login,
  getYelp,
};

async function signup(req, res) {
  const user = new User(req.body);
  console.log("hello");
  try {
    await user.save();
    // creating JWT after user is saved
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/////////////////////////////////////////////////////////////

async function getYelp(req, res) {
  console.log("hitting function");
  // Place holder for Yelp Fusion's API Key. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  const apiKey = YELPSECRET;
  const searchRequest = {
    term: "Four Barrel Coffee",
    location: "san francisco, ca",
  };
  const client = yelp.client(apiKey);
  client
    .search(searchRequest)
    .then((response) => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
    })
    .catch((e) => {
      console.log(e);
    });
}

/////////////////////////////////////////////////////////////

// async function getYelp(req, res) {
//   try {
//     const response = await axiosYelp.get("/businesses/search", {
//       params: {
//         term: "food",
//         // latitude: this.state.coords.lat,
//         // longitude: this.state.coords.long,
//         location: "san francisco, ca",
//         key: YELPSECRET,
//       },
//     });
//     res.json(response);
//   } catch (err) {
//     return res.status(401).json(err);
//   }
// }

/*----- Helper Functions -----*/

function createJWT(user) {
  // returns payload
  return jwt.sign(
    { user }, // data payload
    SECRET, // assigns secret verfication
    { expiresIn: "24h" }
  );
}
