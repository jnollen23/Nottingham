require("dotenv").config();
const ws = require('websocket');
const http = require('http');

let stocks = module.exports = {};
const apiURL = "https://api.twelvedata.com/";
const apiKey = process.env.API_KEY

stocks.getCurrentPrice = async function GetCurrentPrice(stockName) {
    const path = `${apiURL}price?symbol=${stockName}&apikey=${apiKey}`
    const response = await fetch(path);
    const returnvalue = response.json();
    return returnvalue;
}

stocks.getOpenPrice = async function GetOpenPrice(stockName) {
    try{
    const path = `${apiURL}quote?symbol=${stockName}&apikey=${apiKey}`
    const response = await fetch(path);
    const returnvalue =  response.json();
    console.log(response);
    return returnvalue;
    }catch(err){console.log(err)}
}

let wsClient = null;
let stocksToTrack = null;
let httpServer = null;
let wsServer = null;
let wsConnection = null;
let heartbeatID = null;

stocks.setupRealTimePrice = function SetupRealTimePrice(stocksToTrackV) {
    wsClient = new ws.client();
    stocksToTrack = stocksToTrackV;
    wsClient.on('connect', function (connection) {
        console.log(`Tracking ${stocksToTrack} stock symbols`);

        connection.on('error', function (error) {
            console.log("connection error" + err.toString());
        });
        connection.on('close', function (code, reason) {
            console.log(`connection closed:${code} ${reason}`);
        });
        connection.on('message', function (data) {
            console.log(JSON.parse(data.utf8Data));
        });
        connection.on("ping", function (data) {
            connection.pong();
            console.log(`Ping Request >> ${data}`);
        });
        connection.on("pong", function (data) {
            console.log(`Pong Request >> ${data}`);
        });

        let stocks = stocksToTrack.split(',');
        stocks.forEach(stock => {
            let message = {
                action: "subscribe",
                params: {
                    symbols: stock
                },
            };

            connection.sendUTF(JSON.stringify(message));
        });

        heartbeatID = setTimeout(heartbeat, 10000);
        wsConnection = connection;

    });
    wsClient.on("open", function () {
        console.log("Connection Open")
    })
    wsClient.on('close', function () {
        console.log('Web socket closed');
    });

    wsClient.connect(`wss://ws.twelvedata.com/v1/quotes/price?apikey=${apiKey}`);
    //wsClient.connect('ws://localhost:8080', 'echo-protocol');
}

stocks.openTestServer = function OpenTestServer() {
    httpServer = http.createServer(function (request, response) {
        console.log("server running");
    })

    wsServer = new ws.server({
        httpServer: httpServer,
        autoAcceptConnections: false
    });

    httpServer.listen(8080, function () {
        console.log("Server is listneing");
    });

    function originIsAllowed(origin) {
        return true;
    }

    wsServer.on('request', function (request) {
        if (!originIsAllowed(request.origin)) {
            request.reject();
            console.log("connection rejected");
        }

        const connection = request.accept('echo-protocol', request.origin);
        console.log("Connection Started");
        connection.on("message", function (message) {
            connection.sendUTF(message.utf8Data);
        });

        connection.on('close', function (reasonCode, description) {
            console.log("connection closed");
        });
    });
}

stocks.closeRealTimePrice = function CloseRealTimePrice() {
    if (wsConnection) {
        wsConnection.close(1001);
        wsConnection = null;
        clearTimeout(heartbeatID);
    }
}

function heartbeat() {
    wsConnection.ping("Heartbeat");
    heartbeatID = setTimeout(heartbeat, 10000);
}

