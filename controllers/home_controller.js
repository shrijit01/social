
const Post = require('../models/post');



/* POPULATE THE USER OF EACH POST  */
module.exports.home = async function(req,res){
    let foundPost = await Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path:'user'
        }
    })
    .exec();
    return res.render('home',{
        tittle:"Home",
        foundPost:foundPost
    });
}