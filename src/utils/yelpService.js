// url to api = "https://api.yelp.com/v3";
const BASE_URL = "/api/yelp/";

export function routeToYelp() {
  console.log("hitting routeToYelp");
  return fetch(BASE_URL + "get", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(),
  }).then((res) => {
    console.log("this is res: ", res);
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error("Invalid request to yelp!");
  });
}
