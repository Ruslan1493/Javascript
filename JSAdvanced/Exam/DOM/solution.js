function addSticker() {
    let textInput = $('.title').val();
    let contentInput = $('.content').val();

    if(textInput.trim() !== '' && contentInput.trim() !== ''){
        let li = $('<li class ="note-content">');
        let button = $('<a class="button">x</a>');
        $(button).on('click', function (event) {
            $(this).parent().remove();
        });
        let h2 = $(`<h2>${textInput}</h2>`);
        let hr = $('<hr>');
        let p = $(`<p>${contentInput}</p>`);
        let ulSticker = $('#sticker-list');
        li.append(button);
        li.append(h2);
        li.append(hr);
        li.append(p);
        ulSticker.append(li);
        $('.title').val('');
        $('.content').val('');
    }
}