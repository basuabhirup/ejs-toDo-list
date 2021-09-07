const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const date = require(`${__dirname}/date.js`);

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Create a new mongoDB database with mongoose:
mongoose.connect('mongodb://localhost:27017/toDoListDB');

const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', itemSchema);

// Create 4 default items for the items collection:
const eat = new Item({name: "Eat"});
const sleep = new Item({name: "Sleep"});
const code = new Item({name: "Code"});
const repeat = new Item({name: "Repeat"});

const defaultItems = [eat, sleep, code, repeat];


// Handle 'GET' requests from client:
app.get("/", (req, res) => {
  // const day = date.getTodayFull();
  Item.find({}, function(err, items) {
  	if(err) {
  		console.log(err);
  	} else {
      if(items.length === 0) {
        // Add default items to the collection, if it's already empty:
        Item.insertMany(defaultItems, function(err){
         if (err) {
        		console.log(err);
        	} else {
        		console.log("Successfully saved the default items to toDoListDB.")
        	}
        })
        res.redirect("/");
      } else {
        res.render("list", { title: "To Do List", items: items });
      }
  	}
  });

});

app.get("/work", (req, res) => {
  res.render("list", {title: "Work List", items: workItems});
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About"});
});


// Handle 'POST' requests from client:
app.post("/", (req,res) => {
  const itemName = req.body.item;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    const item = new Item({name: itemName});
    item.save();
    res.redirect("/");
  }
})


// Enable client to listen to the port:
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
})
