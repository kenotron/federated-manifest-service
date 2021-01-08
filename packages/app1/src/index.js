fetch("http://localhost:3001/m/app1")
  .then((res) => res.json())
  .then((manifest) => {
    window.__manifest__ = manifest;
    import("./bootstrap");
  });

// window.__manifest__ = {
//   app2: "http://localhost:3001/r/app2/v1.2.3/remoteEntry.js",
//   app3: "http://localhost:3001/r/app3/remoteEntry.js",
// };
