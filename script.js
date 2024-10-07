// price amount format with 2 zeros
const amountElement = document.querySelector(".amount");
amountElement.textContent = parseFloat(amountElement.textContent).toFixed(2);
const btnAmountElement = document.querySelector(".btn_amount");
btnAmountElement.textContent = parseFloat(btnAmountElement.textContent).toFixed(
  2
);

//validate card number

function validateCreditCard(cardNumber) {
  if (cardNumber.length < 13 || cardNumber.length > 19) {
    return { isValid: false, cardType: null };
  }
  //Luhn algorithm
  let sum = 0;
  let isEven = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }
  const isValid = sum % 10 === 0;
  // Determine card type
  let cardType = null;
  if (isValid) {
    if (/^4/.test(cardNumber)) {
      cardType = "Visa";
    } else if (/^5[1-5]/.test(cardNumber)) {
      cardType = "MasterCard";
    }
  }
  return { isValid, cardType };
}

// card number (pan) input format and visa/mc icon
const visaIcon = document.getElementById("pan-icon-visa");
const mcIcon = document.getElementById("pan-icon-mc");

function handlePanFormatting(e) {
  const input = e.target;

  input.value = input.value
    .replace(/\D/g, "")
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();

  const { isValid, cardType } = validateCreditCard(
    input.value.replace(/\s/g, "")
  );

  visaIcon.classList.toggle("hidden", cardType !== "Visa");
  mcIcon.classList.toggle("hidden", cardType !== "MasterCard");

  if (input.value.length > 0) {
    if (isValid) {
      input.parentElement.classList.remove("validation_error");
    } else {
      input.parentElement.classList.add("validation_error");
    }
  } else {
    input.parentElement.classList.remove("validation_error");
  }
  console.log(input.value.length);
  if (isValid && input.value.length === 19) {
    document.getElementById("cardDate").focus();
  }
}

// card expiry date input format

function validateCardExpiry(expiryDate) {
  const [month, year] = expiryDate.split("/").map((item) => item.trim());

  if (!month || !year || month.length !== 2 || year.length !== 2) {
    return { isValid: false };
  }
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);

  if (expMonth < 1 || expMonth > 12) {
    return { isValid: false };
  }

  if (
    expYear < currentYear ||
    (expYear === currentYear && expMonth < currentMonth)
  ) {
    return { isValid: false };
  }

  return { isValid: true };
}

function handleCardExpiryFormatting(e) {
  const input = e.target;
  let value = input.value.replace(/\D/g, "");
  value = value.slice(0, 6);
  if (value.length > 2) {
    value = value.slice(0, 2) + " / " + value.slice(2);
  }
  input.value = value;
  const { isValid } = validateCardExpiry(input.value);

  if (input.value.length > 0) {
    if (isValid) {
      input.parentElement.classList.remove("validation_error");
    } else {
      input.parentElement.classList.add("validation_error");
    }
  } else {
    input.parentElement.classList.remove("validation_error");
  }

  if (input.value.length === 7) {
    document.getElementById("cardCvv").focus();
  }
}

// mask primary account number aka pan on the second step
const panElement = document.querySelector(".pan");
const maskedPan =
  "*".repeat(12) + panElement.textContent.replace(/\s+/g, "").slice(12);
panElement.textContent = maskedPan;

// variables to change on second step
const panWrapper = document.querySelector(".pan_wrapper");
const merchantLocation = document.querySelector(".merchant_location");
const cardInfoForm = document.querySelector(".card_info_form");
const codeForm = document.querySelector(".code_form");

const showSecStep = (e) => {
  e.preventDefault();
  // display pan on second step
  panWrapper.style.display = "flex";
  // hide merchant location on second step
  merchantLocation.style.display = "none";
  // hide card info form on second step
  cardInfoForm.style.display = "none";
  // display code form on second step
  codeForm.style.display = "flex";
};

// variables to change on third step

const merchantAndAmountContainer = document.querySelector(
  ".merchant_amount_container"
);
const successCardContainer = document.querySelector(".success_card_container");

const showThirdStep = (e) => {
  e.preventDefault();
  merchantAndAmountContainer.style.display = "none";
  codeForm.style.display = "none";
  successCardContainer.style.display = "flex";
};
