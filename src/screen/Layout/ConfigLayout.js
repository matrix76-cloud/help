

import React, { useEffect} from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DetailHeader from "./Header/DetailHeader";
import ConfigHeader from "./Header/ConfigHeader";



const ConfigLayout = (props) => {



  return (
    <div>
        {
          props.header == true &&   <ConfigHeader headername={props.headername} />
        }
        <main>
          {props.children}
        </main>
      <Footer  menu ={props.menu} bottom ={props.bottom} type={"config"}/>
    </div>
  );
};

export default ConfigLayout;
