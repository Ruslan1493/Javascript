function loading(){
    if($("#loading").is(":hidden")){
        $("#loading").show();
    }else{
        $('#loading').hide();
    }

    setTimeout(function () {
        $('#loading').hide();
    }, 3000)
}