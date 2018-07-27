function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);
    let sumQuantities = 0;
    let pricesSum = 0;
    let res = function() {
        let sel = $(selector).html(form);
        let submit = $('#submit');
        submit.on('click', function () {
            let price = $('#price');
            let quantity = $('#quantity');
            if (price.val().trim() !== '' && quantity.val().trim() !== '') {
                let currentCap = $('#capacity');
                let sumOutput = $('#sum');
                pricesSum += Number(price.val());
                sumOutput.val(pricesSum)
                let inventory = $('.display');
                let li = $('<li>');
                if(sumQuantities + Number(quantity.val()) < 150){
                    sumQuantities += Number(quantity.val());
                    currentCap.val(sumQuantities);
                }else {
                    sumQuantities += Number(quantity.val());
                    currentCap.val('full');
                    currentCap.addClass("fullCapacity");
                    $(productInput).prop('disabled', true);
                    price.prop('disabled', true);
                    quantity.prop('disabled', true);
                    submit.prop('disabled', true);
                }
                li.text(`Product: ${productInput.val()} Price: ${price.val()} Quantity: ${quantity.val()}`);
                inventory.append(li);
            }
            productInput.val('');
            price.val(1);
            quantity.val(1);
        });
        let productInput = $(sel).find('.custom-select');
        $(productInput).keyup(function () {

            if (productInput.val().trim() !== '' && productInput.val() !== ' ') {
                $(submit).removeAttr('disabled');

            } else {
                $(submit).attr('disabled', 'disabled');
            }
        });
    }
    res();

}
