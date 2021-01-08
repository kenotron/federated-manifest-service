const express = require("express");
const path = require("path");
const app = express();

app.set('view engine', 'pug')

const manifest = {
  app2: "v1.2.3",
  app3: "v1.0.0",
};

app.get("/r/:remote/:file", (req, res) => {
  const { remote, file } = req.params;
  res.sendFile(path.join(__dirname, `../cdn/${remote}/${manifest[remote]}/${file}`));
});

app.get("/admin/*", (req, res) => {
  res.render('admin/index')
})

app.listen(3001, () => {
  console.log("manifest service http://localhost:3001");
});
