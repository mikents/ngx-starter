const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/ngx-starter'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/ngx-starter/' }
    );
});


app.listen(process.env.PORT || 8000);