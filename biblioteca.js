let books=[];
let nextId= 1;
let borrowedBooks = new Map();

function createbook(title,author,genre,isbn){
    return {
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

function borrowBook(books, id, borrowerName) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        let book = books[index];

        if (!book.isAvailable) {
            return `El libro "${book.title}" ya está prestado a ${book.borrowedBy}.`;
        }

        book.isAvailable = false;
        book.borrowedBy = borrowerName;
        book.borrowedAt = new Date();
        
        // ejemplo: 15 días de préstamo
        const due = new Date();
        due.setDate(due.getDate() + 15);
        book.dueDate = due;

        return `El libro "${book.title}" fue prestado a ${borrowerName}.`;
    }
    return `No se encontró el libro con id ${id}.`;
}
function returnBook(books, borrowedBooks, id) {
    
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        return "Libro no encontrado";
    }

    let book = books[index];

    if (book.isAvailable) {
        return "Hasta el momento no lo tiene nadie";
    }

    // Restaurar propiedades
    book.isAvailable = true;
    book.borrowedBy = null;
    book.borrowedAt = null;
    book.dueDate = null;

    // Calcular multa
    let fine = 0;
    let today = new Date();
    let borrowedInfo = borrowedBooks.get(id);
    if (borrowedInfo && borrowedInfo.dueDate && today > borrowedInfo.dueDate) {
        let delayDays = Math.ceil((today - borrowedInfo.dueDate) / (1000 * 60 * 60 * 24));
        fine = delayDays * 1000;
    }

    // Eliminar del Map
    borrowedBooks.delete(id);

    return `Libro devuelto. Multa: $${fine}`;
}

addToLibrary(books, "Cien Años de Soledad", "Gabriel García Márquez", "Realismo Mágico", "1234567890");
addToLibrary(books, "pepito", "yeiner", "terror", "1089088383");

console.log(books);

borrowBook(books,1,"eliana");
console.log(books)
let borrowedInfo = borrowedBooks.get(1);
borrowedInfo.dueDate = new Date("2025-08-20")
returnBook(books,borrowedBook,1)
console.log(books)