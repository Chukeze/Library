class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

Book.prototype.decipherIsRead = function() {
    return this.isRead ? "Yes" : "No"
}

const bookOne = new Book('boo', 'signa', 8, false)


//UI
const DisplayLibrary = (book, index) => {
    const bookContainer = document.querySelector('.library');
    let bookCard = document.createElement('div');
    bookCard.className = 'book';
    bookCard.dataset.id = index;

    let title = document.createElement('p');
    title.className = 'title';
    let author = document.createElement('p');
    author.className = 'author';
    let pages = document.createElement('p');
    pages.className = 'pages';
    let read = document.createElement('p');
    read.className = 'read';

    title.textContent =`Title: ${book.title}`
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `# of Pages: ${book.pages}`;
    read.textContent = `Read: ${(book.isRead == false) ? "No" : book.decipherIsRead() }`;

    let actionContainers = document.createElement('div');
    actionContainers.className = 'actioncontainer'

    let removeBookButton = document.createElement('button');
    removeBookButton.id = 'remove';
    removeBookButton.textContent = 'Remove';

    removeBookButton.addEventListener('click', (e) => {
        let bookIndex = e.target.parentElement.parentElement.dataset.id;
        console.log(bookIndex);
        library.removeBookFromLibrary(bookIndex)
    });

    // Toggle
    let toggle = document.createElement('label')
    toggle.className = 'switch';
    let toggleSwitch = document.createElement('input')
    toggleSwitch.type = 'checkbox';
    toggleSwitch.className = 'toggleSwitch';
    toggleSwitch.dataset.state = 'off'
    let slider = document.createElement('span');
    slider.className = 'slider';
    toggle.append(toggleSwitch,slider);
    actionContainers.append(removeBookButton, toggle);

    toggleSwitch.addEventListener('change', () => {
        book.isRead = toggleSwitch.checked;
        read.textContent = `Read: ${book.decipherIsRead()}`;
        toggleSwitch.dataset.state = ((toggleSwitch.checked ? "on" : "off") || (toggleSwitch.dataset.state === "off" ? "on" : "off") || (book.decipherIsRead() === "Yes" ? "on" : "off"));
        console.log(toggleSwitch.checked, toggleSwitch.value)
    })
    //toggleSwitch.checked ? bookOne.decipherIsRead(true) : bookOne.decipherIsRead(false);

    bookCard.append(title, author, pages, read, actionContainers);
    bookContainer.appendChild(bookCard);
}

class Library {
    constructor(){
        this.library = [];
    }

    addBookToLibrary (book) {
        this.library.push(book);
        DisplayLibrary(book, this.library.length - 1);
    }

    removeBookFromLibrary(idx) {
        if(idx !== -1){
            this.library.splice(idx, 1);
            const bookCard = document.querySelector(`.book[data-id="${idx}"]`);
            bookCard.remove();
        }
        console.log(library.library)
    }
}

const library = new Library();

//Create a book Object whenever a user submit the request to add the book and then add the book to library
const openForm = document.getElementById('openForm');
const closeForm = document.getElementById('closeForm');

//console.log(removeBookButton)

library.addBookToLibrary(bookOne)


const handleForm = {
    display: openForm.addEventListener('click', () => {
                document.querySelector('.hidden').classList.remove('hidden');
            
                const addBookForm = document.querySelector('form');
                addBookForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    let bookTitle = document.getElementById('title').value;
                    let bookAuthor = document.getElementById('author').value;
                    let bookPages = document.getElementById('pages').value;
                    let bookRead = document.getElementById('read').checked;
                    const book =  new Book(bookTitle,bookAuthor,bookPages, bookRead);                    
                    library.addBookToLibrary(book);
                    if(bookRead.checked){
                        return document.querySelector(`.toggleSwitch[data-state="off"]`).dataset.state="on";
                    }
                    
                    addBookForm.reset();
                });
            }),
    Hide: closeForm.addEventListener('click', () => {
            document.querySelector('article').classList.add('hidden');
        }),
}



/*

openForm.addEventListener('click', () => {
    document.querySelector('.hidden').classList.remove('hidden');

    const addBookForm = document.querySelector('form');
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let bookTitle = document.getElementById('title').value;
        let bookAuthor = document.getElementById('author').value;
        let bookPages = document.getElementById('pages').value;
        let bookRead = document.getElementById('read').value;
        const book =  new Book(bookTitle,bookAuthor,bookPages, bookRead);
        library.addBookToLibrary(book);
        addBookForm.reset();
    });
});


closeForm.addEventListener('click', () => {
    document.querySelector('article').classList.add('hidden');
});


removeBookButton.addEventListener('click', () =>{
    let bookIndex = document.querySelector('.book').dataset.id
    library.removeBookFromLibrary(bookIndex)
})

*/



