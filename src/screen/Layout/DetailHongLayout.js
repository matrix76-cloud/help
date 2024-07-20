

import React, { useContext } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { UserContext } from "../../context/User";
import HomeFooter from "./Footer/HomeFooter";
import { useNavigate } from "react-router-dom";
import Hongheader from "./Header/Hongheader";
import DetailHongheader from "./Header/DetailHongheader";



const DetailTaskLayout = (props) => {
  const { user, dispatch2 } = useContext(UserContext);
  const navigation = useNavigate();



  return (
    <div> 
        {
          (props.header == true) &&
            <DetailHongheader headername={'엄마처럼 집청소 깨끗하게 해주실분 찾아요'} />
          
        }
        <main>
          {props.children}
        </main>
      <HomeFooter menu={props.menu} bottom={props.bottom} type={"hong"} />
    </div>
  );
};

export default DetailTaskLayout;
