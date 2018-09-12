function attachEvents(){
    let buttonSubmit = $("#submit");
    let forecast = $("#forecast");
    const URL_Location = "https://judgetests.firebaseio.com/locations.json";
    let URL_Today_Code = "https://judgetests.firebaseio.com/forecast/today/";
    let URL_Upcoming_Code = "https://judgetests.firebaseio.com/forecast/upcoming/";
    buttonSubmit.on('click', function () {
        forecast.empty();
        let location = $("#location").val();
        $.ajax({
            method: "GET",
            url:URL_Location,
        }).then(function (res) {
            let locationFound = false;
            for (let obj of res) {
                if(obj.name === location){
                    locationFound = true;
                    break;
                }
            }
            if(locationFound){
                let code = res.find(x=>x.name === location).code;
                let forecastCurrent = $("#forecast");
                //Current info
                $.ajax({
                    method: "GET",
                    url:URL_Today_Code + code + ".json",
                }).then(function (res) {
                    $("#forecast").show();
                    let symbol = selectSymbol(res.forecast.condition);
                    let spanSymbol = $(`<span class="condition symbol">${symbol}</span>`);
                    let divCurrent = $(`<div id="current"></div>`);
                    let label1 = $(`<div class="label">Current conditions</div>`);
                    let spanCondition = $(`<span class="condition"></span>`);
                    let forecastData1 = $(`<span class="forecast-data">${res.name}</span>`);
                    let forecastData2 = $(`<span class="forecast-data">${res.forecast.low}/${res.forecast.high}</span>`);
                    let forecastData3 = $(`<span class="forecast-data">${res.forecast.condition}</span>`);
                    divCurrent.append(label1);
                    divCurrent.append(spanSymbol);
                    spanCondition.append(forecastData1);
                    spanCondition.append(forecastData2);
                    spanCondition.append(forecastData3);
                    divCurrent.append(spanCondition);
                    forecastCurrent.append(divCurrent);
                }).catch(function (err) {
                    forecast.append("Error");
                });
                //Upcoming info
                $.ajax({
                    method: "GET",
                    url:URL_Upcoming_Code + code + ".json",
                }).then(function (res) {
                    console.log("upcom");
                    $("#forecast").show();
                    let symbol = selectSymbol(res.forecast.condition);
                    let divUpcoming = $(`<div id="upcoming"></div>`);
                    let label2 = $(`<div class="label">Three-day forecast</div>`);
                    divUpcoming.append(label2);
                    for (let obj of res.forecast) {
                        let spanClass = $("<span class='upcoming'></span>");
                        let spanSymbol = $(`<span class="symbol">${selectSymbol(obj.condition)}</span>`);
                        let forecastData1 = $(`<span class="forecast-data">${obj.low}/${obj.high}</span>`);
                        let forecastData2 = $(`<span class="forecast-data">${obj.condition}</span>`);
                        spanClass.append(spanSymbol);
                        spanClass.append(forecastData1);
                        spanClass.append(forecastData2);
                        divUpcoming.append(spanClass);
                        forecastCurrent.append(divUpcoming);
                    }
                }).catch(function (err) {
                    forecast.append("Error");
                });
            }else{
                forecast.append("Error");
            }
        }).catch(function (err) {
            forecast.append("Error");
        })
    })
    function selectSymbol(condition) {
        switch(condition) {
            case "Sunny":
                return '&#x2600';
                break;
            case "Partly sunny":
                return '&#x26C5';
                break;
            case "Overcast":
                return '&#x2601';
                break;
            case "Rain":
                return '&#x2614';
                break;
            case "Degrees":
                return '&#176';
                break;
        }
    }
}