/*
const bookOne = new Book('boo', 'signa', 8, false)

library.addBookToLibrary(bookOne)

*/





/* Chat GPT



const DisplayLibrary = (book, index) => {
    const bookContainer = document.querySelector('.library');
    let bookCard = document.createElement('div');
    bookCard.className = 'book';
    bookCard.dataset.id = index;

    let title = document.createElement('p');
    title.className = 'title';
    let author = document.createElement('p');
    author.className = 'author';
    let pages = document.createElement('p');
    pages.className = 'pages';
    let read = document.createElement('p');
    read.className = 'read';

    title.textContent =`Title: ${book.title}`
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `# of Pages: ${book.pages}`;
    read.textContent = `Reading: ${book.isRead}`;


    let removeBookButton = document.createElement('button');
    removeBookButton.className = 'remove';
    removeBookButton.textContent = 'Remove'

    bookCard.append(title, author, pages, read, removeBookButton);
    bookContainer.appendChild(bookCard);

}

class Library {
    constructor(){
        this.library = [];
    }

    addBookToLibrary (book) {
        this.library.push(book);
        DisplayLibrary(book, this.library.length - 1);
    }

    removeBookFromLibrary(index) {
        const bookCard = document.querySelector(`.book[data-id="${index}"]`);
        bookCard.remove();
        this.library.splice(index, 1);
    }

}

const library = new Library();

//Create a book Object whenever a user submit the request to add the book and then add the book to library

const openForm = document.getElementById('openForm');
openForm.addEventListener('click', () => {
    document.querySelector('.hidden').classList.remove('hidden');

    const addBookForm = document.querySelector('form');
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let bookTitle = document.getElementById('title').value;
        let bookAuthor = document.getElementById('author').value;
        let bookPages = document.getElementById('pages').value;
        let bookRead = document.getElementById('read').value;
        const book =  new Book(bookTitle,bookAuthor,bookPages, bookRead);
        library.addBookToLibrary(book);
        addBookForm.reset();
    });
});

const closeForm = document.getElementById('closeForm');
closeForm.addEventListener('click', () => {
    document.querySelector('article').classList.add('hidden');
});

const bookContainer = document.querySelector('.library');
bookContainer.addEventListener('click', (e) => {
    if(e.target.className === 'remove'){
        let bookIndex = e.target.parentElement.dataset.id;
        library.removeBookFromLibrary(bookIndex);
    }
})


















/////

class Book {
    constructor(title, author, pages, isRead) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.isRead = isRead;
    }
  
    decipherIsRead() {
      return this.isRead ? "Yes" : "No";
    }
  }
  
  const createNewBook = (title, author, pages, isRead) => {
    return new Book(title, author, pages, isRead);
  };
  
  const renderBook = (book, index) => {
    const bookContainer = document.querySelector(".library");
  
    let bookCard = document.createElement("div");
    bookCard.className = "book";
    bookCard.dataset.id = index;
  
    let title = document.createElement("p");
    title.className = "title";
    title.textContent = `Title: ${book.title}`;
  
    let author = document.createElement("p");
    author.className = "author";
    author.textContent = `Author: ${book.author}`;
  
    let pages = document.createElement("p");
    pages.className = "pages";
    pages.textContent = `# of Pages: ${book.pages}`;
  
    let read = document.createElement("p");
    read.className = "read";
    read.textContent = `Reading: ${book.decipherIsRead()}`;
  
    bookCard.append(title, author, pages, read);
    bookContainer.insertBefore(bookCard, openForm);
  };
  
  class Library {
    constructor() {
      this.library = [];
    }
  
    addBookToLibrary(book) {
      this.library.push(book);
      renderBook(book, this.library.length - 1);
    }
  
    removeBookFromLibrary(book) {
      const index = this.library.indexOf(book);
      if (index !== -1) {
        this.library.splice(index, 1);
        const bookCard = document.querySelector(`.book[data-id="${index}"]`);
        bookCard.remove();
      }
    }
  }
  
  const library = new Library();
  
  const openForm = document.getElementById("openForm");
  openForm.addEventListener("click", () => {
    document.querySelector(".hidden").classList.remove("hidden");
  
    const newBookForm = document.getElementById("add");
    newBookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let bookTitle = document.getElementById("title").value;
      let bookAuthor = document.getElementById("author").value;
      let bookPages = document.getElementById("pages").value;
      let bookRead = document.getElementById("read").checked;
      const book = createNewBook(bookTitle, bookAuthor, bookPages, bookRead);
      library.addBookToLibrary(book);
      newBookForm.reset();
    });
  });

*/