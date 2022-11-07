import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector(`input[name="delay"]`),
  delayStep: document.querySelector(`input[name="step"]`),
  promiseAmount: document.querySelector(`input[name="amount"]`),
  submitBtn: document.querySelector(`button[type="submit"]`),
};
let promiseData = {};
refs.form.addEventListener('input', formData);
function formData(e) {
  promiseData[e.target.name] = e.target.value;
}
refs.form.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  console.log(promiseData);
  let { delay, step, amount } = promiseData;
  for (let i = 0; i < +amount; i++) {
    thisDelay = +delay + +step * i;
    thisPosition = i + 1;
    console.log(i);
    console.log(thisDelay);

    createPromise(thisDelay, thisPosition)
      .then(({ delay, position }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ delay, position }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
function createPromise(delay, position) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      setTimeout(() => {
        resolve({ delay, position });
      }, delay);
    } else {
      setTimeout(() => {
        reject({ delay, position });
      }, delay);
    }
  });
}
