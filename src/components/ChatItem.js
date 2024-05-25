import React, {useContext, useState, useEffect} from "react";
import styled ,{ThemeContext } from "styled-components";
import PropTypes from 'prop-types';
import Image from "../common/Image";
import { getFullTime } from "../utility/common";
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

const formatter = buildFormatter(koreanStrings); 

const ItemContainer = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items: center;
    padding : 5px 20px;
    height : 50px;
`


const ImageIcon = styled.image`
    width : 40px;
    height : 40px;
    resizeMode : stretch;
    border-radius :50px;
`

const ItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 70%;
  color: #626060;
`;
const ItemHeartContainer = styled.div`
    display : flex;
    align-content : center;
    justify-conet : center;

`

const ItemDesc = styled.span`
    font-size : 14px;
    color :#999;
    text-align:left;
`
const ItemTitle2 = styled.span`
    font-size : 14px;
    font-family : ${({theme}) => theme.REGULAR};
`
const ItemMember = styled.span`
  font-size: 14px;
  font-family: ${({ theme }) => theme.REGULAR};
  color : #999;
  padding-left:10px;
`;

const ItemDateTitle = styled.span`
    font-size : 13px;
    font-family : ${({theme}) => theme.REGULAR};
    color :#999;
`


const ItemTag = styled.span`
    font-size : 14px;
    font-family : ${({theme}) => theme.REGULAR} 
`

const Iconbtn = styled.div`
    align-content : center;
    padding :5px 10px;
   
`

const ItemDelete = styled.div`

    background-color: #6564D9;
    justify-content: center;
    align-items: flex-end;
`

const ItemBtn1 = styled.div`
    background-color: #6564D9;
    justify-content: center;
    align-items : center;
    height:100%;
`

const ChatView = styled.div`
  width: 80px;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  color :#999;
  border-radius: 10px;
`;
const ChatText = styled.span`
    font-size: 12px;
`
const IconLayer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height:70px;
`
const Roomowner = styled.div`
  font-size: 12px;
  background-color: #ff4e19;
  color: #fff;
  border-radius:5px;
  padding: 0px 8px;
  margin-top:5px;
`;
const RoomUnreadcount = styled.div`
  font-size: 12px;
  background-color: #ff4219;
  color: #fff;
  border-radius: 50%;
  padding: 3px 0px;
  width: 20px;
`;


const ChatItem = (({item,containerStyle })=>{
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const { user, dispatch2 } = useContext(UserContext);
    const [nickname, setNickname] = useState('');
    const [currentname, setCurrentname] = useState("");
    const [room, setRoom] = useState('');
    const [refresh, setRefresh] = useState(1);

    const [unreadcount, setUnreadcount] = useState(0);

    const _handleChat = () => {
        
        if (item.TYPE == ChatType.GENERAL) {
            navigate("/CHANNEL", {
              state: {
                CHANNEL_ID: item.CHANNEL_ID,
                NICKNAME: currentname,
                GENERAL: true,
                ALLUSER : item.ALLUSER,
              },
            });     
        } else if (item.TYPE == ChatType.GROUP) {
            navigate("/CHANNEL", {
              state: {
                CHANNEL_ID: item.CHANNEL_ID,
                NICKNAME: room,
                GROUP: "group",
                ALLUSER : item.ALLUSER,
              },
            });           
        }else if (item.TYPE == ChatType.CHECKER) {
          navigate("/CHANNEL", {
            state: {
              CHANNEL_ID: item.CHANNEL_ID,
              NICKNAME: currentname,
              CHECKER: true,
              ALLUSER : item.ALLUSER,
            },
          });
        } 
      
    }


    useEffect(() => {
      
      console.log("item", item);
        async function FetchData() {

          let USER_ID = item.OWNERID;
      
          if (item.TYPE == ChatType.GROUP) { 
            const store = await get_storeinfoForUSERID({ USER_ID });
            setRoom(store.STORENAME);
            setCurrentname("그룹체팅방");



          }

          if (item.TYPE == ChatType.GENERAL) {      
            if (user.uid != item.OWNERID) {
              // 내가 점주가 아니라면
              const store = await get_storeinfoForUSERID({ USER_ID });
              setCurrentname(store.STORENAME);
            } else {
              // 내가 점주라면
              const useritem = await get_userInfoForUID({ USER_ID });
              setCurrentname(useritem.USER_NICKNAME);
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
              {item.TYPE == ChatType.GROUP && <ChatText>
              
                  {room.slice(0, 8)}
                  {room.length > 8 ? "..." : null}
                  </ChatText>}
              {item.TYPE == ChatType.CHECKER && <ChatText>    
                {room.slice(0, 8)}
                  {room.length > 8 ? "..." : null}</ChatText>}

              <ChatText>
                {item.TYPE}
                {item.TYPE == ChatType.GROUP && (
                  <span>{"(" + item.ALLUSER.length + ")명"}</span>
                )}
              </ChatText>

              {item.TYPE == ChatType.GROUP && (
                <>{item.OWNERID == user.uid && <Roomowner>방장</Roomowner>}</>
              )}
            </ChatView>
          </IconLayer>

          <ItemTextContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                <ItemTitle2>{currentname}</ItemTitle2>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ItemDateTitle>
                  <TimeAgo
                    date={getFullTime(item.CREATEDAT)}
                    formatter={formatter}
                  />
                </ItemDateTitle>
              </div>
            </div>

            <div
              style={{
                paddingTop: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {item.TITLE != undefined && (
                <ItemDesc>
                  {item.TITLE.slice(0, 15)}
                  {item.TITLE.length > 15 ? "..." : null}
                </ItemDesc>
              )}
              {item.TITLE == undefined && <ItemDesc></ItemDesc>}
              {
                unreadcount >0 &&
                <RoomUnreadcount>{unreadcount}</RoomUnreadcount>
              }
             
            </div>
          </ItemTextContainer>
        </ItemContainer>
      </>
    );
})

ChatItem.defaultProps = {
    TITLE : "",
}
  

ChatItem.propTypes = {
    containerStyle : PropTypes.object,
    TITLE : PropTypes.string,
}


export default ChatItem;