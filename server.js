const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/ngx-starter'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/ngx-starter/index.html'));
});


app.listen(process.env.PORT || 8000);