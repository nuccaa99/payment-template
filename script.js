// price amount format with 2 zeros
const amountElement = document.querySelector('.amount');
amountElement.textContent = parseFloat(amountElement.textContent).toFixed(2);
const btnAmountElement = document.querySelector('.btn_amount');
btnAmountElement.textContent = parseFloat(btnAmountElement.textContent).toFixed(
  2
);

// card number (pan) input format and visa/mc icon

const visaIcon = document.getElementById('pan-icon-visa');
const mcIcon = document.getElementById('pan-icon-mc');
const CARD_TYPES = { VISA: '4', MASTERCARD: '5' };

function handlePanFormatting(e) {
  const input = e.target;
  input.value = input.value
    .replace(/\D/g, '')
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim();
  const firstDigit = input.value[0];
  visaIcon.classList.toggle('hidden', firstDigit !== CARD_TYPES.VISA);
  mcIcon.classList.toggle('hidden', firstDigit !== CARD_TYPES.MASTERCARD);
}

// card expiry date input format

function handleCardExpiryFormatting(e) {
  const input = e.target;
  let value = input.value.replace(/\D/g, '');
  value = value.slice(0, 6);

  if (value.length > 2) {
    value = value.slice(0, 2) + ' / ' + value.slice(2);
  }
  input.value = value;
}

// mask primary account number aka pan on the second step
const panElement = document.querySelector('.pan');
const maskedPan =
  '*'.repeat(12) + panElement.textContent.replace(/\s+/g, '').slice(12);
panElement.textContent = maskedPan;

// variables to change on second step
const panWrapper = document.querySelector('.pan_wrapper');
const merchantLocation = document.querySelector('.merchant_location');
const cardInfoForm = document.querySelector('.card_info_form');
const codeForm = document.querySelector('.code_form');

const showSecStep = (e) => {
  e.preventDefault();
  // display pan on second step
  panWrapper.style.display = 'flex';
  // hide merchant location on second step
  merchantLocation.style.display = 'none';
  // hide card info form on second step
  cardInfoForm.style.display = 'none';
  // display code form on second step
  codeForm.style.display = 'flex';
};

// variables to change on third step

const merchantAndAmountContainer = document.querySelector(
  '.merchant_amount_container'
);
const successCardContainer = document.querySelector('.success_card_container');

const showThirdStep = (e) => {
  e.preventDefault();
  merchantAndAmountContainer.style.display = 'none';
  codeForm.style.display = 'none';
  successCardContainer.style.display = 'flex';
};
