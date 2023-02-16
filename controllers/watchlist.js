const router = require('express').Router();
const { Watchlist } = require('../models');

router.get('/', async (req, res) => {
    try {
        const userList = await Watchlist.findAll({
            where: { userID: req.session.user_id },
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
                    watchlistIDNoSpace: userList[i].watchlistID.replace(/ /g, '_'),
                    stockSymbols: [{
                        stock: userList[i].stockSymbol,
                        list: userList[i].watchlistID,
                        isNotEmpty: (userList[i].stockSymbol !== "_")
                    }]
                };
            }
            else {
                sortedList[count].stockSymbols.push({ 
                    stock: userList[i].stockSymbol, 
                    list: userList[i].watchlistID,
                    isNotEmpty: true,
                });
            }
        }
        //need to render lists
        res.render('watchlist', {
            watchlists: sortedList,
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(404).send("unable to load page");
        console.log(err)
    }
});

router.delete('/', async (req, res) => {
    try {
        if (req.body.stock !== '_') {
            await Watchlist.destroy({
                where: {
                    userID: req.session.user_id,
                    watchlistID: req.body.list,
                    stockSymbol: req.body.stock
                }
            });
            const listExists = Watchlist.findOne({ where: { watchlistID: req.body.list } })
                .then((obj) => {
                    if (obj) return;
                    Watchlist.create({
                        userID: req.session.user_id,
                        watchlistID: req.body.list,
                        stockSymbol: '_'
                    })
                })

            res.status(200).json({ message: "successfully deleted stock" });
        }
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
                userID: req.session.user_id
            }
        });
        res.status(200).json({message:"deleted successfully"});
    }
    catch {
        res.status(404).json({ message: "No user with this ID!" });
    }
});

module.exports = router;