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

import Fade from "react-reveal/Fade";


const Container = styled.div`
  background: #d8d8d8;
  min-height: 800px;

`;
const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 140px;
  padding-bottom:100px;

  

`;

const SelectContainer = styled.div`
  border: 1px solid #ededed;
  width: 90%;
  padding: 20px 5px;
  margin: 10px 0px;
  background: ${({check}) => check == true ? ('#3a3737'):('#fff')};
  color: ${({check}) => check == true ? ('#fff'):('#000')};
  border-radius: 10px;
  padding: 20px 10px;

`;

const ItemBoxA = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 5px 10px 0px;
  color: black;
  display: flex;
  flex-direction: column;
  width: 70%;
  font-size: 16px;
  text-align: left;
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

const ItemLayerAcontent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const ItemLayerB = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const ItemBoxB = styled.div`
  background: #3a3737;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 10px 0px;
  color: #fff;
  display: flex;
  flex-direction: column;
  max-width: 50%;
  justify-content: flex-end;
  font-size: 14px;
  text-align: left;
`;


const Requestcontainer = ({ containerStyle }) => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);

  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    setMessages(messages);

    // window.scrollTo(0, document.body.scrollHeight);
  }, [refresh]);

  useEffect(() => {

   
    async function Fetchdata(){
      messages.push({type:"request", index:0, content:"몇가지 정보만 알려주시면 실시간으로 견적을 받을수 있어요."});
      setMessages(messages);

      setRefresh((refresh) => refresh +1);

      await useSleep(2000);
      
      let task = [];

      task.push({type:"request", index:1, content:"어떤서비스를 원하시나여?"
      , select : false, items:[{check : false, key:"정기", content:"정기적으로 청소를 하기를 원하시나여?"},{check : false, key:"1회", content:"1회만 청소를 하기를 원하시나여? "},

      messages.push(task);
    ]});

      setMessages(messages);
  
      setRefresh((refresh) => refresh +1);

    }
    Fetchdata();


  }, []);


  
  useLayoutEffect(() => {


  })

  const _handleNext = () =>{
    messages.push({type:"response", content:"운전만 해주세여"});
    setMessages(messages);

    setRefresh((refresh) => refresh +1);
  }

  const _handlecheck = (index, data, key)=>{

    messages[index].items.map((data)=>{
      data.check = false;
    })

    const FindIndex = messages[index].items.findIndex(x=>x.key == key);

    messages[index].items[FindIndex].check= true;

    setRefresh((refresh) => refresh +1);
  }


  return (
    <Container style={containerStyle}>
        <ShowContainer>
            {messages.map((data, index) => (
               <>
               {"request" == data.type ? (
                  <Fade bottom delay={500}>
                    <ItemLayerA>
                    <Row>
                      <Column>
                        <ItemLayerAcontent>
                          
                            <ItemBoxA>
                              <span>{data.content}</span>
                              {
                              data.select == false ?
                              (
                              <div>
                                {data.items.map((subdata)=>(
                                  <SelectContainer className="button" check={subdata.check}
                                  onClick={()=>{_handlecheck(1,data, subdata.key)}}>
                                        <div>{subdata.content}</div>
                                  </SelectContainer>
                            
                                ))}

                                <Button            
                                buttonText={"다음"}
                                callback={_handleNext}
                                containerStyle={{
                                  backgroundColor: "#F0F0F0",
                                  color :"#000",
                                  border :"1px solid #ededed",
                                  borderRadius: "10px",
                                  fontSize: 15,
                                  height:45,
                                  margin: " 10px 0px",
                                  width: "95%",
                
                                }}
                              />
                              </div>):(<>
                                <span>{data.content}</span>
                              </>)
                              }

                            
                            </ItemBoxA>

                      
                        </ItemLayerAcontent>
                      </Column>
                    </Row>
                   </ItemLayerA>

                  </Fade>
        
               ) : (
                <>
                <Fade bottom delay={500}>
                    <ItemLayerB>         
                        <ItemBoxB>
                        <span>{data.content}</span>   
                        </ItemBoxB>
                
                   </ItemLayerB>

                  </Fade>
                </>
               )}
             </>
            ))}
          </ShowContainer>
    </Container>
  )
};

export default Requestcontainer;
