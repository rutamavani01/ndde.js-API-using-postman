const express = require('express');
const app = express();
const port = 9000;

const db = require('./config/db');

app.use(express.urlencoded());

app.use('/',require('./routes/indexRoutes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`port is responding :- ${port}`);
})