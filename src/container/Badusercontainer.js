import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import Button from '../common/Button';
import Question from '../components/Question';
import { delete_baduser, get_badalluser } from '../service/BadUserService';
import { useSleep } from '../utility/common';
import { get_userInfoForUID } from '../service/UserService';
import { UserContext } from '../context/User';

const useqna = [{ "data1": "마원 출시 이벤트 공지사항", "data2": "마원 출시를 합니다. 마원가입자의 경우는 엄청난 혜택을 드립니다" },

]

const Container = styled.div`
  margin-top:70px;
  padding : 0px 20px;
`
const ButtonLayout = styled.div`

  display:flex;
  flex-direction : row;
  flex-wrap : wrap;
  width: 400px;
  justify-content: flex-start;
`
const UserLayout = styled.div`
  display:flex;
  flex-direction : column;
  justify-content: flex-start;
  margin-top:30px;
`
const UserLine = styled.div`
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #ededed;
  height       : 50px;
  align-items  : center;

`

const Badusercontainer = ({containerStyle,STORE_ID}) => {
  const navigation = useNavigate();

  const [refresh, setRefresh] = useState(1);
  const [users, setusers] = useState([]);

  const { user, dispatch2 } = useContext(UserContext);

   useEffect(()=>{
    async function FetchData(){

      const baduserlist = await get_badalluser({STORE_ID});

      let userlist = [];
      baduserlist.map(async (data, index) => {
        const USER_ID = data.USER_ID;
        const userinfo = await get_userInfoForUID({ USER_ID });
        userinfo["STORE_ID"] = data.STORE_ID;
        userinfo["BADUSER_ID"] = data.BADUSER_ID;
        userlist.push(userinfo);
      })

      await useSleep(500);
      setusers(userlist);

		}
		FetchData();
  }, [])


  const _handleuserchange = async(BADUSER_ID) => {
    
    const deletebaduser = await delete_baduser({ BADUSER_ID });

   async function FetchData(){

      const baduserlist = await get_badalluser({STORE_ID});

      let userlist = [];
      baduserlist.map(async (data, index) => {
        const USER_ID = data.USER_ID;
        const userinfo = await get_userInfoForUID({ USER_ID });
        userlist.push(userinfo);
      })

      await useSleep(500);
      setusers(userlist);
    }
    FetchData();
  
  }

  useEffect(() => {

  },[refresh])

  return (
    <Container style={containerStyle}>
      
        <UserLayout>
          {
            users.map((item, index) => (
              <UserLine>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <div>
                  <img src={item.USER_IMAGE} width={30} height={30}/>
                  </div>
                  <div style={{fontSize:14, paddingLeft:20}}>
                    {item.USER_NICKNAME}
                  </div>
                </div>
                <div>
                  <div onClick={() => { _handleuserchange(item.BADUSER_ID) }} style={{
                    background:"#ff4e19",
                    display: "flex",
                    justifyContent: "center",
                    alignItems:"center",
                    color: "#fff",
                    width: "100px",
                    height: "30px",
                    borderRadius:"10px",
                    fontSize: "12px"
              }}>부정사용자 해제</div>
                </div>
             
         
              </UserLine>
            ))
          }
        </UserLayout>

    </Container>
  );
}

export default Badusercontainer;
