const express = require('express');
const { Schema } = require('mongoose');
const router = express.Router();

const TeamInfo = require("../models/teamInfo");


router.get('/teaminfo',(req,res) => {
    res.end('express backend connected');
})
// router.get('/lakshay', async (req, res) => {
//     const lakshayInfo= {name: 'Lakshay Mittal', teamRole:'Backend Lead', description:'Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. Well-versed in technology and writing code to create systems that are reliable and user-friendly. Skilled leader who has the proven ability to motivate, educate, and manage a team of professionals to build software programs and effectively track changes. Confident communicator, strategic thinker, and innovative creator to develop software that is customized to meet a company’s organizational needs, highlight their core competencies, and further their success.'};
//     const newTeamInfo= new TeamInfo(lakshayInfo);
//     try{
//         await newTeamInfo.save(async (err, newTeamInfoResult)=>{
//             console.log('new user created');
//             res.end('Lakshay was added');
//         });
//     } catch(err){
//         console.log(err);
//         res.end('Lakshay was not added');
//     }

// });
// router.get('/sanjana', async (req, res) => {
//     const sanjanaInfo= {name: 'G Sanjana', teamRole:'Team Lead', description:"Hello everyone! I'm Sanjana, and I'm the team lead for this project. After graduating from college with a degree in computer science, I decided to pursue a Master's in computer science as well to further fuel my passion for coding and AI innovations. During my free time I love to read books, watch paleontology documentaries, roam around the city and cook/invent new recipes."};
//     const newTeamInfo= new TeamInfo(sanjanaInfo);
//     try{
//         await newTeamInfo.save(async (err, newTeamInfoResult)=>{
//             console.log('new user created');
//             res.end('Sanjana was added');
//         });
//     } catch(err){
//         console.log(err);
//         res.end('User was not added');
//     }

// });
module.exports = router;
