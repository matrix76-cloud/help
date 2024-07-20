

import React, { useEffect} from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DetailHeader from "./Header/DetailHeader";
import HomeFooter from "./Footer/HomeFooter";
import PrevHeader from "./Header/PrevHeader";



const DetailLayout = (props) => {



  return (
    <div>
        {
          (props.header == true )  &&   <PrevHeader headername={props.headername} />
        }
        <main>
          {props.children}
        </main>
      <HomeFooter  menu ={props.menu} bottom ={props.bottom} type={'chat'}/>
    </div>
  );
};

export default DetailLayout;
