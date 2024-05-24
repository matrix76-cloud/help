import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import Image from '../common/Image';
import { KeywordAddress, fn_smsShare } from '../utility/common';
import { imageDB } from '../utility/imageData';
import Text from '../common/Text';
import { AiFillAlert } from "react-icons/ai";
import { theme } from '../theme/theme';
import ErrorModalEx from './ErrorModalEx';
import { CopyToClipboard } from "react-copy-to-clipboard";

const Container = styled.div`

  height : 180px;
  display:flex;
  flex-direction: column;
  background-color : #fff;
  padding-top:60px;
  padding-left:20px;
  margin : 20px 0px 20px;

`
const StoreItem = styled.div`
  display:flex;
  margin : 10px 0px;
`
const CopyItem = styled.div`
    font-size: 13px;
    text-decoration: underline;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SmsItem = styled.a`
    padding: 2px 10px;
    font-size: 12px;
    background: #be09f0ee;
    border: 1px solid #ededed;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:30px;
`

const Storemain = ({containerStyle, store}) => {

  const navigate = useNavigate();

  const [errorstatus, setErrorstatus] = useState(false);
  useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])

  const _handlereport = ()=>{
    setErrorstatus(!errorstatus);
  }

  const errorcallback = () =>{
    setErrorstatus(false);
  }



  // function handletelCopy() {
  //   var act_job = document.getElementById("addr_tel");
  //   act_job.select();
  //   document.execCommand("Copy", true, "");
  //   alert(act_job.value);
  // }
  const _handlemapview = () => {
    navigate("/storepositionex", { state: { store: store } });
  };



  return (
    <Container style={containerStyle}>
      {errorstatus == true && <ErrorModalEx callback={errorcallback} />}

      <StoreItem>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={imageDB.Address}
            containerStyle={{
              width: "30px",
              display: "flex",
              justifyContent: "center",
            }}
            Radius={false}
          />
          {/* 
        <Text size={14} value ={store.STOREADDR} containerStyle={{width:"220px", justifyContent:"flex-start"}} Radius={false} /> */}
          <CopyItem>
            <CopyToClipboard text={store.STOREADDR}>
              <div style={{ fontSize: 14 }} onClick={_handlemapview}>
                {store.STOREADDR}
              </div>
            </CopyToClipboard>
          </CopyItem>
        </div>
        <div
          onClick={_handlereport}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              background: theme.main,
              padding: "3px 10px",
              display: "flex",
              flexDirection: "row",
              marginLeft:"40px",
              borderRadius: 10,
            }}
          >
            <div>
              <AiFillAlert color={theme.white} />
            </div>
            <Text size={12} value={"오류제보"} color={theme.white} />
          </div>
        </div>
      </StoreItem>

      <StoreItem>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={imageDB.Watch}
            containerStyle={{
              width: "30px",
              display: "flex",
              justifyContent: "center",
            }}
            Radius={false}
          />
          <Text
            size={14}
            value={"영업개시시간 : " + store.STORESTARTTIME}
            containerStyle={{ width: "220px", justifyContent: "flex-start" }}
            Radius={false}
          />
        </div>
      </StoreItem>

      <StoreItem>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={imageDB.Watch}
            containerStyle={{
              width: "30px",
              display: "flex",
              justifyContent: "center",
            }}
            Radius={false}
          />
          <Text
            size={14}
            value={"영업종료시간 : " + store.STOREENDTIME}
            containerStyle={{ width: "220px", justifyContent: "flex-start" }}
            Radius={false}
          />
        </div>
      </StoreItem>

      <StoreItem>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={imageDB.Tel}
            containerStyle={{
              width: "30px",
              display: "flex",
              justifyContent: "center",
            }}
            Radius={false}
          />
          {/* <Text size={14} value ={store.STORETEL} containerStyle={{width:"140px", justifyContent:"flex-start"}} Radius={false} /> */}

          <CopyItem>
            <CopyToClipboard
              text={store.STORETEL}
              onCopy={() => alert("전화번호가 복사되었습니다")}
            >
              <div style={{ fontSize: 14 }}>{store.STORETEL}</div>
            </CopyToClipboard>
          </CopyItem>
        </div>

        {/* <SmsItem href={fn_smsShare(store.STORETEL)}>
          문자보내기
        </SmsItem> */}
      </StoreItem>
    </Container>
  );
}

export default Storemain;
