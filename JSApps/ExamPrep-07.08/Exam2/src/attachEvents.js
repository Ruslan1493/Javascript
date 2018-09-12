function showHideLinks() {
    hideAllViews();
    hideAllLInks();
    if(sessionStorage.getItem('authToken')){
        $("#linkFlights").show();
        $("#linkLogout").show();
    }else{
        $("#linkLogin").show();
        $("#linkRegister").show();
    }
}

function hideAllViews() {
    $("#container > section").hide();
}

function hideAllLInks() {
    $("#linkFlights").hide();
    $("#linkLogout").hide();
    $("#linkLogin").hide();
    $("#linkRegister").hide();
}

async function showHomeView(){
    hideAllViews();
    $("#viewCatalog > div > a").remove();
    let flights = await kinveyRequester.getAllPublicFlight();
    renderHomeView(flights);
    $("#viewCatalog").show();
}

function attachLinkEvents() {
    $("#linkHome").on('click', function () {
        hideAllViews();
        $("#viewCatalog").show();
        showHomeView();
    });
    $("#linkFlights").on('click', function () {
        hideAllViews();
        renderMyFlights();
        $("#viewMyFlights").show();
    });
    $("#linkLogin").on('click', function () {
        hideAllViews();
        $("#viewLogin").show();
    });
    $("#linkRegister").on('click', function () {
        hideAllViews();
        $("#viewRegister").show();
    });
    $("#viewCatalog > a").on('click', function () {
        hideAllViews();
        $("#viewAddFlight").show();
    });
}

