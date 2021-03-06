const { First, Third, OirTestOne, OirTestTwo, OirTestThree, OirTestFour, OirTestFive } = require('../../models/quizModel')
const Question = require('../../models/saveQuestion')


const two = async (req, res) => {
    let picture = "";
    let totalQues = 0;
    let count = 0;
    let highscore = 0;
    let firstTime = 0;
    if (req.isAuthenticated()) {
      picture = req.user.picture;
      // To find number of attempts 
     await OirTestTwo.find({ email: req.user.email }, function (err, data) {
        if (err) {
          console.log(err);
        }
        else{
          if (data.length == 0) {
            count = 1;
            firstTime = 1;
          }
          else {
            count = data[0].count + 1;
            firstTime = 0;
            highscore = data[0].highscore;
          }
        }
      })
      await Question.find({}, function (err, ques) {
        if (err) {
          console.log(err);
        }
        else {
          
          console.log("total questions");
          totalQues = ques.length;
          console.log(totalQues);
          console.log(count);
          res.render("oirtesttwo", { picture: picture, email: req.user.email, username: req.user.username, totalQues: totalQues, count: count, highscore: highscore, firstTime: firstTime });
        }
      })
     
    }
    else {
      res.redirect("/login");
    }
}

// POST REQUEST TO SAVE PROGRESS FOR OIRTESTTWO
// Post Request To Save Progress for new user OIRTESTTWO Model  Second Practice
const savetwo = async (req, res) => {
    console.log("post happend");
    console.log(req.body);
    const data = await new OirTestTwo(req.body);
    data.save();
    setTimeout(() => {
      res.redirect("/oir/home");
    }, 1000);
}

// Post Request To Update Progress for old user OIRTESTTWO Model Second PRACTICE
const savereturntwo = async (req, res) => {
    if (req.isAuthenticated()) {
        await OirTestTwo.findOneAndUpdate({ email: req.user.email }, req.body, function (err, docs) {
           if(err) {
             console.log(err);
           }
           else {
             console.log("successfully updated");
             console.log(req.body);
             }
        })
       
        setTimeout(() => {
          res.redirect("/oir/home");
        }, 1000);
      }
      else{
        res.redirect("/login");
      }
}
module.exports = {two,savetwo,savereturntwo}