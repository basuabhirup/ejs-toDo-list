const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`);

const port = process.env.PORT || 3000;

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = ['Watch JavaScript Tutorial', 'Design a jewelery website'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const day = date.getTodayFull();
  res.render("list", {title: day, items: items});
});

app.get("/work", (req, res) => {
  res.render("list", {title: "Work List", items: workItems});
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About"});
});

app.post("/", (req,res) => {
  const item = req.body.item;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
})

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
})
