

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
    callback();
  
  };

  const _handleRegion = () => {
    callback(window.scrollY);
    navigation("/region");
  }
  const _handleRegionSelf = () => {
    callback(window.scrollY, "SELF");
    navigation("/region");
  };
  
  const _handleMyRegion = () =>{
    callback(window.scrollY);
    navigation("/myregion",{state:{region0 : "", region1:user.region1, region2:user.region2}});
  }

  const _handleChat = () => {
    callback(window.scrollY);
    navigation("/chat");
  }
    const _handleChatSelf = () => {
     callback(window.scrollY, "SELF");
      navigation("/chat");
    };
  const _handleConfig = () => {
    callback(window.scrollY);
    navigation("/config");
  }

  const _handleConfigSelf = () => {
     callback(window.scrollY, "SELF");
    navigation("/config");
  };
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
                      <img
                        src={imageDB.bottom_home}
                        style={{ width: 22, height: 22 }}
                      />
                    </div>
                    <div className="buttonEnableText">홈</div>
                  </>
                ) : (
                  <>
                    <div className="imageicon" onClick={_handleHome}>
                      <img
                        src={imageDB.bottom_home_disable}
                        style={{ width: 22, height: 22 }}
                      />
                    </div>
                    <div className="buttonDisableText">홈</div>
                  </>
                )}
              </div>
              <div className="button">
                {type == "region" ? (
                  <>
                    {" "}
                    <div className="imageicon" onClick={_handleRegionSelf}>
                      <img
                        src={imageDB.bottom_location}
                        style={{ width: 25, height: 25 }}
                      />
                    </div>
                    <div className="buttonEnableText">지역</div>
                  </>
                ) : (
                  <>
                    <div className="imageicon" onClick={_handleRegion}>
                      <img
                        src={imageDB.bottom_location_disable}
                        style={{ width: 25, height: 25 }}
                      />
                    </div>
                    <div className="buttonDisableText">지역</div>
                  </>
                )}
              </div>

              <div className="upbutton" onClick={_handleMyRegion}>
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
                {type == "chat" ? (
                  <>
                    {" "}
                    <div className="imageicon" onClick={_handleChatSelf}>
                      <img
                        src={imageDB.bottom_chat}
                        style={{ width: 20, height: 20 }}
                      />
                    </div>
                    <div className="buttonEnableText">체팅</div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="imageicon" onClick={_handleChat}>
                      <img
                        src={imageDB.bottom_chat_disable}
                        style={{ width: 20, height: 20 }}
                      />
                    </div>
                    <div className="buttonDisableText">체팅</div>
                  </>
                )}
              </div>
              <div className="button">
                {type == "config" ? (
                  <>
                    {" "}
                    <div className="imageicon" onClick={_handleConfigSelf}>
                      <img
                        src={imageDB.bottom_profile}
                        style={{ width: 20, height: 20 }}
                      />
                    </div>
                    <div className="buttonEnableText">내정보</div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="imageicon" onClick={_handleConfig}>
                      <img
                        src={imageDB.bottom_profile_disable}
                        style={{ width: 20, height: 20 }}
                      />
                    </div>
                    <div className="buttonDisableText">내정보</div>
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
