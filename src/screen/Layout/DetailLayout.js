

import React, { useEffect} from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DetailHeader from "./Header/DetailHeader";



const DetailLayout = (props) => {



  return (
    <div>
        {
          (props.header == true )  &&     <DetailHeader headername={props.headername} />
        }
        <main>
          {props.children}
        </main>
      <Footer  menu ={props.menu} bottom ={props.bottom} type={'chat'}/>
    </div>
  );
};

export default DetailLayout;
