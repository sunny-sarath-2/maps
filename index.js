var express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.get("/submit", (req, res) => {
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./hello.py", 
    req.query.lat, 
    req.query.lng] );
    process.stdout.on('data', function(data) { 
        res.send(data.toString());//.toString() 
    } )
// res.send({check:'check'})    
});

var port = 3000;
app.listen(port, () => console.log("running on port ", port));