const express = require('express');
const http = require('http');
const path = require('path');
const reload = require('reload');
const bodyParser = require('body-parser');
const logger = require('morgan');
const port = 3000;
const app = express();

app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json()); // Parses json, multi-part (file), url-encoded

const noStoreStatic = {
    etag: false,
    maxAge: 0,
    setHeaders: function (res) {
        res.setHeader('Cache-Control', 'no-store');
    }
};

app.use('/public', express.static('public', noStoreStatic));
app.use('/pages', express.static('pages', noStoreStatic));


app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// app.use('/test', express.static('test'));
// app.get('/*', function (req, res) {
//     res.sendFile('test.html', { root: __dirname });
// });
// app.get('/', function (req, res) {
//     res.sendFile('test.html', { root: __dirname });
// });



const server = http.createServer(app);

// server.listen(app.get('port'), function () {
//     console.log(
//         'Web server listening on port http://localhost:' + app.get('port')
//     );
// });

// Reload code here
reload(app)
  .then(function (reloadReturned) {
    // reloadReturned is documented in the returns API in the README

    // Reload started, start web server
    server.listen(app.get('port'), function () {
      console.log(
        'Web server listening on port http://localhost:' + app.get('port')
      );
    });
  })
  .catch(function (err) {
    console.error(
      'Reload could not start, could not start server/sample app',
      err
    );
  });
