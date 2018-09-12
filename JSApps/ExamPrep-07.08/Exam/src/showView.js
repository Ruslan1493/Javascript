function showHomeView() {
    hideAllElements();
    showHideLinks();
}


// function showAddFlight(){
//     hideAllElements();
//     showHideLinks();
//     $("#viewAddFlight").on('click');
// }

async function showLoggedHomeView() {
    let flights = await kinveyRequester.getAllPublicFlight();

    hideAllElements();
    if (sessionStorage.getItem('authToken') === null) {
        $("#loginLink").show();
        $("#registerLink").show();
        $("#viewLogin").show();
    } else {
        $("#homeLink").show();
        $("#flightsLink").show();
        $("#viewCatalog").show();
        $(".right-container > span").text(`Welcome, ${sessionStorage.getItem('username')} |`);
        $(".right-container > span").show();
        $(".right-container > a").show();
    }
    let mainDiv = $("#viewCatalog > div");
    mainDiv.empty();
    for (let f of flights) {
        addEvent(f, main);
    }


}

function addEvent(f) {

    let a = $(`<a href="#" class="added-flight">`).on('click', function () {
        viewEditSign(f);
    })

    let img = $(`<img src="${f.img}" alt="" class="picture-added-flight">`);
    let h3 = $(`<h3>${f.destination}</h3>`);
    let span = $(`<span>from ${f.origin}</span><span>${f.departureDate}</span>`);
    a.append(img);
    a.append(h3);
    a.append(span);
    main.append(a);

    function viewEditSign(info) {

        $("#viewFlightDetails > div").empty();
        let divAreaLeft = $('<div class="ticket-area-left">');
        let img1 = $(`<img src="${info.img}" alt="">`);
        divAreaLeft.append(img1);
        let divAreaRight = $('<div class="ticket-area-right">');
        let h3 = $(`<h3>${info.destination}</h3>`);
        let origin = $(`<div>from ${info.origin}</div>`);
        let divTime = $(`<div class="data-and-time">`);
        divTime.text(`${info.departureDate} ${info.departureTime}`);
        //console.log(info);
        if (sessionStorage.getItem("userId") === info._acl.creator) {

            let a = $(`<a href="#" class="edit-flight-detail"></a>`).on('click', function () {
                //$("#viewEditFlight").empty();
                hideAllElements();
                if (sessionStorage.getItem('authToken') === null) {
                    $("#loginLink").show();
                    $("#registerLink").show();
                    $("#viewLogin").show();
                } else {
                    $("#homeLink").show();
                    $("#flightsLink").show();
                    $("#viewEditFlight").show();
                    $(".right-container > span").text(`Welcome, ${sessionStorage.getItem('username')} |`);
                    $(".right-container > span").show();
                    $(".right-container > a").show();
                }
                renderEditView(info);
                //console.log(info._id);
            });
            divTime.append(a);
        }
        let divSeatsCost = $(`<div>${info.seats} (${info.cost} per seat)</div>`);
        divAreaRight.append(h3);
        divAreaRight.append(origin);
        divAreaRight.append(divTime);
        divAreaRight.append(divSeatsCost);
        $("#viewFlightDetails > div").append(divAreaLeft);
        $("#viewFlightDetails > div").append(divAreaRight);
        hideAllElements();
        viewFlightDetails();
    }
}

function getFlightDetails(info){
    console.log(info._id);
        console.log('edited flight datils +' + info);
        $("#viewFlightDetails > div").empty();
        let divAreaLeft = $('<div class="ticket-area-left">');
        let img1 = $(`<img src="${info.img}" alt="">`);
        divAreaLeft.append(img1);
        let divAreaRight = $('<div class="ticket-area-right">');
        let h3 = $(`<h3>${info.destination}</h3>`);
        let origin = $(`<div>from ${info.origin}</div>`);
        let divTime = $(`<div class="data-and-time">`);
        divTime.text(`${info.departureDate} ${info.departureTime}`);
        if (sessionStorage.getItem("userId") === info._acl.creator) {

            let a = $(`<a href="#" class="edit-flight-detail"></a>`).on('click', function () {
                //$("#viewEditFlight").empty();
                hideAllElements();
                if (sessionStorage.getItem('authToken') === null) {
                    $("#loginLink").show();
                    $("#registerLink").show();
                    $("#viewLogin").show();
                } else {
                    $("#homeLink").show();
                    $("#flightsLink").show();
                    $("#viewEditFlight").show();
                    $(".right-container > span").text(`Welcome, ${sessionStorage.getItem('username')} |`);
                    $(".right-container > span").show();
                    $(".right-container > a").show();
                }
                console.log(info.destination);
                renderEditView(info);

            });
            divTime.append(a);
        }
        let divSeatsCost = $(`<div>${info.seats} (${info.cost} per seat)</div>`);
        divAreaRight.append(h3);
        divAreaRight.append(origin);
        divAreaRight.append(divTime);
        divAreaRight.append(divSeatsCost);
        $("#viewFlightDetails > div").append(divAreaLeft);
        $("#viewFlightDetails > div").append(divAreaRight);
        hideAllElements();
        viewFlightDetails();
};

function renderEditView(info) {
    $("#viewEditFlight").attr('flightId', info._id);
    $("#formEditFlight > input[name=destination]").val(info.destination);
    $("#formEditFlight > input[name=origin]").val(info.origin);
    $("#formEditFlight > input[name=departureDate]").val(info.departureDate);
    $("#formEditFlight > input[name=departureTime]").val(info.departureTime);
    $("#formEditFlight > input[name=seats]").val(info.seats);
    $("#formEditFlight > input[name=cost]").val(info.cost);
    $("#formEditFlight > input[name=img]").val(info.img);
    $("#formEditFlight > input[name=public]").val(info.public);
}
// <div class="ticket-area-left">
//     <img src="http://airportcluj.ro/fisiere/userfiles/Bari_28.03.07_088.jpg" alt="">
//     </div>
//     <div class="ticket-area-right">
//     <h3>CLUJ-NAPOCA</h3>
//     <div>from Sheffield</div>
// <div class="data-and-time">
//     20 April 14:00
// <a href="" class="edit-flight-detail"></a>
//     </div>
//     <div>
//     55 Seats (13.12 per seat)
//     </div>
// </div>
