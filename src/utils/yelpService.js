// url to api = "https://api.yelp.com/v3";
const BASE_URL = "/api/yelp/";

export async function routeToYelp(query) {
  //   console.log("hitting yelpService");
  const res = await fetch(BASE_URL + "get", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(query),
  });
  // console.log("res status in yelpService: ", res);
  if (res.ok) return res.json();
  // Probably a duplicate email
  throw new Error("Invalid request to yelp!");
}
