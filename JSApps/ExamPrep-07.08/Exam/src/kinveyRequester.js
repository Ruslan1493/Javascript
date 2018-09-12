const kinveyRequester = (function () {

    const BASE_URL = 'https://baas.kinvey.com/'
    const APP_KEY = 'kid_rksGOd_SQ'
    const APP_SECRET = '0a0f37f5824b4766b8241ed73b61ea8c'
    const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}

    function registerUser(username, password) {
        showLoading();
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Registration successful.')
            $('#formRegister').trigger('reset')
            showLoading();
        }).catch(handleError)
    }

    function loginUser(username, password) {
        showLoading();
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/login',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Login successful.')
            showLoggedHomeView();
            $('#formLogin').trigger('reset')
            showLoading();
        }).catch(handleError)
    }

    function logoutUser() {
        showLoading();
        $.ajax({
            method: 'POST',
            url: BASE_URL +  'user/' + APP_KEY + '/_logout',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).then(function () {
            showLoading();
        }).catch(function (err) {
            console.log(err)
        })
        sessionStorage.clear()
        showInfo("Logout successful")
        showHomeView()
        showHideLinks()
    }

    function postFlight(destination, origin, departureDate, departureTime,
                        seats, cost, img, isPublic) {
        showLoading();
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'appdata/' + APP_KEY + '/flights',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {destination, origin, departureDate, departureTime,
                seats, cost, img, isPublic}
        }).then(function () {
            showHomeView()
            showInfo("Created flight.")
            $('#formAddFlight').trigger("reset")
            showLoading();
        }).catch(handleError)
    }


    async function getAllPublicFlight() {
        showLoading();
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + '/flights?query={"isPublic":"true"}',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            showLoading();
            return res
        }).catch(handleError)
    }

    async function getMyFlights() {
        showLoading();
        return await $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' +
                APP_KEY + `/flights?query={"_acl.creator":"${sessionStorage.getItem("userId")}"}`,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            showLoading();
            return res
        }).catch(handleError)
    }

    function removeFlight(id) {
        showLoading();
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + 'appdata/' + APP_KEY + '/flights/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function () {
            showInfo("Flight deleted.")
            $("#linkFlights").trigger('click')
            showLoading();
        }).catch(handleError)
    }

    function editFlight(id, destination, origin, departureDate, departureTime, seats,
                        cost, img, isPublic) {
        showLoading();
        $.ajax({
            method: 'PUT',
            url: BASE_URL + 'appdata/' + APP_KEY + '/flights/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {destination, origin, departureDate, departureTime, seats, cost, img, isPublic}
        }).then(function (res) {
            showInfo("Successfully edited flight.")
            hideAllElements();
            getFlightDetails(res)
            showLoading();
        }).catch(handleError)
    }

    function signInUser(res, message) {
        saveUserSession(res)
        showInfo(message)
        showHomeView()
        showHideLinks()
    }

    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
        sessionStorage.setItem('username', userInfo.username)
        sessionStorage.setItem('userId', userInfo._id)
    }

    function handleError(err) {
        showError(err.message)
    }

    return {registerUser, loginUser, logoutUser, postFlight, getAllPublicFlight,
        editFlight, getMyFlights, removeFlight}
}())