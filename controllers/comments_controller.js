const Comment = require("../models/comment");
const Post = require("../models/post");


module.exports.create = async function(req,res){
    try{
        let foundPost = await Post.findById(req.body.post);

        if(foundPost){
            let createdComment = await Comment.create({
                comment :req.body.comment,
                post:req.body.post,
                user:req.user._id
            });
            foundPost.comments.push(createdComment);
            foundPost.save();
            res.redirect('/');
        }
        
    
        // if(createdComment){
        //     return res.redirect('back');
        // }
    }catch(err){
        console.log(err);
    }
    
}