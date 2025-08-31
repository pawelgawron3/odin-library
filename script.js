let library = [];

const addBook = document.querySelector("#addBook");
const suggestBook = document.querySelector("#suggestBook");
const removeAllBooks = document.querySelector("#removeAllBooks");

const suggestedBookDialog = document.querySelector("#suggestedBookDialog");
const closeDialogBtn = document.querySelector("button#closeDialog");

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

Book.prototype.changeReadStatus = function () {
  let status = this.hasBeenRead;
  this.hasBeenRead = status === "Yes" ? "No" : "Yes";
  displayBooks(library);
};

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
    deleteBookBtn.title = "Delete this book";

    let trashIcon = document.createElement("i");
    trashIcon.className = "mdi mdi-delete";

    deleteBookBtn.appendChild(trashIcon);

    div.appendChild(deleteBookBtn);

    let changeReadStatusBtn = document.createElement("button");
    changeReadStatusBtn.type = "button";
    changeReadStatusBtn.title = "Change the 'read' status";

    let eyeIcon = document.createElement("i");
    eyeIcon.className = "mdi mdi-eye-circle-outline";

    changeReadStatusBtn.appendChild(eyeIcon);

    div.appendChild(changeReadStatusBtn);

    deleteBookBtn.addEventListener("click", () => {
      main.removeChild(div);

      library = library.filter((b) => b.id !== book.id);
    });

    changeReadStatusBtn.addEventListener("click", () => {
      book.changeReadStatus();
    });

    main.appendChild(div);
  });
}

suggestBook.addEventListener("click", () => {
  suggestedBookDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  suggestedBookDialog.close();
});

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
