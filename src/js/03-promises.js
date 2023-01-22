import Notiflix from "notiflix";

const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');
const submitBtn = document.querySelector('button');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
         if (shouldResolve) {
              resolve({position, delay});
              } else {
                    reject({position, delay});
                    }
                  }, delay);
                });
              }


submitBtn.addEventListener('click', promiseSubmit);

function promiseSubmit(event) {
  event.preventDefault();
  
  let delay = parseInt(inputDelay.value);

  for (let i = 0; i <= inputAmount.value; i++) {
    createPromise(i, delay)
      .then (({position, delay}) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay}) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

      delay = delay + parseInt(inputStep.value);
  }
}