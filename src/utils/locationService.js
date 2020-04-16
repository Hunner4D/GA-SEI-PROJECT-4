const BASE_URL = "/api/yelp/";

export function addLocation(query) {
  // console.log("hitting add location");
  return fetch(BASE_URL + "addlocation", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(query),
  }).then((res) => {
    // console.log("this is res from locationService", res);
    if (res.ok) return res.json();
    throw new Error(
      "Add Location Failed! Check locationService.addLocation path"
    );
  });
}

export function deleteLocation(query) {
  // console.log("hitting add location");
  return fetch(BASE_URL + "deletelocation", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(query),
  }).then((res) => {
    // console.log("this is res from locationService", res);
    if (res.ok) return res.json();
    throw new Error(
      "Add Location Failed! Check locationService.deleteLocation path"
    );
  });
}

// grabs all selected locations in form of alias
export async function allLocations(query) {
  const res = await fetch(BASE_URL + "getsavedlocations", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(query),
  });
  // console.log("res status in yelpService: ", res);
  if (res.ok) return res.json();
  // Probably a duplicate email
  throw new Error("Invalid request to yelp!");
}
