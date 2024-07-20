
// import React,{useState, useEffect} from 'react';
// import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
// import styled from 'styled-components';
// import { imageDB } from '../utility/imageData';
// import Image from '../common/Image';
// import Text from '../common/Text';


// const Container = styled.div`

// `

// const Registerlogincontainer = ({containerStyle}) => {

//   const navigate = useNavigate();
//    useEffect(()=>{
//     async function fetchData(){
// 		}
// 		fetchData();
//   }, [])



//   return (
//     <Container style={containerStyle}>

//     </Container>
//   );
// }

// export default Registerlogincontainer;

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { DuplicatePhone, signup } from "../service/UserService";
import Loading from "../common/Loading";
import Button from "../common/Button";
import Switch from "../common/Switch";
import { auth } from "../api/config";




const TRANSPARENT = 'transparent';

const Container = styled.div`
  margin-top:80px;
`
const MainView = styled.div`
    display :flex;
    flex-direction : column;
`
const View1 = styled.div`
  display :flex;
  flex-direction : row;
  margin-bottom :10px;
  padding :10px
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
    width:70%;
`
const ConfigView = styled.div`
    display :flex;
    background-color :#fff;
    flex-direction : row;
    align-items :center;
    height :30px;
    width:70%;
`


const AuthView = styled.div`
    display :flex;
    flex-direction : row;
    background-color :#F7F7F7;
    margin-left :20px;
    margin-right :20px;
    margin-bottom :10px;
    padding :10px;
`
const View2 = styled.div`
    display :flex;
    flex-direction : row;
    justify-content : flex-end;
    margin-bottom :50px;
`
const View3 = styled.div`
    display :flex;
    flex-direction : row;
    background-color :#FFF;
    justify-content:center;
    align-items:center;
`


const LabelView2 = styled.div`
    display :flex;
    height:45px;
    justify-content : center;
    align-items : center;
`


const ContentView2 = styled.div`
    display :flex;
    border  :1px solid #ededed;
    flex-direction : row;
    justify-content : center;
    align-items :center;
    height :120px;
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

const InputButtonView = styled.div`
    height :50px;
    width : ${({width})=>width};
    border-radius :5px;
    margin: 1px 5px 1px 5px;
    flex :1;
    flex-direction:row;
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

const AuthmsgView = styled.div`
    display  :flex;
`
const AuthmsgViewText = styled.span`
    font-size :16px;
    font-family : ${({theme}) =>theme.REGULAR};
    color : #ff0000;
`
const ProfileImage = styled.div`
    width :30px;
    height :30px;
`
const RegistBtn = {
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(24, 23, 23)',
    border: '1px solid rgb(179, 179, 179)',
    margin: '10px 10%',
    width: '80%',
    borderRadius: '5px',
    fontSize: '18px'
}


// let DirectSms = NativeModules.DirectSms;

