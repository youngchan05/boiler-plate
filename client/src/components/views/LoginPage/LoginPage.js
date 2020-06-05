import React , {useState} from 'react'
import {useDispatch} from 'react-redux';
import {LoginUser} from '../../../_actions/User_action'
function LoginPage(props) {
    const dispatch = useDispatch();
    const  [Email , setEmail] = useState("")
    const  [Password , setPassword] = useState("")
    const onEmailHendler = (event) => {
        setEmail(event.target.value);
    }
    const onPassword = (event) => {
        setPassword(event.target.value)
    }
    const onSubmitHendler = (event) =>{
        event.preventDefault();
        let body = {
            email : Email,
            password : Password
        }
        dispatch(LoginUser(body)) //로그인 로직 실행
        .then(response => {
            if(response.payload.loginSuccess){ //아이디 비밀번호 일치시 메인화면으로이동
                props.history.push('/');
            }else {
                alert('Error');
            }
        })
    }   
    return (
        <div style={{
            display:'flex', justifyContent:'center' , alignItems:'center', width:'100%', height:'100vh'
        }}>
            <form style={{ display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHendler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHendler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPassword}/>
                <br/>
                <button>
                    login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
