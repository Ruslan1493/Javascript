class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.shelf = [];
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelfCapacity = shelfCapacity;

    }
    get shelf(){
        return this._shelf;
    }
    set shelf(val){
        this._shelf = [];
    }
    get shelfCondition(){
        return this.shelfCapacity - this.shelf.length;
    }
    set room(val) {
        if (val !== 'livingRoom' && val !== 'bedRoom' && val !== 'closet') {
            throw new Error(`Cannot have book shelf in ${val}`);
        }
        this._room = val;

    }
    get room() {
        return this._room;

    }
    addBook(bookName, bookAuthor) {
        if (this.shelf.length < this.shelfCapacity) {
            if (arguments[2]) {
                this.shelf.push(
                    {
                        bookName: bookName,
                        bookAuthor: bookAuthor,
                        genre: arguments[2],
                    }
                );
            }else{
                this.shelf.push(
                    {
                        bookName: bookName,
                        bookAuthor: bookAuthor,
                    }
                );
            }
        }else{
            this.shelf.shift();
            if (arguments[2]) {
                this.shelf.push(
                    {
                        bookName: bookName,
                        bookAuthor: bookAuthor,
                        genre: arguments[2],
                    }
                );
            }else{
                this.shelf.push(
                    {
                        bookName: bookName,
                        bookAuthor: bookAuthor,
                    }
                );
            }
        }
        this.shelf.sort((a,b) => a.bookAuthor.localeCompare(b.bookAuthor));


        return this;
    }
    throwAwayBook(bookName){
        for (var i = 0; i < this.shelf.length; i++) {
            if(this.shelf[i].bookName === bookName){
                this.shelf.splice(i, 1);
            }
        }

    }
    showBooks(genre){
        let result = `Results for search "${genre}":`;
        for (let book of this.shelf) {
            if(book.genre === genre){
                result += `\n\uD83D\uDCD6 ${book.bookAuthor} - "${book.bookName}"`;
            }
        }
        return result;
    }
    toString(){
        if(this.shelf.length === 0){
            return "It's an empty shelf";
        }
        this.shelf.sort((a,b) => a.bookAuthor.localeCompare(b.bookAuthor));
        let result = `\"${this.shelfGenre}\" shelf in ${this._room} contains:`;
        for (let book of this.shelf) {
            result += `\n\uD83D\uDCD6 \"${book.bookName}\" - ${book.bookAuthor}`;
        }
        return result;
    }
}

let bedRoom = new BookCollection('Mixed', 'bedRoom', 5);
bedRoom.addBook("John Adams", "David McCullough", "history");
bedRoom.addBook("The Guns of August", "Cuentos para pensar", "history");
bedRoom.addBook("Atlas of Remote Islands", "Judith Schalansky");
bedRoom.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");
console.log("Shelf's capacity: " + bedRoom.shelfCondition);
console.log(bedRoom.showBooks("history"));
bedRoom.throwAwayBook('John Adams');
bedRoom.throwAwayBook('The Guns of August');
bedRoom.throwAwayBook('Paddle-to-the-Sea');
bedRoom.throwAwayBook('Atlas of Remote Islands');
bedRoom.throwAwayBook('Atlas of Remote Islands');
console.log(bedRoom.toString());