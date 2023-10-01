const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let foundPost = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path:'user'
            }
        })

    return res.json(200,{
        message:"List of Posts from v1",
        posts:foundPost
    })
}


module.exports.destroy = async function (req, res) {
    try {
        let foundPost = await Post.findById(req.params.id);

        /* .ID MEANS CONVERTING OBJECT ID  INTO STRING FORM */
        // if (foundPost.user == req.user.id) {
            await Post.findByIdAndDelete(req.params.id); // Delete the post

            // Find and delete associated comments
            await Comment.deleteMany({ post: req.params.id });

            return res.json(200,{
                message:"Post and Associated Comment deleted Successfully"
            })
        // } else {
        //     req.flash('error','you can not delete this post');
        //     return res.redirect('back');
        // }
    } catch (error) {
        return res.json(500,{
            message:"Internal Server Error"
        })
    }
};
