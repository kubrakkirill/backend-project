const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB)
.then(res =>{console.log('DB is connected')})
.catch(err => {console.log(err)});