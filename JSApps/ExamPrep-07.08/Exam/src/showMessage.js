function showInfo(message) {
    $("#infoBox > span").text(message);
    $("#infoBox").show();
    setTimeout(function () {
        $("#infoBox").hide();
    }, 3000)
}
function showError(message) {
    $("#errorBox > span").text(message);
    $("#errorBox").show();
    setTimeout(function () {
        $("#errorBox").fadeOut();
    }, 3000)
}
function showLoading() {
    if($("#loadingBox").css('display') !== 'none'){
        $("#loadingBox").hide();
    }else{
        $("#loadingBox").show()
    }
}