
import React,{useState, useEffect, useLayoutEffect, useContext} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

import { imageDB } from '../utility/imageData';
import { UserContext } from '../context/User';
import { get_storeinfoForLng, get_stores } from '../service/StoreService';
import { CommaFormatted, distanceFunc } from '../utility/common';
import Text from '../common/Text';
import { REQUESTTYPE } from '../utility/contentDefine';
import Button from '../common/Button';
import ButtonEx from '../common/ButtonEx';


const Container = styled.div`

  display:flex;
  justify-content:center;

`

const RefreshLayout = styled.div`
  position: absolute;
  top: 60px;
  z-index: 10;
  height: 35px;
  flex-direction:row;
  display:flex;
  flex-wrap: wrap;
  justify-content:center;
  width:90%;
`;

const FilterLayout = styled.div`
  position: absolute;
  bottom: 100px;
  right:10px;
  z-index: 10;
  height: 35px;
  flex-direction:row;
  display:flex;
  flex-wrap: wrap;
`;

const PrevLayout = styled.div`
  position: absolute;
  bottom: 170px;
  right:10px;
  z-index: 10;
  height: 35px;
  flex-direction:row;
  display:flex;
  flex-wrap: wrap;
`;

const { kakao } = window;
const Hongmapcontainer = ({containerStyle}) => {
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


  const [filter, setFilter] = useState(true);

  const [filtertypeary, setFiltertypeary] = useState([]);

  var Taskitems = [
    {
        title: '집청소', 
        latlng: new kakao.maps.LatLng(37.54699, 127.09008)
    },
    {
      title: '집청소', 
      latlng: new kakao.maps.LatLng(37.52700, 127.09108)
    },
    {
      title: '이사청소', 
      latlng: new kakao.maps.LatLng(37.51711, 127.09628)
    },
    {
      title: '이사청소', 
      latlng: new kakao.maps.LatLng(37.54700, 127.09538)
    },
    {
      title: '집청소', 
      latlng: new kakao.maps.LatLng(37.57656, 127.09558)
    },
    {
      title: '집청소', 
      latlng: new kakao.maps.LatLng(37.52600, 127.09268)
    },
    {
        title: '이사청소', 
        latlng: new kakao.maps.LatLng(37.54597, 127.09799)
    },
    {
        title: '식사준비', 
        latlng: new kakao.maps.LatLng(37.54396, 127.09557)
    },
    {
        title: '식사준비',
        latlng: new kakao.maps.LatLng(37.54465, 127.09196)
    },
    {
      title: '식사준비', 
      latlng: new kakao.maps.LatLng(37.54597, 127.09449)
    },
    {
        title: '등원하원', 
        latlng: new kakao.maps.LatLng(37.54296, 127.09397)
    },
    {
        title: '등원하원',
        latlng: new kakao.maps.LatLng(37.54595, 127.09896)
    }
  ];
  var Taskitems2 = [
    {
        title: '홍여사', 
        latlng: new kakao.maps.LatLng(37.54799, 127.09108)
    },
    {
      title: '홍여사', 
      latlng: new kakao.maps.LatLng(37.52800, 127.09208)
    },
    {
      title: '홍여사', 
      latlng: new kakao.maps.LatLng(37.51731, 127.09528)
    },
    {
      title: '홍여사', 
      latlng: new kakao.maps.LatLng(37.54800, 127.09238)
    },
    {
      title: '홍여사', 
      latlng: new kakao.maps.LatLng(37.57756, 127.09758)
    },
    {
      title: '홍여사', 
      latlng: new kakao.maps.LatLng(37.52700, 127.09668)
    },
    
  ];
  var Taskitems3 = [
    {
        title: '공간대여', 
        latlng: new kakao.maps.LatLng(37.54799, 127.08808)
    },
    {
      title: '공간대여', 
      latlng: new kakao.maps.LatLng(37.52800, 127.08208)
    },
    {
      title: '공간대여', 
      latlng: new kakao.maps.LatLng(37.51731, 127.08428)
    },
    {
      title: '공간대여', 
      latlng: new kakao.maps.LatLng(37.54800, 127.08938)
    },
    {
      title: '공간대여', 
      latlng: new kakao.maps.LatLng(37.57756, 127.08658)
    },
    {
      title: '공간대여', 
      latlng: new kakao.maps.LatLng(37.52700, 127.08868)
    },
    
  ];

  const filterapply = () =>{
    setFilter(!filter);
    setRefresh((refresh) => refresh  +1 );
  }




  const navigate = useNavigate();




  const _handleprev = () =>{
    navigate(-1);
  }



  const seekimage = (category)=>{
    if(category == REQUESTTYPE.HOME){
      return imageDB.ThemaWoman;
    }else if(category == REQUESTTYPE.MOVE){
      return imageDB.ThemaMan;
    }else if(category == REQUESTTYPE.MEALPREPARAION){
      return imageDB.Thema20;
    }else if(category == REQUESTTYPE.WALKING){
      return imageDB.Thema30;
    }else if(category == REQUESTTYPE.DOLBOM){
      return imageDB.Thema40;
    }else{
      return imageDB.Thema40;
    }

  }

  useEffect(()=>{

    
    filtertypeary.push(REQUESTTYPE.ALLVIEW);

    setFiltertypeary(filtertypeary);
    console.log("filtertypeary", filtertypeary);
    

    setRefresh((refresh) => refresh +1);

  }, [])

  useEffect(()=>{
    setFilter(filter);
    setFiltertypeary(filtertypeary);
    console.log("filterarytype", filtertypeary);


    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
          center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
          level: 4 // 지도의 확대 레벨
      };

      var map = new kakao.maps.Map(mapContainer, mapOption);



      for (var i = 0; i < Taskitems.length; i ++){

          let filterary = [];
          filterary = filtertypeary;
          let FindIndex = filterary.findIndex(x=>x == Taskitems[i].title);
          let FindIndex2 = filterary.findIndex(x=>x == REQUESTTYPE.ALLVIEW);
          if(FindIndex == -1 &&  FindIndex2 == -1){
            continue;
          }

          var imageSrc =  seekimage(Taskitems[i].title), // 마커이미지의 주소입니다    
          imageSize = new kakao.maps.Size(32, 39), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
              markerPosition = Taskitems[i].latlng; // 마커가 표시될 위치입니다

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 마커이미지 설정 
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);  

          // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          var content = '<div class="customoverlay">' +
              '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
              '    <span class="title">'+Taskitems[i].title +'</span>' +
              '  </a>' +
              '</div>';

          // 커스텀 오버레이가 표시될 위치입니다 
          var position = Taskitems[i].latlng;  

          // 커스텀 오버레이를 생성합니다
          var customOverlay = new kakao.maps.CustomOverlay({
              map: map,
              position: position,
              content: content,
              yAnchor: 1 
          });

      }




      for (var i = 0; i < Taskitems2.length; i ++){


        let filterary = [];
        filterary = filtertypeary;
        let FindIndex = filterary.findIndex(x=>x == Taskitems2[i].title);
        let FindIndex2 = filterary.findIndex(x=>x == REQUESTTYPE.ALLVIEW);
        if(FindIndex == -1 &&  FindIndex2 == -1){
          continue;
        }

          var imageSrc =  imageDB.maroneperson2, // 마커이미지의 주소입니다    
          imageSize = new kakao.maps.Size(32, 39), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
              markerPosition = Taskitems2[i].latlng; // 마커가 표시될 위치입니다

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 마커이미지 설정 
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);  

          // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          var content = '<div class="customoverlay">' +
              '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
              '    <span class="title">'+Taskitems2[i].title +'</span>' +
              '  </a>' +
              '</div>';

          // 커스텀 오버레이가 표시될 위치입니다 
          var position = Taskitems2[i].latlng;  

          // 커스텀 오버레이를 생성합니다
          var customOverlay = new kakao.maps.CustomOverlay({
              map: map,
              position: position,
              content: content,
              yAnchor: 1 
          });

      }



      for (var i = 0; i < Taskitems3.length; i ++){


          let filterary = [];
          filterary = filtertypeary;
          let FindIndex = filterary.findIndex(x=>x == Taskitems3[i].title);
          let FindIndex2 = filterary.findIndex(x=>x == REQUESTTYPE.ALLVIEW);
          if(FindIndex == -1 &&  FindIndex2 == -1){
            continue;
          }

   
          var imageSrc =  imageDB.loadbox1, // 마커이미지의 주소입니다  
          
          imageSize = new kakao.maps.Size(32, 39), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
              markerPosition = Taskitems3[i].latlng; // 마커가 표시될 위치입니다

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 마커이미지 설정 
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);  

          // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          var content = '<div class="customoverlay2">' +
              '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
              '    <span class="title">'+Taskitems3[i].title +'</span>' +
              '  </a>' +
              '</div>';

          // 커스텀 오버레이가 표시될 위치입니다 
          var position = Taskitems3[i].latlng;  

          // 커스텀 오버레이를 생성합니다
          var customOverlay = new kakao.maps.CustomOverlay({
              map: map,
              position: position,
              content: content,
              yAnchor: 1 
          });

      }

  },[refresh])

  const _handlemapfilter = (filtertype) =>{

    let filterary = [];

    filterary = filtertypeary;


    // allView 제거
    if(filtertype != REQUESTTYPE.ALLVIEW){
      let FindIndex = filterary.findIndex(x=>x == REQUESTTYPE.ALLVIEW);

      if(FindIndex != -1){
        filterary.splice(FindIndex, 1);
      }

      FindIndex = filterary.findIndex(x=>x == filtertype);

      if(FindIndex != -1){
        filterary.splice(FindIndex, 1);
      }else{
        filterary.push(filtertype);
      }

    }else{
      const FindIndex = filterary.findIndex(x=>x == REQUESTTYPE.ALLVIEW);

      if(FindIndex == -1){

        filterary = [];
        filterary.push(REQUESTTYPE.ALLVIEW);
      }

    }

    setFiltertypeary(filterary);
    setRefresh((refresh) => refresh +1);
  }

  function IsExist(type){
    const FindIndex = filtertypeary.findIndex(x=>x == type);

    return FindIndex == -1 ? false : true;
  }

  return (
    <Container style={containerStyle}>
  
    <div id="map" className="Map"></div>
    {
      filter == true && <RefreshLayout>
      <ButtonEx buttonText={REQUESTTYPE.ALLVIEW} callback={()=>{_handlemapfilter(REQUESTTYPE.ALLVIEW)}}
      background={IsExist(REQUESTTYPE.ALLVIEW) == true ? '#ff4e19':'#21212194'}/>

      <ButtonEx buttonText={REQUESTTYPE.HOME} callback={()=>{_handlemapfilter(REQUESTTYPE.HOME)}}
      background={IsExist(REQUESTTYPE.HOME) == true ? '#ff4e19':'#21212194'}/>

      <ButtonEx buttonText={REQUESTTYPE.MOVE} callback={()=>{_handlemapfilter(REQUESTTYPE.MOVE)}}
      background={IsExist(REQUESTTYPE.MOVE) == true ? '#ff4e19':'#21212194'} />

      <ButtonEx buttonText={REQUESTTYPE.MEALPREPARAION} callback={()=>{_handlemapfilter(REQUESTTYPE.MEALPREPARAION)}}
      background={IsExist(REQUESTTYPE.MEALPREPARAION) == true ? '#ff4e19':'#21212194'} />


      <ButtonEx buttonText={REQUESTTYPE.WALKING} callback={()=>{_handlemapfilter(REQUESTTYPE.WALKING)}}
      background={IsExist(REQUESTTYPE.WALKING) == true ? '#ff4e19':'#21212194'} />


      <ButtonEx buttonText={REQUESTTYPE.DOLBOM} callback={()=>{_handlemapfilter(REQUESTTYPE.DOLBOM)}}
      background={IsExist(REQUESTTYPE.DOLBOM) == true ? '#ff4e19':'#21212194'} />


      <ButtonEx buttonText={REQUESTTYPE.ERRAND} callback={()=>{_handlemapfilter(REQUESTTYPE.ERRAND)}}
      background={IsExist(REQUESTTYPE.ERRAND) == true ? '#ff4e19':'#21212194'} />


      <ButtonEx buttonText={REQUESTTYPE.TAKECARE} callback={()=>{_handlemapfilter(REQUESTTYPE.TAKECARE)}}
      background={IsExist(REQUESTTYPE.TAKECARE) == true ? '#ff4e19':'#21212194'}/>


      <ButtonEx buttonText={REQUESTTYPE.HEAVYLOAD} callback={()=>{_handlemapfilter(REQUESTTYPE.HEAVYLOAD)}}
      background={IsExist(REQUESTTYPE.HEAVYLOAD) == true ? '#ff4e19':'#21212194'} />


      <ButtonEx buttonText={REQUESTTYPE.HOSPITAL} callback={()=>{_handlemapfilter(REQUESTTYPE.HOSPITAL)}}
      background={IsExist(REQUESTTYPE.HOSPITAL) == true ? '#ff4e19':'#21212194'} />


      <ButtonEx buttonText={REQUESTTYPE.OFFICECLEAN} callback={()=>{_handlemapfilter(REQUESTTYPE.OFFICECLEAN)}}
      background={IsExist(REQUESTTYPE.OFFICECLEAN) == true ? '#ff4e19':'#21212194'}/>


      <ButtonEx buttonText={REQUESTTYPE.RECIPE} callback={()=>{_handlemapfilter(REQUESTTYPE.RECIPE)}}
      background={IsExist(REQUESTTYPE.RECIPE) == true ? '#ff4e19':'#21212194'} />


      <ButtonEx buttonText={REQUESTTYPE.SCHOOL} callback={()=>{_handlemapfilter(REQUESTTYPE.SCHOOL)}}
      background={IsExist(REQUESTTYPE.SCHOOL) == true ? '#ff4e19':'#21212194'} />


      <ButtonEx buttonText={REQUESTTYPE.SHOPPING} callback={()=>{_handlemapfilter(REQUESTTYPE.SHOPPING)}}
      background={IsExist(REQUESTTYPE.SHOPPING) == true ? '#ff4e19':'#21212194'}/>


      <ButtonEx buttonText={REQUESTTYPE.DOGHOSPITAL} callback={()=>{_handlemapfilter(REQUESTTYPE.DOGHOSPITAL)}}
      background={IsExist(REQUESTTYPE.DOGHOSPITAL) == true ? '#ff4e19':'#21212194'} />


      <ButtonEx buttonText={REQUESTTYPE.DOGWALKING} callback={()=>{_handlemapfilter(REQUESTTYPE.DOGWALKING)}}
      background={IsExist(REQUESTTYPE.DOGWALKING) == true ? '#ff4e19':'#21212194'} />

      {/* <ButtonEx buttonText={REQUESTTYPE.HONGSEARCH} callback={()=>{_handlemapfilter(REQUESTTYPE.HONGSEARCH)}}
      background={IsExist(REQUESTTYPE.HONGSEARCH) == true ? '#ff4e19':'#21212194'} /> */}


      <ButtonEx buttonText={REQUESTTYPE.ROOM} callback={()=>{_handlemapfilter(REQUESTTYPE.ROOM)}}
      containerStyle={{width:"140px"}}
      background={IsExist(REQUESTTYPE.ROOM) == true ? '#ff4e19':'#21212194'} />

      <ButtonEx buttonText={'상세 검색을 눌러보세요'} callback={()=>{}}
      containerStyle={{width:"140px"}}
      background={'#21212194'} />

    </RefreshLayout>
    }


      <PrevLayout>
      <Button buttonText={"이전화면"} callback={_handleprev} containerStyle={{color: "#fff",background: "#2020209c",width: "60px",height: "60px",fontSize: "12px",margin :"2px",borderRadius:"50px"}}/>

      </PrevLayout>

      <FilterLayout>
        {
          filter == true ? ( <Button buttonText={"필터숨기기"} callback={filterapply} containerStyle={{color: "#fff",background: "#2020209c",width: "60px",height: "60px",fontSize: "12px",margin :"2px",borderRadius:"50px"}}/>):(
            <Button buttonText={"필터보기"} callback={filterapply} containerStyle={{color: "#fff",background: "#2020209c",width: "60px",height: "60px",fontSize: "12px",margin :"2px",borderRadius:"50px"}}/>
          )
        }

      </FilterLayout>

   
  
    </Container>
  );
}

export default Hongmapcontainer;
