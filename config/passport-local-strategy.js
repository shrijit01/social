/* REQUIRED PASSPORT */
const   passport = require('passport');

/* REQUIRED PASSPORT LOCAL STRATEGY */
const LocalStrategy = require('passport-local').Strategy;

/* REQUIRE USER FOR USING THERE DETAIL */
const User = require('../models/user');

/* USING THE LOCAL STRATEGY TO AUTHENTICATE USER USING PASSPORT */
passport.use(new LocalStrategy({// TELLING PASSPORT TO USE LOCAL STRATEGY
        usernameField:'email'//USER NAME FIELD
    },
    function(email,password,done){
        /* FIND THE USER AND ESTABLISH A IDENTITY */
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                /* THERE IS NO ERROR BUT USER IS NOT FOUND THATS WHY SECOND PARAM IS FALSE */
                return done(null,false)
            }

            return done(null,user);
        });
    }
));



/* SERIALIZING THE USER TO DECIDE WHICH KEY IS TO BE KEPT IN THE COOKIE */
passport.serializeUser(function(user,done){//SETTING USER ID TO THE COOKIE AND SERIALIZING THE USER
    done(null,user.id);
});



/* DESERIALIZING THE USER FROM THE KEY IN THE COOKIES */
passport.deserializeUser(function(id,done){//REMOVING  USER ID FROM THE COOKIE AND DESERIALIZING THE USER
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }
        return done(null,user);
    })
});

module.exports = passport;