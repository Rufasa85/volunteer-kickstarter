const express = require("express");
const router = express.Router();
const { Volunteer, Opportunity } = require("../models");
function distance(lat1, lat2, lon1, lon2) {
  console.log(lat1, lat2, lon1, lon2);
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

router.get("/", (req, res) => {
  Opportunity.findAll().then(opps => {
    const hbsOpps = opps.map(op => op.get({ plain: true }));
    if (req.session.user) {
      hbsOpps.forEach(opp => {
        opp.distance = distance(
          parseFloat(req.session.user.lat),
          parseFloat(opp.lattitude),
          parseFloat(req.session.user.long),
          parseFloat(opp.longitude)
        ).toFixed(2);
      });
    }
    console.log(hbsOpps);
    opps.forEach(async (opp, i) => {
      const vols = await opp.countAttendee();
      hbsOpps[i].slotsLeft = hbsOpps[i].volunteersNeeded - vols;
    });
    const loggedIn = req.session.user ? true : false;
    console.log(loggedIn);
    res.render("home", { 
      opps: hbsOpps, 
      loggedIn: loggedIn,
      userid:loggedIn?req.session.user.id:null
    });
  });
});

router.get("/opps/:id", (req, res) => {
  Opportunity.findByPk(req.params.id, {
    include: [
      {
        model: Volunteer,
        as: "Creator"
      },
      {
        model: Volunteer,
        as: "Attendee"
      }
    ]
  })
    .then(foundEvent => {
      if (!foundEvent) {
        return res.redirect("/notfound");
      }
      hbsData = foundEvent.get({ plain: true });
      hbsData.slotsLeft = hbsData.volunteersNeeded - hbsData.Attendee.length;
      hbsData.distance = distance(
        parseFloat(req.session.user.lat),
        parseFloat(hbsData.lattitude),
        parseFloat(req.session.user.long),
        parseFloat(hbsData.longitude)
      ).toFixed(2);
      hbsData.loggedIn = req.session.user ? true : false;
      res.render("singleOpp", hbsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "something went wrong", err });
    });
});

router.get("/notfound", (req, res) => {
  res.render("404", {
    loggedIn: req.session.user ? true : false
  });
});

router.get("/login", (req, res) => {
  if(req.session.user) {
    return res.redirect("/profile")
  }
  res.render("login", {
    loggedIn: req.session.user ? true : false
  });
});

router.get("/profile",(req,res)=>{
  if(!req.session.user){
    return res.status(401).json({msg:"login first!"})
  }
  Volunteer.findByPk(req.session.user.id,{
    include:[
      {
        model:Opportunity,
        as:"Creator",
      },
      { 
        model:Opportunity,
        as:"Attendee",
      }
    ]
  }).then(data=>{
    const hbsData = data.get({plain:true});
    hbsData.loggedIn = req.session.user ? true : false;
    data.Attendee.forEach(async (opp, i) => {
      const vols = await opp.countAttendee();
      hbsData.Attendee[i].slotsLeft = hbsData.Attendee[i].volunteersNeeded - vols;
    });
    data.Creator.forEach(async (opp, i) => {
      const vols = await opp.countAttendee();
      hbsData.Creator[i].slotsLeft = hbsData.Creator[i].volunteersNeeded - vols;
    });
    hbsData.Attendee.forEach(opp => {
      opp.distance = distance(
        parseFloat(req.session.user.lat),
        parseFloat(opp.lattitude),
        parseFloat(req.session.user.long),
        parseFloat(opp.longitude)
      ).toFixed(2);
    });
    // res.json(hbsData);
    res.render("profile",hbsData)
  })
})

module.exports = router;
