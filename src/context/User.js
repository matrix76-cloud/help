import React, { useState, createContext } from "react";

const UserContext = createContext({
  user: {
    email: "",
    uid: "",
    deviceid: "",
    nickname: "",
    bannerlist1: [],
    bannerlist2: [],
    latitude: "",
    longitude: "",
    region1: "",
    region2: "",
    storeviewlist: [],
    distance: 50,
    img: "https://firebasestorage.googleapis.com/v0/b/marone-d7e06.appspot.com/o/images%2Fwronguser.png?alt=media&token=651b56ce-7091-449f-9172-79836ea9bd1c",
    updatetoken: "",
    type: 0,
    homeref: {},
    ref2: {},
    storelist :[],
    premiumshoplist: [],
    goldshoplist: [],
    silvershoplist : [],
    reload : false,
  },
  dispatch2: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const dispatch2 = ({
    email,
    uid,
    deviceid,
    updatetoken,
    type,
    nickname,
    bannerlist1,
    bannerlist2,
    img,
    latitude,
    longitude,
    region1,
    region2,
    storeviewlist,
    distance,
    homeref,
    ref2,
    storelist,
    premiumshoplist,
    goldshoplist,
    silvershoplist,
    reload
  }) => {
    setUser({
      email,
      uid,
      deviceid,
      updatetoken,
      type,
      nickname,
      bannerlist1,
      bannerlist2,
      img,
      latitude,
      longitude,
      region1,
      region2,
      storeviewlist,
      distance,
      homeref,
      ref2,
      storelist,
      premiumshoplist,
      goldshoplist,
      silvershoplist,
      reload
    });
  };

  const value = { user, dispatch2 };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export { UserContext, UserProvider };
