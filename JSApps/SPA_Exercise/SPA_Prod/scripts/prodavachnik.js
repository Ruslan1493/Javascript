function startApp() {
    const BASE_URL = "https://baas.kinvey.com/";
    const app_key = "kid_HJ2S-r9Vm";
    const app_secret = "a7c5cd08a35a414ca1bfa3da487948cd";
    const auth = {'Authorization': "Basic " + btoa(app_key+":"+app_secret)};
    //const url = "/user";
    $("#menu a").show();
    $("#buttonLoginUser").click(login);
    $("#linkLogin").click($("#viewLogin").show());
    function login(){
        let username = $("#viewLogin input[name='username']").val();
        let password = $("#viewLogin input[name='passwd']").val();
        if(username.trim() !== '' && password.trim() !== ''){
            $.ajax({
                method: "POST",
                url: BASE_URL + 'user/' + app_key + '/login',
                headers: auth,
                data: {username, password}
            }).then(function (res) {
                $("#viewLogin").hide();
                $("#viewHome").show();
            }).catch(function(err){
                console.error(err);
            });

        }
    }

}