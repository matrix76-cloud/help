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
import { DuplicatePhone, get_userInfoForKakaoID, get_userInfoForPhone, get_userInfoForUID, login, update_userdevice, update_userkakaoid } from "../service/UserService";
import { UserContext } from "../context/User";

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
    const [kakaoID, setKakaoID] = useState('');

  useEffect(() => {
    setAuthcheck(authcheck);
  }, [refresh]);

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

  const _handleLoginpagemove = () => {
    navigate("/login");
  };
  const _handleauthcode = async () => {
    // 이미 가입된 번호인지 확인하자

    const USER_TEL = tel;
    const userdata = await DuplicatePhone({ USER_TEL });

    console.log("user phone check", user);

    if (userdata != null) {
        alert("이미 등록된 전화번호로 기존 등록된 이용자 정보에 매핑합니다");
        
        const userinfo = await get_userInfoForPhone({ USER_TEL });
        // 업데이트 
        const USERID = userinfo.USER_SESSION;
        console.log("kakao", USERID, kakaoID);

        const kakaoupdate = await update_userkakaoid({USERID,kakaoID});
       
        //로그인 진행
        async function UserLogin(uniqueId) {
            // 아이디와 패스워드 값을 가져오자
            const DEVICEID = uniqueId;

            let email = userinfo.USER_ID;
            let password = userinfo.USER_PW;
            const user2 = await login({ email, password });

            if (user2 == -1) {
            alert("아이디와 비밀번호를 다시 확인해주시기 바랍니다");
            return;
            }

            const USER_ID = userinfo.USER_SESSION;
            const user3 = await get_userInfoForUID({ USER_ID });

            user["email"] = email;
            user["uid"] = user2.user.uid;
            user["type"] = user3.USER_TYPE;
            user["nickname"] = user3.USER_NICKNAME;
            user["user_type"] = user3.USER_TYPE;

            dispatch2(user);

            navigate("/home", { state: { homerefresh: false } });
        }

        const uniqueId = user.deviceid;

        UserLogin(uniqueId);

        
      return;
    }

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
  };

  const _handleVericodeCheck = () => {
    if (reqcode == verifyCode) {
      setAuthstart(false);
      setAuthcheck(true);
      alert("인증코드가 일치 합니다");
    } else {
      alert("인증코드가 일치 하지 않습니다");
    }
  };

  useEffect(() => {
    navigate("/home", { state: { homerefresh: false } });
  }, []);

  return (
    <Container style={containerStyle}>

    </Container>
  );
};

export default Naverauthcontainer;
