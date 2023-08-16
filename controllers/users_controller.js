const User = require('../models/user');

module.exports.profile =async function(req,res){
    try{
        if(req.isAuthenticated()){
            let foundUser = await User.findById(req.params.id);
            return res.render('user_profile',{
                tittle:"profile",
                profile_user:foundUser
            });
        }
        return res.redirect('/users/sign-in');
    }catch(err){
        console.log("Error",err);
        return;
    }
    
}

module.exports.update = async function(req,res){
    try{
        if(req.user.id == req.params.id){
            let updatedUser = await User.findByIdAndUpdate(req.params.id,req.body);
            // if()

            req.flash('success','User updated Successfully');
            return res.redirect('/');
        }else{
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}



//RENDERED THE SIGN UP PAGE
module.exports.signUp = function(req,res){
    try{
        if(req.isAuthenticated()){
            return res.redirect('/users/profile');
        }

        return res.render("user_sign_up",{
            tittle:"Social || Sign Up"
        });

    }catch(err){
        console.log('Error',err);
        return;
    }
}


//RENDERED THE SIGNN IN PAGE
module.exports.signIn = function(req,res){
    try{
        if(req.isAuthenticated()){
            return res.redirect('/users/profile');
        }
        

        return res.render("user_sign_in",{
            tittle:"Social || Sign in"
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
}

/* GET THE SIGNUP DATA */
module.exports.create = async function(req,res){
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        let user = await User.findOne({
            email:req.body.email
        });
        
            if(!user){
                let createdUser =  await User.create(req.body)
                    console.log('createdUser',createdUser);
                    req.flash('success','Sign up successfully');
                    return res.redirect('/users/sign-in');
            }
            return res.redirect('back');

    }catch(err){
        console.log(err,"error in creating user ");
    }

}


/* SIGN IN AND CREATE A SESSION FOR THE USER */
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    //TODO later
    return res.redirect('/');
}

/* DESTROYED THE SESSION FROM SESSION COOKIE AND LOGGED OUT THE USER  */
module.exports.destroySession = function(req,res){
    try{

        req.logout(function(err) {
            if (err) { return next(err); }
            req.flash('success','You have Logged out');
            res.redirect('/');
        });

    }catch(err){
        console.log('Error',err);
        return;
    }
}