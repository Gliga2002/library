const sidebar = document.querySelector('.sidebar-section--container');

const inputNumber = document.querySelectorAll('input[type="number"]');

const inputNumberArray = [...inputNumber];

let prevClickedBox;


// for input number form because its not required, to stay span on top bcs i dont have way to check validation
inputNumberArray.forEach((input) => {
  input.addEventListener('keyup', checkIsTyping.bind(null,input))
})



sidebar.addEventListener('click', (e) => {
  const inputBox = e.target.closest('.input-box');
  if(!inputBox) {
    // Porveri da li si kliknuo na input Box ako nisi kad kliknes bilo gde se ponisti stajling
    if(prevClickedBox)prevClickedBox.classList.remove('clicked');
    return;
  };
  // Ako si kliknuo na predhodni pa na drugi, izbrisi prethodni pre nego sto kliknes na drugi
  if(prevClickedBox) prevClickedBox.classList.remove('clicked');
  // Dodaj drugom classlist clicked
  inputBox.classList.add('clicked');

  let inputEl = inputBox.firstElementChild;
  inputEl.focus();

  prevClickedBox = inputBox;

})


function checkIsTyping (input) {
  const inputValue = input.value.trim();
  console.log(inputValue)
  if(inputValue !== "") {
    input.closest('.input-box').classList.add('num-typed');
  } else {
    input.closest('.input-box').classList.remove('num-typed');
  }
}