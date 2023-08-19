const sidebar = document.querySelector('.sidebar-section--container');
const form = document.querySelector('form');
const mainSection = document.querySelector('.main-section--container');

const inputNumbers = document.querySelectorAll('input[type="number"]');
const checkbox = document.querySelector('input[type="checkbox"');

const readedBooksCountEl = document.querySelector('#readed-books-count');
const unreadedBooksCountEl = document.querySelector('#unreaded-books-count');
const onMyListEl = document.querySelector('#on-my-list');
const totalBooksEl = document.querySelector('#total-books');


const inputNumberArray = [...inputNumbers];

let prevClickedBox;

const myLibrary = [];
let readedBooksCount = 0;
let unreadedBooksCount = 0;
let onMyList = 0;
let totalBooks = myLibrary.length;


function Book(author, title, numPages, readPages = null, read = false) {
  this.author = author;
  this.title = title,
  this.numPages = numPages;
  this.readPages = readPages;
  this.isRead = read;
}

// function addBookToLibrary() {
//   const newBook = new Book();
//   myLibrary.push(newBook);
// }


// for input number form because its not required, to stay span on top bcs i dont have way to check validation
inputNumberArray.forEach((input) => {
  input.addEventListener('keyup', checkIsTyping.bind(null,input))
})



sidebar.addEventListener('click', (e) => {
  const inputBox = e.target.closest('.input-box');
  if(!inputBox) {
    
    if(prevClickedBox)prevClickedBox.classList.remove('clicked');
    return;
  };
 
  if(prevClickedBox) prevClickedBox.classList.remove('clicked');

  inputBox.classList.add('clicked');

  let inputEl = inputBox.firstElementChild;
  inputEl.focus();

  prevClickedBox = inputBox;

});

checkbox.addEventListener('change', function(e) {
  if(this.checked) {
    inputNumberArray[1].value = "";
    inputNumberArray[1].closest('.input-box').classList.add('hidden');
  } else {
    // inputNumbersArray[1].value = "";
    inputNumberArray[1].closest('.input-box').classList.remove('hidden');
  }
})


form.addEventListener('submit', function(e) {
  e.preventDefault();
  try {
    if(+this.readedPages.value > +this.numPages.value || +this.readedPages.value < 0 || +this.numPages <= 0 ) throw new Error("Invalid Inputs (Check pages input data)")

    const userInput = {
      author:this.author.value,
      title:this.title.value,
      numPages:this.numPages.value,
      readedPages: this.readedPages.value,
      isReaded: this.isReaded.checked
    }
    console.log(this.author.value);
    console.log(this.title.value);
    console.log(this.numPages.value)
    console.log(this.readedPages.value);
    console.log(this.isReaded.checked);
  
    addBookToLibrary(userInput);
    // form.reset();
    // inputNumberArray.forEach((input) => {
    //   input.classList.remove('num-typed');
    // })
  }
  catch(err) {
   alert(err);
  }

})


function addBookToLibrary(inputs) {
  const newBook = new Book(inputs.author, inputs.title, inputs.numPages, inputs.readedPages, inputs.isReaded);
  // console.log(newBook);
  myLibrary.push(newBook);
  // console.log(myLibrary);
  displayBooks(myLibrary);
}

function displayBooks(booksArray) {

  let html = '';
  booksArray.forEach((book, index) => {
    let status = '';

    console.log(+book.numPages === +book.readPages);
    if(+book.numPages === +book.readPages || book.isRead) {
      status = `
      <div class="completed">
        <p class="status font-size--sm">Completed</p>
      </div>`
    } else if(+book.readPages === 0 && !book.isRead) {
      status = `
      <div class="on-list">
        <p class="status font-size--sm">on my list!</p>
      </div>`
    } else if(+book.readPages !== 0 && !book.isRead) {
      // Dinamicki ga napravi
      status = `
      <div class="in-progress">
        <p class="font-size--sm margin-bottom--sm">In progress...</p>
        <div class="loading">
          <div style="width:${(+book.readPages / +book.numPages) * 100}%" class="fill"></div>
        </div>
      </div>`
    }


    html += `
    <div class="box" data-index="${index}">
      <div class="flex space-between">
        <i class="fa-solid fa-pencil"></i>
        <div>
          <i class="fa-solid fa-check-double"></i>
          <i class="fa-solid fa-trash margin-left--sm" style="color: #ffffff;"></i>
        </div>
     </div>
    <div class="book flex center flex--column gap--lg margin-top--sm margin-bottom--lg">
        <p class="book-title font-size--lg bold">"${book.title}"</p>
        <p class="book-author font-size--sm "><em>${book.author}</em></p>
        ${status}
    </div>
    <p class="num-pages right-align">(${book.readPages ? book.readPages + " | " : ""}${book.numPages} pages)</p>
  </div>`
  })

  mainSection.innerHTML = html;
}




function checkIsTyping (input) {
  const inputValue = input.value.trim();
  if(inputValue !== "") {
    input.closest('.input-box').classList.add('num-typed');
  } else {
    input.closest('.input-box').classList.remove('num-typed');
  }
}

