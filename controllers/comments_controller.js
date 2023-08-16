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
        
    }catch(err){
        console.log("Error",err);
    }
    
}


module.exports.destroy = async function(req,res){

    try{
        let foundComment = await Comment.findById(req.params.id);
        if(foundComment.user == req.user.id){
            let postId = foundComment.post;//we are storing the is of post id inside that Comment
            await Comment.findByIdAndDelete(req.params.id);

            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.error("Error",err);
        return res.redirect('back');
    }

}