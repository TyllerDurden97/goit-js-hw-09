
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const spanDays = document.querySelector('.value[data-days]');
const spanHours = document.querySelector('.value[data-hours]');
const spanMinutes = document.querySelector('.value[data-minutes]');
const spanSeconds = document.querySelector('.value[data-seconds]');

let pickedDate = null;
let timerId = null;

startBtn.setAttribute("disabled", "disabled");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      pickedDate = selectedDates[0];
     console.log(pickedDate);
      if (pickedDate < options.defaultDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
     }
      startBtn.removeAttribute("disabled", "disabled");
       },
};
const fp = flatpickr(inputEl, options);

startBtn.addEventListener('click', handleStartBtnClick);

function handleStartBtnClick() {
   startBtn.setAttribute("disabled", "disabled");
   options.minDate = "today";

     timerId = setInterval(() => {
      if (pickedDate > new Date()) {
         const currentTimer = pickedDate - new Date();
         const timeOfSale = convertMs(currentTimer);
         const { days, hours, minutes, seconds } = timeOfSale;
         spanDays.textContent = days;
         spanHours.textContent = hours;
         spanMinutes.textContent = minutes;
         spanSeconds.textContent = seconds;
      } else if (pickedDate < new Date()) {
         Notiflix.Notify.info('Sale is over');   
         clearInterval(timerId);
         return;
            }
      }, 1000);
     }

function pad(value) {
   return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}






