const Post = require("../models/post");

module.exports.create = async function(req,res){
    try{
        // return res.end('Post Controller');
        let createdPost = await Post.create({
            content : req.body.content,
            user : req.user._id
        })

        if(createdPost){
            return res.redirect('back');
        }
    }catch(e){
        console.log(Error);
    }
}