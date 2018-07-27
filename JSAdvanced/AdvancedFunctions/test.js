function test () {
    console.log(this);
    function inner () {
        console.log(this);
    }
    inner();
};
let obj = {
    name: 'Rus',
    f: test,
    i: test.inner
};
obj.f();
obj.i();