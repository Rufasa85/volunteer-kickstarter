const express = require('express');
const router = express.Router();
const volunteerRoutes = require("./volunteerRoutes");
const opportunityRoutes = require("./opportunityRoutes");

router.use("/api/volunteers",volunteerRoutes);
router.use("/api/opportunities",opportunityRoutes);

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;