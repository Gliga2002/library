const sidebar = document.querySelector('.sidebar-section--container');
const form = document.querySelector('form');

const inputNumbers = document.querySelectorAll('input[type="number"]');

const checkbox = document.querySelector('input[type="checkbox"');

const inputNumberArray = [...inputNumbers];

let prevClickedBox;


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
    inputNumberArray[1].closest('.input-box').classList.add('hidden');
  } else {
    inputNumberArray[1].closest('.input-box').classList.remove('hidden');
  }
})


form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(this);
})



function checkIsTyping (input) {
  const inputValue = input.value.trim();
  if(inputValue !== "") {
    input.closest('.input-box').classList.add('num-typed');
  } else {
    input.closest('.input-box').classList.remove('num-typed');
  }
}