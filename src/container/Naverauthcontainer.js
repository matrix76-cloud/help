import React, { useState, useEffect, useContext } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { getKaKaoUserData, getToken } from "../utility/api";
import Button from "../common/Button";
import { DuplicatePhone, get_userInfoForKakaoID, get_userInfoForNaverID, get_userInfoForPhone, get_userInfoForUID, login, update_userdevice, update_userkakaoid, update_usernaverid } from "../service/UserService";
import { UserContext } from "../context/User";
import GuideLabel from "../components/GuildeLable";

const Container = styled.div`
    margin-top:50px;
`;

const ButtonLayout = styled.div`
  margin-top: 50%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const View1 = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  padding: 10px;
`;
const LabelView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;
const ContentView = styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 70%;
`;
const ConfigView = styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  height: 30px;
  width: 70%;
`;

const LabelText = styled.span`
  font-size: 14px;
  font-family: ${({ theme }) => theme.REGULAR};
`;

const { naver } = window;

const Naverauthcontainer = ({ containerStyle }) => {
    const navigate = useNavigate();

    const { user, dispatch2 } = useContext(UserContext);

    const [loginsuccess, setLoginsuccess] = useState(true);
    const [kakaoexist, setkakaoexist] = useState(true);
    const [tel, setTel] = useState("");
    const [authcheck, setAuthcheck] = useState(false);
    const [refresh, setRefresh] = useState((refresh) => refresh + 1);
    const [verifyCode, setVerifyCode] = useState("");
    const [reqcode, setReqcode] = useState("");

    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [authstart, setAuthstart] = useState(false);
    const [naverexist, setNaverexist] = useState(true);
    const [naverID, setNaverID] = useState('');


    const _handlephonecheck = async () => {
      // 이미 가입된 번호인지 확인하자
  
      const USER_TEL = tel;
      const userdata = await DuplicatePhone({ USER_TEL });
  
      console.log("user phone check", user);
  
      if (userdata != null) {
          alert("이미 등록된 전화번호로 기존 등록된 이용자 정보에 매핑합니다");
          
          const userinfo = await get_userInfoForPhone({ USER_TEL });
          // 업데이트 
          const USERID = userinfo.USER_SESSION;
          console.log("kakao", USERID, naverID);
  
          const kakaoupdate = await get_userInfoForNaverID({USERID,naverID});
  
  
          // 로그인 진행
  
          console.log("userinfo", userinfo);
  
  
          user['email'] = userinfo.USER_ID;
          user['uid'] = userinfo.USERS_INDEX;
          user['type'] = userinfo.USER_TYPE;
          user['nickname'] = userinfo.USER_NICKNAME;
          user['user_type'] = userinfo.USER_TYPE;
          user['img'] = userinfo.USER_IMAGE;
  
          user["distance"] = userinfo.DISTANCE;
  
          const latitude = user.latitude;
          const longitude = user.longitude;
  
  
          dispatch2(user);
  
          navigate("/loginloading");
  
  
  
  
          
        return;
      }else{
        alert("등록된 전화번호가 없습니다. 회원가입을 진행한후 가입된 동일 전화번호로 카카오 로그인을 사용하세요");
      }
  
  
  
  
    };

  useEffect(() => {


    initializeNaverLogin();

  }, []);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "7aect0NV3l30s2Lm369y",
      callbackUrl: "https://mapapp-30.web.app/authm",
      isPopup: false,
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        var email = naverLogin.user.getEmail();
      
        console.log("naver login",naverLogin.user.id );

        const naverID = naverLogin.user.id;
        console.log("NaverID",naverID);
        setNaverID(naverID);

        const naverexist = await get_userInfoForNaverID({ naverID });

        console.log("naver exist", naverexist);
    

      if (naverexist == null) {
          setNaverexist(false);

      } else {

          console.log("NaverID exist",naverID);

          const userinfo = await get_userInfoForNaverID({ naverID });
          // 업데이트 
          const USERID = userinfo.USER_SESSION;
          console.log("kakao", USERID, naverID);

          const kakaoupdate = await update_usernaverid({USERID,naverID});

          // 로그인 진행

          console.log("userinfo", userinfo);


          user['email'] = userinfo.USER_ID;
          user['uid'] = userinfo.USERS_INDEX;
          user['type'] = userinfo.USER_TYPE;
          user['nickname'] = userinfo.USER_NICKNAME;
          user['user_type'] = userinfo.USER_TYPE;
          user['img'] = userinfo.USER_IMAGE;

          user["distance"] = userinfo.DISTANCE;

          const latitude = user.latitude;
          const longitude = user.longitude;
 

          dispatch2(user);

          navigate("/loginloading");


      }

      } else {
        console.log("로그인 실패");
      }
    });
  };

  const _handleLoginpagemove = () => {
    navigate("/login");
  };

  return (
    <Container style={containerStyle}>
      {loginsuccess == false && (
        <ButtonLayout>
          <div>로그인이 실패 하였습니다.</div>
          <div>로그인 페이지로 이동합니다</div>
          <Button
            buttonText={"로그인 페이지 이동"}
            callback={_handleLoginpagemove}
            containerStyle={{
              backgroundColor: "#FF4E19",
              borderRadius: "10px",
              fontSize: 17,
              color: "#fff",
              border: "1px solid #FF4E19",
              margin: " 10px 0px",
              width: "90%",
            }}
          />
        </ButtonLayout>
      )}

      {naverexist == false && (
        <div>

          <GuideLabel
            containerStyle={{ marginTop: 50 }}
            height={180}
            LabelText={"마원 네이버 로그인"}
            SubLabelText={
              "마원 채팅입니다. 마원은 건전한 마사지 업소 문화를 선도하고 있습니다. 원활한 마원 앱 이용을 위해 마원에서는 딱한번 전화번호 인증을 통해 부정사용을 방지 하고 있습니다. 회원가입이  되어 있지 않다면 회원가입을 진행 해주시고 이미 회원가입이 되어 있다면 가입된 전화번호로 네이버 아이디를 일치시켜 주시기 바랍니다 "
            }
          />


          <View1>
            <LabelView>
              <LabelText>전화번호</LabelText>
            </LabelView>
            <ConfigView>
              <input
                type="number"
                style={{ border: "none", fontSize: 14 }}
                placeholder={"전화번호"}
                value={tel}
                onChange={(e) => {
                  setTel(e.target.value);
                  setRefresh((refresh) => refresh + 1);
                }}
              />

              <Button
                buttonText={"확인"}
                callback={_handlephonecheck}
                containerStyle={{
                  backgroundColor: "#307bf1",
                  color: "#fff",
                  margin: "10px",
                  width: "150px",
                  height: 35,
                }}
              />
            </ConfigView>
          </View1>


        </div>
      )}
    </Container>
  );
};

export default Naverauthcontainer;
