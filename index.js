const express = require('express');

const app = express();
const port = 3000;

//Use express router
app.use('/',require('./routes'));


app.listen(port,function(err){

    if(err){
        console.log(`Error in running the server : ${err}`);//interpolation
    }
    console.log(`server is running on port ${port}`);//interpolation
})