const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
    try {
        // return res.end('Post Controller');
        let createdPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        if (createdPost) {
            return res.redirect('back');
        }
    } catch (e) {
        console.log(Error);
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

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.error(error);
        return res.redirect('back');
    }
};
