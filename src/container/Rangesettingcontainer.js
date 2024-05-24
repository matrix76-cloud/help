import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { UserContext } from "../context/User";
import { MaroneContent } from "../utility/maroneDefine";
import GuideLabel from "../components/GuildeLable";
import Switch from "../common/Switch";
import Button from "../common/Button";
import { get_userInfoForUID, update_userdistance } from "../service/UserService";
import { getStoreData, getStoreDB } from "../utility/common";

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
  width: 70%;
  padding-left: 15px;
`
const ConfigView = styled.div`
    display :flex;
    background-color :#fff;
    flex-direction : row;
    align-items :center;
    height :30px;
    width:30%;
    padding-right:15px;
`
const LabelText= styled.span`
    font-size :14px;
    font-family : ${({theme}) =>theme.REGULAR};
`

const HightLight = styled.span`
  color : #ff0000;
  font-weight : 700;
`






const Rangesettingcontainer  = ({containerStyle})=>{

  
    const {user, dispatch2} = useContext(UserContext);
    const [distance, setDistance] = useState(0);
    const [switchcheck1, setSwitchcheck1] = useState(false);
    const [switchcheck2, setSwitchcheck2] = useState(false);
    const [switchcheck3, setSwitchcheck3] = useState(false);
    const [switchcheck4, setSwitchcheck4] = useState(false);
    const [switchcheck5, setSwitchcheck5] = useState(false);
    const [switchcheck6, setSwitchcheck6] = useState(false);
    const [refresh, setRefresh] = useState(1);


    const [load, setLoad] = useState(false);


    const Switchcallback1 =(data)=>{

      setLoad(true);
      console.log("data", switchcheck1);
  
      if(data == true){
        setSwitchcheck1(false);
        setSwitchcheck2(true);
        setSwitchcheck3(true);
        setSwitchcheck4(true);
        setSwitchcheck5(true);
        setSwitchcheck6(true);
      }else{
        setSwitchcheck1(true);
 
      }
      
      setRefresh(refresh=>refresh + 1);
    }
    const Switchcallback2 =(data)=>{
      setLoad(true);
      console.log("data", switchcheck1);
      if(data == true){
        setSwitchcheck1(true);
        setSwitchcheck2(false);
        setSwitchcheck3(true);
        setSwitchcheck4(true);
        setSwitchcheck5(true);
        setSwitchcheck6(true);
      }else{
        setSwitchcheck2(true);
 
      }
      setRefresh(refresh=>refresh + 1);
    }
    const Switchcallback3 =(data)=>{
      setLoad(true);
      console.log("data", switchcheck1);
      if(data == true){
        setSwitchcheck1(true);
        setSwitchcheck2(true);
        setSwitchcheck3(false);
        setSwitchcheck4(true);
        setSwitchcheck5(true);
        setSwitchcheck6(true);
      }else{
        setSwitchcheck3(true);
 
      }
      setRefresh(refresh=>refresh + 1);
    }
    const Switchcallback4 =(data)=>{
      setLoad(true);
      console.log("data", switchcheck1);
      if(data == true){
        setSwitchcheck1(true);
        setSwitchcheck2(true);
        setSwitchcheck3(true);
        setSwitchcheck4(false);
        setSwitchcheck5(true);
        setSwitchcheck6(true);
      }else{
        setSwitchcheck4(true);
 
      }
      setRefresh(refresh=>refresh + 1);
    }
    const Switchcallback5 =(data)=>{
      setLoad(true);
      console.log("data", switchcheck1);
      if(data == true){
        setSwitchcheck1(true);
        setSwitchcheck2(true);
        setSwitchcheck3(true);
        setSwitchcheck4(true);
        setSwitchcheck5(false);
        setSwitchcheck6(true);
      }else{
        setSwitchcheck5(true);
 
      }
      setRefresh(refresh=>refresh + 1);
    }
    const Switchcallback6 =(data)=>{
      setLoad(true);
      console.log("data", switchcheck1);
      if(data == true){
        setSwitchcheck1(true);
        setSwitchcheck2(true);
        setSwitchcheck3(true);
        setSwitchcheck4(true);
        setSwitchcheck5(true);
        setSwitchcheck6(false);
      }else{
        setSwitchcheck6(true);
 
      }
      setRefresh(refresh=>refresh + 1);
    }

    useEffect(()=>{
      setSwitchcheck1(switchcheck1);
      setSwitchcheck2(switchcheck2);
      setSwitchcheck3(switchcheck3);
      setSwitchcheck4(switchcheck4);
      setSwitchcheck5(switchcheck5);
      setSwitchcheck6(switchcheck6);

      setLoad(false);
    }, [refresh]);


    useEffect(()=>{

      async function fetchData(){
        const USER_ID = user.uid;
        const useritem = await get_userInfoForUID({USER_ID});

        console.log("useritem", useritem);
        user['distance'] = useritem.DISTANCE;
        dispatch2(user);

        setLoad(true);
        if(useritem.DISTANCE == 5){
          setSwitchcheck1(false);
          setSwitchcheck2(true);
          setSwitchcheck3(true);
          setSwitchcheck4(true);
          setSwitchcheck5(true);
          setSwitchcheck6(true);
        }else if(useritem.DISTANCE ==10){
          setSwitchcheck1(true);
          setSwitchcheck2(false);
          setSwitchcheck3(true);
          setSwitchcheck4(true);
          setSwitchcheck5(true);
          setSwitchcheck6(true);
        }else if(useritem.DISTANCE ==15){
          setSwitchcheck1(true);
          setSwitchcheck2(true);
          setSwitchcheck3(false);
          setSwitchcheck4(true);
          setSwitchcheck5(true);
          setSwitchcheck6(true); 
        }else if(useritem.DISTANCE ==20){

          console.log("20.........................")
          setSwitchcheck1(true);
          setSwitchcheck2(true);
          setSwitchcheck3(true);
          setSwitchcheck4(false);
          setSwitchcheck5(true);
          setSwitchcheck6(true); 
        }else if(useritem.DISTANCE ==30){
          setSwitchcheck1(true);
          setSwitchcheck2(true);
          setSwitchcheck3(true);
          setSwitchcheck4(true);
          setSwitchcheck5(false);
          setSwitchcheck6(true); 
        }else if(useritem.DISTANCE ==50){
          setSwitchcheck1(true);
          setSwitchcheck2(true);
          setSwitchcheck3(true);
          setSwitchcheck4(true);
          setSwitchcheck5(true);
          setSwitchcheck6(false); 
        }

        setRefresh(refresh => refresh +1);

     


      };
      fetchData();
    }, [])

    const _handlerangesave = async() =>{
      console.log("switchcheck", switchcheck1, switchcheck2, switchcheck3, switchcheck4, switchcheck5, switchcheck6)

      if(switchcheck1 == true &&
        switchcheck2 == true &&
        switchcheck3 == true &&
        switchcheck4 == true &&
        switchcheck5 == true &&
        switchcheck6 == true){
          alert("설정이 되지 않아 저장할수가 없습니다");
          
        }
      if(switchcheck1 == false){
        user['distance'] = 5;
        dispatch2(user);
      }else if(switchcheck2 == false){
        user['distance'] = 10;
        dispatch2(user);
      }else if(switchcheck3 == false){
        user['distance'] = 15;
        dispatch2(user);
      }else if(switchcheck4 == false){
        user['distance'] = 20;
        dispatch2(user);
      }else if(switchcheck5 == false){
        user['distance'] = 30;
        dispatch2(user);
      }else if(switchcheck6 == false){
        user['distance'] = 50;
        dispatch2(user);
      }
      
      const USERID = user.uid;
      const DISTANCE = user.distance;

      console.log("user distance", USERID,DISTANCE);

      const  update = update_userdistance({USERID, DISTANCE});

      const latitude = user.latitude;
      const longitude = user.longitude;

      getStoreData({ user,latitude,longitude }).then((userData)=>{
        dispatch2(userData);

        alert("저장되었습니다");

      });






      
    }


    return(
      <Container style={containerStyle}>
          <GuideLabel
            containerStyle={{marginTop:50}}
            height={120}
            LabelText={'지역범위 설정'} SubLabelText={MaroneContent.range}/>

               <>   
               <View>
                  <LabelView><LabelText>주변 <HightLight>5KM</HightLight>범위내 마사지샵 찾기</LabelText></LabelView>
                  <ConfigView>
                    {
                      load ==false && <Switch
                      checkstatus={switchcheck1} button1={'해제'}   button2={'설정'} Switchcallback={Switchcallback1}
                      containerStyle={{display: "flex",justifyContent: "flex-start"}} 
                      />
                    }
               
                  </ConfigView>
              </View>

              <View>
                  <LabelView><LabelText>주변 <HightLight>10KM</HightLight>범위내 마사지샵 찾기</LabelText></LabelView>
                  <ConfigView>
                    {
                      load ==false &&   <Switch
                      checkstatus={switchcheck2}  button1={'해제'}  button2={'설정'} Switchcallback={Switchcallback2}
                      containerStyle={{display: "flex",justifyContent: "flex-start"}} 
                      />
                    }
                
                  </ConfigView>
              </View>

              <View>
                  <LabelView><LabelText>주변 <HightLight>15KM</HightLight> 범위내 마사지샵 찾기</LabelText></LabelView>
                  <ConfigView>
                  {
                      load ==false &&     <Switch
                      checkstatus={switchcheck3}  button1={'해제'}  button2={'설정'} Switchcallback={Switchcallback3}
                      containerStyle={{display: "flex",justifyContent: "flex-start"}} 
                      />
                  }
              
                  </ConfigView>
              </View>
              <View>
                  <LabelView><LabelText>주변 <HightLight>20KM</HightLight> 범위내 마사지샵 찾기</LabelText></LabelView>
                  <ConfigView>
                    {
                      load ==false && 
                      <Switch
                      checkstatus={switchcheck4}  button1={'해제'}  button2={'설정'} Switchcallback={Switchcallback4}
                      containerStyle={{display: "flex",justifyContent: "flex-start"}} 
                      />
                    }
               
                  </ConfigView>
              </View>

              <View>
                  <LabelView><LabelText>주변 <HightLight>30KM</HightLight> 범위내 마사지샵 찾기</LabelText></LabelView>
                  <ConfigView>
                    {
                      load ==false &&    <Switch
                      checkstatus={switchcheck5}  button1={'해제'}  button2={'설정'} Switchcallback={Switchcallback5}
                      containerStyle={{display: "flex",justifyContent: "flex-start"}} 
                      />
                    }
               
                  </ConfigView>
              </View>

              <View>
                  <LabelView><LabelText>주변 <HightLight>50KM</HightLight> 범위내 마사지샵 찾기</LabelText></LabelView>
                  <ConfigView>
                    {
                      load ==false &&   <Switch
                      checkstatus={switchcheck6}  button1={'해제'}  button2={'설정'} Switchcallback={Switchcallback6}
                      containerStyle={{display: "flex",justifyContent: "flex-start"}} 
                      />
                    }
                
                  </ConfigView>
              </View>
              </>
          
             
                <div style={{display:"flex", justifyContent:"center"}}>
                  <Button buttonText ={'저장'} callback={_handlerangesave} containerStyle={{backgroundColor : "#FF5826",
                      color :'#fff',margin:'10px', width:"85%", height:40, borderRadius:10}}/>
                </div>

      </Container>
    );
}



Rangesettingcontainer.propTypes = {
    containerStyle : PropTypes.object,
}



export default Rangesettingcontainer;
