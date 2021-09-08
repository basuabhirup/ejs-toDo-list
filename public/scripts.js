const inputField = document.querySelector('input[name=item]');
const button = document.querySelector('button[name=list]');

function toggleButton() {
  if(this.value.length === 0) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

inputField.addEventListener('change', toggleButton);
inputField.addEventListener('click', toggleButton);
inputField.addEventListener('keyup', toggleButton);
