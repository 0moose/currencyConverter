// Json data for conversion rates
const conversionRates = {
  "USD": {
    "EUR": 0.85,
    "GBP": 0.72,
    "CAD": 1.2,
    "NGN": 1.65
  },
  "EUR": {
    "USD": 1.18,
    "GBP": 0.85,
    "CAD": 1.44,
    "NGN": 1.75
  },
  "GBP": {
    "USD": 1.58,
    "EUR": 0.65,
    "CAD": 1.64,
    "NGN": 2.05
  },
  "CAD": {
    "USD": 1.98,
    "GBP": 0.85,
    "EUR": 1.86,
    "NGN": 1.75
  },
  "NGN": {
    "USD": 0.65,
    "GBP": 0.75,
    "CAD": 1.21,
    "EUR": 0.75
  }
};

// Populate the currency options in the select elements
function populateCurrencyOptions() {
  const fromCurrencySelect = document.getElementById('fromCurrency');
  const toCurrencySelect = document.getElementById('toCurrency');

  for (const currency in conversionRates) {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;
    fromCurrencySelect.appendChild(option);

    const optionClone = option.cloneNode(true);
    toCurrencySelect.appendChild(optionClone);
  }
}

// Convert the currency
function convertCurrency() {
  // Step 1: Receive input
  const amountInput = document.getElementById("amount").value;
  const fromCurrencyInput = document.getElementById("fromCurrency").value;
  const toCurrencyInput = document.getElementById("toCurrency").value;

  // Step 2: Check if input is a valid number
  if (isNaN(amountInput)) {
    document.getElementById("convertedAmount").value = "Invalid amount";
    return;
  }

  // Step 3: Perform the currency conversion
  const conversionRate = conversionRates[fromCurrencyInput][toCurrencyInput];
  if (conversionRate === undefined) {
    document.getElementById("convertedAmount").value = "Invalid conversion";
    return;
  }
  const convertedAmount = amountInput * conversionRate;

  // Step 4: Display the output
  const outputElement = document.getElementById("convertedAmount");
  outputElement.value = convertedAmount.toFixed(2);
  outputElement.style.display = "block";
}

// Trigger conversion when the button is clicked
const convertButton = document.getElementById("convertButton");
convertButton.addEventListener("click", convertCurrency);

// Populate currency options when the page loads
window.addEventListener("load", populateCurrencyOptions);
