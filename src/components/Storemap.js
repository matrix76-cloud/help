import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Loading from '../common/Loading';

import { FaExpand } from "react-icons/fa";
import { theme } from '../theme/theme';
import Button from '../common/Button';
import "../container/StoreMap.css"
import { SearchAddress } from '../utility/common';

import { UserContext } from '../context/User';
import Text from '../common/Text';
const { kakao } = window;
const Container = styled.div`

`

const CurrentpositionLayout = styled.div`
  position: absolute;
  top: 300px;
  left: 5%;
  z-index: 10;
  background: white;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
`

const Storemap = ({containerStyle, latitude, longitude}) => {

  const [load, setLoad] = useState(false);

  const [currentpositionstatus, setCurrentpositionstatus] = useState(false);

  const [lat, setLat] = useState(latitude);
  const [long, setLong] = useState(longitude);
  const [refresh, setRefresh] = useState(1);

  const {user, dispatch2} = useContext(UserContext);

  const navigate = useNavigate();
   useEffect(()=>{
   const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 3,
    };
  
    const map = new kakao.maps.Map(container, options);

    kakao.maps.event.addListener(map, 'center_changed', function() {

      // 지도의  레벨을 얻어옵니다
      var level = map.getLevel();
      // 지도의 중심좌표를 얻어옵니다 
      var latlng = map.getCenter(); 

   
  
      setLat(latlng.getLat());
      setLong(latlng.getLng());
    });
    

  }, [])

  const loading = () =>{
    setLoad(true);
  }
  const currentpositioncallback = (type) =>{
    setCurrentpositionstatus(false);
    setRefresh(refresh => refresh +1);

    if(type== "save"){
      
      const x = long;
      const y = lat;
      // 팝업이 저장되면 userContext에 저장 하고 login 데이타 베이스에도 저장 한다음
      SearchAddress(x,y).then((regionresult)=>{

        user['region1'] = regionresult.region1;
        user['region2'] = regionresult.region2;
        user['latitude'] = lat;
        user['longitude'] = long;

        navigate("/home", { state: { homerefresh: false } });
    });

    
    }

  
  }

  const _handleSearch = async() =>{
      // 위도 경도를 가지고 검색으로 이동 한다
      const x = long;
      const y = lat;
  
      SearchAddress(x,y).then((regionresult)=>{
        navigate("/myregion",{state:{region1:regionresult.region1, region2:regionresult.region2}});
    });
  }
  const _handleMyposition = async() =>{
      // 내위치 의 위도 경도를 설정 저장 할지  : 팝업을 물어봅니다
      setCurrentpositionstatus(true);
      setRefresh(refresh => refresh +1);
     
  }

  useEffect(()=>{
    setCurrentpositionstatus(currentpositionstatus);
  },[refresh])

  const handleClose = () =>{
    setCurrentpositionstatus(false);
  } 

  const _handlecurrentpos = ()=>{
    setCurrentpositionstatus(false);
    setRefresh(refresh => refresh +1);

    const x = long;
    const y = lat;
    // 팝업이 저장되면 userContext에 저장 하고 login 데이타 베이스에도 저장 한다음
    SearchAddress(x,y).then((regionresult)=>{

      user['region1'] = regionresult.region1;
      user['region2'] = regionresult.region2;
      user['latitude'] = lat;
      user['longitude'] = long;

      navigate("/home", { state: { homerefresh: false } });
  });
  }

  return (
    <Container style={containerStyle}>
       
        <div id="map" className='StoreMap'></div>

        {
          currentpositionstatus == true ?
          (
            <CurrentpositionLayout>
            {/* <CurrentpositionchangeModalEx callback={currentpositioncallback}/> */}
            <div style={{display:"flex", flexDirection:"column"}}>
            <Text value={'현재위치로 저장 하려면 버튼을 클릭해주세요'} containerStyle={{textAlign:"Left", fontWeight:400, marginTop:5}}/>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:20}}>

              <Button buttonText ={'취소'} callback={handleClose} containerStyle={{backgroundColor: "#706e6e", fontWeight:700,
                  color: "#fff",margin:'10px', width:"80px",borderRadius:5, height:40,justifyContent: "center", alignItems:"center"}}/>
                  

              <Button buttonText ={'위치저장'} callback={_handlecurrentpos} containerStyle={{backgroundColor: "#FF4E19", fontWeight:700,
                  color: "#fff",margin:'10px', width:"80px",borderRadius:5, height:40,justifyContent: "center", alignItems:"center"}}/>
                      
              </div>
            </div>
            </CurrentpositionLayout>
          )
          : (null)
        }

        <div style={{position: "absolute",top: "300px", left: "150px", zIndex:5}}>
          <FaExpand size={20} color ={'#FF4E19'} />
        </div>

        <div style={{position: "absolute",top: "540px",width:"100%", zIndex:5 }}>
          <Button callback={_handleMyposition}  buttonText ={'내위치로 저장'} containerStyle={{backgroundColor : "#FF4E19",
          color :'#fff', border :'1px solid #FF4E19',margin:' 10px 5%', width:"90%"}}/>
        </div>

        <div style={{position: "absolute",top: "590px",width:"100%", zIndex:5}}>
        <Button callback={_handleSearch}  buttonText ={'해당위치로 검색'} containerStyle={{backgroundColor : "#FFF",
          color :'#000', border :'1px solid #ededed',margin:' 10px 5%', width:"90%"}}/>
        </div>
     
      {
        load == false && <Loading  containerStyle={{marginTop:"30%"}}/>
      }
        
    </Container>
  );
}

export default Storemap;
