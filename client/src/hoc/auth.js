import React , {useEffect} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/User_action';

export default function(SpecificComponent ,option , adminRoute = null){
    function AuthenticationCheck(props){
        const dispatch  = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 하지않은상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login');
                    }
                }else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/randingpage')
                    }else {
                        if(!option){
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent{...props}/>
        )
    }

    return AuthenticationCheck 
}