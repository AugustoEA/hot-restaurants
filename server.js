var express = require("express");
var path = require("path");
var bodyParser = require("body-parser")

var app = express();
var PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var data = [
    {
        reservation: [],
        waitingList: []
    }
];

var visitorCount = 0;
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/api/home", function (req, res) {
    res.json(data.reservations)
});

app.get("/api/waitlist", function (req, res) {
    res.json(data.waitingList)
});

app.get("/api", function (req, res) {
    res.json(data);
});

app.get("/api/clear", function (req, res) {
    data.reservations.length = 0;
    data.waitingList.length = 0;
    res.json(data);
});


app.get("/api/visitors", function (req, res) {
    res.json(visitorCount);
});


app.post("/api/new", function(req, res){
    var tableData = req.body;
   
    console.log(tableData)
    data.push(tableData)
    res.json(tableData);
});


app.listen(PORT, function () {
    console.log("listening on PORT" + PORT)
});