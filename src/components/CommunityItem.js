import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { TiGroup } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 140px;
  padding: 10px 10px 20px 15px;
  border-bottom: 1px solid #ededed;
`

const MainRow = styled.div`
  display: flex;
  flex-direction: row;
  text-align:left;
  font-size: 16px;
`

const SubRow = styled.div`
  display: flex;
  flex-direction: row;
  text-align:left;
  font-size: 16px;
`


const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align:left;
  align-items: center;
  font-size: 13px;
  color: #999;
  margin : 5px 0px;
  line-height:1.5;

`


const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
  width: 50%;
`
const ImageLayer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 0px 0px 10px;

`
const Pictures = styled.div`
  position: absolute;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  margin-left: 30px;
  font-weight: 600;

`


const CommunityItem = ({containerStyle, item}) => {
  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){
		}
		fetchData();
  }, [])

  const _handledetail = () =>{


    navigate("/communitydetail", { state: { item: item } });
  }



  return (
    <Container style={containerStyle} onClick={_handledetail}>
      
      <MainRow>
        <div>
          <SubRow>
            {item.name.slice(0, 55)}
            {item.name.length > 55 ? "..." : null}
          </SubRow>

          <ContentRow>
            {item.content.slice(0, 65)}
            {item.content.length > 65 ? "..." : null}
          </ContentRow>
        </div>

      {
        item.imgs.length > 0 && <ImageLayer style={{display:"flex", justifyContent:"flex-start", alignItems:"flex-start"}}>
        <img src={item.imgs[0]} style={{width:"80px", height:"80px", borderRadius:10}}/>
        {
          item.imgs.length > 1 && <Pictures>+{item.imgs.length}</Pictures>
        }
     
        </ImageLayer>
      }
  
      </MainRow>



      <Row>
        <div>{item.addr}</div>
        <div>{item.time}</div>
        <div>조회{item.view}</div>
      </Row>


    </Container>
  );
}

export default CommunityItem;
