
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");

//application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!~~ '))


app.post('/api/users/register', (req, res) => {

  //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
  //그것들을  데이터 베이스에 넣어준다. 
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login',(req ,res) =>{
    //아이디 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user){
            return res.json({loginSuccess : false , massegs : "아이디를 확인할수 없습니다."})
        }
        //비밀번호확인
        user.comparePassword(req.body.password,(err , isMatch) => {
            if(!isMatch){
                return res.json({loginSuccess:false , massegs:"비밀번호가 맞지 않습니다."})
            }
            //비밀번호가 맞다면 토큰저장
            user.generateToken((err ,user)=>{
              if(err) return res.status(400).send(err);
              res.cookie("x_auth" ,user.token)
              .status(200)
              .json({loginSuccess:true ,userId:user._id})
            })
        })
    })
    
})

//role 0 -> 일반유저 0 이 아니면 관리자
app.get('/api/users/auth' ,auth ,(req ,res) => {
  //여기까지 미들웨어를 통과했다면 authentication 이 true
  res.status(200).json({
    _id:req.user._id,
    IsAmin:req.user.role === 0 ? false : true,
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    rol:req.user.role,
    image:req.user.image
  })
})

app.get('/api/users/logout',auth ,(req,res) => {
  User.findOneAndUpdate({_id:req.user._id},
     {token:""},
    (err,user) => {
      if(err) return res.json({success:false , err});
      return res.status(200).send({
        success:true
      })
    })
    
})





const port = 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))