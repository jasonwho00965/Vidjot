const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Delete Idea
router.delete('/:id',(req,res)=>{
    // res.send('nb小老弟')
    Idea.remove({_id:req.params.id})
        .then(()=>{
            res.redirect('/ideas');
        })
});

//Edit Form process
router.put('/:id',(req,res) => {
    Idea.findOne({
        _id:req.params.id
    })
    .then(idea =>{
        //new values
        idea.title=req.body.title;
        idea.details = req.body.details;
        idea.save()
            .then(idea=>{
                res.redirect('/ideas');
            })
    });
});

//Idea Index Page
router.get('/', (req,res) =>{
    Idea.find({})
        .sort({date:'desc'})
        .then(ideas => {
            res.render('ideas/index',{
                ideas:ideas
            });
       });
});

//Process Form
router.post('/',(req,res)=>{
    let errors = [];
    if(!req.body.title){
        errors.push({text:'Please add a title'});
    }
    if(!req.body.details){
        errors.push({text:'Please add some details'});
    }
    if(errors.length >0){
        res.render('ideas/add',{errors:errors, title:req.body.title, details:req.body.details});
    }else{
        const newUser ={
            title:req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                res.redirect('/ideas');
            })
    }
});

//Edit Idea Form
router.get('/edit/:id',(req,res)=>{
    Idea.findOne({
        _id:req.params.id
    })
    .then(idea =>{
        res.render('ideas/edit',{
            idea:idea
        });
    });
});


//Add Idea Form
router.get('/add',(req, res)=>{
    res.render('ideas/add');
});

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

module.exports = router;
