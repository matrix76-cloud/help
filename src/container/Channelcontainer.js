import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from "react";
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
import { CommaFormatted, distanceFunc, getDateFullTime, getDateOrTime, getTime, useSleep } from "../utility/common";
import Loading from "../common/Loading";
import { collection, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../api/config";
import GuideLabel from "../components/GuildeLable";
import ChatItem from "../components/ChatGateItem";
import { UserContext } from "../context/User";
import Button from "../common/Button";
import { MdOutlineAttachFile } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { ImBlocked } from "react-icons/im";
import {
  SlShield,
  SlPaperClip,
  SlLogout,
  SlUserUnfollow,
} from "react-icons/sl";
import { PiSiren } from "react-icons/pi";
import { createIntroMessage, createMainMessage, createMessage, get_channelInfo } from "../service/ChatService";
import { setRef } from "@mui/material";
import { CHATCONTENTTYPE } from "../utility/contentDefine";
import { get_checkuser, uploadImage } from "../service/CheckService";
import { get_review } from "../service/ReviewService";
import LicenseModalEx from "../components/LicenseModalEx";
import ApplyModalEx from "../components/ApplyModalEx";


const Container = styled.div`
  background: #fff;
  min-height: 800px;
`;
const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom:100px;

`;
const InfoBox = styled.div`
  font-size: 15px;
  margin: 15px 0px 5px;
  background: #fff6df;
  margin: 10px auto;
  width: 85%;
  padding: 10px;
  text-align: left;
  line-height: 2;
  border-radius: 10px;
  color: #777309;

`
const ItemBoxA = styled.div`
  background: #e6e6e6;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 10px 0px 5px;
  color: black;
  display: flex;
  flex-direction: column;
  width: 60%;
  font-size: 14px;
  text-align: left;
`;

const ItemBoxB = styled.div`
  background: #fa7b07;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 10px 0px;
  color: white;
  display: flex;
  flex-direction: column;
  max-width: 50%;
  justify-content: flex-end;
  font-size: 14px;
  text-align: left;
`;
const ChatbtnLayer = styled.div`
  display: flex;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  position: relative;

`;
const ChatIconLayer = styled.div`
  display: flex;
  flex-direction: row;
  width: 60px;
  justify-content: space-around;
`;

const InputChat = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  outline: 0;
  font-family: "SF-Pro-Text-Regular";
  font-size: 16px;
  padding: 5px;
`;

const BottomLine = styled.div`
  height: 50px;
  background-color: white;
  position: fixed;
  width: 100%;
  bottom: 0;
`;
const LoadingScreen = styled.div`
  height: 700px;
  width: 100%;
  background-color: #d8d8d8;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Enter = styled.div`
  margin-top: 5%;
  text-align: left;
  padding: 3% 10px;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  display:flex;
  margin-bottom:20px;
`

const ItemLayerA = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5px;
  margin-bottom:5px;
`;
const ChatUserImg = styled.div`
  display: flex;
  justify-content: flex-start;
  color: #000;
  padding-left: 10px;
  font-size: 12px;
`;
const ItemLayerAname = styled.div`
  justify-content: flex-start;
  font-size: 12px;
  flex-direction: row;
  display: flex;
  padding-left: 10px;
`;
const ItemLayerAcontent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
const ItemLayerAdate = styled.div`
  font-size: 12px;
  width: 100px;
  display: flex;
  justify-content: flex-start;
  padding-bottom:10px;
`;

const ItemLayerB = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ItemLayerBBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;


`;


const ItemLayerBdate = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 2px;
`;
const ItemLayerBUnread = styled.div`
  font-size: 11px;
  display: flex;
  justify-content: flex-end;
  color :#ff6e11;
  font-family:'SF-Pro-Text-Semibold';
`;
const ImageLayer = styled.image`
  width: 60%;
    height: 150px;
    padding: 10px;
    border-radius: 20px;  
`
const StoreName = styled.div`
  font-size: 14px;
  font-weight: 600
`
const StoreAddr = styled.div`
  font-size: 12px;
  color :#aba8a8;

`
const StorePrice = styled.div`
font-size: 14px;
`

const StoreIntroduce = styled.div`
  font-size: 14px;

`

const QNAButton ={
  color: 'rgb(245 105 105)',
  background: 'rgb(238 235 235)',
  width: '80%',
  height: '45px',
  fontSize: '12px',
  margin: '5px auto',
  borderRadius: '5px',
  fontWeight: 700,
  boxShadow: 'none',
  padding :'0px 10px'
}


const Channelcontainer = ({ containerStyle, CHANNEL_ID, GENERAL, GENERALNAME, ALLUSER, STORE, ALLUSERIMG }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const {user, dispatch2 } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(1);
  const [licensemodal, setLicensemodal] = useState(false);
  const [applymodal, setApplymodal] = useState(false);

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


    if (!ImagefileExtensionValid(filename)) {
      window.alert(
        "업로드 대상 파일의 확장자는 bmp, jpg, jpeg, png 만 가능 합니다"
      );
      return;
    }



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

      let msg = await ImageUpload(uri, email);
      const IMGTYPE = true;

      let read= [];
      read.push(user.uid);

      await createMessage({
        CHANNEL_ID,
        msg,
        user,
        read,
        ALLUSER,
        IMGTYPE,
      });

      msg ="파일을 첨부하였습니다";
      await createMainMessage({
        CHANNEL_ID,
        msg,
        user,
      });
      

    });
  };

  const _handlesend = async () => {

    if (message == '') {
      return;
    }
    const msg = message;
    setRefresh((refresh) => refresh + 1);

    let read= [];
    read.push(user.uid);

    const IMGTYPE = false;

    try {
      // 최초 작성자도 read로 적어주자
      // 참여 사용자도 작어주자
      await createMessage({
        CHANNEL_ID,
        msg,
        user,
        read,
        ALLUSER,
        IMGTYPE,
      });
      await createMainMessage({
        CHANNEL_ID,
        msg,
        user,
      });
    } catch (e) {
      console.log("error", e);
    }
    setMessage("");
  };

  const _hanldebuy = async() =>{

  }

  const _handleStore = async() =>{

    console.log("STORE",STORE);

    const STORE_ID = STORE.STORE_ID;
    const reviewdata = await get_review({STORE_ID});
    STORE["reviewdata"] =reviewdata;

  
    const USER_ID = STORE.USER_ID;
    const checks = await get_checkuser({USER_ID});

    STORE["checks"] =checks;

 
    navigate("/store", { state: { STORE: STORE, REFRESH : true } });
  }

  useEffect(() => {

    async function Process() {


    }
    Process();

  }, []);

  useEffect(() => {
    setMessage(message);
    setLicensemodal(licensemodal);
    setApplymodal(applymodal);

    console.log("messages", messages);

    window.scrollTo(0, document.body.scrollHeight);
  }, [refresh]);

  useEffect(() => {
    const q = query(
      collection(db, `CHANNEL/${CHANNEL_ID}/messages`),
      orderBy("CREATEDAT", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());

        if(doc.data().READ != undefined){

          let readuserDB = doc.data().READ;
          const FindIndex = readuserDB.findIndex(x=>x == user.uid);
          if(FindIndex == -1){
            //업데이트하자
              let readuser= [];
              let readuseritem = doc.data().READ;
              readuseritem.map((data)=>{
                readuser.push(data);
              })
     
              readuser.push(user.uid);
              console.log("업데이트가 필요한 내용입니다", readuser);
              updateDoc(doc.ref, {
                READ  : readuser,
              });
          }
        }

      });

      // 자신이 read 사용자에 없다면 자신을 read로 업데이트 하자
     

      setMessages(list);
    
    
       window.scrollTo(0, 0);
    });

    return () => unsubscribe();
  }, []);


  
  useLayoutEffect(() => {
    if (messages.length > 10) {
      window.scrollTo(0, 0);
    }

  })

  function ReadCount(data){

    return (ALLUSER.length - data.READ.length);
  }

  const _handleauto = async(index)=>{

    let read= [];
    read.push(ALLUSER[0]);
    read.push(ALLUSER[1]);

    const IMGTYPE = false;
    const user = {img :ALLUSERIMG[0]};

    try {
      // 최초 작성자도 read로 적어주자
      // 참여 사용자도 작어주자
     let msg = STORE.QNA[index].QUESTION;
      msg += ' ';
      msg += STORE.QNA[index].ANSWER;

      console.log("storeqna",CHANNEL_ID, msg, user, read, ALLUSER, IMGTYPE);
      await createMessage({
        CHANNEL_ID,
        msg,
        user,
        read,
        ALLUSER,
        IMGTYPE,
      });
 
    } catch (e) {
      console.log("error", e);
    }

  }

  const licensemodalcallback =(data)=>{
    console.log("sortmodal", data);
    setLicensemodal(false);
    setRefresh((refresh) => refresh +1);
  }
  const applymodalcallback =(data)=>{
    console.log("sortmodal", data);
    setApplymodal(false);
    setRefresh((refresh) => refresh +1);
  }

  const _handlelicense = () =>{
    setLicensemodal(!licensemodal);
    setRefresh((refresh) => refresh +1);
  }

  const _handleapply = () =>{
  
    setApplymodal(!applymodal);
    setRefresh((refresh) => refresh +1);
  }


  return (
    <Container style={containerStyle}>

    {
      applymodal == true && <ApplyModalEx callback={applymodalcallback} data={[]}/>
    }

    {
      licensemodal == true && <LicenseModalEx callback={licensemodalcallback} data={[]}/>
    }


      {loading == true ? (
        <>
          <Loading />

          <div id="chatbottom"></div>
          <BottomLine>
  
            <ChatbtnLayer>
              <ChatIconLayer>
                <SlPaperClip size={20} color={"#999"}  onClick={handleUploadClick} />
              </ChatIconLayer>
              <InputChat />
              <Row>
                <Button
                  callback={_handlesend}
                  buttonText={"전송"}
                  containerStyle={{
                    backgroundColor: "#fa7b07",
                    color: "#fff",
                    margin: "10px 2px",
                    width: "60px",
                    borderRadius: 5,
                    height: "30px",
                  }}
                />
              </Row>
            </ChatbtnLayer>

            <input
                  type="file"
                  ref={fileInput}
                  onChange={handlefileuploadChange}
                  style={{ display: "none" }}
            />

          </BottomLine>
        </>
      ) : (
        <>
          <ShowContainer>
            {messages.map((data, index) => (
              <>


                <InfoBox>
                  <div>{'홍여사 시스템에서 가장 중요한 곳입니다. 체팅도 하면서 해당 견적도 확인하고 사로 조율하여 계약서 까지 작성하는곳으로 가장 중요한곳입니다'}</div>
          
                </InfoBox>


                {
                  index % 30 == 0 &&
                  <InfoBox>
                  <div>{'홍여사 시스템에서는 건전한 체팅 문화를 이루기 위해 욕설이나 상대방 비방글을 사용 하는 경우 홍여사 신고센타를 운영하고 있습니다 많은 이용 바랍니다'}</div>
          
                  </InfoBox>
                }


      

                {data.CHAT_CONTENT_TYPE == CHATCONTENTTYPE.ENTER && 
                  <>

                <InfoBox>
                  <div>{'집청소 의뢰한 견적내용을 확인하고 상호 합의 하에 계약서를 작성할수 있습니다. 계약서는 의견 체팅을 총해 의견조율을 통해 온라인으로 작성되어 서명되면 법적 효력을 갖게 됩니다'}</div>
                  <div style={{display:"flex", flexDirection:"row"}}>
                  <Button
                  buttonText={"의뢰서 확인"}
                  callback={_handleapply}
                  containerStyle={{
                    color: "#fff",
                    background: "#3575ff",
                    width: "90px",
                    height: "25px",
                    fontSize: "14px",
                    marginLeft:"unset",
                    borderRadius:"5px"
                  }}
                />

                <Button
                  buttonText={"계약서 작성"}
                  callback={_handlelicense}
                  containerStyle={{
                    color: "#fff",
                    background: "#3575ff",
                    width: "90px",
                    height: "25px",
                    fontSize: "14px",
                    marginLeft:"unset",
                    borderRadius:"5px"
                  }}
                />

       

                  </div>

                  <ul style={{marginLeft:10}}>
                    <li style={{listStyleType: "disc", textDecoration:"line-through"}}>{'의뢰자 님이 계약서에 서명 완료 하였습니다'}</li>
                    <li style={{listStyleType: "disc"}}>{'홍여사 님이 계약서에 서명 대기중 입니다'}</li>
                  </ul>
               
                  
           
                  <Button
                  buttonText={"결재"}
                  callback={_hanldebuy}
                  containerStyle={{
                    color: "#fff",
                    background: "#3575ff",
                    width: "90px",
                    height: "25px",
                    fontSize: "14px",
                    marginLeft:"unset",
                    borderRadius:"5px"
                  }}
                />
                </InfoBox>


                    <InfoBox>
                      <div>{data.TEXT}</div>
                      <div>{getDateFullTime(data.CREATEDAT)}</div>
                    </InfoBox>

                    <Enter onClick={()=>{}}>
                      <div><img src={STORE.STOREIMAGEARY[0]} style={{width:"90px", height:"90px"}}/></div>
                      <div style={{display:"flex", flexDirection:"column", paddingLeft:"10px",lineHeight:1.7}}>
                        <div style={{display:"flex", flexDirection:"column"}}>
                        <StoreName>{'이순지님 집청소 지원'}</StoreName>
                        <StoreAddr>{'남양주시 다산동'} {parseInt(distanceFunc(user.latitude, user.longitude, STORE.STORELATITUDE, STORE.STORELONGITUDE) /1000)}km</StoreAddr>
                        </div>
                      
                        <StoreIntroduce>{'집청소2회, 아이돌봄10회'}</StoreIntroduce>
                        <StorePrice>가격 {CommaFormatted(STORE.STOREREPRESENTIVEPRICE)}원</StorePrice>
                      </div>
                    </Enter>

                    {
                    STORE.QNA != undefined && 
                    <ItemLayerB>
                      <ItemLayerBBox>
                          <ItemLayerBdate>{getTime(data.CREATEDAT)}</ItemLayerBdate>
                      </ItemLayerBBox>
                        <ItemBoxB>
                         일감에 대해 궁금 합니다. 다음을 편하게 물어보세여
                         <Button
                            buttonText={'집에 어린애가 있습니까?'}
                            callback={()=>{}}
                            containerStyle={QNAButton}
                          />

                          <Button
                            buttonText={'청소를 최근에 언제 하셨나여?'}
                            callback={()=>{}}
                            containerStyle={QNAButton}
                          />
                         </ItemBoxB>
                    </ItemLayerB>
                    }
                  </>
               
                }

              { data.CHAT_CONTENT_TYPE == CHATCONTENTTYPE.EXIT && 
                  <>
                    <InfoBox>
                      <div>{data.TEXT}</div>
                      <div>{getDateFullTime(data.CREATEDAT)}</div>
                    </InfoBox>       
                  </>
                }

                {(data.CHAT_CONTENT_TYPE != CHATCONTENTTYPE.INFO
                && data.CHAT_CONTENT_TYPE != CHATCONTENTTYPE.EXIT
                && data.CHAT_CONTENT_TYPE != CHATCONTENTTYPE.ENTER) &&
                  <>
                    {user.uid != data.USER.uid ? (
                      <ItemLayerA>
                        <Row>
                          <ChatUserImg>
                            <img
                              src={ALLUSERIMG[0]}
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                background:'#ff4e19',
                              }}
                            />
                          </ChatUserImg>
                          <Column>
                            {GENERAL == true ? (
                              <ItemLayerAname>{GENERALNAME}</ItemLayerAname>
                            ) : (
                              <ItemLayerAname>
                                {data.USER.nickname}
                              </ItemLayerAname>
                            )}

                            <ItemLayerAcontent>
                              {
                                data.IMGTYPE == true ? (<img src={data.TEXT}
                                  style={{width: '60%',
                                  height: '150px',
                                  padding: '10px',
                                  borderRadius: '20px'  
                                  }}
                                />):( <ItemBoxA>{data.TEXT}</ItemBoxA>)
                              }
                            
                              <ItemLayerAdate>
                                {getTime(data.CREATEDAT)}
                              </ItemLayerAdate>
                            </ItemLayerAcontent>
                          </Column>
                        </Row>
                      </ItemLayerA>
                    ) : (
                      <ItemLayerB>
                        <ItemLayerBBox>
                          {
                            //read 사용자를 계산해서 보여주는 function를 만들자
                            ReadCount(data)> 0 &&
                            <ItemLayerBUnread>{ReadCount(data)}</ItemLayerBUnread>
                          }
                        
                          <ItemLayerBdate>{getTime(data.CREATEDAT)}</ItemLayerBdate>
                        </ItemLayerBBox>
                        {
                          data.IMGTYPE == true ? (<img src={data.TEXT}
                            style={{width: '60%',
                            height: '150px',
                            padding: '10px',
                            borderRadius: '20px'  
                            }}
                          />):( <ItemBoxB>{data.TEXT}</ItemBoxB>)
                        }
                      </ItemLayerB>
                    )
                    }
                  </>
                }
           
                
              </>
            ))}
          </ShowContainer>

          <BottomLine>
       
            <ChatbtnLayer>
              <ChatIconLayer>
                <SlPaperClip size={20} color={"#999"} onClick={handleUploadClick} />
              </ChatIconLayer>

              <InputChat
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
              <Row>
                <Button
                  callback={_handlesend}
                  buttonText={"전송"}
                  containerStyle={{
                    backgroundColor: "#fa7b07",
                    color: "#fff",
                    margin: "10px 2px",
                    width: "60px",
                    borderRadius: 5,
                    height: "30px",
                  }}
                />
              </Row>
            </ChatbtnLayer>

            <input
                  type="file"
                  ref={fileInput}
                  onChange={handlefileuploadChange}
                  style={{ display: "none" }}
            />

          </BottomLine>
        </>
      )}
    </Container>
  );
};

export default Channelcontainer;
