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
import { getDateFullTime, getDateOrTime, getTime, useSleep } from "../utility/common";
import Loading from "../common/Loading";
import { collection, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../api/config";
import GuideLabel from "../components/GuildeLable";
import ChatItem from "../components/ChatItem";
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
import { uploadImage } from "../service/CheckService";

const Container = styled.div`
  background: #d8d8d8;
  min-height: 800px;
`;
const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  padding-bottom:100px;

`;
const ItemContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.background};
  flex-direction: column;
  justfy-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const ItemBoxA = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 10px 0px;
  color: black;
  display: flex;
  flex-direction: column;
  width: 60%;
  font-size: 14px;
  text-align: left;
`;

const ItemBoxB = styled.div`
  background: #f9e000;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 10px 0px;
  color: black;
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

const Channelcontainer = ({ containerStyle, CHANNEL_ID, GENERAL, GENERALNAME, ALLUSER }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { user, dispatch2 } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(1);


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

  useEffect(() => {

    async function Process() {


    }
    Process();

  }, []);

  useEffect(() => {
    setMessage(message);
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
    
       if (messages.length > 10) {
         window.scrollTo(0, document.body.scrollHeight);
       }
     
    });

    return () => unsubscribe();
  }, []);


  
  useLayoutEffect(() => {
    if (messages.length > 10) {
          window.scrollTo(0, document.body.scrollHeight);  
    }

  })

  function ReadCount(data){

    return (ALLUSER.length - data.READ.length);
  }

  return (
    <Container style={containerStyle}>
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
                    backgroundColor: "#f9e000",
                    color: "#000",
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
                {data.CHAT_CONTENT_TYPE != undefined ? (
                  <div style={{ fontSize: 12, margin: "15px 0px" }}>
                    <div>{data.TEXT}</div>
                    <div>
                      <span style={{ paddingLeft: 10 }}>
                        {getDateFullTime(data.CREATEDAT)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    {user.uid != data.USER.uid ? (
                      <ItemLayerA>
                        <Row>
                          <ChatUserImg>
                            <img
                              src={data.USER.img}
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
                    )}
                  </>
                )}
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
                    backgroundColor: "#f9e000",
                    color: "#000",
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
