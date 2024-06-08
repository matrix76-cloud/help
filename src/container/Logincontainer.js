
import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { imageDB } from '../utility/imageData';
import Image from '../common/Image';
import Text from '../common/Text';
import StoreInfo from '../components/Storeinfo';
import KaKaoLogin from '../common/KakaoLogin';
import NaverLogin from '../common/NaverLogin';
import { get_userInfoForDevice, login } from "../service/UserService";
import { UserContext } from '../context/User';

const Container = styled.div`


`
const LoginInfo = styled.div`
  display:flex;
  background-color :#fff;
  padding: 20px;
  margin: 60px 20px 50px;
  flex-direction:column;
  font-size:14px;
  border: 1px solid #ededed;

`

const SocialButtonLayout = styled.div`
  flex-direction: column;
  height: 130px;
  display: flex;
  justify-content:center;
  align-items:center;
`

const SocialButton = styled.div`
    display: flex;
    width: 185px;
    justify-content: space-evenly;
    flex-direction : row;
    height: 50px;
    align-items: center;
    margin: 10px;
    font-weight:700;
    font-size:14px;
    background-color : ${({bgcolor}) => bgcolor};
    color :  ${({color}) => color};
`

const LoginButtonLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction : row;
  height: 50px;
  align-items: center;
  margin: 10px;
  font-size:15px;
  padding: 0px 10%;

`

const BottomButtonLayout = styled.div`

 position : absolute;
 bottom :10px;
 height : 40px;
 background-color : #ededed;
`

const LoginButton = styled.div`
  text-decoration : underline;
  text-underline-offset: 3px;
  font-size:15px;
`


const Logincontainer = ({containerStyle}) => {

  const USERS_INDEX = '0jtk8NpaTymdpbBmdcgW';
  const DEVICEID ='4f8228c2c2089fac';

  const {user, dispatch2} = useContext(UserContext);
  const [region1, setRegion1] = useState('');
  const [region2, setRegion2] = useState('');

  const navigate = useNavigate();

  const getuserInfoForPhone= async(DEVICEID) =>{

    const USER = await get_userInfoForDevice({ DEVICEID });

    return new Promise((resolve, reject)=>{
      
        resolve(USER);
    })
  }
  const postlogin = async(email, password) =>{
     
    const user2 = await login({email, password});

    return new Promise((resolve, reject)=>{
      
        resolve(user2);
    })
  }

  // 로그인 상태 여부 : 디바이스 정보에 따라 움직인다
  // 현재 위치 경도를 구하자
  // 회원 상태
  // 찜한 목록
  // 내가 쓴 댓글
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])


  const _handleIdlogin = () =>{
    navigate("/idlogin");
  }

  const _handleRegisterlogin = () =>{
    navigate("/registerlogin");
  }



  return (
    <Container style={containerStyle}>
     <LoginInfo>

      <Text value={'마원에 가입해서 로그인 하고 각종 혜택을 즐기세요'}/>
      <Text value={'매장에서 발행되는 쿠폰, 이벤트를 바로 확인할수 있고 점주와의 체팅으로 쉽게 이용하세요'}/>
     </LoginInfo>

    <SocialButtonLayout>
      <KaKaoLogin/>
      <NaverLogin/>
    </SocialButtonLayout>
    <LoginButtonLayout>
      <LoginButton onClick={_handleIdlogin}><Text value={'이메일로 로그인'}/></LoginButton>
      <LoginButton onClick={_handleRegisterlogin}><Text value={'회원 가입'}/></LoginButton>
      
    </LoginButtonLayout>
    <StoreInfo height={150} containerStyle={{position:"absolute", bottom:0}} />   

    </Container>
  );
}

export default Logincontainer;
