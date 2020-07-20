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

    static deleteBook(el) { // element
        // if the element contains 'delete' in its class attribute
        if (el.classList.contains('delete')) {
            // get the parent element (<tr>) of the parent element (<td>) and remove it
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        // Create div element, asign class properties to it and append a text node.
        const div = document.createElement('div');
        div.className = `text-center font-weight-bold alert - alert-${className}`;
        div.appendChild(document.createTextNode(message));

        // These instructions allow the newly created div element to be inserted
        // in the container and before the book form.
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Set timeout for message for it to vanish automatically
        setTimeout(() => document.querySelector('.alert').remove(), 5000);

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: for handling data storage
class Store {
    static getBooks() {
        let books;

        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        // Get the books array.
        const books = Store.getBooks();

        // Push the new element to it.
        books.push(book);

        // Convert the books array into json.
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) { // unique value
        // Get the books array.
        const books = Store.getBooks();

        // Iterate through the array
        books.forEach((book, index), => {
            // If isbn values match, remove the element
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        // Convert the books array into json.
        localStorage.setItem('books', JSON. stringify(books));
    }
}

// Event: for displaying books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add a book
document
.querySelector('#book-form')
.addEventListener('submit', (e) => {
    // Prevent actual form submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields.', 'warning');
    } else {
        // Instantiate book
        const book = new Book(title, author, isbn);

        // Add book to list
        UI.addBookToList(book);

        // Clear the form fields
        UI.clearFields();

        // Show success message
        UI.showAlert('Book added', 'success');
    }
});

// Event: remove a book
document
.querySelector('#book-list')
.addEventListener('click', (e) => {
    // Delete book
    UI.deleteBook(e.target);

    // Show success message
    UI.showAlert('Book removed', 'success');
})
