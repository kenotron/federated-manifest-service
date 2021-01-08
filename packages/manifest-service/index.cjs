const express = require("express");
const path = require("path");
const app = express();

let manifest = {
  app2: "v1.2.3",
  app3: "v1.0.0",
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/r/:remote/:file", (req, res) => {
  const { remote, file } = req.params;
  res.sendFile(path.join(__dirname, `../cdn/${remote}/${manifest[remote]}/${file}`));
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
