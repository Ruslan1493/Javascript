function renderAllCars(cars) {
    $("#listings").empty();
    if(cars.length === 0){
        $("#listings").append($('<p class="no-cars">No cars in database.</p>'));
    }else {
        for (let car of cars) {
            let mainListing = $('<div class="listing">');
            let p = $(`<p>${car.title}</p>`);
            let img = $(`<img src="${car.imageUrl}">`);
            let brand = $(`<h2>Brand: ${car.brand}</h2>`);
            mainListing.append(p);
            mainListing.append(img);
            mainListing.append(brand);
            let divInfo = $(`<div class="info">`);
            let innerDivDataInfo = $(`<div id="data-info">`);
            let h31 = $(`<h3>Seller: ${car.seller}</h3>`);
            let h32 = $(`<h3>Fuel: ${car.fuel}</h3>`);
            let h33 = $(`<h3>Year: ${car.year}</h3>`);
            let h34 = $(`<h3>Price: ${car.price} $</h3>`);
            innerDivDataInfo.append(h31);
            innerDivDataInfo.append(h32);
            innerDivDataInfo.append(h33);
            innerDivDataInfo.append(h34);
            let divButtons = $('<div id="data-buttons">');
            let ul = $('<ul></ul>');
            let li1 = $('<li class="action"></li>');
            let carDetailsBtn = $('<a href="#" class="button-carDetails">Details</a>').on('click', function () {
                $("#car-listings").hide();
                renderDetailsView(car);
                $("#listing-details").show();
            });
            li1.append(carDetailsBtn);
            let li2 = $('<li class="action"></li>');
            let li3 = $('<li class="action"></li>');
            if(sessionStorage.getItem('userId') === car._acl.creator) {
                let carEditBtn = $('<a href="#" class="button-carDetails">edit</a>').on('click',function () {
                    $("#car-listings").hide();
                    renderEditView(car);
                });
                li2.append(carEditBtn);
                let carDeleteBtn = $('<a href="#" class="button-carDetails">delete</a>').on('click',function () {
                    kinveyRequester.removeCar(car._id);
                });
                li3.append(carDeleteBtn);
            }
            ul.append(li1);
            ul.append(li2);
            ul.append(li3);
            divButtons.append(ul);
            divInfo.append(innerDivDataInfo);
            divInfo.append(divButtons);

            mainListing.append(divInfo);
            mainListing.append(divButtons);
            $("#listings").append(mainListing);
        }
    }

}

function renderEditView(car) {
    $("#edit-listing").attr('carId', car._id);
    $("#edit-listing").find("input[name='title']").val(car.title);
    $("#edit-listing").find("input[name='description']").val(car.description);
    $("#edit-listing").find("input[name='brand']").val(car.brand);
    $("#edit-listing").find("input[name='model']").val(car.model);
    $("#edit-listing").find("input[name='year']").val(car.year);
    $("#edit-listing").find("input[name='imageUrl']").val(car.imageUrl);
    $("#edit-listing").find("input[name='fuelType']").val(car.fuel);
    $("#edit-listing").find("input[name='price']").val(car.price);
    $("#edit-listing").show();
}

function renderDetailsView(car) {
    $("#listing-details").empty();
    let mainDiv = $('<div class="my-listing-details">');
    let p = $(`<p id="auto-title">${car.title}</p>`);
    let img = $(`<img src="${car.imageUrl}">`);
    mainDiv.append(p);
    mainDiv.append(img);
    let divListing = $('<div class="listing-props">');
    let h2 = $(`<h2>Brand: ${car.brand}</h2>`);
    let h31 = $(`<h3>Model: ${car.model}</h3>`);
    let h32 = $(`<h3>Year: ${car.year}</h3>`);
    let h33 = $(`<h3>Fuel: ${car.fuel}</h3>`);
    let h34 = $(`<h3>Price: ${car.price}</h3>`);
    divListing.append(h2);
    divListing.append(h31);
    divListing.append(h32);
    divListing.append(h33);
    divListing.append(h34);
    let divListingBtns = $('<div class="listings-buttons">');
    if(sessionStorage.getItem('userId') === car._acl.creator){
        let a1 = $('<a href="#" class="button-list">Edit</a>').on('click', function () {
            $("#listing-details").hide();
            renderEditView(car);
        });
        let a2 = $('<a href="#" class="button-list">Delete</a>').on('clikc', function () {
            kinveyRequester.removeCar(car._id);
        });
        divListingBtns.append(a1);
        divListingBtns.append(a2);
    }
    mainDiv.append(divListing);
    mainDiv.append(divListingBtns);

    let pDescrTitle = $(`<p id="description-title">Description:</p>`);
    let pDescription = $(`<p id="description-para">${car.description}</p>`);
    mainDiv.append(pDescrTitle);
    mainDiv.append(pDescription);
    $("#listing-details").append(mainDiv);
}

function renderMyCars(cars) {
    $("#my-listings > div").empty();
    if(cars.length === 0){
        $("#my-listings > div").append($(`<p class="no-cars"> No cars in database.</p>`));
    }else {
        for (let car of cars) {

            let mainDiv = $('<div class="my-listing">');
            let p = $(`<p id="listing-title">${car.title}</p>`);
            let img = $(`<img src="${car.imageUrl}">`);
            mainDiv.append(p);
            mainDiv.append(img);

            let divListing = $('<div class="listing-props">');
            let h2 = $(`<h2>Brand: ${car.brand}</h2>`);
            let h31 = $(`<h3>Model: ${car.model}</h3>`);
            let h32 = $(`<h3>Year: ${car.year}</h3>`);
            let h33 = $(`<h3>Price: ${car.price}</h3>`);
            divListing.append(h2);
            divListing.append(h31);
            divListing.append(h32);
            divListing.append(h33);

            let divListingBtns = $('<div class="my-listing-buttons">');
            if (sessionStorage.getItem('userId') === car._acl.creator) {
                let a1 = $('<a href="#" class="my-button-list">Details</a>').on('click', function () {
                    $("#my-listings").hide();
                    renderDetailsView(car);
                    $("#listing-details").show();
                });
                let a2 = $('<a href="#" class="my-button-list">Edit</a>').on('click', function () {
                    $("#listing-details").hide();
                    renderEditView(car);
                });
                let a3 = $('<a href="#" class="my-button-list">Delete</a>').on('click', function () {
                    kinveyRequester.removeCar(car._id);
                });
                divListingBtns.append(a1);
                divListingBtns.append(a2);
                divListingBtns.append(a3);
            }
            mainDiv.append(divListing);
            mainDiv.append(divListingBtns);
            $("#my-listings > div").append(mainDiv);
            $("#my-listings").show();
        }
    }
}

