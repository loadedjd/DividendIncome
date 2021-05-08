const { dividendsBasic } = require("iexjs");
const csv = require("csv-parser");
const fs = require("fs");
require("dotenv").config();

const apiToken = process.env.API_TOKEN;
const csvFile = process.env.CSV_FILE;

async function getDividendsYearToDate(ticker) {
  var dividends = await dividendsBasic(ticker, "ytd", apiToken);

  dividends.sort((d1, d2) => {
    d1["date"] > d2["date"];
  });

  return dividends;
}

function getAnnualizedDividend(d) {
  var coefficient = 1;

  if (d["frequency"] == "quarterly") {
    coefficient = 4;
  } else if (d["frequency"] == "semi-annual") {
    coefficient = 2;
  } else if (d["frequency"] == "monthly") {
    coefficient = 12;
  }

  return d["amount"] * coefficient;
}

function readCsvFile() {
  const results = [];
  let promise = new Promise((resolve, reject) => {
    fs.createReadStream(csvFile)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });

  return promise;
}

async function getAnnualIncome() {
  let promise = new Promise(async (resolve, reject) => {
    let results = await readCsvFile();
    let annualIncome = 0;

    for (result of results) {
      let ytd = await getDividendsYearToDate(result.Ticker);

      if (ytd.length > 0) {
        let annualized = getAnnualizedDividend(ytd[0]);

        console.error(`$${result.Ticker} -> $${annualized * result.Shares}`);

        annualIncome += annualized * result.Shares;
      }
    }

    resolve(annualIncome);
  });

  return promise;
}

getAnnualIncome().then((income) => {
  console.log(`Annual Dividend Income: $${income}`);
});
