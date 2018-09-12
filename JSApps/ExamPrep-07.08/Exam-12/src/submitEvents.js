function attachButtonEvents() {
    $("#register").on('submit', function (event) {
        event.preventDefault();
        let username = $("#register").find("input[name='username']").val();
        let password = $("#register").find("input[name='password']").val();
        let passRepeat = $("#register").find("input[name='repeatPass']").val();
        let regex1 = /^[a-zA-Z]+$/;
        if(username.length < 3){
            showError('Username should be at least 3 characters long!');
        }else if(!(regex1.test(username))){
            showError('Username should contain only english alphabet letters!');
        }else if(!username){
            showError('Username is not entered!');
        }else if(!password){
            showError('Password is not entered!');
        }else if(!passRepeat){
            showError('Repeat password is not entered!');
        }else if(password !== passRepeat){
            showError('Password do not match!');
        }else{
            kinveyRequester.registerUser(username, password);
        }
    });

    $("#login").on('submit', function (event) {
        event.preventDefault();
        let username = $("#login").find("input[name='username']").val();
        let password = $("#login").find("input[name='password']").val();
        if(username && password) {
            kinveyRequester.loginUser(username, password);
        }
    });

    $("#linkLogout").on('click', function (event) {
        kinveyRequester.logoutUser();
    });

    $("#create-listing").on('submit', async function () {
        event.preventDefault();
        let title = $("#create-listing").find("input[name='title']").val();
        let description = $("#create-listing").find("input[name='description']").val();
        let brand = $("#create-listing").find("input[name='brand']").val();
        let model = $("#create-listing").find("input[name='model']").val();
        let year = $("#create-listing").find("input[name='year']").val();
        let imageUrl = $("#create-listing").find("input[name='imageUrl']").val();
        let fuel = $("#create-listing").find("input[name='fuelType']").val();
        let price = $("#create-listing").find("input[name='price']").val();
        let seller = sessionStorage.getItem('username');
        if(title.length > 33){
            showError("The title should not exceed 33 characters!");
        }else if(description.length < 30 || description.length > 450){
            showError("The description should not exceed 450 characters and should be at least 30 characters long!");
        }else if(brand.length > 11 || model.length > 11 || fuel.length > 11){
            showError("The brand, model and fuel type should be less than 11 characters long!");
        }else if(model.length < 4){
            showError("The model should be at least 4 characters long!");
        }else if(year.length < 4 || year.length > 4){
            showError("The year should be 4 characters long!");
        }else if(price.length > 1000000){
            showError("The price must not exceed 1,000,000$!");
        }else if(!imageUrl.startsWith('http')){
            showError("The image url is not correct and should start with 'http'!");
        }else if(!title || !description || !brand || !imageUrl || !model || !year || !fuel || !price){
            showError("The input fields should not be empty!");
        }else{
            title.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            description.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            brand.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            brand.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            year.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            fuel.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            price.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

            kinveyRequester.createCar(title, description, brand, model, year, imageUrl, fuel, price, seller);
            hideAllViews();
            let cars = await kinveyRequester.getAllListings();
            renderAllCars(cars);
            $("#car-listings").show();
        }
    });

    $("#edit-listing").on('submit', function () {
        event.preventDefault();
        let title = $("#edit-listing").find("input[name='title']").val();
        let description = $("#edit-listing").find("input[name='description']").val();
        let brand = $("#edit-listing").find("input[name='brand']").val();
        let model = $("#edit-listing").find("input[name='model']").val();
        let year = $("#edit-listing").find("input[name='year']").val();
        let imageUrl = $("#edit-listing").find("input[name='imageUrl']").val();
        let fuel = $("#edit-listing").find("input[name='fuelType']").val();
        let price = $("#edit-listing").find("input[name='price']").val();
        let seller = sessionStorage.getItem('username');
        let id = $("#edit-listing").attr('carId');
        if(title.length > 33){
            showError("The title should not exceed 33 characters!");
        }else if(description.length < 30 || description.length > 450){
            showError("The description should not exceed 450 characters and should be at least 30 characters long!");
        }else if(brand.length > 11 || model.length > 11 || fuel.length > 11){
            showError("The brand, model and fuel type should be less than 11 characters long!");
        }else if(model.length < 4){
            showError("The model should be at least 4 characters long!");
        }else if(year.length < 4 || year.length > 4){
            showError("The year should be 4 characters long!");
        }else if(price.length > 1000000){
            showError("The price must not exceed 1,000,000$!");
        }else if(!imageUrl.startsWith('http')){
            showError("The image url is not correct and should start with 'http'!");
        }else if(!title || !description || !brand || !imageUrl || !model || !year || !fuel || !price){
            showError("The input fields should not be empty!");
        }else{
            title.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            description.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            brand.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            brand.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            year.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            fuel.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            price.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            kinveyRequester.editCar(id, title, description, brand, model, year, imageUrl, fuel, price, seller);
        }
    });

}