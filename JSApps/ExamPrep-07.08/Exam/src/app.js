$(() => {
    hideAllElements();
    showHideLinks();
    linkEvents();
    submitButtons();
});

function hideAllElements() {
    $("#homeLink").hide();
    $("#flightsLink").hide();
    $("#loginLink").hide();
    $("#registerLink").hide();
    $(".right-container > span").hide();
    $(".right-container > a").hide();
    $("#viewRegister").hide();
    $("#viewLogin").hide();
    $("#viewCatalog").hide();
    $("#viewAddFlight").hide();
    $("#viewFlightDetails").hide();
    $("#viewEditFlight").hide();
    $("#viewMyFlights").hide();
}

function showHideLinks(){
    if(sessionStorage.getItem('authToken') === null){
        $("#loginLink").show();
        $("#registerLink").show();
        $("#viewLogin").show();
    }else{
        $("#homeLink").show();
        $("#flightsLink").show();
        $("#viewCatalog").show();
        $(".right-container > span").text(`Welcome, ${sessionStorage.getItem('username')} |`);
        $(".right-container > span").show();
        $(".right-container > a").show();
    }
}

function viewFlightDetails(res){
    if(sessionStorage.getItem('authToken') === null){
        $("#loginLink").show();
        $("#registerLink").show();
        $("#viewLogin").show();
    }else{
        $("#homeLink").show();
        $("#flightsLink").show();
        $("#viewFlightDetails").show();
        $(".right-container > span").text(`Welcome, ${sessionStorage.getItem('username')} |`);
        $(".right-container > span").show();
        $(".right-container > a").show();
    }
}

function linkEvents(){

    $("#loginLink").on('click',function () {
        hideAllElements();
        showHideLinks();
        //$("#homeLink").trigger('click');
        $("#viewLogin").show();
    });

    $("#registerLink").on('click',function () {
        hideAllElements();
        if(sessionStorage.getItem('authToken') === null){
            $("#loginLink").show();
            $("#registerLink").show();

        }else{
            $("#homeLink").show();
            $("#flightsLink").show();
            $(".right-container > span").text(`Welcome, ${sessionStorage.getItem('username')} |`);
            $(".right-container > a").show();
        }
        $("#viewRegister").show();
    });

    $("#homeLink").on('click',function () {
        hideAllElements();
        if(sessionStorage.getItem('authToken') === null){
            $("#loginLink").show();
            $("#registerLink").show();

        }else{
            $("#homeLink").show();
            $("#flightsLink").show();
            $(".right-container > span").text(`Welcome, ${sessionStorage.getItem('username')} |`);
            $(".right-container > a").show();
        }
        showLoggedHomeView();
        $("#viewCatalog").show();

    });

    $(".add-flight").on('click', function () {
        hideAllElements();
        if(sessionStorage.getItem('authToken') === null){
            $("#loginLink").show();
            $("#registerLink").show();

        }else{
            $("#homeLink").show();
            $("#flightsLink").show();
            $(".right-container > span").text(`Welcome, ${sessionStorage.getItem('username')} |`);
            $(".right-container > a").show();
        }
        $("#viewAddFlight").show();
    });

}
