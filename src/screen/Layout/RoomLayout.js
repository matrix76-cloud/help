

import React, { useContext } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { UserContext } from "../../context/User";
import HomeFooter from "./Footer/HomeFooter";
import { useNavigate } from "react-router-dom";
import Hongheader from "./Header/Hongheader";
import Roomheader from "./Header/Roomheader";



const RoomLayout = (props) => {
  const { user, dispatch2 } = useContext(UserContext);
  const navigation = useNavigate();



  return (
    <div> 
        {
          (props.header == true) &&
            <Roomheader />      
        }
        <main>
          {props.children}
        </main>
      <HomeFooter menu={props.menu} bottom={props.bottom} type={"room"} />
    </div>
  );
};

export default RoomLayout;
