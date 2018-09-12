function attachButtonsEvents(id) {
    $('#removeBtn').click(function (target) {
        target.preventDefault();
    });
    requester.deleteTraining(id);

    $('#loading').click(function (target) {
        target.preventDefault();
        $('#loading').hide();
    })
};