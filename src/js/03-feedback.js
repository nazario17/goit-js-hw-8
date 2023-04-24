const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

var throttle = require('lodash.throttle');

const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

form.addEventListener('input', saveFormState);

const formStateString = localStorage.getItem('feedback-form-state');
if (formStateString) {
  const formState = JSON.parse(formStateString);
  emailInput.value = formState.email;
  messageInput.value = formState.message;
}

form.addEventListener('submit', event => {
  if (!emailInput.value || !messageInput.value) {
    return alert('Error, всі поля повинні бути заповнені');
  }
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formState);
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
});

