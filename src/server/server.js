
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const mydbroutes = express.Router();
const  PORT = 4000;

let Mydb = require('./mydb.model')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log('db connected established');
});

//fetch all items in mydb

mydbroutes.route('/').get(function(req,res){
    Mydb.find(function(err, post){
        if(err){
            console.log(err);
        }else{
            res.json(post);
        }
    });
});

//fetch items in mydb based on :id

mydbroutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Mydb.findById(id,function(err, mydb){
        res.json(mydb);
    });
});

//delete item
mydbroutes.route('/delete/:id').delete(function(req,res){
    let id = req.params.id;
    
    Mydb.findByIdAndRemove(id)
        .then(res.send('deleted'))        
});

//update post
mydbroutes.route('/update/:id').post(function(req,res){
    let id = req.params.id;
    let fid = (err, mydb) => {
        if(!mydb){
            res.status(404).send('data not found');
        }else{
            mydb.title = req.body.title;
            mydb.post = req.body.post;
        };
        mydb.save().then(mydb => {
            res.json('post saved')
        })
        .catch(err =>{
            res.status(404).send('update failed');
        });
    }
    Mydb.findById(id,fid);
});

//add new items to mydb

mydbroutes.route('/add').post(function(req,res){
    let post = new Mydb(req.body);
    post.save()
        .then(post => {
            res.status(200).json({'post': 'post added successfully'});
        })
        .catch(err => {
            req.status(400).send('post failed to add');
        });
});

app.use('/mydb', mydbroutes);

app.listen(PORT, function(){
    console.log('server is running on Port ' + PORT);   
});
