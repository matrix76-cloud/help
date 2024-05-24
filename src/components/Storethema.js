import React,{useState, useEffect, Fragment} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import Text from '../common/Text';
import ImageButton from '../common/ImageButton';
import { imageDB } from '../utility/imageData';

const Container = styled.div`
  display: flex;
  flex-direction : column;
  justify-content: flex-start;
  align-items: flex-start;
  padding:20px;

`




const PointView = styled.div`
    background-color : #FF4E19;
    border : 1px solid #FF4E19;
    width :30px;
    height :30px;
    border-radius :100px;
    justify-content:center;
    align-items : center;
    position:absolute;
    top:0px;
    left:50px;
`
const PointText = styled.span`
    color :#fff;
    font-family : ${({theme}) =>theme.EXTRABOLD};
    font-size: 10px;
`


const Storethema = ({containerStyle, store}) => {

  const navigate = useNavigate();
   useEffect(()=>{
    async function fetchData(){



		}
		fetchData();
  }, [])



  return (
    <Container style={containerStyle}>
      <Text value={"시설테마"} containerStyle={{ fontWeight: 600 }} size={14} />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 20,
          flexWrap: "wrap",
        }}
      >
        {store.STORETHEMAARY.map((data, index) => (
          <Fragment key={index}>
            {data == "car" && (
              <ImageButton
                source={imageDB.ThemaCar}
                buttontext={"주차가능"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "50px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}
            {data == "shower" && (
              <ImageButton
                source={imageDB.ThemaShower}
                buttontext={"샤워가능"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "50px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}
            {data == "oneshop" && (
              <ImageButton
                source={imageDB.ThemaOneshop}
                buttontext={"1인1실"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "50px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}
            {data == "two" && (
              <ImageButton
                source={imageDB.Thema20}
                buttontext={"20대관리사"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "50px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}
            {data == "three" && (
              <ImageButton
                source={imageDB.Thema30}
                buttontext={"30대관리사"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "50px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}
            {data == "four" && (
              <ImageButton
                source={imageDB.Thema40}
                buttontext={"40대관리사"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "50px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}
            {data == "couple" && (
              <ImageButton
                source={imageDB.ThemaCouple}
                buttontext={"커플가능"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "50px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}

            {data == "allhour" && <></>}
            {data == "group" && (
              <ImageButton
                source={imageDB.ThemaGroup}
                buttontext={"단체가능"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "60px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}
            {data == "male" && (
              <ImageButton
                source={imageDB.ThemaManOnly}
                buttontext={"남성전용"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "60px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}
            {data == "female" && (
              <ImageButton
                source={imageDB.ThemaWomanOnly}
                buttontext={"여성전용"}
                round={false}
                buttoncallback={() => {}}
                containerStyle={{
                  height: "60px",
                  marginBottom: 35,
                  width: "18%",
                  marginRight: 5,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </Container>
  );
}

export default Storethema;
