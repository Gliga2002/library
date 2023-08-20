const sidebar = document.querySelector('.sidebar-section');
const form = document.querySelector('form');
const mainSectionContainer = document.querySelector('.main-section--container');
const mainSection = document.querySelector('.main-section');

const inputsEl = document.querySelectorAll('input');
const inputNumberReadEl = document.querySelector("#readed-pages");
const checkbox = document.querySelector('input[type="checkbox"]');

const modal = document.getElementById("myModal");
const span = document.querySelector(".close");
const btnCancel = document.querySelector('.btn--cancel');
const btnDelete = document.querySelector('.btn--delete');

const readedBooksCountEl = document.querySelector('#readed-books-count');
const unreadedBooksCountEl = document.querySelector('#unreaded-books-count');
const onMyListEl = document.querySelector('#on-my-list');
const totalBooksEl = document.querySelector('#total-books');


const inputsArray = [...inputsEl];

let prevClickedBox;

let myLibrary = [];
let readedBooksCount = 0;
let unreadedBooksCount = 0;
let onMyList = 0;
let totalBooks = 0;


function Book(author, title, numPages, readPages = null, read = false) {
  this.author = author;
  this.title = title,
  this.numPages = numPages;
  this.readPages = readPages;
  this.isRead = read;
}


inputsArray.filter(inputElement => inputElement.getAttribute('name') !== 'isReaded').forEach(inputElement => {
  // Debounce function to delay execution until the user stops typing
  function debounce(func, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }


  function processInput() {
    const inputValue = inputElement.value;
    console.log("Input value:", inputValue);
    // Perform your function's logic here
    if(inputValue !== "") {
          inputElement.closest('.input-box').classList.add('typing');
        } else {
          console.log('ovde')
          inputElement.closest('.input-box').classList.remove('typing');
        }

      
  }

  const debouncedProcessInput = debounce(processInput, 200); // Delay of 300 milliseconds

  inputElement.addEventListener("input", debouncedProcessInput);

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


mainSection.addEventListener('click', (e) => {
  if(prevClickedBox)prevClickedBox.classList.remove('clicked');
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
  
    addBookToLibrary(userInput);

    resetInputs();

  }
  catch(err) {
   alert(err);
  }

})

checkbox.addEventListener('change', function(e) {
  if(this.checked) {
    inputNumberReadEl.value = "";
    inputNumberReadEl.closest('.input-box').classList.add('hidden');
  } else {
    inputNumberReadEl.closest('.input-box').classList.remove('hidden');
  }
})




function addBookToLibrary(inputs) {
  const newBook = new Book(inputs.author, inputs.title, inputs.numPages, inputs.readedPages, inputs.isReaded);

  myLibrary.push(newBook);

  displayBooks(myLibrary);

  // handleIconsClick(document.querySelectorAll('.icon-box'));

  changeBooksInfo(newBook);
  // Ovo ces da promenis kad budes stavi local storage
  displayBooksInfo();
}


function displayBooks(booksArray) {

  let html = '';
  booksArray.forEach((book, index) => {
    let status = '';

    console.log(+book.numPages === +book.readPages);
    if(+book.numPages === +book.readPages || book.isRead) {
      status = `
      <div class="status-div completed">
        <p class="status font-size--sm">Completed</p>
      </div>`
      //readPages da nema vrednost i da nije procitana
    } else if(!book.readPages && !book.isRead) {
      status = `
      <div class="status-div on-list">
        <p class="status font-size--sm">on my list!</p>
      </div>`
    } else if(book.readPages && !book.isRead) {
      // Dinamicki ga napravi
      status = `
      <div class="status-div in-progress">
        <p class="font-size--sm margin-bottom--sm">In progress...</p>
        <div class="loading">
          <div style="width:${(+book.readPages / +book.numPages) * 100}%" class="fill"></div>
        </div>
      </div>`
    }


    html += `
    <div class="box"  data-index="${index}">
      <div onclick="handleIconsClick(event)" class="icon-box flex space-between">
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

  mainSectionContainer.innerHTML = html;
}

span.addEventListener('click', (e) => {
  modal.style.display = "none";
})

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})


btnCancel.addEventListener('click', (e) => {
  modal.style.display = "none";
})

btnDelete.addEventListener('click', (e) => {
  const boxIndexNumber = +modal.dataset.index;
  const box = myLibrary[boxIndexNumber];
  console.log(box);
  myLibrary = myLibrary.filter((book, index) => index !== boxIndexNumber);

  displayBooks(myLibrary);

  changeBooksInfo(box, true);

  displayBooksInfo();

  modal.style.display = "none";

})


function resetInputs() {
  inputsArray.filter(inputElement => inputElement.getAttribute('name') !== 'isReaded').forEach(inputEl => {
    console.log(inputEl);
    inputEl.closest('.input-box').classList.remove('typing')
  }) 

  inputNumberReadEl.closest('.input-box').classList.remove('hidden');

  form.reset();
}

function changeBooksInfo(currBook, remove=false) {

  if(!remove) {
    console.log('DONT REMOVE')
    if(currBook.isRead || +currBook.numPages === +currBook.readPages) readedBooksCount++;

    if(!currBook.isRead && currBook.readPages && +currBook.readPages !== +currBook.numPages) unreadedBooksCount++;

    if(!currBook.isRead && !currBook.readPages) onMyList++;

    totalBooks = myLibrary.length;
  } else {
    console.log('REMOVE');
    if(currBook.isRead || +currBook.numPages === +currBook.readPages) readedBooksCount--;

    if(!currBook.isRead && currBook.readPages && +currBook.readPages !== +currBook.numPages) unreadedBooksCount--;

    if(!currBook.isRead && !currBook.readPages) onMyList--;

    totalBooks = myLibrary.length;
  }
  
}



function displayBooksInfo() {
  readedBooksCountEl.textContent = readedBooksCount;
  unreadedBooksCountEl.textContent = unreadedBooksCount
  onMyListEl.textContent = onMyList;
  totalBooksEl.textContent = totalBooks;
}

function handleIconsClick(e) {
      if(e.target.closest('.fa-pencil')) {
        console.log('pencil');

      }
    
      if(e.target.closest('.fa-check-double')) {
        console.log('check-double');
      }
    
      if(e.target.closest('.fa-trash')) {
        console.log('trash');
        modal.style.display = "block";
  
        const box = e.target.closest('.box');
        const boxIndexNumber = box.getAttribute('data-index');
  
        modal.setAttribute('data-index', boxIndexNumber)
      }

}






