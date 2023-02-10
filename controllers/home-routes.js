const router = require('express').Router();

router.get('/', async (req, res)=>{
    try{
        res.status(200).send("Hello");
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
})


module.exports = router; 