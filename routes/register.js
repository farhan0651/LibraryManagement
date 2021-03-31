const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Register = require('../models/userModel')

router.post('/', (req, res, next) => {
    // const product ={
    //     name: req.body.name,
    //     price: req.body.price
    // }
    const register = new Register({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    register.save()
        .then(result => {
            console.log(result)
            return res.status(201).redirect('/')
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

})

module.exports = router