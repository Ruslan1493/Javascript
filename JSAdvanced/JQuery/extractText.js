function extractText() {
    let result = $('#result');
    let arr =  $('#items li').toArray().map(li => $(li).text()).join(', ');
    result.text(arr);
}
