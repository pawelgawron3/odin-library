let library = [];

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
