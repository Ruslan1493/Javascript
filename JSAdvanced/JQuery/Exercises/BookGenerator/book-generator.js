function createBook(inputSelector, inputTitle, inpAuth, inpISBNnum) {
    let bookContainer = $(inputSelector);
    let author = inpAuth;
    let title = inputTitle;
    let isbn = inpISBNnum;
    let div = $('<div>');
    div.attr('id', 'book' + bookContainer.children().length + 1);
    div.css('border', 'medium none')

    let pTitle = $('<p>');
    let pAuthor = $('<p>');
    let pIsbn = $('<p>');

    pTitle.addClass('title');
    pTitle.text(title);
    pAuthor.addClass('author');
    pAuthor.text(author);
    pIsbn.addClass('isbn');
    pIsbn.text(isbn);

    let buttonSelect = $('<button>Select</button>');
    buttonSelect.on('click', select);
    let buttonDeselect = $('<button>Deselect</button>');
    buttonDeselect.on('click', deselect);
    pTitle.appendTo(div);
    pAuthor.appendTo(div);
    pIsbn.appendTo(div);
    buttonSelect.appendTo(div);
    buttonDeselect.appendTo(div);
    bookContainer.append(div);
    function select(){
        $(this).parent().css('border', '2px solid blue');
    }
    function deselect(){
        $(this).parent().css('border', '');
    }
};