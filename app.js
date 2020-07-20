// Book Class: Representation of a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

// UI Class: for handling UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '919182'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '019238'
            }
        ];

        const books = StoredBooks;

        // Iterates through the books variable and adds each book
        // item to the list in the view
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        // The `` quotes are needed to append html content to the page
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        // Append the created row to the list
        list.appendChild(row);
    }
}

// Store Class: for handling data storage
// Event: for displaying books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: add a book
// Event: remove a book