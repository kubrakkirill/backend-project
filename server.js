const express = require('express');
require('./config/mongoose');
const app = express();
const route = require('./config/route');

app.set('view engine', 'ejs');

app.use(route);

let PORT = 3000;
app.listen(PORT, () => console.log(`The Timeline is on ${PORT}`));