let requester = (() => {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_HycmyXX8X";
    const kinveyAppSecret = "ddb77e84fb4249b3870aec35da77acb0";
    const HEADERSKinvey = "Kinvey " + sessionStorage.getItem('authToken');
    const HEADERSBasic = "Basic " + btoa(kinveyAppKey + ':' + kinveyAppSecret);

    function login(username, password) {
        loading();
        return $.ajax({
            method: "POST",
            url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/login',
            headers: {'Authorization': HEADERSBasic},
            data: {username, password},
        }).then(function (res) {
            loading();
            saveSession(res);
        });
    }
    function register(username, password) {
        console.log(password);
        loading();
        return $.ajax({
            method: "POST",
            url: kinveyBaseUrl + 'user/' + kinveyAppKey + "/",
            headers: {Authorization: HEADERSBasic},
            data: { username, password },
        }).then(function (res) {
            loading();
            saveSession(res);
        });
    }
    function logout() {
        loading();
        console.log('logout...');
        return $.ajax({
            method: "POST",
            url: kinveyBaseUrl + 'user/' + kinveyAppKey + "/_logout",
            headers: {Authorization: "Kinvey " + sessionStorage.getItem('authToken')},
            //data: {authtoken: sessionStorage.getItem('authtoken')},
        }).then(function (res) {
            console.log('logout success');
            loading();
            sessionStorage.clear();
        });
    }
    function addTraining(type, description, date) {
        loading();
        return $.ajax({
            method: "POST",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + "/trainings",
            headers: {Authorization: "Kinvey " + sessionStorage.getItem('authToken')},
            data: {type, description, date},
        }).then(function (res) {
            loading();
            console.log('Data created!');
        });
    }

    function deleteTraining(id) {
        loading();
        return $.ajax({
            method: "DELETE",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + "/trainings/" + id,
            headers: {Authorization: "Kinvey " + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            loading();
            $('#table').empty();
            getAllTrainings();
        });
    }
     async function getAllTrainings() {
         loading();
        return await $.ajax({
            method: "GET",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + "/trainings/",
            headers: {Authorization: "Kinvey " + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            loading();
                return res;
        });
    }
    function saveSession(user) {
        sessionStorage.setItem('authToken', user._kmd.authtoken);
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('userId', user._id);
    }
    return {
        login,
        register,
        logout,
        addTraining,
        getAllTrainings,
        deleteTraining,
    }
})();