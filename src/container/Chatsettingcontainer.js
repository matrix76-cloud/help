import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { UserContext } from "../context/User";
import { MaroneContent } from "../utility/maroneDefine";
import GuideLabel from "../components/GuildeLable";
import Switch from "../common/Switch";
import Button from "../common/Button";
import { get_storeinfoForSTOREID, updatechatsettingstore, updategroupchatsettingstore } from "../service/StoreService";
import { setRef } from "@mui/material";
import { getStoreData, useSleep } from "../utility/common";
import Loading from "../common/Loading";

const TRANSPARENT = 'transparent';

const Container = styled.div`

`
const View= styled.div`
  display :flex;
  flex-direction : row;
  margin-bottom :10px;
  padding :10px
`
const LabelView = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40%;
  padding-left: 15px;
`
const ConfigView = styled.div`
    display :flex;
    background-color :#fff;
    flex-direction : row;
    align-items :center;
    height :30px;
    width:60%;
    justify-content: space-evenly;
`
const LabelText= styled.span`
    font-size :14px;
    font-family : ${({theme}) =>theme.REGULAR};
`






const Chatsettingcontainer  = ({containerStyle, STORE_ID})=>{

  
    const {user, dispatch2} = useContext(UserContext);
    const [distance, setDistance] = useState(0);
    const [groupchat, setGroupchat] = useState(false);
    const [chat, setChat] = useState(false);
    const [storedata, setStoredata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(1);


    useEffect(() => {
      async function FetchData() {

        const shopdata = await get_storeinfoForSTOREID({ STORE_ID });
        setStoredata(shopdata);


        console.log("shopdata",shopdata  );

        
        if (shopdata.STOREGROUPCHAT == undefined || shopdata.STOREGROUPCHAT == false) {
          setGroupchat(false);
      
        }else {
          setGroupchat(true);
        }

        if (shopdata.STORECHAT == undefined || shopdata.STORECHAT == false) {
          setChat(false);
        }else {
          setChat(true);
        }

  
        setRefresh(refresh => refresh + 1);
      }
      FetchData();
        
      },[])
  
  





    useEffect(()=>{
      
      setChat(chat);
      setGroupchat(groupchat);

      const latitude = user.latitude;
      const longitude = user.longitude;

      getStoreData({ user,latitude,longitude }).then((userData)=>{
        dispatch2(userData);


      });

    }, [refresh]);

    const _handlechatenable = async() =>{
      const STORE_ID = storedata.STORE_ID;
      const STORECHAT = true;
      const updatechat = await updatechatsettingstore({STORE_ID, STORECHAT})
  

      const latitude = user.latitude;
      const longitude = user.longitude;
      getStoreData({ user,latitude,longitude }).then((userData)=>{
        dispatch2(userData);

        setChat(true);
        setRefresh(refresh => refresh + 1);
        alert("설정변경 하였습니다");
      });


    }
    const _handlechatdisable = async() =>{
      const STORE_ID = storedata.STORE_ID;
      const STORECHAT = false;
      const updatechat = await updatechatsettingstore({STORE_ID, STORECHAT})


      const latitude = user.latitude;
      const longitude = user.longitude;
      getStoreData({ user,latitude,longitude }).then((userData)=>{
        dispatch2(userData);

        setChat(false);
        setRefresh(refresh => refresh + 1);
        alert("설정변경 하였습니다");

      });

    }  

  const _handlegroupchatenable = async() =>{
    const STORE_ID = storedata.STORE_ID;
    const STOREGROUPCHAT = true;
    const updatechat = await updategroupchatsettingstore({STORE_ID, STOREGROUPCHAT})



    const latitude = user.latitude;
    const longitude = user.longitude;
    getStoreData({ user,latitude,longitude }).then((userData)=>{
      dispatch2(userData);
      setGroupchat(true);
      setRefresh(refresh => refresh + 1);

      alert("설정변경 하였습니다");
    });

  }
  const _handlegroupchatdisable = async() =>{
    const STORE_ID = storedata.STORE_ID;
    const STOREGROUPCHAT = false;
    const updatechat = await updategroupchatsettingstore({STORE_ID, STOREGROUPCHAT})


    const latitude = user.latitude;
    const longitude = user.longitude;
    getStoreData({ user,latitude,longitude }).then((userData)=>{
      dispatch2(userData);
      setGroupchat(false);
      setRefresh(refresh => refresh + 1);
      alert("설정변경 하였습니다");

    });
  }  

  return (
      
    <Container style={containerStyle}>
      {
        loading == true ? (<Loading containerStyle={{ marginTop: 300 }} />) : (<>
         <GuideLabel
            containerStyle={{marginTop:50}}
            height={120}
            LabelText={'대화방 설정'} SubLabelText={MaroneContent.range}/>

                <View>
                    <LabelView><LabelText>그룹채팅 활성화</LabelText></LabelView>
                    <ConfigView>
              
                    {groupchat == true ?   <Button
                      buttonText={"활성화"}
                      callback={_handlegroupchatdisable}
                      containerStyle={{
                      backgroundColor: "#FF4E19",
                      borderRadius: "10px",
                      fontSize: 14,
                      color: "#fff",
                      border: "1px solid #FF4E19",
                      margin: " 5px 0px",
                      width: "80%",
                      height: "30px",
                      }}
                      /> :    <Button
                      buttonText={"비활성화"}
                      callback={_handlegroupchatenable}
                      containerStyle={{
                        backgroundColor: "#909090",
                        borderRadius: "10px",
                        fontSize: 14,
                        color: "#fff",
                        margin: " 5px 0px",
                        width: "80%",
                        height: "30px",
                      }}
                      /> }
                    

                  
                    </ConfigView>
                </View>

                <View>
                    <LabelView><LabelText>일대일채팅 활성화</LabelText></LabelView>
                    <ConfigView>
          
                    {chat == true ?   <Button
                      buttonText={"활성화"}
                      callback={_handlechatdisable}
                      containerStyle={{
                      backgroundColor: "#FF4E19",
                      borderRadius: "10px",
                      fontSize: 14,
                      color: "#fff",
                      border: "1px solid #FF4E19",
                      margin: " 5px 0px",
                      width: "80%",
                      height: "30px",
                      }}
                      /> :    <Button
                      buttonText={"비활성화"}
                      callback={_handlechatenable}
                      containerStyle={{
                        backgroundColor: "#909090",
                        borderRadius: "10px",
                        fontSize: 14,
                        color: "#fff",
                        margin: " 5px 0px",
                        width: "80%",
                        height: "30px",
                      }}
                      /> }
                    </ConfigView>
                </View>

            
         </>)
      }
      

      </Container>
    );
}



Chatsettingcontainer.propTypes = {
    containerStyle : PropTypes.object,
}



export default Chatsettingcontainer;
