
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
import { signup } from "../service/UserService";
import Loading from "../common/Loading";



const TRANSPARENT = 'transparent';

const Container = styled.div`
`
const MainView = styled.div`
    display :flex;
    flex-direction : column;
`
const View1 = styled.div`
    display :flex;
    flex-direction : row;
    background-color :#F7F7F7;
    margin-left :20px;
    margin-right :20px;

  
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

const LabelView = styled.div`
    display :flex;
    height:55px;
    justify-content : center;
    align-items : center;

`
const LabelView2 = styled.div`
    display :flex;
    height:45px;
    justify-content : center;
    align-items : center;
`
const ContentView = styled.div`
    display :flex;
    border  :1px solid #ededed;
    background-color :#fff;
    flex-direction : row;
    justify-content : center;
    align-items :center;
    height :50px;
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


// let DirectSms = NativeModules.DirectSms;

const Registerlogincontainer  = ({containerStyle})=>{

    const navigate = useNavigate(); 
    const [imgs, setImgs] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
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


    const buttonRef = useRef();
    const passwordref = useRef();
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
        navigate("/home", { homerefresh: false });
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
 
    const _handleSuccessNext = async()=>{

        let USER_ID = id +'@gmail.com';


        setLoading(true);

        const user=  await signup({USER_ID, password,nickname,tel, membertype, imgs});

        if(user != null){
  
            setSuccess(true);
            setLoading(false);
        }else{
   
            setLoading(false);
        }

   
  
    }
  


  
    const _handleauthcode = async ()=>{

      //인증코드를 보내자

    }

    const _handleVericodeCheck= ()=>{

   
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

    const set_photourl = async (path) =>{
   
      //인증 사진을 업로드 하자
    }
    
    return(
      
        (loading == true ) ? (<Loading/>):(
                <>
                <View1>
                    <LabelView><LabelText>사용 아이디</LabelText></LabelView>
                    <ContentView>
                        <div style={{display:"flex"}}>
                        <input type="text"
                          style={{border:"none", fontSize:14}}
                          placeholder ={"아이디를 입력해주세요"}
                          value ={password}
                          onSubmitEditing = {()=>{passwordref.current.focus()}}
                          onChange = {e => {
                              setId(e.target.value);
                              setRefresh(refresh => refresh + 1);
                          }}
                          />
                        </div>
            
                    </ContentView>
                </View1>
                </>
                 <View1>
                    <LabelView><LabelText>비밀 번호</LabelText></LabelView>
                    <ContentView>
                    <View style={{flex:4}}>
                        <Inputnoborder
                        ref = {passwordref}
                        mTop = {12}
                        mBottom = {5}
                        width ={300}
                        height = {30}
                        bgcolor = {'#FFF'}
                        multiline = {false}
                        value ={password}
                        rounded
                        secureTextEntry = {!passwordview}
                        disabled = {false}
                        placeholder ={"비밀번호를 입력해주세요"}
                        labeled = {false}
                        onSubmitEditing = {()=>{nameRef.current.focus()}}
                        onChangeText = {text => {setPassword(text);}}
                        />
                    </View>
                    <View style={{flex:1}}>
                        {
                            passwordview == true ? ( <IconTouch onPress={_handlePasswordView}>
                                <Icon
                                    name={'eye'}
                                    color = "#000"
                                    size={Platform.OS === 'ios' ? 25 : 25}
                                />
                            </IconTouch>):(
                                <IconTouch onPress={_handlePasswordView}>
                                <Icon
                                    name={'eyeo'}
                                    color = "#000"
                                    size={Platform.OS === 'ios' ? 25 : 25}
                                />
                            </IconTouch>
                            )
                        }
                    
                    
                    </View>
                
                    </ContentView>
                </View1>
                <View1>
                    <LabelView><LabelText>사용할 대화명</LabelText></LabelView>
                    <ContentView>
                    <View style={{flex:2.3}}>
                    <Inputnoborder
                        ref = {nameRef}
                        mTop = {12}
                        mBottom = {5}
                        width ={300}
                        height = {30}
                        bgcolor = {'#FFF'}
                        multiline = {false}
                        value ={nickname}
                        rounded
                        disabled = {false}
                        placeholder ={"대화명을 입력해주세요"}
                        labeled = {false}
                        onSubmitEditing={()=>{
                    
                        }}
                        onChangeText = {text => {setNickname(text);}}
                        />
                    </View>
                    <View style={{flex:1}}>
                    <EnableButtonView width ={'75%'}><EnableButtonText onPress={_handleCreateName}>생성</EnableButtonText></EnableButtonView>
                    </View>
                    </ContentView>
                </View1>

                <View1>
                    <LabelView><LabelText>사용할 이미지</LabelText></LabelView>
                    <ContentView>
                    <View style={{flex:2.3, justifyContent:"center", alignItems:"center"}}>
                    {/* <Inputnoborder
                        ref = {nameRef}
                        mTop = {12}
                        mBottom = {5}
                        width ={300}
                        height = {30}
                        bgcolor = {'#FFF'}
                        multiline = {false}
                        value ={nickname}
                        rounded
                        disabled = {false}
                        placeholder ={"대화명을 입력해주세요"}
                        labeled = {false}
                        onSubmitEditing={()=>{
                    
                        }}
                        onChangeText = {text => {setNickname(text);}}
                        /> */}
                        <ProfileImage source ={{uri:imgs}}/>
                    </View>
                    <View style={{flex:1}}>
                    <EnableButtonView width ={'75%'}><EnableButtonText onPress={_handleEditButton}>신규</EnableButtonText></EnableButtonView>
                    </View>
                    </ContentView>
                </View1>
        
                <View1>
                    <LabelView><LabelText>가입 형태</LabelText></LabelView>
                    <ContentView>
                        {
                            membertype == 1 ? (<EnableButtonView width ={'40%'}><EnableButtonText>사장님</EnableButtonText></EnableButtonView>) :(                        
                            <DisableButtonView  onPress={()=>{_handlemembertype(1);}} width ={'40%'}><DisableButtonText>사장님</DisableButtonText></DisableButtonView>)
                        }
        
                        {
                            membertype == 0 ? (<EnableButtonView width ={'40%'}><EnableButtonText>일반회원</EnableButtonText></EnableButtonView>) :
                            (<DisableButtonView onPress={()=>{_handlemembertype(0);}} width ={'40%'}><DisableButtonText>일반회원</DisableButtonText></DisableButtonView>)
                        }
                        
                    </ContentView>
                </View1>
        
                <View1>
                    <LabelView><LabelText>SMS수신여부</LabelText></LabelView>
                    <ContentView>
                        {
                            smsreceive == 1 ? (<EnableButtonView width ={'40%'}><EnableButtonText>수신</EnableButtonText></EnableButtonView>) :(                        
                            <DisableButtonView  onPress={()=>{_handlesmsreceive(1);}} width ={'40%'}><DisableButtonText>수신</DisableButtonText></DisableButtonView>)
                        }
        
                        {
                            smsreceive == 0 ? (<EnableButtonView width ={'40%'}><EnableButtonText>미수신</EnableButtonText></EnableButtonView>) :
                            (<DisableButtonView onPress={()=>{_handlesmsreceive(0);}} width ={'40%'}><DisableButtonText>미수신</DisableButtonText></DisableButtonView>)
                        }
                        
                    </ContentView>
                </View1>
        
                <View1>
                    <LabelView><LabelText>EMAIL수신여부</LabelText></LabelView>
                    <ContentView>
                        {
                            emailreceive == 1 ? (<EnableButtonView width ={'40%'}><EnableButtonText>수신</EnableButtonText></EnableButtonView>) :(                        
                            <DisableButtonView  onPress={()=>{_handleemailreceive(1);}} width ={'40%'}><DisableButtonText>수신</DisableButtonText></DisableButtonView>)
                        }
        
                        {
                            emailreceive == 0  ? (<EnableButtonView width ={'40%'}><EnableButtonText>미수신</EnableButtonText></EnableButtonView>) :
                            (<DisableButtonView onPress={()=>{_handleemailreceive(2);telref.current.focus();}} width ={'40%'}><DisableButtonText>미수신</DisableButtonText></DisableButtonView>)
                        }
                        
                    </ContentView>
                </View1>
                <View1 >
                    <LabelView><LabelText>전화 번호</LabelText></LabelView>
                    <ContentView>
                        <View style={{flex:2.3}}>
                            
                        <Inputnoborder
                        ref ={telref}
                        mTop = {12}
                        mBottom = {5}
                        width ={300}
                        height = {30}
                        bgcolor = {'#FFF'}
                        multiline = {false}
                        value ={tel}
                        keyboardType="number-pad"
                        rounded
                        isPassword = {true}
                        disabled = {false}
                        placeholder ={"숫자만 입력해주세요"}
                        labeled = {false}
                        Focused={handleFocus}
                        onChangeText = {text => {setTel(text) }}
                        />
        
                        </View>
                        <View style={{flex:1}}>
                            {
                                tel != '' ? (<EnableButtonView width ={'75%'}><EnableButtonText onPress={_handleauthcode}>요청</EnableButtonText></EnableButtonView>) :(<DisableButtonView width ={'75%'}><DisableButtonText>요청</DisableButtonText></DisableButtonView>) 
                            }
        
                        </View>
                    </ContentView>
                </View1>
                <View1>
                    <LabelView><LabelText>인증 번호</LabelText></LabelView>
                    <ContentView>
                        <div>
                        
                        <Inputnoborder
                        ref ={varifyCoderef}
                        mTop = {12}
                        mBottom = {5}
                        width ={300}
                        height = {30}
                        bgcolor = {'#FFF'}
                        multiline = {false}
                        value ={verifyCode}
                        keyboardType="number-pad"
                        rounded
                        isPassword = {true}
                        disabled = {false}
                        placeholder ={"인증번호를 입력해주세요"}
                        labeled = {false}
                        Focused={handleFocus}
                        onChangeText = {text => {setVerifyCode(text) }}
                        />

                        </div>
                        <div>
                            {
                                verifyCode != '' ? (<EnableButtonView width ={'75%'}><EnableButtonText onPress={_handleVericodeCheck}>인증</EnableButtonText></EnableButtonView>) :(<DisableButtonView width ={'75%'}><DisableButtonText>인증</DisableButtonText></DisableButtonView>) 
                            }

                        </div>
                    </ContentView>
                </View1> */}
              
            
        )
    )

            
            
            
        // {
        //     authstart == true &&
        //     <View3>
        //     <div>
        //     {minutes}:{seconds < 10 ? `0${seconds}` : seconds}후에 인증번호가 종료 됩니다
        //     </div>
        //     </View3>
        // }
        
        // {
        //     (authcheck == false  && verifyCode != '' && reqcode != '') ?
        //     (
        //         <View3>
        //         <div>
        //         잘못된 인증번호입니다
        //         </div>
        //         </View3>
        //     ) :(null)
        // }
        // {

        //     (authcheck == true && reqcode != '') &&
        //     (
        //         <View3>
        //         <div>
        //         올바른 인증번호입니다
        //         </div>
        //         </View3>
        //     ) 
        
        // }
        
        //     <View2 ref = {buttonRef} style={{marginTop:20}}>
        //         {/* {
        //             (authcheck == true &&  id != ''
        //             && password != '' && nickname !='') ? 
        //             (  <BigButton name={'가입'} Next={_handleSuccessNext} bgcolor ={'#FF4E19'} textcolor ={'#fff'}/>) :
        //             (  <BigButton name={'가입'} bgcolor ={'#dadada'} textcolor ={'#000'}/>)
        //         } */}
        //     </View2>


            // {/* {
            //     success == true ? (<RegistMemberSuccessModal navigation={navigation} callback={this.successreturn}/>) :(null)
            // } */}

     
}



Registerlogincontainer.propTypes = {
    containerStyle : PropTypes.object,
}

const styles = StyleSheet.create({
    container2: {
        height : 600,
        backgroundColor: "#ffffff"
    },
 
})

export default Registerlogincontainer;

