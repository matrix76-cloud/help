

import React,{useState, useEffect, useContext, useRef} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/User';
import { add_checkuser, get_checkuser, update_checkuser, update_checkuser2, update_checkuserinfo, uploadImage } from '../service/CheckService';
import { theme } from '../theme/theme';
import CheckstatusModalEx from '../components/CheckstatusModalEx';
import CheckchatModalEx from '../components/CheckchatModalEx';
import Button from '../common/Button';
import GuideLabel from '../components/GuildeLable';
import { MaroneContent } from '../utility/maroneDefine';
import { get_userInfoForusername } from '../service/UserService';
import { CHECK } from '../utility/contentDefine';
import Loading from '../common/Loading';

const Container = styled.div`
  margin-top:60px;

`
const CheckView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px;
`;

const ContentView = styled.div`

  border : 1px solid #ededed;
  display : flex;
  flex-direction: column;
  font-size:14px;
  width:100%;
  margin-top:10px;

`

const ContentLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px;
`;

const InputData = styled.input`
  border: none;
  font-size: 14px;
  width: 80%;
  border-bottom: 1px solid;
  margin-bottom: 10px;
  border-radius: unset;
  padding-left: 10px;
  margin-left: 10px;
  background-color : #f9f9f9;
`;

const CheckButton = styled.div`
  background: ${({ enable }) => (enable == true ? "#FF4E19" : "#f9f9f9")};
  color: ${({ enable }) => (enable == true ? "#fff" : "#000")};
  padding: 10px;
  width: 20%;
  margin: 5px 10px;
`;

const SelectView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ageitems = ['20초반', '20중반', '20후반', '30초반', '30중반', '30후반', '40초반'];
const bodyitems = ['슬림', '보통', '글램'];
const heightitems = [
  "150초반",
  "150중반",
  "150후반",
  "160초반",
  "160중반",
  "160후반",
  "170초반",
  "170중반",
  "170후반",
];

const Info = styled.div`
  font-size: 12px;
  text-align: left;
  width: 80%;
  padding-left: 10px;
  padding-bottom: 10px;
`;

