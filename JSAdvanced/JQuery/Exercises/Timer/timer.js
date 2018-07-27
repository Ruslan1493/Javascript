function timer() {
    let interval;
    let sec = 0;
    let buttonStart = $('#start-timer').on('click', function(){
        if(interval.) {
            interval = setInterval(function () {
                let hours = Math.floor(sec / 60 / 60);
                let minutes = Math.trunc(sec / 60);
                let seconds = sec % 60;
                $('#hours').text(hours < 10 ? '0' + hours : hours);
                $('#minutes').text(minutes < 10 ? '0' + minutes : minutes);
                $('#seconds').text(seconds < 10 ? '0' + seconds : seconds);
                sec++;
            }, 1000);
        }
    });
    let buttonStop = $('#stop-timer').on('click', function(){
        clearInterval(interval);
    });
}
