import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';



const TRANSPARENT = 'transparent';

const Container = styled.div`
    background-color :white;
    height: ${({height}) =>height}px;
    padding : 10px 20px;
    display:flex;
  
`

const LabelMainView = styled.div`
    display: flex;
    background-color: #e9e8e8;
    flex-direction: column;
    padding: 20px 0px;
    color: #626060;
`

const LabelView = styled.div`
    justify-content: center;
    display : flex;
    align-items:center;
  
`
const Label = styled.span`
    font-size: 16px;
    font-family : ${({theme}) =>theme.BOLD};
`
const SubLabelView = styled.div`
    padding: 0px 10px;
    display : flex;


`
const SubLabel = styled.span`
    font-size: 13px;
    text-align: left;
    line-height:20px;

`

const GuideLabel  = ({containerStyle, LabelText, SubLabelText, height , subexist})=>{
    return(
        <Container style={containerStyle} height={height}>
                <LabelMainView>
                        <LabelView><Label>{LabelText}</Label></LabelView>
                        {
                            subexist == true &&
                            <SubLabelView>
                            <SubLabel>{SubLabelText}</SubLabel>
                            </SubLabelView>
                        }
                      
                </LabelMainView>  
    
        </Container>
    );
}



GuideLabel.propTypes = {
    containerStyle : PropTypes.object,
}
GuideLabel.defaultProps = {
    height :80,
    subexist : true,
}

export default GuideLabel;
