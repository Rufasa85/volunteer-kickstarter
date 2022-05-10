const express = require("express");
const router = express.Router();
const { Volunteer, Opportunity } = require("../models");

router.get("/", (req, res) => {
  Opportunity.findAll().then(opps => {
    const hbsOpps = opps.map(op => op.get({ plain: true }));
    function distance(lat1, lat2, lon1, lon2) {
        console.log(lat1,lat2,lon1,lon2)
      // The math module contains a function
      // named toRadians which converts from
      // degrees to radians.
      lon1 = (lon1 * Math.PI) / 180;
      lon2 = (lon2 * Math.PI) / 180;
      lat1 = (lat1 * Math.PI) / 180;
      lat2 = (lat2 * Math.PI) / 180;

      // Haversine formula
      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));

      // Radius of earth in kilometers. Use 3956
      // for miles
      let r = 6371;

      // calculate the result
      return c * r;
    }
    if(req.session.user){
        hbsOpps.forEach(opp=>{
            opp.distance = distance(parseFloat(req.session.user.lat),parseFloat(opp.lattitude),parseFloat(req.session.user.long),parseFloat(opp.longitude)).toFixed(2)
        })
    }
    console.log(hbsOpps);
    const loggedIn = req.session.user?true:false
    console.log(loggedIn)
    res.render("home", { opps: hbsOpps,loggedIn:loggedIn });
  });
});

module.exports = router;
