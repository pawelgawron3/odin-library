let library = [];

const addBook = document.querySelector("#addBook");
const suggestBook = document.querySelector("#suggestBook");
const removeAllBooks = document.querySelector("#removeAllBooks");

const dialog = document.querySelector("#addBookDialog");
const bookForm = document.querySelector("#addBookForm");
const formCancelBookBtn = dialog.querySelector("button#cancelDialog");

function Book(title, author, pages, hasBeenRead) {
  if (!new.target) {
    throw console.error("Only with 'new' keyword!");
  } else {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead ? "Yes" : "No";
    this.id = crypto.randomUUID();
  }
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
  let book = new Book(title, author, pages, hasBeenRead);
  library.push(book);
}

function displayBooks(booksArray) {
  let main = document.querySelector("main");

  main.innerHTML = "";

  booksArray.forEach((book) => {
    let div = document.createElement("div");
    div.id = book.id;
    div.className = "book-card";

    for (let i = 0; i < 4; i++) {
      let p = document.createElement("p");
      p.style.color = "whitesmoke";

      switch (i) {
        case 0:
          p.className = "title";
          p.textContent = `Title: ${book.title}`;
          break;

        case 1:
          p.className = "author";
          p.textContent = `Author: ${book.author}`;
          break;

        case 2:
          p.className = "pages";
          p.textContent = `Number of pages: ${book.pages}`;
          break;

        case 3:
          p.className = "hasBeenRead";
          p.textContent = `Read: ${book.hasBeenRead}`;
          break;
      }
      div.appendChild(p);
    }

    let deleteBookBtn = document.createElement("button");
    deleteBookBtn.type = "button";

    let i = document.createElement("i");
    i.className = "mdi mdi-delete";

    deleteBookBtn.appendChild(i);

    div.appendChild(deleteBookBtn);

    deleteBookBtn.addEventListener("click", () => {
      main.removeChild(div);

      library = library.filter((b) => b.id !== book.id);
    });

    main.appendChild(div);
  });
}

removeAllBooks.addEventListener("click", () => {
  library = [];
  displayBooks(library);
});

addBook.addEventListener("click", () => {
  dialog.showModal();
});

formCancelBookBtn.addEventListener("click", () => {
  dialog.close();
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = dialog.querySelector("#book-title").value;
  let author = dialog.querySelector("#book-author").value;
  let pages = dialog.querySelector("#book-pages").value;
  let hasBeenRead = dialog.querySelector("#book-hasBeenRead").checked;

  addBookToLibrary(title, author, pages, hasBeenRead);
  displayBooks(library);
  dialog.close();
  bookForm.reset();
});
