function showHideLinks() {
    hideAllViews();
    hideAllLInks();
    if (sessionStorage.getItem('authToken')) {
        // $("#linkFlights").show();
        $("#Home").show();
        $("#AllListings").show();
        $("#MyListings").show();
        $("#CreateListings").show();
        $("#userWelcome").text('Welcome ' + sessionStorage.getItem('username'));
        $("#profile").show();
        showAllCars();
    } else {
        $("#main").show();
        $("#Home").show();
    }
}

function hideAllViews() {
    $("#main").hide();
    $("#login").hide();
    $("#register").hide();
    $("#car-listings").hide();
    $("#create-listing").hide();
    $("#edit-listing").hide();
    $(".my-listings").hide();
    $(".listing-details").hide();
}

function hideAllLInks() {
    $("#Home").hide();
    $("#AllListings").hide();
    $("#MyListings").hide();
    $("#CreateListings").hide();
    $("#profile").hide();
}

async function showAllCars(){
    hideAllViews();
    let cars = await kinveyRequester.getAllListings();
    renderAllCars(cars);
    $("#car-listings").show();
}

function attachLinkEvents() {
    $("#linkLogin").on('click', function () {
        hideAllViews();
        $("#login").show();
    });
    $("#linkRegister").on('click', function () {
        hideAllViews();
        $("#register").show();
    });
    $("#Home").on('click', function () {
        hideAllViews();
        showHideLinks();
    });

    $("#login").find('a').on('click', function () {
        hideAllViews();
        $("#register").show();
    });

    $("#CreateListings").on('click', function () {
        hideAllViews();
        $("#create-listing").show();
    });

    $("#AllListings").on('click', async function () {
        hideAllViews();
        let cars = await kinveyRequester.getAllListings();
        renderAllCars(cars);
        $("#car-listings").show();
    });
    $("#MyListings").on('click', async function () {
        hideAllViews();
        let cars = await kinveyRequester.getMyCars();
        renderMyCars(cars);
        $("#my-listings").show();
    });
}