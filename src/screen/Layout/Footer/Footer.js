

import React, { Fragment, useContext, useEffect, useState} from "react";
import './Footer.css';
import styled from 'styled-components';
import { imageDB } from '../../../utility/imageData';
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";

const FooterContent = styled.div`
  padding: 20px;
  justify-content: flex-start;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

`

const Footer = ({menu, bottom, type, homecallback }) => {
  const navigation = useNavigate();
  const location = useLocation();

  const {user, dispatch2} = useContext(UserContext);
  const [foottype, setFoottype] = useState(0);
  const [refresh, setRefresh] = useState(1);

  const _handleHome = () => {
    // user["homeref"] = window.scrollY;

    console.log("current page",location.pathname);
    // dispatch2(user);

    if(location.pathname == '/home'){
      homecallback();
    }else{
      navigation("/home", { state: { homerefresh: false } });
    }

  }

  const _handleRegion = () => {
    // user["homeref"] = window.scrollY;
    // console.log("homeref", window.screenY);

    navigation("/region");
  }
  const _handleMyRegion = () =>{
    // user["homeref"] = window.scrollY;
    // dispatch2(user);

    navigation("/myregion",{state:{region0 : "", region1:user.region1, region2:user.region2}});
  }

  const _handleChat = () => {
    // user["homeref"] = window.scrollY;
    // dispatch2(user);

    navigation("/chat");
  }
  const _handleConfig = () => {
    // user["homeref"] = window.scrollY;
    // dispatch2(user);

    navigation("/config");
  }


  return (
    <Fragment>
      <footer>

        {
          bottom == true &&
          <div className={`site-mobile-footer ${menu == true ? "bottomapply": "bottomnoapply"}`}>
          <FooterContent>

          </FooterContent>
        
          </div>
        }
  
        
        {
          menu == true &&
          <div className="site-mobile-footer2">
            <div className="buttonview">
              <div className="button" onClick={_handleHome}>
                {
                  type == 'home' ? (
                  <>
                    <div className="imageicon">
                      <img src={imageDB.bottom_home}  style={{width: 22,height: 22}}/>
                    </div>
                    <div className="buttonEnableText">
                      홈
                    </div>
                  </>
          ) : (    
            <>
            <div className="imageicon">
              <img src={imageDB.bottom_home_disable}  style={{width: 22,height: 22}}/>
            </div>
            <div className="buttonDisableText">
              홈
            </div>
            </>)
                }
            
              </div>
              <div className="button" onClick={_handleRegion}>
              {
                type == 'region' ? (<>  <div className="imageicon">
                <img src={imageDB.bottom_location}  style={{width: 25,height: 25}}/>
              </div>
              <div className="buttonEnableText">
                지역
              </div></>) : (<>  <div className="imageicon">
                  <img src={imageDB.bottom_location_disable}  style={{width: 25,height: 25}}/>
                </div>
                <div className="buttonDisableText">
                  지역
                </div></>)
              }
              
              </div>

              <div className="upbutton"  onClick={_handleMyRegion}>
                  <div style={{backgroundColor:"#FF4E19", borderRadius:'100px',border: "1px solid #fff",
                  height:50, width:50, display:"flex",justifyContent:"center", padding:5}}>
                    <div style={{display:"flex", marginTop:-55, justifyContent:"center", alignItems:"center"}}>
                      <div className="moving">
                      <img  src={imageDB.bottom_gps}  style={{width: 25,height: 25}}/>
                      </div>
                    
                    </div>

                    <div style={{fontSize:10, color:"white", paddingTop:5, position:"absolute", top:10}}>내주변</div>
                  

                  </div>

    
              </div>

              <div className="button" onClick={_handleChat}>
              {
                type == 'chat' ? (<>   <div className="imageicon">
                <img src={imageDB.bottom_chat}  style={{width: 20,height: 20}}/>
              </div>
              <div className="buttonEnableText">
                체팅
              </div></>) : (<>   <div className="imageicon">
                  <img src={imageDB.bottom_chat_disable}  style={{width: 20,height: 20}}/>
                </div>
                <div className="buttonDisableText">
                  체팅
                </div></>)
              }
             
              </div>
              <div className="button" onClick={_handleConfig}>
              {
                type == 'config' ? (<>    <div className="imageicon">
                <img src={imageDB.bottom_profile}  style={{width: 20,height: 20}}/>
              </div>
              <div className="buttonEnableText">
                내정보
              </div></>) : (<>    <div className="imageicon">
                  <img src={imageDB.bottom_profile_disable}  style={{width: 20,height: 20}}/>
                </div>
                <div className="buttonDisableText">
                  내정보
                </div></>)
              }
            
              </div>
            </div>

          </div>
        }
      
    
    
      
      </footer>
    </Fragment>
  );
};

export default Footer;
