
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

document.body.style.textAlign = "center";
startBtn.style.cssText = 'padding: 10px 20px; margin-right: 20px; font-size: 20px; background-color: #c5e3e2; border-radius: 10%; border: none;'
stopBtn.style.cssText = 'padding: 10px 20px; font-size: 20px; background-color: #c5e3e2; border-radius: 10%; border: none'

stopBtn.setAttribute("disabled", "disabled");

startBtn.addEventListener('click', handleStartBtnClick);
stopBtn.addEventListener('click', handleStopBtnClick);


function handleStartBtnClick() {
   startBtn.setAttribute("disabled", "disabled");
   stopBtn.removeAttribute("disabled", "disabled");

   timerId = setInterval(() => {
   document.body.style.backgroundColor = `${getRandomHexColor()}`;
}, 1000);
}

function handleStopBtnClick() {
   startBtn.removeAttribute("disabled", "disabled");
   stopBtn.setAttribute("disabled", "disabled");

   clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}





