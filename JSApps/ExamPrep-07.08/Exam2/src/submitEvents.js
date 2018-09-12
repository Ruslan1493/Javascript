function attachButtonEvents() {
    $("#formRegister").on('submit', function (event) {
        event.preventDefault();
        let username = $("#formRegister > input[name='username']").val();
        let password = $("#formRegister > input[name='pass']").val();
        let passRepeat = $("#formRegister > input[name='checkPass']").val();
        if(username.length >= 5 && password && password === passRepeat){
            kinveyRequester.registerUser(username, password);
        }else if(username.length < 5){
            showError('Username must be at least 5 characters long!');
        }else if(password !== passRepeat){
            showError('Passwords are do not match!');
        }else{
            showError('Username and passwords should not be empty!');
        }
    });

    $("#formLogin").on('submit', function (event) {
        event.preventDefault();
        let username = $("#formLogin > input[name='username']").val();
        let password = $("#formLogin > input[name='pass']").val();
        if(username && password) {
            kinveyRequester.loginUser(username, password);
        }
            // else if(username.length === 0 || password.length){
        //     showError('Username or password is empty!');
        // }else{
        //     showError('The username or password is not correct!');
        // }
    });

    $("#formAddFlight").on('submit', function (event) {
        event.preventDefault();
        let destination = $("#formAddFlight > input[name='destination']").val();
        let origin = $("#formAddFlight > input[name='origin']").val();
        let departureDate = $("#formAddFlight > input[name='departureDate']").val();
        let departureTime = $("#formAddFlight > input[name='departureTime']").val();
        let seats = $("#formAddFlight > input[name='seats']").val();
        let cost = $("#formAddFlight > input[name='cost']").val();
        let img = $("#formAddFlight > input[name='img']").val();
        let isPublic = $("#formAddFlight > input[name='public']").is(":checked");
        if(destination && origin && Number(seats) > 0 && Number(cost) > 0 && departureDate && departureTime) {
            kinveyRequester.postFlight(destination, origin, departureDate, departureTime, seats, cost, img, isPublic);
        }else{
            showError("Please, fill all the fields!");
        }
    });

    $("#linkLogout > a").on('click', function (event) {
        kinveyRequester.logoutUser();
    });

    $("#formEditFlight").on('submit', function (event) {
        event.preventDefault();
        let id = $("#formEditFlight").attr('flightId');
        let destination = $("#formEditFlight > input[name='destination']").val();
        let origin = $("#formEditFlight > input[name='origin']").val();
        let departureDate = $("#formEditFlight > input[name='departureDate']").val();
        let departureTime = $("#formEditFlight > input[name='departureTime']").val();
        let seats = $("#formEditFlight > input[name='seats']").val();
        let cost = $("#formEditFlight > input[name='cost']").val();
        let img = $("#formEditFlight > input[name='img']").val();
        let isPublic = $("#formEditFlight > input[name='public']").is(":checked");
        if(destination && origin && Number(seats) > 0 && Number(cost) > 0 && departureDate && departureTime) {
            kinveyRequester.editFlight(id, destination, origin, departureDate, departureTime, seats, cost, img, isPublic);
        }else{
            showError("Please, fill all the fields!");
        }
    });
}