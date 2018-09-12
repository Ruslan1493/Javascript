$(document).on('ajaxStart', function () {
    $("#loadingBox").show();
});

$(document).on('ajaxStop', function () {
    $("#loadingBox").hide();
});

function showInfo(message){
    $("#infoBox > span").text(message);
    $("#infoBox").show();
    setTimeout(function () {
        $("#infoBox").hide();
    }, 3000)

}

function showError(message){
    $("#errorBox > span").text(message);
    $("#errorBox").show();
    setTimeout(function () {
        $("#errorBox").hide();
    }, 3000)
}

function attachBoxesEvents() {
    $("#infoBox").on('click', function () {
        $("#infoBox").hide();
    });
    $("#errorBox").on('click', function () {
        $("#errorBox").hide();
    });
}