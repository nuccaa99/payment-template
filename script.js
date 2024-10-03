// variables to change on second step
const moreInfoSection = document.querySelector(".more_info_wrapper");
const ibanWrapper = document.querySelector(".iban_wrapper");
const merchantLocation = document.querySelector(".merchant_location");
const cardInfoForm = document.querySelector(".card_info_form");
const codeForm = document.querySelector(".code_form");

const showSecStep = (e) => {
  e.preventDefault();
  // hide more info section in the header on second step
  moreInfoSection.style.display = "none";
  // display iban on second step
  ibanWrapper.style.display = "flex";
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
