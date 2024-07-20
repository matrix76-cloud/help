
import React,{useState, useEffect, useLayoutEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

import { imageDB } from '../utility/imageData';
import { UserContext } from '../context/User';
import { get_storeinfoForLng, get_stores } from '../service/StoreService';
import { CommaFormatted, distanceFunc } from '../utility/common';
import Text from '../common/Text';


const Container = styled.div`

  display:flex;
  justify-content:center;

`

const RefreshLayout = styled.div`
  position: absolute;
  bottom: 90px;
  z-index: 10;
  height: 40px;
  width: 150px;
  display: flex;
  justify-content:center;
  align-items: center;
  background: #353535;
  margin-top: 10px;
  border-radius: 20px;
  font-size: 14px;
  flex-direction:column;
`;
const { kakao } = window;
const Roommapcontainer = ({containerStyle}) => {
  const{user, dispatch2} = useContext(UserContext);

  const [bannerimgs, setBannerimgs] = useState([]);
  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState("37.631553553801");
  const [longitude, setLongitude] = useState("127.05159777991");

  const [currentaddr, setCurrentaddr] = useState('');
  const [currentaddr2, setCurrentaddr2] = useState('');
  const [storeitem, setStoreitem] = useState({});
  const [storestatus, setStorestatus] = useState(false);

  const [storeitems,setStoreitems] = useState([]);

  const [mapview, setMapView] = useState(true);

  const [refresh, setRefresh] = useState(1);


  const navigate = useNavigate();


  function searchAddrFromCoords2(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    var geocoder = new kakao.maps.services.Geocoder();
    
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);            
  }

  function getTexts( count ) {

    // 한 클러스터 객체가 포함하는 마커의 개수에 따라 다른 텍스트 값을 표시합니다 
    if(count < 10) {
      return count;        
    } else if(count < 30) {
      return count;
    } else if(count < 50) {
      return count;
    } else {
      return count;
    }
  }
  const infostart = async(latitude, longitude) =>{
    navigate("/hong");
  }

  useEffect(()=>{



    let items = [];

    items.push({STOREIMAGEARY : [imageDB.loadbox1], STORENAME : "" });

    setStoreitems(items);

    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: user.maplevel,
    };
  
    const map = new kakao.maps.Map(container, options);
    setMap(map);

    var clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: false, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 13,// 클러스터 할 최소 지도 레벨 ,
      calculator: [10, 30, 50], // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
      texts: getTexts, // texts는 ['삐약', '꼬꼬', '꼬끼오', '치멘'] 이렇게 배열로도 설정할 수 있다 
      styles: [{ // calculator 각 사이 값 마다 적용될 스타일을 지정한다
              width : '60px', height : '60px',
              background: '#1974ff8a',
              borderRadius: '40px',
              color: '#000',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '61px'
          },
          {
              width : '60px', height : '60px',
              background: '#1974ff8a',
              borderRadius: '50px',
              color: '#000',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '61px'
          },
          {
              width : '60px', height : '60px',
              background: '#1974ff8a',
              borderRadius: '60px',
              color: '#000',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '61px'
          },
          {
              width : '70px', height : '70px',
              background: '#1974ff8a',
              borderRadius: '70px',
              color: '#000',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '71px'
          }
      ]
   
    });


    searchAddrFromCoords2(new kakao.maps.LatLng(latitude, longitude), function(result, status) {
      if (status === kakao.maps.services.Status.OK) {

          console.log("addr1", result[0].address.address_name);

          setCurrentaddr(result[0].address.address_name);

      }   
     });



    function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
    function makeOutListener(infowindow) {
        return function() {
            infowindow.close();
        };
    }


    async function fetchData(){
      //const storeitemsTmp = await get_stores();

      let storeitemsTmp = [];

      storeitemsTmp.push({STORELATITUDE : "37.631113153801", STORELONGITUDE:"127.05115777991" })
      storeitemsTmp.push({STORELATITUDE : "37.631223253801", STORELONGITUDE:"127.05126777991" })
      storeitemsTmp.push({STORELATITUDE : "37.630733353801", STORELONGITUDE:"127.05137777991" })
      storeitemsTmp.push({STORELATITUDE : "37.631443453801", STORELONGITUDE:"127.05148777991" })
      storeitemsTmp.push({STORELATITUDE : "37.631553553801", STORELONGITUDE:"127.05159777991" })
      storeitemsTmp.push({STORELATITUDE : "37.630963653801", STORELONGITUDE:"127.05161777991" })
      storeitemsTmp.push({STORELATITUDE : "37.631773753801", STORELONGITUDE:"127.05172777991" })
      storeitemsTmp.push({STORELATITUDE : "37.631483853801", STORELONGITUDE:"127.05183777991" })
      storeitemsTmp.push({STORELATITUDE : "37.631293953801", STORELONGITUDE:"127.05194777991" })
      storeitemsTmp.push({STORELATITUDE : "37.6310103053801", STORELONGITUDE:"127.05045777991" })


      let location = [[],];

      storeitemsTmp.forEach((element)=>{

        const lat1  = latitude;
        const lon1 = longitude;
        const lat2  = element.STORELATITUDE;
        const lon2 = element.STORELONGITUDE;
    
        const dist= distanceFunc(lat1, lon1, lat2, lon2);

        
          let locationitem = [];
          locationitem.push(element.STORELATITUDE);
          locationitem.push(element.STORELONGITUDE);
     
          location.push(locationitem);
      
      })
  

      var imageSrc = imageDB.loadbox1;


      location.map((e) => {
     
          // 커스텀 오버레이가 표시될 위치입니다 
        var position = new kakao.maps.LatLng(e[0], e[1]);  

         // 마커 이미지의 이미지 크기 입니다
          var imageSize = new kakao.maps.Size(0.5, 0.5); 
          
          // 마커 이미지를 생성합니다    
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

  
   
          var infocontent = '<div class="customoverlay">' +
          '<div class="main">' +
          '    <div class="title">'+e[2]+'</div>' +
          // '    <img src='+e[4]+' class="image"/>'+
          '</div>'+
          '    <span class="price">'+CommaFormatted(e[3])+'원' +           
          '</div>';

          var marker = new kakao.maps.Marker({
            position: position,
            image : markerImage,
            clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            });

          var infowindow = new kakao.maps.InfoWindow({
              content: infocontent,
          });



         marker.setMap(map);

         kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
         kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
       
         kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
          // 클릭한 위도, 경도 정보를 가져옵니다 
 
          user["curlatitude"] = mouseEvent.latLng.getLat();
          user["curlongitude"] = mouseEvent.latLng.getLng();
          user["maplevel"]  = map.getLevel();
   
          dispatch2(user);

    
 
           searchAddrFromCoords2(mouseEvent.latLng, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                setCurrentaddr(result[0].address.address_name);
            }   
           });

          });


    
        kakao.maps.event.addListener(marker, 'click', function() {
          // 마커 위에 인포윈도우를 표시합니다
      

          searchAddrFromCoords2(marker.getPosition(), function(result, status) {
            if (status === kakao.maps.services.Status.OK) {

                console.log("addr1", result[0].address.address_name);

                setCurrentaddr(result[0].address.address_name);

            }   
           });


          infostart(marker.getPosition().Ma,marker.getPosition().La);
      
          setLatitude(marker.getPosition().La);
          setLongitude(marker.getPosition().Ma);

          user["curlatitude"] = marker.getPosition().La;
          user["curlongitude"] = marker.getPosition().Ma;
          user["maplevel"]  = map.getLevel();
          dispatch2(user);



        });


  

      });




      var clustermarkers = location.map((e)=>{

        console.log("position", e[0]);

        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(30, 30); 

        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

        var marker =  new kakao.maps.Marker({
            position : new kakao.maps.LatLng(e[0], e[1]),
            image : markerImage,
            clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });

            
        kakao.maps.event.addListener(marker, 'click', function() {
          // 마커 위에 인포윈도우를 표시합니다
      

          searchAddrFromCoords2(marker.getPosition(), function(result, status) {
            if (status === kakao.maps.services.Status.OK) {

                console.log("addr1", result[0].address.address_name);

                setCurrentaddr(result[0].address.address_name);

            }   
           });


          infostart(marker.getPosition().Ma,marker.getPosition().La);
      
          setLatitude(marker.getPosition().La);
          setLongitude(marker.getPosition().Ma);

        });

        marker.setMap(map);


        return marker;

      });

      console.log("clustermarkers",clustermarkers);

      clusterer.addMarkers(clustermarkers);


  

		}
		fetchData();
  }, [])



  useLayoutEffect(() => {
  


    
  }, []);

  useEffect(()=>{

    setMapView(mapview);

  },[refresh])

  const handleswitch = () =>{

    navigate("/room");
  
  }


  return (
    <Container style={containerStyle}>
   


  
         <div id="map" className="Map"></div>
        
  
        <RefreshLayout onClick={handleswitch} >
          <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        
            <div>
            <Text value={'리스트로보기'} color={'#fff'} ></Text>
            </div>
          </div>
      </RefreshLayout>


    </Container>
  );
}

export default Roommapcontainer;
