const router = require('express').Router();
const watchlist = require('./watchlist');
const { response } = require("express");
const sequelize = require("../configuration/config");
const { User } = require("../models");
const withAuth = require("../utils/auth");
const stock = require('../Utils/stockmarket');

router.get("/", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.render("login");
    } else {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
      });
      const user = userData.get({ plain: true });
      res.render("dashboard", {
        user,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });
    res.render("dashboard", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search/:ticker", withAuth, async(req, res) => {
  
  let stockCurrent = await stock.getCurrentPrice(req.params.ticker)
  let stockOpen = await stock.getOpenPrice(req.params.ticker)
  console.log(stockOpen)
  console.log(stockOpen.status)

  if (stockOpen.status === "error"){
    let stockName = "Stock Not Found"
    
    res.render("search", {

      logged_in: true,
      tickerName: stockName,
    })
  }

  else{
    let stockCurrentPrice = "$"+parseFloat(stockCurrent.price).toFixed(2)
    let stockOpenPrice = "$"+parseFloat(stockOpen.open).toFixed(2)
    let stockChangePerc = "(" + parseFloat(stockOpen.change).toFixed(2) + "%)"

    res.render("search", {

      logged_in: true,
      tickerName: stockOpen.name,
      tickerCurrent: stockCurrentPrice, 
      tickerOpenPrice: stockOpenPrice,  
      tickerChange: stockChangePerc
    })
  }
});

router.get("/portfolio", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true});
    res.render("portfolio", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

router.use('/watchlist', watchlist);

module.exports = router;