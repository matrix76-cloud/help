import React,{useState, useEffect} from 'react';
import { HashRouter, Route, Switch, Redirect, BrowserRouter, Routes, Link, useNavigate} from "react-router-dom";
import styled from 'styled-components';

import { imageDB } from '../utility/imageData';
import Image from '../common/Image';


const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`
const ImageLayer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  padding : 10px 0px 10px;
  flex-wrap : wrap;
`
const ButtonImage = styled.div`
    width:28%;
    height :100px;
    background-color : ${({bgcolor}) => bgcolor};
    margin :4px;
    border-radius :10px;
    justify-content : center;
    display :flex;
    flex-direction : column;
`
const ImageCategoryTextView = styled.div`
    margin-left:10px;
    padding-top:5px;
    display :flex;
    flex-direction : row;
`

const ImageCategoryTextView2 = styled.div`
    margin:0px 10px 0px 10px;
    display :flex;
    flex-direction : row;
    padding-top:5px;
    text-align: left;
`

const ImageCategoryImageView = styled.div`
    display :flex;
    flex-direction : row;
    justify-content : flex-end;
    align-items : flex-end;
    margin-right :10px;
`

const ImageCategoryText = styled.span`
    font-size :14px;
    font-family : Pretendard-Bold;
    color : #0d0d0d;
`
const ImageCategoryText2 = styled.span`
    font-size :12px;
    font-family :Pretendard-Regular;
    color : #0d0d0d;
`

const ImageCategory = styled.image`

    width :40%;
    height :100%;
`


const CategorySubfilter = ({containerStyle}) => {

  const navigate = useNavigate();

  const _handlecoupone = () =>{
    navigate("/maincoupone");
  }

  const _handlenewstore = () =>{
    navigate("/mainnewstore");
  }

  const _handletopranking = () =>{
    navigate("/maintopranking");
  }
  return (
    <Container style={containerStyle}>
      <ImageLayer>
      <ButtonImage  bgcolor ={'#E3F2D6'}  onClick={_handlecoupone}>
          <ImageCategoryTextView><ImageCategoryText>선착순 쿠폰</ImageCategoryText></ImageCategoryTextView>
          <ImageCategoryTextView2><ImageCategoryText2>빨리빨리 받으러가세요</ImageCategoryText2></ImageCategoryTextView2>
          <ImageCategoryImageView>
            <Image source ={imageDB.FilterCoupone}  Radius={false} />
          </ImageCategoryImageView>
      </ButtonImage>

      <ButtonImage  bgcolor ={'#D5E6F8'} onClick={_handlenewstore} >
        <ImageCategoryTextView><ImageCategoryText>신규 입점</ImageCategoryText></ImageCategoryTextView>
        <ImageCategoryTextView2><ImageCategoryText2>최근에 입점된 업체를 알아보세요</ImageCategoryText2></ImageCategoryTextView2>
        <ImageCategoryImageView>    
        <Image source ={imageDB.FilterNewStore}   Radius={false}/>
        </ImageCategoryImageView>
      </ButtonImage>

      <ButtonImage  bgcolor ={'#FFF0BF'} onClick={_handletopranking} >
        <ImageCategoryTextView><ImageCategoryText>TOP랭킹</ImageCategoryText></ImageCategoryTextView>
        <ImageCategoryTextView2><ImageCategoryText2>후기가 좋은 업소를 찾아보세요</ImageCategoryText2></ImageCategoryTextView2>
        <ImageCategoryImageView>  
        <Image source ={imageDB.FilterRanking} Radius={false} />
        </ImageCategoryImageView>
      </ButtonImage>
        {/* <Image source={imageDB.FilterCoupone} buttontext={'한국'} containerStyle={{width:"30%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <Image source={imageDB.FilterNewStore} buttontext={'중국'} containerStyle={{width:"30%", height:"50px", marginLeft:5, marginBottom:35}}/>
        <Image source={imageDB.FilterRanking} buttontext={'타이'} containerStyle={{width:"30%", height:"50px", marginLeft:5, marginBottom:35}}/> */}
      </ImageLayer>


    </Container>
  );
}



export default CategorySubfilter;
