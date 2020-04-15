const BASE_URL = "/api/yelp/";

export function addLocation(query) {
  console.log("hitting add location");
  return fetch(BASE_URL + "addlocation", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(query),
  }).then((res) => {
    console.log("this is res from locationService", res);
    if (res.ok) return res.json();
    throw new Error("Add Location Failed! Check locationService path");
  });
}
