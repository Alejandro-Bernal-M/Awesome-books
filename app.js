function CreateBook(title, author) {
  this.title = title;
  this.author = author;
}
function remove(index) {
  const booksArray = JSON.parse(localStorage.getItem('book'));
  booksArray.splice(index, 1);
  localStorage.setItem('book', JSON.stringify(booksArray));
}
const booksHolder = document.querySelector('.books-holder');
function construc() {
  let count = 0;
  if (localStorage.getItem('book') != null) {
    const storage = JSON.parse(localStorage.getItem('book'));
    storage.forEach((element) => {
      const itemTitle = element.title;
      const itemAuthor = element.author;
      const newUl = document.createElement('ul');
      const liTitle = document.createElement('li');
      liTitle.textContent = itemTitle;
      newUl.appendChild(liTitle);
      const liAuthor = document.createElement('li');
      liAuthor.textContent = itemAuthor;
      newUl.appendChild(liAuthor);
      booksHolder.appendChild(newUl);
      const newButton = document.createElement('button');
      newButton.innerHTML = 'remove';
      newButton.setAttribute('class', 'button-remove');
      newButton.setAttribute('id', count);
      booksHolder.appendChild(newButton);
      const newHr = document.createElement('hr');
      booksHolder.appendChild(newHr);
      count += 1;
    });
    count = 0;
  }
  const removeButtons = document.querySelectorAll('.button-remove');
  removeButtons.forEach((element) => {
    element.addEventListener('click', (e) => {
      remove(e.target.id, 1);
      booksHolder.innerHTML = '';
      construc();
    });
  });
}

const form = document.querySelector('.add-form');
const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
function addBook(book) {
  if (localStorage.getItem('book') != null) {
    const booksArray = JSON.parse(localStorage.getItem('book'));
    booksArray.push(book);
    localStorage.setItem('book', JSON.stringify(booksArray));
  } else {
    const booksArray = [];
    booksArray.push(book);
    localStorage.setItem('book', JSON.stringify(booksArray));
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newBook = new CreateBook(formTitle.value, formAuthor.value);
  addBook(newBook);
  booksHolder.innerHTML = '';
  construc();
  form.reset();
});
window.addEventListener('load', () => {
  construc();
});
