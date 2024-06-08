import React, { Component, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, useLocation } from "react-router-dom";
import Homepage from "./page/Homepage";
import Splashpage from "./page/Splashpage";
import Configpage from "./page/Configpage";
import Regionpage from "./page/Regionpage";
import Chatpage from "./page/Chatpage";
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




const App =() =>  {




  const location = useLocation();
 
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
      <Route path="/loading" element={<Loadingpage />} />
      <Route path="/loginloading" element={<Loginloadingpage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/region" element={<Regionpage />} />
      <Route path="/myregion" element={<MyRegionpage />} />
      <Route path="/chat" element={<Chatpage />} />
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
      <Route path="/auth" element={<Kakaoauthpage />} />
      <Route path="/authm" element={<Naverauthpage />} />
      {/* <Route path="/eventcreate" element={<Eventcreatepage />} /> */}
    </Routes>
  );


 
}

export default App;
