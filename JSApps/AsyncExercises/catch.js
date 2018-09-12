function attachEvents() {
    let loadBtn = $(".load");
    loadBtn.on('click', function () {
    let auth = {"Authorization": "Basic " + "kid_rk_p99XN7"};
    });
    //:14a6268112244c5ba22b457b9cb07bf3
    let addBtn = $(".add");
    addBtn.on('click', function () {
        $.ajax({
            method: "GET",
            Authorization: {"Authorization": "Kinvey " + "kid_rk_p99XN7:14a6268112244c5ba22b457b9cb07bf3"},
            url: "https://baas.kinvey.com/appdata/kid_rk_p99XN7/biggestCatches",
        }).then(function (res) {
            console.log(res);
        })
    })
}