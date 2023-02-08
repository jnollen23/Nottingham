// Test for Price at Open
stock.getOpenPrice("A").then(data => console.log(data));

// Test for Current Price
stock.getCurrentPrice("A").then(data => console.log(data));

// Tests for websocket connection
// Stock tickers we can test with are limited use
// https://support.twelvedata.com/en/articles/5335783-trial
stock.openTestServer();

stock.setupRealTimePrice("QQQ,ABML,AAPL");


setTimeout(stock.closeRealTimePrice, 50000, 'test');