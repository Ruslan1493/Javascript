function validate() {
    let username = $('#username');
    let email = $('#email');
    let password = $('#password');
    let confirmPassword = $('#confirm-password');
    let company = $('#company');
    let companyNumber = $('#companyNumber');
    company.on('change', function () {
        if($(this).prop("checked")){
            $('#companyInfo').css('display', '');
        }else{
            $('#companyInfo').css('display', 'none');
        }
    });

    $('#submit').on('click', function (ev) {
        $('#username').css('border-color', '');
        $('#email').css('border-color', '');
        $('#password').css('border-color', '');
        $('#confirm-password').css('border-color', '');
        $('#companyNumber').css('border-color', '');
        let usernameReg = /([a-z0-9]{3,20})/;
        let emailReg =/(?=.*\@)(?=.*\.).+/;
        let passReg = /[\w]{5,15}/;
        let areCorrect = true;
        if(!usernameReg.test(username.val())){
            $('#username').css('border-color', 'red');
            areCorrect = false;
        }
        if(!emailReg.test(email.val())){
            $('#email').css('border-color', 'red');
            areCorrect = false;
        }
        if(!passReg.test(password.val())){
            $('#password').css('border-color', 'red');
            areCorrect = false;
        }
        if(confirmPassword.val() !== password.val()){
            $('#confirm-password').css('border-color', 'red');
            areCorrect = false;
        }
        if(company.prop("checked")) {
            if (companyNumber.val() < 1000 || companyNumber.val() > 9999) {
                $('#companyNumber').css('border-color', 'red');
                areCorrect = false;
            }
        }
        if(!areCorrect){
            $('#valid').css('display', 'none');
        }else{
            $('#valid').css('display', '');
        }
        ev.preventDefault();
    });

}
