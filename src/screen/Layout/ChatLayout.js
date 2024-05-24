

import React, { useEffect} from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DetailHeader from "./Header/DetailHeader";
import ChatHeader from "./Header/ChatHeader";



const ChatLayout = (props) => {



  return (
    <div>
        {
          (props.header == true )  &&     <ChatHeader headername={props.headername} />
        }
        <main>
          {props.children}
        </main>
      {/* <Footer  menu ={props.menu} bottom ={props.bottom} type={'chat'}/> */}
    </div>
  );
};

export default ChatLayout;
