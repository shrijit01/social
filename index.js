const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
//CONNECTI TO THE DB
const db = require('./config/mongoose');

/************ USED FOR SESSION COOKIE *************/
/* REQUIRED EXPRESS SESSION */
const session = require('express-session');

/* REQUIRED PASSPORT  */
const passport = require('passport');

/* REQUIRED PASSPORT LOCAL STRATEGY */
const passportLocal = require('./config/passport-local-strategy');

/* FOR STORING SESSION COOKIE IF SERVER GOT RESTART SESSION COOKIE WILL NOT LOST  */
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

/* USING COOKIE PARSER TO READ DATA */
app.use(express.urlencoded())

/* SETTING UP THE COOKIE PARSER */
app.use(cookieParser());

/* SETTING UP THE EXPRESS LAYOUT MIDDLEWERE  */
app.use(expressLayouts);
//extract style and script from sub page into the layouts
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

//access assets
app.use(express.static('./assets'));


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

/*MONGOSTORE IS USED TO STORE THE SESSION COOKIE IN DB */
/* SETTING UP THE SESSION COOKIE IN CLIENT BROWSER */
app.use(session({
    name:'social',
    /* CHANGE THE SEC BEFORE DEPLOYMENT */
    secret:'blahsomething',
    saveUninitialized:false,//IF USER IS NOT LOGGED IN THAT CASE NO NEED TO STORE SESSION COOKIE 
    resave:false,//IF USER IS LOGGED IN IN THAT CASE WE DONT WANT TO CAHNGE THE SESSION COOKIE AGAIN AND AGAIN
    cookie:{
        maxAge:(100*60*100)
    },
    store :new MongoStore (
        {
            mongoUrl: 'mongodb://localhost/social-devlopment',
            autoRemove:'disable'

        },(function(err){
            console.log(err || "Connect mongodb setup ok");
        })
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
//Use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);//interpolation
    }
    console.log(`server is running on port ${port}`);//interpolation
})