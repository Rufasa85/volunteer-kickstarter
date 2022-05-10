const express = require('express');
const router = express.Router();
const {Opportunity,Volunteer} = require('../models');
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    Volunteer.findAll().then(allUsers=>{
        res.json(allUsers)
    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:"invalid info",err});
    })
})

router.get("/:id",(req,res)=>{
    Volunteer.findByPk(req.params.id,{
        include:[
            {
                model:Opportunity,
                as:"Creator"
            },
            {
                model:Opportunity,
                as:"Attendee"
            },
        ]
    }).then(oneUser=>{
        res.json(oneUser)
    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:"invalid info",err});
    })
})

router.post("/",(req,res)=>{
    Volunteer.create(req.body).then(newUser=>{
        req.session.user = {
            id:foundUser.id,
            username:newUser.username
        }
        res.json(newUser)
    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:"invalid info",err});
    })
})
router.post("/login",(req,res)=>{
    Volunteer.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
           return res.status(400).json({msg:"invalid credentials"})
        }
        if(bcrypt.compareSync(req.body.password,foundUser.password)){
            req.session.user = {
                id:foundUser.id,
                username:foundUser.username
            }
            return res.json(foundUser)
        }
        return res.status(400).json({msg:"invalid credentials"})

    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:"invalid info",err});
    })
})
router.delete("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out!")
})

module.exports = router;