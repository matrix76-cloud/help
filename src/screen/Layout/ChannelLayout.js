

import React, { useEffect} from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DetailHeader from "./Header/DetailHeader";
import ChatHeader from "./Header/ChatHeader";
import ChannelHeader from "./Header/ChannelHeader";



const ChannelLayout = (props) => {



  return (
    <div>
      {props.header == true && (
        <ChannelHeader headername={props.headername} CHANNEL_ID={props.CHANNEL_ID} />
      )}
      <main>{props.children}</main>
      {/* <Footer  menu ={props.menu} bottom ={props.bottom} type={'chat'}/> */}
    </div>
  );
};

export default ChannelLayout;
