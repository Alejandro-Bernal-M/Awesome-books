/* eslint-disable max-classes-per-file */

const form = document.querySelector('.add-form');
const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const booksHolder = document.querySelector('.books-holder');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.lenght = 0;
  }

  addBook() {
    const book = new Books(formTitle.value, formAuthor.value);
    if (localStorage.getItem('book') != null) {
      const booksArray = JSON.parse(localStorage.getItem('book'));
      booksArray.push(book);
      localStorage.setItem('book', JSON.stringify(booksArray));
    } else {
      const booksArray = [];
      booksArray.push(book);
      localStorage.setItem('book', JSON.stringify(booksArray));
    }
    this.lenght += 1;
  }

  remove(index) {
    const booksArray = JSON.parse(localStorage.getItem('book'));
    booksArray.splice(index, 1);
    localStorage.setItem('book', JSON.stringify(booksArray));
    this.lenght -= 1;
  }

  construc() {
    let count = 0;
    if (localStorage.getItem('book') != null) {
      const storage = JSON.parse(localStorage.getItem('book'));
      storage.forEach((element) => {
        this.lenght += 1;
        const newDiv = document.createElement('div');
        const itemTitle = element.title;
        const itemAuthor = element.author;
        const newUl = document.createElement('ul');
        const liTitle = document.createElement('li');
        liTitle.textContent = itemTitle;
        newUl.appendChild(liTitle);
        const liby = document.createElement('li');
        liby.textContent = 'by';
        newUl.appendChild(liby);
        const liAuthor = document.createElement('li');
        liAuthor.textContent = itemAuthor;
        newUl.appendChild(liAuthor);
        newDiv.appendChild(newUl);
        const newButton = document.createElement('button');
        newButton.innerHTML = 'remove';
        newButton.setAttribute('class', 'button-remove');
        newButton.setAttribute('id', count);
        newDiv.appendChild(newButton);
        const newHr = document.createElement('hr');
        newDiv.appendChild(newHr);
        newDiv.classList.add('books-div');
        if (this.lenght % 2 === 0) {
          newDiv.classList.add('bg-white');
        } else {
          newDiv.classList.add('bg-gray');
        }
        booksHolder.appendChild(newDiv);
        count += 1;
      });
      count = 0;
      const removeButtons = document.querySelectorAll('.button-remove');
      removeButtons.forEach((element) => {
        element.addEventListener('click', (e) => {
          this.remove(e.target.id, 1);
          booksHolder.innerHTML = '';
          this.construc();
        });
      });
    }
  }
}

const library1 = new Library();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  library1.addBook();
  booksHolder.innerHTML = '';
  library1.construc();
  form.reset();
});

window.addEventListener('load', () => {
  library1.construc();
});
