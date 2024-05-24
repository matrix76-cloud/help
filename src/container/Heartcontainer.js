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
import { UserContext } from "../context/User";
import { get_review, get_reviewForUser } from "../service/ReviewService";
import {
  get_heartstore,
  get_heartstores,
  get_stores,
} from "../service/StoreService";
import Label from "../common/Label";
import { ArrayIncludeData, useSleep } from "../utility/common";
import Premiumshop from "../components/Premiumshop__";
import Goldshop from "../components/Goldshop";
import Silvershop from "../components/Silvershop";
import Loading from "../common/Loading";
import Recentshop from "../components/Recentshop";
import { get_checkuser } from "../service/CheckService";

const Container = styled.div`
  margin-top: 60px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  flex-wrap: wrap;
`;

const TrendingXScroll = styled.div`
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
const Heartcontainer = ({ containerStyle }) => {
  const { user, dispath2 } = useContext(UserContext);
  const [heartstorepremiumitems, setHeartstorepremiumitems] = useState([]);
  const [heartstoregolditems, setHeartstoregolditems] = useState([]);
  const [heartstoresilveritems, setHeartstoresiveritems] = useState([]);
  const [viewstore, setViewstore] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function FetchData() {
      const recentstoresTmp = user.storeviewlist;

      let heartcount = 0;

      let rectentstoresTmp2 = [];

      recentstoresTmp.map(async(data, index) => {

        console.log("data", data);
        if (ArrayIncludeData(data.STORE.HEARTUSER, user.uid)) {

          const STORE_ID = data.STORE_ID;
          const reviewdata = await get_review({ STORE_ID });

          data.STORE["reviewdata"] = reviewdata;
          const USER_ID = data.STORE.USER_ID;
          const checks = await get_checkuser({ USER_ID });
          data.STORE["checks"] =checks;
  
  
          console.log("recentstoresTmp", data);
          rectentstoresTmp2.push(data);

    

          setViewstore(rectentstoresTmp2);

  

        }
      });


    }
    FetchData();
  }, []);

  

  return (
    <Container style={containerStyle}>
      {loading == true ? (
        <Loading containerStyle={{ marginTop: 300 }} />
      ) : (
        <>
          <TrendingXScroll>
            {viewstore.map((data, index) => (
              <Recentshop
                key={index}
                STORE={data.STORE}
                containerStyle={{
                  margin: "0px 10px 5px 10px",
                  display: "flex",
                }}
              />
            ))}
          </TrendingXScroll>
        </>
      )}
    </Container>
  );
};

export default Heartcontainer;
