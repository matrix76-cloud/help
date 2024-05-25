
import React, { useRef, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { get_userInfoForUID, login, update_userdevice } from "../service/UserService";
import Switch from "../common/Switch";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Button from "../common/Button";
import { UserContext } from "../context/User";
import Loading from "../common/Loading";
import { getStoreData } from "../utility/common";




const TRANSPARENT = 'transparent';

const Container = styled.div`
    width :100%;
    height :700px;
    margin-top:70px;
`

const View1 = styled.div`
    display :flex;
    flex-direction : row;
    margin-bottom :10px;
    padding :10px
`
const View2 = styled.div`
    display :flex;
`
const View3 = styled.div`
    display :flex;
    flex-direction : column;
    justify-content : flex-end;
    margin-bottom :50px;
`
const LabelView = styled.div`
    display :flex;
    justify-content : center;
    align-items : center;
    width:30%;
`
const ContentView = styled.div`
    display :flex;
    background-color :#fff;
    flex-direction : row;
    justify-content : center;
    align-items :center;
    height :30px;
    width:60%;
`


const LabelText= styled.span`
    font-size :14px;
    font-family : ${({theme}) =>theme.REGULAR};
`

const EnableButtonView = styled.div`
    background-color :${({theme}) =>theme.buttonviewcolor};
    margin-left :10px;
    height :80%;
    width : ${({width})=>width};
    border-radius :5px;
    justify-content: center;
    align-items : center;
`
const DisableButtonView = styled.div`
    background-color :#dadada;
    margin-left :10px;
    height :80%;
    width : ${({width})=>width};
    border-radius :5px;
    justify-content: center;
    align-items : center;
`


const EnableButtonText = styled.span`
    font-size :16px;
    font-family : ${({theme}) =>theme.REGULAR};
    color : #fff;
`
const DisableButtonText = styled.span`
    font-size :16px;
    font-family : ${({theme}) =>theme.REGULAR};
    color : #fff;
`

const IconTouch = styled.div`
`




const Idlogincontainer  = ({containerStyle})=>{

    const navigate = useNavigate();

    const {user, dispatch2} = useContext(UserContext);

    const [id, setId] = useState('kkan2222');
    const [password, setPassword] = useState('11111111');
    const [switchcheck, setSwitchcheck] = useState(false);
   
    const [passwordview, setPasswordview] = useState(false);
    const [membertype, setMembertype] = useState(1);

    const [refresh, setRefresh] = useState(1);

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const buttonRef = useRef();
    const passwordref = useRef();
    const telref = useRef();
    const authref = useRef();

    const [loading, setLoading] = useState(false);

    const _handlePasswordView = () =>{
        setPasswordview(!passwordview);
    }

    const _handlemembertype =(type)=>{
        setMembertype(type);
    }

    const _handleAuthComplete = () =>{
     
    }
    const _handleClose = () =>{
        setFail(false);
    }
    const Switchcallback =(data)=>{

      setSwitchcheck(data);
  
      setRefresh(refresh=>refresh + 1);
    }

    useEffect(()=>{
      setSwitchcheck(switchcheck);
      setId(id);
      setPassword(password);

  
    }, [refresh])

    const _handleLogin = async()=>{

        // 로그인 시도 로그인 실패 햇을때 알람창 로그인 성공 햇을때 홈으로 이동
        setLoading(true);
        const uniqueId = user.deviceid;
        async function UserLogin(uniqueId){

            // 아이디와 패스워드 값을 가져오자
            const DEVICEID = uniqueId;

            let email = id +'@gmail.com';
            const user2 = await login({email, password});
            
            if(user2 == -1){
                alert("아이디와 비밀번호를 다시 확인해주시기 바랍니다");
                return;
            }
    

            const USER_ID = user2.user.uid;
            const user3 = await get_userInfoForUID({USER_ID});
          
                       
            // 자동 로그인 여부에 대해 업데이트 하자
            if(membertype == 1){
                let USERID = user2.user.uid;
                let DEVICEID = uniqueId;

                const update = await update_userdevice({USERID,DEVICEID});
            }else{
                let USERID = user2.user.uid;
                let DEVICEID = "";

                const update = await update_userdevice({USERID,DEVICEID});
            }

           
            user['email'] = email;
            user['uid'] = user2.user.uid;
            user['type'] = user3.USER_TYPE;
            user['nickname'] = user3.USER_NICKNAME;
            user['user_type'] = user3.USER_TYPE;
            user['img'] = user3.USER_IMAGE;

            user["distance"] = user3.DISTANCE;

            const latitude = user.latitude;
            const longitude = user.longitude;
            const userData = getStoreData({ user,latitude,longitude });

            getStoreData({ user,latitude,longitude }).then((userData)=>{
                dispatch2(user);
      
                setLoading(false);
                navigate("/loading");
              });
  
              



    

        }

        UserLogin(uniqueId);
        
    }

    const _handelPasswordHide = () =>{
      setPasswordview(true);
    }
    const _handelPasswordView = () =>{
      setPasswordview(false);
    }
    return(
    <>
    {
        loading == true ? (<Loading containerStyle={{marginTop:300}}/>):(
            <Container style={containerStyle}>

            <View1>
                <LabelView><LabelText>사용 아이디</LabelText></LabelView>
                <ContentView>
                  <input type="text"
                  style={{border:"none", fontSize:14}}
                  placeholder ={"아이디를 입력해주세요"}
                  value={id}
                  onSubmitEditing = {()=>{passwordref.current.focus()}}
                  onChange = {e => {
                      setId(e.target.value);
                      setRefresh(refresh => refresh + 1);
                  }}
                />
      
               
                </ContentView>
            </View1>
            <View1>
                <LabelView><LabelText>비밀 번호</LabelText></LabelView>
                <ContentView>
                  {
                    passwordview == true &&  <input type="text"
                    ref = {passwordref}
                    style={{border:"none", fontSize:14}}
                    placeholder ={"비밀번호를 입력해주세요"}
                    value ={password}
                    onSubmitEditing = {()=>{buttonRef.current.focus()}}
                    onChange = {e => {
                        setPassword(e.target.value);
                        setRefresh(refresh => refresh + 1);
                    }}
                    ></input>
                  }
          
                  {
                    passwordview == false &&  <input type="password"
                    ref = {passwordref}
                    style={{border:"none", fontSize:14}}
                    placeholder ={"비밀번호를 입력해주세요"}
                    value ={password}
                    onChange = {e => {
                        setPassword(e.target.value);
                        setRefresh(refresh => refresh + 1);
                    }}
                    ></input>
                  }
                  <div style={{position: "absolute",right: "15%"}}>
                    {
                        passwordview == false ? (<div onClick={_handelPasswordHide}><GoEye /> </div> ):(
                         <div onClick={_handelPasswordView}><GoEyeClosed /></div> 
                        )
                    }
                </div> 
                </ContentView>
            </View1>
            {/* <View1>
                <LabelView><LabelText>자동 로그인</LabelText></LabelView>
                <ConfigView>
                <Switch
                    button1={'해제'}  button2={'설정'} Switchcallback={Switchcallback}
                    containerStyle={{display: "flex",justifyContent: "flex-start"}} 
                    />
                </ConfigView>
            </View1> */}
      
        
      
      
              {
                  (id != '' && password !='') ? ( <Button buttonText ={'로그인'} callback={_handleLogin} containerStyle={{backgroundColor : "#FF4E19",
                  color :'#fff', border :'1px solid #FF4E19',margin:' 10px 10%', width:"80%", borderRadius:5}}/>):(<Button buttonText ={'로그인'} containerStyle={{backgroundColor : "#d8d3d2",
                  color :'#fff', border :'1px solid #d8d3d2',margin:' 10px 10%', width:"80%", borderRadius:5}}/>)
              }
       
          
      
            </Container>
        )
    }
    </>

    );
}



Idlogincontainer.propTypes = {
    containerStyle : PropTypes.object,
}

export default Idlogincontainer;

