const router = require('express').Router();
const { Watchlist } = require('../../models');
const sequelize = require('../../configuration/config');

router.get('/allLists', async (req, res)=>{
    const user_id = req.session.user_id || req.body.user_id;
    const lists = await Watchlist.findAll({
        attributes:[
            'watchlistID'
        ],
        where:{
            userID:user_id
        },
        group:['watchlistID']
    });
    if(lists){
        res.status(200).json({lists});
    }
});

router.post('/create/:id', async (req, res) => {
    try {
        await Watchlist.create({
            watchlistID: req.params.id,
            userID: req.session.user_id,
            stockSymbol: '_'
        });
        res.status(200).json({ message: "created successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "error creating list" });
    }
});

router.post('/add', async (req, res) => {
    try {
        const confirm = await sequelize.query(`
        select * from watchlist where 
        watchlistID = '${req.body.watchlistID}' and 
        userID = ${Number(req.session.user_id)}
        `);
        if (confirm.length > 0) {
            const doesExist = await sequelize.query(`
            select * from watchlist where 
            watchlistID = '${req.body.watchlistID}' and 
            userID = ${Number(req.session.user_id)} and
            stockSymbol = '${req.body.stockSymbol}'
            `);
            if (doesExist[0].length > 0) {
                return res.status(200).json({ message: `${req.body.stockSymbol} is already in that watchlist` })
            }

            if (confirm[0][0].stockSymbol === '_') {
                await Watchlist.update({
                    stockSymbol: req.body.stockSymbol
                }, {
                    where: {
                        watchlistID: req.body.watchlistID,
                        userID: req.session.user_id,
                        stockSymbol: '_'
                    }
                });
            }
            else {
                await Watchlist.create({
                    watchlistID: req.body.watchlistID,
                    userID: req.session.user_id,
                    stockSymbol: req.body.stockSymbol
                });
            }
            res.status(200).json({ message: "created successfully" });
        }
        else res.status(400).json({ message: "unable to find list" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "error creating list" });
    }
});

router.get('/:ID', async (req, res) => {
    const watchList = await Watchlist.findAll({
        where: {
            userID: req.session.userID,
            watchListID: req.params.id
        }
    });
    if (watchList[0] === undefined) res.status(400).json({ message: "Unable to find watchlist" })
});

module.exports = router;