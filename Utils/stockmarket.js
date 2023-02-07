require("dotenv").config();
const ws = require('ws');

let stocks = module.exports = {};
const apiURL = "https://api.twelvedata.com/";
const apiKey = process.env.API_KEY

stocks.getCurrentPrice = async function GetCurrentPrice(stockName) {
    const path = `${apiURL}price?symbol=${stockName}&apikey=${apiKey}`
    const value = await fetch(path)
        .then(data => data.json())
        .then(data => {
            return data;
        })
        .catch(err => { 
            console.log(err); 
            return err; 
        });

    return value;
}

stocks.getOpenPrice = async function GetOpenPrice(stockName){
    const path = `${apiURL}quote?symbol=${stockName}&apikey=${apiKey}`
    const value = await fetch(path)
        .then(data => data.json())
        .then(data => {
            return data;
        })
        .catch(err => { 
            console.log(err); 
            return err; 
        });

    return value;
}

const wsClient = new ws(`wss://ws.twelvedata.com/v1/quotes/price?apikey=${apiKey}`);