const kinveyRequester = (function () {

    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_BJZLM3aHQ';
    const APP_SECRET = '64391845fb34431e90b4a4f95e06f8ed';
    const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};

    function registerUser(username, password) {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'User registration successful.');
            $("#register").find("input[name='username']").val('');
            $("#register").find("input[name='password']").val('');
            $("#register").find("input[name='repeatPass']").val('');
        }).catch(handleError);
    }

    function loginUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/login',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Login successful.');
            $("#login").find("input[name='username']").val('');
            $("#login").find("input[name='password']").val('');
        }).catch(handleError);
    }

    function logoutUser() {
        $.ajax({
            method: 'POST',
            url: BASE_URL +  'user/' + APP_KEY + '/_logout',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).then(function () {
        }).catch(function (err) {
            console.log(err);
        });
        sessionStorage.clear();
        showInfo("Logout successful");
        showHideLinks();
    }

    function createCar(title, description, brand, model, year, imageUrl, fuel, price, seller) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {title, description, brand, model, year, imageUrl, fuel, price, seller}
        }).then(function () {
            showInfo("listing created.");
            $('#create-listing > form').trigger("reset");
        }).catch(handleError);
    }


    async function getAllListings() {
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars?query={}&sort={"_kmd.ect": -1}',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            return res;
        }).catch(handleError);
    }

    async function getMyCars() {
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' +
                APP_KEY + `/cars?query={"seller":"${sessionStorage.getItem("username")}"}&sort={"_kmd.ect": -1}}`,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            return res;
        }).catch(handleError);
    }

    function removeCar(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function () {
            showInfo("Listing deleted.");
            $("#AllListings").trigger('click');
        }).catch(handleError);
    }

    function editCar(id, title, description, brand, model, year, imageUrl, fuel, price, seller) {
        $.ajax({
            method: 'PUT',
            url: BASE_URL + 'appdata/' + APP_KEY + '/cars/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {title, description, brand, model, year, imageUrl, fuel, price, seller}
        }).then(function (res) {
            showInfo(`Listing ${res.title} updated.`);
            showHideLinks();
            $("#AllListings").trigger('click');
        }).catch(handleError)
    }

    function signInUser(res, message) {
        saveUserSession(res);
        showInfo(message);
        showHideLinks();
    }

    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('userId', userInfo._id);
    }

    function handleError(err) {
        showError(err.message)
    }

    return {registerUser, loginUser, logoutUser, createCar, getAllListings, editCar, removeCar, getMyCars}
}());