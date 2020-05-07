const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const {User} = require('./models/User'); 

const config = require('./config/key');
//application/x=www=form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//apllication/json
app.use(bodyParser.json());
app.use(cookieParser());
console.log(app.use(bodyParser.json()))
const mongoose = require('mongoose');

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false, //에러방지
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => res.send('새해복 많이받으세요11111'))

app.post('/register',(req ,res)=> {
    //회원가입 할때 필요한 정보들을 client 에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body)
    user.save((err,userInfo) => {
        if(err) return res.json({success:false , err})
        return res.status(200).json({
            success:true
        })
    })
})

app.post('/login' , (req , res) =>{
    User.findOne({email:req.body.email} , (err , user) =>{
        if(!user){
            res.json({
                loginsuccess :false,
                message : "이메일이 존재하지 않습니다",
            })
        }
    })
    res.json({
        err : '에러메세지',
    })
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))