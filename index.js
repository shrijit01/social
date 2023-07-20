const express = require('express');

const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//extract style and script from sub page into the layouts
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

//access assets
app.use(express.static('./assets'));
//Use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);//interpolation
    }
    console.log(`server is running on port ${port}`);//interpolation
})