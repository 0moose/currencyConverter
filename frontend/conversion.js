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

// Fetch exchange rates from the API
async function fetchExchangeRates() {
  const apiKey = '59d92f36991030fd0158570e'; //
  const baseCurrency = 'USD'; // Replace with your desired base currency
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.conversion_rates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return null;
  }
}

// Convert the currency
async function convertCurrency() {
  // Step 1: Receive input
  const amountInput = document.getElementById('amount').value;
  const fromCurrencyInput = document.getElementById('fromCurrency').value;
  const toCurrencyInput = document.getElementById('toCurrency').value;

  // Step 2: Check if input is a valid number
  if (isNaN(amountInput)) {
    document.getElementById('convertedAmount').value = 'Invalid amount';
    return;
  }

  // Step 3: Fetch exchange rates from the API
  const rates = await fetchExchangeRates();

  if (rates === null) {
    document.getElementById('convertedAmount').value = 'Failed to fetch rates';
    return;
  }

  // Step 4: Perform the currency conversion
  const conversionRate = rates[toCurrencyInput] / rates[fromCurrencyInput];

  if (isNaN(conversionRate)) {
    document.getElementById('convertedAmount').value = 'Invalid conversion';
    return;
  }

  const convertedAmount = amountInput * conversionRate;

  // Step 5: Display the output
  const outputElement = document.getElementById('convertedAmount');
  outputElement.value = convertedAmount.toFixed(2);
  outputElement.style.display = 'block';
}

// Trigger conversion when the button is clicked
const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', convertCurrency);

// Populate currency options when the page loads
window.addEventListener('load', populateCurrencyOptions);
