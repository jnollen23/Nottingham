const router = require('express').Router();
const { Watchlist } = require('../models');

const testingUserID = 1;

router.get('/', async (req, res) => {
    try {
        const userList = await Watchlist.findAll({
            where: { userID: testingUserID },
            order: [
                ["watchlistID", "desc"]
            ]
        });
        const sortedList = [];
        let count = -1;
        //need to parse db response into a foreach-able variable
        for (let i = 0; i < userList.length; i++) {
            if (i === 0 || userList[i].watchlistID != userList[i - 1].watchlistID) {
                count++;
                sortedList[count] = {
                    watchlistID: userList[i].watchlistID,
                    stocks: [
                        userList[i].stockSymbol
                    ]
                };
            }
            else {
                sortedList[count].stocks.push(userList[i].stockSymbol);
            }
        }
        //need to render lists
        res.render('watchlist', { sortedList });
    }
    catch(err) {
        res.status(404).send("unable to load page");
        console.log(err)
    }
});

router.delete('/stock/:ID', async (req, res) => {
    try {
        await Watchlist.detroy({
            where: {
                userID: req.session.userID,
                watchlistID: req.params.ID,
                stockSymbol: req.body.stockSymbol
            }
        });
        if (!userList[0]) res.status(404).json({ message: "No watch list with that ID" });
        res.status(200);
    }
    catch (err) {
        res.status(404).json({ err });
    }
});

router.delete('/:ID', async (req, res) => {
    //get request from body and convert to model, but need to remove old model
    try {
        Watchlist.destroy({
            where: {
                watchlistID: req.params.ID,
                userID: req.session.userID
            }
        });
        res.status(200);
    }
    catch {
        res.status(404).json({ message: "No user with this ID!" });
    }
});

module.exports = router;