const Checkaddcontainer = ({containerStyle, type, item}) => {

  const { user, dispatch2 } = useContext(UserContext);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(1);
  const [name, setName] = useState(item.CHECKUSERNAME);
  const [id, setId] = useState(item.CHECKID);
  const [starttime, setStarttime] = useState(item.CHECKSTARTTIME);
  const [endtime, setEndtime] = useState(item.CHECKENDTIME);
  const [age, setAge] = useState(item.CHECKAGE);
  const [body, setBody] = useState(item.CHECKBODY);
  const [height, setHeight] = useState(item.CHECKHEIGHT);
  const [registenable, setRegistenable] = useState(true);
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fwoman5.png?alt=media&token=2cc3f09f-44e9-4a5f-a6cd-0a8030324b0d");

  const fileInput = useRef();

  const handleUploadClick = (e) => {
    fileInput.current.click();
  };

  const ALLOW_IMAGE_FILE_EXTENSION = "jpg,jpeg,png,bmp";

  const ImagefileExtensionValid = (name) => {
    const extention = removeFileName(name);

    if (
      ALLOW_IMAGE_FILE_EXTENSION.indexOf(extention) <= -1 ||
      extention == ""
    ) {
      return false;
    }
    return true;
  };
  const removeFileName = (originalFileName) => {
    const lastIndex = originalFileName.lastIndexOf(".");

    if (lastIndex < 0) {
      return "";
    }
    return originalFileName.substring(lastIndex + 1).toLowerCase();
  };

  const ImageUpload = async (data, data2) => {
    const uri = data;
    const email = data2;
    const URL = await uploadImage({ uri, email });
    return URL;
  };
  
  
  const handlefileuploadChange = async (e) => {
    let filename = "";
    const file = e.target.files[0];
    filename = file.name;
    let imageurl = imageUrl;

    if (!ImagefileExtensionValid(filename)) {
      window.alert(
        "업로드 대상 파일의 확장자는 bmp, jpg, jpeg, png 만 가능 합니다"
      );
      return;
    }

    setLoading(true);

    var p1 = new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let img = reader.result;
        resolve(img);
      };
    });
    const getRandom = () => Math.random();
    const email = getRandom();

    p1.then(async (result) => {
      const uri = result;
      console.log("uri", uri);

      const URL = await ImageUpload(uri, email);
      console.log("image", URL);
      imageurl = URL;

      setImageUrl(imageurl);

      // const tax_id = taxid;
      // const imageurl = imageUrl;
      // update_userfile({ tax_id, type, imageurl });
      setLoading(false);
      
      setRefresh(refresh => refresh + 1);
    });
  };


  const _handleverifycallback = async() => {


    // 먼저 대화명으로 사용자가 있는지 검색하자 썌

    // 나중에 살리자
    // const USER_NICKNAME = id;
    // const a = await get_userInfoForusername({ USER_NICKNAME });

    // if (a == null) {
    //   alert("이용자 정보가 존재 하지 않습니다");
    //   return;
    // } else {
    //   alert("이용자 정보를 확인하였습니다. 정상적으로 가입 가능합니다");
    // }

    // 먼저 대화명으로 관리사가 있는지 검색하자



    setRegistenable(true);
    setRefresh(refresh => refresh + 1);
  }
  const _handleregistcallback = async() => {
    if (registenable == false) {
      return;
    }

    if (name == '' ||
      age == '' ||
      height == '' ||
      body == '' ||
      starttime == '' ||
      endtime == '' ||
      id ==''
    ) {
      alert("관리사 정보가 충분히 입력되지 않았습니다. 충분히 확인하시고 입력해주세여");
      return;
    }
    const CHECKAGE = age;
    const CHECKBODY = body;
    const CHECKENDTIME = endtime;
    const CHECKSTARTTIME = starttime;
    const CHECKHEIGHT = height;
    const CHECKID = "test";
    const CHECKUSERNAME = name;
    const DEVICEID = user.deviceid;
    const USER_ID = user.uid;
    const IMG = imageUrl;

    const a = await add_checkuser({
      CHECKAGE,
      CHECKBODY,
      CHECKENDTIME,
      CHECKHEIGHT,
      CHECKID,
      CHECKSTARTTIME,
      CHECKUSERNAME,
      DEVICEID,
      USER_ID,
      IMG,
    });

    alert(
      "관리사가 추가 되었습니다"
    );

    // navigate("/checkadmin", {state :{STORE : item}});
  }

  const _handleadjustcallback = async() => {

    if (
      name == "" ||
      age == "" ||
      height == "" ||
      body == "" ||
      starttime == "" ||
      endtime == "" ||
      id == ""
    ) {
      alert(
        "관리사 정보가 충분히 입력되지 않았습니다. 충분히 확인하시고 입력해주세여"
      );
      return;
    }

    const CHECKUSER_ID = item.CHECKUSER_ID;
    const CHECKAGE = age;
    const CHECKBODY = body;
    const CHECKENDTIME = endtime;
    const CHECKSTARTTIME = starttime;
    const CHECKHEIGHT = height;
    const CHECKID = "test";
    const CHECKUSERNAME = name;
    const DEVICEID = user.deviceid;
    const USER_ID = user.uid;
    const IMG = imageUrl;
    
    const a = await update_checkuserinfo({
      CHECKUSER_ID,
      CHECKAGE,
      CHECKBODY,
      CHECKENDTIME,
      CHECKHEIGHT,
      CHECKID,
      CHECKSTARTTIME,
      CHECKUSERNAME,
      DEVICEID,
      USER_ID,
      IMG
    });

    alert("관리사가 수정 되었습니다");

    // navigate("/checkadmin", {state :{STORE : item}});

  };

  const _handleage = (age) => {
    setAge(age);
    setRefresh(refresh => refresh + 1);
  }
    const _handleheight = (height) => {
      setHeight(height);
      setRefresh((refresh) => refresh + 1);
    };
    const _handlebody = (body) => {
      setBody(body);
      setRefresh((refresh) => refresh + 1);
    };


  useEffect(()=>{
    setAge(age);
    setHeight(height);
    setBody(body);

  }, [])
  

  useEffect(() => {
    setAge(age);
  }, [refresh])

  return (
    <>
        {
      loading == true ? (<Loading containerStyle={{marginTop:"30%"}}/>):(<Container style={containerStyle}>
        <CheckView>
          <GuideLabel
            containerStyle={{ marginTop: 10, padding: "unset" }}
            height={120}
            LabelText={"관리사 정보"}
            SubLabelText={MaroneContent.check}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <ContentView>
              <ContentLabel>관리사 이름 등록</ContentLabel>
              <InputData
                type="text"
                placeholder={"관리사 이름을 입력해주세요(세글자만)"}
                value={name}
                onChange={(e) => {
                  if (e.target.value.length > 3) {
                    return;
                  }
                  setName(e.target.value);
                  setRefresh((refresh) => refresh + 1);
                }}
              />
            </ContentView>
  
            <ContentView>
              <ContentLabel>관리사 사진 등록</ContentLabel>
       
                  <Button
                      buttonText={"등록하기"}
                      callback={handleUploadClick}
                      containerStyle={{
                        backgroundColor: '#b4acac',
                        color: "#fff",
                        margin: "10px",
                        width: "50%",
                        height: 30,
                        fontSize: 15,
                        fontFamily:"Pretendard-Regular",
                        borderRadius: "5px",
                    }}
                  /> 

              <input
                type="file"
                ref={fileInput}
                onChange={handlefileuploadChange}
                style={{ display: "none" }}
              />

              {
                imageUrl != '' && 
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", marginBottom:10}}>
                <img
                src={imageUrl}
                style={{ height: "120px", width: "120px" }} />
                </div>
    
              }

  
            </ContentView>
  
            <ContentView>
              <ContentLabel>관리사 나이 선택</ContentLabel>
              <SelectView>
                {ageitems.map((data, index) => (
                  <CheckButton
                    enable={data == age}
                    onClick={() => {
                      _handleage(data);
                    }}
                  >
                    {data}
                  </CheckButton>
                ))}
              </SelectView>
            </ContentView>
            <ContentView>
              <ContentLabel>관리사 체형 선택</ContentLabel>
              <SelectView>
                {bodyitems.map((data, index) => (
                  <CheckButton
                    enable={data == body}
                    onClick={() => {
                      _handlebody(data);
                    }}
                  >
                    {data}
                  </CheckButton>
                ))}
              </SelectView>
            </ContentView>
            <ContentView>
              <ContentLabel>관리사 키 선택</ContentLabel>
              <SelectView>
                {heightitems.map((data, index) => (
                  <CheckButton
                    enable={data == height}
                    onClick={() => {
                      _handleheight(data);
                    }}
                  >
                    {data}
                  </CheckButton>
                ))}
              </SelectView>
            </ContentView>
            <ContentView>
              <ContentLabel>관리사 근무시간 등록</ContentLabel>
              <InputData
                type="text"
                placeholder={"출근시간을 숫자로 입력해주세요 예) 2000 "}
                value={starttime}
                onChange={(e) => {
                  setStarttime(e.target.value);
                  setRefresh((refresh) => refresh + 1);
                }}
              />
              <InputData
                type="text"
                placeholder={"퇴근시간을 숫자로 입력해주세요 예) 0400"}
                value={endtime}
                onChange={(e) => {
                  setEndtime(e.target.value);
                  setRefresh((refresh) => refresh + 1);
                }}
              />
            </ContentView>
            {type == "ADJUST" && (
              <ContentView>
                <ContentLabel>관리사 등록 계정 선택</ContentLabel>
                <Info>{CHECK.USERREGISTINFO}</Info>
                <InputData
                  type="text"
                  placeholder={"관리사 등록계정을 입력해주세요"}
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                    setRefresh((refresh) => refresh + 1);
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    buttonText={"가능여부확인"}
                    callback={_handleverifycallback}
                    containerStyle={{
                      backgroundColor: "#FF4E19",
                      borderRadius: "10px",
                      fontSize: 14,
                      color: "#fff",
                      border: "1px solid #FF4E19",
                      margin: " 5px 0px",
                      width: "30%",
                      height: "30px",
                    }}
                  />
                </div>
              </ContentView>
            )}
          </div>
  
          {type == "ADD" ? (
            <Button
              buttonText={"등록"}
              callback={_handleregistcallback}
              containerStyle={{
                backgroundColor: registenable == true ? "#FF4E19" : "#999",
                borderRadius: "10px",
                fontSize: 16,
                color: "#fff",
                margin: "10px 0px",
                width: "100%",
                height: "40px",
              }}
            />
          ) : (
            <Button
              buttonText={"수정"}
              callback={_handleadjustcallback}
              containerStyle={{
                backgroundColor: "#FF4E19",
                borderRadius: "10px",
                fontSize: 16,
                color: "#fff",
                margin: "10px 0px",
                width: "100%",
                height: "40px",
              }}
            />
          )}
        </CheckView>
      </Container>)
    }
    </>


  );
}

export default Checkaddcontainer;
