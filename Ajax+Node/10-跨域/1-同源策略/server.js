let express = require('express');
var bodyParser = require('body-parser')

let app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.get('/home', function(req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + '/index.html');
});
app.get('/data', function(req, res) {
    res.send('用戶數據');
});

app.listen(4000, function() {
    console.log('server is running...');
});