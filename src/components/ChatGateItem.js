import React, {useContext, useState, useEffect} from "react";
import styled ,{ThemeContext } from "styled-components";
import PropTypes from 'prop-types';
import Image from "../common/Image";
import { AddressSummmary, getFullTime } from "../utility/common";
import TimeAgo from 'react-timeago'
import Icon from "../common/Icon";
import { colors, theme } from "../theme/theme";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../api/config";
import { UserContext } from "../context/User";
import { get_userInfoForUID } from "../service/UserService";
import { get_storeinfoForUSERID } from "../service/StoreService";
import { ChatType } from "../utility/contentDefine";
import { get_checkuser, get_checkuserForcheckname } from "../service/CheckService";
import { TYPE } from "../utility/maroneDefine";
import koreanStrings from "react-timeago/lib/language-strings/ko";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import useId from "@mui/material/utils/useId";
import { imageDB } from "../utility/imageData";

const formatter = buildFormatter(koreanStrings); 

const ItemContainer = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : center;
    padding : 5px 10px;
    height : 70px;
`

const ItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top:15px;
  width: 70%;
  color: #626060;
`;


const ItemDesc = styled.span`
    font-size : 14px;
    color :#595959;
    text-align:left;
`
const ItemTitle = styled.span`
    font-size : 14px;
    font-family : ${({theme}) => theme.REGULAR};
    margin-left:5px;
`


const ItemDateTitle = styled.span`
    font-size :9px;
    font-family : ${({theme}) => theme.REGULAR};
    color :#999;
    padding-top:3px;
`
const ItemAddrTitle = styled.span`
    font-size : 9px;
    font-family : ${({theme}) => theme.REGULAR};
    color :#999;
    padding-top:3px;
`


const ChatView = styled.div`
  justify-content: center;
  align-items: flex-start;
  display: flex;
  color :#999;
  border-radius: 10px;
`;
const ChatLabel = styled.div`
  background: #746e6e;
  color: #fff;
  font-size: 10px;
  padding: 0px 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const IconLayer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
height: 60px;
background: #ededed;
border-radius: 60px;
width: 60px;
`

const RoomUnreadcount = styled.div`
  font-size: 12px;
  background-color: #ff4219;
  color: #fff;
  border-radius: 50%;
  padding: 3px 0px;
  width: 20px;
`;

const Image1 = styled.div``;


const Image2 = styled.div`
  position: relative;

`
const MainImage ={
  width:'30px', 
  height:'30px',
  borderRadius:'30px',
}
const SubImage ={
  width:"30px",
  height:"30px", 
  borderRadius:"30px"
}
const Row={
  display: "flex",
  flexDirection: "row",
}




