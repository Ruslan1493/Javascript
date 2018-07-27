(function add() {
    let sum = 0;
    function increase(num) {
        sum += num;
        return increase;
    }
    increase.toString = () => {
      return sum;
    };
    return increase;

})();

//console.log(add(1)(6)(-3));
console.log(add(1)(2)(3)(10));