import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import { get_checkuser, get_checkuserForname, update_checkuser2, update_checkuser } from '../service/CheckService';
import { theme } from '../theme/theme';
import { UserContext } from '../context/User';
import { CHATCONTENTTYPE, ChatType } from '../utility/contentDefine';
import { get_userInfoForusername } from '../service/UserService';
import { createChannel, createCheckerChannel, createIntroMessage, createMainMessage, get_channel, get_channelInfo } from '../service/ChatService';
import { getStoreData } from '../utility/common';
import CheckstatusModalEx from './CheckstatusModalEx';


const Container = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: space-between;
  align-items: flex-start;
  padding:20px 5%;
  width :90%;
  
`
const CheckView = styled.div`
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    margin-top :20px;
    margin-bottom :20px;
    justify-content : flex-start;
    align-items : center;
    width:100%;
`
const PersonItem = styled.div`
    width :100%;
    height : 180px;
    border-width :1px;
    border-color : #EBEBEB;
    border-radius :10px;
    margin :5px;
    padding :10px 15px;
    background-color :#f9f9f9;
    display:flex;
    justify-content:center;
    flex-direction: column;
`
const PersonNameView = styled.div`
    display: flex;
    flex-direction : row;
    justify-content:flex-end;
    height:25px;

`
const PersonGeneralText = styled.span`

    font-family : ${({theme}) =>theme.REGULAR};
    font-size :13px;
`
const PersonNameText = styled.span`

    font-family : ${({theme}) =>theme.SEMIBOLD};
    font-size :18px;
`

const CheckButtonData = styled.div`
    border-radius : 10px;
    background-color : #FF4D1A;
    width : 50px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;

`
const NoCheckButtonData = styled.div`
    border-radius : 5px;
    background-color : #588CFF;
    width : 60px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;

`

const OffCheckButtonData = styled.div`
    border-radius : 10px;
    background-color : #000;
    width : 50px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`
const StopCheckButtonData = styled.div`
    border-radius : 10px;
    background-color : #000;
    width : 50px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`
const ChatView = styled.div`
    background-color : ${({bgcolor})=>bgcolor};
    width: 50%;
    height: 25px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    display: flex;
`
const ChatViewhelp = styled.div`
  background-color: #ffffff;
  width: 200px;
  border-radius: 5px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  text-align: left;
  padding: 5px;
  color: #000;
  border: 1px solid #ededed;
  margin-bottom:10px;
`
const ChatText = styled.span`
    color :#fff;
    font-family : ${({theme}) =>theme.EXTRABOLD};
    font-size: 14px;
`
const ChatTextHelp = styled.span`
    color :#000;
    font-family : ${({theme}) =>theme.EXTRABOLD};
    font-size: 11px;
`

const CheckButtonDataText = styled.span`
    font-size :14px;
    color :#fff;
    font-family : ${({theme}) =>theme.BOLD};
`
const StatusChangeView = styled.div`


