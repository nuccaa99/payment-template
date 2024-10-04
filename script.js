// price amount format with 2 zeros
const amountElement = document.querySelector(".amount");
amountElement.textContent = parseFloat(amountElement.textContent).toFixed(2);
const btnAmountElement = document.querySelector(".btn_amount");
btnAmountElement.textContent = parseFloat(btnAmountElement.textContent).toFixed(
  2
);

// pan input format and visa/mc icon

const visaIcon = document.getElementById("pan-icon-visa");
const mcIcon = document.getElementById("pan-icon-mc");

function handleFormatting(e) {
  let value = e.target.value.replace(/\s+/g, "");
  let formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
  e.target.value = formattedValue;
  if (e.target.value[0] === "4") {
    visaIcon.classList.remove("hidden");
    mcIcon.classList.add("hidden");
  } else if (e.target.value[0] === "5") {
    mcIcon.classList.remove("hidden");
    visaIcon.classList.add("hidden");
  } else {
    mcIcon.classList.add("hidden");
    visaIcon.classList.add("hidden");
  }
}

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
