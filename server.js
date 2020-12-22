var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.POST || 3000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// table var

var tables = [];
var waitList = [];

/* putting the routes together 
first is the web pages*/

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get ("/make", function(req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get ("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get ("/api/waitlist", function(req, res) {
    return res.json(waitList);
});

app.get ("/api/tables", function(req, res) {
    return res.json(tables);
});

app.post ("/api/tables", function(req, res){
    var newReservation = req.body;
    if (tables.length > 4) {
        waitList.push(newReservation)
    } else {
    tables.push(newReservation);
    }
    res.json(newReservation)
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
