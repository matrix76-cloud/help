import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
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
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
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
  height: 30px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: -10px;
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
  height: 80px;
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

const ItemLayerBdate = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`;

const Channelcontainer = ({ containerStyle, CHANNEL_ID, GENERAL, GENERALNAME }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { user, dispatch2 } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(1);



  const _handlesend = async () => {

    if (message == '') {
      return;
    }
    const msg = message;
    setRefresh((refresh) => refresh + 1);

    try {
      await createMessage({
        CHANNEL_ID,
        msg,
        user,
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
    // window.scrollTo(0, document.body.scrollHeight);
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
      });


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

  return (
    <Container style={containerStyle}>
      {loading == true ? (
        <>
          <Loading />

          <div id="chatbottom"></div>
          <BottomLine>
            <InputChat />
            <ChatbtnLayer>
              <ChatIconLayer>
                <SlPaperClip size={20} color={"#999"} />
              </ChatIconLayer>
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
                                borderRadius: 10,
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
                              <ItemBoxA>{data.TEXT}</ItemBoxA>
                              <ItemLayerAdate>
                                {getTime(data.CREATEDAT)}
                              </ItemLayerAdate>
                            </ItemLayerAcontent>
                          </Column>
                        </Row>
                      </ItemLayerA>
                    ) : (
                      <ItemLayerB>
                        <ItemLayerBdate>
                          {getTime(data.CREATEDAT)}
                        </ItemLayerBdate>
                        <ItemBoxB>{data.TEXT}</ItemBoxB>
                      </ItemLayerB>
                    )}
                  </>
                )}
              </>
            ))}
          </ShowContainer>

          <BottomLine>
            <InputChat
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <ChatbtnLayer>
              <ChatIconLayer>
                <SlPaperClip size={20} color={"#999"} />
              </ChatIconLayer>
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
          </BottomLine>
        </>
      )}
    </Container>
  );
};

export default Channelcontainer;
