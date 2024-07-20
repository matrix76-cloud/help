
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
import Fade from "react-reveal/Fade";

const Container = styled.div`
  margin-top:60px;
`
const { kakao } = window;

const CurrentLayout = styled.div`
  position: absolute;
  bottom: 30px;
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
  height: 50px;
  width: 200px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  left: 20%;
  background: #ff4e19;
  margin-top: 10px;
  border-radius: 20px;
  font-size: 14px;
  flex-direction:column;
`;

const RegionLayout = styled.div`
    position: absolute;
    top: 105px;
    z-index: 10;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    background-color: #ffffffc9;
`;


const Detailmapcontainer = ({containerStyle,}) => {

  const{user, dispatch2} = useContext(UserContext);
  const [map, setMap] = useState({});

  const [latitude, setLatitude] = useState(user.curlatitude);
  const [longitude, setLongitude] = useState(user.curlongitude);
  const [storeitem, setStoreitem] = useState({});
  const [storestatus, setStorestatus] = useState(false);
  const [storelatitude, setStoreLatitude] = useState('');
  const [storelongitude, setStoreLongitude] = useState('');

  const [currentaddr, setCurrentaddr] = useState('');
  const [currentaddr2, setCurrentaddr2] = useState('');

  const [loading, setLoading] = useState(false);

  const infostart = async(latitude, longitude) =>{

    setStorestatus(false);

    const store = await get_storeinfoForLng({latitude, longitude});

    if(store != null)
    {
      setStoreitem(store);

      setStorestatus(true);
    }

  }
  const navigate = useNavigate();


  const _handlemapclick = ()=>{
    alert(test);
  }


  function searchAddrFromCoords(coords, callback){
    // 좌표로 행정동 주소 정보를 요청합니다
    var geocoder = new kakao.maps.services.Geocoder();
    
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
  }

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


  useEffect(()=>{

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
      minLevel: 3,// 클러스터 할 최소 지도 레벨 ,
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
      const storeitemsTmp = await get_stores();

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
          locationitem.push(element.STORENAME);
          locationitem.push(element.STOREREPRESENTIVEPRICE);
          locationitem.push(element.STOREIMAGEARY[0])
          location.push(locationitem);
      
      })
  

      var imageSrc = "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fmaron2.png?alt=media&token=98659ed3-1b80-4e11-838e-30f0df66b743";


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
        var imageSize = new kakao.maps.Size(30, 35); 

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


  const storecallback = () =>{
    setStorestatus(false);
  }
  const mapshopclose = ()=>{
    setStorestatus(false);
  }
 
  const _handleMapSearch = async(map)=>{

    setLoading(true);
    setStorestatus(false);

    await useSleep(2000);
    setLoading(false);

  }

  return (
    <Container style={containerStyle}>
      {
        storestatus== true && 

          <CurrentLayout>
            <Fade right delay={100}>
            <Mapshop  simple = {true} shopdata ={storeitem} callback={mapshopclose} />
            </Fade>
      
          </CurrentLayout>
  
      }
      {
        loading == true && <Loading containerStyle={{marginTop:"50%", marginLeft:"20%", zIndex:5, position:"absolute"}}/>
      }
      <RefreshLayout onClick={()=>{_handleMapSearch(map)}} >
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <FiRotateCcw color={'#fff'}  />
          <div style={{paddingLeft:10}}>
          <Text value={'지역내 재검색'} color={'#fff'} ></Text>
          </div>
        </div>
        <div>
          <Text value={currentaddr} color={'#fff'}></Text>
        </div>
      </RefreshLayout>

  

      {/* {
        loading == true ? <Loading/> :<div id="map" className="Map"></div>
      } */}

      <div id="map" className="Map"></div>
      

    </Container>
  );
}

export default Detailmapcontainer;
