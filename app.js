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
    if (localStorage.getItem('book') !== '[]') {
      const storage = JSON.parse(localStorage.getItem('book'));
      storage.forEach((element) => {
        this.lenght = count;
        const newDiv = document.createElement('div');
        let itemTitle = element.title;
        let itemAuthor = element.author;
        if (element.title === '') {
          itemTitle = 'Title';
        }
        if (element.author === '') {
          itemAuthor = 'Author';
        }
        const newUl = document.createElement('ul');
        const liTitle = document.createElement('li');
        liTitle.innerHTML = `"${itemTitle}"`;
        newUl.appendChild(liTitle);
        const liby = document.createElement('li');
        liby.textContent = 'by';
        newUl.appendChild(liby);
        const liAuthor = document.createElement('li');
        liAuthor.textContent = itemAuthor;
        newUl.appendChild(liAuthor);
        newDiv.appendChild(newUl);
        const newButton = document.createElement('button');
        newButton.innerHTML = 'Remove';
        newButton.setAttribute('class', 'button-remove');
        newButton.setAttribute('id', count);
        newDiv.appendChild(newButton);
        newDiv.classList.add('books-div');
        if (this.lenght % 2 === 0) {
          newDiv.classList.add('bg-gray');
        } else {
          newDiv.classList.add('bg-white');
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
    } else {
      const newDiv = document.createElement('div');
      const itemTitle = 'Example book';
      const itemAuthor = 'Example author.  This is an example text that will be deleted when you add a book ';
      const newUl = document.createElement('ul');
      const liTitle = document.createElement('li');
      liTitle.innerHTML = `"${itemTitle}"`;
      newUl.appendChild(liTitle);
      const liby = document.createElement('li');
      liby.textContent = 'by';
      newUl.appendChild(liby);
      const liAuthor = document.createElement('li');
      liAuthor.textContent = itemAuthor;
      newUl.appendChild(liAuthor);
      newDiv.appendChild(newUl);
      const newButton = document.createElement('button');
      newButton.innerHTML = 'Remove';
      newButton.setAttribute('class', 'button-remove');
      newButton.setAttribute('id', count);
      newDiv.appendChild(newButton);
      newDiv.classList.add('books-div');
      newDiv.classList.add('bg-gray');
      booksHolder.appendChild(newDiv);
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

const date = document.querySelector('.date');

function displayTime() {
  const currentDate = new Date();
  date.textContent = currentDate;
}

setInterval(displayTime, 1000);

const liList = document.querySelector('.a-list');
const liAdd = document.querySelector('.a-add');
const liContact = document.querySelector('.a-contact');
const sectionList = document.querySelector('.list');
const sectionAdd = document.querySelector('.add');
const sectionContact = document.querySelector('.contact');

liList.addEventListener('click', () => {
  liList.style.color = 'rgb(26, 111, 126)';
  liAdd.style.color = 'black';
  liContact.style.color = 'black';
  sectionList.classList.remove('hide');
  sectionAdd.classList.add('hide');
  sectionContact.classList.add('hide');
});

liAdd.addEventListener('click', () => {
  liAdd.style.color = 'rgb(26, 111, 126)';
  liList.style.color = 'black';
  liContact.style.color = 'black';
  sectionList.classList.add('hide');
  sectionAdd.classList.remove('hide');
  sectionContact.classList.add('hide');
});

liContact.addEventListener('click', () => {
  liContact.style.color = 'rgb(26, 111, 126)';
  liList.style.color = 'black';
  liAdd.style.color = 'black';
  sectionList.classList.add('hide');
  sectionAdd.classList.add('hide');
  sectionContact.classList.remove('hide');
});

window.addEventListener('load', () => {
  library1.construc();
  liList.style.color = 'rgb(26, 111, 126)';
  liAdd.style.color = 'black';
  liContact.style.color = 'black';
  sectionList.classList.remove('hide');
  sectionAdd.classList.add('hide');
  sectionContact.classList.add('hide');
});