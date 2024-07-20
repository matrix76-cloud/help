import React, { Component, useContext, useEffect, useLayoutEffect } from "react";
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, useLocation } from "react-router-dom";
import Homepage from "./page/Homepage";
import Splashpage from "./page/Splashpage";
import Configpage from "./page/Configpage";
import Regionpage from "./page/Regionpage";
import MyRegionpage from "./page/MyRegionpage";
import Searchpage from "./page/Searchpage";
import Loginpage from "./page/Loginpage";
import Storepage from "./page/Storepage";
import Reviewpage from "./page/Reviewpage";
import Idloginpage from "./page/Idloginpage";
import Registerloginpage from "./page/Registerloginpage";
import Heartpage from "./page/Heartpage";
import Recentpage from "./page/Recentpage";
import Rangesettingpage from "./page/Rangesettingpage";
import Receivecouponpage from "./page/Receivecouponpage";
import Myreviewpage from "./page/Myreviewpage";
import Storecouponpage from "./page/Storecouponpage";
import Checkadminpage from "./page/Checkadminpage";
import Reviewadminpage from "./page/Reviewadminpage";
import Chatsettingpage from "./page/Chatsettingpage";
import Channelpage from "./page/Channelpage";
import StorepositionExpage from "./page/StorepositionExpage";
import Detailmappage from "./page/Detailmappage";
import Photopage from "./page/Photopage";
import Maincouponpage from "./page/Maincouponpage";
import Mainnewstorepage from "./page/Mainnewstorepage";
import Maintoprankingpage from "./page/Maintoprankingpage";

import Frequentquestionpage from "./page/Frequentquestionpage";
import Kakaocenterpage from "./page/Kakaocenterpage";
import Noticepage from "./page/Noticepage";
import Baduserpage from "./page/Baduserpage";
import Mystorepage from "./page/Mystorepage";
import Kakaoauthpage from "./page/Kakaoauthpage";
import Naverauthpage from "./page/Naverauthpage";
import Checkaddpage from "./page/Checkaddpage";
import UseScrollRestoration from "./components/UseScrollRestoration";
import RouteTransition from "./components/RouteTransition";
import ReviewAllpage from "./page/ReviewAllpage";
import Loadingpage from "./page/Loadingpage";
// import Eventcreatepage from "./page/Eventcreatepage";
import Mystoreconfigpage from "./page/Mystoreconfigpage";
import Loginloadingpage from "./page/Loginloadingpage";
import Mystoreorderpage from "./page/Mystoreorderpage";
import Requestpage from "./page/Requestpage";
import Infopage from "./page/Infopage";
import Hongpage from "./page/Hongpage";
import Hongmappage from "./page/Hongmappage";
import Roompage from "./page/Roompage";
import Roommappage from "./page/Roommappage";
import DetailTaskpage from "./page/DetailTaskpage";
import RoomInfopage from "./page/RoomInfopage";
import Eventpage from "./page/Eventpage";
import Communitypage from "./page/Communitypage";
import Rulletpage from "./page/Rulletpage";
import LadyInfopage from "./page/LadyInfopage";
import Workpage from "./page/Workpage";
import { UserContext } from "./context/User";
import CommunityDetailpage from "./page/CommunityDetailpage";
import Helpfilterpage from "./page/Helpfilterpage";
import ChatGatepage from "./page/ChatGatepage";
import HongLadyAuthpage from "./page/HongLadyLicenseAuthpage";
import HongLadyPhoneAuthpage from "./page/HongLadyPhoneAuthpage";
import HongLadyLicenseAuthpage from "./page/HongLadyLicenseAuthpage";
import Splashpage2 from "./page/Splashpage2";
import LicenseAgreepage from "./page/LicenseAgreepage";
import ProfilePictureChangepage from "./page/ProfilePictureChangepage";
import Eventlistpage from "./page/Eventlistpage";
import Guidepage from "./page/Guidepage";
import HongLadyInfopage from "./page/HongLadyInfopage";
import Historylistpage from "./page/Historylistpage";
import Couponelistpage from "./page/Couponelistpage";
import Pointlistpage from "./page/Pointlistpage";
import DetailTaskpage2 from "./page/DetailTaskpage2";
import Hongrequestpage from "./page/Hongrequestpage";
import HongLadyProfilepage from "./page/HongLadyProfilepage";




