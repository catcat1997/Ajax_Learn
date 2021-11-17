var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')

var app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.get('/server', function(req, res) {

    // 設置響應頭  這個*是Access-Control-Allow-Origin的value  
    // 這個響應頭是 設置允許跨域
    res.setHeader('Access-Control-Allow-Origin', '*');

    // 設置響應體
    res.send('Hello Ajax');
});

// express app.all 可接收任意類型的請求,就可以接收自定義 頭類型
app.all('/server', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 設置響應頭 允許全部頭類型(也就是充許自定義) 頭類型
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.send('post way response' + '</br>' + Object.keys(req.body));
});

app.all('/json-server', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 設置響應頭 允許全部頭類型(也就是充許自定義) 頭類型
    res.setHeader('Access-Control-Allow-Headers', '*');
    var data = { name: "json-server's response!" };
    var str = JSON.stringify(data);
    res.send(str);
});

app.all('/ie', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('hello ie- 1');
});

app.all('/delay', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        res.send('延時response');
    }, 3000);

});

app.all('/axios-server', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.body) {

        let a = JSON.stringify(req.body);
        return res.send(a);
    }
    res.send('axios-server response!');

});

app.all('/fetch-server', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    console.log(JSON.stringify(req.body));
    // res.send(JSON.stringify(req.body));
    res.send('fetch-server response!');

});

// jsonp-server
app.all('/jsonp-server', function(req, res) {
    // res.send('console.log("hello by jsonp")');
    const data = {
        name: 'peter from jsonp'
    }
    let strData = JSON.stringify(data);
    // handle()方法 傳去客戶端
    // res.end(`handle(${strData})`);
    res.end('handle(' + strData + ')');
});

// check-username
app.get('/check-username', function(req, res) {
    // res.send('console.log("hello by jsonp")');
    if (JSON.stringify(req.query) === '{"api":"handle"}') {
        const data = {
            exist: 1,
            msg: '用戶名已經存在!'
        }
        let strData = JSON.stringify(data);
        // handle()方法 傳去客戶端
        // res.end(`handle(${strData})`);
        res.end('handle(' + strData + ')');
    }

});

// cors
app.all('/cors', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.send('response from cors!');
})

app.listen(3000, function() {
    console.log('server is running...');
});