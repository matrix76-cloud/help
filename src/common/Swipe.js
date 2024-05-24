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

`
const swiperStyle={
  position :"relative",
  width :'100%',

}

const Swipe = ({containerStyle, images, delaytime, height}) => {

  SwiperCore.use([Autoplay]);

  const navigate = useNavigate();
  const [swiperIndex, setSwiperIndex] = useState(0);


  const [swipeimgs, setSwipeimgs] = useState([]);

  // useEffect(() => {
  //   swipeimgs.push(imageDB.sample)

  // },[])
  return (
    <Container style={containerStyle}>
      <Swiper
        spaceBetween={10}
        onActiveIndexChange={(swiperCore) => {
          setSwiperIndex(swiperCore.activeIndex);
        }}
        slidesPerView={1}
        loop={true}
        scrollbar={{ draggable: true }}
        style={swiperStyle}
        autoplay={{ delay: delaytime, disableOnInteraction: true }}
      >
        {images.map((data, index) => (
          <SwiperSlide key={index}>
            <img src={data} style={{ width: "100%", height: height }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default Swipe;
