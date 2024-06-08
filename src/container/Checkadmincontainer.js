

import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/User';
import { get_checkuser, update_checkuser, update_checkuser2 } from '../service/CheckService';
import { theme } from '../theme/theme';
import CheckstatusModalEx from '../components/CheckstatusModalEx';
import CheckchatModalEx from '../components/CheckchatModalEx';
import Button from '../common/Button';
import { MaroneContent } from '../utility/maroneDefine';
import GuideLabel from '../components/GuildeLable';
import Storecheck from '../components/Storecheck';

const Container = styled.div`
  margin-top:60px;

`
const ContentView = styled.div`
`
const CheckView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 0px 2.5%;
  align-items: center;
`;
const PersonItem = styled.div`
    width :120px;
    height : 160px;
    border-width :1px;
    border-color : #EBEBEB;
    border-radius :10px;
    margin :10px;
    padding :8px;
    background-color :#EDEDED;
    display:flex;
    justify-content:center;
    flex-direction: column;
`
const PersonNameView = styled.div`
    display: flex;
    flex-direction : row;
    justify-content : flex-end;
    margin-right :5px;

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
    width: 40px;
    height: 20px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    display: flex;
}
`
const ChatText = styled.span`
    color :#fff;
    font-family : ${({theme}) =>theme.EXTRABOLD};
    font-size: 10px;
`

const CheckButtonDataText = styled.span`
    font-size :14px;
    color :#fff;
    font-family : ${({theme}) =>theme.BOLD};
`
const StatusChangeView = styled.div`


