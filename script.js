// price amount format with 2 zeros
const amountElement = document.querySelector(".amount");
amountElement.textContent = parseFloat(amountElement.textContent).toFixed(2);
const btnAmountElement = document.querySelector(".btn_amount");
btnAmountElement.textContent = parseFloat(btnAmountElement.textContent).toFixed(
  2
);

// mask primary account number aka pan
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
