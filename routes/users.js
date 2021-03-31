const express = require('express')
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const { use } = require('passport');

let userid='6045e8627392932444850b5d';

const Register = require('../models/userModel')
router.use(express.static("public"));

router.post('/', (req, res, next) => {
    var email = req.body.name;
    var password = req.body.password
    Register.findOne({ email: email, password: password }, function(err, user) {
        if (err) {
            console.log('Error')
            // alert("Either Wrong email or wrong password");
            return res.status(500).redirect('/')
        }
        if (!user) {
            // alert("No such user exists");
            return res.status(404).redirect('/')
        }
        else if (user) {
            console.log(user);
            userid=(user._id).toString();
            return res.status(200).redirect('/home')
        }

    })

})


// const userid = '5ecfdb64e215d63578ae4532'
router.use('/addFav/:bookID', function(req, res) {
    const bookId = req.params.bookID;
    const id = userid;
    Register.updateOne({ _id: userid }, { $push: { favourite: bookId } }).exec()
        .catch(err => { console.log(err) })
})

router.use('/delFav/:bookID', function(req, res) {
    const bookId = req.params.bookID;
    const id = userid;
    Register.updateOne({ _id: userid }, { $pull: { favourite: bookId } }).exec()
        .catch(err => { console.log(err) })
})

router.use('/addToCart/:bookID', function(req, res) {
    const bookId = req.params.bookID;
    const id = userid;
    Register.updateOne({ _id: userid }, { $push: { wishlist: bookId } }).exec()
        .catch(err => { console.log(err) })
})

router.use('/delFromCart/:bookID', function(req, res) {
    const bookId = req.params.bookID;
    const id = userid;
    Register.updateOne({ _id: userid }, { $pull: { wishlist: bookId } }).exec()
        .catch(err => { console.log(err) })
})



router.get('/showFav', async(req, res) => {
    const results = await Register.find({ _id: userid }, { favourite: 1 });
    console.log(results);
    let favObj = (results[0].favourite).toString();
    console.log("Fav obj")
    let favlist = favObj.split(",")
    console.log(favlist)
    return res.send({ arrList: favlist });
})

router.get('/showCart', async(req, res) => {
    const results = await Register.find({ _id: userid }, { wishlist: 1 });
    let cartObj = (results[0].wishlist).toString();
    let cartlist = cartObj.split(",")
    return res.send({ arrList: cartlist });
})

router.get('/welcome',async(req,res)=>{
    const results=await Register.find({_id:userid})
    console.log(results[0].name);
    return res.send(results[0]);
})

module.exports = router