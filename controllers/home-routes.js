const router = require('express').Router();
const watchlist = require('./watchlist');
const { response } = require("express");
const sequelize = require("../configuration/config");
const { User } = require("../models");
const stock = require('../Utils/stockmarket');

//const searchResult = requrie('../search');

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

router.get("/dashboard", async (req, res) => {
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

router.get("/search/:ticker", async(req, res) => {
  let stockCurrent = await stock.getCurrentPrice(req.params.ticker)
  let stockOpen = await stock.getOpenPrice(req.params.ticker)
  let stockCurrentPrice = "$"+parseFloat(stockCurrent.price).toFixed(2)
  let stockOpenPrice = "$"+parseFloat(stockOpen.open).toFixed(2)
  let stockChangePerc = "(" + parseFloat(stockOpen.change).toFixed(2) + "%)"
  
  res.render("search", {

    logged_in: true,
    tickerCurrent: stockCurrentPrice, 
    tickerOpenPrice: stockOpenPrice, 
    tickerOpen: stockOpen, 
    tickerChange: stockChangePerc})
});

router.get("/portfolio", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true});
    const balance = parseFloat(user.balance / 100).toFixed(2);
    res.render("portfolio", {
      user,
      balance,
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