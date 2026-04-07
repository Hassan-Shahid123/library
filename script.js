const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

const container = document.querySelector('.books-container');

function displayBooks() {
    container.innerHTML = "";
    for(const book of myLibrary) {
        const card = document.createElement('div');
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const read = document.createElement('div');
        const removeBtn = document.createElement('button');

        title.textContent = 'Title: ' + book.title;
        author.textContent = 'Author: ' + book.author;
        pages.textContent = 'Pages: ' + book.pages;
        read.textContent = 'Read: ' + book.read;
        removeBtn.textContent = 'Remove';

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(removeBtn);

        removeBtn.classList.add('remove-btn');
        card.classList.add('card');

        card.dataset.id = book.id;

        container.appendChild(card);

        removeBtn.addEventListener("click", (e) => {
            const index = e.target.parentElement.dataset.id;
            myLibrary.splice(index, 1);
            displayBooks();
        });
    }
}

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
    event.preventDefault();
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());
    dialog.close(JSON.stringify(entries));
});

dialog.addEventListener("close", () => {
    if(!dialog.returnValue) return;

    const book = JSON.parse(dialog.returnValue);
    addBookToLibrary(book.title, book.author, book.pages, book.read);
    displayBooks();
});

addBookToLibrary("A Land", "Hassan", 100, true);
addBookToLibrary("Woods", "Umer", 200, false);
addBookToLibrary("Habits", "Saad", 75, false);

displayBooks();