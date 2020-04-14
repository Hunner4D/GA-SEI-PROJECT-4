const BASE_URL = "/api/yelp/";

function addLocation(obj) {
  console.log("hitting add location");
  return fetch(BASE_URL + "addlocation", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(obj),
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Add Location Failed! Check locationService path");
  });
}

export default {
  addLocation,
};
