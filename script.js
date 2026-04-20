const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

const container = document.querySelector('.books-container');

function displayBooks() {
    container.innerHTML = "";
    for (const book of myLibrary) {
        const card = document.createElement('div');
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const read = document.createElement('div');
        const removeBtn = document.createElement('button');
        const toggleBtn = document.createElement('button');

        title.textContent = 'Title: ' + book.title;
        author.textContent = 'Author: ' + book.author;
        pages.textContent = 'Pages: ' + book.pages;

        const hasRead = book.read ? 'read' : 'not read';
        read.textContent = 'Read: ' + hasRead;
        removeBtn.textContent = 'Remove';
        toggleBtn.textContent = 'Toggle Read';

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(toggleBtn);
        card.appendChild(removeBtn);

        read.classList.add('read-status');
        toggleBtn.classList.add('toggle-btn');
        removeBtn.classList.add('remove-btn');
        card.classList.add('card');

        card.dataset.id = book.id;

        container.appendChild(card);
    }
}

container.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    const bookID = e.target.parentElement.dataset.id;
    if (button.classList.contains('toggle-btn')) {
        let targetBook = myLibrary.find(b => b.id === bookID);
        targetBook.toggleRead();
        const hasRead = targetBook.read ? 'read' : 'not read';

        const card = e.target.closest('.card');
        card.querySelector('.read-status').textContent = 'Read: ' + hasRead;
    }

    if (button.classList.contains('remove-btn')) {
        let index = myLibrary.findIndex(b => b.id === bookID);
        myLibrary.splice(index, 1);
        displayBooks();
    }
});

const newBtn = document.querySelector('#new-btn');
const dialog = document.querySelector('#book-dialog');
const form = document.querySelector('#book-form');
const addBtn = document.querySelector('#add-btn');
const cancelBtn = document.querySelector('#cancel-btn');

cancelBtn.addEventListener('click', () => {
    dialog.close();
});

newBtn.addEventListener("click", () => {
    form.reset();
    dialog.returnValue = "";
    dialog.showModal();
});

addBtn.addEventListener("click", (event) => {
    if (!form.reportValidity()) return;
    event.preventDefault();
    const formData = new FormData(form);
    console.log(formData);
    const entries = Object.fromEntries(formData.entries());
    console.log(entries);
    dialog.close(JSON.stringify(entries));
});

dialog.addEventListener("close", () => {
    if (!dialog.returnValue) return;

    const book = JSON.parse(dialog.returnValue);
    addBookToLibrary(book.title, book.author, book.pages, book.read);
    displayBooks();
});

addBookToLibrary("A Land", "Hassan", 100, true);
addBookToLibrary("Woods", "Umer", 200, false);
addBookToLibrary("Habits", "Saad", 75, false);

displayBooks();