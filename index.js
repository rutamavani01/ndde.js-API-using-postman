const express = require('express');
const port = 9000;
const app = express();

app.use('/',require('./routes/indexRoutes'));

const db = require('./config/db');

app.use(express.urlencoded());

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`port is responding :- ${port}`);
})