`

const Storecheck = ({containerStyle, store, SELF}) => {

  const [users, setUsers] = useState([]);

  const [refresh, setRefresh] = useState(1);

  const [checkstatus, setCheckstatus] = useState(false);

  const [checkuser_id, setCheckuser_id] = useState('');

  const {user, dispatch2} = useContext(UserContext);
  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){

      const USER_ID =store.USER_ID;
      const checks = await get_checkuser({USER_ID});
      setUsers(checks);
    
	}
		fetchData();
  }, [])

  const _handlechatdisable = async(data)=>{
    
    console.log("handlechatdisable", data);

    const CHECKCHAT = false;
    const CHECKUSER_ID = data.CHECKUSER_ID;

    const updatechecker = await update_checkuser2({ CHECKUSER_ID, CHECKCHAT });
      
    async function fetchData(){

      const USER_ID =store.USER_ID;
      const checks = await get_checkuser({USER_ID});
      setUsers(checks);


      const latitude = user.latitude;
      const longitude = user.longitude;
      getStoreData({user, latitude, longitude}).then((result)=>{
        dispatch2(result);
      
      });

    
      setRefresh((refresh) => refresh +1);
	  } 
		fetchData();

  }

  const _handlechatenable = async(data)=>{

    console.log("handlechatenable", data);
    const CHECKUSER_ID = data.CHECKUSER_ID;
    const CHECKCHAT = true;
 


    const updatechecker = await update_checkuser2({ CHECKUSER_ID, CHECKCHAT });
        
    async function fetchData(){

      const USER_ID =store.USER_ID;
      const checks = await get_checkuser({USER_ID});
      setUsers(checks);


      const latitude = user.latitude;
      const longitude = user.longitude;
      getStoreData({user, latitude, longitude}).then((result)=>{
        dispatch2(result);
      
      });

      setRefresh((refresh) => refresh +1);
  	}
		fetchData();

  }



  const _handlechat = async (data) => {
      if (user.uid == "") {
      alert("로그인이 필요한 메뉴 입니다");
      return;
      }

      if(SELF == true){
        return true;
      }

      // 관리사의 사용자 아이디를  찾아내
      
      const USER_NICKNAME = data.CHECKID;
    const CHECKUSERITEM = await get_userInfoForusername({ USER_NICKNAME });
    

    // 관리사의 진짜 아이디를 찾아내
    const CHECKID = CHECKUSERITEM.USER_NICKNAME;

    const CHECKUSER = await get_checkuserForname({ CHECKID });

      if (user.uid == CHECKUSERITEM.USER_SESSION) {
        alert("본인 과 대화할수는 없습니다");
        return;
      }
      console.log("CHECKUSERITEM", CHECKUSERITEM);

      // 채널이 주인이 존재하는지 확인
      const OTHERID = CHECKUSERITEM.USER_SESSION;
      const SELFID = user.uid;
      const OWNERID = CHECKUSER.CHECKUSER_ID;
      const TYPE = ChatType.CHECKER;

      const ret = await get_channel({ OTHERID, SELFID,  TYPE});

    console.log("chat", ret, OWNERID, TYPE, SELFID, OWNERID);
    
    if (ret == -1) {
      

        const type = ChatType.CHECKER;
        const ALLUSER = [OTHERID, SELFID];
        
        const CHECKUSERNAME = data.CHECKUSERNAME;

        const channel = await createCheckerChannel({
          type,
          OWNERID,
          ALLUSER,
          CHECKUSERNAME,
        });
        // 체팅 페이지로 바로 이동

        navigate("/channel", {
          state: {
            CHANNEL_ID: channel,
            NICKNAME: data.CHECKUSERNAME,
            CHECKER : true,
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
          //   },
          // });
        }



      } else {
          console.log("chat방 존재");
      // 체팅 페이지로 바로 이동
      navigate("/channel", {
        state: {
          CHANNEL_ID: ret.CHANNEL_ID,
          NICKNAME: data.CHECKUSERNAME,
          CHECKER: true,
        },
      });
      }
  };


  useEffect(()=>{

    setCheckstatus(checkstatus);
    setCheckuser_id(checkuser_id);
    setUsers(users);

  },[refresh])

  const _handleCheckStatus = (data) => {     

    if(SELF != true){
      return;
    }
    setCheckstatus(!checkstatus);
    setCheckuser_id(data.CHECKUSER_ID);
    setRefresh(refresh => refresh +1);
}
    


  const checkstatuscallback = async(data) => {

    if(SELF != true){
      return;
    }

    setCheckstatus(false);

    const CHECKUSER_ID = checkuser_id;
    const CHECKSTATUS = data;

    const updatechecker = await update_checkuser({ CHECKUSER_ID, CHECKSTATUS });
            
    async function fetchData() {
        const USER_ID =user.uid;
        const checks = await get_checkuser({USER_ID});
        setUsers(checks);

    }
    fetchData();

  }

  const _handleAdjust= (data)=>{

    if(SELF != true){
      return;
    }

    navigate("/checkadd", { state: { TYPE: "ADJUST", DATA : data } });  


  }




  return (
    <>

      {checkstatus == true ? (
        <CheckstatusModalEx callback={checkstatuscallback}></CheckstatusModalEx>
      ) : null}

      {users.length > 0 && (
        <Container style={containerStyle}>
          <Text
            value={"관리사 출근부"}
            containerStyle={{ fontWeight: 600 }}
            size={14}
          />

          <CheckView>
            {users.map((data, index) => (
              <PersonItem key={index}>
                <>
                {
                  SELF == true ? (
                    <>
                    {
                      data.CHECKCHAT == true ? (  <ChatView bgcolor={theme.main} onClick={() => { _handlechatdisable(data) }}>
                      <ChatText>{"채팅 가능"}</ChatText>
                      </ChatView>) :( <ChatView bgcolor={"#8d8582"} onClick={() => { _handlechatenable(data) }}>
                      <ChatText>{"채팅 불가능"}</ChatText>
                      </ChatView>)
                    }
                    
                    </>
                  ) :(<>
                    {data.CHECKCHAT == true ? (
                      <ChatViewhelp bgcolor={theme.main} onClick={() => { }}>
                      <ChatTextHelp>{"아래 관리사 이미지를 클릭하시면 관리사와 채팅이 가능합니다"}</ChatTextHelp>
                      </ChatViewhelp>
                    ) : ( <ChatView bgcolor={"#8d8582"}>
                    <ChatText>{"채팅 불가능"}</ChatText>
                    </ChatView>)}
                    </>)
                }
                </>


  
                <div style={{display:"flex", flexDirection:"row"}}>

                  {
                    SELF == true ? (<div onClick={()=>{}}  style={{width:"50%", display:"flex", justifyContent:"center", alignItms:"center", flexDirection:"column"}}>
                    <img  src={data.IMG} style={{width:"100px", height:"100px", borderRadius:"100px",}}/>
                  </div>):(
                    <>
                     {
                      data.CHECKCHAT == true ? ( <div onClick={()=>{_handlechat(data)}} className="imgblink" style={{width:"50%", display:"flex", justifyContent:"center", alignItms:"center", flexDirection:"column"}}>
                        <img  src={data.IMG} style={{width:"100px", height:"100px", borderRadius:"100px",}}/>
                        </div>) :(     <div onClick={()=>{}}  style={{width:"50%", display:"flex", justifyContent:"center", alignItms:"center", flexDirection:"column"}}>
                        <img  src={data.IMG} style={{width:"100px", height:"100px", borderRadius:"100px",}}/>
                      </div>)
                     }
                    </>
                  )
                  }
                
               
             
                  <div style={{display:"flex", justifyContent:"flex-end", flexDirection:"column", width:"50%"}}>      
                      <PersonNameView onClick={()=>{_handleAdjust(data)}} >
                        <div style={{ marginRight: 3, paddingTop: 4 }}>
                          <PersonGeneralText>{"관리사"}</PersonGeneralText>
                        </div>
                        <div>
                          <PersonNameText>{data.CHECKUSERNAME}</PersonNameText>
                        </div>
                      </PersonNameView>
                      <PersonNameView onClick={()=>{_handleAdjust(data)}} >
                        <div>
                          <PersonGeneralText>{data.CHECKBODY}</PersonGeneralText>
                        </div>
                      </PersonNameView>
                      <PersonNameView onClick={()=>{_handleAdjust(data)}} >
                        <div>
                          <PersonGeneralText>
                            {data.CHECKAGE}/{data.CHECKHEIGHT}
                          </PersonGeneralText>
                        </div>
                      </PersonNameView>
                      <PersonNameView onClick={()=>{_handleAdjust(data)}} >
                        <div>
                          <PersonGeneralText>
                            {data.CHECKSTARTTIME} ~ {data.CHECKENDTIME}
                          </PersonGeneralText>
                        </div>
                      </PersonNameView>
                      <PersonNameView onClick={()=>{_handleCheckStatus(data)}}>
                        <StatusChangeView>
                          {data.CHECKSTATUS == "출근전" && (
                            <NoCheckButtonData>
                              <CheckButtonDataText>
                                {data.CHECKSTATUS}
                              </CheckButtonDataText>
                            </NoCheckButtonData>
                          )}
                          {data.CHECKSTATUS == "퇴근" && (
                            <NoCheckButtonData>
                              <CheckButtonDataText>
                                {data.CHECKSTATUS}
                              </CheckButtonDataText>
                            </NoCheckButtonData>
                          )}
                          {data.CHECKSTATUS == "마감" && (
                            <StopCheckButtonData>
                              <CheckButtonDataText>
                                {data.CHECKSTATUS}
                              </CheckButtonDataText>
                            </StopCheckButtonData>
                          )}
                          {data.CHECKSTATUS == "출근" && (
                            <CheckButtonData>
                              <CheckButtonDataText>
                                {data.CHECKSTATUS}
                              </CheckButtonDataText>
                            </CheckButtonData>
                          )}
                          {data.CHECKSTATUS == "휴무" && (
                            <OffCheckButtonData>
                              <CheckButtonDataText>
                                {data.CHECKSTATUS}
                              </CheckButtonDataText>
                            </OffCheckButtonData>
                          )}
                        </StatusChangeView>
                      </PersonNameView>
                  </div>

                </div>


          
              </PersonItem>
            ))}
          </CheckView>
        </Container>
      )}
    </>
  );
}

export default Storecheck;
