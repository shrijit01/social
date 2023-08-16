
const Post = require('../models/post');
const User = require('../models/user');



/* POPULATE THE USER OF EACH POST  */
module.exports.home = async function(req,res){
    try{
        let foundPost = await Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path:'user'
        }
    })
    .exec();
    let foundUser = await User.find({})
    return res.render('home',{
        tittle:"Home",
        foundPost:foundPost,
        all_users:foundUser
    });
    }catch(err){
        console.log("Error",err);
        return;
    }
}