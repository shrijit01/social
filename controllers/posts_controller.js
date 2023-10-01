const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
    try {
        // return res.end('Post Controller');
        let createdPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        if(req.xhr){
            return res.status(200).json({
                data:{
                    createdPost:createdPost 
                },
                message :"Post Created"
            })
        }

        if (createdPost) {
            req.flash('success','Post published! ');
            return res.redirect('back');
        }
    } catch (e) {
        req.flash('erroe',err);
        return res.redirect('back');
    }
}




module.exports.destroy = async function (req, res) {
    try {
        let foundPost = await Post.findById(req.params.id);

        /* .ID MEANS CONVERTING OBJECT ID  INTO STRING FORM */
        if (foundPost.user == req.user.id) {
            await Post.findByIdAndDelete(req.params.id); // Delete the post

            // Find and delete associated comments
            await Comment.deleteMany({ post: req.params.id });
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id : req.params.id
                    },
                    message:"Post deleted "
                })
            }




            req.flash('success','Post   and Associated Comment deleted !');
            return res.redirect('back');
        } else {
            req.flash('error','you can not delete this post');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('erroe',err);
        return res.redirect('back');
    }
};
