import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');
const timeInput = document.querySelector('#datetime-picker')

let todaysDate = Date.now();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= todaysDate) {
            startButton.setAttribute('disabled', '')
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        else {
            startButton.removeAttribute('disabled');
        }
    },
};

flatpickr(timeInput, options);

function addLeadingZero(value){
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };

}
  

startButton.addEventListener('click', function() {
    startButton.setAttribute('disabled', '');
    let timer = setInterval(function() {
        const chosenDate = new Date(timeInput.value);
        let diff = chosenDate.getTime() - Date.now();
        const countdown = convertMs(diff);      

        if (diff <= 0 ){
            Notiflix.Notify.success('The timer has reached 0!');
            clearInterval(timer);
        } 
        else {
            daysLeft.textContent = addLeadingZero(countdown.days);
            hoursLeft.textContent = addLeadingZero(countdown.hours);
            minutesLeft.textContent = addLeadingZero(countdown.minutes);
            secondsLeft.textContent = addLeadingZero(countdown.seconds);
                }
    }, 1000) 
});

