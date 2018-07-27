function attachEvents() {
    $('li').on('click', function () {
        if(!$(this).attr('data-selected')) {
            $(this).css('background-color', '#DDD').attr('data-selected', true);
        }else{
            console.log("dadadd");
            $(this).css('background-color', '').attr('data-selected', false);
        }
    });
    $('#showTownsButton').on('click', function () {
       let arr = [];
       let items = 'Selected towns: ' + $('#items li[data-selected=true]').toArray().map(li=>$(li).text()).join(', ');

       $('#selectedTowns').text(items);
    });
}
