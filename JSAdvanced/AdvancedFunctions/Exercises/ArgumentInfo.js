function result(...arguments) {
    let map = new Map();
    for (let obj of arguments) {
        let type = typeof obj;
        if(!map.has(type)){
            map.set(type, 0);
        }
        map.set(type, map.get(type) + 1);

        console.log(type + ": " + obj)
    };
    let arr = Array.from(map.keys()).sort((a, b) => map.get(b) - map.get(a));
    for (let obj of arr) {
        console.log(`${obj} = ${map.get(obj)}`)
    }
}

//result('cat', 42, function () { console.log('Hello world!'); });
result({ name: 'bob'}, 3.333, 9.999);