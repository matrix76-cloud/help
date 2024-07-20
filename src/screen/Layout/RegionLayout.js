

import React, { useEffect} from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DetailHeader from "./Header/DetailHeader";
import ConfigHeader from "./Header/ConfigHeader";
import RegionHeader from "./Header/RegionHeader";
import HomeFooter from "./Footer/HomeFooter";



const RegionLayout = (props) => {



  return (
    <div>
        {
          props.header == true &&   
          <RegionHeader headername={props.headername} />
        }
        <main>
          {props.children}
        </main>
        <HomeFooter  menu ={props.menu} bottom ={props.bottom} type={'region'}/>
    </div>
  );
};

export default RegionLayout;