const Registerlogincontainer  = ({containerStyle})=>{

    const navigate = useNavigate(); 
    const [imgs, setImgs] = useState('https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fbottom_gps.png?alt=media&token=efce5849-b3cb-414b-b082-2e96d9d24bfa');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [tel, setTel] = useState('');
    const [membertype, setMembertype] = useState(0);
    const [smsreceive, setSmsreceive] = useState(0);
    const [emailreceive, setEmailreceive] = useState(0);
    const [authcheck, setAuthcheck] = useState(false);
    const [passwordview, setPasswordview] = useState(false);
  
    const [success, setSuccess] = useState(false);

    const [reqcode, setReqcode] = useState("");
    const [verifyCode, setVerifyCode] = useState("");

    const [loading, setLoading] = useState(false);

    const [authmsg, setAuthmsg] = useState('잘못된 인증번호 입니다');
    const [switchcheck1, setSwitchcheck1] = useState(false);
    const [switchcheck2, setSwitchcheck2] = useState(false);
    const [switchcheck3, setSwitchcheck3] = useState(false);

    const buttonRef = useRef();
    const passwordref = useRef();
    const repasswordref = useRef();
    const nameRef = useRef();
    const telref = useRef();
    const varifyCoderef = useRef();


    const [isFocused, setIsFocused] = useState(false);


    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);

    const [authstart, setAuthstart] = useState(false);


    const prefix = ['','잘읽은','밝은','커다란','작은','움직인','돌아온','사랑한','귀여운','용감한','빛나는',
    '대찬', '검은', '씩씩한', '조용한','신속한', '광대한','재치있는','우아한','새하얀','튼튼한',
    '꼼꼼한', '착실한', '어여쁜', '빠른','느린', '높은','깊은','적당한','슬픈','가난한','좋은','새로운','첫번째','마지막','기다란','대단한','위대한',
    '오래된','나이먹은','나쁜','이쁜','파랑','노란','놀란','아주큰',
    '큰','색다른','기쁜','못된','어른','어린','젊은','중요한','사나운',
    '화려한','똑똑한','재밌는','게으른','외로운','유명한','단정한',
    '비만인','평화적인','완벽한','공손한','재빠른','희귀한','타당한',
    '부유한','풍부한','동그란','무례한','안전한','짭짤한','겁먹은',
    '비밀의','규칙적인','겁먹은','이기적인','상급의','분리된','독린된',
    '심각한','유사한','간단한','졸리운','날씬한','매끈한','친절한',
    '사교적인','빠른','위험한','어두운','밝은','깨끗한','더러운','비싼',
    '마른','뜨거운','두꺼운','못생긴','피곤한','유명한','엄격한','고집센',
    '공격적인','검정적인','까다로운','잘속는','거만한','예민한','둔감한',
    '이상한','얼빠진','산만한','신중한','강력한','차분한','겸손한','성실한',
    '친절한','진지한','꼼꼼한','대담한','느긋한','상냥한','쾌활한','온화한',
    '완고한','매력있는','단호한','솔직한','용기있는','검성적인','비판적인',];

    const suffix = ['','오리','개','새','독수리','가위','거북이','까치','종달새','참새','부엉이',
    '기러기','올빼미','참새','까마귀','거위','강아지','고양이','거미','잠자리','메뚜기',
    '표범', '송골매','기린','너구리','늑대','노루','사슴','재규어','오소리','송아지','청설모',
    '악어','여우','하마','까치','토끼','얼룩말','말','돼지','사자','호랑이',
    '코뿔소','타조','돌고래','팬더','생쥐','젖소','문어','염소','코알라',
    '원숭이','병아리','닭','뱀','양','도마뱀','아나콘다','두더쥐','학','삵',
    '기린','코끼리','낙타','햄스터','학생','인간','수달','고라니','사슴',
    '곰','고래','북극곰','폐귄','두더지','코뿔소','소','레드판다','캥거루',
    '박쥐','제비','닭','공작새','앵무새','비둘기','딱다구리','도룡뇽','산토끼',
    '멧돼지','금붕어','퓨마','승냥이','들개','치타','하이에나','족제비','코요테',
    '독사','물고기','복숭아','바나나','살구','사과','산딸기','석류','수박',
    '오렌지','자두','자몽','귤','단감','두리안','대추','딸기','레몬','망고',
    '무화과','매실','멜론','참외','체리','키위','포도','파파야','토마토','튤립',
    '장미','쟈스민','코스모스','모과','데이지','난초','동백',];


    const successreturn = ()=>{
        navigate("/home", { state: { homerefresh: false } });
    }

    
    useEffect(() => {
     
        const countdown = setInterval(() => {
   
            if (parseInt(seconds) > 0) {
            setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
            if (parseInt(minutes) === 0) {
                clearInterval(countdown);
            } else {
                setMinutes(parseInt(minutes) - 1);
                setSeconds(59);
            }
            }
            
         
        }, 1000);

        return () => clearInterval(countdown);
      }, [minutes, seconds]);



    const handleFocus = useCallback(() => {
        setIsFocused(!isFocused);
    
    }, [isFocused]);



    const _handlePasswordView = () =>{
        setPasswordview(!passwordview);
    }

    const _handlemembertype =(type)=>{
        setMembertype(type);
    }

    const _handleemailreceive = (type)=>{
        setEmailreceive(type);
    }
    const _handlesmsreceive = (type)=>{
        setSmsreceive(type);
    }

    const _handleAuthComplete = () =>{
     
    }
    const Switchcallback1 =(data)=>{

      setSwitchcheck1(data);
  
      setRefresh(refresh=>refresh + 1);
    }

    const Switchcallback2 =(data)=>{

      setSwitchcheck2(data);
  
      setRefresh(refresh=>refresh + 1);
    }

    const Switchcallback3 =(data)=>{
   
      setSwitchcheck3(data);
  
      setRefresh(refresh=>refresh + 1);
    }
 
    const _handleSuccessNext = async()=>{

        // let USER_ID = id +'@gmail.com';


        // setLoading(true);

        // const user=  await signup({USER_ID, password,nickname,tel, membertype, imgs});

        // if(user != null){

        //     setSuccess(true);
        //     setLoading(false);
        // }else{
   
        //     setLoading(false);
        // }
        navigate("/home");
   
  
    }
  
  
    const _handleauthcode = async () => {
        // 이미 가입된 번호인지 확인하자
        
        const USER_TEL = tel;
        const user = await DuplicatePhone({ USER_TEL });

        console.log("user phone check", user); 

        // if (user != null) {
        //     alert("이미 등록된 전화번호입니다");
        //     return;
        // }
        
      const getRandom1 = (min, max) =>
        Math.floor(Math.random() * (max - min) + min);
      console.log(getRandom1(1, 10));
      const getRandom2 = (min, max) =>
        Math.floor(Math.random() * (max - min) + min);
      console.log(getRandom2(1, 10));
      const getRandom3 = (min, max) =>
        Math.floor(Math.random() * (max - min) + min);
      console.log(getRandom3(1, 10));
      const getRandom4 = (min, max) =>
        Math.floor(Math.random() * (max - min) + min);
      console.log(getRandom4(1, 10));
      const getRandom5 = (min, max) =>
        Math.floor(Math.random() * (max - min) + min);
      console.log(getRandom5(1, 10));

      let code =
        String(getRandom1(1, 10)) +
        String(getRandom2(1, 10)) +
        String(getRandom3(1, 10)) +
        String(getRandom4(1, 10)) +
        String(getRandom5(1, 10));

      setReqcode(code);

      //인증코드를 보내자
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            command: "smssend",
            param1: code,
            param2: tel,
          })
        );
      }

      setAuthstart(true);

      setMinutes(2);
      setSeconds(0);
    }
    
    const _handleVericodeCheck = () => {
        if (reqcode == verifyCode) {
            setAuthstart(false);
            setAuthcheck(true);
            alert("인증코드가 일치 합니다");
        } else {
            alert("인증코드가 일치 하지 않습니다");
        }
   
    }
    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    const _handleCreateName = () =>{
       setNickname(prefix[randomNumberInRange(1, 100)] + suffix[randomNumberInRange(1,100)]);
    }
    const _handleEditButton = async() =>{

      //인증 사진을 업로드 하자
    }

    const _handleAgree = () =>{
        navigate("/licenseagree"); 
    }

    

    const set_photourl = async (path) =>{
   
      //인증 사진을 업로드 하자
    }
    const [refresh, setRefresh] = useState(refresh => refresh +1);

    useEffect(()=>{
      setSwitchcheck1(switchcheck1);
      setId(id);
        setPassword(password);
        setAuthcheck(authcheck);

    }, [refresh])
    

    return(
      
        (loading == true ) ? (<Loading/>):(
                <Container>

                <View1>

                    최초에 앱 진입시에 나오는 화면입니다.

                    이페이지는 한번 가입된 사용자는 나오지 않습니다.

                </View1>
           
                <View1>
                    <LabelView><LabelText>사용할 대화명</LabelText></LabelView>
                    <ConfigView>
                        <input type="text"
                          ref = {nameRef}
                          style={{border:"none", fontSize:14}}
                          placeholder ={"대화명"}
                          value ={nickname}
                          onSubmitEditing = {()=>{passwordref.current.focus()}}
                          onChange = {e => {
                              setNickname(e.target.value);
                              setRefresh(refresh => refresh + 1);
                          }}
                        />
                    {/* <Button buttonText ={'자동생성'} callback={_handleCreateName} containerStyle={{backgroundColor : "#EDEDED",
                    color :'#000',margin:'10px', width:"150px", height:35}}/> */}
            
                    </ConfigView>

                </View1>
    

  

                <View1>
                    <LabelView><LabelText>전화번호</LabelText></LabelView>
                    <ConfigView>
                        <input type="number"
                          ref = {telref}
                          style={{border:"none", fontSize:14}}
                          placeholder ={"전화번호"}
                          value ={tel}
                          onChange = {e => {
                              setTel(e.target.value);
                              setRefresh(refresh => refresh + 1);
                          }}
                        />

                       <Button buttonText ={'인증요청'} callback={_handleauthcode} containerStyle={{backgroundColor : "#EDEDED",
                      color :'#000',margin:'10px', width:"150px", height:35}}/>

                    </ConfigView>

                </View1>

                <View1>
                    <LabelView><LabelText>인증 번호</LabelText></LabelView>
                    <ConfigView>
                        <input type="number"
                          ref = {varifyCoderef}
                          style={{border:"none", fontSize:14}}
                          placeholder ={"인증번호"}
                          value ={verifyCode}
                          onChange = {e => {
                              setVerifyCode(e.target.value);
                              setRefresh(refresh => refresh + 1);
                          }}
                        />
                   
                        {
                            verifyCode != '' ? ( <Button buttonText ={'인증'} callback={_handleVericodeCheck} containerStyle={{backgroundColor : "#fff",
                            color :'#000',margin:'10px', width:"150px", height:35, boxShadow:"none"}}/>
                            ) :( <Button buttonText ={'인증'} containerStyle={{backgroundColor : "#fff",
                            border: '1px solid rgb(179, 179, 179)',
                            color :'#000',margin:'10px', width:"150px", height:35, boxShadow:"none"}}/>) 
                        }
                    </ConfigView>
                </View1>

                {
                  authstart == true &&
                  <View3>
                  <div>
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}후에 인증번호가 종료 됩니다
                  </div>
                  </View3>
                }

                <div style={{ display: "flex", justifyContent: "center", position:"absolute", bottom:20, flexDirection:"column", width:"100%" }}>
                    {authcheck == true && id != "" && password != "" && nickname != "" ? (
                        <Button buttonText={'가입'} callback={_handleSuccessNext} containerStyle={{
                            backgroundColor: "#FFF", border: '1px solid rgb(179, 179, 179)',boxShadow:"none",
                            color: '#000', margin: '10px', width: "90%", height: 35
                        }} />
                    ) : (<Button buttonText={'가입'} callback={_handleSuccessNext} containerStyle={{
                        backgroundColor: "#FFF", border: '1px solid rgb(179, 179, 179)',boxShadow:"none",
                        color: '#000', margin: '10px', width: "90%", height: 35
                    }} />)
                    }

                    <Button buttonText={'개인정보 수집동의'} callback={_handleAgree} containerStyle={{
                        backgroundColor: "#FFF", border: '1px solid rgb(179, 179, 179)',boxShadow:"none",
                        color: '#000', margin: '10px', width: "90%", height: 35
                    }} />

                </div>


                

          

                </Container>

                
                 
        )
    )     
}



Registerlogincontainer.propTypes = {
    containerStyle : PropTypes.object,
}



export default Registerlogincontainer;