const ChatGateItem = (({item,containerStyle })=>{
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const { user, dispatch2 } = useContext(UserContext);
    const [nickname, setNickname] = useState('');
    const [currentname, setCurrentname] = useState("");
    const [room, setRoom] = useState('');
    const [refresh, setRefresh] = useState(1);

    const [store, setStore] = useState({});

    const [unreadcount, setUnreadcount] = useState(0);

    const _handleChat = () => {
        
        if (item.TYPE == ChatType.GENERAL) {
            navigate("/CHANNEL", {
              state: {
                CHANNEL_ID: item.CHANNEL_ID,
                NICKNAME: currentname,
                GENERAL: true,
                ALLUSER : item.ALLUSER,
                ALLUSERIMG : item.ALLUSERIMG,
                STORE : store,
              },
            });     
        }else if (item.TYPE == ChatType.CHECKER) {
          navigate("/CHANNEL", {
            state: {
              CHANNEL_ID: item.CHANNEL_ID,
              NICKNAME: currentname,
              CHECKER: true,
              ALLUSER : item.ALLUSER,
              ALLUSERIMG : item.ALLUSERIMG,
              STORE : store,
            },
          });
        } 
      
    }


    useEffect(() => {
      
      console.log("item", item);
        async function FetchData() {

          let USER_ID = item.OWNERID; 

          if (item.TYPE == ChatType.GENERAL) {      
            if (user.uid != item.OWNERID) {
              // 내가 점주가 아니라면
              const store = await get_storeinfoForUSERID({ USER_ID });
              setCurrentname(store.STORENAME);
              setStore(store);
            } else {
              // 내가 점주라면
              const useritem = await get_userInfoForUID({ USER_ID });
              setCurrentname(useritem.USER_NICKNAME);

              const store = await get_storeinfoForUSERID({ USER_ID });
              setStore(store);

            }
          }
          if (item.TYPE == ChatType.CHECKER) {
    
            setRoom(item.CHECKUSERNAME);

            const CHECKUSERNAME = item.CHECKUSERNAME;
            
            const checkitem = await get_checkuserForcheckname({ CHECKUSERNAME });

            console.log("checkitem", checkitem);

            if (user.uid != checkitem.USER_ID) {
              // 내가 관리사가 아니라면
              setCurrentname(item.CHECKUSERNAME);
            } else {
              // 내가관리사라면
              let useritem = await get_userInfoForUID({ USER_ID });

              if (useritem) {
                setCurrentname(useritem.USER_NICKNAME); 
              }
      
            }
          }


          // 카운트 구하기

          let unReadCount = 0;
          const q = query(
            collection(db, `CHANNEL/${item.CHANNEL_ID}/messages`),
            orderBy("CREATEDAT", "asc")
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
          
      
              if(doc.data().READ != undefined){
      
                let readuserDB = doc.data().READ;
                const FindIndex = readuserDB.findIndex(x=>x == user.uid);
                if(FindIndex == -1){
                  unReadCount++;
                }
              }
      
            });
            setUnreadcount(unReadCount);
          });


 
        }
        FetchData();
    }, []);

    useEffect(() => {
        setNickname(nickname);
    },[refresh])

    return (
      <>
        <ItemContainer onClick={_handleChat} style={containerStyle}>
          <IconLayer>
            <ChatView>
               <Image1><img src={imageDB.sample2} style={MainImage}/></Image1>
               <Image2><img src={imageDB.sample3} style={SubImage}/></Image2>
                  {item.TYPE == ChatType.CHECKER && <ChatLabel>    
                  {room.slice(0, 8)}
                  {room.length > 8 ? "..." : null}</ChatLabel>}
            </ChatView>
          </IconLayer>

          <ItemTextContainer>
            <div style={Row}>
                <ChatLabel>{'집청소 도움지원'}</ChatLabel>
                <ItemTitle>{'이순지님'}과 대화</ItemTitle>  
            </div>

            <div style={{paddingTop: 10,display: "flex",justifyContent: "space-between",}}>
              {item.TITLE != undefined && (
                <ItemDesc>
                  {item.TITLE.slice(0, 10)}
                  {item.TITLE.length > 10 ? "..." : null}
                </ItemDesc>
              )}
              {item.TITLE == undefined && <ItemDesc></ItemDesc>}
       
              <div style={{ display: "flex", flexDirection: "row",justifyContent:"center",alignItems:"center" }}>
              {
                unreadcount >0 &&
                <RoomUnreadcount>{unreadcount}</RoomUnreadcount>
              }
                {
                  store != undefined && <ItemAddrTitle> {AddressSummmary(store.STOREADDR)}{'/'}</ItemAddrTitle>
                }
                <ItemDateTitle>
                  <TimeAgo date={getFullTime(item.CREATEDAT)}formatter={formatter}/>
                </ItemDateTitle>

              </div>
             
            </div>
          </ItemTextContainer>
        </ItemContainer>
      </>
    );
})

ChatGateItem.defaultProps = {
    TITLE : "",
}
  

ChatGateItem.propTypes = {
    containerStyle : PropTypes.object,
    TITLE : PropTypes.string,
}


export default ChatGateItem;