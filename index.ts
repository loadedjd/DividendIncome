import { dividendsBasic } from "iexjs";

// {
//     amount: 0.22,
//     currency: 'USD',
//     declaredDate: '2021-04-28',
//     description: 'Ordinary Shares',
//     exDate: '2021-05-07',
//     flag: 'Cash',
//     frequency: 'quarterly',
//     paymentDate: '2021-05-13',
//     recordDate: '2021-05-10',
//     refid: 2217520,
//     symbol: 'AAPL',
//     id: 'DIVIDENDS',
//     key: 'AAPL',
//     subkey: '2217520',
//     date: 1620345600000,
//     updated: 1619743073000
//   },

async function getDividendsYearToDate() {
  const d = await dividendsBasic(
    "AAPL",
    "ytd",
    "sk_60ff64467da24038896a41a009643d96"
  );
}
