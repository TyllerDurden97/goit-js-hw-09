
import Notiflix from 'notiflix';

const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

inputAmount.setAttribute("max", "20");
let position = 1;

form.addEventListener('submit', handleBtnClick);

function handleBtnClick(e) {
   e.preventDefault();
   let delay = Number(inputDelay.value);

   for (let i = 0; i < Number(inputAmount.value); i+=1) {
      createPromise(position, delay)
         .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
         })
         .catch(({ position, delay }) => {
    Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
  });
      delay += Number(inputStep.value);
      position += 1;
   };
   form.reset();
   position = 1;

}

function createPromise(position, delay) {   
      const promise = new Promise ((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;     
   setTimeout(() => {      
      if (shouldResolve) {
         resolve({
            position,
            delay
         });
      }
         reject({
            position,
            delay
         });
      
   }, delay);
      });
   return promise;
};
