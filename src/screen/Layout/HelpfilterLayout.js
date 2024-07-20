

import React, { useContext } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { UserContext } from "../../context/User";
import HomeFooter from "./Footer/HomeFooter";
import { useNavigate } from "react-router-dom";
import Hongheader from "./Header/Hongheader";
import Helpfilterheader from "./Header/Helpfilterheader";



const HelpfilterLayout = (props) => {
  const { user, dispatch2 } = useContext(UserContext);
  const navigation = useNavigate();


  return (
    <div> 
        {
          (props.header == true) &&
            <Helpfilterheader/>
          
        }
        <main>
          {props.children}
        </main>

    </div>
  );
};

export default HelpfilterLayout;
