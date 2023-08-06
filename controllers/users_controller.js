const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.isAuthenticated()){
        return res.render('user_profile',{
            tittle:"profile"
        });
    }
    return res.redirect('/users/sign-in');
}

//RENDERED THE SIGN UP PAGE
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render("user_sign_up",{
        tittle:"Social || Sign Up"
    });

}


//RENDERED THE SIGNN IN PAGE
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render("user_sign_in",{
        tittle:"Social || Sign in"
    });
}

/* GET THE SIGNUP DATA */
module.exports.create = async function(req,res){
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        let user = await User.findOne({
            email:req.body.email
        })
        

            if(!user){
                let createdUser =  await User.create(req.body)
                // .then(function(err,createdUser){
                //     if(err){
                //         console.log('error in creating While sign up',err);
                //         return;
                //     }
                    console.log('createdUser',createdUser);
                    return res.redirect('/users/sign-in');
                // })
            }
            return res.redirect('back');

    }catch(err){
        console.log(err,"error in creating user ");
    }

}


/* SIGN IN AND CREATE A SESSION FOR THE USER */
module.exports.createSession = function(req,res){
    //TODO later
    return res.redirect('/');
}

/* DESTROYED THE SESSION FROM SESSION COOKIE AND LOGGED OUT THE USER  */
module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}