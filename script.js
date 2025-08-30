let main = document.querySelector("main");

let library = [
  {
    id: crypto.randomUUID(),
    title: "Wiedźmin",
    author: "Andrzej Sapkowski",
    pages: 350,
    hasBeenRead: "true",
  },
  {
    id: crypto.randomUUID(),
    title: "Zbrodnia i kara",
    author: "Fiodor Dostojewski",
    pages: 600,
    hasBeenRead: "false",
  },
];

function Book(title, author, pages, hasBeenRead) {
  if (!target.new) {
    throw console.error("Only with 'new' keyword!");
  } else {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
    this.id = crypto.randomUUID();
  }
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
  let book = new Book(title, author, pages, hasBeenRead);
  library.push(book);
}

function displayBooks(booksArray) {
  booksArray.forEach((book) => {
    let div = document.createElement("div");
    div.id = book.id;
    div.style.backgroundColor = "#9580ff";
    div.style.padding = "10px";

    for (let i = 0; i < 4; i++) {
      let p = document.createElement("p");
      p.style.color = "whitesmoke";

      switch (i) {
        case 0:
          p.className = "title";
          p.textContent = book.title;
          break;

        case 1:
          p.className = "author";
          p.textContent = book.author;
          break;

        case 2:
          p.className = "pages";
          p.textContent = book.pages;
          break;

        case 3:
          p.className = "hasBeenRead";
          p.textContent = book.hasBeenRead;
          break;
      }
      div.appendChild(p);
    }

    main.appendChild(div);
  });
}
