let books=[];
function createbook(title,author,genre,isbn){
    return {
        a
        id : Date.now(),
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

addToLibrary(books, "Cien Años de Soledad", "Gabriel García Márquez", "Realismo Mágico", "1234567890");

console.log(books);
addToLibrary(books, "pepito", "yeiner", "terror", "1089088383");

console.log(books);