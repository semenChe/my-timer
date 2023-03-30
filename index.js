const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timerId;
  const addZero = (num) => num > 9 ? num : `0${num}`;
  const render = (finishTimeMs) => {
    const remainingTimeMs = Math.round((finishTimeMs - Date.now()) / 1000) * 1000;
    const hours = Math.max(0, Math.floor(remainingTimeMs / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor((remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor((remainingTimeMs % (1000 * 60)) / 1000));

    timerEl.innerHTML = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
  };
  return (seconds) => {
    if (timerId) {
      clearInterval(timerId);
    }
    const finishTimeMs = Date.now() + seconds * 1000;
    render(finishTimeMs);
    timerId = setInterval(() => {
      if (Date.now() >= finishTimeMs) {
        clearInterval(timerId);
      }
      render(finishTimeMs);
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (event) => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  inputEl.value = parseInt(event.target.value) || '';
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});