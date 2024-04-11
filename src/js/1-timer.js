import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.getElementById('datetime-picker');
const startBtn = document.querySelector('.btn');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', clickStartTimer);
let userSelectedDate;
let intervalId = null;

// обєкт параметру flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= Date.now()) {
      iziToast.error({
        backgroundColor: 'red',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};
// запускаємо бібліотеку
flatpickr(inputDate, options);

// відлік часу
function clickStartTimer() {
  input.disabled = true;
  startBtn.disabled = true;
}
// розрахунок часу
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
// форматування часу
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
