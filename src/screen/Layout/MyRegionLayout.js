

import React, { useEffect} from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DetailHeader from "./Header/DetailHeader";
import ConfigHeader from "./Header/ConfigHeader";
import RegionHeader from "./Header/RegionHeader";
import MyRegionHeader from "./Header/MyRegionHeader";
import HomeFooter from "./Footer/HomeFooter";



const MyRegionLayout = (props) => {



  return (
    <div>
        {
          props.header == true &&   <MyRegionHeader headername={props.headername} />
        }
        <main>
          {props.children}
        </main>
        <HomeFooter  menu ={props.menu} bottom ={props.bottom} type={'region'}/>
    </div>
  );
};

export default MyRegionLayout;
