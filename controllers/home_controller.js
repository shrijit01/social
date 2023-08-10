
const Post = require('../models/post');




module.exports.home = async function(req,res){
    let foundPost = await Post.find();
    return res.render('home',{
        tittle:"Home",
        foundPost:foundPost
    });
}