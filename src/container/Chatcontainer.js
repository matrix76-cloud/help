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
import ChatItem from "../components/ChatItem";
import { UserContext } from "../context/User";
import { get_allchannel } from "../service/ChatService";

const Container = styled.div``;
const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ItemContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.background};
  flex-direction: column;
  justfy-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Chatcontainer = ({ containerStyle }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const { user, dispath2 } = useContext(UserContext);


  useEffect(() => {
    setLoading(true);
    async function Process() {
      await useSleep(1000);
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
        <ShowContainer>
          <GuideLabel
            containerStyle={{ marginTop: 50 }}
            height={120}
            LabelText={"채팅"}
            SubLabelText={
              "마원 채팅입니다. 마원은 건전한 마사지 업소 문화를 선도하고 있습니다 건전한 체팅 문화를 위해 노력해주시고 보다 편리하게 마사지 어플을 이용해 주시기 바랍니다."
            }
          />

          <ItemContainer>
            {channels.map((channel, index) => (
              <ChatItem
                key={index}
                item={channel}
                containerStyle={{
                  backgroundColor: index % 2 == 0 ? "#FFFFFF" : "#f9f9f9",
                }}
              />
            ))}
          </ItemContainer>
        </ShowContainer>
      </>
    </Container>
  );
};

export default Chatcontainer;
