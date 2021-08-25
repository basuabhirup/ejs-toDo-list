const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

let items = ['Buy Food', 'Cook Food', 'Eat Food'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  let today = new Date();
  let day = today.toLocaleDateString('en-US', options);
  res.render("list", {day: day, items: items});
});

app.post("/", (req,res) => {
  let item = req.body.item;
  items.push(item);
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
})
