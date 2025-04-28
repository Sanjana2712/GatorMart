const express = require("express");
const router = express.Router();
const User = require('../models/User.js');
const UserUnverified = require('../models/UserUnverified.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
require('dotenv/config');
const { uploadFile, getFileStream } = require('../s3');
const nodemailer = require("nodemailer");
const {v4: uuidv4}=require("uuid");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

const sendVerificationEmail = async ({_id,email,uniqueString}, res) => {
        const userId=_id;
        const currentURL="http://localhost:3000/";
        const mailOptions = {
            from: 'gatormart.sf@gmail.com',
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Hello,</p><p>To create your account, please verify your email address by clicking below:</p><p> <a href=${currentURL + "api/verify/" + userId+ "/"+ uniqueString}> Verify email </a></p>`
        };
        bcrypt
        .hash(uniqueString, 10)
        .then((hashedUniqueString) => {
            // Update the uniqueString value of the user
            UserUnverified.findOneAndUpdate({ email }, { uniqueString: hashedUniqueString, $set: { createdAt: Date.now(), expiresAt: Date.now() + 7200000 } })
            .then(() => {
                console.log("Unique string updated successfully.");
            })
            .catch((error) => {
                console.error("Error updating unique string:", error);
            });

            transporter.sendMail(mailOptions)
                .then(() => {
                    
                    console.log("Verification email sent successfully.");
                })
                .catch((error) => {
                    
                    console.error("Error sending verification email:", error);
                });
            })
            .catch(() => {
                res.json({
                    status: "FAILED",
                    message: "Error occurred while hashing email data",
                });
        });
    }; 
    
    router.get('/api/verify/:userId/:verificationToken', async (req, res) => {
        try {
            console.log("im in the verify api");
            const { userId, verificationToken } = req.params;
            const userUnverified = await UserUnverified.findById(userId);
            if (!userUnverified || Date.now() > userUnverified.expiresAt) {
                return res.status(400).json({ status: 'error', message: 'Verification link expired'});
            }
            const isVerifValid = await bcrypt.compare(verificationToken, userUnverified.uniqueString);

            if(isVerifValid){
                const newUser = new User({
                    name: userUnverified.name,
                    email: userUnverified.email,
                    password: userUnverified.password,
                    profile_url: userUnverified.profile_url,
                    verified: true
                });
                newUser.save()
                .then(() => {
                    UserUnverified.findByIdAndDelete(userUnverified._id)
                        .then(() => {
                            res.status(200).json({ status: 'success', message: 'User verified successfully' });
                        })
                        .catch((error) => {
                            console.error("Error deleting entry from UserUnverified:", error);
                            res.status(500).json({ status: 'error', message: 'Failed to delete entry from UserUnverified' });
                        });
                })
                .catch((error) => {
                    console.error("Error saving user:", error);
                    res.status(500).json({ status: 'error', message: 'Error while saving user to User table' });
                });
        } else {
            return res.status(400).json({ status: 'error', message: 'Invalid verification details' });
        }
    } catch (error) {
        console.log("Error verifying email:", error);
        return res.status(500).json({ status: 'error', message: 'Unexpected Error Occurred' });
    }
});


    router.post('/api/register', async (req, res) => {
        const { fullname, email, password } = req.body;
        try {
            const [existingUser, existingVerification] = await Promise.all([
                User.findOne({ email }),
                UserUnverified.findOne({ email })
            ]);
            if (existingUser || existingVerification) {
                return res.status(409).json({ status: 'error', message: 'Email already registered' });
            }            
            const verificationToken = uuidv4(); 
            const newPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new UserUnverified({
                name: req.body.fullname,
                email: req.body.email,
                password: newPassword,
                profile_url: process.env.DEFAULT_PROFILE_URL,
                uniqueString: verificationToken,
            });

            newUser.save()
                .then((result) => {
                    sendVerificationEmail(result, res)
                    .then(() => {
                        res.status(200).json({ status: 'success', message: 'User registered successfully' });
                    })
                    .catch((error) => {
                        console.error("Error sending verification email:", error);
                        res.status(500).json({ status: 'error', message: 'Failed to send verification email' });
                    });
                })
                .catch((error) => {
                    console.error("Error saving user:", error);
                    res.status(500).json({ status: 'error', message: 'Error while saving user' });
                });
            
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).json({ status: 'error', message: 'Unexpected Error Occurred' });
        }
    });
    

    router.post('/api/login', async (req, res) => {
        try{
            const user = await User.findOne({
                email: req.body.email,
            });
            if (!user) {
                const userUnverified = await UserUnverified.findOne({
                    email: req.body.email,
                });
                if (!userUnverified) {
                return res.status(200).json({status:'error', message:'User does not exist'  });}
                else{
                    if (Date.now() > userUnverified.expiresAt) {
                        return res.status(400).json({ status: 'error', message: 'Verification link expired' });
                    } else {
                        return res.status(400).json({ status: 'error', message: 'Email not verified yet' });
                    }
                }
            }
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                user.password
            )
        
            if (isPasswordValid) {
                const token = jwt.sign(
                    {
                        name: user.name,
                        email: user.email,
                    },
                    process.env.SECRET_KEY_JWT
                )
                return res.status(200).json({ status: 'success',message:'Login Successfull', user: token ,user_id:user._id,fullname:user.name, profile_url:user.profile_url});
            } else {
                console.log("invalid password");
                return res.status(200).json({status:'error', message:'Invalid Password'  });
            }}catch(err){
                return res.status(500).send("Unexpected error occurred");
            }      
    })

    router.post('/api/userinfo', async (req, res) => {
        try{
            const userInfo = await User.findById(req.body.userId);
            if (!userInfo) { // Check if userInfo is null
                return res.status(404).send({ message: 'User not found' });
            }
            userInfo.password="";
            res.send(userInfo);}
            catch(err){
                res.status(500).send(err);
                console.log(err);
        
            }
        
        });

router.post("/api/imgupload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    await User.findByIdAndUpdate(req.body.userId, {
      profile_url: result.Location,
    });
    const updatedUserInfo = await User.findById(req.body.userId);
    res
      .status(200)
      .json({
        status: "success",
        message: "Image uploaded Sucessfully",
        api2_profile_url: updatedUserInfo.profile_url,
      });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

//change this approach
router.get("/api/image/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

module.exports = router;
