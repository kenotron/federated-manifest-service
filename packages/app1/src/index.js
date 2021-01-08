import querystring from "querystring";

const search = querystring.parse(location.search.slice(1));
let manifestUrl = "http://localhost:3001/m/app1";
if (search.ring) {
  manifestUrl = `${manifestUrl}/${search.ring}`;
}

fetch(manifestUrl)
  .then((res) => res.json())
  .then((manifest) => {
    window.__manifest__ = manifest;
    import("./bootstrap");
  });
