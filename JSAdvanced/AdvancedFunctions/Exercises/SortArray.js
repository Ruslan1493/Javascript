function solve(arr, sortMethod){
    if(sortMethod === "asc"){
        arr.sort((a,b) =>  a- b);
    }else{
        arr.sort((a,b) =>  b - a);
    }
    return arr;
}
solve([14, 7, 17, 6, 8], 'des');