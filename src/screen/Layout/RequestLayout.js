

import React, { useEffect} from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DetailHeader from "./Header/DetailHeader";
import ChatHeader from "./Header/ChatHeader";
import ChannelHeader from "./Header/ChannelHeader";
import RequestHeader from "./Header/RequestHeader";
import { PiEyedropperSample } from "react-icons/pi";



const RequestLayout = (props) => {

  return (
    <div>
      {props.header == true && (
        <RequestHeader headername={props.headername} task={props.task} step={props.step} allstep={props.allstep}/>
      )}
      <main>{props.children}</main>
    </div>
  );
};

export default RequestLayout;
