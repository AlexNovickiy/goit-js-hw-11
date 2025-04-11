import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import brick from "../img/brick.svg";

const datetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('.btn-start');


let userSelectedDate;
let timerId = null;

btnStart.disabled = true;

const options = {
  dateFormat: "Y-m-d H:i",
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
        iziToast.show({
          title: 'Error',
          iconUrl: brick,
          message: 'Please choose a date in the future',
          backgroundColor: '#ef4040',
          timeout: null,
          class: 'message-warning',
          position: 'topRight',
          titleColor: 'white',
          messageColor: 'white',
      });
        btnStart.disabled = true;
      } else {
        btnStart.disabled = false;
        userSelectedDate = selectedDates[0];
    }
  },
};

let fp = flatpickr(datetimePicker, options);

btnStart.addEventListener('click', event => {

  if (!userSelectedDate) return;

  btnStart.disabled = true;
  fp.destroy();


  timerId = setInterval(() => {
    const timeDiff = userSelectedDate.getTime() - Date.now();

    if (timeDiff <= 0) {
      clearInterval(timerId);
      updateTimerDisplay({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      fp = flatpickr(datetimePicker, options);

      return;
    }

    const formattedTime = addLeadingZero(convertMs(timeDiff));
    updateTimerDisplay(formattedTime);
  }, 1000);

});


function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = days;
  document.querySelector('[data-hours]').textContent = hours;
  document.querySelector('[data-minutes]').textContent = minutes;
  document.querySelector('[data-seconds]').textContent = seconds;
}

function addLeadingZero(value) {
  for (const key of Object.keys(value)) {
    value[key] = value[key].toString().padStart(2, '0');
  }
  return value;
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


























