module.exports.profile = function(req,res){
    return res.render('user_profile',{
        tittle:"profile"
    });
}

//RENDERED THE SIGN UP PAGE
module.exports.signUp = function(req,res){
    return res.render("user_sign_up",{
        tittle:"Social || Sign Up"
    });

}


//RENDERED THE SIGNN IN PAGE
module.exports.signIp = function(req,res){
    return res.render("user_sign_in",{
        tittle:"Social || Sign in"
    });

}