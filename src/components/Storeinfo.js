import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';




const TRANSPARENT = 'transparent';

const Container = styled.div`
    background-color : #F2F3F4;
    height: ${({height}) =>height}px;
    padding: 20px;
`

const StoreNameView = styled.div`
   display:flex;
`
const StoreNameText = styled.span`
    font-size: 20px;
    font-family : ${({theme}) =>theme.BOLD};
`

const StoreLineView = styled.div`
    background-color : #EAEBED;
    height :1px;
`
const StoreButtonView = styled.div`
  display:flex;
    flex-direction : row;
    justify-content : flex-start;
    align-items : flex-start;
`
const StoreButton = styled.div`
    margin-right :20px;
`
const StoreButtonText = styled.span`
    font-size: 10px;
    font-family : ${({theme}) =>theme.REGULAR};
`
const StoreBusinessView = styled.div`
    display:flex;
    margin-top:20px;
`
const StoreBusinessText = styled.span`
    font-size: 12px;
    font-family : ${({theme}) =>theme.REGULAR};
`
const StoreBusinessInfoView = styled.div`
    display:flex;
    margin-bottom:10px;
    margin-top:10px;
`
const StoreBusinessInfoText = styled.span`
    font-size: 12px;
    font-family : ${({theme}) =>theme.REGULAR};
    color :#ACACAC;
    text-align: left;
`



const StoreInfo  = ({containerStyle, height})=>{
    return(
        <Container style={containerStyle} height={ height}>
            <StoreNameView>
                <StoreNameText>시크로드</StoreNameText>
            </StoreNameView>


            <StoreButtonView>
                <StoreButton>
                    <StoreButtonText>이용약관</StoreButtonText>
                </StoreButton>
                <StoreButton>
                    <StoreButtonText>개인정보 처리방침</StoreButtonText>
                </StoreButton>
                <StoreButton>
                    <StoreButtonText>입점문의</StoreButtonText>
                </StoreButton>
                <StoreButton>
                    <StoreButtonText>마원 사장님</StoreButtonText>
                </StoreButton>
            </StoreButtonView>

            <StoreBusinessView>
                <StoreBusinessText>(주)시크로드 사업자정보</StoreBusinessText>
            </StoreBusinessView>
            <StoreBusinessInfoView>
                <StoreBusinessInfoText>
                (주)시크로드는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
                따라서, 상품의 예약, 이용 및 환불 등과 관련한 책임을 지지 않습니다.
                </StoreBusinessInfoText>
            </StoreBusinessInfoView>
    
        </Container>
    );
}



StoreInfo.propTypes = {
    containerStyle : PropTypes.object,
}

StoreInfo.defaultProps ={
    height : 350,
}
export default StoreInfo;
