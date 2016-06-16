var express = require('express');
var app = express();
var hbs = require("hbs");
var gtin = require('gtin-generator');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.get('/api/getGTIN', function(request, response) {

    var count = request.query.count && parseInt(request.query.count);
    var data = {
        gtin: []
    };
    if(count) {
        var int = setInterval( function () {
            data.gtin.push(gtin.getGTIN());
            count--;
            if(!count) {
                clearInterval(int);
                response.json(data);
            }
        }, 10);
    } else {
        data.gtin = gtin.getGTIN();
        response.json(data);
    }
});

app.get('/', function(request, response) {
    const data = {
        gtin: gtin.getGTIN()
    };
    response.render('index', data);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
