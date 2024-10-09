// get DOM elements
const modal = document.querySelector('.modal_contents_container');

const visaIcon = document.getElementById('pan-icon-visa');
const mcIcon = document.getElementById('pan-icon-mc');

const cardNumberInput = document.getElementById('pan');
const cardNumberInputWrapper = document.querySelector(
  '.card_info_input_wrapper'
);

const expDateInput = document.getElementById('expDate');
const expDateInputWrapper = document.getElementById('expDateWrapper');

const cvvInput = document.getElementById('cardCvv');
const cvvInputWrapper = document.getElementById('cvvWrapper');

// Close modal functionality
const handleClose = () => modal.classList.add('hidden');

// Utility function to format prices to 2 decimal places
const formatToFixed = (items) => {
  items.forEach((item) => {
    const element = document.querySelector(item);
    if (element) {
      element.textContent = parseFloat(element.textContent).toFixed(2);
    }
  });
};
// Format elements
formatToFixed(['.amount', '.btn_amount', '.check_amount']);

// Determine card type
const getCardType = (cardNumber) => {
  const types = {
    Visa: /^4/,
    MasterCard: /^5[1-5]/,
  };
  return (
    Object.keys(types).find((type) => types[type].test(cardNumber)) || null
  );
};

// Luhn algorithm for card validation
function isValidCardNumber(cardNumber) {
  number = cardNumber.replace(/\s/g, '');
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0 && number.length === 16;
}

// Function to validate expiration date (MM/YY)
function isValidExpirationDate(expDate) {
  const [month, year] = expDate.split('/').map(Number);
  if (!month || !year || month < 1 || month > 12) return false;
  const currentDate = new Date();
  const inputYear = 2000 + year;
  const inputDate = new Date(inputYear, month - 1);

  return (
    inputDate >= new Date(currentDate.getFullYear(), currentDate.getMonth())
  );
}

// card number (pan) input format and visa/mc icon visibility

function handleCardNumber(e) {
  const input = e.target;
  input.value = input.value
    .replace(/\D/g, '')
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim();
  const cardType = getCardType(input.value.replace(/\s/g, ''));

  visaIcon.classList.toggle('hidden', cardType !== 'Visa');
  mcIcon.classList.toggle('hidden', cardType !== 'MasterCard');

  updateButtonState();
}

// expiry date input format

function handleExpDate(e) {
  let input = e.target.value.replace(/\D/g, '');
  if (
    (input.length === 1 && input[0] > 1 && input[0] <= 9) ||
    (input.length === 2 && input[0] == 1 && input[1] > 2)
  ) {
    input = '0' + input;
  }

  if (input.length > 2) {
    input = input.slice(0, 2) + ' / ' + input.slice(2, 4);
  }
  e.target.value = input.slice(0, 7);
  updateButtonState();
}

// CVC/CVV input format

function handleCvv(e) {
  let input = e.target.value.replace(/\D/g, '');
  e.target.value = input.slice(0, 3);

  updateButtonState();
}

// validate card number on blur event
cardNumberInput.addEventListener('blur', function () {
  const cardNumber = cardNumberInput.value;
  // Check if card number is 16 digits and passes Luhn algorithm
  if (!isValidCardNumber(cardNumber)) {
    cardNumberInputWrapper.classList.add('validation_error');
  } else {
    cardNumberInputWrapper.classList.remove('validation_error');
  }
});

// Validate expiration date on blur
expDateInput.addEventListener('blur', function () {
  const expDate = expDateInput.value;
  if (!isValidExpirationDate(expDate)) {
    expDateInputWrapper.classList.add('validation_error');
  } else {
    expDateInputWrapper.classList.remove('validation_error');
  }
});
// Validate cvv/cvc date on blur
cvvInput.addEventListener('blur', function () {
  const cvv = cvvInput.value;
  if (cvv.length !== 3) {
    cvvInputWrapper.classList.add('validation_error');
  } else {
    cvvInputWrapper.classList.remove('validation_error');
  }
});

function updateButtonState() {
  const cardNumber = cardNumberInput.value;
  const expDate = expDateInput.value;
  const cvv = cvvInput.value;

  const allValid =
    isValidCardNumber(cardNumber) &&
    isValidExpirationDate(expDate) &&
    cvv.length === 3;

  const submitButton = document.getElementById('cardInfoSubmitBtn');
  submitButton.classList.toggle('invalid', !allValid);
  submitButton.disabled = !allValid;
}

// mask primary account number aka pan on the second step
const panElement = document.querySelector('.pan');
const maskedPan =
  '*'.repeat(12) + panElement.textContent.replace(/\s+/g, '').slice(12);
panElement.textContent = maskedPan;

// mask primary account number aka pan on the final step
const transactionInfoPanElement = document.querySelector(
  '.transaction_info_pan'
);
const maskedFinalPan =
  transactionInfoPanElement.textContent[0] +
  '*'.repeat(11) +
  transactionInfoPanElement.textContent.replace(/\s+/g, '').slice(12);
transactionInfoPanElement.textContent = maskedFinalPan;

// variables to change on second step

const panWrapper = document.querySelector('.pan_wrapper');
const merchantLocation = document.querySelector('.merchant_location');
const cardInfoForm = document.querySelector('.card_info_form');
const codeForm = document.querySelector('.code_form');
const codeInput = document.getElementById('code');

function handleCode(e) {
  let input = e.target.value.replace(/\D/g, '');
  e.target.value = input.slice(0, 6);
  const submitButton = document.getElementById('codeSubmitBtn');
  const isCodeValid = e.target.value.length === 6;

  submitButton.classList.toggle('invalid', !isCodeValid);
  submitButton.disabled = !isCodeValid;
}

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
