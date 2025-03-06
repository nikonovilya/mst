import {SELECTORS} from 'Scripts/data/data';
import {padString} from 'Scripts/overall/utils';

const formContent = SELECTORS.agentForm.querySelector('.form__content');
const submitButton = SELECTORS.agentForm.querySelector('.form__submit');
const submitBlock = SELECTORS.agentForm.querySelector('.form__message');
const messageButton = SELECTORS.agentForm.querySelector('.form__message-btn');
const formInputs = SELECTORS.agentForm.querySelectorAll('.form__input');
const API_URL = 'https://script.google.com/macros/s/AKfycbyFxCrdIDALeZYWBnpicVw8fWC28ay7p9HGoM_KwnoVkmqqJeMKxUQfMGMuC0_FzVLSow/exec';

function disabledForm() {
  formInputs.forEach((input) => input.setAttribute('disabled', 'true'));
  submitButton.setAttribute('disabled', 'true');
  submitButton.classList.add('loading');
}

function enabledForm() {
  formInputs.forEach((input) => input.removeAttribute('disabled'));
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove('loading');
}

function clearForm() {
  formInputs.forEach((input) => {
    input.value = '';
    input.checked = false;
  });
}

function showSubmitState(state) {
  formContent.classList.add('display-none');
  submitBlock.classList.add(`form__message--${state}`);
  submitBlock.classList.remove('display-none');
}

function showSuccess() {
  formContent.classList.add('display-none');
  showSubmitState('success');
}

function showError() {
  formContent.classList.add('display-none');
  showSubmitState('error');
}

function setStateOnDefault() {
  formContent.classList.remove('display-none');
  submitBlock.classList.add('display-none');
  submitBlock.classList.remove('form__message--error');
  submitBlock.classList.remove('form__message--success');
  submitButton.setAttribute('disabled', 'true');
  clearForm();
}

formInputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    if (SELECTORS.agentForm.checkValidity()) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }
  });
});

const onFormSubmitClick = async (e) => {
  e.preventDefault();
  const formData = new FormData(SELECTORS.agentForm);
  const now = new Date();
  disabledForm();

  formData.append('date', now);
  formData.append(
    'time',
    `${padString(now.getUTCHours())}: ${padString(now.getUTCMinutes())}`
  );
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (response.status === 200) {
    enabledForm();
    showSuccess();
    clearForm();
    submitButton.setAttribute('disabled', 'true');
  } else {
    enabledForm();
    showError();
    submitButton.setAttribute('disabled', 'true');
  }
};

submitButton.addEventListener('click', onFormSubmitClick);
messageButton.addEventListener('click', (e) => setStateOnDefault());

export {submitButton};
