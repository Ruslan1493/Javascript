function initializeTable() {
    $('#createLink').on('click', createCountry);
    addCountry("Bulgaria", "Sofia");
    addCountry("Germany", "Berlin");
    addCountry("Russia", "Moscow");
    changeButtons();

    function addCountry(country, town) {
        let tableRow = $('<tr>')
            .append(`<td>${country}</td>`)
            .append(`<td>${town}</td>`)
            .append($('<td>')
                .append($('<a href="#">[Up]</a>').on('click', moveUp))
                .append($('<a href="#">[Down]</a>').on('click', moveDown))
                .append($('<a href="#">[Delete]</a>').on('click', deleteRow))
            );

        $('#countriesTable').append(tableRow);
        //changeButtons();
    }

    function moveUp() {
        $(this).parent().parent().insertBefore($(this).prev());
        changeButtons();
    }

    function moveDown() {
        $(this).parent().parent().insertAfter($(this).next());
        changeButtons();
    }

    function deleteRow() {
        $(this).parent().parent().remove();
        changeButtons();
    }

    function createCountry() {
        let country = $('#newCountryText');
        let town = $('#newCapitalText');
        addCountry(country.val(), town.val());
        country.val('');
        town.val('');
        changeButtons();
    }

    function changeButtons() {
        $('#countriesTable a').css('display', '');
        $('#countriesTable tr:eq(2) a:contains("Up")').css('display', 'none');
        $('#countriesTable tr:last a:contains("Down")').css('display', 'none');
    }
};
