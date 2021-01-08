const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

let manifest = {
  app1: {
    dogfood: {
      app2: "v1.2.4",
      app3: "v1.0.0",
    },
    production: {
      app2: "v1.2.3",
      app3: "v1.0.0",
    },
  },
};

app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/r/:remote/:file", (req, res) => {
  const { remote, file } = req.params;
  res.sendFile(path.join(__dirname, `../cdn/${remote}/${manifest[remote]}/${file}`));
});

app.get("/r/:remote/:version/:file", (req, res) => {
  const { remote, version, file } = req.params;
  res.sendFile(path.join(__dirname, `../cdn/${remote}/${version}/${file}`));
});

app.get("/m/:app/:ring?", (req, res) => {
  const ring = req.params.ring || "dogfood";
  const app = req.params.app;

  const expandedManifest = {};
  for (const [remote, version] of Object.entries(manifest[app][ring])) {
    expandedManifest[remote] = `http://localhost:3001/r/${remote}/${version}/remoteEntry.js`;
  }

  res.json(expandedManifest);
});

app.get("/admin", (req, res) => {
  res.render("admin/index", { manifest: JSON.stringify(manifest, null, 2) });
});

app.post(
  "/admin/manifest",
  express.urlencoded({
    extended: true,
  }),
  (req, res) => {
    manifest = JSON.parse(req.body.manifest);
    res.redirect("/admin");
  }
);

app.listen(3001, () => {
  console.log("manifest service http://localhost:3001");
});
