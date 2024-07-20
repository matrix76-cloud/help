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
import Label from "../common/Label";
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

const MainLoginView = styled.div`
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : flex-start;
    margin          : 20px 3%;
    background-color: #FFF;
    border          : 1px solid #ededed;
    height          : 60px;
    padding-left    : 30px;
    padding-top     : 20px;
    padding-bottom  : 20px;
`


const Kakaoauthcontainer = ({ containerStyle }) => {
    const navigate = useNavigate();

    const { user, dispatch2 } = useContext(UserContext);

    const [loginsuccess, setLoginsuccess] = useState(true);
    const [kakaoexist, setkakaoexist] = useState(true);
    const [kakaoID, setKakaoID] = useState('');
    const [tel, setTel] = useState("");
    const [authcheck, setAuthcheck] = useState(false);
    const [refresh, setRefresh] = useState((refresh) => refresh + 1);
    const [verifyCode, setVerifyCode] = useState("");
    const [reqcode, setReqcode] = useState("");

    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [authstart, setAuthstart] = useState(false);


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
  const _handlephonecheck = async () =>
  {
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
    // 카카오 아이디에 해당하는 사용자가 있는지 검사 한다
    // 사용자정보에서 인사디비에서  검사한다

    async function FetchData() {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get("code");
      if (code) {
        const tokendata = await getToken(code);

        const kakaouser = await getKaKaoUserData(tokendata);

        console.log("kakaouser", kakaouser.id);
        //사용자 정보가 있는지

          const kakaoID = kakaouser.id;
          const kakaoexist = await get_userInfoForKakaoID({ kakaoID });
          setKakaoID(kakaoID);

        if (kakaoexist == null) {
            setkakaoexist(false);

        } else {

            const userinfo = await get_userInfoForKakaoID({ kakaoID });

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
        setLoginsuccess(false);
      }
    }

    FetchData();

    // 없다면 가입 처리를 진행한다(가입 처리를 진행 할때 전화번호를 받아라)
  }, []);

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

      {kakaoexist == false && (
        <div>

          <GuideLabel
            containerStyle={{ marginTop: 50 }}
            height={180}
            LabelText={"마원 카카오 로그인"}
            SubLabelText={
              "마원 채팅입니다. 마원은 건전한 마사지 업소 문화를 선도하고 있습니다. 원활한 마원 앱 이용을 위해 마원에서는 딱한번 전화번호 인증을 통해 부정사용을 방지 하고 있습니다. 회원가입이  되어 있지 않다면 회원가입을 진행 해주시고 이미 회원가입이 되어 있다면 가입된 전화번호로 카카오 아이디를 일치시켜 주시기 바랍니다 "
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

export default Kakaoauthcontainer;
