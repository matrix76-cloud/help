

import React, { Fragment, useContext, useEffect, useState} from "react";
import './Footer.css';
import styled from 'styled-components';
import { imageDB } from '../../../utility/imageData';
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";
import { FiHome, FiUser, FiShare2,FiGrid } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

const FooterContent = styled.div`
  padding: 20px;
  justify-content: flex-start;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

`

const HomeFooter = ({menu, bottom, type ,callback}) => {
  const navigation = useNavigate();

  const {user, dispatch2} = useContext(UserContext);
  const [foottype, setFoottype] = useState(0);
  const [refresh, setRefresh] = useState(1);

  const location = useLocation();

  const _handleHome = () => {
    navigation("/home");
  }
  const _handleHomeSelf = () => {
  
  
  };

  const _handleHong = () => {
    navigation("/hong");
  }
  const _handleRegionSelf = () => {

  };

  const _handleWork = () =>{
    navigation("/room");
  }
  
  const _handleRoom = () =>{

    navigation("/room");
  }

  const _handleChat = () => {

    navigation("/hongmap");
  }
    const _handleChatSelf = () => {

      navigation("/chat");
    };
  const _handleConfig = () => {

    navigation("/config");
  }


  return (
    <Fragment>
      <footer>
        {bottom == true && (
          <div
            className={`site-mobile-footer ${
              menu == true ? "bottomapply" : "bottomnoapply"
            }`}
          >
            <FooterContent></FooterContent>
          </div>
        )}

        {menu == true && (
          <div className="site-mobile-footer2">
            <div className="buttonview">
              <div className="button">
                {type == "home" ? (
                  <>
                    <div className="imageicon" onClick={_handleHomeSelf}>
                    <FiHome size={25}/>
                    </div>
                    <div className="buttonEnableText">홈</div>
                  </>
                ) : (
                  <>
                    <div className="imageicon" onClick={_handleHome}>
                    <FiHome size={25}/>
                    </div>
                    <div className="buttonDisableText">홈</div>
                  </>
                )}
              </div>
              <div className="button">
                {type == "hong" ? (
                  <>
                    <div className="imageicon" onClick={_handleHong}>
                    <FiUser size={25}/>
                    </div>
                    <div className="buttonEnableText">홍여사구함</div>
                  </>
                ) : (
                  <>
                    <div className="imageicon" onClick={_handleHong}>
                    <FiUser size={25}/>
                    </div>
                    <div className="buttonDisableText">홍여사구함</div>
                  </>
                )}
              </div>
  
              <div className="upbutton" onClick={_handleChat}>
                <div
                  style={{
                    backgroundColor: "#FF4E19",
                    borderRadius: "100px",
                    border: "1px solid #fff",
                    height: 50,
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    padding: 5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginTop: -55,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="moving">
                      <img
                        src={imageDB.bottom_gps}
                        style={{ width: 25, height: 25 }}
                      />
                      
                  
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: 10,
                      color: "white",
                      paddingTop: 5,
                      position: "absolute",
                      top: 10,
                    }}
                  >
                    내주변
                  </div>
                </div>
              </div>

              <div className="button">
                {type == "room" ? (
                  <>
                    <div className="imageicon" onClick={_handleWork}>
                    <FiGrid size={25}/>
                    </div>
                    <div className="buttonEnableText">공간대여</div>
                  </>
                ) : (
                  <>
                    <div className="imageicon" onClick={_handleWork}>
                    <FiGrid size={25}/>

                    </div>
                    <div className="buttonDisableText">공간대여</div>
                  </>
                )}
              </div>

          

       

              <div className="button">
                {type == "config" ? (
                  <>
                    {" "}
                    <div className="imageicon" onClick={_handleConfig}>
                    <IoSettingsOutline size={25}/>
                    </div>
                    <div className="buttonEnableText">내정보</div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="imageicon" onClick={_handleConfig}>
                    <IoSettingsOutline size={25}/>
                    </div>
                    <div className="buttonDisableText">내정보	</div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </footer>
    </Fragment>
  );
};

export default HomeFooter;
