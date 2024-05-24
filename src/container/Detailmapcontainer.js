
import React,{useState, useEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/User';
import { get_reviewForUser } from '../service/ReviewService';
import { get_heartstore, get_heartstores, get_storeinfoForLng, get_stores } from '../service/StoreService';
import Label from '../common/Label';
import { ArrayIncludeData, CommaFormatted, distanceFunc, useSleep } from '../utility/common';
import Premiumshop from '../components/Premiumshop__';
import Goldshop from '../components/Goldshop';
import Silvershop from '../components/Silvershop';
import './Map.css';
import { imageDB } from '../utility/imageData';
import ThemaModalEx from '../components/ThemaModalEx';
import ErrorModalEx from '../components/ErrorModalEx';
import StoreModalEx from '../components/StoreModalEx';
import Mapshop from '../components/Mapshop';
import { FiRotateCcw } from "react-icons/fi";
import Text from '../common/Text';
import Loading from '../common/Loading';


const Container = styled.div`
  margin-top:60px;
`
const { kakao } = window;

const CurrentLayout = styled.div`
  position: absolute;
  top: 300px;
  left: 5%;
  z-index: 10;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
`
const RefreshLayout = styled.div`
  position: absolute;
  top: 70px;
  z-index: 10;
  height: 30px;
  width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  left: 30%;
  background: #ff4e19;
  margin-top: 10px;
  border-radius: 20px;
  font-size: 14px;
`;

const Detailmapcontainer = ({containerStyle}) => {

  const{user, dispath2} = useContext(UserContext);
  const [map, setMap] = useState({});

  const [latitude, setLatitude] = useState(user.latitude);
  const [longitude, setLongitude] = useState(user.longitude);
  const [storeitem, setStoreitem] = useState({});
  const [storestatus, setStorestatus] = useState(false);
  const [storelatitude, setStoreLatitude] = useState('');
  const [storelongitude, setStoreLongitude] = useState('');

  const [loading, setLoading] = useState(false);

  const infostart = async(latitude, longitude) =>{

    const store = await get_storeinfoForLng({latitude, longitude});

    if(store != null)
    {
      setStoreitem(store);

      setStorestatus(true);
    }

  }
  const navigate = useNavigate();

  useEffect(()=>{

    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
  
    const map = new kakao.maps.Map(container, options);

    setMap(map);

    async function fetchData(){
      const storeitemsTmp = await get_stores();

      let location = [[],];

      storeitemsTmp.forEach((element)=>{

        const lat1  = latitude;
        const lon1 = longitude;
        const lat2  = element.STORELATITUDE;
        const lon2 = element.STORELONGITUDE;
    
        const dist= distanceFunc(lat1, lon1, lat2, lon2);

        
          
        let policydistance = 0;

        if(user.distance == ''){
          policydistance = 10;
        }else{
          policydistance = user.distance;
        }



        if(dist < policydistance){
          let locationitem = [];
          locationitem.push(element.STORELATITUDE);
          locationitem.push(element.STORELONGITUDE);
          locationitem.push(element.STORENAME);
          locationitem.push(element.STOREREPRESENTIVEPRICE);
          locationitem.push(element.STOREIMAGEARY[0])
          location.push(locationitem);
        }

      

      })
  

  
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

      location.map((e) => {
          // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          var content = '<div class="customoverlay">' +
              '<div class="main">' +
              '    <div class="title">'+e[2]+'</div>' +
              '    <img src='+e[4]+' class="image"/>'+
              '</div>'+
              '    <span class="price">'+CommaFormatted(e[3])+'원&nbsp&nbsp&nbsp/&nbsp&nbsp&nbsp13km</span>' +           
              '</div>';
  
          // 커스텀 오버레이가 표시될 위치입니다 
          var position = new kakao.maps.LatLng(e[0], e[1]);  
  
          // 커스텀 오버레이를 생성합니다
          var customOverlay = new kakao.maps.CustomOverlay({
              map: map,
              position: position,
              content: content,
              yAnchor: 1,
      
          });

          // var imageSize = new kakao.maps.Size(24, 35); 
          // var imageOption = {offset: new kakao.maps.Point(36, 98)}; 
          // // 마커 이미지를 생성합니다    
          // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption); 
          
          // // 마커를 생성합니다
          // var marker = new kakao.maps.Marker({
          //     map: map, // 마커를 표시할 지도
          //     position: position, // 마커를 표시할 위치
          //     image : markerImage, // 마커 이미지 ~
          // });

        //   kakao.maps.event.addListener(marker, 'click', function() {
        //     // 마커 위에 인포윈도우를 표시합니다
        //     console.log("marker position", marker);

        //     // setStoreLatitude(marker.getPosition().Ma);
        //     // setStoreLongitude(marker.getPosition().La);

        // //    infostart(marker.getPosition().Ma,marker.getPosition().La);

        //  });

         kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
          // 클릭한 위도, 경도 정보를 가져옵니다 
          var latlng = mouseEvent.latLng;
          
          var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
          message += '경도는 ' + latlng.getLng() + ' 입니다';
          

          infostart(latlng.getLat(),latlng.getLng());
  
          setLatitude(latlng.getLat());
          setLongitude(latlng.getLng());
          
      });
      

      });

  

		}
		fetchData();
  }, [])


  const storecallback = () =>{
    setStorestatus(false);
  }
  const mapshopclose = ()=>{
    setStorestatus(false);
  }
 
  const _handleMapSearch = (map)=>{

    setLoading(true);
    let location = [[],];


    
    async function FetchData(){
      const storeitemsTmp = await get_stores();



      storeitemsTmp.forEach((element)=>{

        const lat1  = latitude;
        const lon1 = longitude;
        const lat2  = element.STORELATITUDE;
        const lon2 = element.STORELONGITUDE;
    
        const dist = distanceFunc(lat1, lon1, lat2, lon2);

         
        let policydistance = 0;

        if(user.distance == ''){
          policydistance = 10;
        }else{
          policydistance = user.distance;
        }

        if(dist < policydistance){
          let locationitem = [];
          locationitem.push(element.STORELATITUDE);
          locationitem.push(element.STORELONGITUDE);
          locationitem.push(element.STORENAME);
          locationitem.push(element.STOREREPRESENTIVEPRICE);
          locationitem.push(element.STOREIMAGEARY[0])
          location.push(locationitem);
        }

      

      })
  

  
 
      location.map((e) => {
          // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          var content = '<div class="customoverlay">' +
          '<div class="main">' +
          '    <div class="title">'+e[2]+'</div>' +
          '    <img src='+e[4]+' class="image"/>'+
          '</div>'+
          '    <span class="price">'+CommaFormatted(e[3])+'원&nbsp&nbsp&nbsp/&nbsp&nbsp&nbsp13km</span>' +           
          '</div>';
  
          // 커스텀 오버레이가 표시될 위치입니다 
          var position = new kakao.maps.LatLng(e[0], e[1]);  
  
          // 커스텀 오버레이를 생성합니다
          var customOverlay = new kakao.maps.CustomOverlay({
              map: map,
              position: position,
              content: content,
              yAnchor: 1,
      
          });

          // var imageSize = new kakao.maps.Size(24, 35); 
          // var imageOption = {offset: new kakao.maps.Point(36, 98)}; 
          // // 마커 이미지를 생성합니다    
          // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption); 
          
          // // 마커를 생성합니다
          // var marker = new kakao.maps.Marker({
          //     map: map, // 마커를 표시할 지도
          //     position: position, // 마커를 표시할 위치
          //     image : markerImage, // 마커 이미지 ~
          // });

        //   kakao.maps.event.addListener(marker, 'click', function() {
        //     // 마커 위에 인포윈도우를 표시합니다
        //     console.log("marker position", marker);

        //     // setStoreLatitude(marker.getPosition().Ma);
        //     // setStoreLongitude(marker.getPosition().La);

        // //    infostart(marker.getPosition().Ma,marker.getPosition().La);

        //  });

         kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
          // 클릭한 위도, 경도 정보를 가져옵니다 
          var latlng = mouseEvent.latLng;
          
          var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
          message += '경도는 ' + latlng.getLng() + ' 입니다';
          
          console.log("message", message);
          infostart(latlng.getLat(),latlng.getLng());
  
          setLatitude(latlng.getLat());
          setLongitude(latlng.getLng());
          
      });
      

      });

      await useSleep(2000);

      setLoading(false);

		}
		FetchData();


  }

  return (
    <Container style={containerStyle}>
      {
        storestatus== true && 
        <CurrentLayout>
          <Mapshop  simple = {true} shopdata ={storeitem} callback={mapshopclose} />
        </CurrentLayout>
      
      }
      {
        loading == true && <Loading containerStyle={{marginTop:"50%", marginLeft:"20%", zIndex:5, position:"absolute"}}/>
      }
      <RefreshLayout onClick={()=>{_handleMapSearch(map)}}>
      <FiRotateCcw color={'#fff'} />
      <Text value={'지역내 재검색'} color={'#fff'}></Text>
      </RefreshLayout>
      {/* {
        loading == true ? <Loading/> :<div id="map" className="Map"></div>
      } */}

      <div id="map" className="Map"></div>
      

    </Container>
  );
}

export default Detailmapcontainer;
