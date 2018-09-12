function renderHomeView(flights) {
    for (let flight of flights) {
        let a = $('<a href="#" class="added-flight">').on('click', function () {
            renderEditView(flight);
        });
        a.append($(`<img src="${flight.img}" alt="" class="picture-added-flight">`));
        a.append($(`<h3>${flight.destination}</h3>`));
        a.append($(`<span>from ${flight.origin}</span><span>${flight.departureDate}</span>`));
        $("#viewCatalog > div").append(a);
    }
}

function renderEditView(flight) {
    hideAllViews();
    //console.log(flight);

    $('#viewFlightDetails > div').empty();
    let divLeft = $('<div class="ticket-area-left">');
    let img = $(`<img src="${flight.img}" alt="">`);
    divLeft.append(img);

    let divRight = $('<div class="ticket-area-right">');
    let h3 = $(`<h3>${flight.destination}</h3>`);
    let fromDiv = $(`<div>from ${flight.origin}</div>`);
    let innerDiv = $(`<div class="data-and-time">`);
    if(sessionStorage.getItem('userId') === flight._acl.creator) {
        let a = $(`<a href="#" class="edit-flight-detail">`).on('click', function () {
            renderEditDetails(flight);
        });
        innerDiv.append(a);
    }
    let divSeatsCost = $(`<div>${flight.seats} Seats (${flight.cost} per seat)</div>`);

    divRight.append(h3);
    divRight.append(fromDiv);
    divRight.append(innerDiv);
    divRight.append(divSeatsCost);
    $('#viewFlightDetails > div').append(divLeft);
    $('#viewFlightDetails > div').append(divRight);
    $("#viewFlightDetails").show();
}

function renderEditDetails(flight) {
    hideAllViews();
    $("#formEditFlight").attr('flightId', flight._id);
    $("#formEditFlight > input[name=destination]").val(flight.destination);
    $("#formEditFlight > input[name=origin]").val(flight.origin);
    $("#formEditFlight > input[name=departureDate]").val(flight.departureDate);
    $("#formEditFlight > input[name=departureTime]").val(flight.departureTime);
    $("#formEditFlight > input[name=seats]").val(flight.seats);
    $("#formEditFlight > input[name=cost]").val(flight.cost);
    $("#formEditFlight > input[name=img]").val(flight.img);
    $("#formEditFlight > input[name=public]").val(flight.isPublic);
    $("#viewEditFlight").show();
}

async function renderMyFlights() {
    hideAllViews();
    let myFlights = await kinveyRequester.getMyFlights();
    $("#viewMyFlights").empty();
    for (let flight of myFlights) {
        let divLeft = $('<div class="flight-left">');
        let img = $(`<img src="${flight.img}" alt="">`);
        divLeft.append(img);

        let divRight = $('<div class="flight-right">');
        let h3 = $(`<h3>${flight.destination}</h3><span>${flight.departureDate}</span>`);
        let fromDiv = $(`<div>from ${flight.origin} <span>${flight.departureTime}</span></div>`);
        let p = $(`<p>${flight.seats} Seats (${flight.cost}$ per seat) </p>`);
        let aRemove = $(`<a href="#" class="remove">REMOVE</a>`).on('click', function () {
            kinveyRequester.removeFlight(flight._id);
        });
        let aDetails = $(`<a href="#" class="details">Details</a>`).on('click', function () {
            hideAllViews();
            renderEditView(flight);
        });
        divRight.append(h3);
        divRight.append(fromDiv);
        divRight.append(p);
        divRight.append(aRemove);
        divRight.append(aDetails);
        $("#viewMyFlights").append(divLeft);
        $("#viewMyFlights").append(divRight);
    }
}

// <div class="flight-left">
//     <img src="http://airportcluj.ro/fisiere/userfiles/Bari_28.03.07_088.jpg" alt="">
// </div>
//     <div class="flight-right">
//          <div>
//              <h3>CLUJ-NAPOCA</h3><span>15 January</span>
//          </div>
//          <div>
//              from Sheffield <span>14:00</span>
//          </div>
//          <p>55 Seats (13.12$ per seat) </p>
//          <a href="" class="remove">REMOVE</a>
//          <a href="" class="details">Details</a>
//     </div>