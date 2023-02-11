const router = require('express').Router();
const watchList = require('../../models/WatchList');

router.get('/', async (req, res) => {
    const userList = await watchList.findAll({
        where: { userID: req.session.userID },
        order: [
            ["watchlistID", "desc"]
        ]
    });

    //need to render lists

});

router.get('/edit/:ID', async (req, res) => {
    const userList = await watchList.findAll({
        where: { 
            userID: req.session.userID, 
            watchlistID: req.params.ID 
        }
    });

    //render list in edit mode
});

router.post('/edit/:ID', async (req, res) => {
    //get info from body

    //update database with changes

    //render list in edit mode
});






module.exports = router;