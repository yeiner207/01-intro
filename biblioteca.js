let books = [];
let nextId = 1;
let borrowedBooks = new Map();

/**
 * 1. Crear libro
 */
function createBook(title, author, genre, isbn) {
    return {
        id: nextId++,
        title,
        author,
        genre,
        isbn,
        isAvailable: true,
        borrowedBy: null,
        borrowedAt: null,
        dueDate: null,
        createdAt: new Date().toDateString()
    };
}

/**
 * 2. Agregar libro
 */
function addBookToLibrary(booksArray, title, author, genre, isbn) {
    const newBook = createBook(title, author, genre, isbn);
    booksArray.push(newBook);
    return newBook;
}

/**
 * 3. Eliminar libro
 */
function removeBookFromLibrary(books, id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        return books.splice(index, 1)[0];
    }
    return null;
}

/**
 * 4. Prestar libro
 */
function borrowBook(books, borrowedBooks, bookId, borrowerName, days = 14) {
    const book = books.find(b => b.id === bookId);
    if (!book) {
        return { success: false, message: "Libro no encontrado" };
    }
    if (!book.isAvailable) {
        return { success: false, message: `El libro ya está prestado a ${book.borrowedBy}` };
    }

    book.isAvailable = false;
    book.borrowedBy = borrowerName;
    book.borrowedAt = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);
    book.dueDate = dueDate;

    borrowedBooks.set(bookId, book);

    return { success: true, message: `El libro "${book.title}" fue prestado.`, book, dueDate };
}

/**
 * 5. Devolver libro
 */
function returnBook(books, borrowedBooks, bookId, fineRate = 1000) {
    const book = books.find(b => b.id === bookId);
    if (!book) return { success: false, message: "Libro no encontrado", fine: 0 };

    if (book.isAvailable) return { success: false, message: "El libro no estaba prestado", fine: 0 };

    // calcular multa
    let fine = calculateFine(book.dueDate, fineRate);

    // restaurar
    book.isAvailable = true;
    book.borrowedBy = null;
    book.borrowedAt = null;
    book.dueDate = null;

    borrowedBooks.delete(bookId);

    return { success: true, message: "Libro devuelto", fine };
}

/**
 * 6. Calcular multa
 */
function calculateFine(dueDate, fineRate = 1000) {
    const today = new Date();
    if (!dueDate || today <= dueDate) return 0;
    const delayDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
    return delayDays * fineRate;
}

/**
 * 7. Buscar libros
 */
function searchBooks(books, criteria) {
    const lower = criteria.toLowerCase();
    return books.filter(book =>
        book.title.toLowerCase().includes(lower) ||
        book.author.toLowerCase().includes(lower) ||
        book.genre.toLowerCase().includes(lower)
    );
}

