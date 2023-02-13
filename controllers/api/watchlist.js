const router = require('express').Router();
const watchList = require('../../models/WatchList');

router.get('/:ID', async (req, res) => {
    const watchList = await watchList.findAll({
        where: {
            userID: req.session.userID,
            watchListID: req.params.id
        }
    });
    if(watchList[0] === undefined) res.status(400).json({message:"Unable to find watchlist"})
});

module.exports = router;