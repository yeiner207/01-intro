let books=[];
let nextId= 1;
function createbook(title,author,genre,isbn){
    return {
        a
        id : nextId++,
        title : title,
        author : author,
        genre : genre,
        isbn : isbn,
        isAvailable : true,
        borrowedBy: null,
        borrowedAt: null,
        dueDate: null,
        createdAt : new Date().toDateString()
    };
}

function addToLibrary(booksarray,tiitle,author,genre,isbn){
    const newbook = createbook(tiitle,author,genre,isbn);
    booksarray.push(newbook);
}

function removeBook(books,id){
    const index = books.findIndex(book => book.id === id);
    if (index !== -1){
        const removed =books.splice(index,1);
        return removed[0]
    }
    return null;
}

addToLibrary(books, "Cien Años de Soledad", "Gabriel García Márquez", "Realismo Mágico", "1234567890");
addToLibrary(books, "pepito", "yeiner", "terror", "1089088383");

console.log(books);
let removed = removeBook(books, 1);

console.log("Libro eliminado:", removed);
console.log("Biblioteca actualizada:", books);