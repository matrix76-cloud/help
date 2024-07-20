import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { imageDB } from '../utility/imageData';
import '../screen/css/common.css' 

const Container = styled.div`
  margin-top:10px;
`
const swiperStyle={
  position :"relative",
  width :'100%',

}

const BoxItem = styled.div`
  height: 90px;
  width: 230px;
  border-radius: 10px;
  margin-right: 10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background : ${({bgcolor}) => bgcolor}
`

const BoxItemData = styled.div`
  margin-top: 10px;
  padding: 0px 10px;
  font-size:12px;

`

const GuideSwipe = ({containerStyle, images, delaytime, height}) => {

  SwiperCore.use([Autoplay]);

  const navigate = useNavigate();
  const [swiperIndex, setSwiperIndex] = useState(0);


  const [swipeimgs, setSwipeimgs] = useState([]);


  const _handleguide = () =>{
    navigate("/guide");
  }

  // useEffect(() => {
  //   swipeimgs.push(imageDB.sample)

  // },[])
  return (
    <Container style={containerStyle}>
      <Swiper
        spaceBetween={10}
        // onActiveIndexChange={(swiperCore) => {
        //   setSwiperIndex(swiperCore.activeIndex);
        // }}
        slidesPerView={3}
        loop={true}
        scrollbar={{ draggable: true }}
        style={swiperStyle}
        loopAdditionalSlides={1}
        speed={5000}
        autoplay={{ delay: 0, disableOnInteraction: false }}
      >

          <SwiperSlide>
              <BoxItem bgcolor ={'#e9eef4'} onClick={_handleguide} >
                <img src={imageDB.FilterNewStore} style={{width:30}}/>
                <BoxItemData>홍여사는 누구지?</BoxItemData>
              </BoxItem>
          </SwiperSlide>
          <SwiperSlide>
            <BoxItem bgcolor ={'#e9f194'}  onClick={_handleguide}>
                <img src={imageDB.FilterNewStore} style={{width:30}}/>
                <BoxItemData>공간 대여란?</BoxItemData>
              </BoxItem>
          </SwiperSlide>
          <SwiperSlide>
          <BoxItem bgcolor ={'#f7d2fa'} onClick={_handleguide}>
                <img src={imageDB.FilterNewStore} style={{width:30}}/>
                <BoxItemData>간편한 서비스결재</BoxItemData>
              </BoxItem>
          </SwiperSlide>
          <SwiperSlide>
          <BoxItem bgcolor ={'#ededed'} onClick={_handleguide}>
                <img src={imageDB.FilterNewStore} style={{width:30}}/>
                 <BoxItemData>가계 수입에 도움</BoxItemData> 
              </BoxItem>
          </SwiperSlide>
          <SwiperSlide>
          <BoxItem bgcolor ={'#e9f194'} onClick={_handleguide}>
                <img src={imageDB.FilterNewStore} style={{width:30}}/>
                 <BoxItemData>평판지수란</BoxItemData> 
              </BoxItem>
          </SwiperSlide>
          <SwiperSlide>
          <BoxItem bgcolor ={'#f7d2fa'} onClick={_handleguide}>
                <img src={imageDB.FilterNewStore} style={{width:30}}/>
                 <BoxItemData>오늘의 혜택이벤트</BoxItemData> 
              </BoxItem>
          </SwiperSlide>
      </Swiper>
    </Container>
  );
}

export default GuideSwipe;
