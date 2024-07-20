

import React, { useContext } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { UserContext } from "../../context/User";
import HomeFooter from "./Footer/HomeFooter";
import { useNavigate } from "react-router-dom";
import Hongheader from "./Header/Hongheader";
import CommunityHeader from "./Header/CommunityHeader";



const CommunityLayout = (props) => {
  const { user, dispatch2 } = useContext(UserContext);
  const navigation = useNavigate();

  const switchcallback = (switchstatus) =>{
    console.log("switch status", switchstatus);
    props.callback(switchstatus);
  }

  return (
    <div> 
        {
          (props.header == true) &&
            <CommunityHeader/>     
        }
        <main>
          {props.children}
        </main>
      <HomeFooter menu={props.menu} bottom={props.bottom} type={"community"} />
    </div>
  );
};

export default CommunityLayout;
