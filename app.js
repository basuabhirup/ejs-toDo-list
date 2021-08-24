const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  const daysInWord = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednessday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  }
  let today = new Date().getDay();
  let day = daysInWord[today];
  res.render("list", {day: day});
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
})
