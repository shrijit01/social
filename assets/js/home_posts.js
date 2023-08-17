{
    // creating new post and saving in DB 
    /* METHOD TO SUBMIT FORM DATAFOR NEW POST USING AJAX REQUEST */
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.createdPost);
                    $('#posts-list-container>ul').prepend(newPost);
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }
    /*  METHOD TO CREATE THE POST IN DOM */

    let newPostDom = function(post) {
        console.log(post);
            return $(`<li id="post-${post._id}">
                        
                                <small>
                                        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                                </small>
                                

                                        <small>
                                                <b>
                                                        ${ post.user.name }
                                                </b>
                                        </small>
                                        <br>
                                <li>
                                        ${post.content}
                                </li>
                                <br>
                        <div id="post-comments">

                                <form action="/comments/create" method="POST">
                                        <input type="text" name="comment" placeholder="Type Something here." required>
                                        <input type="hidden" name="post" value="${ post._id }">
                                        <input type="submit" value="Add comment">
                                </form>

                                        <div class="post-comments-list">
                                                <ul id="post-comments-${ post._id }">
                                                        
                                                </ul>
                                        </div>
                        </div>
                        <hr style="width: 50%;border: 2px solid grey;">
                        <br>
                    </li>`
                    )
    }

    createPost();
}