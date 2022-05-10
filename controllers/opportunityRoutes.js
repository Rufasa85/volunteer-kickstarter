const express = require('express');
const router = express.Router();
const {Opportunity,Volunteer} = require('../models');


router.get("/",(req,res)=>{
    Opportunity.findAll().then(allOps=>{
        res.json(allOps)
    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:"invalid info",err});
    })
})

router.get("/:id",(req,res)=>{
    Opportunity.findByPk(req.params.id,{
        include:[
            {
                model:Volunteer,
                as:"Creator"
            },
            {
                model:Volunteer,
                as:"Attendee"
            },
        ]
    }).then(oneOpp=>{
        res.json(oneOpp)
    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:"invalid info",err});
    })
})

router.post("/",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({msg:"login first!"})
    }
    Opportunity.create({
        ...req.body,
        CreatorId:req.session.user?.id,
        lattitude:req.session.user.lat,
        longitude:req.session.user.long
    }).then(newOpp=>{
        res.json(newOpp)
    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:"invalid info",err});
    })
})

router.post("/:oppId/addvolunteer/:volId",(req,res)=>{
    Opportunity.findByPk(req.params.oppId).then(foundOpp=>{
        foundOpp.addAttendee(req.params.volId).then(data=>{
            res.json(data);
        })
    })
})

router.put("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({msg:"login first!"})
    }
    Opportunity.findByPk(req.params.id).then(foundOpp=>{
      if(req.session.user.id !== foundOpp.CreatorId){
          return res.status(403).json({msg:"this isnt yours"})
      }
      Opportunity.update(req.body,{
          where:{
              id:req.params.id
          }
      }).then(updated=>{
          res.json(updated)
      })
    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:"invalid info",err});
    })
})

router.delete("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({msg:"login first!"})
    }
    Opportunity.findByPk(req.params.id).then(foundOpp=>{
      if(req.session.user.id !== foundOpp.CreatorId){
          return res.status(403).json({msg:"this isnt yours"})
      }
      Opportunity.destroy({
          where:{
              id:req.params.id
          }
      }).then(delOpp=>{
          res.json(delOpp)
      })
    })
})

module.exports = router;