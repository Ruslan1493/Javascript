let solution = (function () {

    function add(arr1, arr2) {
        let a1 = arr1[0];
        let a2 = arr1[1];
        let b1 = arr2[0];
        let b2 = arr2[1];
        let arr = [];
        arr.push(a1 + b1, a2 + b2);
        //return "[" + arr.join(", ") + "]";
        return arr;
    };

    function multiply(vec1, scalar) {
        let x = vec1[0];
        let y = vec1[1];
        let arr = [];
        arr.push(x * scalar, y * scalar);
        return arr;
    };

    function length(vec1) {
        let x = vec1[0];
        let y = vec1[1];
        let result = Math.sqrt((x * x) + (y * y));
        return result;
    };

    function dot(vec1, vec2) {
        let x1 = vec1[0];
        let y1 = vec1[1];
        let x2 = vec2[0];
        let y2 = vec2[1];
        let result = x1 * x2 + y1 * y2;
        return result;
    };

    function cross(vec1, vec2) {
        let x1 = vec1[0];
        let y1 = vec1[1];
        let x2 = vec2[0];
        let y2 = vec2[1];
        let result = x1 * y2 - y1 * x2;
        return result;
    }
    return {
        add: add,
        multiply: multiply,
        length: length,
        dot: dot,
        cross: cross,
    }
})();

// console.log(solution.add([1, 1], [1, 0]));
// console.log(solution.multiply([3.5, -2], 2));
// console.log(solution.length([3, -4]));
// console.log(solution.dot([1, 0], [0, -1]));
// console.log(solution.cross([3, 7], [1, 0]));
console.log(solution.add([5.43, -1], [1, 31]));