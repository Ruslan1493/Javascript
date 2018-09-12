function attachEvents() {
    let kinveyId = "kid_ryG7KtNV7";
    let URL = "https://baas.kinvey.com/appdata/" + kinveyId;
    let username = "Peter";
    let password = "p";
    let base64 = btoa(username + ":" + password);
    let auth = {"Authorization": "Basic " + base64};
    let btnLoad = $("#btnLoadPosts");
    let btnView = $("#btnViewPost");
    btnLoad.on('click', function () {
        $.ajax({
            method: "GET",
            url: URL + "/posts",
            headers: auth,
        }).then(function (arr) {
            let posts = $("#posts");
            posts.empty();
            for (let obj of arr) {
                let option = $(`<option value=${obj._id}>${obj.title}</option>`);
                posts.append(option);
            }
        }).catch(function (err) {
            console.log(err);
        });
    })
    btnView.on('click', function () {
        let selectedPost = $("#posts").val();
        if(selectedPost === ''){
            return;
        }
        let postTitle = $("#post-title");
        let postBody =  $("#post-body");
        postTitle.text("Post Details");
        postBody.empty();
        $.ajax({
            method: "GET",
            url: URL + `/posts/${selectedPost}`,
            headers: auth,
        }).then(function (obj) {
            postTitle.text(obj.title);
            postBody.text(obj.body);
        }).catch(function (err) {
                console.log(err);
        });
        let postComments = $("#post-comments");
        postComments.empty();
        $.ajax({
            method: "GET",
            url: URL + `/comments/?query={"post_id":"${selectedPost}"}`,
            headers: auth,
        }).then(function (arr) {
            for (let obj of arr) {
                postComments.append($(`<li>${obj.text}</li>`));
            }
        }).catch(function (err) {
            console.log(err);
        });
    })
}

//POST /appdata/kid_ryG7KtNV7/posts/
// Host: baas.kinvey.com
// Authorization: Basic {base64("Peter:p")}
// Content-Type: applicaton/json
