import React, { useState, useEffect, useContext } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { imageDB } from "../utility/imageData";
import Image from "../common/Image";
import { FiImage } from "react-icons/fi";
import Text from "../common/Text";
import { UserContext } from "../context/User";
import { ArrayIncludeData } from "../utility/common";
import {
  get_heartstore,
  updateheartoffstore,
  updateheartonstore,
} from "../service/StoreService";

const Container = styled.div``;

const Prev = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Home = styled.div`
  position: absolute;
  top: 10px;
  left: 45px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Heart = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Picture = styled.div`
  position: absolute;
  top: 170px;
  right: 45px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Page = styled.div`
  position: absolute;
  top: 170px;
  right: 15px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Storeimageaccessory = ({
  containerStyle,
  store,
  prevcallback,
  homecallback,
  clickcallback,
  mode,
}) => {
  const { user, dispatch2 } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {}
    fetchData();
  }, []);

  const _handlePrev = () => {
    prevcallback();
  };
  const _handlePhoto = () => {
    navigate("/photo", { state: { STOREIMAGEARY: store.STOREIMAGEARY } });
  };

  const _handleHeart = async () => {
    // heart 처리
    const USER_ID = user.uid;

    if (USER_ID == "") {
      alert("로그인이 필요한 기능입니다");
      return;
    }
    const storedata = store;
    const heart = await get_heartstore({ storedata, USER_ID });

    const shopdata = storedata;
    if (heart == true) {
      alert("찜처리 해제하였습니다");
      const update = await updateheartoffstore({ shopdata, USER_ID });
    } else {
      alert("찜처리 하였습니다");
      const update = await updateheartonstore({ shopdata, USER_ID });
    }

    clickcallback();
  };

  return (
    <Container style={containerStyle}>
      <Prev onClick={_handlePrev}>
        <Image
          source={imageDB.Prev_White}
          containerStyle={{ width: "18px", height: "20px" }}
        />
      </Prev>
      {
        mode != 1 && <>
          <Home onClick={homecallback}>
          <Image
          source={imageDB.Home}
          containerStyle={{ width: "25px", height: "25px" }}
          />
          </Home>

          <Picture onClick={_handlePhoto}>
          <FiImage color={"#fff"} size={23} />
          </Picture>
          <Page onClick={_handlePhoto}>
          <Text value={"1/" + store.STOREIMAGEARY.length} color={"#fff"}></Text>
          </Page>
        </>
      }

    </Container>
  );
};

export default Storeimageaccessory;
