

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
import { imageDB } from '../utility/imageData';

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
  border-radius :10px;
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

const SelectImage = styled.div`

margin-bottom: 10px;

color: #242323;
padding: 5px 10px;
text-decoration: underline;

`


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

  const [imageUrl, setImageUrl] = useState(item.IMG);

  const fileInput = useRef();

  const handleUploadClick = (e) => {
    fileInput.current.click();
  };

  const ALLOW_IMAGE_FILE_EXTENSION = "jpg,jpeg,png,bmp";

  const checkadminimg = [
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2F55555.png?alt=media&token=0dfd3f8e-d1aa-4bdc-bcd2-1d42036868fc",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2F444444.png?alt=media&token=d0c7b15a-c687-479f-bc44-16d83b40257d",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2F949635.png?alt=media&token=6155cdb6-7623-4f8d-9913-d8b2c1f5a30c",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2F2154481.png?alt=media&token=a2b0baea-153f-440a-8c9c-a0ae59ede7e2",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2F3270686.svg?alt=media&token=6c653c0a-cfb4-4f30-b3da-0ea9d5c2312e",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2F3577099.png?alt=media&token=3200234f-921d-44a1-aaa9-7b3df6065d6c",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2F4086577.png?alt=media&token=8fe9b909-7d3f-4e7b-b0fa-56b00870eefa",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fcartoon-sexy-woman-underwear-260nw-188165348.webp?alt=media&token=89b46c72-38d5-4a8e-8ddb-6adeeddb4be8",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fistockphoto-1224163694-612x612.jpeg?alt=media&token=7b04a99d-7e46-4bf6-92be-f472b5c1f329",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fmd_90a48b7f4837448509d59deb01e571e7.jpeg?alt=media&token=fdec9416-1365-40f3-a279-a1cb79ffd6fd",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fpng-transparent-sexy-girl-woman-in-red-bikini-sexy-woman-vector-template-svg-file-sexy-woman-in-red-bikini-thumbnail.png?alt=media&token=1e26585b-cb4f-4ad6-84ab-a6a4863c4654",
   "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fpngtree-sexy-girl-wearing-a-wreath-image_1080943.jpeg?alt=media&token=5286e72d-cc2b-41f0-b8d7-2859a8a774de"
  ]

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

  const selectImageButton = (index)=>{

    setImageUrl(checkadminimg[index]);
    setRefresh((refresh) => refresh +1);
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

    console.log("image", IMG);

  
    
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
    setImageUrl(imageUrl);
  }, [refresh])

  return (
    <>
        {
      loading == true ? (<Loading containerStyle={{marginTop:"60%"}}/>):(<Container style={containerStyle}>
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
       
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                <Button
                      buttonText={"이미지 찾아보기"}
                      callback={handleUploadClick}
                      containerStyle={{
                        backgroundColor: '#fff',
                        color: "#000",
                        border :"1px solid",
                        margin: "10px",
                        width: "50%",
                        height: 30,
                        fontSize: 15,
                        fontFamily:"Pretendard-Regular",
                        borderRadius: "5px",
                    }}
                  /> 

                  {
                    imageUrl != '' && 
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"center", marginBottom:10}}>
                    <img
                    src={imageUrl}
                    style={{ height: "100px", width: "100px", borderRadius:"100px",
                    border: "3px dashed #ff0000",
                    borderRadius: "50px" }} />
                    </div>
        
                  }
                </div>


              <input
                type="file"
                ref={fileInput}
                onChange={handlefileuploadChange}
                style={{ display: "none" }}
              />

              <div style={{display:"flex", justifyContent:"center"}}>
                <SelectImage>이미지 선택하기</SelectImage>
              </div>
              

              <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
              {
                checkadminimg.map((data, index)=>(
                  <img src={data} 
                  onClick={()=>{selectImageButton(index)}}
                  className="button"
                  style={{width:"50px", height:"50px", borderRadius:"50px", marginLeft:20, marginBottom:30}}/>
                ))
              }
              </div>

  
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
                      backgroundColor: "#FFF",
                      borderRadius: "10px",
                      fontSize: 14,
                      color: "#000",
                      border: "1px solid #EDEDED",
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
