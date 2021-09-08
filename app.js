require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');
// const date = require(`${__dirname}/date.js`);

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Create a new mongoDB database with mongoose:
mongoose.connect(`mongodb+srv://basu_abhirup:${process.env.DB_PASS}@cluster0.m5s9h.mongodb.net/toDoListDB`);

// Create an Item collection to store default items:
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must specify a name of task to add it into the database."]
  }
});
const Item = mongoose.model('Item', itemSchema);

// Create 4 default items for the items collection:
const eat = new Item({name: "Eat"});
const sleep = new Item({name: "Sleep"});
const code = new Item({name: "Code"});
const repeat = new Item({name: "Repeat"});

const defaultItems = [eat, sleep, code, repeat];

// Create a List collection to stor different lists.
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
})

const List = mongoose.model('List', listSchema);

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
            res.redirect("/");
        	}
        })
      } else {
        res.render("list", { title: "To-Do List", items: items });
      }
  	}
  });

});

app.get("/:customName", (req, res) => {
  const listName = _.startCase(_.kebabCase(req.params.customName));
  List.findOne({name: listName}, (err, list) => {
    if (err) {
      console.log(err);
    } else {
      if (!list) {
        const newList = new List({
          name: listName,
          items: []
        })
        newList.save();
        setTimeout( () => res.redirect(`/${_.kebabCase(listName)}`), 5000);
      } else {
        res.render("list", {title: `${listName} List`, items: list.items});
      }
    }
  })
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About"});
});


// Handle 'POST' requests from client:
app.post("/", (req,res) => {
  const listName = req.body.list;
  const itemName = req.body.item;
  const item = new Item({name: itemName});

  if(listName === 'To-Do List') {
    item.save();
    res.redirect("/");
  } else {
    const name = listName.substring(0, listName.length - 5);
    List.findOne({name: name}, (err, list) => {
      if(!err) {
        list.items.push(item);
        list.save();
        res.redirect(`/${_.kebabCase(name)}`);
      }
    })
  }
})

app.post("/delete", (req,res) => {
  const itemID = req.body.itemID;
  const listName = req.body.list;

  if(listName === 'To-Do List') {
    Item.findByIdAndRemove(itemID, err => {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  } else {
    const name = listName.substring(0, listName.length - 5);
    List.findOneAndUpdate({name: name}, {$pull: {items: {_id: itemID}}}, (err, list) => {
      if(!err) {
        res.redirect(`/${_.kebabCase(name)}`);
      }
    })
  }
});

// Enable client to listen to the port:
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
})