const App =() =>  {

  const { dispatch2, user } = useContext(UserContext);


  const location = useLocation();

  useLayoutEffect(() => {
    const userObj = JSON.parse(window.localStorage.getItem("user"));

    console.log("useLayoutEffect", userObj);
    if (userObj != undefined) {
      user.deviceid = userObj.deviceid;
      user.region1 = userObj.region1;
      user.region2 = userObj.region2;

  
      dispatch2(user);
    }
  }, []);

 
  return (
    // <RouteTransition location={location}>
    //   <Routes>
    //   <Route path="/" element={<Splashpage />} />
    //   <Route path="/splash" element={<Splashpage />} />
    //   <Route path="/home" element={<Homepage />} />
    //   <Route path="/region" element={<Regionpage />} />
    //   <Route path="/myregion" element={<MyRegionpage />} />
    //   <Route path="/chat" element={<Chatpage />} />
    //   <Route path="/channel" element={<Channelpage />} />
    //   <Route path="/config" element={<Configpage />} />
    //   <Route path="/search" element={<Searchpage />} />
    //   <Route path="/login" element={<Loginpage />} />
    //   <Route path="/store" element={<Storepage />} />
    //   <Route path="/review" element={<Reviewpage />} />
    //   <Route path="/idlogin" element={<Idloginpage />} />
    //   <Route path="/registerlogin" element={<Registerloginpage />} />
    //   <Route path="/heart" element={<Heartpage />} />
    //   <Route path="/recent" element={<Recentpage />} />
    //   <Route path="/rangesetting" element={<Rangesettingpage />} />
    //   <Route path="/receivecoupone" element={<Receivecouponpage />} />
    //   <Route path="/storecoupone" element={<Storecouponpage />} />
    //   <Route path="/myreview" element={<Myreviewpage />} />
    //   <Route path="/checkadmin" element={<Checkadminpage />} />
    //   <Route path="/checkadd" element={<Checkaddpage />} />
    //   <Route path="/reviewadmin" element={<Reviewadminpage />} />
    //   <Route path="/chatsetting" element={<Chatsettingpage />} />

    //   <Route path="/storepositionex" element={<StorepositionExpage />} />
    //   <Route path="/detailmap" element={<Detailmappage />} />
    //   <Route path="/photo" element={<Photopage />} />
    //   <Route path="/maincoupone" element={<Maincouponpage />} />
    //   <Route path="/mainnewstore" element={<Mainnewstorepage />} />
    //   <Route path="/maintopranking" element={<Maintoprankingpage />} />
    //   <Route path="/frequentquestion" element={<Frequentquestionpage />} />
    //   <Route path="/kakaocenter" element={<Kakaocenterpage />} />
    //   <Route path="/notice" element={<Noticepage />} />
    //   <Route path="/baduser" element={<Baduserpage />} />
    //   <Route path="/mystore" element={<Mystorepage />} />
    //   <Route path="/auth" element={<Kakaoauthpage />} />
    //   <Route path="/authm" element={<Naverauthpage />} />
    //   </Routes>
    // </RouteTransition>
    <Routes>
      <Route path="/" element={<Splashpage />} />
      <Route path="/splash" element={<Splashpage />} />
      <Route path="/splash2" element={<Splashpage2 />} />
      <Route path="/loading" element={<Loadingpage />} />
      <Route path="/hongrequest" element={<Hongrequestpage />} />
      <Route path="/loginloading" element={<Loginloadingpage />} />
      <Route path="/licenseagree" element={<LicenseAgreepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/hong" element={<Hongpage />} />
      <Route path="/work" element={<Workpage />} />
      <Route path="/helpfilter" element={<Helpfilterpage />} />
      <Route path="/hongmap" element={<Hongmappage />} />
      <Route path="/hongladyprofile" element={<HongLadyProfilepage />} />
      <Route path="/hongladylicenseauth" element={<HongLadyLicenseAuthpage />} />
      <Route path="/hongladyphoneauth" element={<HongLadyPhoneAuthpage />} />
      <Route path="/detailtask" element={<DetailTaskpage />} />
      <Route path="/detailtask2" element={<DetailTaskpage2 />} />
      <Route path="/room" element={<Roompage />} />
      <Route path="/roommap" element={<Roommappage />} />
      <Route path="/request" element={<Requestpage />} />
      <Route path="/info" element={<Infopage />} />
      <Route path="/hongladyinfo" element={<HongLadyInfopage />} />
      <Route path="/ladyinfo" element={<LadyInfopage />} />
      <Route path="/roominfo" element={<RoomInfopage />} />
      <Route path="/community" element={<Communitypage />} />
      <Route path="/communitydetail" element={<CommunityDetailpage />} />
      <Route path="/rullet" element={<Rulletpage />} />
      <Route path="/event" element={<Eventpage />} />
      <Route path="/guide" element={<Guidepage />} />
      <Route path="/profilepicturechange" element={<ProfilePictureChangepage />} />
      <Route path="/region" element={<Regionpage />} />
      <Route path="/eventlist" element={<Eventlistpage />} />
      <Route path="/historylist" element={<Historylistpage />} />
      <Route path="/couponelist" element={<Couponelistpage />} />
      <Route path="/pointlist" element={<Pointlistpage />} />
      <Route path="/myregion" element={<MyRegionpage />} />
      <Route path="/chat" element={<ChatGatepage />} />
      <Route path="/channel" element={<Channelpage />} />
      <Route path="/config" element={<Configpage />} />
      <Route path="/search" element={<Searchpage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/store" element={<Storepage />} />
      <Route path="/review" element={<Reviewpage />} />
      <Route path="/reviewall" element={<ReviewAllpage />} />
      <Route path="/idlogin" element={<Idloginpage />} />
      <Route path="/registerlogin" element={<Registerloginpage />} />
      <Route path="/heart" element={<Heartpage />} />
      <Route path="/recent" element={<Recentpage />} />
      <Route path="/rangesetting" element={<Rangesettingpage />} />
      <Route path="/receivecoupone" element={<Receivecouponpage />} />
      <Route path="/storecoupone" element={<Storecouponpage />} />
      <Route path="/myreview" element={<Myreviewpage />} />
      <Route path="/checkadmin" element={<Checkadminpage />} />
      <Route path="/checkadd" element={<Checkaddpage />} />
      <Route path="/reviewadmin" element={<Reviewadminpage />} />
      <Route path="/chatsetting" element={<Chatsettingpage />} />

      <Route path="/storepositionex" element={<StorepositionExpage />} />
      <Route path="/detailmap" element={<Detailmappage />} />
      <Route path="/photo" element={<Photopage />} />
      <Route path="/maincoupone" element={<Maincouponpage />} />
      <Route path="/mainnewstore" element={<Mainnewstorepage />} />
      <Route path="/maintopranking" element={<Maintoprankingpage />} />
      <Route path="/frequentquestion" element={<Frequentquestionpage />} />
      <Route path="/kakaocenter" element={<Kakaocenterpage />} />
      <Route path="/notice" element={<Noticepage />} />
      <Route path="/baduser" element={<Baduserpage />} />
      <Route path="/mystore" element={<Mystorepage />} />
      <Route path="/mystoreconfig" element={<Mystoreconfigpage />} />
      <Route path="/mystoreorder" element={<Mystoreorderpage />} />
      <Route path="/auth" element={<Kakaoauthpage />} />
      <Route path="/authm" element={<Naverauthpage />} />
      {/* <Route path="/eventcreate" element={<Eventcreatepage />} /> */}
    </Routes>
  );


 
}

export default App;
