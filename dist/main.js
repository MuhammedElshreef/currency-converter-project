const fromCurrencySelector = document.getElementById("from-select-box");
const toCurrencySelector = document.getElementById("to-select-box");
const amountSpan = document.getElementById("amount-span");
const convertedAmount = document.getElementById("converted-span");
const amountInput = document.getElementById("amount-input");
const convertBtn = document.getElementById("convert-btn");
let amountValue = 0;
let convertedValue = 0;
let currencyArray = [];
fetch(
  "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=d4a4fef00a654647b583067f7fbc2ff3"
)
  .then((result) => {
    let data = result.json();
    return data;
  })
  .then((currency) => {
    currencyArray.push(currency);
    currencyArray.forEach((item) => {
      let currencyKeys = [...Object.keys(item.rates)];
      currencyKeys.sort();
      currencyKeys.forEach((curr) => {
        let option = document.createElement("option");
        option.text = curr;
        fromCurrencySelector.add(option);
      });
    });
    currencyArray.forEach((item) => {
      let currencyKeys = [...Object.keys(item.rates)];
      currencyKeys.sort();
      currencyKeys.forEach((curr) => {
        let option = document.createElement("option");
        option.text = curr;
        toCurrencySelector.add(option);
      });
    });
    convertBtn.addEventListener("click", function () {
      let amount = amountInput.value;

      let selectedFromRate =
        fromCurrencySelector.options[fromCurrencySelector.selectedIndex].text;
      amountValue = currency.rates[`${selectedFromRate}`];
      let selectedToRate =
        toCurrencySelector.options[toCurrencySelector.selectedIndex].text;
      convertedValue = currency.rates[`${selectedToRate}`];
      let convertToUSD = amount / amountValue;
      let result = convertToUSD * convertedValue;
      amountSpan.innerText = `${amountInput.value} ${
        fromCurrencySelector.options[fromCurrencySelector.selectedIndex].text
      } = `;
      convertedAmount.innerText = `${result} ${
        toCurrencySelector.options[toCurrencySelector.selectedIndex].text
      } `;
    });
  });
function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}
