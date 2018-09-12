const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_ryG7KtNV7';
const APP_SECRET = '6e03210aac914f34b8767bf350214415';
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};
const BOOKS_PER_PAGE = 10;

function loginUser() {
    // TODO
    // POST -> BASE_URL + 'user/' + APP_KEY + '/login'
    // signInUser(res, 'Login successful.')
    let username = $("#formLogin input[name='username']").val();
    let password = $("#formLogin input[name='passwd']").val();
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: {username, password},
    }).then(function (res) {
        signInUser(res, 'Login successful.');
    }).catch(handleAjaxError)
}

function registerUser() {
    // POST -> BASE_URL + 'user/' + APP_KEY + '/'
    // signInUser(res, 'Registration successful.')
    let username = $("#formRegister input[name='username']").val();
    let password = $("#formRegister input[name='passwd']").val();
    //if(username.val().trim() !== '' && password.val().trim() !== ''){
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password},
        }).then(function (res) {
            signInUser(res, 'Registration successful.')
        }).catch(handleAjaxError)
}

function listBooks() {
    // TODO
    // GET -> BASE_URL + 'appdata/' + APP_KEY + '/books'
    // displayPaginationAndBooks(res.reverse())
    $.ajax({
        method: "GET",
        url: BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers: { Authorization: "Kinvey " + sessionStorage.getItem('authToken')},
    }).then(function (res) {
        displayPaginationAndBooks(res.reverse());
    }).catch(handleAjaxError);
}


function createBook() {
    // TODO
    // POST -> BASE_URL + 'appdata/' + APP_KEY + '/books'
    // showInfo('Book created.')
}

function deleteBook(book) {
    // TODO
    // DELETE -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
    // showInfo('Book deleted.')
}

function loadBookForEdit(book) {
    // TODO
}

function editBook() {
    // TODO
    // PUT -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
    // showInfo('Book edited.')
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('userId', userInfo._id);
}

function logoutUser() {
    // TODO
    // showInfo('Logout successful.')
    $.ajax({
        method: "POST",
        url: BASE_URL + "user/" + APP_KEY + "/_logout",
        headers: { Authorization: "Kinvey " + sessionStorage.getItem('authToken')}
    }).then(function (res) {
        console.log(res);
        sessionStorage.clear();
        showHideMenuLinks();
        $('#loggedInUser').text("");
        showInfo('Logout successful.')
    }).catch(handleAjaxError);



}

function signInUser(res, message) {
    showInfo(res.username + " " + message);
    saveAuthInSession(res);
    showHomeView();
    showHideMenuLinks();
}

function displayPaginationAndBooks(books) {
    showView("viewBooks");
    let pagination = $('#pagination-demo')
    if(pagination.data("twbs-pagination")){
        pagination.twbsPagination('destroy')
    }
    pagination.twbsPagination({
        totalPages: Math.ceil(books.length / BOOKS_PER_PAGE),
        visiblePages: 5,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            $("#books > table > tr").not(':first').remove();
            console.log($("#books > table > tr"));
            let startBook = (page - 1) * BOOKS_PER_PAGE
            let endBook = Math.min(startBook + BOOKS_PER_PAGE, books.length)
            $(`a:contains(${page})`).addClass('active')
            for (let i = startBook; i < endBook; i++) {
                let book = $("#books table tr")[i];
                console.log(book);
            }
        }
    })
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}