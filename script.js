const moreInfoSection = document.querySelector(".more_info_wrapper");
const ibanWrapper = document.querySelector(".iban_wrapper");
const merchantLocation = document.querySelector(".merchant_location");

const showSecStep = (e) => {
  e.preventDefault();
  // hide more info section in the header on second step
  moreInfoSection.style.display = "none";
  ibanWrapper.style.display = "flex";
  merchantLocation.style.display = "none";
};
