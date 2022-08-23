//USD CAD 23
//23 USD Is worth 28 CAD, you can spend these in the following Countires:

//This is An example of getting any data from any API and customize it as you want

let axios = require("axios");

let getExchangeRate = async (from, to, amount) => {
  try {
    let response = await axios.get(
      `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${amount}&api_key=5fa48b23f2-ceaa9e0577-rh0wbf`
    );
    let rate = response.data.result[to];
    if (rate) {
      return rate;
    } else {
      throw new Error(`Unable to find rate for ${from} and ${to}`);
    }
  } catch (err) {
    throw new Error(`Unable to find rate for ${from} and ${to}`);
  }
};

// getExchangeRate("USD", "EUR", 2).then((result) => {
//   console.log(result);
// });

let getListedCountries = async (CurrencyCode) => {
  try {
    let response = await axios.get(
      `https://restcountries.com/v3.1/currency/${CurrencyCode}`
    );
    return response.data.map((ele) => {
      return ele.name.common;
    });
  } catch (err) {
    throw new Error(`Unable to get Countries that uses ${CurrencyCode}`);
  }
};

// getListedCountries("USD").then((result) => {
//   console.log(result);
// });

let convertCurrecy = (from, to, amount) => {
  let countries;
  return getListedCountries(to)
    .then((tempCountries) => {
      countries = tempCountries;
      return getExchangeRate(from, to, amount);
    })
    .then((rate) => {
      return `${amount} ${from} is worth ${rate} ${to}. ${to} can be used in the following Countries : ${countries.join(
        ", "
      )}`;
    });
};

// convertCurrecy("CAD", "USD", 100).then((status) => {
//   console.log(status);
// });

//use async-await

let convertCurrecyUlt = async (from, to, amount) => {
  let countries = await getListedCountries(to);
  let exchangeCurrency = await getExchangeRate(from, to, amount);
  return `${amount} ${from} is worth ${exchangeCurrency} ${to}. ${to} can be used in the following Countries : ${countries.join(
    ", "
  )}`;
};
convertCurrecyUlt("USD", "EGP", 100)
  .then((status) => {
    console.log(status);
  })
  .catch((err) => {
    console.log(err.message);
  });
