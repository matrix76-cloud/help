import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { fn_smsShare, fn_telShare } from "../utility/common";
import { UserContext } from "../context/User";
import { CHATCONTENTTYPE, ChatType } from "../utility/contentDefine";
import { createChannel, createGroupChannel, createIntroMessage, createMainMessage, get_channel, get_channelInfo, get_groupchannel, updateChannel } from "../service/ChatService";
import { useNavigate } from "react-router-dom";




const TRANSPARENT = 'transparent';

const Container = styled.div`
  height: 60px;
  width: 90%;
  padding :0px 5%;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

`
const StoreButtonView = styled.div`
    display:flex;
    flex-direction : row;
    justify-content:center;
    align-items:center;
  
`

const StoreButtonData = styled.div`
    display:flex;
    border-radius : 10px;
    border :1.5px solid #D9D9D9;
    margin :10px 0px 10px 5px;
    padding :8px 3px;
    background-color : #EDEDED;
    width:50%;
    justify-content:center;

`
const StoreButton2Data = styled.a`
    display:flex;
    border-radius : 10px;
    border :1px solid #FF4E19;
    background-color :#FF4E19;
    margin :10px 5px 10px 5px;
    padding :8px 3px;
    width:50%;
    justify-content:center;
    
`

const StoreButtonDataText = styled.span`
    font-size :13px;
    color :#000;
    font-family : ${({theme}) =>theme.BOLD};
`


const StoreButtonData2Text = styled.span`
    font-size :13px;
    color :#FFF;
    font-family : ${({theme}) =>theme.BOLD};

`






