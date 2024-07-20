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
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { useSleep } from "../utility/common";
import Loading from "../common/Loading";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../api/config";
import GuideLabel from "../components/GuildeLable";
import ChatItem from "../components/ChatGateItem";
import { UserContext } from "../context/User";
import { get_allchannel } from "../service/ChatService";
import ChatGateItem from "../components/ChatGateItem";
import Loading2 from "../common/Loading2";

const Container = styled.div``;
const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:50px;
`;
const ItemContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.background};
  flex-direction: column;
  justfy-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ChatGatecontainer = ({ containerStyle }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const { user, dispath2 } = useContext(UserContext);


  useEffect(() => {
    setLoading(true);
    async function Process() {
      await useSleep(8000);
      setLoading(false);
    }
    Process();
  }, []);

  useEffect(() => {
    // const user = getCurrentUser();

    async function FetchData() {
      const USERID = user.uid;
      const items = await get_allchannel({USERID});
      setChannels(items);

    };
    FetchData();
  }, []);

  return (
    <Container style={containerStyle}>
      <>

      {
      loading == true ? (<Loading2 containerStyle={{ marginTop: 300 }} />) 
      :( <ShowContainer>
     


        <ItemContainer>
          {channels.map((channel, index) => (
            <ChatGateItem
              key={index}
              item={channel}
              containerStyle={{
                backgroundColor: index % 2 == 0 ? "#FFFFFF" : "#f9f9f9",
              }}
            />
          ))}
        </ItemContainer>
      </ShowContainer>

      ) }

      </>
    </Container>
  );
};

export default ChatGatecontainer;
