function submitButtons ()  {
    $("#formRegister").on('submit', function (event) {
        event.preventDefault();
        let username = $("#formRegister > input[name='username']").val();
        let pass = $("#formRegister > input[name='pass']").val();
        let passRepeat = $("#formRegister > input[name='checkPass']").val();

        if(username.length >= 5 && pass && pass === passRepeat){
            kinveyRequester.registerUser(username, pass);
            username.val();
            pass.val();
            passRepeat.val();
        }else if(username.length < 5){
            showError("Username should be equal or more than 5 symbols");
        }else if(!pass){
            showError("Password was not entered!");
        }else if(pass !== passRepeat){
            showError("Passwords do not match!");
        }
    })
    $("#formLogin").on('submit', function (event) {
        event.preventDefault();
        let username = $("#formLogin > input[name='username']").val();
        let pass = $("#formLogin > input[name='pass']").val();
        console.log('req')
        if(username.length >= 5 && pass){
            console.log('reqsent')
            kinveyRequester.loginUser(username, pass);
        }else if(!pass){
            showError("Password was not entered!");
        }else if(!username){
            showError("Username was not entered!");
        }else{
            showError("Password is too short!");
        }

    })
    $(".right-container > a").on('click', function (event) {
        event.preventDefault();
        kinveyRequester.logoutUser();
        showHideLinks();
    })

    $("#formAddFlight").on('submit',function () {
        event.preventDefault();
        let destination = $("#formAddFlight > input[name='destination']").val();
        let origin = $("#formAddFlight > input[name='origin']").val();
        let departureDate = $("#formAddFlight > input[name='departureDate']").val();
        let departureTime = $("#formAddFlight > input[name='departureTime']").val();
        let seats = $("#formAddFlight > input[name='seats']").val();
        let cost = $("#formAddFlight > input[name='cost']").val();
        let img = $("#formAddFlight > input[name='img']").val();
        let isPublic = $("#formAddFlight > input[name='public']").is(':checked');

        if(destination && origin && Number(seats) > 0 && Number(cost) > 0){
            kinveyRequester.postFlight(destination,origin,departureDate, departureTime, Number(seats), Number(cost), img, isPublic);
            showLoggedHomeView();
            showInfo("Created flight.");
        }else{
            showError("The info provided is wrong!");
        }

    });

    $("#formEditFlight").on('submit', function () {
        event.preventDefault();
        let id = sessionStorage.getItem('flightId');
        let destination = $("#formEditFlight > input[name='destination']").val();
        let origin = $("#formEditFlight > input[name='origin']").val();
        let departureDate = $("#formEditFlight > input[name='departureDate']").val();
        let departureTime = $("#formEditFlight > input[name='departureTime']").val();
        let seats = $("#formEditFlight > input[name='seats']").val();
        let cost = $("#formEditFlight > input[name='cost']").val();
        let img = $("#formEditFlight > input[name='img']").val();
        let isPublic = $("#formEditFlight > input[name='public']").is(':checked');

        if(destination && origin && Number(seats) > 0 && Number(cost) > 0){
            kinveyRequester.editFlight(id, destination,origin,departureDate, departureTime, Number(seats), Number(cost), img, isPublic);
            showInfo("Created flight.");
        }else{
            showError("The info provided is wrong!");
        }
    });

    $("#infoBox").on('click', function (event) {
        $("#infoBox").hide();
    })
    $("#loadingBox").on('click', function (event) {
        $("#loadingBox").hide();
    })
}