const Storebutton = ({ containerStyle, store }) => {
    
    const navigate = useNavigate();

    const { user, dispatch2 } = useContext(UserContext);

    const _handleTel = () =>{
        let number = fn_telShare(store.STORETEL);        
    }
        
    const _handlegroupchat = async () => {
        if (user.uid == "") {
            alert("로그인이 필요한 메뉴 입니다");
            return;
        }
        // 그룹 채널이 주인이 존재하는지 확인
        const USERID = store.USER_ID;
        const OWNERID = store.USER_ID;
        const ret = await get_groupchannel({ USERID });

        if (ret == -1) {
            const type = ChatType.GROUP;

            const ALLUSER = [];
            ALLUSER.push(USERID);

            if (USERID != user.uid) {
                ALLUSER.push(user.uid);
            }

            // 그룹을 만들고 그룹에서 입장하자


            const channel = await createChannel({
                type,
                OWNERID,
                ALLUSER,
            });
            const CHANNEL_ID = channel;
            const a = await get_channelInfo({ CHANNEL_ID });
            if (a.ALLUSER.findIndex((x) => x == user.uid) != -1) {

                const msg = user.nickname + "님이 방에 입장하였습니다";
                const CHAT_CONTENT_TYPE = CHATCONTENTTYPE.ENTER;
                try {
                    await createIntroMessage({
                        CHANNEL_ID,
                        msg,
                        CHAT_CONTENT_TYPE,
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

                navigate("/channel", {
                  state: {
                    CHANNEL_ID: CHANNEL_ID,
                    NICKNAME: store.STORENAME,
                    GROUP: "group",
                    GENERAL: false,
                  },
                });
            }
        }else {
                // 체팅 페이지로 바로 이동
                const CHANNEL_ID = ret.CHANNEL_ID;
                const ALLUSER = ret.ALLUSER;

                const FindIndex = ALLUSER.findIndex(x => x == user.uid);
                if (FindIndex == -1) {
                    ALLUSER.push(user.uid);
                    const msg = user.nickname + "님이 방에 입장하였습니다";
                    const CHAT_CONTENT_TYPE = CHATCONTENTTYPE.ENTER;
                    try {
                    await createIntroMessage({
                      CHANNEL_ID,
                      msg,
                      CHAT_CONTENT_TYPE,
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
                }
                const updatechannel = await updateChannel({
                    ALLUSER,
                    CHANNEL_ID,
                });

                // 체팅 페이지로 바로 이동
                navigate("/channel", {
                  state: {
                    CHANNEL_ID: CHANNEL_ID,
                    NICKNAME: store.STORENAME,
                    GROUP: "group",
                    GENERAL: false,
                  },
                });
        }
    }

    const _handlechat = async () => {

        if (user.uid == '') {
            alert("로그인이 필요한 메뉴 입니다");
            return;
        }

        if (user.uid == store.USER_ID) {
            alert("본인 상점입니다. 본인 상점과 일대일 대화는 할수가 없습니다");
            return;
        }
        
        // 채널이 주인이 존재하는지 확인
        const OTHERID = store.USER_ID;
        const SELFID = user.uid;
        const OWNERID = store.USER_ID;
        const TYPE = ChatType.GENERAL;
        
        const ret = await get_channel({ OTHERID, SELFID,TYPE });
   
        console.log("channel info", ret, OTHERID, SELFID);

        if (ret == -1) {
            const type = ChatType.GENERAL;
            const ALLUSER = [OTHERID, SELFID];

            const channel = await createChannel({
              type,
              OWNERID,
              ALLUSER,
            }); 
            navigate("/channel", {
                state: {
                CHANNEL_ID: channel,
                NICKNAME: store.STORENAME,
                GENERAL : true
                },
            });
 
            const CHANNEL_ID = channel;
            const a = await get_channelInfo({ CHANNEL_ID });

            if (a.ALLUSER.findIndex((x) => x == user.uid) != -1) {
                const msg = user.nickname + "님이 방에 입장하였습니다";
                const CHAT_CONTENT_TYPE = CHATCONTENTTYPE.ENTER;
                try {
                await createIntroMessage({
                    CHANNEL_ID,
                    msg,
                    CHAT_CONTENT_TYPE,
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

                // navigate("/channel", {
                //   state: {
                //     CHANNEL_ID: channel,
                //     NICKNAME: store.STORENAME,
                //     GENERAL: true,
                //   },
                // });
            }

     
            
        } else {
          // 체팅 페이지로 바로 이동
            const CHANNEL_ID = ret.CHANNEL_ID;
            const ALLUSER = ret.ALLUSER;
            console.log("channle info", ret);

          const FindIndex = ALLUSER.findIndex((x) => x == user.uid);
          if (FindIndex == -1) {
            ALLUSER.push(user.uid);
            const msg = user.nickname + "님이 방에 입장하였습니다";
            const CHAT_CONTENT_TYPE = CHATCONTENTTYPE.ENTER;
            try {
              await createIntroMessage({
                CHANNEL_ID,
                msg,
                CHAT_CONTENT_TYPE,
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
          }

            
          // 체팅 페이지로 바로 이동
          navigate("/channel", {
            state: {
              CHANNEL_ID: ret.CHANNEL_ID,
              NICKNAME: store.STORENAME,
              GENERAL: true,
            },
          });
        }
 
       
    }




    return(
        <Container style={containerStyle}>
            <StoreButtonView>

            {
                store.STOREGROUPCHAT == true &&      
                <StoreButtonData activeOpacity={0.8} onClick={_handlegroupchat}>
                    <div style={{display:"flex", flexDirection: "row", justifyContent:"center", alignItems:"center"}}>
                        <div style={{marginLeft:5}}>
                            <StoreButtonDataText>그룹채팅</StoreButtonDataText>
                        </div>
                        
                    </div>
                </StoreButtonData>  
            }

            {
                store.STORECHAT == true &&
                <StoreButtonData activeOpacity={0.8} onClick={_handlechat}>
                <div style={{display:"flex", flexDirection: "row", justifyContent:"center", alignItems:"center"}}>
                    <div style={{marginLeft:5}}>
                        <StoreButtonDataText>일대일채팅</StoreButtonDataText>
                    </div>
                    
                </div>
                </StoreButtonData> 
            }
       

            <StoreButton2Data href={fn_smsShare(store.STORETEL)}>
                <div style={{display:"flex", flexDirection: "row" , justifyContent:"center", alignItems:"center"}}>
                    {/* <StoreImage source ={StoretelImage} /> */}
                    <div style={{marginLeft:5}}>
                    <StoreButtonData2Text>
                        문자보내기
                    </StoreButtonData2Text>
                    </div>
                </div>
            </StoreButton2Data> 
      

            <StoreButton2Data href={fn_telShare(store.STORETEL)}>
                <div style={{display:"flex", flexDirection: "row" , justifyContent:"center", alignItems:"center"}}>
                    {/* <StoreImage source ={StoretelImage} /> */}
                    <div style={{marginLeft:5}}>
                    <StoreButtonData2Text>
                        전화걸기
                    </StoreButtonData2Text>
                    </div>
                </div>
            </StoreButton2Data> 
          
     
            </StoreButtonView>
    
        </Container>
    );
}



Storebutton.propTypes = {
    containerStyle : PropTypes.object,
}

export default Storebutton;
