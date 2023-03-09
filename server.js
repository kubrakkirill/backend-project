const express = require('express');
require('./config/mongoose');
const app = express();

let PORT = 3000;
app.listen(PORT, () => console.log(`The Timeline is on ${PORT}`));