const User = require('../models/user');

module.exports.profile =async function(req,res){
    if(req.isAuthenticated()){
        let foundUser = await User.findById(req.params.id);
        return res.render('user_profile',{
            tittle:"profile",
            profile_user:foundUser
        });
    }
    return res.redirect('/users/sign-in');
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        let updatedUser = await User.findByIdAndUpdate(req.params.id,req.body);
        console.log(updatedUser);
        return res.status(401).send('Unauthorized');
    }else{
        return res.status(401).send('Unauthorized');
    }
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
                    console.log('createdUser',createdUser);
                    return res.redirect('/users/sign-in');
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