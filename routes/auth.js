const express = require('express');
const {registerUser, loginUser} = require("../handlers/auth-handler");
const router = express.Router();
// Register API

router.post("/register", async (req, res) => {
    let model = req.body;
    if (model.name && model.email && model.password) {
        await registerUser(model);
        res.send({message: "User Registered",});
    } else {
        res.status(400).json({
            error: "Please provide name , email and password",
        });
    }
});

// LogIn API


router.post("/login", async (req, res) => {
    let model = req.body;
    if ( model.email && model.password) {
    const result= await loginUser(model);
        if (result) {
            res.send(result);
        }else{
            res.status(400).json({
            error: "Invalid Email or password",
        });
        }

    } else {
        res.status(400).json({
            error: "Please Provide email and password",
        });
    }
});


module.exports = router;