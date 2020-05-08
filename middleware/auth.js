const { User } = require("../models/User");
let auth = (req , res , next ) =>{
    //인증 처리 하는곳
    

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    //토큰을  복호화 한후 유저를 찾는다.
    User.findByToken(token ,(err , user) =>{
        if(err) throw err;
        if(!user)  return res.json({ isAuth:false, error:ture})

        //req 에서 넣어줌으로써 auth get 메소드에서 사용가능
        req.token = token;
        req.user = user;
        next();
    })

    //유저아 있으면 인증 yes

    //유저가 없으면 인증 no
}

module.exports = {auth};