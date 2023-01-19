function getRandomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

let intervalId = null;

buttonStart.addEventListener('click', function() {
    buttonStart.setAttribute('disabled', '');
    buttonStop.removeAttribute('disabled', '');
    bodyColor.style.backgroundColor = `${getRandomHexColor()}`;
    intervalId = setInterval(function() {
    bodyColor.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
});

buttonStop.addEventListener('click', function() {
    buttonStop.setAttribute('disabled', '');
    clearInterval(intervalId);
    intervalId = null;
    buttonStart.removeAttribute('disabled', '');
    //bodyColor.style.backgroundColor = '#fff'
});

