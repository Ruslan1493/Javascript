let expect = require('chai').expect;

class Calculator {
    constructor() {
        this.expenses = [];
    }

    add(data) {
        this.expenses.push(data);
    }

    divideNums() {
        let divide;
        for (let i = 0; i < this.expenses.length; i++) {
            if (typeof (this.expenses[i]) === 'number') {
                if (i === 0 || divide===undefined) {
                    divide = this.expenses[i];
                } else {
                    if (this.expenses[i] === 0) {
                        return 'Cannot divide by zero';
                    }
                    divide /= this.expenses[i];
                }
            }
        }
        if (divide !== undefined) {
            this.expenses = [divide];
            return divide;
        } else {
            throw new Error('There are no numbers in the array!')
        }
    }

    toString() {
        if (this.expenses.length > 0)
            return this.expenses.join(" -> ");
        else return 'empty array';
    }

    orderBy() {
        if (this.expenses.length > 0) {
            let isNumber = true;
            for (let data of this.expenses) {
                if (typeof data !== 'number')
                    isNumber = false;
            }
            if (isNumber) {
                return this.expenses.sort((a, b) => a - b).join(', ');
            }
            else {
                return this.expenses.sort().join(', ');
            }
        }
        else return 'empty';
    }
}


describe("test calc class", function () {

    describe('add func', function () {
        beforeEach(function(){

        });
      it('add one number', function () {
          let calc = new Calculator();
          calc.add(1);
          let res = calc.toString();
          expect(res).to.be.equal('1');
      })
        it('add one string', function () {
            let calc = new Calculator();
            calc.add('pes');
            let res = calc.toString();
            expect(res).to.be.equal('pes');
        })
        it('add one empty string', function () {
            let calc = new Calculator();
            calc.add('');
            let res = calc.toString();
            expect(res).to.be.equal('');
        })
        it('add several empty strings', function () {
            let calc = new Calculator();
            calc.add('');
            calc.add('');
            calc.add('');
            let res = calc.toString();
            expect(res).to.be.equal(' ->  -> ');
        })
        it('add one obj', function () {
            let calc = new Calculator();
            calc.add({name: 'pesho'});
            let res = calc.toString();
            expect(res).to.be.equal('[object Object]');
        })
        it('add numbers', function () {
            let calc = new Calculator();
            calc.add(1);
            calc.add(2);
            let res = calc.toString();
            expect(res).to.be.equal('1 -> 2');
        })
        it('add num, obj, string', function () {
            let calc = new Calculator();
            calc.add(1);
            calc.add({name: 'pes'});
            calc.add('1');
            let res = calc.toString();
            expect(res).to.be.equal('1 -> [object Object] -> 1');
        })
    })
    describe('divide func', function () {
        it('arr is empty', function () {
            let calc = new Calculator();
            expect(function () {
                calc.divideNums();
            }).to.throw('There are no numbers in the array!');
        })
        it('divide several nums', function () {
            let calc = new Calculator();
            calc.add(20);
            calc.add(2);
            calc.add(2);
            calc.add(5);
            calc.divideNums();
            let res = calc.toString();
            expect(res).to.be.equal('1');
        })
        it('divide several nums with 0', function () {
            let calc = new Calculator();
            calc.add(20);
            calc.add(2);
            calc.add(0);
            calc.add(5);

            let res = calc.divideNums();
            expect(res).to.be.equal('Cannot divide by zero');
        })
        it('divide several nums with strings', function () {
            let calc = new Calculator();
            calc.add(20);
            calc.add('pes');
            calc.add(2);
            calc.add(2);
            calc.add('12');
            calc.add(5);

            let res = calc.divideNums();
            let toString = calc.toString();
            expect(res).to.be.equal(1);
            expect(toString).to.be.equal('1');
        })
        it('divide one num', function () {
            let calc = new Calculator();
            calc.add(20);
            calc.add('pes');
            calc.add('12');

            let res = calc.divideNums();
            let toString = calc.toString();
            expect(res).to.be.equal(20);
            expect(toString).to.be.equal('20');
        })
    })
    describe('toString func', function () {
        it('toString with several elements', function () {
            let calc = new Calculator();
            calc.add(20);
            calc.add('pes');
            calc.add({age: 2});
            calc.add('12');
            let toString = calc.toString();
            expect(toString).to.be.equal('20 -> pes -> [object Object] -> 12');
        })
        it('toString with several elements', function () {
            let calc = new Calculator();
            let toString = calc.toString();
            expect(toString).to.be.equal('empty array');
        })
        it('toString with one el', function () {
            let calc = new Calculator();
            calc.add('pes');
            let toString = calc.toString();
            expect(toString).to.be.equal('pes');
        })
    })
    describe('orderBy func', function () {
        it('the arr is empty', function () {
            let calc = new Calculator();
            let orderBy = calc.orderBy();
            expect(orderBy).to.be.equal('empty');
        })
        it('with one element', function () {
            let calc = new Calculator();
            calc.add('pes');
            let orderBy = calc.orderBy();
            expect(orderBy).to.be.equal('pes');
            expect(calc.toString()).to.be.equal('pes');
        })
        it('with several nums', function () {
            let calc = new Calculator();
            calc.add(14);
            calc.add(12);
            calc.add(1);
            calc.add(20);
            let orderBy = calc.orderBy();
            expect(orderBy).to.be.equal('1, 12, 14, 20');
            expect(calc.toString()).to.be.equal('1 -> 12 -> 14 -> 20');
        })
        it('with several nums and one string', function () {
            let calc = new Calculator();
            calc.add(14);
            calc.add('42');
            calc.add(1);
            calc.add(20);
            let orderBy = calc.orderBy();
            expect(orderBy).to.be.equal('1, 14, 20, 42');
            expect(calc.toString()).to.be.equal('1 -> 14 -> 20 -> 42');
        })
        it('with several nums and one  str a', function () {
            let calc = new Calculator();
            calc.add(1);
            calc.add(14);
            calc.add('a1');
            calc.add(20);
            let orderBy = calc.orderBy();
            expect(orderBy).to.be.equal('1, 14, 20, a1');
            expect(calc.toString()).to.be.equal('1 -> 14 -> 20 -> a1');
        })
        it('with several nums, str and one obj', function () {
            let calc = new Calculator();
            calc.add(1);
            calc.add(14);
            calc.add('a1');
            calc.add({name: 'pes'});
            calc.add(20);
            let orderBy = calc.orderBy();
            expect(orderBy).to.be.equal('1, 14, 20, [object Object], a1');
            expect(calc.toString()).to.be.equal('1 -> 14 -> 20 -> [object Object] -> a1');
        })
    })
});