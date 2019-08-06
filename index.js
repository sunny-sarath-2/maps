var express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.get("/",(req,res)=>{
    res.render( "index.html",{data:"test"});
})

app.get("/submit", (req, res) => {
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./hello.py", 
    req.query.lat, 
    req.query.lng] );
    process.stdout.on('data', function(data) { 
    res.render( "index.html",{data:data.toString(),lat:req.query.lat,lng:req.query.lng});
        
        // res.send(data.toString());//.toString() 
    } )
// res.send({check:'check'})    
});

var port = 3000;
app.listen(port, () => console.log("running on port ", port));