function increment(sel) {
    let selector = $(sel);
    let fragment = document.createDocumentFragment();
    let textArea = $('<textarea>');
    let button1 = $('<button>Increment</button>');
    let button2 = $('<button>Add</button>');
    let ul = $('<ul>');
    textArea.addClass('counter');
    textArea.val(0);
    textArea.attr('disabled', true);
    button1.addClass('btn');
    button1.attr('id', 'incrementBtn');
    button2.addClass('btn');
    button2.attr('id', 'addBtn');
    ul.addClass('results');

    textArea.appendTo(fragment);
    button1.appendTo(fragment);
    button2.appendTo(fragment);
    ul.appendTo(fragment);
    selector.append(fragment);
    button1.on('click', function () {
        let num = Number(textArea.val()) + 1;
        textArea.val(num);
    });
    button2.on('click', function () {
        let num = textArea.val();
        let li = $('<li>').text(num);
        ul.append(li);
    });
}