`


const Checkadmincontainer = ({containerStyle, STORE}) => {

    const {user, dispatch2} = useContext(UserContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [checkstatus, setCheckstatus] = useState(false);
    const [checkchat, setCheckchat] = useState(false);
    const [refresh, setRefresh] = useState(1);
    const [checkuser_id, setCheckuser_id] = useState('');

    useEffect(()=>{
        async function fetchData(){
            const USER_ID =user.uid;
            const checks = await get_checkuser({USER_ID});
            setUsers(checks);

        }
        fetchData();
    }, [])
    
    
    const checkstatuscallback = async(data) => {
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

    const _handleCheckStatus = (CHECKUSER_ID) => {     
        setCheckstatus(!checkstatus);
        setCheckuser_id(CHECKUSER_ID);
        setRefresh(refresh => refresh +1);
    }
        
    const checkchatcallback = async (data) => {
        setCheckchat(false);



        const CHECKUSER_ID = checkuser_id;
        let CHECKCHAT = false;
        if (data == '체팅가능') {
            CHECKCHAT = true;
        } else {
            CHECKCHAT = false;
        }


        const updatechecker = await update_checkuser2({ CHECKUSER_ID, CHECKCHAT });
                
        async function fetchData() {
            const USER_ID =user.uid;
            const checks = await get_checkuser({USER_ID});
            setUsers(checks);

        }
        fetchData();

    }

    const _handleCheckChat = (CHECKUSER_ID) => {     
        setCheckchat(!checkchat);
        setCheckuser_id(CHECKUSER_ID);
        setRefresh(refresh => refresh +1);
    }
    const _handlecheckcallback = () => {
        navigate("/checkadd", {
          state: {
            TYPE: "ADD",
            DATA: {
                CHECKUSERNAME: "",
                CHECKAGE: "",
                CHECKBODY: "",
                CHECKHEIGHT:"",
                CHECKCHAT: false,
                CHECKSTARTTIME: "",
                CHECKENDTIME: "",
                CHECKSTATUS :""
            },
          },
        });
    }
 

    useEffect(() => {
        setCheckstatus(checkstatus);
        setCheckchat(checkchat);
    }, [refresh])

  return (
    <Container style={containerStyle}>
      {checkstatus == true ? (
        <CheckstatusModalEx callback={checkstatuscallback}></CheckstatusModalEx>
      ) : null}
      {checkchat == true ? (
        <CheckchatModalEx callback={checkchatcallback}></CheckchatModalEx>
      ) : null}

      <GuideLabel
        containerStyle={{ marginTop: 10, padding: "20px" }}
        height={120}
        LabelText={"관리사 상태변경"}
        SubLabelText={MaroneContent.check1}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: 20,
        }}
      >
        <Button
          buttonText={"관리사 등록"}
          callback={_handlecheckcallback}
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

      <CheckView>
        {/* {users.map((data, index) => (
          // <PersonItem key={index}>
          //   {data.CHECKCHAT == true ? (
          //     <ChatView
          //       bgcolor={theme.main}
          //       onClick={() => {
          //         _handleCheckChat(data.CHECKUSER_ID);
          //       }}
          //     >
          //       <ChatText>{"채팅 가능"}</ChatText>
          //     </ChatView>
          //   ) : (
          //     <ChatView
          //       bgcolor={"#999"}
          //       onClick={() => {
          //         _handleCheckChat(data.CHECKUSER_ID);
          //       }}
          //     >
          //       <ChatText>{"채팅 불가"}</ChatText>
          //     </ChatView>
          //   )}

          //   <ContentView
          //     onClick={() => {
          //       _handleAdjust(data);
          //     }}
          //   >
          //     <PersonNameView>
          //       <div style={{ marginRight: 3, paddingTop: 4 }}>
          //         <PersonGeneralText>{"관리사"}</PersonGeneralText>
          //       </div>
          //       <div>
          //         <PersonNameText>{data.CHECKUSERNAME}</PersonNameText>
          //       </div>
          //     </PersonNameView>
          //     <PersonNameView>
          //       <div>
          //         <PersonGeneralText>{data.CHECKBODY}</PersonGeneralText>
          //       </div>
          //     </PersonNameView>
          //     <PersonNameView>
          //       <div>
          //         <PersonGeneralText>
          //           {data.CHECKAGE}/{data.CHECKHEIGHT}
          //         </PersonGeneralText>
          //       </div>
          //     </PersonNameView>
          //     <PersonNameView>
          //       <div>
          //         <PersonGeneralText>
          //           {data.CHECKSTARTTIME} ~ {data.CHECKENDTIME}
          //         </PersonGeneralText>
          //       </div>
          //     </PersonNameView>
          //   </ContentView>

          //   <PersonNameView>
          //     <StatusChangeView
          //       onClick={() => {
          //         _handleCheckStatus(data.CHECKUSER_ID);
          //       }}
          //     >
          //       {data.CHECKSTATUS == "출근전" && (
          //         <NoCheckButtonData>
          //           <CheckButtonDataText>
          //             {data.CHECKSTATUS}
          //           </CheckButtonDataText>
          //         </NoCheckButtonData>
          //       )}
          //       {data.CHECKSTATUS == "퇴근" && (
          //         <NoCheckButtonData>
          //           <CheckButtonDataText>
          //             {data.CHECKSTATUS}
          //           </CheckButtonDataText>
          //         </NoCheckButtonData>
          //       )}
          //       {data.CHECKSTATUS == "마감" && (
          //         <StopCheckButtonData>
          //           <CheckButtonDataText>
          //             {data.CHECKSTATUS}
          //           </CheckButtonDataText>
          //         </StopCheckButtonData>
          //       )}
          //       {data.CHECKSTATUS == "출근" && (
          //         <CheckButtonData>
          //           <CheckButtonDataText>
          //             {data.CHECKSTATUS}
          //           </CheckButtonDataText>
          //         </CheckButtonData>
          //       )}
          //       {data.CHECKSTATUS == "휴무" && (
          //         <OffCheckButtonData>
          //           <CheckButtonDataText>
          //             {data.CHECKSTATUS}
          //           </CheckButtonDataText>
          //         </OffCheckButtonData>
          //       )}
          //     </StatusChangeView>
          //   </PersonNameView>
          // </PersonItem>
          <Storecheck store={STORE} SELF={true}/>
        ))} */}

        <Storecheck store={STORE} SELF={true}/>
      </CheckView>
    </Container>
  );
}

export default Checkadmincontainer;
