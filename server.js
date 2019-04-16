const compression = require('compression');
const express = require('express');
const app = express();

// Gzip
app.use(compression());

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {
   res.sendFile(__dirname + '/dist/index.html');

});

app.listen(process.env.PORT || 4200);
