

import React, { useEffect} from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DetailHeader from "./Header/DetailHeader";
import ConfigHeader from "./Header/ConfigHeader";
import RegionHeader from "./Header/RegionHeader";
import PrevHeader from "./Header/PrevHeader";



const CheckLayout = (props) => {



  return (
    <div>
        {
          props.header == true &&   <PrevHeader headername={props.headername} />
        }
        <main>
          {props.children}
        </main>
      <Footer  menu ={props.menu} bottom ={props.bottom}/>
    </div>
  );
};

export default CheckLayout;
