

import React, { useContext } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { UserContext } from "../../context/User";
import HomeFooter from "./Footer/HomeFooter";
import { useNavigate } from "react-router-dom";



const HomeLayout = (props) => {
  const { user, dispatch2 } = useContext(UserContext);
  const navigation = useNavigate();


  
  const callback = (Y, type) => {
    
    navigation("/loading");
   

  }


  return (
    <div> 
        {
          (props.header == true) &&
            <Header/>
          
        }
        <main>
          {props.children}
        </main>
      <HomeFooter menu={props.menu} bottom={props.bottom} type={"home"} callback={callback}/>
    </div>
  );
};

export default HomeLayout;
