const express = require('express');
require('./config/mongoose');
const app = express();
const route = require('./config/route');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(route);

let PORT = 2000;
app.listen(PORT, () => console.log(`The Timeline is on ${PORT}`));